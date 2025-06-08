"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export function ContentPerformance() {
  const videoData = [
    { name: "ASL Tutorial", views: 12500, likes: 850, comments: 120, shares: 230 },
    { name: "Deaf Culture", views: 8700, likes: 620, comments: 95, shares: 180 },
    { name: "Travel Vlog", views: 15200, likes: 1100, comments: 210, shares: 320 },
    { name: "Product Review", views: 6800, likes: 450, comments: 65, shares: 120 },
    { name: "Daily Life", views: 9300, likes: 720, comments: 130, shares: 210 },
  ]

  const reelData = [
    { name: "Beauty Tip", views: 45000, likes: 3200, comments: 420, shares: 1200 },
    { name: "ASL Word", views: 38000, likes: 2800, comments: 350, shares: 950 },
    { name: "Food Review", views: 52000, likes: 4100, comments: 520, shares: 1500 },
    { name: "Quick Tip", views: 29000, likes: 2100, comments: 280, shares: 820 },
    { name: "Daily Moment", views: 33000, likes: 2500, comments: 310, shares: 900 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Performance</CardTitle>
        <CardDescription>See which content types perform best across platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="videos">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="reels">Reels/Shorts</TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={videoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" fill="#8884d8" name="Views" />
                <Bar dataKey="likes" fill="#82ca9d" name="Likes" />
                <Bar dataKey="shares" fill="#ffc658" name="Shares" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="reels" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" fill="#8884d8" name="Views" />
                <Bar dataKey="likes" fill="#82ca9d" name="Likes" />
                <Bar dataKey="shares" fill="#ffc658" name="Shares" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
