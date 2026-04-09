"use client"

import { useState, useEffect } from 'react'
import { StateEvent, stateMachine, AgentState } from '../engine/stateMachine'

export function useSignState() {
  const [state, setState] = useState<StateEvent>(stateMachine.getState())

  useEffect(() => {
    const unsubscribe = stateMachine.subscribe((newState) => {
      setState(newState)
    })
    return unsubscribe
  }, [])

  const updateState = (actor: string, newState: AgentState, options: {
    confidence?: number
    requiresUser?: boolean
    message?: string
  } = {}) => {
    stateMachine.emit({
      actor,
      state: newState,
      confidence: options.confidence ?? 0.8,
      requiresUser: options.requiresUser ?? false,
      message: options.message
    })
  }

  return {
    state,
    updateState,
    currentState: state.state,
    actor: state.actor,
    confidence: state.confidence,
    requiresUser: state.requiresUser
  }
}
