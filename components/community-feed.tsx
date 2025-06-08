"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageSquare, Share2, Video, ImageIcon, Smile } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CommunityFeed() {
  const { toast } = useToast()
  const [postContent, setPostContent] = useState("")

  const handlePost = () => {
    if (postContent.trim()) {
      toast({
        title: "Post created",
        description: "Your post has been shared with the community",
      })
      setPostContent("")
    }
  }

  const posts = [
    {
      id: 1,
      author: {
        name: "Maya Rodriguez",
        handle: "@mayasigns",
        avatar: "/placeholder-user.jpg",
      },
      content:
        "Just finished filming a new travel vlog in Oklahoma City! Any other deaf creators in the area want to collaborate?",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      shares: 3,
    },
    {
      id: 2,
      author: {
        name: "Alex Johnson",
        handle: "@alexasl",
        avatar: "/placeholder-user.jpg",
      },
      content:
        "Excited to announce my new partnership with a deaf-owned beauty brand! Stay tuned for a special discount code for our community. #DeafOwned #BeautyCreator",
      timestamp: "Yesterday",
      likes: 56,
      comments: 12,
      shares: 15,
    },
    {
      id: 3,
      author: {
        name: "Jamal Williams",
        handle: "@jamalw",
        avatar: "/placeholder-user.jpg",
      },
      content:
        "Just published my review of the latest accessibility features in iOS. These improvements are game-changers for deaf users! Check it out and let me know your thoughts.",
      timestamp: "2 days ago",
      likes: 42,
      comments: 7,
      shares: 9,
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Share with the Community</CardTitle>
          <CardDescription>Connect with other deaf creators and share your experiences</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="What's on your mind?"
            className="min-h-[100px]"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Video className="mr-2 h-4 w-4" />
                Video
              </Button>
              <Button variant="outline" size="sm">
                <ImageIcon className="mr-2 h-4 w-4" />
                Photo
              </Button>
              <Button variant="outline" size="sm">
                <Smile className="mr-2 h-4 w-4" />
                Emoji
              </Button>
            </div>
            <Button onClick={handlePost} disabled={!postContent.trim()}>
              Post
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Community Feed</CardTitle>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="space-y-4 pb-6 border-b last:border-0">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{post.author.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {post.author.handle} • {post.timestamp}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2">{post.content}</p>
                    <div className="flex items-center space-x-4 mt-4">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Heart className="mr-1 h-4 w-4" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <MessageSquare className="mr-1 h-4 w-4" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Share2 className="mr-1 h-4 w-4" />
                        {post.shares}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline">Load More</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
