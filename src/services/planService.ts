import { addDays, parseISO, format } from 'date-fns'
import { supabase } from '../lib/supabase'
import {
  PLAN_START_DATE,
  PLAN_DAYS_COUNT,
  DAY_OF_WEEK_TO_PLAN,
  PRE_IFTAR_TASKS,
  GYM_TASKS,
  WALK_TASKS,
  REST_TASKS,
} from '../constants/planTemplates'
import type { PlanType } from '../types'

export async function seedUserPlan(userId: string): Promise<void> {
  const start = parseISO(PLAN_START_DATE)

  for (let i = 0; i < PLAN_DAYS_COUNT; i++) {
    const date = addDays(start, i)
    const dateStr = format(date, 'yyyy-MM-dd')
    const dayOfWeek = date.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6
    const { planType, gymType } = DAY_OF_WEEK_TO_PLAN[dayOfWeek]

    const { data: existing } = await supabase
      .from('plan_days')
      .select('id')
      .eq('user_id', userId)
      .eq('date', dateStr)
      .single()

    if (existing) continue

    const { data: planDay, error: planError } = await supabase
      .from('plan_days')
      .insert({
        user_id: userId,
        date: dateStr,
        plan_type: planType,
        gym_type: gymType,
      })
      .select('id')
      .single()

    if (planError) throw planError
    if (!planDay) continue

    const tasks = getTasksForPlan(planType)
    const taskRows = tasks.map(({ key, label }) => ({
      plan_day_id: planDay.id,
      task_key: key,
      task_label: label,
    }))

    const { error: tasksError } = await supabase.from('day_tasks').insert(taskRows)
    if (tasksError) throw tasksError
  }
}

function getTasksForPlan(planType: PlanType): { key: string; label: string }[] {
  switch (planType) {
    case 'pre_iftar_gym':
      return [...PRE_IFTAR_TASKS, ...GYM_TASKS]
    case 'pre_iftar':
      return [...PRE_IFTAR_TASKS]
    case 'walk':
      return [...WALK_TASKS]
    case 'rest':
      return [...REST_TASKS]
  }
}

export async function fetchPlanDaysWithTasks(
  userId: string,
  startDate: string,
  endDate: string
) {
  const { data: planDays, error } = await supabase
    .from('plan_days')
    .select(`
      *,
      day_tasks (*)
    `)
    .eq('user_id', userId)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date')

  if (error) throw error
  return planDays ?? []
}
