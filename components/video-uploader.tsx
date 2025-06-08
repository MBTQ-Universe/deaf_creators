"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, MapPin, Film, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { usePlatform } from "@/components/platform-provider"

export function VideoUploader() {
  const { toast } = useToast()
  const { updateEarnings } = usePlatform()
  const [uploading, setUploading] = useState(false)
  const [location, setLocation] = useState("")
  const [useCurrentLocation, setUseCurrentLocation] = useState(true)

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Success message
    toast({
      title: "Upload successful!",
      description: "Your content has been uploaded and is being processed.",
    })

    // Add earnings for uploading content
    updateEarnings(25)

    setUploading(false)
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation && useCurrentLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // This would typically use a reverse geocoding service
          // For demo purposes, we'll just use coordinates
          setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`)
        },
        (error) => {
          console.error("Error getting location:", error)
          toast({
            title: "Location error",
            description: "Unable to get your current location.",
            variant: "destructive",
          })
        },
      )
    }
  }

  return (
    <Tabs defaultValue="video" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="video">
          <Film className="mr-2 h-4 w-4" />
          Video
        </TabsTrigger>
        <TabsTrigger value="photo">
          <ImageIcon className="mr-2 h-4 w-4" />
          Photo
        </TabsTrigger>
      </TabsList>

      <TabsContent value="video">
        <Card>
          <CardHeader>
            <CardTitle>Upload Video</CardTitle>
            <CardDescription>
              Upload your video content with location and timestamp information. Perfect for sign language videos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload}>
              <div className="grid w-full gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter video title" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe your video content" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="video-file">Video File</Label>
                    <span className="text-xs text-muted-foreground">MP4, MOV, or WebM format</span>
                  </div>
                  <Input id="video-file" type="file" accept="video/*" required className="cursor-pointer" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="location">Location</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="use-current-location"
                        checked={useCurrentLocation}
                        onCheckedChange={setUseCurrentLocation}
                      />
                      <Label htmlFor="use-current-location" className="text-xs cursor-pointer">
                        Use current location
                      </Label>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      id="location"
                      placeholder="Enter location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      disabled={useCurrentLocation}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={getCurrentLocation}
                      disabled={!useCurrentLocation}
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="vlog">Vlog</option>
                    <option value="food">Food Review</option>
                    <option value="movie">Movie/Show Review</option>
                    <option value="beauty">Beauty</option>
                    <option value="journey">Personal Journey</option>
                    <option value="journal">Video Journal</option>
                  </select>
                </div>
              </div>
              <CardFooter className="flex justify-end pt-6 px-0">
                <Button type="submit" disabled={uploading}>
                  {uploading ? (
                    <>
                      <span className="mr-2">Uploading...</span>
                      <Upload className="h-4 w-4 animate-pulse" />
                    </>
                  ) : (
                    <>
                      <span className="mr-2">Upload Video</span>
                      <Upload className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="photo">
        <Card>
          <CardHeader>
            <CardTitle>Upload Photos</CardTitle>
            <CardDescription>Upload photos with location and timestamp information.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload}>
              <div className="grid w-full gap-6">
                <div className="space-y-2">
                  <Label htmlFor="photo-title">Title</Label>
                  <Input id="photo-title" placeholder="Enter photo title" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo-description">Description</Label>
                  <Textarea id="photo-description" placeholder="Describe your photo" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="photo-file">Photo Files</Label>
                    <span className="text-xs text-muted-foreground">JPG, PNG, or WebP format</span>
                  </div>
                  <Input id="photo-file" type="file" accept="image/*" multiple required className="cursor-pointer" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="photo-location">Location</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="photo-use-current-location"
                        checked={useCurrentLocation}
                        onCheckedChange={setUseCurrentLocation}
                      />
                      <Label htmlFor="photo-use-current-location" className="text-xs cursor-pointer">
                        Use current location
                      </Label>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      id="photo-location"
                      placeholder="Enter location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      disabled={useCurrentLocation}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={getCurrentLocation}
                      disabled={!useCurrentLocation}
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <CardFooter className="flex justify-end pt-6 px-0">
                <Button type="submit" disabled={uploading}>
                  {uploading ? (
                    <>
                      <span className="mr-2">Uploading...</span>
                      <Upload className="h-4 w-4 animate-pulse" />
                    </>
                  ) : (
                    <>
                      <span className="mr-2">Upload Photos</span>
                      <Upload className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
