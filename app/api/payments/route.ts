import { type NextRequest, NextResponse } from "next/server"

/**
 * Creator Payments API
 * Manages earnings, royalties, and payment processing for creators
 */

// Get creator earnings and payment history
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const creatorId = searchParams.get("creatorId")
    const period = searchParams.get("period") // Format: YYYY-MM
    const type = searchParams.get("type") // royalties, milestone, bonus

    // In production: fetch from database via Flask API
    const mockEarnings = {
      creatorId,
      period: period || new Date().toISOString().slice(0, 7),
      earnings: {
        total: 1250.0,
        breakdown: [
          {
            type: "royalties",
            amount: 800.0,
            description: "Video royalties for 5 videos",
          },
          {
            type: "scene_contribution",
            amount: 350.0,
            description: "Scene contributions to 3 collaborative projects",
          },
          {
            type: "bonus",
            amount: 100.0,
            description: "Monthly engagement bonus",
          },
        ],
        currency: "USD",
      },
      paymentStatus: "pending",
      estimatedPaymentDate: new Date(
        new Date().setDate(new Date().getDate() + 7)
      ).toISOString(),
    }

    return NextResponse.json(mockEarnings)
  } catch (error) {
    console.error("Error fetching earnings:", error)
    return NextResponse.json(
      { error: "Failed to fetch earnings" },
      { status: 500 }
    )
  }
}

// Request payout or update payment preferences
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { action, creatorId, paymentMethod, amount } = body

    switch (action) {
      case "request_payout":
        // In production: initiate payout via Stripe/PayPal
        return NextResponse.json({
          success: true,
          message: "Payout request submitted",
          payoutId: `payout_${Date.now()}`,
          estimatedArrival: new Date(
            new Date().setDate(new Date().getDate() + 3)
          ).toISOString(),
        })

      case "update_payment_method":
        // In production: update payment preferences
        return NextResponse.json({
          success: true,
          message: "Payment method updated",
          paymentMethod,
        })

      case "calculate_royalties":
        // Calculate royalties for a specific period
        const royalties = {
          period: body.period,
          totalViews: 50000,
          revenueShare: 0.7, // 70% to creator
          grossRevenue: 500.0,
          netEarnings: 350.0,
          breakdown: [
            { videoId: "v1", views: 20000, earnings: 140.0 },
            { videoId: "v2", views: 15000, earnings: 105.0 },
            { videoId: "v3", views: 15000, earnings: 105.0 },
          ],
        }
        return NextResponse.json(royalties)

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Payment processing error:", error)
    return NextResponse.json(
      { error: "Payment processing failed" },
      { status: 500 }
    )
  }
}
