import { format, parseISO } from 'date-fns'
import { PLAN_TYPE_LABELS } from '../constants/planTemplates'
import { ChecklistSection } from './ChecklistSection'
import { GymSelector } from './GymSelector'
import { PreIftarExerciseDetails, GymExerciseDetails, WalkExerciseDetails } from './ExerciseDetails'
import type { PlanDay, PlanType } from '../types'

interface TodayCardProps {
  planDay: PlanDay | null
  onTaskToggle?: (taskId: string, completed: boolean) => void
  onGymSelect?: (gymType: 'A' | 'B' | 'C') => void
}

function partitionTasks(planDay: PlanDay) {
  const tasks = planDay.day_tasks ?? []
  const walkKeys = ['walk_45']
  const walk = tasks.filter((t) => walkKeys.includes(t.task_key))

  return { walk }
}

export function TodayCard({
  planDay,
  onTaskToggle,
  onGymSelect,
}: TodayCardProps) {
  if (!planDay) {
    return (
      <div className="bg-white rounded-lg border border-stone-200 p-6">
        <p className="text-stone-500">No plan for today.</p>
      </div>
    )
  }

  const date = parseISO(planDay.date)
  const { walk } = partitionTasks(planDay)
  const hasPreIftar = planDay.plan_type === 'pre_iftar' || planDay.plan_type === 'pre_iftar_gym'
  const hasGym = planDay.plan_type === 'pre_iftar_gym'

  return (
    <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-stone-900">
          Today — {format(date, 'EEEE, MMM d, yyyy')}
        </h2>
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
