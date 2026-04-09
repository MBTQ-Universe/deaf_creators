/**
 * Event Bus - Emits state changes to all subscribers
 * Provides pub/sub pattern for state updates
 */

import { StateEvent } from './stateMachine'

type EventCallback = (event: StateEvent) => void

export class EventBus {
  private subscribers: Map<string, EventCallback[]> = new Map()

  on(eventType: string, callback: EventCallback) {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, [])
    }
    this.subscribers.get(eventType)!.push(callback)
    
    return () => {
      const callbacks = this.subscribers.get(eventType)
      if (callbacks) {
        const index = callbacks.indexOf(callback)
        if (index > -1) {
          callbacks.splice(index, 1)
        }
      }
    }
  }

  emit(eventType: string, event: StateEvent) {
    const callbacks = this.subscribers.get(eventType)
    if (callbacks) {
      callbacks.forEach(callback => callback(event))
    }
  }

  off(eventType: string) {
    this.subscribers.delete(eventType)
  }
}

export const eventBus = new EventBus()
