"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, CheckCircle, Upload, X, FileVideo, Sparkles } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { createUploadUrl, checkUploadStatus } from "@/lib/mux"
import { apiService } from "@/lib/api"
import { websocketService } from "@/lib/websocket"

export function EnhancedVideoUploader() {
  const { toast } = useToast()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "processing" | "success" | "error">("idle")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [tags, setTags] = useState("")
  const [thumbnailUrl, setThumbnailUrl] = useState("")
  const [uploadId, setUploadId] = useState<string | null>(null)
  const [assetId, setAssetId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [aiProcessing, setAIProcessing] = useState(false)
  const [selectedAIModel, setSelectedAIModel] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadCheckInterval = useRef<NodeJS.Timeout | null>(null)

  // WebSocket connection
  useEffect(() => {
    const connectWebSocket = async () => {
      try {
        const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001"
        const token = localStorage.getItem("token")
        await websocketService.connect(wsUrl, token || undefined)
        
        // Subscribe to upload progress events
        websocketService.onUploadProgress((data) => {
          if (data.uploadId === uploadId) {
            setUploadProgress(data.progress)
            setUploadStatus(data.status)
            if (data.message) {
              toast({
                title: "Upload Update",
                description: data.message,
              })
            }
          }
        })
      } catch (error) {
        console.error("Failed to connect WebSocket:", error)
        // Continue without WebSocket - fallback to polling
      }
    }

    connectWebSocket()

    return () => {
      websocketService.disconnect()
    }
  }, [uploadId, toast])

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (uploadCheckInterval.current) {
        clearInterval(uploadCheckInterval.current)
      }
    }
  }, [])

  // Poll for upload status when we have an uploadId
  useEffect(() => {
    if (uploadId && uploadStatus === "processing") {
      uploadCheckInterval.current = setInterval(async () => {
        try {
          const status = await checkUploadStatus(uploadId)

          if (status.status === "asset_created") {
            setAssetId(status.asset_id || null)
            setUploadStatus("success")
            if (uploadCheckInterval.current) {
              clearInterval(uploadCheckInterval.current)
            }

            // Save video metadata to database
            await saveVideoMetadata({
              title,
              description,
              category,
              isPublic,
              tags: tags.split(",").map((tag) => tag.trim()),
              assetId: status.asset_id!,
            })

            setThumbnailUrl(`https://image.mux.com/${status.asset_id}/thumbnail.jpg`)
            
            toast({
              title: "Upload Complete!",
              description: "Your video is ready to share.",
            })
          } else if (status.status === "errored" || status.status === "cancelled" || status.status === "timed_out") {
            setUploadStatus("error")
            if (uploadCheckInterval.current) {
              clearInterval(uploadCheckInterval.current)
            }
            toast({
              title: "Upload Failed",
              description: "There was an error processing your video.",
              variant: "destructive",
            })
          }
        } catch (error) {
          console.error("Error checking upload status:", error)
        }
      }, 5000) // Check every 5 seconds
    }

    return () => {
      if (uploadCheckInterval.current) {
        clearInterval(uploadCheckInterval.current)
      }
    }
  }, [uploadId, uploadStatus, title, description, category, isPublic, tags, toast])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      validateAndSetFile(file)
    }
  }

  const validateAndSetFile = (file: File) => {
    // Validate file type
    const validTypes = ["video/mp4", "video/mov", "video/avi", "video/quicktime"]
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a video file (MP4, MOV, or AVI).",
        variant: "destructive",
      })
      return
    }

    // Validate file size (2GB max)
    const maxSize = 2 * 1024 * 1024 * 1024 // 2GB in bytes
    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "Please upload a video smaller than 2GB.",
        variant: "destructive",
      })
      return
    }

    setSelectedFile(file)
    setUploadStatus("idle")
    setUploadProgress(0)
  }

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleUpload = async () => {
    if (!selectedFile) return

    try {
      setUploadStatus("uploading")

      // Get a direct upload URL from MUX
      const { url, uploadId: id } = await createUploadUrl()
      setUploadId(id)

      // Subscribe to WebSocket updates for this upload
      if (websocketService.isConnected()) {
        websocketService.subscribeToVideo(id)
      }

      // Upload the file directly to MUX
      const xhr = new XMLHttpRequest()
      xhr.open("PUT", url, true)

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100)
          setUploadProgress(progress)
        }
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadStatus("processing")
          toast({
            title: "Upload Complete",
            description: "Your video is now being processed.",
          })
        } else {
          setUploadStatus("error")
        }
      }

      xhr.onerror = () => {
        setUploadStatus("error")
        toast({
          title: "Upload Failed",
          description: "There was a network error. Please try again.",
          variant: "destructive",
        })
      }

      xhr.send(selectedFile)
    } catch (error) {
      console.error("Upload failed:", error)
      setUploadStatus("error")
      toast({
        title: "Upload Failed",
        description: "Failed to initialize upload. Please try again.",
        variant: "destructive",
      })
    }
  }

  const saveVideoMetadata = async (metadata: {
    title: string
    description: string
    category: string
    isPublic: boolean
    tags: string[]
    assetId: string
  }) => {
    try {
      const video = await apiService.createVideo(metadata)
      
      // Notify via WebSocket
      if (websocketService.isConnected()) {
        websocketService.subscribeToVideo(video.id)
      }
      
      return video
    } catch (error) {
      console.error("Error saving video metadata:", error)
      toast({
        title: "Warning",
        description: "Video uploaded but metadata save failed. Please update manually.",
        variant: "destructive",
      })
      throw error
    }
  }

  const handleAIProcessing = async () => {
    if (!assetId || !selectedAIModel) {
      toast({
        title: "Error",
        description: "Please complete the upload and select an AI model.",
        variant: "destructive",
      })
      return
    }

    try {
      setAIProcessing(true)
      const response = await apiService.requestAIProcessing({
        videoId: assetId,
        modelType: selectedAIModel as any,
      })

      toast({
        title: "AI Processing Started",
        description: `Task ID: ${response.taskId}. You'll be notified when complete.`,
      })

      // Request processing via WebSocket
      if (websocketService.isConnected()) {
        websocketService.requestAIProcessing(assetId, selectedAIModel)
      }
    } catch (error) {
      console.error("AI processing request failed:", error)
      toast({
        title: "Error",
        description: "Failed to start AI processing.",
        variant: "destructive",
      })
    } finally {
      setAIProcessing(false)
    }
  }

  const resetForm = () => {
    setSelectedFile(null)
    setUploadStatus("idle")
    setUploadProgress(0)
    setTitle("")
    setDescription("")
    setCategory("")
    setTags("")
    setThumbnailUrl("")
    setUploadId(null)
    setAssetId(null)
    setSelectedAIModel("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    if (uploadCheckInterval.current) {
      clearInterval(uploadCheckInterval.current)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Video with AI Processing</CardTitle>
        <CardDescription>
          Upload your video to share with the deaf community. Request AI model processing for transcription, analysis, and more.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {uploadStatus === "error" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Upload Failed</AlertTitle>
            <AlertDescription>There was an error uploading your video. Please try again.</AlertDescription>
          </Alert>
        )}

        {uploadStatus === "success" && (
          <Alert className="bg-green-50 text-green-800 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle>Upload Successful</AlertTitle>
            <AlertDescription>
              Your video has been uploaded successfully! You can now request AI processing.
            </AlertDescription>
          </Alert>
        )}

        {(uploadStatus === "idle" || !selectedFile) && (
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer ${
              isDragging ? "bg-muted border-primary" : "hover:bg-muted/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="video/mp4,video/mov,video/avi,video/quicktime"
              className="hidden"
            />
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-10 w-10 text-muted-foreground" />
              <h3 className="font-medium text-lg">Drag and drop your video here</h3>
              <p className="text-sm text-muted-foreground">Or click to browse your files</p>
              <p className="text-xs text-muted-foreground mt-2">Supported formats: MP4, MOV, AVI • Maximum file size: 2GB</p>
            </div>
          </div>
        )}

        {selectedFile && (uploadStatus === "idle" || uploadStatus === "uploading" || uploadStatus === "processing") && (
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                  <FileVideo className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium truncate max-w-[200px]">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
              {uploadStatus === "idle" && (
                <Button variant="ghost" size="icon" onClick={resetForm}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {uploadStatus !== "idle" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    {uploadStatus === "uploading"
                      ? "Uploading..."
                      : uploadStatus === "processing"
                        ? "Processing..."
                        : "Complete"}
                  </span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}
          </div>
        )}

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter video description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="vlog">Vlog</SelectItem>
                <SelectItem value="tutorial">Tutorial</SelectItem>
                <SelectItem value="asl-poetry">ASL Poetry</SelectItem>
                <SelectItem value="deaf-culture">Deaf Culture</SelectItem>
                <SelectItem value="news">News</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="Enter tags separated by commas"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Example: asl, deaf culture, education</p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
            <Label htmlFor="public">Make this video public</Label>
          </div>

          {thumbnailUrl && (
            <div className="space-y-2">
              <Label>Thumbnail</Label>
              <div className="relative aspect-video w-full max-w-[300px] rounded-md overflow-hidden border">
                <img
                  src={thumbnailUrl || "/placeholder.svg"}
                  alt="Video thumbnail"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          )}

          {uploadStatus === "success" && (
            <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h4 className="font-medium">AI Processing</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Request AI model processing for your video
              </p>
              <div className="grid gap-2">
                <Label htmlFor="ai-model">AI Model</Label>
                <Select value={selectedAIModel} onValueChange={setSelectedAIModel}>
                  <SelectTrigger id="ai-model">
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transcription">Speech-to-Text Transcription</SelectItem>
                    <SelectItem value="sign_language_recognition">Sign Language Recognition</SelectItem>
                    <SelectItem value="caption_generation">Auto Caption Generation</SelectItem>
                    <SelectItem value="content_analysis">Content Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAIProcessing} disabled={!selectedAIModel || aiProcessing} className="w-full">
                {aiProcessing ? "Processing..." : "Request AI Processing"}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetForm} disabled={uploadStatus === "uploading" || uploadStatus === "processing"}>
          {uploadStatus === "success" ? "Upload Another" : "Cancel"}
        </Button>
        <Button 
          onClick={handleUpload} 
          disabled={!selectedFile || uploadStatus !== "idle" || !title || !category}
        >
          {uploadStatus === "uploading"
            ? "Uploading..."
            : uploadStatus === "processing"
              ? "Processing..."
              : uploadStatus === "success"
                ? "Uploaded"
                : "Upload Video"}
        </Button>
      </CardFooter>
    </Card>
  )
}
