"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CreditCard, Lock } from "lucide-react"
import Link from "next/link"

interface SubscriptionCheckoutProps {
  planName: string
  planPrice: number
  billingCycle: "monthly" | "yearly"
  trialDays: number
}

export function SubscriptionCheckout({
  planName = "Creator Pro",
  planPrice = 39.99,
  billingCycle = "monthly",
  trialDays = 7,
}: SubscriptionCheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState<"credit-card" | "paypal">("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      window.location.href = "/subscription/success"
    }, 2000)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link
          href="/subscription"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to plans
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-5">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>Enter your payment details to start your {trialDays}-day free trial</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <RadioGroup
                  defaultValue="credit-card"
                  value={paymentMethod}
                  onValueChange={(value) => setPaymentMethod(value as "credit-card" | "paypal")}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <RadioGroupItem value="credit-card" id="credit-card" className="peer sr-only" />
                    <Label
                      htmlFor="credit-card"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <CreditCard className="mb-3 h-6 w-6" />
                      Credit Card
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
                    <Label
                      htmlFor="paypal"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mb-3 h-6 w-6"
                      >
                        <path d="M17.001 8.9c.5 0 .9.4.9.9s-.4.9-.9.9h-10c-.5 0-.9-.4-.9-.9s.4-.9.9-.9h10Z" />
                        <path d="M17.001 12.9c.5 0 .9.4.9.9s-.4.9-.9.9h-10c-.5 0-.9-.4-.9-.9s.4-.9.9-.9h10Z" />
                        <path d="M12.001 16.9c.5 0 .9.4.9.9s-.4.9-.9.9h-5c-.5 0-.9-.4-.9-.9s.4-.9.9-.9h5Z" />
                        <path d="M7.001 4.9c.5 0 .9.4.9.9s-.4.9-.9.9h-2c-.5 0-.9-.4-.9-.9s.4-.9.9-.9h2Z" />
                        <path d="M19.001 4.9c.5 0 .9.4.9.9s-.4.9-.9.9h-8c-.5 0-.9-.4-.9-.9s.4-.9.9-.9h8Z" />
                      </svg>
                      PayPal
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "credit-card" && (
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name on card</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="card-number">Card number</Label>
                      <Input id="card-number" placeholder="4242 4242 4242 4242" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="expiry">Expiry date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" required />
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid gap-2">
                  <Label htmlFor="address">Billing address</Label>
                  <Input id="address" placeholder="123 Main St" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="zip">ZIP / Postal code</Label>
                    <Input id="zip" placeholder="10001" required />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <select
                    id="country"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="">Select country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    required
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button type="submit" className="w-full" disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Start Free Trial"}
                </Button>

                <div className="flex items-center justify-center text-xs text-muted-foreground">
                  <Lock className="mr-1 h-3 w-3" />
                  Secure payment processing
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your subscription details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">{planName}</span>
                <span>
                  ${planPrice.toFixed(2)}/{billingCycle === "monthly" ? "mo" : "yr"}
                </span>
              </div>

              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Billing cycle</span>
                <span className="capitalize">{billingCycle}</span>
              </div>

              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Free trial</span>
                <span>{trialDays} days</span>
              </div>

              <Separator />

              <div className="flex justify-between font-medium">
                <span>First payment</span>
                <span>$0.00</span>
              </div>

              <div className="flex justify-between text-sm text-muted-foreground">
                <span>After free trial</span>
                <span>
                  ${planPrice.toFixed(2)}/{billingCycle === "monthly" ? "mo" : "yr"}
                </span>
              </div>

              <div className="rounded-md bg-muted p-4 text-sm">
                <p>
                  You won't be charged until your free trial ends on{" "}
                  <span className="font-medium">
                    {new Date(Date.now() + trialDays * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                  . You can cancel anytime before then.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
