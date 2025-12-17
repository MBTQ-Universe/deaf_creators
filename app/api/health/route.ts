import { type NextRequest, NextResponse } from "next/server"

/**
 * Health check endpoint for container orchestration and load balancers
 */
export async function GET(_request: NextRequest) {
  const healthcheck = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || "0.1.0",
    environment: process.env.NODE_ENV || "development",
  }

  try {
    // Add additional health checks here (database, external services, etc.)
    return NextResponse.json(healthcheck, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { status: "unhealthy", error: "Health check failed" },
      { status: 503 }
    )
  }
}
