"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, ExternalLink, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface AffiliateLinksProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AffiliateLinks({ className, ...props }: AffiliateLinksProps) {
  const { toast } = useToast()
  const [activeLinks, setActiveLinks] = useState([
    {
      id: 1,
      name: "ASL Learning Platform",
      url: "https://aslplatform.com/ref=creator123",
      clicks: 145,
      conversions: 23,
      earnings: 345.5,
    },
    {
      id: 2,
      name: "Deaf-Owned Beauty Brand",
      url: "https://deafbeauty.com/creator123",
      clicks: 89,
      conversions: 12,
      earnings: 180.0,
    },
    {
      id: 3,
      name: "Accessibility Tech Store",
      url: "https://a11ytech.com/?ref=creator123",
      clicks: 67,
      conversions: 8,
      earnings: 120.0,
    },
  ])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Link copied",
      description: "Affiliate link copied to clipboard",
    })
  }

  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Your Affiliate Links</CardTitle>
        <CardDescription>Create and manage your affiliate links</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="active">Active Links</TabsTrigger>
            <TabsTrigger value="create">Create New Link</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="space-y-4">
              {activeLinks.map((link) => (
                <div key={link.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{link.name}</h4>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(link.url)}>
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy link</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Visit link</span>
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{link.url}</p>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Clicks</p>
                      <p className="text-sm font-medium">{link.clicks}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Conversions</p>
                      <p className="text-sm font-medium">{link.conversions}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Earnings</p>
                      <p className="text-sm font-medium">${link.earnings.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="program">Select Program</Label>
                <select
                  id="program"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select an affiliate program</option>
                  <option value="asl-platform">ASL Learning Platform</option>
                  <option value="deaf-beauty">Deaf-Owned Beauty Brand</option>
                  <option value="a11y-tech">Accessibility Tech Store</option>
                  <option value="deaf-travel">Deaf-Friendly Travel Agency</option>
                  <option value="sign-fashion">Sign Language Fashion</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="link-name">Link Name</Label>
                <Input id="link-name" placeholder="Enter a name for your link" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaign">Campaign (Optional)</Label>
                <Input id="campaign" placeholder="e.g., Summer2023, Instagram" />
              </div>

              <Button className="w-full mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Create Affiliate Link
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
