import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Youtube, Instagram, Twitter, TwitterIcon as TikTok } from "lucide-react"

export function SocialAccounts() {
  const accounts = [
    {
      platform: "YouTube",
      username: "@MoniqueWilson",
      followers: "12.5K",
      icon: Youtube,
      color: "text-red-500",
      connected: true,
    },
    {
      platform: "Instagram",
      username: "@MoniqueSignsLife",
      followers: "8.2K",
      icon: Instagram,
      color: "text-pink-500",
      connected: true,
    },
    {
      platform: "Twitter",
      username: "@MoniqueWilson",
      followers: "5.4K",
      icon: Twitter,
      color: "text-blue-400",
      connected: false,
    },
    {
      platform: "TikTok",
      username: "@MoniqueWilson",
      followers: "20.1K",
      icon: TikTok,
      color: "text-black dark:text-white",
      connected: true,
    },
  ]

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Social Media Accounts</CardTitle>
        <CardDescription>Connect and manage your social media platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {accounts.map((account) => (
            <Card key={account.platform} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col items-center p-6">
                  <account.icon className={`h-12 w-12 ${account.color}`} />
                  <h3 className="mt-4 font-semibold">{account.platform}</h3>
                  <p className="text-sm text-muted-foreground">{account.username}</p>
                  <p className="mt-2 text-sm font-medium">{account.followers} followers</p>
                  <Button variant={account.connected ? "outline" : "default"} className="mt-4 w-full">
                    {account.connected ? "Manage" : "Connect"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
