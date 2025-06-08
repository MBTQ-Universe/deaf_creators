import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Fetch video from Flask API
    const response = await fetch(`${process.env.FLASK_API_URL}/videos/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch video" }, { status: 500 })
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Video fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch video" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

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

    // Update the video metadata via Flask API
    const updateResponse = await fetch(`${process.env.FLASK_API_URL}/videos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
      },
      body: JSON.stringify({
        ...body,
        userId, // Ensure the user ID is included
      }),
    })

    if (!updateResponse.ok) {
      return NextResponse.json({ error: "Failed to update video" }, { status: 500 })
    }

    const videoData = await updateResponse.json()

    return NextResponse.json(videoData)
  } catch (error) {
    console.error("Video update error:", error)
    return NextResponse.json({ error: "Failed to update video" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

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

    // Delete the video via Flask API
    const deleteResponse = await fetch(`${process.env.FLASK_API_URL}/videos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
      },
    })

    if (!deleteResponse.ok) {
      return NextResponse.json({ error: "Failed to delete video" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Video deletion error:", error)
    return NextResponse.json({ error: "Failed to delete video" }, { status: 500 })
  }
}
