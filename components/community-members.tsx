import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, UserPlus } from "lucide-react"

export function CommunityMembers() {
  const members = [
    {
      id: 1,
      name: "Alex Johnson",
      handle: "@alexasl",
      avatar: "/placeholder-user.jpg",
      role: "Beauty Creator",
    },
    {
      id: 2,
      name: "Maya Rodriguez",
      handle: "@mayasigns",
      avatar: "/placeholder-user.jpg",
      role: "Travel Vlogger",
    },
    {
      id: 3,
      name: "Jamal Williams",
      handle: "@jamalw",
      avatar: "/placeholder-user.jpg",
      role: "Tech Reviewer",
    },
    {
      id: 4,
      name: "Sarah Chen",
      handle: "@sarahc",
      avatar: "/placeholder-user.jpg",
      role: "Lifestyle Creator",
    },
    {
      id: 5,
      name: "David Kim",
      handle: "@davidkim",
      avatar: "/placeholder-user.jpg",
      role: "Food Blogger",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5" />
          Creator Network
        </CardTitle>
        <CardDescription>Connect with other deaf content creators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" className="w-full">
            View All Creators
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
