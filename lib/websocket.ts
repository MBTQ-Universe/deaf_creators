import { io, Socket } from "socket.io-client"

export interface VideoUploadProgress {
  uploadId: string
  progress: number
  status: "uploading" | "processing" | "complete" | "error"
  message?: string
}

export interface VideoMetadata {
  id: string
  title: string
  description: string
  category: string
  thumbnailUrl: string
  playbackUrl: string
  createdAt: string
}

export interface CreatorTask {
  id: string
  type: "video_processing" | "ai_analysis" | "transcription"
  status: "pending" | "in_progress" | "completed" | "failed"
  videoId: string
  result?: any
  createdAt: string
  updatedAt: string
}

class WebSocketService {
  private socket: Socket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000

  constructor() {
    // Socket will be initialized when connect is called
  }

  connect(serverUrl: string, token?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const options: any = {
          transports: ["websocket", "polling"],
          reconnection: true,
          reconnectionAttempts: this.maxReconnectAttempts,
          reconnectionDelay: this.reconnectDelay,
          autoConnect: false,
        }

        if (token) {
          options.auth = { token }
        }

        this.socket = io(serverUrl, options)

        this.socket.on("connect", () => {
          console.log("WebSocket connected")
          this.reconnectAttempts = 0
          resolve()
        })

        this.socket.on("connect_error", (error) => {
          console.error("WebSocket connection error:", error)
          this.reconnectAttempts++
          if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            reject(new Error("Failed to connect after maximum attempts"))
          }
        })

        this.socket.on("disconnect", (reason) => {
          console.log("WebSocket disconnected:", reason)
        })

        this.socket.connect()
      } catch (error) {
        reject(error)
      }
    })
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  isConnected(): boolean {
    return this.socket?.connected || false
  }

  // Video upload progress events
  onUploadProgress(callback: (data: VideoUploadProgress) => void): void {
    this.socket?.on("video:upload:progress", callback)
  }

  offUploadProgress(callback?: (data: VideoUploadProgress) => void): void {
    if (callback) {
      this.socket?.off("video:upload:progress", callback)
    } else {
      this.socket?.off("video:upload:progress")
    }
  }

  // Video metadata events
  onVideoCreated(callback: (data: VideoMetadata) => void): void {
    this.socket?.on("video:created", callback)
  }

  offVideoCreated(callback?: (data: VideoMetadata) => void): void {
    if (callback) {
      this.socket?.off("video:created", callback)
    } else {
      this.socket?.off("video:created")
    }
  }

  onVideoUpdated(callback: (data: VideoMetadata) => void): void {
    this.socket?.on("video:updated", callback)
  }

  offVideoUpdated(callback?: (data: VideoMetadata) => void): void {
    if (callback) {
      this.socket?.off("video:updated", callback)
    } else {
      this.socket?.off("video:updated")
    }
  }

  onVideoDeleted(callback: (data: { id: string }) => void): void {
    this.socket?.on("video:deleted", callback)
  }

  offVideoDeleted(callback?: (data: { id: string }) => void): void {
    if (callback) {
      this.socket?.off("video:deleted", callback)
    } else {
      this.socket?.off("video:deleted")
    }
  }

  // Creator task events
  onTaskUpdated(callback: (data: CreatorTask) => void): void {
    this.socket?.on("task:updated", callback)
  }

  offTaskUpdated(callback?: (data: CreatorTask) => void): void {
    if (callback) {
      this.socket?.off("task:updated", callback)
    } else {
      this.socket?.off("task:updated")
    }
  }

  // AI processing events
  onAIProcessingStarted(callback: (data: { videoId: string; taskId: string }) => void): void {
    this.socket?.on("ai:processing:started", callback)
  }

  offAIProcessingStarted(callback?: (data: { videoId: string; taskId: string }) => void): void {
    if (callback) {
      this.socket?.off("ai:processing:started", callback)
    } else {
      this.socket?.off("ai:processing:started")
    }
  }

  onAIProcessingComplete(callback: (data: { videoId: string; taskId: string; result: any }) => void): void {
    this.socket?.on("ai:processing:complete", callback)
  }

  offAIProcessingComplete(callback?: (data: { videoId: string; taskId: string; result: any }) => void): void {
    if (callback) {
      this.socket?.off("ai:processing:complete", callback)
    } else {
      this.socket?.off("ai:processing:complete")
    }
  }

  // Emit events to server
  requestAIProcessing(videoId: string, modelType: string): void {
    this.socket?.emit("ai:process:request", { videoId, modelType })
  }

  subscribeToVideo(videoId: string): void {
    this.socket?.emit("video:subscribe", { videoId })
  }

  unsubscribeFromVideo(videoId: string): void {
    this.socket?.emit("video:unsubscribe", { videoId })
  }
}

// Export a singleton instance
export const websocketService = new WebSocketService()
