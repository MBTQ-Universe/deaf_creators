import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Download, ExternalLink, FileText, Video } from "lucide-react"

export function EcosystemResources() {
  const resources = [
    {
      id: 1,
      title: "Guide to Deaf-Friendly Marketing",
      type: "PDF",
      icon: FileText,
      description: "Learn how to create inclusive marketing campaigns for the deaf community",
      free: true,
    },
    {
      id: 2,
      title: "ASL for Business Communication",
      type: "Video Course",
      icon: Video,
      description: "Video series teaching essential business ASL signs and phrases",
      free: false,
    },
    {
      id: 3,
      title: "Deaf Ecosystem Economic Report",
      type: "PDF",
      icon: FileText,
      description: "Annual report on the economic impact of deaf-owned businesses",
      free: true,
    },
    {
      id: 4,
      title: "Accessibility Checklist for Content Creators",
      type: "PDF",
      icon: FileText,
      description: "Ensure your content is accessible to deaf and hard of hearing audiences",
      free: true,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="mr-2 h-5 w-5" />
          Resources
        </CardTitle>
        <CardDescription>Guides, reports, and educational materials</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resources.map((resource) => (
            <div key={resource.id} className="p-4 rounded-lg border space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{resource.title}</h3>
                <Badge variant={resource.free ? "outline" : "secondary"}>{resource.free ? "Free" : "Premium"}</Badge>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <resource.icon className="mr-1 h-3 w-3" />
                <span>{resource.type}</span>
              </div>
              <p className="text-sm text-muted-foreground">{resource.description}</p>
              <Button variant="outline" size="sm" className="w-full mt-2">
                {resource.type === "PDF" ? (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </>
                ) : (
                  <>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Access
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
