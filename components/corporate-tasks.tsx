"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Briefcase, Calendar, CheckCircle, DollarSign, Filter, Search, Tag } from "lucide-react"
import { Input } from "@/components/ui/input"
import { usePlatform } from "@/components/platform-provider"
import { useToast } from "@/hooks/use-toast"

export function CorporateTasks() {
  const { toast } = useToast()
  const { updateEarnings } = usePlatform()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const tasks = [
    {
      id: 1,
      company: "DeafTech Innovations",
      title: "Product Review: Vibrating Alarm Clock",
      description:
        "Create a comprehensive review of our new vibrating alarm clock designed for deaf users. Highlight key features and demonstrate usage.",
      deadline: "2023-08-15",
      compensation: 350,
      status: "pending",
      tags: ["Product Review", "Technology"],
      requirements: [
        "5-7 minute video",
        "Show unboxing experience",
        "Demonstrate all features",
        "Provide honest feedback",
        "Include pros and cons",
      ],
    },
    {
      id: 2,
      company: "ASL Learning Platform",
      title: "Educational Content: Common ASL Phrases for Travel",
      description:
        "Create educational content teaching common ASL phrases useful for travel. Focus on phrases for airports, hotels, and restaurants.",
      deadline: "2023-08-22",
      compensation: 400,
      status: "in-progress",
      tags: ["Educational", "ASL"],
      requirements: [
        "10-15 minute video",
        "Cover at least 20 phrases",
        "Provide clear demonstrations",
        "Include practice exercises",
        "Add captions in English",
      ],
    },
    {
      id: 3,
      company: "Deaf-Owned Beauty Brand",
      title: "Sponsored Post: Summer Makeup Collection",
      description:
        "Create a sponsored post featuring our new summer makeup collection. Demonstrate application and share your thoughts on the products.",
      deadline: "2023-08-10",
      compensation: 300,
      status: "completed",
      tags: ["Beauty", "Sponsored"],
      requirements: [
        "Instagram post and story",
        "Show product application",
        "Tag our brand account",
        "Use provided hashtags",
        "Share honest review",
      ],
    },
    {
      id: 4,
      company: "Accessibility Tech Store",
      title: "Comparison Video: Video Relay Services",
      description:
        "Create a comparison of different video relay services available for deaf users. Compare features, pricing, and user experience.",
      deadline: "2023-08-30",
      compensation: 500,
      status: "pending",
      tags: ["Technology", "Comparison"],
      requirements: [
        "10-12 minute video",
        "Compare at least 3 services",
        "Demonstrate each service",
        "Discuss pros and cons",
        "Provide recommendation",
      ],
    },
  ]

  const filteredTasks = tasks.filter((task) => {
    // Apply search filter
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply status filter
    const matchesStatus = statusFilter === "all" || task.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleAcceptTask = (taskId: number) => {
    toast({
      title: "Task accepted",
      description: "You have accepted this task. You can now start working on it.",
    })
  }

  const handleCompleteTask = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      updateEarnings(task.compensation)
      toast({
        title: "Task completed",
        description: `You've earned $${task.compensation} for completing this task.`,
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>
      case "completed":
        return <Badge variant="default">Completed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Briefcase className="mr-2 h-5 w-5" />
          Corporate Partnership Tasks
        </CardTitle>
        <CardDescription>Manage sponsored content and partnership tasks from companies</CardDescription>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">No tasks found matching your search criteria.</div>
          ) : (
            filteredTasks.map((task) => (
              <div key={task.id} className="rounded-lg border overflow-hidden">
                <div className="p-4 bg-muted/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{task.title}</h3>
                        {getStatusBadge(task.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{task.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>Due: {task.deadline}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>${task.compensation}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm mb-4">{task.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {task.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="flex items-center">
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        View Requirements
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Task Requirements</DialogTitle>
                        <DialogDescription>
                          {task.company} - {task.title}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Requirements:</h4>
                          <ul className="space-y-2">
                            {task.requirements.map((req, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Deadline:</h4>
                          <p className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            {task.deadline}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Compensation:</h4>
                          <p className="flex items-center">
                            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />${task.compensation}
                          </p>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => {}}>
                          Download Brief
                        </Button>
                        {task.status === "pending" && (
                          <Button onClick={() => handleAcceptTask(task.id)}>Accept Task</Button>
                        )}
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <div className="flex justify-end mt-4">
                    {task.status === "pending" && (
                      <Button onClick={() => handleAcceptTask(task.id)}>Accept Task</Button>
                    )}
                    {task.status === "in-progress" && (
                      <Button onClick={() => handleCompleteTask(task.id)}>Mark as Completed</Button>
                    )}
                    {task.status === "completed" && (
                      <Button variant="outline" disabled>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Completed
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
