import { differenceInDays, parseISO } from 'date-fns'
import { PLAN_START_DATE } from './planTemplates'
import type { GymType } from '../types'

export interface ExerciseItem {
  name: string
  reps: string
}

export const WARMUP_EXERCISES: ExerciseItem[] = [
  { name: 'Side steps (slow)', reps: '60 sec' },
  { name: 'Bodyweight squats', reps: '15' },
  { name: 'Pushups', reps: '10' },
  { name: 'Arm circles + stretch', reps: '90 sec' },
]

export const ABS_FINISHER_EXERCISES: ExerciseItem[] = [
  { name: 'Crunches', reps: '20' },
  { name: 'Leg raises', reps: '12' },
  { name: 'Russian twists', reps: '20' },
  { name: 'Plank', reps: '30–45 sec' },
]

export interface CircuitWeek {
  rounds: number
  absRounds: string
  extra?: string
  exercises: ExerciseItem[]
}

export const CIRCUIT_BY_WEEK: Record<number, CircuitWeek> = {
  1: {
    rounds: 5,
    absRounds: '3',
    exercises: [
      { name: 'Side steps', reps: '60 sec' },
      { name: 'Squats', reps: '15' },
      { name: 'Pushups', reps: '12' },
      { name: 'Reverse lunges', reps: '12/leg' },
      { name: 'Mountain climbers', reps: '30 sec' },
      { name: 'Plank', reps: '30 sec' },
    ],
  },
  2: {
    rounds: 6,
    absRounds: '3-4',
    extra: '20 min walk after Iftar',
    exercises: [
      { name: 'Side steps', reps: '60 sec' },
      { name: 'Squats', reps: '18' },
      { name: 'Pushups', reps: '15' },
      { name: 'Reverse lunges', reps: '14/leg' },
      { name: 'Mountain climbers', reps: '35 sec' },
      { name: 'Plank', reps: '40 sec' },
    ],
  },
  3: {
    rounds: 6,
    absRounds: '4',
    extra: '10 squat pulses each round',
    exercises: [
      { name: 'Side steps', reps: '75 sec' },
      { name: 'Squats', reps: '18' },
      { name: 'Pushups', reps: '15' },
      { name: 'Reverse lunges', reps: '14/leg' },
      { name: 'Mountain climbers', reps: '40 sec' },
      { name: 'Plank', reps: '45 sec' },
    ],
  },
  4: {
    rounds: 5,
    absRounds: 'Daily',
    extra: '30–40 min walk nightly',
    exercises: [
      { name: 'Side steps', reps: '60 sec' },
      { name: 'Squats', reps: '15' },
      { name: 'Pushups', reps: '12' },
      { name: 'Reverse lunges', reps: '12/leg' },
      { name: 'Mountain climbers', reps: '30 sec' },
      { name: 'Plank', reps: '45 sec' },
    ],
  },
}

export interface GymExercise {
  name: string
  sets: number
  reps: string
}

export interface GymDayDetails {
  warmup: ExerciseItem[]
  workout: GymExercise[]
  abs: GymExercise[]
}

export const GYM_DAY_DETAILS: Record<GymType, GymDayDetails> = {
  A: {
    warmup: [
      { name: 'Treadmill walk', reps: '5 min' },
      { name: 'Arm circles', reps: '1 min' },
      { name: 'Pushups', reps: '12' },
      { name: 'Shoulder stretch', reps: '30 sec' },
    ],
    workout: [
      { name: 'Bench press', sets: 3, reps: '8-12' },
      { name: 'Incline DB press', sets: 3, reps: '10-12' },
      { name: 'Lateral raises', sets: 3, reps: '15' },
      { name: 'Shoulder press', sets: 3, reps: '10' },
      { name: 'Tricep pushdown', sets: 3, reps: '12-15' },
    ],
    abs: [
      { name: 'Hanging knee raises', sets: 3, reps: '12' },
      { name: 'Plank', sets: 3, reps: '40s' },
    ],
  },
  B: {
    warmup: [
      { name: 'Row machine', reps: '5 min' },
      { name: 'Band pull aparts', reps: '1 min' },
      { name: 'Light lat pulldown', reps: '12' },
      { name: 'Arm stretch', reps: '30 sec' },
    ],
    workout: [
      { name: 'Lat pulldown', sets: 3, reps: '10-12' },
      { name: 'Seated row', sets: 3, reps: '12' },
      { name: 'Face pull', sets: 3, reps: '15' },
      { name: 'Dumbbell curl', sets: 3, reps: '12' },
      { name: 'Hammer curl', sets: 2, reps: '12' },
    ],
    abs: [
      { name: 'Leg raises', sets: 3, reps: '12' },
      { name: 'Plank', sets: 3, reps: '40s' },
    ],
  },
  C: {
    warmup: [
      { name: 'Walk or bike', reps: '5 min' },
      { name: 'Bodyweight squats', reps: '15' },
      { name: 'Hip circles', reps: '1 min' },
      { name: 'Light lunges', reps: '10 each' },
    ],
    workout: [
      { name: 'Leg press', sets: 3, reps: '12' },
      { name: 'RDL', sets: 3, reps: '10' },
      { name: 'Lunges', sets: 2, reps: '12 each' },
      { name: 'Shoulder press', sets: 3, reps: '10' },
      { name: 'Lateral raises', sets: 3, reps: '15' },
    ],
    abs: [
      { name: 'Cable crunch', sets: 3, reps: '15' },
      { name: 'Plank', sets: 3, reps: '45s' },
    ],
  },
}

export function getWeekNumber(dateStr: string): number {
  const date = parseISO(dateStr)
  const start = parseISO(PLAN_START_DATE)
  const dayIndex = differenceInDays(date, start)
  return Math.floor(dayIndex / 7) + 1
}
