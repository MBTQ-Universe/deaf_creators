/**
 * Playback Provider - Async / replay functionality
 * Allows replaying previous state sequences
 */

import { StateEvent } from '../engine/stateMachine'
import { eventBus } from '../engine/eventBus'

export class PlaybackProvider {
  private history: StateEvent[] = []
  private isPlaying: boolean = false
  private currentIndex: number = 0

  recordState(state: StateEvent) {
    this.history.push(state)
  }

  async replay(speed: number = 1.0) {
    if (this.isPlaying || this.history.length === 0) return

    this.isPlaying = true
    this.currentIndex = 0

    for (const state of this.history) {
      if (!this.isPlaying) break
      
      eventBus.emit('playback:state', state)
      
      // Calculate delay based on speed
      const baseDelay = 500 // ms
      await new Promise(resolve => setTimeout(resolve, baseDelay / speed))
      
      this.currentIndex++
    }

    this.isPlaying = false
  }

  stop() {
    this.isPlaying = false
  }

  clear() {
    this.history = []
    this.currentIndex = 0
  }

  getHistory() {
    return [...this.history]
  }

  isReplaying() {
    return this.isPlaying
  }
}

export const playbackProvider = new PlaybackProvider()
