"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Instagram,
  Youtube,
  Twitter,
  Video,
  ImageIcon,
  Calendar,
  Clock,
  Send,
  Upload,
  Settings,
  Wand2,
} from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

export function SocialMediaDashboard() {
  const { toast } = useToast()
  const [postContent, setPostContent] = useState("")
  const [isScheduling, setIsScheduling] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    instagram: true,
    youtube: false,
    twitter: true,
    tiktok: false,
  })

  const handlePost = () => {
    if (!postContent.trim()) return

    toast({
      title: "Content posted",
      description: "Your content has been posted to the selected platforms.",
    })

    setPostContent("")
  }

  const handleSchedule = () => {
    if (!postContent.trim()) return

    setIsScheduling(false)

    toast({
      title: "Content scheduled",
      description: "Your content has been scheduled for posting.",
    })

    setPostContent("")
  }

  const togglePlatform = (platform: keyof typeof selectedPlatforms) => {
    setSelectedPlatforms((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }))
  }

  const platforms = [
    {
      id: "instagram",
      name: "Instagram",
      icon: Instagram,
      color: "text-pink-500",
      followers: "8.2K",
      engagement: "5.7%",
      posts: 142,
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: Youtube,
      color: "text-red-500",
      followers: "12.5K",
      engagement: "4.2%",
      posts: 78,
    },
    {
      id: "twitter",
      name: "Twitter",
      icon: Twitter,
      color: "text-blue-400",
      followers: "5.4K",
      engagement: "3.1%",
      posts: 215,
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: Twitter, // Using Twitter icon as placeholder for TikTok
      color: "text-black dark:text-white",
      followers: "20.1K",
      engagement: "8.3%",
      posts: 95,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Management</CardTitle>
        <CardDescription>Create, schedule, and analyze your social media content</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="create">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="create">Create Content</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="queue">Content Queue</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <div className="space-y-4">
              <Textarea
                placeholder="What would you like to share?"
                className="min-h-[120px]"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />

              <div className="flex flex-wrap gap-2">
                {Object.entries(selectedPlatforms).map(([platform, isSelected]) => {
                  const platformInfo = platforms.find((p) => p.id === platform)
                  if (!platformInfo) return null

                  return (
                    <Badge
                      key={platform}
                      variant={isSelected ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => togglePlatform(platform as keyof typeof selectedPlatforms)}
                    >
                      <platformInfo.icon className={`mr-1 h-3 w-3 ${platformInfo.color}`} />
                      {platformInfo.name}
                    </Badge>
                  )
                })}
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Add Image
                </Button>
                <Button variant="outline" className="flex-1">
                  <Video className="mr-2 h-4 w-4" />
                  Add Video
                </Button>
                <Button variant="outline" className="flex-1">
                  <Wand2 className="mr-2 h-4 w-4" />
                  AI Assist
                </Button>
              </div>

              <div className="flex justify-between mt-4">
                <Dialog open={isScheduling} onOpenChange={setIsScheduling}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Schedule Post</DialogTitle>
                      <DialogDescription>Choose when to publish your content</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="schedule-date">Date</Label>
                        <Input id="schedule-date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="schedule-time">Time</Label>
                        <Input id="schedule-time" type="time" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <select
                          id="timezone"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="America/Chicago">Central Time (CT)</option>
                          <option value="America/Denver">Mountain Time (MT)</option>
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        </select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="optimal-time" />
                        <Label htmlFor="optimal-time">Post at optimal time for engagement</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsScheduling(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSchedule}>Schedule Post</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button onClick={handlePost} disabled={!postContent.trim()}>
                  <Send className="mr-2 h-4 w-4" />
                  Post Now
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="platforms">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {platforms.map((platform) => (
                <Card key={platform.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center p-6">
                      <platform.icon className={`h-12 w-12 ${platform.color}`} />
                      <h3 className="mt-4 font-semibold">{platform.name}</h3>
                      <p className="text-sm text-muted-foreground">@MoniqueSignsLife</p>
                      <div className="grid grid-cols-3 gap-2 w-full mt-4 text-center">
                        <div>
                          <p className="text-sm font-medium">{platform.followers}</p>
                          <p className="text-xs text-muted-foreground">Followers</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{platform.engagement}</p>
                          <p className="text-xs text-muted-foreground">Engagement</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{platform.posts}</p>
                          <p className="text-xs text-muted-foreground">Posts</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4 w-full">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Upload className="mr-2 h-3 w-3" />
                          Post
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Settings className="mr-2 h-3 w-3" />
                          Settings
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="queue">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Upcoming Posts</h3>
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Calendar
                </Button>
              </div>

              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start space-x-4 p-4 rounded-lg border">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                    <Image src="/placeholder.svg?height=80&width=80" alt="Post preview" fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">ASL Travel Tips for Summer</h4>
                      <div className="flex space-x-1">
                        <Badge variant="outline">
                          <Instagram className="mr-1 h-3 w-3 text-pink-500" />
                          Instagram
                        </Badge>
                        <Badge variant="outline">
                          <Twitter className="mr-1 h-3 w-3 text-blue-400" />
                          Twitter
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      Sharing my top 5 travel tips for deaf travelers this summer! #DeafTravel #ASL #SummerTips
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>Aug 15, 2023</span>
                        <span className="mx-1">•</span>
                        <Clock className="mr-1 h-3 w-3" />
                        <span>10:30 AM</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
