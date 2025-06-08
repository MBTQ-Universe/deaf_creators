"use client"

import type React from "react"

import { usePlatform } from "@/components/platform-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface AffiliateStatsProps extends React.HTMLAttributes<HTMLDivElement> {}

const data = [
  {
    name: "Mon",
    clicks: 24,
    conversions: 4,
  },
  {
    name: "Tue",
    clicks: 13,
    conversions: 2,
  },
  {
    name: "Wed",
    clicks: 38,
    conversions: 7,
  },
  {
    name: "Thu",
    clicks: 42,
    conversions: 8,
  },
  {
    name: "Fri",
    clicks: 35,
    conversions: 6,
  },
  {
    name: "Sat",
    clicks: 28,
    conversions: 5,
  },
  {
    name: "Sun",
    clicks: 15,
    conversions: 3,
  },
]

export function AffiliateStats({ className, ...props }: AffiliateStatsProps) {
  const { affiliateEarnings, totalAffiliateClicks, totalAffiliateConversions } = usePlatform()
  const conversionRate = totalAffiliateClicks > 0 ? (totalAffiliateConversions / totalAffiliateClicks) * 100 : 0

  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Affiliate Performance</CardTitle>
        <CardDescription>Track your affiliate marketing metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Total Earnings</p>
            <p className="text-2xl font-bold">${affiliateEarnings.toFixed(2)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Clicks</p>
            <p className="text-2xl font-bold">{totalAffiliateClicks}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Conversion Rate</p>
            <p className="text-2xl font-bold">{conversionRate.toFixed(1)}%</p>
          </div>
        </div>

        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clicks" fill="#8884d8" name="Clicks" />
              <Bar dataKey="conversions" fill="#82ca9d" name="Conversions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
