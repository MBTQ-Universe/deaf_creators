import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { EcosystemDirectory } from "@/components/ecosystem-directory"
import { EcosystemEvents } from "@/components/ecosystem-events"
import { EcosystemResources } from "@/components/ecosystem-resources"

export default function DeafEcosystemPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Deaf Ecosystem"
        text="Connect with businesses, organizations, and resources in the deaf community"
      />
      <div className="grid gap-6">
        <EcosystemDirectory />
        <div className="grid gap-6 md:grid-cols-2">
          <EcosystemEvents />
          <EcosystemResources />
        </div>
      </div>
    </DashboardShell>
  )
}
