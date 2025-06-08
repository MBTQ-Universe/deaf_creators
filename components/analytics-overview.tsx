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
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { usePlatform } from "@/components/platform-provider"

export function AnalyticsOverview() {
  const { earnings } = usePlatform()

  const overviewData = [
    { name: "Jan", views: 4500, engagement: 1200, followers: 120 },
    { name: "Feb", views: 5200, engagement: 1500, followers: 150 },
    { name: "Mar", views: 6800, engagement: 2200, followers: 210 },
    { name: "Apr", views: 7900, engagement: 2800, followers: 260 },
    { name: "May", views: 9100, engagement: 3200, followers: 320 },
    { name: "Jun", views: 10500, engagement: 3800, followers: 380 },
    { name: "Jul", views: 11200, engagement: 4100, followers: 450 },
  ]

  const platformData = [
    { name: "YouTube", value: 45 },
    { name: "Instagram", value: 25 },
    { name: "TikTok", value: 20 },
    { name: "Twitter", value: 10 },
  ]

  const COLORS = ["#8884d8", "#FF6384", "#36A2EB", "#FFCE56"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
        <CardDescription>Track your content performance across all platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="growth">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="growth">Growth Metrics</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
          </TabsList>

          <TabsContent value="growth" className="space-y-4">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={overviewData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="views" stroke="#8884d8" name="Views" />
                  <Line yAxisId="right" type="monotone" dataKey="followers" stroke="#82ca9d" name="New Followers" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-muted-foreground">Total Views</div>
                <div className="text-2xl font-bold">56.2K</div>
                <div className="text-xs text-green-500">↑ 12.5% from last month</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-muted-foreground">Engagement Rate</div>
                <div className="text-2xl font-bold">8.7%</div>
                <div className="text-xs text-green-500">↑ 2.1% from last month</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-muted-foreground">Total Followers</div>
                <div className="text-2xl font-bold">45.9K</div>
                <div className="text-xs text-green-500">↑ 5.3% from last month</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overviewData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="engagement" fill="#8884d8" name="Engagement" />
                <Bar dataKey="views" fill="#82ca9d" name="Views" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="platforms" className="h-[400px]">
            <div className="grid grid-cols-2 gap-4 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-lg font-medium">Platform Distribution</h3>
                <p className="text-sm text-muted-foreground">
                  Your audience is primarily on YouTube, which accounts for 45% of your total engagement.
                </p>
                <div className="space-y-2">
                  {platformData.map((platform, index) => (
                    <div key={platform.name} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                        <span>{platform.name}</span>
                      </div>
                      <span className="font-medium">{platform.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
