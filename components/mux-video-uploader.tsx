"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, CheckCircle, Upload, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { createUploadUrl, checkUploadStatus } from "../lib/mux"

export function MuxVideoUploader() {
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
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadCheckInterval = useRef<NodeJS.Timeout | null>(null)

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

            // In a real app, you would save the video metadata to your database here
            await saveVideoMetadata({
              title,
              description,
              category,
              isPublic,
              tags: tags.split(",").map((tag) => tag.trim()),
              assetId: status.asset_id!,
            })

            setThumbnailUrl(`https://image.mux.com/${status.asset_id}/thumbnail.jpg`)
          } else if (status.status === "errored" || status.status === "cancelled" || status.status === "timed_out") {
            setUploadStatus("error")
            if (uploadCheckInterval.current) {
              clearInterval(uploadCheckInterval.current)
            }
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
  }, [uploadId, uploadStatus, title, description, category, isPublic, tags])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setUploadStatus("idle")
      setUploadProgress(0)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
      setUploadStatus("idle")
      setUploadProgress(0)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    try {
      setUploadStatus("uploading")

      // Get a direct upload URL from MUX
      const { url, uploadId: id } = await createUploadUrl()
      setUploadId(id)

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
        } else {
          setUploadStatus("error")
        }
      }

      xhr.onerror = () => {
        setUploadStatus("error")
      }

      xhr.send(selectedFile)
    } catch (error) {
      console.error("Upload failed:", error)
      setUploadStatus("error")
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
      const response = await fetch("/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(metadata),
      })

      if (!response.ok) {
        throw new Error("Failed to save video metadata")
      }

      return await response.json()
    } catch (error) {
      console.error("Error saving video metadata:", error)
      throw error
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
        <CardTitle>Upload Video</CardTitle>
        <CardDescription>
          Upload your video to share with the deaf community. Supported formats: MP4, MOV, AVI.
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
              Your video has been uploaded and is now being processed. It will be available shortly.
            </AlertDescription>
          </Alert>
        )}

        {(uploadStatus === "idle" || !selectedFile) && (
          <div
            className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-muted/50 transition-colors cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="video/mp4,video/mov,video/avi"
              className="hidden"
            />
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-10 w-10 text-muted-foreground" />
              <h3 className="font-medium text-lg">Drag and drop your video here</h3>
              <p className="text-sm text-muted-foreground">Or click to browse your files</p>
              <p className="text-xs text-muted-foreground mt-2">Maximum file size: 2GB</p>
            </div>
          </div>
        )}

        {selectedFile && (uploadStatus === "idle" || uploadStatus === "uploading" || uploadStatus === "processing") && (
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="m10 7 5 3-5 3Z" />
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                  </svg>
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
            <Label htmlFor="title">Title</Label>
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
            <Label htmlFor="category">Category</Label>
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
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetForm}>
          Cancel
        </Button>
        <Button onClick={handleUpload} disabled={!selectedFile || uploadStatus !== "idle" || !title}>
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
