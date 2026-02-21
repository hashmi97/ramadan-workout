import { useParams, Navigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { usePlanDays } from '../hooks/usePlanDays'
import { DayDetailsPanel } from '../components/DayDetailsPanel'

export function DayDetail() {
  const { date } = useParams<{ date: string }>()
  const { user, seeded } = useAuth()
  const { planDays, loading, updateTaskOptimistic, updateGymTypeOptimistic } =
    usePlanDays(user?.id ?? null, seeded)

  if (!date) return <Navigate to="/dashboard" replace />

  const planDay = planDays.find((pd) => pd.date === date)

  if (loading && planDays.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-stone-600">Loading...</p>
      </div>
    )
  }

  if (!planDay) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center gap-2">
        <p className="text-stone-600">Plan not found for this date.</p>
        <Link to="/dashboard" className="text-amber-600 hover:underline">
          Back to dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 px-4 py-3">
        <h1 className="text-lg font-semibold text-stone-900">Ramadan Cut Tracker</h1>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-6">
          <DayDetailsPanel
            planDay={planDay}
            onTaskToggle={updateTaskOptimistic}
            onGymSelect={(gymType) => updateGymTypeOptimistic(planDay.id, gymType)}
          />
        </div>
      </main>
    </div>
  )
}
