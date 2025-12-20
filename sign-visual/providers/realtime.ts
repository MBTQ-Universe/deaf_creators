/**
 * Realtime Provider - Live agent state stream
 * Connects to real-time state updates from the agent
 */

import { stateMachine, AgentState } from '../engine/stateMachine'
import { eventBus } from '../engine/eventBus'

export class RealtimeProvider {
  private connected: boolean = false

  connect() {
    if (this.connected) return
    
    this.connected = true
    
    // Subscribe to state machine updates
    stateMachine.subscribe((state) => {
      eventBus.emit('state:update', state)
    })
  }

  disconnect() {
    this.connected = false
  }

  updateState(actor: string, state: AgentState, options: {
    confidence?: number
    requiresUser?: boolean
    message?: string
  } = {}) {
    stateMachine.emit({
      actor,
      state,
      confidence: options.confidence ?? 0.8,
      requiresUser: options.requiresUser ?? false,
      message: options.message
    })
  }

  isConnected() {
    return this.connected
  }
}

export const realtimeProvider = new RealtimeProvider()
