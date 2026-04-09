"use client"

import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface ConfidenceCueProps {
  confidence: number
}

export function ConfidenceCue({ confidence }: ConfidenceCueProps) {
  const getConfidenceLevel = () => {
    if (confidence >= 0.9) return { label: 'High', color: 'text-green-500', icon: TrendingUp }
    if (confidence >= 0.7) return { label: 'Medium', color: 'text-yellow-500', icon: Minus }
    return { label: 'Low', color: 'text-red-500', icon: TrendingDown }
  }

  const level = getConfidenceLevel()
  const Icon = level.icon

  return (
    <div className="flex items-center gap-2">
      <Icon className={`h-4 w-4 ${level.color}`} />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium">Confidence</span>
          <span className={`text-xs ${level.color}`}>{level.label}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${
              confidence >= 0.9 ? 'bg-green-500' :
              confidence >= 0.7 ? 'bg-yellow-500' :
              'bg-red-500'
            }`}
            style={{ width: `${confidence * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
