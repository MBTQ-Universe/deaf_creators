"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { SubscriptionCheckout } from "@/components/subscription-checkout"

function CheckoutContent() {
  const searchParams = useSearchParams()
  const plan = searchParams.get("plan") || "creator-pro"
  const cycle = searchParams.get("cycle") === "yearly" ? "yearly" : "monthly"

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
    <SubscriptionCheckout
      planName={planName}
      planPrice={planPrice}
      billingCycle={cycle as "monthly" | "yearly"}
      trialDays={7}
    />
  )
}

export default function CheckoutPage() {
  return (
    <DashboardShell>
      <Suspense fallback={<div>Loading...</div>}>
        <CheckoutContent />
      </Suspense>
    </DashboardShell>
  )
}
