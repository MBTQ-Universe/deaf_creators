import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, DollarSign } from "lucide-react"

export function TaskHistory() {
  const completedTasks = [
    {
      id: 1,
      title: "Sponsored Post: Summer Makeup Collection",
      company: "Deaf-Owned Beauty Brand",
      completedDate: "2023-08-05",
      compensation: 300,
    },
    {
      id: 2,
      title: "Product Review: Smart Doorbell",
      company: "DeafTech Innovations",
      completedDate: "2023-07-28",
      compensation: 350,
    },
    {
      id: 3,
      title: "Educational Video: Basic ASL for Restaurants",
      company: "ASL Learning Platform",
      completedDate: "2023-07-15",
      compensation: 400,
    },
    {
      id: 4,
      title: "Sponsored Post: Accessible Travel Guide",
      company: "Deaf-Friendly Travel Agency",
      completedDate: "2023-07-10",
      compensation: 275,
    },
    {
      id: 5,
      title: "Product Review: Vibrating Fitness Watch",
      company: "Accessibility Tech Store",
      completedDate: "2023-06-30",
      compensation: 325,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CheckCircle className="mr-2 h-5 w-5" />
          Completed Tasks
        </CardTitle>
        <CardDescription>History of your completed corporate tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {completedTasks.map((task) => (
            <div key={task.id} className="flex items-start justify-between p-3 rounded-md border">
              <div>
                <h4 className="font-medium">{task.title}</h4>
                <p className="text-xs text-muted-foreground">{task.company}</p>
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>Completed: {task.completedDate}</span>
                </div>
              </div>
              <Badge className="flex items-center">
                <DollarSign className="mr-1 h-3 w-3" />${task.compensation}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
