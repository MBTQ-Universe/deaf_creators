"use client"

import React from 'react'
import { AgentState } from '../engine/stateMachine'
import { Activity, AlertCircle, CheckCircle, Ear, PlayCircle, Clock, AlertTriangle } from 'lucide-react'

interface StateIndicatorProps {
  state: AgentState
  actor: string
}

export function StateIndicator({ state, actor }: StateIndicatorProps) {
  const stateConfig = {
    idle: {
      icon: Clock,
      color: 'text-gray-500',
      bgColor: 'bg-gray-100',
      label: 'Ready',
      animation: ''
    },
    listening: {
      icon: Ear,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
      label: 'Listening',
      animation: 'animate-pulse'
    },
    processing: {
      icon: Activity,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
      label: 'Processing',
      animation: 'animate-spin'
    },
    validating: {
      icon: AlertCircle,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100',
      label: 'Validating',
      animation: 'animate-pulse'
    },
    executing: {
      icon: PlayCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-100',
      label: 'Executing',
      animation: 'animate-bounce'
    },
    completed: {
      icon: CheckCircle,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-100',
      label: 'Completed',
      animation: ''
    },
    error: {
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-100',
      label: 'Error',
      animation: 'animate-pulse'
    }
  }

  const config = stateConfig[state]
  const Icon = config.icon

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`${config.bgColor} rounded-full p-4`}>
        <Icon className={`h-8 w-8 ${config.color} ${config.animation}`} />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold">{config.label}</p>
        <p className="text-xs text-muted-foreground">{actor}</p>
      </div>
    </div>
  )
}
