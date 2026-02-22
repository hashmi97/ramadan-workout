import { addDays, format, parseISO } from 'date-fns'
import {
  PLAN_START_DATE,
  PLAN_DAYS_COUNT,
  DAY_OF_WEEK_TO_PLAN,
  WALK_TASKS,
} from '../constants/planTemplates'
import type { PlanDay, PlanType } from '../types'

function getTasksForPlan(planType: PlanType): { key: string; label: string }[] {
  switch (planType) {
    case 'pre_iftar_gym':
    case 'pre_iftar':
      return []
    case 'walk':
      return [...WALK_TASKS]
  }
}

export function generatePlanDays(): PlanDay[] {
  const start = parseISO(PLAN_START_DATE)
  const planDays: PlanDay[] = []

  for (let i = 0; i < PLAN_DAYS_COUNT; i++) {
    const date = addDays(start, i)
    const dateStr = format(date, 'yyyy-MM-dd')
    const dayOfWeek = date.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6
    const { planType, gymType } = DAY_OF_WEEK_TO_PLAN[dayOfWeek]

    const taskTemplates = getTasksForPlan(planType)
    const day_tasks = taskTemplates.map(({ key, label }) => ({
      id: `${dateStr}_${key}`,
      plan_day_id: dateStr,
      task_key: key,
      task_label: label,
      completed: false,
      meta: null as Record<string, unknown> | null,
    }))

    planDays.push({
      id: dateStr,
      date: dateStr,
      plan_type: planType,
      gym_type: gymType,
      created_at: dateStr,
      day_tasks,
    })
  }

  return planDays
}
