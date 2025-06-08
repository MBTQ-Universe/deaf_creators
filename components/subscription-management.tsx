"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CreditCard, Download, FileText } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SubscriptionManagement() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock subscription data
  const subscription = {
    plan: "Creator Pro",
    status: "active",
    trialEndsAt: "2023-09-15",
    nextBillingDate: "2023-09-15",
    amount: 39.99,
    paymentMethod: "Visa ending in 4242",
    storageUsed: 65,
    storageLimit: 100,
    videosUploaded: 24,
    videoLimit: "Unlimited",
    invoices: [
      { id: "INV-001", date: "2023-08-15", amount: 39.99, status: "paid" },
      { id: "INV-002", date: "2023-07-15", amount: 39.99, status: "paid" },
      { id: "INV-003", date: "2023-06-15", amount: 39.99, status: "paid" },
    ],
  }

  const isInTrial = new Date(subscription.trialEndsAt) > new Date()
  const daysLeftInTrial = isInTrial
    ? Math.ceil((new Date(subscription.trialEndsAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Subscription Management</h1>
        <p className="text-muted-foreground">Manage your subscription, billing information, and view your usage.</p>
      </div>

      {isInTrial && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Free Trial Active</AlertTitle>
          <AlertDescription>
            You have {daysLeftInTrial} {daysLeftInTrial === 1 ? "day" : "days"} left in your free trial. Your first
            payment of ${subscription.amount} will be processed on {subscription.nextBillingDate}.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
              <CardDescription>Your current plan and subscription status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{subscription.plan}</p>
                  <p className="text-sm text-muted-foreground">{isInTrial ? "Trial Period" : "Monthly Subscription"}</p>
                </div>
                <Badge variant={subscription.status === "active" ? "default" : "destructive"}>
                  {subscription.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="grid gap-1">
                <div className="flex justify-between text-sm">
                  <p className="text-muted-foreground">Next billing date</p>
                  <p className="font-medium">{subscription.nextBillingDate}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-muted-foreground">Billing amount</p>
                  <p className="font-medium">${subscription.amount}/month</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-muted-foreground">Payment method</p>
                  <p className="font-medium">{subscription.paymentMethod}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Change Plan</Button>
              <Button variant="destructive">Cancel Subscription</Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Storage Usage</CardTitle>
                <CardDescription>Your current storage usage and limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <p className="text-muted-foreground">Used</p>
                    <p className="font-medium">
                      {subscription.storageUsed} GB of {subscription.storageLimit} GB
                    </p>
                  </div>
                  <Progress value={(subscription.storageUsed / subscription.storageLimit) * 100} />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Upgrade Storage
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Video Uploads</CardTitle>
                <CardDescription>Your current video upload count and limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <p className="text-muted-foreground">Uploaded</p>
                    <p className="font-medium">{subscription.videosUploaded} videos</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-muted-foreground">Limit</p>
                    <p className="font-medium">{subscription.videoLimit}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Upload New Video
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Manage your payment methods and billing information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <CreditCard className="h-6 w-6" />
                  <div>
                    <p className="font-medium">{subscription.paymentMethod}</p>
                    <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Add Payment Method</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View and download your past invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscription.invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{invoice.id}</p>
                        <p className="text-sm text-muted-foreground">{invoice.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="font-medium">${invoice.amount}</p>
                      <Badge variant={invoice.status === "paid" ? "outline" : "destructive"}>{invoice.status}</Badge>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Statistics</CardTitle>
              <CardDescription>View your platform usage statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Storage Usage</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground">Used</p>
                      <p className="font-medium">{subscription.storageUsed} GB</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground">Available</p>
                      <p className="font-medium">{subscription.storageLimit - subscription.storageUsed} GB</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground">Total</p>
                      <p className="font-medium">{subscription.storageLimit} GB</p>
                    </div>
                    <Progress value={(subscription.storageUsed / subscription.storageLimit) * 100} />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Bandwidth Usage</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground">Used this month</p>
                      <p className="font-medium">245 GB</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground">Available</p>
                      <p className="font-medium">755 GB</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground">Total</p>
                      <p className="font-medium">1000 GB</p>
                    </div>
                    <Progress value={24.5} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Video Statistics</p>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium">Total Videos</div>
                    <div className="text-2xl font-bold">{subscription.videosUploaded}</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium">Total Views</div>
                    <div className="text-2xl font-bold">12,458</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium">Watch Time</div>
                    <div className="text-2xl font-bold">845 hrs</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Plan Limits</CardTitle>
              <CardDescription>Your current plan limits and usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground">Video uploads</p>
                      <p className="font-medium">{subscription.videoLimit}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground">Storage</p>
                      <p className="font-medium">{subscription.storageLimit} GB</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground">Bandwidth</p>
                      <p className="font-medium">1000 GB/month</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground">Video quality</p>
                      <p className="font-medium">Up to 4K</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground">AI captioning</p>
                      <p className="font-medium">Included</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground">Revenue share</p>
                      <p className="font-medium">80%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Upgrade Plan</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
