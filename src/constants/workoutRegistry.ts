import {
  WARMUP_EXERCISES,
  ABS_FINISHER_EXERCISES,
  CIRCUIT_BY_WEEK,
  GYM_DAY_DETAILS,
} from './exerciseDetails'
import { toSlug } from '../utils/workoutSlug'
import type { GymType } from '../types'

export interface WorkoutEntry {
  name: string
  slug: string
}

const slugCache = new Map<string, WorkoutEntry>()

function addExercise(name: string): WorkoutEntry {
  const slug = toSlug(name)
  if (!slugCache.has(slug)) {
    slugCache.set(slug, { name, slug })
  }
  return slugCache.get(slug)!
}

function collectAllWorkouts(): WorkoutEntry[] {
  slugCache.clear()

  // Pre-Iftar
  WARMUP_EXERCISES.forEach((ex) => addExercise(ex.name))
  ABS_FINISHER_EXERCISES.forEach((ex) => addExercise(ex.name))
  Object.values(CIRCUIT_BY_WEEK).forEach((week) => {
    week.exercises.forEach((ex) => addExercise(ex.name))
  })

  // Gym
  ;(['A', 'B', 'C'] as GymType[]).forEach((gym) => {
    const details = GYM_DAY_DETAILS[gym]
    details.warmup.forEach((ex) => addExercise(ex.name))
    details.workout.forEach((ex) => addExercise(ex.name))
    details.abs.forEach((ex) => addExercise(ex.name))
  })

  // Walk
  addExercise('Walk 45 min')

  return Array.from(slugCache.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  )
}

export const ALL_WORKOUTS = collectAllWorkouts()

export function getWorkoutBySlug(slug: string): WorkoutEntry | undefined {
  return ALL_WORKOUTS.find((w) => w.slug === slug)
}
