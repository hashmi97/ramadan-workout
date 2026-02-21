import { useEffect, useState } from 'react'
import { addDays, format, parseISO } from 'date-fns'
import { fetchPlanDaysWithTasks } from '../services/planService'
import { PLAN_START_DATE, PLAN_DAYS_COUNT } from '../constants/planTemplates'
import type { PlanDay } from '../types'

export function usePlanDays(userId: string | null, refetchTrigger?: boolean) {
  const [planDays, setPlanDays] = useState<PlanDay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const start = parseISO(PLAN_START_DATE)
  const endDate = addDays(start, PLAN_DAYS_COUNT - 1)
  const startStr = PLAN_START_DATE
  const endStr = format(endDate, 'yyyy-MM-dd')

  useEffect(() => {
    if (!userId) {
      setPlanDays([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    fetchPlanDaysWithTasks(userId, startStr, endStr)
      .then((data) => setPlanDays(data as PlanDay[]))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [userId, startStr, endStr, refetchTrigger])

  function updateTaskOptimistic(taskId: string, completed: boolean) {
    setPlanDays((prev) =>
      prev.map((pd) => ({
        ...pd,
        day_tasks: (pd.day_tasks ?? []).map((t) =>
          t.id === taskId ? { ...t, completed } : t
        ),
      }))
    )
  }

  function updateGymTypeOptimistic(planDayId: string, gymType: 'A' | 'B' | 'C') {
    setPlanDays((prev) =>
      prev.map((pd) =>
        pd.id === planDayId ? { ...pd, gym_type: gymType } : pd
      )
    )
  }

  return {
    planDays,
    loading,
    error,
    updateTaskOptimistic,
    updateGymTypeOptimistic,
  }
}
