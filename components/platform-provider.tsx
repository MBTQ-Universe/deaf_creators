"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type PlatformContextType = {
  earnings: number
  completedTasks: number
  totalTasks: number
  affiliateEarnings: number
  totalAffiliateClicks: number
  totalAffiliateConversions: number
  communityMembers: number
  updateEarnings: (amount: number) => void
  updateAffiliateEarnings: (amount: number) => void
  updateAffiliateMetrics: (clicks: number, conversions: number) => void
  completeTask: () => void
  subscriptionPlan: string
  subscriptionStatus: "trial" | "active" | "canceled" | "none"
  trialEndsAt: string | null
  updateSubscription: (
    plan: string,
    status: "trial" | "active" | "canceled" | "none",
    trialEndsAt?: string | null,
  ) => void
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined)

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const [earnings, setEarnings] = useState(0)
  const [completedTasks, setCompletedTasks] = useState(0)
  const [totalTasks, setTotalTasks] = useState(0)
  const [affiliateEarnings, setAffiliateEarnings] = useState(0)
  const [totalAffiliateClicks, setTotalAffiliateClicks] = useState(0)
  const [totalAffiliateConversions, setTotalAffiliateConversions] = useState(0)
  const [communityMembers, setCommunityMembers] = useState(0)
  const [subscriptionPlan, setSubscriptionPlan] = useState("none")
  const [subscriptionStatus, setSubscriptionStatus] = useState<"trial" | "active" | "canceled" | "none">("none")
  const [trialEndsAt, setTrialEndsAt] = useState<string | null>(null)

  // Load data from localStorage on client side
  useEffect(() => {
    const storedEarnings = localStorage.getItem("earnings")
    const storedCompletedTasks = localStorage.getItem("completedTasks")
    const storedTotalTasks = localStorage.getItem("totalTasks")
    const storedAffiliateEarnings = localStorage.getItem("affiliateEarnings")
    const storedAffiliateClicks = localStorage.getItem("affiliateClicks")
    const storedAffiliateConversions = localStorage.getItem("affiliateConversions")
    const storedCommunityMembers = localStorage.getItem("communityMembers")
    const storedSubscriptionPlan = localStorage.getItem("subscriptionPlan")
    const storedSubscriptionStatus = localStorage.getItem("subscriptionStatus")
    const storedTrialEndsAt = localStorage.getItem("trialEndsAt")

    if (storedEarnings) setEarnings(Number.parseFloat(storedEarnings))
    if (storedCompletedTasks) setCompletedTasks(Number.parseInt(storedCompletedTasks))
    if (storedTotalTasks) setTotalTasks(Number.parseInt(storedTotalTasks))
    else setTotalTasks(12) // Default number of tasks
    if (storedAffiliateEarnings) setAffiliateEarnings(Number.parseFloat(storedAffiliateEarnings))
    if (storedAffiliateClicks) setTotalAffiliateClicks(Number.parseInt(storedAffiliateClicks))
    if (storedAffiliateConversions) setTotalAffiliateConversions(Number.parseInt(storedAffiliateConversions))
    if (storedCommunityMembers) setCommunityMembers(Number.parseInt(storedCommunityMembers))
    else setCommunityMembers(125) // Default community members
    if (storedSubscriptionPlan) setSubscriptionPlan(storedSubscriptionPlan)
    if (storedSubscriptionStatus)
      setSubscriptionStatus(storedSubscriptionStatus as "trial" | "active" | "canceled" | "none")
    if (storedTrialEndsAt) setTrialEndsAt(storedTrialEndsAt)
  }, [])

  // Save data to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("earnings", earnings.toString())
      localStorage.setItem("completedTasks", completedTasks.toString())
      localStorage.setItem("totalTasks", totalTasks.toString())
      localStorage.setItem("affiliateEarnings", affiliateEarnings.toString())
      localStorage.setItem("affiliateClicks", totalAffiliateClicks.toString())
      localStorage.setItem("affiliateConversions", totalAffiliateConversions.toString())
      localStorage.setItem("communityMembers", communityMembers.toString())
      localStorage.setItem("subscriptionPlan", subscriptionPlan)
      localStorage.setItem("subscriptionStatus", subscriptionStatus)
      if (trialEndsAt) localStorage.setItem("trialEndsAt", trialEndsAt)
    }
  }, [
    earnings,
    completedTasks,
    totalTasks,
    affiliateEarnings,
    totalAffiliateClicks,
    totalAffiliateConversions,
    communityMembers,
    subscriptionPlan,
    subscriptionStatus,
    trialEndsAt,
  ])

  const updateEarnings = (amount: number) => {
    setEarnings((prev) => prev + amount)
  }

  const updateAffiliateEarnings = (amount: number) => {
    setAffiliateEarnings((prev) => prev + amount)
  }

  const updateAffiliateMetrics = (clicks: number, conversions: number) => {
    setTotalAffiliateClicks((prev) => prev + clicks)
    setTotalAffiliateConversions((prev) => prev + conversions)
  }

  const completeTask = () => {
    setCompletedTasks((prev) => prev + 1)
  }

  const updateSubscription = (
    plan: string,
    status: "trial" | "active" | "canceled" | "none",
    endDate?: string | null,
  ) => {
    setSubscriptionPlan(plan)
    setSubscriptionStatus(status)
    setTrialEndsAt(endDate || null)
  }

  return (
    <PlatformContext.Provider
      value={{
        earnings,
        completedTasks,
        totalTasks,
        affiliateEarnings,
        totalAffiliateClicks,
        totalAffiliateConversions,
        communityMembers,
        updateEarnings,
        updateAffiliateEarnings,
        updateAffiliateMetrics,
        completeTask,
        subscriptionPlan,
        subscriptionStatus,
        trialEndsAt,
        updateSubscription,
      }}
    >
      {children}
    </PlatformContext.Provider>
  )
}

export function usePlatform() {
  const context = useContext(PlatformContext)
  if (context === undefined) {
    throw new Error("usePlatform must be used within a PlatformProvider")
  }
  return context
}
