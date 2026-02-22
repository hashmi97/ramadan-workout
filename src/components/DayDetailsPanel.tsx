import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { PLAN_TYPE_LABELS } from '../constants/planTemplates'
import { ChecklistSection } from './ChecklistSection'
import { GymSelector } from './GymSelector'
import { PreIftarExerciseDetails, GymExerciseDetails, WalkExerciseDetails } from './ExerciseDetails'
import type { PlanDay, PlanType } from '../types'

interface DayDetailsPanelProps {
  planDay: PlanDay
  onTaskToggle?: (taskId: string, completed: boolean) => void
  onGymSelect?: (gymType: 'A' | 'B' | 'C') => void
}

function partitionTasks(planDay: PlanDay) {
  const tasks = planDay.day_tasks ?? []
  const walkKeys = ['walk_45']

  return {
    walk: tasks.filter((t) => walkKeys.includes(t.task_key)),
  }
}

export function DayDetailsPanel({
  planDay,
  onTaskToggle,
  onGymSelect,
}: DayDetailsPanelProps) {
  const date = parseISO(planDay.date)
  const { walk } = partitionTasks(planDay)
  const hasPreIftar = planDay.plan_type === 'pre_iftar' || planDay.plan_type === 'pre_iftar_gym'
  const hasGym = planDay.plan_type === 'pre_iftar_gym'

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/dashboard"
          className="text-stone-600 hover:text-stone-900 text-sm"
        >
          ← Back to dashboard
        </Link>
      </div>
      <div>
        <h1 className="text-2xl font-semibold text-stone-900">
          {format(date, 'EEEE, MMM d, yyyy')}
        </h1>
        <p className="text-stone-600 mt-0.5">
          {PLAN_TYPE_LABELS[planDay.plan_type as PlanType]}
        </p>
      </div>

      {hasPreIftar && (
        <section className="space-y-2">
          <h3 className="font-medium text-stone-800">Pre-Iftar Fat-Burn Circuit</h3>
          <PreIftarExerciseDetails dateStr={planDay.date} />
        </section>
      )}

      {hasGym && (
        <section className="space-y-2">
          <GymSelector
            planDayId={planDay.id}
            value={planDay.gym_type}
            onSelect={onGymSelect}
          />
          {planDay.gym_type && (
            <GymExerciseDetails gymType={planDay.gym_type} />
          )}
        </section>
      )}

      {walk.length > 0 && (
        <section className="space-y-2">
          <ChecklistSection
            title="Walk"
            tasks={walk}
            onTaskToggle={onTaskToggle}
          />
          <WalkExerciseDetails />
        </section>
      )}
    </div>
  )
}
