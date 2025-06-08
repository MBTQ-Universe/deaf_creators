import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tag, Plus, Edit, Trash2 } from "lucide-react"

export function VideoCategories() {
  const categories = [
    {
      id: 1,
      name: "Educational",
      count: 12,
      description: "ASL tutorials, deaf culture, and educational content",
    },
    {
      id: 2,
      name: "Vlog",
      count: 8,
      description: "Personal vlogs, travel, and daily life",
    },
    {
      id: 3,
      name: "Review",
      count: 6,
      description: "Product reviews and recommendations",
    },
    {
      id: 4,
      name: "Tutorial",
      count: 5,
      description: "How-to guides and step-by-step instructions",
    },
    {
      id: 5,
      name: "Sponsored",
      count: 3,
      description: "Sponsored content and brand partnerships",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <Tag className="mr-2 h-5 w-5" />
            Video Categories
          </CardTitle>
          <CardDescription>Organize your videos by category</CardDescription>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between p-3 rounded-md border">
              <div>
                <div className="flex items-center">
                  <h4 className="font-medium">{category.name}</h4>
                  <Badge variant="outline" className="ml-2">
                    {category.count} videos
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
