"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

export function AudienceInsights() {
  const ageData = [
    { name: "18-24", value: 25 },
    { name: "25-34", value: 35 },
    { name: "35-44", value: 20 },
    { name: "45-54", value: 12 },
    { name: "55+", value: 8 },
  ]

  const locationData = [
    { name: "United States", value: 45 },
    { name: "Canada", value: 15 },
    { name: "United Kingdom", value: 12 },
    { name: "Australia", value: 8 },
    { name: "Other", value: 20 },
  ]

  const COLORS = ["#8884d8", "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audience Insights</CardTitle>
        <CardDescription>Understand your audience demographics and interests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 h-[300px]">
          <div>
            <h3 className="text-sm font-medium text-center mb-2">Age Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3 className="text-sm font-medium text-center mb-2">Location</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={locationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {locationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <h3 className="text-sm font-medium">Key Insights</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Your content resonates most with 25-34 year olds (35%)</li>
            <li>• 60% of your audience is from North America</li>
            <li>• 72% of your audience uses sign language daily</li>
            <li>• Top interests: Education, Technology, Travel</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
