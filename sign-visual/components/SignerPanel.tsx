"use client"

import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { StateIndicator } from './StateIndicator'
import { ConfidenceCue } from './ConfidenceCue'
import { stateMachine, StateEvent } from '../engine/stateMachine'
import { Maximize2, Minimize2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SignerPanelProps {
  defaultDocked?: boolean
  defaultSize?: 'small' | 'medium' | 'large'
}

export function SignerPanel({ defaultDocked = true, defaultSize = 'medium' }: SignerPanelProps) {
  const [state, setState] = useState<StateEvent>(stateMachine.getState())
  const [isDocked, setIsDocked] = useState(defaultDocked)
  const [size, setSize] = useState(defaultSize)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const unsubscribe = stateMachine.subscribe((newState) => {
      setState(newState)
    })
    return unsubscribe
  }, [])

  if (!isVisible) {
    return (
      <Button
        className="fixed bottom-4 right-4 z-50 shadow-lg"
        size="sm"
        variant="default"
        onClick={() => setIsVisible(true)}
        aria-label="Open Sign Visual panel"
      >
        Sign Visual
      </Button>
    )
  }

  const sizeClasses = {
    small: 'w-64 h-48',
    medium: 'w-80 h-60',
    large: 'w-96 h-72'
  }

  return (
    <Card 
      className={`
        ${sizeClasses[size]} 
        ${isDocked ? 'fixed bottom-4 right-4 z-50' : 'relative'} 
        flex flex-col overflow-hidden shadow-lg border-2 border-primary/20
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-muted/50 border-b">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium">Sign Visual</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setSize(size === 'small' ? 'medium' : size === 'medium' ? 'large' : 'small')}
          >
            {size === 'large' ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-4">
        <StateIndicator state={state.state} actor={state.actor} />
        <ConfidenceCue confidence={state.confidence} />
        {state.message && (
          <p className="text-xs text-center text-muted-foreground max-w-full overflow-hidden">
            {state.message}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="p-2 bg-muted/30 border-t text-center">
        <p className="text-xs text-muted-foreground">
          {state.requiresUser && 'Awaiting input'}
        </p>
      </div>
    </Card>
  )
}
