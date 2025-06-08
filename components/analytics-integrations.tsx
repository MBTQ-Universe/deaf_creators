"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Link, ExternalLink, RefreshCw } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

export function AnalyticsIntegrations() {
  const { toast } = useToast()
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      toast({
        title: "Analytics refreshed",
        description: "Your analytics data has been updated with the latest information.",
      })
    }, 2000)
  }

  const integrations = [
    {
      id: "google-analytics",
      name: "Google Analytics",
      logo: "/placeholder.svg?height=40&width=40",
      connected: true,
      lastSync: "2 hours ago",
      description: "Track website traffic and user behavior",
    },
    {
      id: "meta-business",
      name: "Meta Business Suite",
      logo: "/placeholder.svg?height=40&width=40",
      connected: true,
      lastSync: "1 hour ago",
      description: "Manage and analyze Facebook and Instagram performance",
    },
    {
      id: "youtube-analytics",
      name: "YouTube Analytics",
      logo: "/placeholder.svg?height=40&width=40",
      connected: true,
      lastSync: "3 hours ago",
      description: "Track video performance and audience engagement",
    },
    {
      id: "tiktok-analytics",
      name: "TikTok Analytics",
      logo: "/placeholder.svg?height=40&width=40",
      connected: false,
      lastSync: "Never",
      description: "Analyze TikTok content performance and audience",
    },
    {
      id: "twitter-analytics",
      name: "Twitter Analytics",
      logo: "/placeholder.svg?height=40&width=40",
      connected: true,
      lastSync: "5 hours ago",
      description: "Track tweet engagement and audience growth",
    },
    {
      id: "google-ads",
      name: "Google Ads",
      logo: "/placeholder.svg?height=40&width=40",
      connected: false,
      lastSync: "Never",
      description: "Track ad performance and conversions",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Analytics Integrations
          </CardTitle>
          <CardDescription>Connect your accounts to centralize all your analytics</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          {refreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="connected">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="connected">Connected</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
          </TabsList>

          <TabsContent value="connected">
            <div className="space-y-4">
              {integrations
                .filter((i) => i.connected)
                .map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={integration.logo || "/placeholder.svg"}
                          alt={integration.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-xs text-muted-foreground">Last synced: {integration.lastSync}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch id={`${integration.id}-sync`} defaultChecked />
                        <Label htmlFor={`${integration.id}-sync`} className="text-xs">
                          Auto-sync
                        </Label>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Open {integration.name}</span>
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="available">
            <div className="space-y-4">
              {integrations
                .filter((i) => !i.connected)
                .map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={integration.logo || "/placeholder.svg"}
                          alt={integration.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-xs text-muted-foreground">{integration.description}</p>
                      </div>
                    </div>
                    <Button>
                      <Link className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
