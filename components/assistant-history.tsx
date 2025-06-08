import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MessageSquare, Video, FileText, Trash2, BarChart3, Lightbulb } from "lucide-react"

export function AssistantHistory() {
  const history = [
    {
      id: 1,
      title: "Content strategy for Q3",
      type: "conversation",
      date: "2023-08-05",
      preview: "We discussed content strategy focusing on educational ASL videos and travel vlogs...",
    },
    {
      id: 2,
      title: "Video analysis: ASL Tutorial",
      type: "analysis",
      date: "2023-08-03",
      preview: "AI analyzed your ASL tutorial video and provided feedback on signing clarity and lighting...",
    },
    {
      id: 3,
      title: "Caption generation for Travel Vlog",
      type: "caption",
      date: "2023-07-28",
      preview: "Generated captions for your Oklahoma City travel vlog with 98% accuracy...",
    },
    {
      id: 4,
      title: "Analytics insights for July",
      type: "analytics",
      date: "2023-07-25",
      preview: "Analyzed your July performance across platforms and identified growth opportunities...",
    },
    {
      id: 5,
      title: "Content ideas for summer",
      type: "ideas",
      date: "2023-07-15",
      preview: "Generated 15 content ideas for summer-themed videos and posts...",
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "conversation":
        return <MessageSquare className="h-4 w-4" />
      case "analysis":
        return <Video className="h-4 w-4" />
      case "caption":
        return <FileText className="h-4 w-4" />
      case "analytics":
        return <BarChart3 className="h-4 w-4" />
      case "ideas":
        return <Lightbulb className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Assistant History
        </CardTitle>
        <CardDescription>Your recent interactions with the AI assistant</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="p-3 rounded-md border">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="rounded-full bg-primary/10 p-1.5 mr-2">{getIcon(item.type)}</div>
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{item.preview}</p>
              <Button variant="link" size="sm" className="px-0 h-8 mt-1">
                Continue conversation
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
