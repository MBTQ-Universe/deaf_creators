export interface MuxUpload {
  id: string
  status: "waiting" | "asset_created" | "errored" | "cancelled" | "timed_out"
  asset_id?: string
  error?: {
    type: string
    message: string
  }
  cors_origin: string
  new_asset_settings: {
    playback_policy: string[]
    mp4_support: string
  }
  created_at: string
  timeout: number
}

export interface MuxAsset {
  id: string
  playback_ids: Array<{
    id: string
    policy: string
  }>
  status: "preparing" | "ready" | "errored"
  duration: number
  aspect_ratio: string
  max_stored_resolution: string
  max_stored_frame_rate: number
  created_at: string
  tracks: Array<{
    id: string
    type: "video" | "audio" | "text"
    duration: number
    max_width?: number
    max_height?: number
    max_frame_rate?: number
  }>
}

export interface MuxVideo {
  id: string
  title: string
  description?: string
  assetId: string
  playbackId: string
  thumbnailUrl?: string
  duration: number
  status: "processing" | "ready" | "error"
  createdAt: string
  updatedAt: string
  userId: string
  views: number
  likes: number
}
