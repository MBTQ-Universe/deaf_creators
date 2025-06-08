"use client"

import { useEffect, useRef } from "react"

interface MuxPlayerProps {
  playbackId: string
  metadata?: {
    videoTitle?: string
    videoId?: string
    viewerId?: string
  }
  poster?: string
  className?: string
  startTime?: number
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  thumbnailTime?: number
  primaryColor?: string
  secondaryColor?: string
  maxResolution?: "720p" | "1080p" | "2160p"
}

export function MuxPlayer({
  playbackId,
  metadata,
  poster,
  className = "",
  startTime,
  autoPlay = false,
  muted = false,
  loop = false,
  thumbnailTime,
  primaryColor = "#ffffff",
  secondaryColor = "#000000",
  maxResolution = "1080p",
}: MuxPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null)
  const scriptLoaded = useRef(false)

  useEffect(() => {
    // Check if the script is already loaded
    if (!scriptLoaded.current) {
      const script = document.createElement("script")
      script.src = "https://unpkg.com/@mux/mux-player"
      script.async = true
      script.onload = () => {
        scriptLoaded.current = true
        initializePlayer()
      }
      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    } else {
      initializePlayer()
    }
  }, [playbackId])

  const initializePlayer = () => {
    if (!playerRef.current || !scriptLoaded.current) return

    // Clear previous player if any
    while (playerRef.current.firstChild) {
      playerRef.current.removeChild(playerRef.current.firstChild)
    }

    // Create the mux-player element
    const muxPlayerElement = document.createElement("mux-player")
    muxPlayerElement.setAttribute("playback-id", playbackId)

    if (poster) {
      muxPlayerElement.setAttribute("poster", poster)
    }

    if (startTime) {
      muxPlayerElement.setAttribute("start-time", startTime.toString())
    }

    if (autoPlay) {
      muxPlayerElement.setAttribute("autoplay", "")
    }

    if (muted) {
      muxPlayerElement.setAttribute("muted", "")
    }

    if (loop) {
      muxPlayerElement.setAttribute("loop", "")
    }

    if (thumbnailTime) {
      muxPlayerElement.setAttribute("thumbnail-time", thumbnailTime.toString())
    }

    if (primaryColor) {
      muxPlayerElement.setAttribute("primary-color", primaryColor)
    }

    if (secondaryColor) {
      muxPlayerElement.setAttribute("secondary-color", secondaryColor)
    }

    if (maxResolution) {
      muxPlayerElement.setAttribute("max-resolution", maxResolution)
    }

    if (metadata) {
      if (metadata.videoTitle) {
        muxPlayerElement.setAttribute("metadata-video-title", metadata.videoTitle)
      }

      if (metadata.videoId) {
        muxPlayerElement.setAttribute("metadata-video-id", metadata.videoId)
      }

      if (metadata.viewerId) {
        muxPlayerElement.setAttribute("metadata-viewer-id", metadata.viewerId)
      }
    }

    // Add the player to the DOM
    playerRef.current.appendChild(muxPlayerElement)
  }

  return (
    <div ref={playerRef} className={`w-full aspect-video rounded-lg overflow-hidden ${className}`}>
      {/* MUX Player will be inserted here */}
      <div className="flex items-center justify-center h-full bg-gray-900 text-white">Loading video player...</div>
    </div>
  )
}
