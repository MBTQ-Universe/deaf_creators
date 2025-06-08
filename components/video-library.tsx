"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Filter, Play, Edit, Trash2, Upload, Eye, Calendar } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

export function VideoLibrary() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [showVideoPlayer, setShowVideoPlayer] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<any>(null)

  const videos = [
    {
      id: 1,
      title: "ASL Travel Tips for Summer",
      thumbnail: "/placeholder.svg?height=180&width=320",
      category: "Educational",
      duration: "8:24",
      views: 1245,
      uploadDate: "2023-08-02",
      description:
        "In this video, I share my top 5 travel tips for deaf travelers this summer. Learn how to navigate airports, hotels, and tourist attractions with ease.",
    },
    {
      id: 2,
      title: "My Oklahoma Journey",
      thumbnail: "/placeholder.svg?height=180&width=320",
      category: "Vlog",
      duration: "12:37",
      views: 982,
      uploadDate: "2023-07-28",
      description:
        "Join me as I explore Oklahoma City and discover deaf-friendly attractions and restaurants. This vlog showcases my adventures and experiences.",
    },
    {
      id: 3,
      title: "Product Review: Vibrating Alarm Clock",
      thumbnail: "/placeholder.svg?height=180&width=320",
      category: "Review",
      duration: "6:15",
      views: 1567,
      uploadDate: "2023-07-15",
      description:
        "A comprehensive review of the latest vibrating alarm clock designed for deaf users. I test all features and share my honest opinions.",
    },
    {
      id: 4,
      title: "ASL Sign of the Day: Travel Words",
      thumbnail: "/placeholder.svg?height=180&width=320",
      category: "Educational",
      duration: "4:42",
      views: 2103,
      uploadDate: "2023-07-10",
      description:
        "Learn essential travel-related signs in American Sign Language. This video covers signs for airport, hotel, restaurant, and more.",
    },
    {
      id: 5,
      title: "Deaf Culture: Myths and Facts",
      thumbnail: "/placeholder.svg?height=180&width=320",
      category: "Educational",
      duration: "15:18",
      views: 3245,
      uploadDate: "2023-06-28",
      description:
        "Debunking common myths about deaf culture and sharing important facts everyone should know. An educational video for both deaf and hearing audiences.",
    },
    {
      id: 6,
      title: "Food Review: Local BBQ Restaurant",
      thumbnail: "/placeholder.svg?height=180&width=320",
      category: "Review",
      duration: "9:53",
      views: 876,
      uploadDate: "2023-06-15",
      description:
        "Trying out a local BBQ restaurant in Tulsa, Oklahoma. I share my experience with the food, service, and accessibility for deaf customers.",
    },
  ]

  const filteredVideos = videos.filter((video) => {
    // Apply search filter
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.category.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply category filter
    const matchesCategory = categoryFilter === "all" || video.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const categories = ["Educational", "Vlog", "Review", "Tutorial"]

  const handlePlayVideo = (video: any) => {
    setSelectedVideo(video)
    setShowVideoPlayer(true)
  }

  const handleDeleteVideo = (videoId: number) => {
    toast({
      title: "Video deleted",
      description: "The video has been removed from your library.",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Video Library</CardTitle>
          <CardDescription>Manage and organize your video content</CardDescription>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Video
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search videos..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Tabs defaultValue="grid">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="grid">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/50">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-12 w-12 rounded-full bg-white/20 text-white hover:bg-white/30"
                        onClick={() => handlePlayVideo(video)}
                      >
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate" title={video.title}>
                        {video.title}
                      </h3>
                      <Badge variant="outline">{video.category}</Badge>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                      <Eye className="mr-1 h-3 w-3" />
                      <span>{video.views} views</span>
                      <span className="mx-2">•</span>
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>{video.uploadDate}</span>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => handlePlayVideo(video)}>
                        <Play className="mr-2 h-3 w-3" />
                        Play
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDeleteVideo(video.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list">
            <div className="space-y-4">
              {filteredVideos.map((video) => (
                <div key={video.id} className="flex items-start space-x-4 p-4 rounded-lg border">
                  <div className="relative h-24 w-40 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{video.title}</h3>
                      <Badge variant="outline">{video.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{video.description}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                      <Eye className="mr-1 h-3 w-3" />
                      <span>{video.views} views</span>
                      <span className="mx-2">•</span>
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>{video.uploadDate}</span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" size="sm" onClick={() => handlePlayVideo(video)}>
                      <Play className="mr-2 h-3 w-3" />
                      Play
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="mr-2 h-3 w-3" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteVideo(video.id)}>
                      <Trash2 className="mr-2 h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={showVideoPlayer} onOpenChange={setShowVideoPlayer}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedVideo?.title}</DialogTitle>
              <DialogDescription>
                {selectedVideo?.category} • {selectedVideo?.uploadDate}
              </DialogDescription>
            </DialogHeader>
            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
              <div className="text-center">
                <Play className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">MUX Video Player would appear here</p>
                <p className="text-xs text-muted-foreground">Playing: {selectedVideo?.title}</p>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{selectedVideo?.title}</h3>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Eye className="mr-1 h-3 w-3" />
                  <span>{selectedVideo?.views} views</span>
                  <span className="mx-2">•</span>
                  <Calendar className="mr-1 h-3 w-3" />
                  <span>{selectedVideo?.uploadDate}</span>
                </div>
                <p className="text-sm mt-2">{selectedVideo?.description}</p>
              </div>
              <Badge variant="outline">{selectedVideo?.category}</Badge>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
