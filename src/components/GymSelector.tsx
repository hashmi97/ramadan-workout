import type { GymType } from '../types'
import { GYM_LABELS } from '../constants/planTemplates'
import { updateGymType } from '../services/taskService'
import toast from 'react-hot-toast'

interface GymSelectorProps {
  planDayId: string
  value: GymType | null
  onSelect?: (gymType: GymType) => void
  readOnly?: boolean
}

const GYM_OPTIONS: GymType[] = ['A', 'B', 'C']

export function GymSelector({
  planDayId,
  value,
  onSelect,
  readOnly = false,
}: GymSelectorProps) {
  async function handleSelect(gymType: GymType) {
    const prev = value
    if (onSelect) onSelect(gymType)

    if (readOnly) return

    try {
      await updateGymType(planDayId, gymType)
    } catch {
      toast.error('Failed to save')
      if (onSelect && prev) onSelect(prev)
    }
  }

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-stone-800">Gym After Iftar</h3>
      <div className="flex flex-wrap gap-2">
        {GYM_OPTIONS.map((gym) => (
          <button
            key={gym}
            type="button"
            onClick={() => handleSelect(gym)}
            disabled={readOnly}
            className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
              value === gym
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-white text-stone-700 border-stone-300 hover:border-amber-400'
            }`}
          >
            {gym}: {GYM_LABELS[gym]}
          </button>
        ))}
      </div>
    </div>
  )
}
