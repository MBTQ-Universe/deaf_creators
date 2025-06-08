import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Film, MapPin, Clock } from "lucide-react"
import Image from "next/image"

interface RecentUploadsProps extends React.HTMLAttributes<HTMLDivElement> {}

const recentUploads = [
  {
    id: 1,
    title: "My Oklahoma Journey",
    thumbnail: "/placeholder.svg?height=120&width=200",
    type: "video",
    location: "Oklahoma City, OK",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    title: "Food Review: Local BBQ",
    thumbnail: "/placeholder.svg?height=120&width=200",
    type: "video",
    location: "Tulsa, OK",
    timestamp: "Yesterday",
  },
  {
    id: 3,
    title: "Beauty Routine in ASL",
    thumbnail: "/placeholder.svg?height=120&width=200",
    type: "video",
    location: "Home Studio",
    timestamp: "3 days ago",
  },
]

export function RecentUploads({ className, ...props }: RecentUploadsProps) {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Recent Uploads</CardTitle>
        <CardDescription>Your latest content with location and timestamp</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentUploads.map((upload) => (
            <div key={upload.id} className="flex items-center space-x-4">
              <div className="relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-md">
                <Image src={upload.thumbnail || "/placeholder.svg"} alt={upload.title} fill className="object-cover" />
                {upload.type === "video" && (
                  <div className="absolute bottom-1 right-1 rounded-full bg-black/70 p-1">
                    <Film className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-medium">{upload.title}</h4>
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPin className="mr-1 h-3 w-3" />
                  <span>{upload.location}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>{upload.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
