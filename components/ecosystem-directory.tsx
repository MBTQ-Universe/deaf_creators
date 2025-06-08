"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Globe, Search, ExternalLink, MapPin } from "lucide-react"
import Image from "next/image"

export function EcosystemDirectory() {
  const [searchQuery, setSearchQuery] = useState("")

  const businesses = [
    {
      id: 1,
      name: "Deaf-Owned Coffee Shop",
      logo: "/placeholder.svg?height=60&width=60",
      category: "Food & Beverage",
      location: "Austin, TX",
      description: "Coffee shop with deaf baristas and ASL-friendly environment",
      website: "https://example.com",
      isAffiliate: true,
    },
    {
      id: 2,
      name: "ASL Interpreting Services",
      logo: "/placeholder.svg?height=60&width=60",
      category: "Services",
      location: "Online",
      description: "Professional ASL interpreting for events and meetings",
      website: "https://example.com",
      isAffiliate: false,
    },
    {
      id: 3,
      name: "Deaf Tech Innovations",
      logo: "/placeholder.svg?height=60&width=60",
      category: "Technology",
      location: "San Francisco, CA",
      description: "Creating technology solutions for the deaf community",
      website: "https://example.com",
      isAffiliate: true,
    },
  ]

  const organizations = [
    {
      id: 1,
      name: "National Association of the Deaf",
      logo: "/placeholder.svg?height=60&width=60",
      category: "Advocacy",
      location: "Washington, DC",
      description: "Civil rights organization of, by, and for deaf and hard of hearing individuals",
      website: "https://example.com",
      isAffiliate: false,
    },
    {
      id: 2,
      name: "Deaf Artists Coalition",
      logo: "/placeholder.svg?height=60&width=60",
      category: "Arts",
      location: "New York, NY",
      description: "Supporting and promoting deaf artists across all mediums",
      website: "https://example.com",
      isAffiliate: true,
    },
    {
      id: 3,
      name: "Deaf Education Foundation",
      logo: "/placeholder.svg?height=60&width=60",
      category: "Education",
      location: "Chicago, IL",
      description: "Providing scholarships and resources for deaf students",
      website: "https://example.com",
      isAffiliate: false,
    },
  ]

  const filteredBusinesses = businesses.filter(
    (business) =>
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredOrganizations = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Globe className="mr-2 h-5 w-5" />
          Deaf Ecosystem Directory
        </CardTitle>
        <CardDescription>Discover deaf-owned businesses and deaf-focused organizations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search businesses and organizations..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="ml-2">Search</Button>
        </div>

        <Tabs defaultValue="businesses">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="businesses">Businesses</TabsTrigger>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
          </TabsList>

          <TabsContent value="businesses">
            <div className="space-y-6">
              {filteredBusinesses.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">No businesses found matching your search.</p>
              ) : (
                filteredBusinesses.map((business) => (
                  <div key={business.id} className="flex flex-col md:flex-row gap-4 p-4 rounded-lg border">
                    <div className="flex-shrink-0 flex items-center justify-center">
                      <Image
                        src={business.logo || "/placeholder.svg"}
                        alt={business.name}
                        width={60}
                        height={60}
                        className="rounded-md"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{business.name}</h3>
                        {business.isAffiliate && <Badge variant="outline">Affiliate Partner</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{business.description}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="mr-1 h-3 w-3" />
                        <span>{business.location}</span>
                        <span className="mx-2">•</span>
                        <span>{business.category}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex items-center">
                      <Button variant="outline" size="sm" className="w-full md:w-auto">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="organizations">
            <div className="space-y-6">
              {filteredOrganizations.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">No organizations found matching your search.</p>
              ) : (
                filteredOrganizations.map((org) => (
                  <div key={org.id} className="flex flex-col md:flex-row gap-4 p-4 rounded-lg border">
                    <div className="flex-shrink-0 flex items-center justify-center">
                      <Image
                        src={org.logo || "/placeholder.svg"}
                        alt={org.name}
                        width={60}
                        height={60}
                        className="rounded-md"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{org.name}</h3>
                        {org.isAffiliate && <Badge variant="outline">Affiliate Partner</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{org.description}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="mr-1 h-3 w-3" />
                        <span>{org.location}</span>
                        <span className="mx-2">•</span>
                        <span>{org.category}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex items-center">
                      <Button variant="outline" size="sm" className="w-full md:w-auto">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
