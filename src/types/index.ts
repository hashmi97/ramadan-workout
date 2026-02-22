export interface PlanDay {
  id: string
  date: string
  plan_type: PlanType
  gym_type: GymType | null
  created_at: string
  day_tasks?: DayTask[]
}

export interface DayTask {
  id: string
  plan_day_id: string
  task_key: string
  task_label: string
  completed: boolean
  meta: Record<string, unknown> | null
}

export type PlanType = 'pre_iftar_gym' | 'pre_iftar' | 'walk'
export type GymType = 'A' | 'B' | 'C'
