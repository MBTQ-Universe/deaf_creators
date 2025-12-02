import { type NextRequest, NextResponse } from "next/server"

/**
 * Request Matching API
 * Matches video requests with available content or assigns creators to tasks
 */

// Search for matching content or get task recommendations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")
    const category = searchParams.get("category")
    const tags = searchParams.get("tags")?.split(",")
    const matchType = searchParams.get("type") || "content" // content, creator, task

    if (matchType === "content") {
      // Search for existing video content
      const matchingContent = {
        query,
        totalResults: 15,
        results: [
          {
            videoId: "vid_001",
            title: "ASL Tutorial: Basic Signs",
            relevanceScore: 0.95,
            creator: "ASL Slam",
            duration: 480,
            thumbnailUrl: "/placeholder.svg?height=180&width=320",
            licensingOptions: [
              { type: "standard", price: 50 },
              { type: "extended", price: 150 },
            ],
          },
          {
            videoId: "vid_002",
            title: "Deaf Culture Documentary",
            relevanceScore: 0.87,
            creator: "Cheyenna Clearbrook",
            duration: 1200,
            thumbnailUrl: "/placeholder.svg?height=180&width=320",
            licensingOptions: [
              { type: "standard", price: 100 },
              { type: "extended", price: 300 },
            ],
          },
        ],
      }
      return NextResponse.json(matchingContent)
    }

    if (matchType === "creator") {
      // Find creators for a specific task
      const matchingCreators = {
        category,
        totalResults: 8,
        creators: [
          {
            creatorId: "creator_001",
            name: "ASL Slam",
            specialty: "ASL Poetry & Performance",
            rating: 4.9,
            completedTasks: 45,
            availability: "available",
            estimatedRate: { min: 100, max: 500, currency: "USD" },
          },
          {
            creatorId: "creator_002",
            name: "Jessica Flores",
            specialty: "Educational Content",
            rating: 4.8,
            completedTasks: 32,
            availability: "busy",
            nextAvailable: new Date(
              new Date().setDate(new Date().getDate() + 7)
            ).toISOString(),
            estimatedRate: { min: 75, max: 300, currency: "USD" },
          },
        ],
      }
      return NextResponse.json(matchingCreators)
    }

    if (matchType === "task") {
      // Get available tasks for a creator
      const availableTasks = {
        totalTasks: 12,
        tasks: [
          {
            taskId: "task_001",
            title: "Create ASL Tutorial Video",
            description: "5-minute tutorial on basic ASL greetings",
            category: "Education",
            budget: { min: 150, max: 300, currency: "USD" },
            deadline: new Date(
              new Date().setDate(new Date().getDate() + 14)
            ).toISOString(),
            requirements: ["ASL fluency", "HD video", "Captions required"],
            matchScore: 0.92,
          },
          {
            taskId: "task_002",
            title: "Deaf Culture Vlog",
            description: "Share day-in-the-life content",
            category: "Lifestyle",
            budget: { min: 100, max: 200, currency: "USD" },
            deadline: new Date(
              new Date().setDate(new Date().getDate() + 7)
            ).toISOString(),
            requirements: ["Personal story", "Authentic content"],
            matchScore: 0.85,
          },
        ],
      }
      return NextResponse.json(availableTasks)
    }

    return NextResponse.json({ error: "Invalid match type" }, { status: 400 })
  } catch (error) {
    console.error("Error searching for matches:", error)
    return NextResponse.json(
      { error: "Failed to search for matches" },
      { status: 500 }
    )
  }
}

// Create a content request or assign a task
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { requestType, ...data } = body

    if (requestType === "content_request") {
      // Create a new content request
      const contentRequest = {
        requestId: `req_${Date.now()}`,
        status: "pending",
        title: data.title,
        description: data.description,
        category: data.category,
        budget: data.budget,
        deadline: data.deadline,
        requirements: data.requirements,
        createdAt: new Date().toISOString(),
        matchingCreators: 5, // Number of potentially matching creators
      }
      return NextResponse.json(contentRequest, { status: 201 })
    }

    if (requestType === "assign_task") {
      // Assign a task to a creator
      const assignment = {
        assignmentId: `assign_${Date.now()}`,
        taskId: data.taskId,
        creatorId: data.creatorId,
        status: "assigned",
        agreedBudget: data.budget,
        deadline: data.deadline,
        assignedAt: new Date().toISOString(),
      }
      return NextResponse.json(assignment, { status: 201 })
    }

    if (requestType === "license_content") {
      // License existing content
      const license = {
        licenseId: `lic_${Date.now()}`,
        videoId: data.videoId,
        licenseType: data.licenseType,
        price: data.price,
        validFrom: new Date().toISOString(),
        validUntil: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).toISOString(),
        terms: data.terms,
      }
      return NextResponse.json(license, { status: 201 })
    }

    return NextResponse.json({ error: "Invalid request type" }, { status: 400 })
  } catch (error) {
    console.error("Error creating request:", error)
    return NextResponse.json(
      { error: "Failed to create request" },
      { status: 500 }
    )
  }
}
