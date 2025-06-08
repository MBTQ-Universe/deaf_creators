import { DashboardShell } from "@/components/dashboard-shell"
import { SubscriptionPlans } from "@/components/subscription-plans"

export default function SubscriptionPage() {
  return (
    <DashboardShell>
      <SubscriptionPlans />
    </DashboardShell>
  )
}
