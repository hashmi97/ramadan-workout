import { useState, useCallback, useEffect } from 'react'
import { generatePlanDays } from '../data/planData'
import {
  getTaskCompleted,
  setTaskCompleted,
  getGymType,
  setGymType,
} from '../store/completionStore'
import type { PlanDay } from '../types'

export function usePlanDays() {
  const [planDays, setPlanDays] = useState<PlanDay[]>([])

  useEffect(() => {
    const base = generatePlanDays()
    const hydrated = base.map((pd) => {
      const storedGym = getGymType(pd.id)
      const day_tasks = (pd.day_tasks ?? []).map((t) => ({
        ...t,
        completed: getTaskCompleted(t.id) ?? t.completed,
      }))
      return {
        ...pd,
        gym_type: storedGym ?? pd.gym_type,
        day_tasks,
      }
    })
    setPlanDays(hydrated)
  }, [])

  const updateTaskOptimistic = useCallback((taskId: string, completed: boolean) => {
    setTaskCompleted(taskId, completed)
    setPlanDays((prev) =>
      prev.map((pd) => ({
        ...pd,
        day_tasks: (pd.day_tasks ?? []).map((t) =>
          t.id === taskId ? { ...t, completed } : t
        ),
      }))
    )
  }, [])

  const updateGymTypeOptimistic = useCallback((planDayId: string, gymType: 'A' | 'B' | 'C') => {
    setGymType(planDayId, gymType)
    setPlanDays((prev) =>
      prev.map((pd) =>
        pd.id === planDayId ? { ...pd, gym_type: gymType } : pd
      )
    )
  }, [])

  return {
    planDays,
    loading: planDays.length === 0,
    error: null,
    updateTaskOptimistic,
    updateGymTypeOptimistic,
  }
}
