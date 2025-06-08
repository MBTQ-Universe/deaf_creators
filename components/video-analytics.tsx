"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, Tab  CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { BarChart3, TrendingUp, Eye, Clock } from 'lucide-react'

export function VideoAnalytics() {
  const viewsData = [
    { name: "Jan", views: 4200 },
    { name: "Feb", views: 4800 },
    { name: "Mar", views: 5600 },
    { name: "Apr", views: 6200 },
    { name: "May", views: 7100 },
    { name: "Jun", views: 8500 },
    { name: "Jul", views: 9800 },
  ]
  
  const engagementData = [
    { name: "ASL Tutorial", views: 12500, engagement: 8.7 },
    { name: "Deaf Culture", views: 8700, engagement: 7.2 },
    { name: "Travel Vlog", views: 15200, engagement: 9.5 },
    { name: "Product Review", views: 6800, engagement: 6.8 },
    { name: "Daily Life", views: 9300, engagement: 8.1 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="mr-2 h-5 w-5" />
          Video Analytics
        </CardTitle>
        <CardDescription>
          Track performance and engagement of your videos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="views">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="views">Views</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>
          
          <TabsContent value="views" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#8884d8" 
                  name="Total Views" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="engagement" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="engagement" fill="#8884d8" name="Engagement Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="rounded-lg border p-3">
            <div className="text-sm font-medium text-muted-foreground">Total Views</div>
            <div className="text-xl font-bold">46.2K</div>
            <div className="text-xs text-green-500 flex items-center">
              <TrendingUp className="mr-1 h-3 w-3" />
              15.3% growth
            </div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-sm font-medium text-muted-foreground">Avg. Watch Time</div>
            <div className="text-xl font-bold">4:32</div>
            <div className="text-xs text-green-500 flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              +0:45 vs last month
            </div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-sm font-medium text-muted-foreground">Top Video</div>
            <div className="text-xl font-bold">ASL Tutorial</div>
            <div className="text-xs text-muted-foreground flex items-center">
              <Eye className="mr-1 h-3 w-3" />
              15.2K views
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
