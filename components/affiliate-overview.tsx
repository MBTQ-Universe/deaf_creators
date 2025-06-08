"use client"

import type React from "react"

import { usePlatform } from "@/components/platform-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Handshake, TrendingUp } from "lucide-react"

interface AffiliateOverviewProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AffiliateOverview({ className, ...props }: AffiliateOverviewProps) {
  const { affiliateEarnings, totalAffiliateClicks, totalAffiliateConversions } = usePlatform()
  const conversionRate = totalAffiliateClicks > 0 ? (totalAffiliateConversions / totalAffiliateClicks) * 100 : 0

  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Affiliate Earnings</CardTitle>
        <Handshake className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold">${affiliateEarnings.toFixed(2)}</div>
          <div className="flex items-center text-xs text-green-500">
            <TrendingUp className="mr-1 h-3 w-3" />
            <span>+8.2%</span>
          </div>
        </div>
        <CardDescription className="pt-4 pb-2">Conversion rate: {conversionRate.toFixed(1)}%</CardDescription>
        <Progress value={conversionRate} className="h-2" />
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Clicks</span>
            <span className="font-medium">{totalAffiliateClicks}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Conversions</span>
            <span className="font-medium">{totalAffiliateConversions}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
