/**
 * State Machine - Single source of truth for agent state
 * Manages all system states and emits changes to the event bus
 */

export type AgentState = 
  | "idle"
  | "listening"
  | "processing"
  | "validating"
  | "executing"
  | "completed"
  | "error"

export interface StateEvent {
  actor: string
  state: AgentState
  confidence: number
  requiresUser: boolean
  message?: string
  timestamp: number
}

export class StateMachine {
  private currentState: StateEvent
  private listeners: ((event: StateEvent) => void)[] = []

  constructor() {
    this.currentState = {
      actor: "system",
      state: "idle",
      confidence: 1.0,
      requiresUser: false,
      timestamp: Date.now()
    }
  }

  emit(partialEvent: Partial<StateEvent> & Pick<StateEvent, 'actor' | 'state'>) {
    this.currentState = {
      ...this.currentState,
      ...partialEvent,
      timestamp: Date.now()
    }
    
    this.notifyListeners()
  }

  subscribe(listener: (event: StateEvent) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  getState(): StateEvent {
    return { ...this.currentState }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentState))
  }
}

export const stateMachine = new StateMachine()
