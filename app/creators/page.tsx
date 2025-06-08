import Link from "next/link"
import Image from "next/image"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Users, ExternalLink, Youtube, Instagram, Twitter } from "lucide-react"

export default function CreatorsPage() {
  const categories = [
    "All",
    "ASL Poetry",
    "Lifestyle",
    "Education",
    "Travel",
    "Entertainment",
    "Comedy",
    "Advocacy",
    "Beauty",
    "Technology",
  ]

  const creators = [
    {
      id: 1,
      name: "ASL Slam",
      handle: "@aslslam",
      image: "/placeholder.svg?height=300&width=300",
      category: "ASL Poetry",
      followers: "12.5K",
      description:
        "A safe space for the Sign Language community to play with language(s), offering a stage for performers to rap, rhapsodize and rehash in sign language.",
      socialLinks: {
        youtube: "https://www.youtube.com/user/ASLSLAM",
        facebook: "https://www.facebook.com/ASL-SLAM-161526577206967",
        instagram: null,
        twitter: null,
      },
    },
    {
      id: 2,
      name: "BigDRawson",
      handle: "@bigdrawson",
      image: "/placeholder.svg?height=300&width=300",
      category: "Comedy",
      followers: "18.7K",
      description:
        "Creating humorous and relatable content about deaf experiences and everyday life situations from a deaf perspective.",
      socialLinks: {
        youtube: "https://www.youtube.com/user/BigDRawson",
        facebook: null,
        instagram: null,
        twitter: null,
      },
    },
    {
      id: 3,
      name: "Cheyenna Clearbrook",
      handle: "@cheyennaclearbrook",
      image: "/placeholder.svg?height=300&width=300",
      category: "Lifestyle",
      followers: "45.2K",
      description:
        "Creating content about deaf culture, lifestyle, and beauty to bridge the gap between deaf and hearing communities.",
      socialLinks: {
        youtube: "https://www.youtube.com/channel/UCL4ZEsnRRng4iKT4va2JN2g",
        facebook: null,
        instagram: null,
        twitter: null,
      },
    },
    {
      id: 4,
      name: "Rikki Poynter",
      handle: "@rikkipoynter",
      image: "/placeholder.svg?height=300&width=300",
      category: "Education & Advocacy",
      followers: "32.8K",
      description: "Advocate for accessibility in online content, focusing on captioning awareness and deaf education.",
      socialLinks: {
        youtube: "https://www.youtube.com/user/rikkipoynter",
        facebook: null,
        instagram: null,
        twitter: null,
      },
    },
    {
      id: 5,
      name: "Seek the World",
      handle: "@seektheworld",
      image: "/placeholder.svg?height=300&width=300",
      category: "Travel",
      followers: "28.6K",
      description:
        "Travel content creator showing the world through a deaf perspective, breaking barriers and inspiring adventures.",
      socialLinks: {
        youtube: null,
        facebook: "https://www.facebook.com/seektheworld2015",
        instagram: null,
        twitter: null,
      },
    },
    {
      id: 6,
      name: "Deafies in Drag",
      handle: "@deafiesindrag",
      image: "/placeholder.svg?height=300&width=300",
      category: "Entertainment",
      followers: "15.9K",
      description:
        "Comedy duo breaking stereotypes and bringing deaf representation to drag performance and entertainment.",
      socialLinks: {
        youtube: null,
        facebook: "https://www.facebook.com/deafiesindrag/",
        instagram: null,
        twitter: null,
      },
    },
    {
      id: 7,
      name: "Jessica Flores",
      handle: "@jessicaflores",
      image: "/placeholder.svg?height=300&width=300",
      category: "Lifestyle & Education",
      followers: "22.3K",
      description: "Creating accessible content about deaf awareness, ASL, and everyday life as a deaf person.",
      socialLinks: {
        youtube: "https://www.youtube.com/user/cuppycakenbake",
        facebook: null,
        instagram: null,
        twitter: null,
      },
    },
    {
      id: 8,
      name: "Crom Saunders",
      handle: "@cromsaunders",
      image: "/placeholder.svg?height=300&width=300",
      category: "Education",
      followers: "8.5K",
      description: "Educator and performer focusing on ASL literature, poetry, and deaf culture education.",
      socialLinks: {
        youtube: "https://www.youtube.com/user/Crom",
        facebook: null,
        instagram: null,
        twitter: null,
      },
    },
    {
      id: 9,
      name: "Dack Virnig",
      handle: "@dackvirnig",
      image: "/placeholder.svg?height=300&width=300",
      category: "Entertainment",
      followers: "14.2K",
      description: "Actor and content creator sharing stories and experiences through visual storytelling and ASL.",
      socialLinks: {
        youtube: "https://www.youtube.com/user/DackVirnig",
        facebook: null,
        instagram: null,
        twitter: null,
      },
    },
    {
      id: 10,
      name: "Deaf West Theater",
      handle: "@deafwesttheatre",
      image: "/placeholder.svg?height=300&width=300",
      category: "Arts & Performance",
      followers: "25.7K",
      description:
        "Theater company integrating ASL with spoken English performances, creating a bridge between deaf and hearing worlds through the arts.",
      socialLinks: {
        youtube: "https://www.youtube.com/user/deafwesttheatre",
        facebook: "https://www.facebook.com/deafwesttheatre",
        instagram: null,
        twitter: null,
      },
    },
    {
      id: 11,
      name: "Jazzy Whipps",
      handle: "@jazzywhipps",
      image: "/placeholder.svg?height=300&width=300",
      category: "Lifestyle",
      followers: "11.3K",
      description: "Content creator sharing deaf experiences, lifestyle content, and promoting deaf awareness.",
      socialLinks: {
        youtube: "https://www.youtube.com/channel/UCfaz727ukS3eFYNLysA9rRw",
        facebook: null,
        instagram: null,
        twitter: null,
      },
    },
    {
      id: 12,
      name: "Warren Snipe",
      handle: "@wsnipe",
      image: "/placeholder.svg?height=300&width=300",
      category: "Music & Performance",
      followers: "30.1K",
      description: "Deaf rapper, actor, and performer known for pioneering 'dip hop' - hip hop through deaf culture.",
      socialLinks: {
        youtube: null,
        facebook: "https://www.facebook.com/wsnipe",
        instagram: null,
        twitter: null,
      },
    },
  ]

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Featured Creators"
        text="Discover talented deaf content creators making an impact in the digital space"
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
                  <Input type="search" placeholder="Search creators..." className="pl-8" />
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
                <h3 className="text-sm font-medium">Follower Count</h3>
                <div className="space-y-1">
                  {["Under 10K", "10K - 25K", "25K - 50K", "Over 50K"].map((range, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`followers-${index}`}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor={`followers-${index}`} className="ml-2 text-sm">
                        {range}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Platforms</h3>
                <div className="space-y-1">
                  {["YouTube", "Instagram", "TikTok", "Facebook", "Twitter"].map((platform, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`platform-${index}`}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor={`platform-${index}`} className="ml-2 text-sm">
                        {platform}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-2">Are You a Creator?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Join our platform to connect with the deaf creator community and grow your audience.
              </p>
              <Button variant="outline" className="w-full">
                Apply to Join
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
                  <option value="popular">Most Popular</option>
                  <option value="recent">Recently Added</option>
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                </select>
              </div>
            </div>

            <TabsContent value="grid" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creators.map((creator) => (
                  <Card key={creator.id} className="overflow-hidden">
                    <div className="aspect-square relative">
                      <Image
                        src={creator.image || "/placeholder.svg"}
                        alt={creator.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-lg">{creator.name}</h3>
                          <Badge>{creator.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{creator.handle}</p>
                        <div className="flex items-center pt-1">
                          <Users className="h-4 w-4 text-muted-foreground mr-1" />
                          <span className="text-sm text-muted-foreground">{creator.followers} followers</span>
                        </div>
                        <p className="text-sm line-clamp-3 pt-2">{creator.description}</p>
                        <div className="flex space-x-2 pt-3">
                          {creator.socialLinks.youtube && (
                            <Link href={creator.socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="icon" className="h-8 w-8">
                                <Youtube className="h-4 w-4 text-red-500" />
                              </Button>
                            </Link>
                          )}
                          {creator.socialLinks.facebook && (
                            <Link href={creator.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="icon" className="h-8 w-8">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 320 512"
                                  className="h-4 w-4 fill-blue-600"
                                >
                                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                </svg>
                              </Button>
                            </Link>
                          )}
                          {creator.socialLinks.instagram && (
                            <Link href={creator.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="icon" className="h-8 w-8">
                                <Instagram className="h-4 w-4 text-pink-500" />
                              </Button>
                            </Link>
                          )}
                          {creator.socialLinks.twitter && (
                            <Link href={creator.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="icon" className="h-8 w-8">
                                <Twitter className="h-4 w-4 text-blue-400" />
                              </Button>
                            </Link>
                          )}
                          <Button variant="outline" className="flex-1 ml-auto">
                            <Link href={`/creators/${creator.handle.replace("@", "").toLowerCase()}`}>
                              View Profile
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              <div className="space-y-4">
                {creators.map((creator) => (
                  <Card key={creator.id}>
                    <div className="flex flex-col md:flex-row">
                      <div className="relative md:w-48 aspect-square">
                        <Image
                          src={creator.image || "/placeholder.svg"}
                          alt={creator.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="flex-1 p-4">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-lg">{creator.name}</h3>
                          <Badge>{creator.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{creator.handle}</p>
                        <div className="flex items-center pt-1 mb-2">
                          <Users className="h-4 w-4 text-muted-foreground mr-1" />
                          <span className="text-sm text-muted-foreground">{creator.followers} followers</span>
                        </div>
                        <p className="text-sm mb-4">{creator.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            {creator.socialLinks.youtube && (
                              <Link href={creator.socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  <Youtube className="h-4 w-4 text-red-500" />
                                </Button>
                              </Link>
                            )}
                            {creator.socialLinks.facebook && (
                              <Link href={creator.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 320 512"
                                    className="h-4 w-4 fill-blue-600"
                                  >
                                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                  </svg>
                                </Button>
                              </Link>
                            )}
                            {creator.socialLinks.instagram && (
                              <Link href={creator.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  <Instagram className="h-4 w-4 text-pink-500" />
                                </Button>
                              </Link>
                            )}
                            {creator.socialLinks.twitter && (
                              <Link href={creator.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  <Twitter className="h-4 w-4 text-blue-400" />
                                </Button>
                              </Link>
                            )}
                          </div>
                          <Button>
                            <Link href={`/creators/${creator.handle.replace("@", "").toLowerCase()}`}>
                              View Profile
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
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
    </DashboardShell>
  )
}
