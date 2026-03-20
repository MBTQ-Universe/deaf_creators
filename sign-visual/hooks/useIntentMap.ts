"use client"

import { useState } from 'react'
import intentMapData from '../semantics/intent.map.json'
import systemMapData from '../semantics/system.map.json'

interface IntentMapping {
  semantic: string
  signs: string[]
  confidence_threshold?: number
  state?: string
  requires_user?: boolean
  priority?: string
}

export function useIntentMap() {
  const [intentMap] = useState(intentMapData.mappings)
  const [systemMap] = useState(systemMapData.mappings)

  const getIntentSemantic = (intent: string): IntentMapping | null => {
    return intentMap[intent as keyof typeof intentMap] || null
  }

  const getSystemSemantic = (action: string): IntentMapping | null => {
    return systemMap[action as keyof typeof systemMap] || null
  }

  const getAllIntents = () => {
    return Object.keys(intentMap)
  }

  const getAllSystemActions = () => {
    return Object.keys(systemMap)
  }

  return {
    getIntentSemantic,
    getSystemSemantic,
    getAllIntents,
    getAllSystemActions,
    intentMap,
    systemMap
  }
}
