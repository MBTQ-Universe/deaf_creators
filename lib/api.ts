/**
 * API Service Layer for Deaf Creators Platform
 * Handles all backend API communications for video management, creator tasks, and AI processing
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

export interface ApiError {
  message: string
  status: number
  code?: string
}

export interface Video {
  id: string
  title: string
  description: string
  category: string
  thumbnailUrl: string
  playbackUrl: string
  assetId?: string
  duration?: number
  views: number
  isPublic: boolean
  tags: string[]
  userId: string
  createdAt: string
  updatedAt: string
}

export interface VideoCreateRequest {
  title: string
  description: string
  category: string
  isPublic: boolean
  tags: string[]
  assetId: string
}

export interface VideoUpdateRequest {
  title?: string
  description?: string
  category?: string
  isPublic?: boolean
  tags?: string[]
}

export interface VideoListResponse {
  videos: Video[]
  total: number
  page: number
  limit: number
}

export interface CreatorTask {
  id: string
  type: "video_processing" | "ai_analysis" | "transcription" | "thumbnail_generation"
  status: "pending" | "in_progress" | "completed" | "failed"
  videoId: string
  userId: string
  result?: any
  error?: string
  createdAt: string
  updatedAt: string
  completedAt?: string
}

export interface AIModelRequest {
  videoId: string
  modelType: "transcription" | "sign_language_recognition" | "caption_generation" | "content_analysis"
  parameters?: Record<string, any>
}

export interface AIModelResponse {
  taskId: string
  status: string
  message: string
}

class ApiService {
  private getAuthToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")
    }
    return null
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getAuthToken()
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error: ApiError = {
        message: `API request failed: ${response.statusText}`,
        status: response.status,
      }

      try {
        const errorData = await response.json()
        error.message = errorData.message || errorData.error || error.message
        error.code = errorData.code
      } catch {
        // Failed to parse error response
      }

      throw error
    }

    return response.json()
  }

  // Video API methods
  async getVideos(params?: {
    userId?: string
    category?: string
    page?: number
    limit?: number
  }): Promise<VideoListResponse> {
    const queryParams = new URLSearchParams()
    if (params?.userId) queryParams.append("userId", params.userId)
    if (params?.category) queryParams.append("category", params.category)
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())

    const queryString = queryParams.toString()
    const endpoint = queryString ? `/videos?${queryString}` : "/videos"

    return this.request<VideoListResponse>(endpoint)
  }

  async getVideo(id: string): Promise<Video> {
    return this.request<Video>(`/videos/${id}`)
  }

  async createVideo(data: VideoCreateRequest): Promise<Video> {
    return this.request<Video>("/videos", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateVideo(id: string, data: VideoUpdateRequest): Promise<Video> {
    return this.request<Video>(`/videos/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  }

  async deleteVideo(id: string): Promise<void> {
    return this.request<void>(`/videos/${id}`, {
      method: "DELETE",
    })
  }

  async incrementVideoViews(id: string): Promise<void> {
    return this.request<void>(`/videos/${id}/views`, {
      method: "POST",
    })
  }

  // Creator Task API methods
  async getTasks(params?: {
    userId?: string
    videoId?: string
    status?: string
    page?: number
    limit?: number
  }): Promise<{ tasks: CreatorTask[]; total: number }> {
    const queryParams = new URLSearchParams()
    if (params?.userId) queryParams.append("userId", params.userId)
    if (params?.videoId) queryParams.append("videoId", params.videoId)
    if (params?.status) queryParams.append("status", params.status)
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())

    const queryString = queryParams.toString()
    const endpoint = queryString ? `/tasks?${queryString}` : "/tasks"

    return this.request<{ tasks: CreatorTask[]; total: number }>(endpoint)
  }

  async getTask(id: string): Promise<CreatorTask> {
    return this.request<CreatorTask>(`/tasks/${id}`)
  }

  async cancelTask(id: string): Promise<void> {
    return this.request<void>(`/tasks/${id}/cancel`, {
      method: "POST",
    })
  }

  // AI Model Processing API methods
  async requestAIProcessing(data: AIModelRequest): Promise<AIModelResponse> {
    return this.request<AIModelResponse>("/ai/process", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getAIModels(): Promise<Array<{
    id: string
    name: string
    type: string
    description: string
    enabled: boolean
  }>> {
    return this.request<Array<{
      id: string
      name: string
      type: string
      description: string
      enabled: boolean
    }>>("/ai/models")
  }

  async getAITaskResult(taskId: string): Promise<{
    taskId: string
    result: any
    status: string
  }> {
    return this.request<{
      taskId: string
      result: any
      status: string
    }>(`/ai/tasks/${taskId}/result`)
  }

  // Search and Discovery methods
  async searchVideos(query: string, filters?: {
    category?: string
    tags?: string[]
    dateFrom?: string
    dateTo?: string
  }): Promise<VideoListResponse> {
    const queryParams = new URLSearchParams()
    queryParams.append("q", query)
    if (filters?.category) queryParams.append("category", filters.category)
    if (filters?.tags) queryParams.append("tags", filters.tags.join(","))
    if (filters?.dateFrom) queryParams.append("dateFrom", filters.dateFrom)
    if (filters?.dateTo) queryParams.append("dateTo", filters.dateTo)

    return this.request<VideoListResponse>(`/videos/search?${queryParams.toString()}`)
  }

  async getVideoMetadata(assetId: string): Promise<{
    assetId: string
    duration: number
    aspectRatio: string
    resolution: { width: number; height: number }
    playbackUrls: Record<string, string>
  }> {
    return this.request<{
      assetId: string
      duration: number
      aspectRatio: string
      resolution: { width: number; height: number }
      playbackUrls: Record<string, string>
    }>(`/videos/metadata/${assetId}`)
  }
}

// Export singleton instance
export const apiService = new ApiService()
