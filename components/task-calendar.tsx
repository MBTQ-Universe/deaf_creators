"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"

export function TaskCalendar() {
  const [date, setDate] = useState<Date>(new Date())

  const tasks = [
    {
      id: 1,
      title: "Product Review: Vibrating Alarm Clock",
      company: "DeafTech Innovations",
      date: "2023-08-15",
      status: "pending",
    },
    {
      id: 2,
      title: "Educational Content: Common ASL Phrases for Travel",
      company: "ASL Learning Platform",
      date: "2023-08-22",
      status: "in-progress",
    },
    {
      id: 3,
      title: "Sponsored Post: Summer Makeup Collection",
      company: "Deaf-Owned Beauty Brand",
      date: "2023-08-10",
      status: "completed",
    },
    {
      id: 4,
      title: "Comparison Video: Video Relay Services",
      company: "Accessibility Tech Store",
      date: "2023-08-30",
      status: "pending",
    },
  ]

  const getTasksForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return tasks.filter((task) => task.date === dateString)
  }

  const renderCell = (date: Date) => {
    const tasksForDate = getTasksForDate(date)

    return (
      <div className="h-full">
        <div className="text-center">{date.getDate()}</div>
        {tasksForDate.length > 0 && (
          <div className="mt-1">
            {tasksForDate.map((task) => (
              <Badge
                key={task.id}
                variant={task.status === "completed" ? "default" : "outline"}
                className="w-full text-xs mb-1 truncate"
              >
                {task.title.substring(0, 10)}...
              </Badge>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5" />
          Task Calendar
        </CardTitle>
        <CardDescription>View your upcoming task deadlines</CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => date && setDate(date)}
          className="rounded-md border"
        />

        <div className="mt-6">
          <h3 className="font-medium mb-2">Tasks for {date.toLocaleDateString()}</h3>
          <div className="space-y-2">
            {getTasksForDate(date).length > 0 ? (
              getTasksForDate(date).map((task) => (
                <div key={task.id} className="p-2 rounded-md border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{task.title}</h4>
                      <p className="text-xs text-muted-foreground">{task.company}</p>
                    </div>
                    <Badge variant={task.status === "completed" ? "default" : "outline"}>{task.status}</Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No tasks scheduled for this date.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
