import { format } from 'date-fns'
import { usePlanDays } from '../hooks/usePlanDays'
import { TodayCard } from '../components/TodayCard'
import { CalendarGrid } from '../components/CalendarGrid'
import toast from 'react-hot-toast'

export function Dashboard() {
  const {
    planDays,
    loading,
    error,
    updateTaskOptimistic,
    updateGymTypeOptimistic,
  } = usePlanDays()

  const todayStr = format(new Date(), 'yyyy-MM-dd')
  const todayPlan = planDays.find((pd) => pd.date === todayStr)

  if (loading && planDays.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-stone-600">Loading your plan...</p>
      </div>
    )
  }

  if (error) {
    toast.error('Failed to load plan')
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 px-4 py-3">
        <h1 className="text-lg font-semibold text-stone-900">Ramadan Cut Tracker</h1>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        <section>
          <h2 className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-3">
            Today
          </h2>
          <TodayCard
            planDay={todayPlan ?? null}
            onTaskToggle={updateTaskOptimistic}
            onGymSelect={(gymType) =>
              todayPlan && updateGymTypeOptimistic(todayPlan.id, gymType)
            }
          />
        </section>

        <section>
          <h2 className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-3">
            4-Week Calendar
          </h2>
          <CalendarGrid planDays={planDays} todayStr={todayStr} />
        </section>
      </main>
    </div>
  )
}
