"use client"

import type React from "react"

import { usePlatform } from "@/components/platform-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Users, TrendingUp } from "lucide-react"

interface CommunityMetricsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CommunityMetrics({ className, ...props }: CommunityMetricsProps) {
  const { communityMembers } = usePlatform()
  const engagementRate = 68 // Percentage

  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Community</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold">{communityMembers}</div>
          <div className="flex items-center text-xs text-green-500">
            <TrendingUp className="mr-1 h-3 w-3" />
            <span>+12.5%</span>
          </div>
        </div>
        <CardDescription className="pt-4 pb-2">Engagement rate: {engagementRate}%</CardDescription>
        <Progress value={engagementRate} className="h-2" />
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Active</span>
            <span className="font-medium">87%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">New this week</span>
            <span className="font-medium">12</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
