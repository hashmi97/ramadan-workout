import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { PLAN_TYPE_LABELS } from '../constants/planTemplates'
import { ChecklistSection } from './ChecklistSection'
import { GymSelector } from './GymSelector'
import type { PlanDay, PlanType } from '../types'

interface DayDetailsPanelProps {
  planDay: PlanDay
  onTaskToggle?: (taskId: string, completed: boolean) => void
  onGymSelect?: (gymType: 'A' | 'B' | 'C') => void
}

function partitionTasks(planDay: PlanDay) {
  const tasks = planDay.day_tasks ?? []
  const preIftarKeys = ['warmup', 'round_1', 'round_2', 'round_3', 'round_4', 'round_5', 'core_finisher']
  const gymKeys = ['main_lifts', 'accessories', 'abs']
  const walkKeys = ['walk_45']
  const restKeys = ['rest', 'optional_walk']

  return {
    preIftar: tasks.filter((t) => preIftarKeys.includes(t.task_key)),
    gym: tasks.filter((t) => gymKeys.includes(t.task_key)),
    walk: tasks.filter((t) => walkKeys.includes(t.task_key)),
    rest: tasks.filter((t) => restKeys.includes(t.task_key)),
  }
}

export function DayDetailsPanel({
  planDay,
  onTaskToggle,
  onGymSelect,
}: DayDetailsPanelProps) {
  const date = parseISO(planDay.date)
  const { preIftar, gym, walk, rest } = partitionTasks(planDay)
  const allTasks = planDay.day_tasks ?? []
  const completed = allTasks.filter((t) => t.completed).length
  const total = allTasks.length
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
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

      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-stone-700">Overall</span>
          <span className="text-sm text-stone-500">{pct}%</span>
        </div>
        <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {preIftar.length > 0 && (
        <ChecklistSection
          title="Pre-Iftar Fat Burn"
          tasks={preIftar}
          onTaskToggle={onTaskToggle}
        />
      )}

      {hasGym && (
        <GymSelector
          planDayId={planDay.id}
          value={planDay.gym_type}
          onSelect={onGymSelect}
        />
      )}

      {hasGym && gym.length > 0 && (
        <ChecklistSection
          title="Gym After Iftar"
          tasks={gym}
          onTaskToggle={onTaskToggle}
        />
      )}

      {walk.length > 0 && (
        <ChecklistSection
          title="Walk"
          tasks={walk}
          onTaskToggle={onTaskToggle}
        />
      )}

      {rest.length > 0 && (
        <ChecklistSection
          title="Rest"
          tasks={rest}
          onTaskToggle={onTaskToggle}
        />
      )}
    </div>
  )
}
