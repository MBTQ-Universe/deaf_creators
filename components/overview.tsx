"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface OverviewProps extends React.HTMLAttributes<HTMLDivElement> {}

const data = [
  {
    name: "Jan",
    views: 4000,
    earnings: 240,
  },
  {
    name: "Feb",
    views: 3000,
    earnings: 180,
  },
  {
    name: "Mar",
    views: 5000,
    earnings: 300,
  },
  {
    name: "Apr",
    views: 8000,
    earnings: 480,
  },
  {
    name: "May",
    views: 6000,
    earnings: 360,
  },
  {
    name: "Jun",
    views: 9000,
    earnings: 540,
  },
]

export function Overview({ className, ...props }: OverviewProps) {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>View your content performance and earnings</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Bar yAxisId="left" dataKey="views" fill="#8884d8" name="Views" />
            <Bar yAxisId="right" dataKey="earnings" fill="#82ca9d" name="Earnings ($)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
