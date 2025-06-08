import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Handshake, ExternalLink } from "lucide-react"
import Image from "next/image"

export function AffiliatePrograms() {
  const programs = [
    {
      name: "ASL Learning Platform",
      logo: "/placeholder.svg?height=60&width=60",
      description: "Online platform for learning American Sign Language with courses for all levels.",
      commission: "20% per sale",
      cookieDuration: "30 days",
      category: "Education",
      status: "Joined",
    },
    {
      name: "Deaf-Owned Beauty Brand",
      logo: "/placeholder.svg?height=60&width=60",
      description: "Beauty products created by deaf entrepreneurs with inclusive marketing.",
      commission: "15% per sale",
      cookieDuration: "45 days",
      category: "Beauty",
      status: "Joined",
    },
    {
      name: "Accessibility Tech Store",
      logo: "/placeholder.svg?height=60&width=60",
      description: "Technology and gadgets designed for the deaf and hard of hearing community.",
      commission: "12% per sale",
      cookieDuration: "30 days",
      category: "Technology",
      status: "Joined",
    },
    {
      name: "Deaf-Friendly Travel Agency",
      logo: "/placeholder.svg?height=60&width=60",
      description: "Travel packages and tours designed for deaf travelers with ASL guides.",
      commission: "10% per booking",
      cookieDuration: "60 days",
      category: "Travel",
      status: "Available",
    },
    {
      name: "Sign Language Fashion",
      logo: "/placeholder.svg?height=60&width=60",
      description: "Clothing and accessories featuring ASL designs and deaf culture references.",
      commission: "18% per sale",
      cookieDuration: "30 days",
      category: "Fashion",
      status: "Available",
    },
  ]

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Handshake className="mr-2 h-5 w-5" />
          Affiliate Programs
        </CardTitle>
        <CardDescription>Join deaf-focused affiliate programs to monetize your content</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {programs.map((program) => (
            <div key={program.name} className="flex flex-col md:flex-row gap-4 p-4 rounded-lg border">
              <div className="flex-shrink-0 flex items-center justify-center">
                <Image
                  src={program.logo || "/placeholder.svg"}
                  alt={program.name}
                  width={60}
                  height={60}
                  className="rounded-md"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{program.name}</h3>
                  <Badge variant={program.status === "Joined" ? "default" : "outline"}>{program.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{program.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-xs text-muted-foreground block">Commission</span>
                    <span>{program.commission}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Cookie Duration</span>
                    <span>{program.cookieDuration}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Category</span>
                    <span>{program.category}</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 flex items-center">
                <Button variant={program.status === "Joined" ? "outline" : "default"} className="w-full md:w-auto">
                  {program.status === "Joined" ? (
                    <>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Manage
                    </>
                  ) : (
                    "Join Program"
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
