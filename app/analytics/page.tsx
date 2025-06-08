import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { AnalyticsOverview } from "@/components/analytics-overview"
import { AnalyticsIntegrations } from "@/components/analytics-integrations"
import { ContentPerformance } from "@/components/content-performance"
import { AudienceInsights } from "@/components/audience-insights"
import { RevenueAnalytics } from "@/components/revenue-analytics"

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Analytics Dashboard"
        text="Track your performance across platforms and optimize your content strategy"
      />
      <div className="grid gap-6">
        <AnalyticsOverview />
        <div className="grid gap-6 md:grid-cols-2">
          <ContentPerformance />
          <AudienceInsights />
        </div>
        <RevenueAnalytics />
        <AnalyticsIntegrations />
      </div>
    </DashboardShell>
  )
}
