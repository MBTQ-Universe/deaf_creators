import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users } from "lucide-react"

export function EcosystemEvents() {
  const events = [
    {
      id: 1,
      title: "Deaf Entrepreneurs Summit",
      date: "August 15-17, 2023",
      location: "Chicago, IL",
      type: "Conference",
      attendees: 250,
      hasInterpreters: true,
    },
    {
      id: 2,
      title: "ASL Film Festival",
      date: "September 22-24, 2023",
      location: "Los Angeles, CA",
      type: "Festival",
      attendees: 500,
      hasInterpreters: true,
    },
    {
      id: 3,
      title: "Deaf Tech Meetup",
      date: "July 28, 2023",
      location: "Virtual",
      type: "Networking",
      attendees: 100,
      hasInterpreters: true,
    },
    {
      id: 4,
      title: "Deaf Business Showcase",
      date: "October 5, 2023",
      location: "Austin, TX",
      type: "Exhibition",
      attendees: 300,
      hasInterpreters: true,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Upcoming Events
        </CardTitle>
        <CardDescription>Conferences, meetups, and events for the deaf community</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="p-4 rounded-lg border space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{event.title}</h3>
                <Badge variant="outline">{event.type}</Badge>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="mr-1 h-3 w-3" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Users className="mr-1 h-3 w-3" />
                <span>{event.attendees} expected attendees</span>
                {event.hasInterpreters && (
                  <>
                    <span className="mx-2">•</span>
                    <span>ASL Interpreters Available</span>
                  </>
                )}
              </div>
              <Button size="sm" className="w-full mt-2">
                Register
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
