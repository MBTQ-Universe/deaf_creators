import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, ArrowRight, Download, ChevronRight } from "lucide-react"

export default function WatchDemoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=32&width=32"
              width={32}
              height={32}
              alt="DeafCreator Logo"
              className="rounded-md"
            />
            <span className="font-bold text-xl">DeafCreator</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/getstarted" className="text-sm font-medium hover:text-primary">
              Get Started
            </Link>
            <Link href="/login" className="text-sm font-medium hover:text-primary">
              Log In
            </Link>
            <Link href="/signup" className="text-sm font-medium hover:text-primary">
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <Badge className="mb-2">Platform Demo</Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">See DeafCreator in Action</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Watch our demo videos to see how DeafCreator empowers deaf content creators with powerful tools and
                features.
              </p>
            </div>

            <div className="relative aspect-video max-w-4xl mx-auto mb-12 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=720&width=1280"
                alt="DeafCreator Platform Demo"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Button size="lg" className="gap-2 rounded-full h-16 w-16 p-0 flex items-center justify-center">
                  <Play className="h-8 w-8" />
                  <span className="sr-only">Play Demo Video</span>
                </Button>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {[
                {
                  title: "Platform Overview",
                  description: "Get a comprehensive tour of the DeafCreator platform and its key features.",
                  duration: "5:24",
                  thumbnail: "/placeholder.svg?height=180&width=320",
                },
                {
                  title: "Content Management",
                  description: "Learn how to upload, organize, and manage your videos and photos.",
                  duration: "4:12",
                  thumbnail: "/placeholder.svg?height=180&width=320",
                },
                {
                  title: "Analytics Dashboard",
                  description: "Discover how to track your performance and gain insights from your analytics.",
                  duration: "3:45",
                  thumbnail: "/placeholder.svg?height=180&width=320",
                },
                {
                  title: "Monetization Tools",
                  description: "See how to maximize your earnings with our integrated monetization features.",
                  duration: "6:18",
                  thumbnail: "/placeholder.svg?height=180&width=320",
                },
                {
                  title: "Community Features",
                  description: "Learn how to connect with other deaf creators and grow your network.",
                  duration: "4:56",
                  thumbnail: "/placeholder.svg?height=180&width=320",
                },
                {
                  title: "AI Sign Language Assistant",
                  description: "Explore our AI assistant that provides guidance and support in sign language.",
                  duration: "5:32",
                  thumbnail: "/placeholder.svg?height=180&width=320",
                },
              ].map((demo, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <Image src={demo.thumbnail || "/placeholder.svg"} alt={demo.title} fill className="object-cover" />
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
                      {demo.duration}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium">{demo.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{demo.description}</p>
                    <Button variant="ghost" size="sm" className="mt-2 w-full">
                      <Play className="mr-2 h-3 w-3" />
                      Watch Demo
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Resources for Deaf Creators</h2>
                <p className="text-muted-foreground">
                  Download our comprehensive guides and resources designed specifically for deaf content creators.
                </p>
                <ul className="space-y-4">
                  {[
                    {
                      title: "Getting Started Guide",
                      description: "A step-by-step guide to setting up your DeafCreator account and profile.",
                      size: "2.4 MB",
                    },
                    {
                      title: "Content Creation Best Practices",
                      description: "Tips and strategies for creating engaging content as a deaf creator.",
                      size: "3.1 MB",
                    },
                    {
                      title: "Monetization Strategies",
                      description: "Learn how to effectively monetize your content and build sustainable income.",
                      size: "1.8 MB",
                    },
                    {
                      title: "Accessibility Checklist",
                      description: "Ensure your content is accessible to both deaf and hearing audiences.",
                      size: "1.2 MB",
                    },
                  ].map((resource, index) => (
                    <li key={index} className="flex items-start border rounded-lg p-3">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-primary"
                        >
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">PDF • {resource.size}</span>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Download className="h-3 w-3" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-[400px] lg:h-[500px]">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Resources for Deaf Creators"
                  fill
                  className="object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Ready to Join DeafCreator?</h2>
            <p className="max-w-[600px] mx-auto mb-8 text-primary-foreground/90">
              Start your journey today and join our community of deaf content creators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="gap-1">
                  Create Your Account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/getstarted">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-1 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Learn More
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

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
    </div>
  )
}
