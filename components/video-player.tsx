"use client"

import { useEffect, useRef } from "react"
import videojs from "video.js"
import "video.js/dist/video-js.css"
import type Player from "video.js/dist/types/player"

interface VideoPlayerProps {
  src: string
  poster?: string
  autoplay?: boolean
  controls?: boolean
  className?: string
  onReady?: (player: Player) => void
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
  onError?: (error: any) => void
}

export function VideoPlayer({
  src,
  poster,
  autoplay = false,
  controls = true,
  className = "",
  onReady,
  onPlay,
  onPause,
  onEnded,
  onError,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<Player | null>(null)

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement("video-js")
      videoElement.classList.add("vjs-big-play-centered")
      videoRef.current.appendChild(videoElement)

      const player = (playerRef.current = videojs(
        videoElement,
        {
          autoplay,
          controls,
          responsive: true,
          fluid: true,
          preload: "auto",
          poster,
          sources: [
            {
              src,
              type: "application/x-mpegURL", // HLS
            },
          ],
          html5: {
            vhs: {
              overrideNative: true,
            },
            nativeVideoTracks: false,
            nativeAudioTracks: false,
            nativeTextTracks: false,
          },
        },
        () => {
          // Player is ready
          if (onReady) {
            onReady(player)
          }
        }
      ))

      // Event listeners
      if (onPlay) {
        player.on("play", onPlay)
      }
      if (onPause) {
        player.on("pause", onPause)
      }
      if (onEnded) {
        player.on("ended", onEnded)
      }
      if (onError) {
        player.on("error", onError)
      }
    } else if (playerRef.current) {
      // Update source if it changes
      const player = playerRef.current
      player.src({ src, type: "application/x-mpegURL" })
      if (poster) {
        player.poster(poster)
      }
    }
  }, [src, poster, autoplay, controls, onReady, onPlay, onPause, onEnded, onError])

  // Dispose the Video.js player when the component unmounts
  useEffect(() => {
    const player = playerRef.current

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [])

  return (
    <div data-vjs-player>
      <div ref={videoRef} className={className} />
    </div>
  )
}
