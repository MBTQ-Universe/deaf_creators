import Link from "next/link"
import Image from "next/image"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Youtube,
  Users,
  Clock,
  Calendar,
  ArrowLeft,
  ExternalLink,
  Heart,
  MessageSquare,
  Share2,
  Play,
} from "lucide-react"

export default function CreatorProfilePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the creator data based on the ID
  // For this example, we'll use mock data
  const creator = {
    id: params.id,
    name: "ASL Slam",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=400&width=1200",
    category: "Performance",
    followers: "12.5K",
    description:
      "ASL SLAM is a safe space for the Sign Language community to play with language(s). We offer the stage to performers and audience members to come up and rap, rhapsodize and rehash in sign language.",
    longDescription:
      "ASL SLAM is a safe space for the Sign Language community to play with language(s). We offer the stage to performers and audience members to come up and rap, rhapsodize and rehash in sign language. Founded in 2005, ASL SLAM has grown to become one of the most recognized platforms for deaf performers and poets. Our events bring together the deaf community and allies to celebrate sign language expression in all its forms.",
    location: "New York, NY",
    joinedDate: "January 2015",
    social: {
      youtube: "https://www.youtube.com/user/ASLSLAM",
      facebook: "https://www.facebook.com/ASL-SLAM-161526577206967",
      website: "https://www.aslslam.org",
    },
    videos: [
      {
        id: 1,
        title: "ASL Poetry Performance",
        thumbnail: "/placeholder.svg?height=180&width=320",
        duration: "8:24",
        views: 1245,
        uploadDate: "2023-08-02",
      },
      {
        id: 2,
        title: "ASL SLAM NYC Event Highlights",
        thumbnail: "/placeholder.svg?height=180&width=320",
        duration: "12:37",
        views: 982,
        uploadDate: "2023-07-28",
      },
      {
        id: 3,
        title: "Interview with Deaf Poets",
        thumbnail: "/placeholder.svg?height=180&width=320",
        duration: "15:18",
        views: 1567,
        uploadDate: "2023-07-15",
      },
    ],
    posts: [
      {
        id: 1,
        content:
          "Excited to announce our upcoming ASL SLAM event in NYC! Join us for an evening of powerful sign language poetry and performances.",
        date: "2 days ago",
        likes: 124,
        comments: 18,
        shares: 32,
      },
      {
        id: 2,
        content:
          "Check out our latest video featuring incredible ASL poetry performances from last month's event. Link in bio!",
        date: "1 week ago",
        likes: 98,
        comments: 12,
        shares: 24,
      },
      {
        id: 3,
        content:
          "We're looking for volunteers for our upcoming ASL SLAM Festival 2025. If you're passionate about sign language and poetry, DM us!",
        date: "2 weeks ago",
        likes: 156,
        comments: 27,
        shares: 45,
      },
    ],
    events: [
      {
        id: 1,
        title: "ASL SLAM NYC",
        date: "September 15, 2023",
        location: "Nuyorican Poets Cafe, New York",
        description: "Monthly ASL poetry and performance event",
      },
      {
        id: 2,
        title: "ASL SLAM Festival 2025",
        date: "June 10-12, 2025",
        location: "Lincoln Center, New York",
        description: "Annual festival celebrating sign language poetry and performance",
      },
      {
        id: 3,
        title: "ASL Poetry Workshop",
        date: "October 5, 2023",
        location: "Virtual Event",
        description: "Learn the art of ASL poetry from experienced performers",
      },
    ],
  }

  return (
    <DashboardShell>
      <div className="mb-8">
        <Link href="/creators">
          <Button variant="ghost" className="pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Creators
          </Button>
        </Link>
      </div>

      <div className="relative h-64 w-full rounded-lg overflow-hidden mb-8">
        <Image
          src={creator.coverImage || "/placeholder.svg"}
          alt={`${creator.name} cover image`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="relative h-40 w-40 rounded-lg overflow-hidden border-4 border-background -mt-20 z-10">
          <Image src={creator.image || "/placeholder.svg"} alt={creator.name} fill className="object-cover" />
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{creator.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge>{creator.category}</Badge>
                <span className="text-sm text-muted-foreground">•</span>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-1 h-4 w-4" />
                  <span>{creator.followers} followers</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button>Follow</Button>
              <Button variant="outline">Message</Button>
            </div>
          </div>

          <p className="mt-4 text-muted-foreground">{creator.longDescription}</p>

          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              <span>Joined {creator.joinedDate}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-map-pin mr-1"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{creator.location}</span>
            </div>

            <div className="flex gap-2">
              {creator.social.youtube && (
                <Link href={creator.social.youtube} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon">
                    <Youtube className="h-4 w-4" />
                  </Button>
                </Link>
              )}
              {creator.social.facebook && (
                <Link href={creator.social.facebook} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-facebook"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </Button>
                </Link>
              )}
              {creator.social.website && (
                <Link href={creator.social.website} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="videos" className="mt-8">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="videos">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creator.videos.map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <div className="relative aspect-video">
                  <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/50">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-full bg-white/20 text-white hover:bg-white/30"
                    >
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium truncate" title={video.title}>
                    {video.title}
                  </h3>
                  <div className="flex items-center text-xs text-muted-foreground mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-eye mr-1"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>{video.views} views</span>
                    <span className="mx-2">•</span>
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>{video.uploadDate}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="posts">
          <div className="space-y-6">
            {creator.posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  <p className="mb-4">{post.content}</p>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex space-x-4">
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
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events">
          <div className="space-y-6">
            {creator.events.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-map-pin mr-1"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                  <Button>RSVP</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
