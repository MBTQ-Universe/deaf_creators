import { DashboardShell } from "@/components/dashboard-shell"
import { SubscriptionCheckout } from "@/components/subscription-checkout"

export default function CheckoutPage({ searchParams }: { searchParams: { plan?: string; cycle?: string } }) {
  const plan = searchParams.plan || "creator-pro"
  const cycle = searchParams.cycle === "yearly" ? "yearly" : "monthly"

  // Map plan names and prices
  const planDetails = {
    basic: {
      name: "Basic",
      price: cycle === "monthly" ? 9.99 : 99.99,
    },
    premium: {
      name: "Premium",
      price: cycle === "monthly" ? 19.99 : 199.99,
    },
    family: {
      name: "Family",
      price: cycle === "monthly" ? 29.99 : 299.99,
    },
    "creator-basic": {
      name: "Creator Basic",
      price: cycle === "monthly" ? 19.99 : 199.99,
    },
    "creator-pro": {
      name: "Creator Pro",
      price: cycle === "monthly" ? 39.99 : 399.99,
    },
    "creator-enterprise": {
      name: "Creator Enterprise",
      price: cycle === "monthly" ? 99.99 : 999.99,
    },
  }

  const planName = planDetails[plan as keyof typeof planDetails]?.name || "Creator Pro"
  const planPrice = planDetails[plan as keyof typeof planDetails]?.price || 39.99

  return (
    <DashboardShell>
      <SubscriptionCheckout
        planName={planName}
        planPrice={planPrice}
        billingCycle={cycle as "monthly" | "yearly"}
        trialDays={7}
      />
    </DashboardShell>
  )
}
