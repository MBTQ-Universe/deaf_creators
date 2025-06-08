import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, ExternalLink } from "lucide-react"
import Image from "next/image"

export function DeafEcosystemPartners() {
  const partners = [
    {
      name: "SignTalk Foundation",
      logo: "/placeholder.svg?height=40&width=40",
      category: "Education",
      description: "Providing ASL resources and education",
      isAffiliate: true,
    },
    {
      name: "Deaf Business Association",
      logo: "/placeholder.svg?height=40&width=40",
      category: "Business",
      description: "Network of deaf-owned businesses",
      isAffiliate: true,
    },
    {
      name: "ASL Streaming",
      logo: "/placeholder.svg?height=40&width=40",
      category: "Entertainment",
      description: "Streaming platform for ASL content",
      isAffiliate: false,
    },
    {
      name: "DeafTech Innovations",
      logo: "/placeholder.svg?height=40&width=40",
      category: "Technology",
      description: "Accessibility technology for deaf users",
      isAffiliate: true,
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            Deaf Ecosystem Partners
          </CardTitle>
          <CardDescription>Connect with partners in the deaf ecosystem</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {partners.map((partner) => (
            <div key={partner.name} className="flex items-center space-x-4">
              <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
                <Image src={partner.logo || "/placeholder.svg"} alt={partner.name} fill className="object-cover" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{partner.name}</h4>
                  {partner.isAffiliate && (
                    <Badge variant="outline" className="text-xs">
                      Affiliate
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{partner.description}</p>
                <div className="flex items-center text-xs">
                  <span className="text-muted-foreground">{partner.category}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
