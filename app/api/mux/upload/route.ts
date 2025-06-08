import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Authenticate the request
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the user from the token
    // This is a simplified example - you would typically validate the token
    const token = authHeader.split(" ")[1]

    // Create a direct upload URL with MUX
    const response = await fetch("https://api.mux.com/video/v1/uploads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${process.env.MUX_TOKEN_ID}:${process.env.MUX_TOKEN_SECRET}`).toString(
          "base64",
        )}`,
      },
      body: JSON.stringify({
        cors_origin: process.env.NEXT_PUBLIC_APP_URL,
        new_asset_settings: {
          playback_policy: ["public"],
          mp4_support: "standard",
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("MUX API error:", errorData)
      return NextResponse.json({ error: "Failed to create upload URL" }, { status: 500 })
    }

    const data = await response.json()

    return NextResponse.json({
      uploadUrl: data.data.url,
      uploadId: data.data.id,
    })
  } catch (error) {
    console.error("MUX upload error:", error)
    return NextResponse.json({ error: "Failed to create upload" }, { status: 500 })
  }
}
