"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { BarChart3, TrendingUp } from "lucide-react"

export function SocialMediaAnalytics() {
  const engagementData = [
    { name: "Mon", instagram: 120, youtube: 45, twitter: 78 },
    { name: "Tue", instagram: 132, youtube: 62, twitter: 71 },
    { name: "Wed", instagram: 101, youtube: 55, twitter: 65 },
    { name: "Thu", instagram: 134, youtube: 78, twitter: 52 },
    { name: "Fri", instagram: 165, youtube: 42, twitter: 85 },
    { name: "Sat", instagram: 189, youtube: 29, twitter: 93 },
    { name: "Sun", instagram: 170, youtube: 18, twitter: 88 },
  ]

  const growthData = [
    { name: "Jan", followers: 4200 },
    { name: "Feb", followers: 4800 },
    { name: "Mar", followers: 5600 },
    { name: "Apr", followers: 6200 },
    { name: "May", followers: 7100 },
    { name: "Jun", followers: 8500 },
    { name: "Jul", followers: 9800 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="mr-2 h-5 w-5" />
          Social Media Analytics
        </CardTitle>
        <CardDescription>Track your performance across platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="engagement">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="growth">Follower Growth</TabsTrigger>
          </TabsList>

          <TabsContent value="engagement" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="instagram" fill="#E1306C" name="Instagram" />
                <Bar dataKey="youtube" fill="#FF0000" name="YouTube" />
                <Bar dataKey="twitter" fill="#1DA1F2" name="Twitter" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="growth" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="followers" stroke="#8884d8" name="Total Followers" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="rounded-lg border p-3">
            <div className="text-sm font-medium text-muted-foreground">Top Platform</div>
            <div className="text-xl font-bold">Instagram</div>
            <div className="text-xs text-green-500 flex items-center">
              <TrendingUp className="mr-1 h-3 w-3" />
              12.5% growth
            </div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-sm font-medium text-muted-foreground">Best Time to Post</div>
            <div className="text-xl font-bold">6-8 PM</div>
            <div className="text-xs text-muted-foreground">Weekdays</div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-sm font-medium text-muted-foreground">Top Content</div>
            <div className="text-xl font-bold">ASL Tutorials</div>
            <div className="text-xs text-muted-foreground">+45% engagement</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
