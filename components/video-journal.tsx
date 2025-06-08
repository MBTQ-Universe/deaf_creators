"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Video, Camera, StopCircle, Play, Trash2, Save, List } from "lucide-react"

export function VideoJournal() {
  const { toast } = useToast()
  const [recording, setRecording] = useState(false)
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null)
  const [videoURL, setVideoURL] = useState<string | null>(null)
  const [entries, setEntries] = useState<{ id: number; title: string; date: string; url: string }[]>([
    { id: 1, title: "First week in Oklahoma", date: "2023-05-15", url: "/placeholder.svg?height=200&width=350" },
    { id: 2, title: "Meeting new friends", date: "2023-05-22", url: "/placeholder.svg?height=200&width=350" },
    { id: 3, title: "Thoughts on new apartment", date: "2023-06-01", url: "/placeholder.svg?height=200&width=350" },
  ])

  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<BlobPart[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" })
        const url = URL.createObjectURL(blob)

        setVideoBlob(blob)
        setVideoURL(url)

        if (videoRef.current) {
          videoRef.current.srcObject = null
          videoRef.current.src = url
        }

        chunksRef.current = []
      }

      mediaRecorder.start()
      setRecording(true)

      toast({
        title: "Recording started",
        description: "Your video journal entry is now being recorded.",
      })
    } catch (error) {
      console.error("Error accessing camera:", error)
      toast({
        title: "Camera error",
        description: "Unable to access your camera or microphone.",
        variant: "destructive",
      })
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop()
      setRecording(false)

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }

      toast({
        title: "Recording stopped",
        description: "Your video journal entry has been recorded.",
      })
    }
  }

  const discardRecording = () => {
    if (videoURL) {
      URL.revokeObjectURL(videoURL)
    }

    setVideoBlob(null)
    setVideoURL(null)

    if (videoRef.current) {
      videoRef.current.src = ""
    }

    toast({
      title: "Recording discarded",
      description: "Your video journal entry has been discarded.",
    })
  }

  const saveRecording = () => {
    const titleInput = document.getElementById("entry-title") as HTMLInputElement
    const title = titleInput?.value || "Untitled Entry"

    const newEntry = {
      id: Date.now(),
      title,
      date: new Date().toISOString().split("T")[0],
      url: videoURL || "",
    }

    setEntries([newEntry, ...entries])

    toast({
      title: "Entry saved",
      description: "Your video journal entry has been saved.",
    })

    // Reset for new recording
    setVideoBlob(null)
    setVideoURL(null)

    if (titleInput) {
      titleInput.value = ""
    }
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }

      if (videoURL) {
        URL.revokeObjectURL(videoURL)
      }
    }
  }, [videoURL])

  return (
    <Tabs defaultValue="record" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="record">
          <Camera className="mr-2 h-4 w-4" />
          Record Entry
        </TabsTrigger>
        <TabsTrigger value="entries">
          <List className="mr-2 h-4 w-4" />
          Past Entries
        </TabsTrigger>
      </TabsList>

      <TabsContent value="record">
        <Card>
          <CardHeader>
            <CardTitle>Record Video Journal Entry</CardTitle>
            <CardDescription>Record your thoughts and experiences in sign language</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted={recording}
                  controls={!recording && !!videoURL}
                  className="w-full h-full object-cover"
                />

                {!recording && !videoURL && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                    <Video className="h-16 w-16 mb-2 opacity-50" />
                    <p>Click "Start Recording" to begin</p>
                  </div>
                )}
              </div>

              <div className="flex justify-center space-x-4">
                {!recording && !videoURL && (
                  <Button onClick={startRecording} className="gap-2">
                    <Camera className="h-4 w-4" />
                    Start Recording
                  </Button>
                )}

                {recording && (
                  <Button onClick={stopRecording} variant="destructive" className="gap-2">
                    <StopCircle className="h-4 w-4" />
                    Stop Recording
                  </Button>
                )}

                {!recording && videoURL && (
                  <>
                    <Button onClick={discardRecording} variant="outline" className="gap-2">
                      <Trash2 className="h-4 w-4" />
                      Discard
                    </Button>

                    <Button
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.play()
                        }
                      }}
                      variant="outline"
                      className="gap-2"
                    >
                      <Play className="h-4 w-4" />
                      Play
                    </Button>
                  </>
                )}
              </div>

              {!recording && videoURL && (
                <div className="space-y-2">
                  <Label htmlFor="entry-title">Entry Title</Label>
                  <Input id="entry-title" placeholder="Give your journal entry a title" />

                  <Button onClick={saveRecording} className="w-full gap-2 mt-4">
                    <Save className="h-4 w-4" />
                    Save Journal Entry
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="entries">
        <Card>
          <CardHeader>
            <CardTitle>Journal Entries</CardTitle>
            <CardDescription>Review your past video journal entries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry) => (
                <Card key={entry.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={entry.url || "/placeholder.svg"}
                      alt={entry.title}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute inset-0 w-full h-full bg-black/30 opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <Play className="h-8 w-8 text-white" />
                    </Button>
                  </div>
                  <CardFooter className="flex flex-col items-start p-4">
                    <h3 className="font-medium">{entry.title}</h3>
                    <p className="text-xs text-muted-foreground">{entry.date}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
