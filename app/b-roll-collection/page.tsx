import Image from "next/image"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Play, Download, Search, Calendar, User } from "lucide-react"

export default function BRollCollectionPage() {
  const categories = [
    "All",
    "Creative Process",
    "Behind the Scenes",
    "Daily Life",
    "Community Events",
    "Sign Language",
    "Content Creation",
  ]

  const bRollClips = [
    {
      id: 1,
      title: "ASL Slam Performance",
      creator: "ASL Slam",
      category: "Sign Language",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "0:45",
      uploadDate: "2023-08-15",
      description: "B-roll footage of ASL Slam performers expressing poetry through sign language on stage.",
    },
    {
      id: 2,
      title: "Content Planning Session",
      creator: "Cheyenna Clearbrook",
      category: "Creative Process",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "1:20",
      uploadDate: "2023-08-10",
      description:
        "Behind the scenes of Cheyenna planning content for her channel, writing ideas and organizing her schedule.",
    },
    {
      id: 3,
      title: "Video Editing Workflow",
      creator: "Rikki Poynter",
      category: "Content Creation",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "0:55",
      uploadDate: "2023-08-05",
      description: "B-roll of Rikki's video editing process, showcasing her workflow and attention to captioning.",
    },
    {
      id: 4,
      title: "Travel Vlogging Setup",
      creator: "Seek the World",
      category: "Behind the Scenes",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "1:10",
      uploadDate: "2023-07-28",
      description:
        "Calvin setting up his camera equipment while traveling, capturing the behind-the-scenes of travel vlogging.",
    },
    {
      id: 5,
      title: "Makeup Tutorial Preparation",
      creator: "Jessica Flores",
      category: "Creative Process",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "0:50",
      uploadDate: "2023-07-22",
      description: "Jessica preparing for a makeup tutorial, organizing products and testing lighting.",
    },
    {
      id: 6,
      title: "Deaf Community Meetup",
      creator: "Deafies in Drag",
      category: "Community Events",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "1:30",
      uploadDate: "2023-07-15",
      description:
        "Footage from a deaf community event, showing interactions and connections between creators and fans.",
    },
    {
      id: 7,
      title: "Morning Routine",
      creator: "BigDRawson",
      category: "Daily Life",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "1:15",
      uploadDate: "2023-07-10",
      description: "A glimpse into the morning routine of a deaf content creator, showing everyday life moments.",
    },
    {
      id: 8,
      title: "ASL Teaching Moment",
      creator: "Crom Saunders",
      category: "Sign Language",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "0:40",
      uploadDate: "2023-07-05",
      description: "Crom demonstrating ASL teaching techniques and expressive signing for educational content.",
    },
    {
      id: 9,
      title: "Studio Lighting Setup",
      creator: "Dack Virnig",
      category: "Content Creation",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "1:05",
      uploadDate: "2023-06-28",
      description: "Dack setting up studio lighting optimized for clear visibility of sign language in videos.",
    },
    {
      id: 10,
      title: "Collaborative Project Meeting",
      creator: "Deaf West Theater",
      category: "Behind the Scenes",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "1:25",
      uploadDate: "2023-06-22",
      description: "Members of Deaf West Theater discussing and planning a collaborative digital content project.",
    },
    {
      id: 11,
      title: "Social Media Content Creation",
      creator: "Jazzy Whipps",
      category: "Creative Process",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "0:55",
      uploadDate: "2023-06-15",
      description: "Jazzy creating content specifically for social media platforms, showing the creative process.",
    },
    {
      id: 12,
      title: "Deaf Film Festival",
      creator: "Deaf Film Camp",
      category: "Community Events",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "1:40",
      uploadDate: "2023-06-10",
      description: "Scenes from a deaf film festival, capturing the atmosphere and community engagement.",
    },
  ]

  return (
    <DashboardShell>
      <DashboardHeader
        heading="B-Roll Collection"
        text="Authentic footage showcasing deaf content creators in action"
      />

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 space-y-6">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Search</h3>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search clips..." className="pl-8" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Categories</h3>
                <div className="space-y-1">
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${index}`}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked={category === "All"}
                      />
                      <label htmlFor={`category-${index}`} className="ml-2 text-sm">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Duration</h3>
                <div className="space-y-1">
                  {["Under 30s", "30s - 1min", "1min - 2min", "Over 2min"].map((duration, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`duration-${index}`}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor={`duration-${index}`} className="ml-2 text-sm">
                        {duration}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Creators</h3>
                <div className="space-y-1">
                  {["ASL Slam", "Cheyenna Clearbrook", "Rikki Poynter", "Seek the World", "More..."].map(
                    (creator, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`creator-${index}`}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor={`creator-${index}`} className="ml-2 text-sm">
                          {creator}
                        </label>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-2">Need Custom B-Roll?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Request custom B-roll footage for your specific project needs.
              </p>
              <Button variant="outline" className="w-full">
                Request Custom Footage
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Tabs defaultValue="grid">
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <select className="h-9 rounded-md border border-input bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                  <option value="duration-asc">Duration (Shortest)</option>
                  <option value="duration-desc">Duration (Longest)</option>
                </select>
              </div>
            </div>

            <TabsContent value="grid" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bRollClips.map((clip) => (
                  <Card key={clip.id} className="overflow-hidden">
                    <div className="relative aspect-video group">
                      <Image
                        src={clip.thumbnail || "/placeholder.svg"}
                        alt={clip.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-12 w-12 rounded-full bg-white/20 text-white hover:bg-white/30"
                        >
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {clip.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium truncate" title={clip.title}>
                          {clip.title}
                        </h3>
                        <Badge variant="outline">{clip.category}</Badge>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mb-2">
                        <User className="mr-1 h-3 w-3" />
                        <span>{clip.creator}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>{clip.uploadDate}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{clip.description}</p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Play className="mr-2 h-3 w-3" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="mr-2 h-3 w-3" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              <div className="space-y-4">
                {bRollClips.map((clip) => (
                  <Card key={clip.id}>
                    <div className="flex flex-col md:flex-row">
                      <div className="relative md:w-64 aspect-video">
                        <Image
                          src={clip.thumbnail || "/placeholder.svg"}
                          alt={clip.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {clip.duration}
                        </div>
                      </div>
                      <CardContent className="flex-1 p-4">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium">{clip.title}</h3>
                          <Badge variant="outline">{clip.category}</Badge>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mb-2">
                          <User className="mr-1 h-3 w-3" />
                          <span>{clip.creator}</span>
                          <span className="mx-2">•</span>
                          <Calendar className="mr-1 h-3 w-3" />
                          <span>{clip.uploadDate}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{clip.description}</p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Play className="mr-2 h-3 w-3" />
                            Preview
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-3 w-3" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-center mt-8">
            <Button variant="outline" className="mx-2">
              Previous
            </Button>
            <Button variant="outline" className="mx-2">
              Next
            </Button>
          </div>
        </div>
      </div>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=24&width=24"
              width={24}
              height={24}
              alt="DeafCreator Logo"
              className="rounded-md"
            />
            <p className="text-sm text-muted-foreground">
              © 2023 DeafCreator. All rights reserved. |{" "}
              <a href="https://www.deafcreators.mbtquniverse.com" className="hover:underline">
                www.deafcreators.mbtquniverse.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </DashboardShell>
  )
}
