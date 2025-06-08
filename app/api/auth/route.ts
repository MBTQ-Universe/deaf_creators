import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, userId, email } = body

    // Validate the token with your Flask backend
    const validationResponse = await fetch(`${process.env.FLASK_API_URL}/validate-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })

    if (!validationResponse.ok) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const validationData = await validationResponse.json()

    // Create a session or JWT for the Next.js app
    // This is a simplified example - you would typically use a more robust solution
    const session = {
      userId,
      email,
      isAuthenticated: true,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    }

    // In a real implementation, you would store this in a database or use a JWT

    return NextResponse.json({
      success: true,
      user: validationData.user,
      session,
    })
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  // This endpoint would verify if the user is authenticated
  // You would typically check a session cookie or JWT

  const authHeader = request.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 })
  }

  const token = authHeader.split(" ")[1]

  try {
    // Validate token with your Flask backend
    const validationResponse = await fetch(`${process.env.FLASK_API_URL}/validate-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })

    if (!validationResponse.ok) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 })
    }

    const userData = await validationResponse.json()

    return NextResponse.json({
      isAuthenticated: true,
      user: userData.user,
    })
  } catch (error) {
    console.error("Token validation error:", error)
    return NextResponse.json({ isAuthenticated: false }, { status: 500 })
  }
}
