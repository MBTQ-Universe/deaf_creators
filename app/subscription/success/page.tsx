import Link from "next/link"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"

export default function SubscriptionSuccessPage() {
  return (
    <DashboardShell>
      <div className="max-w-md mx-auto">
        <Card className="border-green-200">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Subscription Activated!</CardTitle>
            <CardDescription>Your 7-day free trial has started</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>
              Thank you for subscribing to DeafCreator. Your account has been upgraded and your free trial is now
              active.
            </p>
            <div className="rounded-md bg-muted p-4 text-sm">
              <p>
                Your first payment of <span className="font-medium">$39.99</span> will be processed on{" "}
                <span className="font-medium">
                  {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button asChild className="w-full">
              <Link href="/dashboard">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/subscription/manage">Manage Subscription</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  )
}
