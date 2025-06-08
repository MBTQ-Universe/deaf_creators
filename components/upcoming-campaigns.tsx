import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Megaphone, Calendar } from "lucide-react"

export function UpcomingCampaigns() {
  const campaigns = [
    {
      title: "Deaf Awareness Month",
      date: "Sep 15 - Oct 15",
      status: "Open",
      compensation: "$500-1000",
      type: "Sponsored Content",
    },
    {
      title: "ASL Learning App Launch",
      date: "Aug 10 - Aug 30",
      status: "Invitation Only",
      compensation: "$750",
      type: "App Review",
    },
    {
      title: "Deaf-Owned Business Spotlight",
      date: "Ongoing",
      status: "Open",
      compensation: "Commission",
      type: "Affiliate Marketing",
    },
    {
      title: "Accessible Technology Review",
      date: "Sep 1 - Sep 30",
      status: "Open",
      compensation: "$300",
      type: "Product Review",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <Megaphone className="mr-2 h-5 w-5" />
            Upcoming Campaigns
          </CardTitle>
          <CardDescription>Monetization opportunities for deaf creators</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div key={campaign.title} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{campaign.title}</h4>
                <Badge variant={campaign.status === "Open" ? "default" : "secondary"} className="text-xs">
                  {campaign.status}
                </Badge>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                <span>{campaign.date}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>{campaign.type}</span>
                <span className="font-medium">{campaign.compensation}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
