"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type DashboardContextType = {
  earnings: number
  completedTasks: number
  totalTasks: number
  updateEarnings: (amount: number) => void
  completeTask: () => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [earnings, setEarnings] = useState(0)
  const [completedTasks, setCompletedTasks] = useState(0)
  const [totalTasks, setTotalTasks] = useState(0)

  // Load data from localStorage on client side
  useEffect(() => {
    const storedEarnings = localStorage.getItem("earnings")
    const storedCompletedTasks = localStorage.getItem("completedTasks")
    const storedTotalTasks = localStorage.getItem("totalTasks")

    if (storedEarnings) setEarnings(Number.parseFloat(storedEarnings))
    if (storedCompletedTasks) setCompletedTasks(Number.parseInt(storedCompletedTasks))
    if (storedTotalTasks) setTotalTasks(Number.parseInt(storedTotalTasks))
    else setTotalTasks(12) // Default number of tasks
  }, [])

  // Save data to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("earnings", earnings.toString())
      localStorage.setItem("completedTasks", completedTasks.toString())
      localStorage.setItem("totalTasks", totalTasks.toString())
    }
  }, [earnings, completedTasks, totalTasks])

  const updateEarnings = (amount: number) => {
    setEarnings((prev) => prev + amount)
  }

  const completeTask = () => {
    setCompletedTasks((prev) => prev + 1)
  }

  return (
    <DashboardContext.Provider
      value={{
        earnings,
        completedTasks,
        totalTasks,
        updateEarnings,
        completeTask,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}
