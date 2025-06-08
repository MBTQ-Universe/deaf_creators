import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Users, Sparkles, ArrowRight, Video, Camera, Mic, Globe, ChevronRight } from "lucide-react"
import { Hero } from "@/components/hero"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
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
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#creators" className="text-sm font-medium hover:text-primary">
              Creators
            </Link>
            <Link href="#b-roll" className="text-sm font-medium hover:text-primary">
              B-Roll Collection
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonials
            </Link>
            <Link href="/getstarted" className="text-sm font-medium hover:text-primary">
              Get Started
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <section id="features" className="py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="inline-flex" variant="outline">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Platform Features
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Everything You Need to Succeed
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  DeafCreator provides all the tools and resources deaf content creators need to thrive in the digital
                  landscape.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {[
                {
                  title: "Content Management",
                  description:
                    "Easily upload, organize, and manage your videos, photos, and other content in one place.",
                  icon: <Video className="h-10 w-10 text-primary" />,
                },
                {
                  title: "Analytics Dashboard",
                  description: "Track your performance across platforms with detailed analytics and insights.",
                  icon: <Camera className="h-10 w-10 text-primary" />,
                },
                {
                  title: "Monetization Tools",
                  description:
                    "Maximize your earnings with integrated sponsorship, affiliate, and membership features.",
                  icon: <Mic className="h-10 w-10 text-primary" />,
                },
                {
                  title: "Community Building",
                  description: "Connect with other deaf creators, collaborate, and grow your audience together.",
                  icon: <Users className="h-10 w-10 text-primary" />,
                },
                {
                  title: "Accessibility First",
                  description:
                    "Built with accessibility at its core, ensuring a seamless experience for deaf creators.",
                  icon: <Globe className="h-10 w-10 text-primary" />,
                },
                {
                  title: "AI Sign Language Assistant",
                  description: "Get personalized guidance and support from our AI assistant fluent in sign language.",
                  icon: <Sparkles className="h-10 w-10 text-primary" />,
                },
              ].map((feature, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                      <div className="rounded-full bg-primary/10 p-3">{feature.icon}</div>
                      <div className="space-y-2">
                        <h3 className="font-bold">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* B-Roll Collection Section */}
        <section id="b-roll" className="py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="inline-flex" variant="outline">
                  <Video className="mr-1 h-3 w-3" />
                  B-Roll Collection
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Authentic Visual Stories
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our collection of B-roll footage capturing the authentic experiences and creative processes of
                  deaf content creators.
                </p>
              </div>
            </div>
            <div className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Featured B-Roll Categories</h3>
                  <div className="space-y-2">
                    {[
                      "Creative Process",
                      "Behind the Scenes",
                      "Daily Life",
                      "Community Events",
                      "Sign Language in Action",
                      "Content Creation Setup",
                    ].map((category, index) => (
                      <div key={index} className="flex items-center p-3 rounded-lg border">
                        <div className="mr-4 rounded-full bg-primary/10 p-2">
                          <Video className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{category}</h4>
                          <p className="text-sm text-muted-foreground">Authentic footage of deaf creators</p>
                        </div>
                        <Button variant="ghost" size="icon" className="ml-auto">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4">
                    <Link href="/b-roll-collection">
                      <Button className="w-full">Browse Full Collection</Button>
                    </Link>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      title: "Studio Setup",
                      image: "/placeholder.svg?height=200&width=300",
                      duration: "0:45",
                    },
                    {
                      title: "ASL Performance",
                      image: "/placeholder.svg?height=200&width=300",
                      duration: "1:20",
                    },
                    {
                      title: "Content Planning",
                      image: "/placeholder.svg?height=200&width=300",
                      duration: "0:55",
                    },
                    {
                      title: "Community Event",
                      image: "/placeholder.svg?height=200&width=300",
                      duration: "1:10",
                    },
                  ].map((clip, index) => (
                    <div key={index} className="relative group overflow-hidden rounded-lg">
                      <div className="aspect-video relative">
                        <Image
                          src={clip.image || "/placeholder.svg"}
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
                      <h4 className="font-medium text-sm mt-2">{clip.title}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Amplify Your Creative Voice?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of deaf content creators who are thriving with DeafCreator.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="gap-1">
                    Get Started for Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
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
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/accessibility" className="text-sm text-muted-foreground hover:text-foreground">
              Accessibility
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
