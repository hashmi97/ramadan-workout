import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { PLAN_TYPE_LABELS } from '../constants/planTemplates'
import type { PlanDay, PlanType } from '../types'

interface DayCardProps {
  planDay: PlanDay
  isToday?: boolean
}

const BADGE_COLORS: Record<PlanType, string> = {
  pre_iftar_gym: 'bg-blue-100 text-blue-800',
  pre_iftar: 'bg-amber-100 text-amber-800',
  walk: 'bg-green-100 text-green-800',
}

export function DayCard({ planDay, isToday }: DayCardProps) {
  const date = parseISO(planDay.date)

  return (
    <Link
      to={`/day/${planDay.date}`}
      className={`block rounded-lg border p-3 transition-colors hover:border-amber-400 ${
        isToday ? 'border-amber-500 ring-2 ring-amber-200' : 'border-stone-200 bg-white'
      }`}
    >
      <div className="flex items-center justify-between gap-1 mb-2">
        <span className="text-sm font-medium text-stone-800">
          {format(date, 'MMM d')}
        </span>
        {isToday && (
          <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
            Today
          </span>
        )}
      </div>
      <span
        className={`inline-block text-xs px-2 py-0.5 rounded ${BADGE_COLORS[planDay.plan_type as PlanType]}`}
      >
        {PLAN_TYPE_LABELS[planDay.plan_type as PlanType]}
      </span>
    </Link>
  )
}
