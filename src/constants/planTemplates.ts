import type { PlanType, GymType } from '../types'

export const PLAN_START_DATE = '2026-02-22'
export const PLAN_END_DATE = '2026-03-18'
export const PLAN_DAYS_COUNT = 25

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6 // Sun=0, Mon=1, etc.

// Week starts Sunday. Gym days: Sunday, Tuesday, Thursday
export const DAY_OF_WEEK_TO_PLAN: Record<DayOfWeek, { planType: PlanType; gymType: GymType | null }> = {
  0: { planType: 'pre_iftar_gym', gymType: 'A' }, // Sunday - Chest, Shoulders, Triceps, Abs
  1: { planType: 'pre_iftar', gymType: null },   // Monday
  2: { planType: 'pre_iftar_gym', gymType: 'B' }, // Tuesday - Back, Biceps, Abs
  3: { planType: 'pre_iftar', gymType: null },   // Wednesday
  4: { planType: 'pre_iftar_gym', gymType: 'C' }, // Thursday - Legs, Shoulders, Abs
  5: { planType: 'pre_iftar', gymType: null },   // Friday
  6: { planType: 'walk', gymType: null },        // Saturday - Walk 45 min
}

export const PRE_IFTAR_TASKS: { key: string; label: string }[] = [
  { key: 'warmup', label: 'Warm-up' },
  { key: 'round_1', label: 'Round 1' },
  { key: 'round_2', label: 'Round 2' },
  { key: 'round_3', label: 'Round 3' },
  { key: 'round_4', label: 'Round 4' },
  { key: 'round_5', label: 'Round 5' },
  { key: 'round_6', label: 'Round 6' },
  { key: 'core_finisher', label: 'Core Finisher' },
]

export const GYM_TASKS: { key: string; label: string }[] = [
  { key: 'main_lifts', label: 'Main lifts completed' },
  { key: 'accessories', label: 'Accessories completed' },
  { key: 'abs', label: 'Abs completed' },
]

export const GYM_LABELS: Record<GymType, string> = {
  A: 'Chest, Shoulders, Triceps, Abs',  // Sunday
  B: 'Back, Biceps, Abs',               // Tuesday
  C: 'Legs, Shoulders, Abs',            // Thursday
}

export const WALK_TASKS: { key: string; label: string }[] = [
  { key: 'walk_45', label: 'Walk 45 min' },
]

export const PLAN_TYPE_LABELS: Record<PlanType, string> = {
  pre_iftar_gym: 'Fat-Burn + Gym',
  pre_iftar: 'Fat-Burn Circuit',
  walk: 'Walk Only',
}
