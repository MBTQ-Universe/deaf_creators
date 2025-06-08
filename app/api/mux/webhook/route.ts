import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    // Verify the webhook signature from MUX
    const signature = request.headers.get("mux-signature")
    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 })
    }

    const rawBody = await request.text()
    const body = JSON.parse(rawBody)

    // Verify the webhook signature
    const isValid = verifySignature(signature, process.env.MUX_WEBHOOK_SECRET || "", rawBody)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    // Process the webhook based on the event type
    const { type, data } = body

    switch (type) {
      case "video.asset.ready":
        // Video is ready for playback
        await handleAssetReady(data)
        break
      case "video.asset.created":
        // Video asset was created
        await handleAssetCreated(data)
        break
      case "video.upload.cancelled":
        // Upload was cancelled
        await handleUploadCancelled(data)
        break
      default:
        console.log(`Unhandled webhook event: ${type}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook processing error:", error)
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 })
  }
}

// Helper function to verify MUX webhook signature
function verifySignature(signature: string, secret: string, body: string): boolean {
  const [timestamp, signatureHash] = signature.split(",")
  const timestampValue = timestamp.split("=")[1]
  const signatureValue = signatureHash.split("=")[1]

  const data = `${timestampValue}.${body}`
  const expectedSignature = crypto.createHmac("sha256", secret).update(data).digest("hex")

  return signatureValue === expectedSignature
}

// Handle asset ready event
async function handleAssetReady(data: any) {
  // Update your database with the playback ID and status
  // This would typically involve calling your Flask API or updating a database

  const assetId = data.id
  const playbackId = data.playback_ids[0].id

  // Example: Update your database
  await fetch(`${process.env.FLASK_API_URL}/videos/update-status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
    },
    body: JSON.stringify({
      assetId,
      playbackId,
      status: "ready",
    }),
  })
}

// Handle asset created event
async function handleAssetCreated(data: any) {
  // Similar to handleAssetReady but for the created event
  console.log("Asset created:", data.id)
}

// Handle upload cancelled event
async function handleUploadCancelled(data: any) {
  console.log("Upload cancelled:", data.id)
  // Update your database to reflect the cancelled upload
}
