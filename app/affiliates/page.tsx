import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { AffiliatePrograms } from "@/components/affiliate-programs"
import { AffiliateStats } from "@/components/affiliate-stats"
import { AffiliateLinks } from "@/components/affiliate-links"

export default function AffiliatePage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Affiliate Programs"
        text="Monetize your influence with deaf-focused affiliate partnerships"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AffiliateStats className="col-span-full lg:col-span-1" />
        <AffiliateLinks className="col-span-full md:col-span-1 lg:col-span-2" />
      </div>
      <AffiliatePrograms />
    </DashboardShell>
  )
}
