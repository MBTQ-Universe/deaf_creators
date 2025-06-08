import { type NextRequest, NextResponse } from "next/server"

// Define which paths require authentication
const protectedPaths = [
  "/dashboard",
  "/videos/upload",
  "/subscription/manage",
  "/analytics",
  "/community",
  "/deaf-ecosystem",
  "/affiliates",
  "/tasks",
  "/documents",
  "/assistant",
  "/social",
]

// Define which paths are public
const publicPaths = [
  "/login",
  "/signup",
  "/",
  "/subscription",
  "/creators",
  "/b-roll-collection",
  "/getstarted",
  "/watchdemo",
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))
  const isPublicPath = publicPaths.some((path) => pathname === path || pathname.startsWith(path))
  const isApiPath = pathname.startsWith("/api")

  // If it's a public path or API path, allow access
  if (isPublicPath || isApiPath) {
    return NextResponse.next()
  }

  // If it's a protected path, check for authentication
  if (isProtectedPath) {
    const token = request.cookies.get("token")?.value

    // If no token, redirect to login
    if (!token) {
      const url = new URL("/login", request.url)
      url.searchParams.set("redirect", pathname)
      return NextResponse.redirect(url)
    }

    try {
      // Validate token with Flask backend
      const response = await fetch(`${process.env.FLASK_API_URL}/validate-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })

      if (!response.ok) {
        // Token is invalid, redirect to login
        const url = new URL("/login", request.url)
        url.searchParams.set("redirect", pathname)
        return NextResponse.redirect(url)
      }

      // Token is valid, allow access
      return NextResponse.next()
    } catch (error) {
      console.error("Token validation error:", error)
      // Error validating token, redirect to login
      const url = new URL("/login", request.url)
      url.searchParams.set("redirect", pathname)
      return NextResponse.redirect(url)
    }
  }

  // For all other paths, allow access
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
