import type { PlanType, GymType } from '../types'

export const PLAN_START_DATE = '2026-02-22'
export const PLAN_DAYS_COUNT = 28

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6 // Sun=0, Mon=1, etc.

export const DAY_OF_WEEK_TO_PLAN: Record<DayOfWeek, { planType: PlanType; gymType: GymType | null }> = {
  0: { planType: 'rest', gymType: null },        // Sunday
  1: { planType: 'pre_iftar_gym', gymType: 'A' }, // Monday
  2: { planType: 'pre_iftar', gymType: null },   // Tuesday
  3: { planType: 'pre_iftar_gym', gymType: 'B' }, // Wednesday
  4: { planType: 'pre_iftar', gymType: null },   // Thursday
  5: { planType: 'pre_iftar_gym', gymType: 'C' }, // Friday
  6: { planType: 'walk', gymType: null },        // Saturday
}

export const PRE_IFTAR_TASKS: { key: string; label: string }[] = [
  { key: 'warmup', label: 'Warm-up 5 min' },
  { key: 'round_1', label: 'Round 1' },
  { key: 'round_2', label: 'Round 2' },
  { key: 'round_3', label: 'Round 3' },
  { key: 'round_4', label: 'Round 4' },
  { key: 'round_5', label: 'Round 5' },
  { key: 'core_finisher', label: 'Core Finisher' },
]

export const GYM_TASKS: { key: string; label: string }[] = [
  { key: 'main_lifts', label: 'Main lifts completed' },
  { key: 'accessories', label: 'Accessories completed' },
  { key: 'abs', label: 'Abs completed' },
]

export const GYM_LABELS: Record<GymType, string> = {
  A: 'Push + shoulders + triceps',
  B: 'Pull + biceps + back',
  C: 'Legs + shoulders',
}

export const WALK_TASKS: { key: string; label: string }[] = [
  { key: 'walk_45', label: 'Walk 45 min' },
]

export const REST_TASKS: { key: string; label: string }[] = [
  { key: 'rest', label: 'Rest' },
  { key: 'optional_walk', label: 'Optional Light Walk 20–30 min' },
]

export const PLAN_TYPE_LABELS: Record<PlanType, string> = {
  pre_iftar_gym: 'Pre-Iftar + Gym',
  pre_iftar: 'Pre-Iftar Fat Burn',
  walk: 'Walk Only',
  rest: 'Rest / Light Walk',
}
