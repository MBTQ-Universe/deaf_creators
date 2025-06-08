import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wand2, Video, FileText, BarChart3, MessageSquare, Lightbulb } from "lucide-react"

export function AssistantFeatures() {
  const features = [
    {
      id: 1,
      title: "Content Analysis",
      description: "Get AI feedback on your videos and content",
      icon: Video,
    },
    {
      id: 2,
      title: "Caption Generation",
      description: "Generate accurate captions for your videos",
      icon: FileText,
    },
    {
      id: 3,
      title: "Analytics Insights",
      description: "Get personalized insights from your analytics",
      icon: BarChart3,
    },
    {
      id: 4,
      title: "ASL Translation",
      description: "Translate between ASL concepts and written English",
      icon: MessageSquare,
    },
    {
      id: 5,
      title: "Content Ideas",
      description: "Get AI-generated content ideas for your niche",
      icon: Lightbulb,
    },
    {
      id: 6,
      title: "Accessibility Check",
      description: "Check your content for accessibility issues",
      icon: Wand2,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wand2 className="mr-2 h-5 w-5" />
          Assistant Features
        </CardTitle>
        <CardDescription>Powerful AI tools to enhance your content creation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Try Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
