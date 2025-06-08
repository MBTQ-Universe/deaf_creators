"use client"

import type React from "react"

import { useState } from "react"
import { usePlatform } from "@/components/platform-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { CheckSquare } from "lucide-react"

interface TaskListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TaskList({ className, ...props }: TaskListProps) {
  const { completeTask, updateEarnings } = usePlatform()
  const [tasks, setTasks] = useState([
    { id: 1, title: "Upload weekly vlog", completed: false, reward: 50 },
    { id: 2, title: "Create Netflix review", completed: false, reward: 75 },
    { id: 3, title: "Post food tasting video", completed: false, reward: 60 },
    { id: 4, title: "Share beauty routine", completed: false, reward: 45 },
  ])

  const handleTaskToggle = (taskId: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId && !task.completed) {
          completeTask()
          updateEarnings(task.reward)
          return { ...task, completed: true }
        }
        return task
      }),
    )
  }

  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Tasks</CardTitle>
        <CheckSquare className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <CardDescription className="pb-4">Complete tasks to earn rewards</CardDescription>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-2">
              <Checkbox
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => handleTaskToggle(task.id)}
                disabled={task.completed}
              />
              <label
                htmlFor={`task-${task.id}`}
                className={cn(
                  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-between w-full",
                  task.completed && "line-through text-muted-foreground",
                )}
              >
                <span>{task.title}</span>
                <span className="text-green-500">${task.reward}</span>
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
