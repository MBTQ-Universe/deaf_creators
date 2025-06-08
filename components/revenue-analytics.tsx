"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from "recharts"
import { usePlatform } from "@/components/platform-provider"

export function RevenueAnalytics() {
  const { earnings, affiliateEarnings } = usePlatform()

  const revenueData = [
    { name: "Jan", sponsorships: 1200, affiliates: 450, adsense: 350, memberships: 200 },
    { name: "Feb", sponsorships: 1500, affiliates: 520, adsense: 380, memberships: 220 },
    { name: "Mar", sponsorships: 1800, affiliates: 600, adsense: 420, memberships: 250 },
    { name: "Apr", sponsorships: 2200, affiliates: 750, adsense: 480, memberships: 280 },
    { name: "May", sponsorships: 2500, affiliates: 820, adsense: 520, memberships: 310 },
    { name: "Jun", sponsorships: 2800, affiliates: 950, adsense: 580, memberships: 350 },
    { name: "Jul", sponsorships: 3200, affiliates: 1100, adsense: 650, memberships: 400 },
  ]

  const sourceData = [
    { name: "Sponsorships", value: 45 },
    { name: "Affiliate Marketing", value: 25 },
    { name: "Ad Revenue", value: 18 },
    { name: "Memberships", value: 12 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Analytics</CardTitle>
        <CardDescription>Track your earnings across different revenue streams</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sources">Revenue Sources</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-muted-foreground">Total Revenue</div>
                <div className="text-2xl font-bold">${(earnings + affiliateEarnings).toFixed(2)}</div>
                <div className="text-xs text-green-500">↑ 15.2% from last month</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-muted-foreground">Sponsorships</div>
                <div className="text-2xl font-bold">${earnings.toFixed(2)}</div>
                <div className="text-xs text-green-500">↑ 18.7% from last month</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-muted-foreground">Affiliate</div>
                <div className="text-2xl font-bold">${affiliateEarnings.toFixed(2)}</div>
                <div className="text-xs text-green-500">↑ 12.3% from last month</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-muted-foreground">Ad Revenue</div>
                <div className="text-2xl font-bold">$580.25</div>
                <div className="text-xs text-green-500">↑ 8.5% from last month</div>
              </div>
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="sponsorships"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                    name="Sponsorships"
                  />
                  <Area
                    type="monotone"
                    dataKey="affiliates"
                    stackId="1"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    name="Affiliate Marketing"
                  />
                  <Area
                    type="monotone"
                    dataKey="adsense"
                    stackId="1"
                    stroke="#ffc658"
                    fill="#ffc658"
                    name="Ad Revenue"
                  />
                  <Area
                    type="monotone"
                    dataKey="memberships"
                    stackId="1"
                    stroke="#ff8042"
                    fill="#ff8042"
                    name="Memberships"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="sources" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Percentage of Total Revenue (%)" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="growth" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="sponsorships" stroke="#8884d8" fill="#8884d8" name="Sponsorships" />
                <Area type="monotone" dataKey="affiliates" stroke="#82ca9d" fill="#82ca9d" name="Affiliate Marketing" />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
