import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Play, ChevronRight } from "lucide-react"

export default function GetStartedPage() {
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
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <Badge className="mb-2">Getting Started</Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Your Journey with DeafCreator Starts Here
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Follow these simple steps to set up your account and start leveraging the power of the DeafCreator platform.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3 md:gap-12 max-w-5xl mx-auto">
              {[
                {
                  step: 1,
                  title: "Create Your Account",
                  description: "Sign up for a DeafCreator account to access all platform features and start building your profile.",
                  action: "Sign Up Now",
                  link: "/signup"
                },
                {
                  step: 2,
                  title: "Complete Your Profile",
                  description: "Add your bio, social media links, and upload content samples to showcase your work.",
                  action: "Learn More",
                  link: "#profile-setup"
                },
                {
                  step: 3,
                  title: "Connect & Create",
                  description: "Start uploading content, connecting with other creators, and growing your audience.",
                  action: "Explore Features",
                  link: "#platform-features"
                }
              ].map((item) => (
                <Card key={item.step} className="relative overflow-hidden border-2 hover:border-primary transition-colors">
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground w-8 h-8 flex items-center justify-center font-bold rounded-bl-lg">
                    {item.step}
                  </div>
                  <CardContent className="p-6 pt-10">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    <Link href={item.link}>
                      <Button variant="outline" className="w-full">
                        {item.action}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section id="profile-setup" className="py-12 md:py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <Badge>Step 2</Badge>
                <h2 className="text-3xl font-bold tracking-tighter">Complete Your Profile</h2>
                <p className="text-muted-foreground">
                  Your profile is your digital identity on DeafCreator. Make it stand out with these key elements:
                </p>
                <ul className="space-y-2">
                  {[
                    "Professional profile photo and banner image",
                    "Compelling bio that highlights your unique perspective",
                    "Links to your social media accounts",
                    "Showcase your best content samples",
                    "Add your content categories and specialties",
                    "Set your language preferences and accessibility needs"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Link href="/watchdemo">
                    <Button variant="outline" className="gap-1">
                      <Play className="h-4 w-4" />
                      Watch Profile Setup Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] lg:h-[500px]">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Profile Setup Screenshot"
                  fill
                  className="object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section id="platform-features" className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <Badge>Step 3</Badge>
              <h2 className="text-3xl font-bold tracking-tighter">Connect & Create</h2>
              <p className="max-w-[700px] text-muted-foreground">
                Explore the powerful features of DeafCreator designed specifically for deaf content creators.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Content Management",
                  description: "Upload, organize, and manage your videos and photos with location tagging and timestamps.",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                },
                {
                  title: "Community Building",
                  description: "Connect with other deaf creators, collaborate, and grow your audience together.",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary"><path d="M17 21v-2a4 4   strokeLinejoin=\"round" className="h-10 w-10 text-primary"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                },
                {
                  title: "Analytics Dashboard",
                  description: "Track your performance across platforms with detailed analytics and insights.",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary"><rect x="2" y="2" width="20" height="20" rx="2"></rect><path d="M7 14.5L12 9l5 5.5"></path></svg>
                },
                {
                  title: "Monetization Tools",
                  description: "Maximize your earnings with integrated sponsorship, affiliate, and membership features.",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary"><circle cx="12" cy="12" r="10"></circle><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 18V6"></path></svg>
                },
                {
                  title: "Accessibility First",
                  description: "Built with accessibility at its core, ensuring a seamless experience for deaf creators.",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary"><path d="M2 12h5"></path><path d="M9 12h5"></path><path d="M16 12h6"></path><path d="M3 6h18"></path><path d="M3 18h18"></path></svg>
                },
                {
                  title: "AI Sign Language Assistant",
                  description: "Get personalized guidance and support from our AI assistant fluent in sign language.",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>
                },
              ].map((feature, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                      <div className="rounded-full bg-primary/10 p-3">
                        {feature.icon}
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-bold">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-16 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Ready to Get Started?</h2>
            <p className="max-w-[600px] mx-auto mb-8 text-primary-foreground/90">
              Join thousands of deaf content creators who are already thriving on our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="gap-1">
                  Create Your Account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/watchdemo">
                <Button size="lg" variant="outline" className="gap-1 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  <Play className="h-4 w-4" />
                  Watch Demo
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
              © 2023 DeafCreator. All rights reserved. | <a href="https://www.deafcreators.mbtquniverse.com" className="hover:underline">www.deafcreators.mbtquniverse.com</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
