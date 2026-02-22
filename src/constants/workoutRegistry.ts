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

export const WORKOUT_DESCRIPTIONS: Record<string, string> = {
  'arm-circles': 'Stand tall with arms extended sideways and make small circles forward and backward to warm up the shoulders.',
  'arm-stretch': 'Pull one arm across the chest and hold to stretch the shoulder and triceps.',
  'band-pull-aparts': 'Hold a resistance band and pull it apart until arms are extended wide, squeezing shoulder blades.',
  'bench-press': 'Lie on a bench and press the bar or dumbbells upward from chest level with controlled movement.',
  'cable-crunch': 'Kneel facing a cable machine and crunch your torso downward to engage the abs.',
  'crunches': 'Lie on your back and lift your shoulders slightly off the floor to target upper abs.',
  'dumbbell-curl': 'Hold dumbbells at your sides and curl them upward while keeping elbows close to the body.',
  'face-pull': 'Pull a rope attachment toward your face while keeping elbows high to target rear shoulders.',
  'hammer-curl': 'Curl dumbbells upward with palms facing inward to target biceps and forearms.',
  'hanging-knee-raises': 'Hang from a bar and lift knees toward chest while keeping movement controlled.',
  'hip-circles': 'Rotate hips in slow circles to warm up the hip joints and improve mobility.',
  'incline-db-press': 'Lie on an incline bench and press dumbbells upward to target the upper chest.',
  'lat-pulldown': 'Pull a bar down toward your chest while keeping your torso upright to work the back.',
  'lateral-raises': 'Raise dumbbells to the sides with slight elbow bend to target shoulder width.',
  'leg-press': 'Sit in a leg press machine and push the platform away using your legs.',
  'leg-raises': 'Lie on your back and raise legs upward to target the lower abs.',
  'light-lat-pulldown': 'Perform lat pulldown with lighter weight for warm-up and activation.',
  'lunges': 'Step forward and lower your body until both knees bend, then push back up.',
  'mountain-climbers': 'In a plank position, alternate bringing knees toward chest in a running motion.',
  'plank': 'Hold a straight body position on forearms and toes while engaging core muscles.',
  'pushups': 'Lower chest toward floor and push back up while keeping body straight.',
  'rdl': 'Hinge at the hips with weights while keeping back flat to target hamstrings and glutes.',
  'reverse-lunges': 'Step backward into a lunge position and return to standing.',
  'row-machine': 'Pull handle toward torso while pushing with legs on a rowing machine.',
  'russian-twists': 'Sit slightly reclined and rotate torso side to side to engage obliques.',
  'seated-row': 'Pull a cable handle toward your torso while keeping chest upright.',
  'shoulder-press': 'Press weights overhead while seated or standing to target shoulders.',
  'side-steps': 'Step side-to-side repeatedly to elevate heart rate and warm up legs.',
  'squats': 'Lower hips down while keeping chest up, then stand back up to work legs.',
  'treadmill-walk': 'Walk at a steady pace on a treadmill for light cardio.',
  'tricep-pushdown': 'Push cable downward until arms are fully extended to target triceps.',
  'walk-45-min': 'Maintain a steady walking pace for 45 minutes for fat-burning cardio.',
  'walk-or-bike': 'Perform low-intensity cardio by walking or using a stationary bike.',
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
