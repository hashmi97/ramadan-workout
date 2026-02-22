import {
  WARMUP_EXERCISES,
  ABS_FINISHER_EXERCISES,
  CIRCUIT_BY_WEEK,
  GYM_DAY_DETAILS,
  getWeekNumber,
} from '../constants/exerciseDetails'
import type { GymType } from '../types'
import { WorkoutLink } from './WorkoutLink'

interface ExerciseListProps {
  exercises: { name: string; reps: string }[]
  className?: string
}

function ExerciseList({ exercises, className = '' }: ExerciseListProps) {
  return (
    <ul className={`text-sm text-stone-600 space-y-0.5 ${className}`}>
      {exercises.map((ex, i) => (
        <li key={i} className="flex justify-between gap-4">
          <WorkoutLink name={ex.name} />
          <span className="text-stone-500 shrink-0">{ex.reps}</span>
        </li>
      ))}
    </ul>
  )
}

interface PreIftarDetailsProps {
  dateStr: string
}

export function PreIftarExerciseDetails({ dateStr }: PreIftarDetailsProps) {
  const week = getWeekNumber(dateStr)
  const circuit = CIRCUIT_BY_WEEK[Math.min(week, 4)] ?? CIRCUIT_BY_WEEK[1]

  return (
    <div className="rounded-lg bg-stone-50 border border-stone-200 p-3 mt-2 space-y-3 text-sm">
      <div>
        <p className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">Warm-up</p>
        <ExerciseList exercises={WARMUP_EXERCISES} />
      </div>
      <div>
        <p className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">
          Main circuit — {circuit.rounds} rounds (Week {week})
          {circuit.extra && circuit.extra !== '10 squat pulses each round' && (
            <span className="text-stone-500 font-normal"> • {circuit.extra}</span>
          )}
        </p>
        <ExerciseList exercises={circuit.exercises} />
        {week === 3 && (
          <p className="text-xs text-amber-700 mt-1">+ 10 squat pulses each round</p>
        )}
      </div>
      <div>
        <p className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">Abs Finisher</p>
        <ExerciseList exercises={ABS_FINISHER_EXERCISES} />
      </div>
    </div>
  )
}

interface GymDetailsProps {
  gymType: GymType
}

export function GymExerciseDetails({ gymType }: GymDetailsProps) {
  const details = GYM_DAY_DETAILS[gymType]

  if (!details) return null

  return (
    <div className="rounded-lg bg-stone-50 border border-stone-200 p-3 mt-2 space-y-3">
      <div>
        <p className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">Warm-up</p>
        <ExerciseList exercises={details.warmup} />
      </div>
      <div>
        <p className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Workout</p>
        <ul className="text-sm text-stone-600 space-y-0.5">
          {details.workout.map((ex, i) => (
            <li key={i} className="flex justify-between gap-4">
              <WorkoutLink name={ex.name} />
              <span className="text-stone-500 shrink-0">{ex.sets}×{ex.reps}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Abs</p>
        <ul className="text-sm text-stone-600 space-y-0.5">
          {details.abs.map((ex, i) => (
            <li key={i} className="flex justify-between gap-4">
              <WorkoutLink name={ex.name} />
              <span className="text-stone-500 shrink-0">{ex.sets}×{ex.reps}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function WalkExerciseDetails() {
  return (
    <div className="rounded-lg bg-stone-50 border border-stone-200 p-3 mt-2 text-sm text-stone-600">
      <WorkoutLink name="Walk 45 min" /> — walk at a comfortable pace.
    </div>
  )
}
