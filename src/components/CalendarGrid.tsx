import { addDays, format, parseISO } from 'date-fns'
import { DayCard } from './DayCard'
import { PLAN_START_DATE, PLAN_DAYS_COUNT } from '../constants/planTemplates'
import type { PlanDay } from '../types'

function buildDateToPlanDay(planDays: PlanDay[]): Map<string, PlanDay> {
  const map = new Map<string, PlanDay>()
  for (const pd of planDays) {
    map.set(pd.date, pd)
  }
  return map
}

function getPlannedDates(): string[] {
  const dates: string[] = []
  const start = parseISO(PLAN_START_DATE)
  for (let i = 0; i < PLAN_DAYS_COUNT; i++) {
    dates.push(format(addDays(start, i), 'yyyy-MM-dd'))
  }
  return dates
}

interface CalendarGridProps {
  planDays: PlanDay[]
  todayStr: string
}

export function CalendarGrid({ planDays, todayStr }: CalendarGridProps) {
  const dateToPlan = buildDateToPlanDay(planDays)
  const plannedDates = getPlannedDates()

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
      {plannedDates.map((dateStr) => {
        const planDay = dateToPlan.get(dateStr)
        if (!planDay) {
          return (
            <div
              key={dateStr}
              className="rounded-lg border border-dashed border-stone-200 p-3 bg-stone-50"
            >
              <span className="text-sm text-stone-400">
                {format(parseISO(dateStr), 'MMM d')}
              </span>
              <p className="text-xs text-stone-400 mt-1">Loading...</p>
            </div>
          )
        }
        return (
          <DayCard
            key={planDay.id}
            planDay={planDay}
            isToday={dateStr === todayStr}
          />
        )
      })}
    </div>
  )
}
