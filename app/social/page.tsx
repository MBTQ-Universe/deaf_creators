import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { SocialMediaDashboard } from "@/components/social-media-dashboard"
import { SocialMediaCalendar } from "@/components/social-media-calendar"
import { SocialMediaAnalytics } from "@/components/social-media-analytics"

export default function SocialMediaPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Social Media Management" text="Manage all your social media platforms in one place" />
      <div className="grid gap-6">
        <SocialMediaDashboard />
        <div className="grid gap-6 md:grid-cols-2">
          <SocialMediaCalendar />
          <SocialMediaAnalytics />
        </div>
      </div>
    </DashboardShell>
  )
}
