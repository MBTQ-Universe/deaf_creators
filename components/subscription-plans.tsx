"use client"

import { useState } from "react"
import { Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"

export function SubscriptionPlans() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [userType, setUserType] = useState<"subscriber" | "creator">("subscriber")

  const subscriberPlans = [
    {
      name: "Basic",
      description: "Access to all public content with limited features",
      price: billingCycle === "monthly" ? 9.99 : 99.99,
      features: [
        "Access to all public videos",
        "Basic community features",
        "Watch on 1 device at a time",
        "720p video quality",
        "Email support",
      ],
      notIncluded: ["Exclusive creator content", "Live event access", "Offline downloads", "Ad-free experience"],
    },
    {
      name: "Premium",
      description: "Full access to all content and premium features",
      price: billingCycle === "monthly" ? 19.99 : 199.99,
      popular: true,
      features: [
        "Everything in Basic",
        "Exclusive creator content",
        "Live event access",
        "Watch on 3 devices at a time",
        "1080p video quality",
        "Offline downloads",
        "Ad-free experience",
        "Priority support",
      ],
      notIncluded: [],
    },
    {
      name: "Family",
      description: "Share premium features with your family",
      price: billingCycle === "monthly" ? 29.99 : 299.99,
      features: [
        "Everything in Premium",
        "Up to 5 profiles",
        "Watch on 5 devices at a time",
        "4K video quality (where available)",
        "Family content controls",
        "Dedicated support",
      ],
      notIncluded: [],
    },
  ]

  const creatorPlans = [
    {
      name: "Creator Basic",
      description: "Essential tools for new content creators",
      price: billingCycle === "monthly" ? 19.99 : 199.99,
      features: [
        "Upload up to 10 videos per month",
        "Basic analytics",
        "Standard video processing",
        "Community engagement tools",
        "Email support",
        "70% revenue share",
      ],
      notIncluded: ["AI-powered captioning", "Advanced analytics", "Priority video processing", "Monetization tools"],
    },
    {
      name: "Creator Pro",
      description: "Professional tools for serious content creators",
      price: billingCycle === "monthly" ? 39.99 : 399.99,
      popular: true,
      features: [
        "Everything in Creator Basic",
        "Unlimited video uploads",
        "AI-powered captioning and translation",
        "Advanced analytics and insights",
        "Priority video processing",
        "Monetization tools",
        "Custom branding options",
        "Priority support",
        "80% revenue share",
      ],
      notIncluded: [],
    },
    {
      name: "Creator Enterprise",
      description: "Complete solution for professional creators and organizations",
      price: billingCycle === "monthly" ? 99.99 : 999.99,
      features: [
        "Everything in Creator Pro",
        "Dedicated account manager",
        "Custom API access",
        "White-label options",
        "Team collaboration tools",
        "Premium analytics with custom reports",
        "Early access to new features",
        "24/7 priority support",
        "90% revenue share",
      ],
      notIncluded: [],
    },
  ]

  const plans = userType === "subscriber" ? subscriberPlans : creatorPlans

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center space-y-4 text-center mb-10">
        <Badge className="mb-2">Subscription</Badge>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Choose Your Plan</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">Start with a 7-day free trial. Cancel anytime.</p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-6 mb-10">
        <Tabs defaultValue="subscriber" className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="subscriber" onClick={() => setUserType("subscriber")}>
              Subscriber
            </TabsTrigger>
            <TabsTrigger value="creator" onClick={() => setUserType("creator")}>
              Creator
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center space-x-2">
          <span className={billingCycle === "monthly" ? "font-medium" : "text-muted-foreground"}>Monthly</span>
          <Switch
            checked={billingCycle === "yearly"}
            onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
          />
          <span className={billingCycle === "yearly" ? "font-medium" : "text-muted-foreground"}>Yearly</span>
          <Badge variant="outline" className="ml-2 text-emerald-600 bg-emerald-50">
            Save 20%
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col ${plan.popular ? "border-primary shadow-md relative" : ""}`}>
            {plan.popular && (
              <div className="absolute top-0 right-0">
                <Badge className="mr-4 mt-4">Most Popular</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-3xl font-bold">${plan.price.toFixed(2)}</span>
                <span className="text-muted-foreground">/{billingCycle === "monthly" ? "month" : "year"}</span>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-medium">What's included:</h4>
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.notIncluded.length > 0 && (
                  <>
                    <h4 className="text-sm font-medium text-muted-foreground pt-2">Not included:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {plan.notIncluded.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <span className="mr-2 h-4 w-4 flex items-center justify-center">-</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Start 7-Day Free Trial</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-muted-foreground">
          All plans include a 7-day free trial. No credit card required to start.
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-auto w-auto p-0 ml-1">
                  <Info className="h-4 w-4" />
                  <span className="sr-only">More info</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  You won't be charged until your free trial ends. You can cancel anytime before the trial ends.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </p>
      </div>
    </div>
  )
}
