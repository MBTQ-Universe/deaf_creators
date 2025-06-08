"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Instagram, Twitter, Youtube, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function SocialMediaCalendar() {
  const [date, setDate] = useState<Date>(new Date())
  const [showAddPost, setShowAddPost] = useState(false)

  const scheduledPosts = [
    {
      id: 1,
      title: "ASL Travel Tips for Summer",
      date: "2023-08-15",
      platforms: ["instagram", "twitter"],
    },
    {
      id: 2,
      title: "Deaf Culture Awareness Video",
      date: "2023-08-18",
      platforms: ["youtube"],
    },
    {
      id: 3,
      title: "Product Review: Vibrating Alarm",
      date: "2023-08-22",
      platforms: ["instagram", "youtube", "twitter"],
    },
    {
      id: 4,
      title: "ASL Sign of the Day Series",
      date: "2023-08-25",
      platforms: ["instagram", "twitter"],
    },
  ]

  const getPostsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return scheduledPosts.filter((post) => post.date === dateString)
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="h-3 w-3 text-pink-500" />
      case "youtube":
        return <Youtube className="h-3 w-3 text-red-500" />
      case "twitter":
        return <Twitter className="h-3 w-3 text-blue-400" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5" />
            Content Calendar
          </CardTitle>
          <CardDescription>Schedule and manage your social media posts</CardDescription>
        </div>
        <Dialog open={showAddPost} onOpenChange={setShowAddPost}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Post
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Post</DialogTitle>
              <DialogDescription>Create and schedule a new post for your social media platforms</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-center text-muted-foreground">Post scheduling form would go here</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddPost(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddPost(false)}>Schedule Post</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => date && setDate(date)}
          className="rounded-md border"
        />

        <div className="mt-6">
          <h3 className="font-medium mb-2">Posts for {date.toLocaleDateString()}</h3>
          <div className="space-y-2">
            {getPostsForDate(date).length > 0 ? (
              getPostsForDate(date).map((post) => (
                <div key={post.id} className="p-3 rounded-md border">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{post.title}</h4>
                    <div className="flex space-x-1">
                      {post.platforms.map((platform) => (
                        <div key={platform} className="flex items-center justify-center h-6 w-6 rounded-full bg-muted">
                          {getPlatformIcon(platform)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No posts scheduled for this date.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
