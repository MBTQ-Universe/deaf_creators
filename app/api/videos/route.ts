import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Authenticate the request
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the user from the token
    const token = authHeader.split(" ")[1]

    // Validate with Flask backend
    const userResponse = await fetch(`${process.env.FLASK_API_URL}/validate-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })

    if (!userResponse.ok) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const userData = await userResponse.json()
    const userId = userData.user.id

    // Get the video metadata from the request
    const body = await request.json()
    const { title, description, category, isPublic, tags, assetId } = body

    // Save the video metadata to your database via Flask API
    const saveResponse = await fetch(`${process.env.FLASK_API_URL}/videos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
      },
      body: JSON.stringify({
        title,
        description,
        category,
        isPublic,
        tags,
        assetId,
        userId,
      }),
    })

    if (!saveResponse.ok) {
      return NextResponse.json({ error: "Failed to save video metadata" }, { status: 500 })
    }

    const videoData = await saveResponse.json()

    return NextResponse.json(videoData)
  } catch (error) {
    console.error("Video creation error:", error)
    return NextResponse.json({ error: "Failed to create video" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const category = searchParams.get("category")
    const page = searchParams.get("page") || "1"
    const limit = searchParams.get("limit") || "10"

    // Build query parameters for Flask API
    const queryParams = new URLSearchParams()
    if (userId) queryParams.append("userId", userId)
    if (category) queryParams.append("category", category)
    queryParams.append("page", page)
    queryParams.append("limit", limit)

    // Fetch videos from Flask API
    const response = await fetch(`${process.env.FLASK_API_URL}/videos?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 })
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Video fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 })
  }
}
