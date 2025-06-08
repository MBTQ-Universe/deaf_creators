import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus } from "lucide-react"

export function CommunityGroups() {
  const groups = [
    {
      id: 1,
      name: "Deaf Beauty Creators",
      members: 128,
      category: "Beauty",
      joined: true,
    },
    {
      id: 2,
      name: "ASL Content Strategy",
      members: 95,
      category: "Education",
      joined: false,
    },
    {
      id: 3,
      name: "Deaf Travel Network",
      members: 76,
      category: "Travel",
      joined: true,
    },
    {
      id: 4,
      name: "Accessibility Advocates",
      members: 112,
      category: "Advocacy",
      joined: false,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5" />
          Creator Groups
        </CardTitle>
        <CardDescription>Join groups based on your content niche</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {groups.map((group) => (
            <div key={group.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{group.name}</h3>
                <Badge variant="outline">{group.category}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{group.members} members</p>
                <Button variant={group.joined ? "outline" : "default"} size="sm" className="h-8">
                  {group.joined ? (
                    "Joined"
                  ) : (
                    <>
                      <UserPlus className="mr-1 h-3 w-3" />
                      Join
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full">
            Discover More Groups
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
