"use client"

import type React from "react"

import { usePlatform } from "@/components/platform-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { DollarSign, TrendingUp } from "lucide-react"

interface EarningsCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function EarningsCard({ className, ...props }: EarningsCardProps) {
  const { earnings, completedTasks, totalTasks } = usePlatform()
  const progressPercentage = (completedTasks / totalTasks) * 100

  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Earnings</CardTitle>
        <DollarSign className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <div className="text-4xl font-bold">${earnings.toFixed(2)}</div>
          <div className="flex items-center text-sm text-green-500">
            <TrendingUp className="mr-1 h-4 w-4" />
            <span>+12.5%</span>
          </div>
        </div>
        <CardDescription className="pt-4 pb-2">
          Task completion: {completedTasks} of {totalTasks}
        </CardDescription>
        <Progress value={progressPercentage} className="h-2" />
      </CardContent>
    </Card>
  )
}
