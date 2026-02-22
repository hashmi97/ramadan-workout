import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { getWorkoutBySlug, WORKOUT_DESCRIPTIONS } from '../constants/workoutRegistry'

const IMAGE_BASE = 'https://raw.githubusercontent.com/hashmi97/ramadan-workout/dev/public/workouts'
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp']
const NO_DEMO_SLUGS = ['walk-or-bike', 'walk-45-min', 'treadmill-walk']

export function WorkoutDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [imageError, setImageError] = useState(false)
  const [extIndex, setExtIndex] = useState(0)

  if (!slug) return <Navigate to="/dashboard" replace />

  const workout = getWorkoutBySlug(slug)

  if (!workout) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-stone-600">Workout not found.</p>
        <Link to="/dashboard" className="text-amber-600 hover:underline">
          Back to dashboard
        </Link>
      </div>
    )
  }

  if (NO_DEMO_SLUGS.includes(workout.slug)) {
    return (
      <div className="min-h-screen bg-stone-50">
        <header className="bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between">
          <Link to="/dashboard" className="text-stone-600 hover:text-stone-900 text-sm">
            ← Back
          </Link>
          <h1 className="text-lg font-semibold text-stone-900">{workout.name}</h1>
          <div className="w-10" />
        </header>
        <main className="max-w-lg mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-stone-600 text-lg text-center">You already know how 😉</p>
        </main>
      </div>
    )
  }

  const tryNextExtension = () => {
    if (extIndex + 1 < IMAGE_EXTENSIONS.length) {
      setExtIndex(extIndex + 1)
    } else {
      setImageError(true)
    }
  }

  const imagePath = `${IMAGE_BASE}/${workout.slug}${IMAGE_EXTENSIONS[extIndex]}`

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="text-stone-600 hover:text-stone-900 text-sm">
          ← Back
        </Link>
        <h1 className="text-lg font-semibold text-stone-900">{workout.name}</h1>
        <div className="w-10" />
      </header>

      <main className="max-w-lg mx-auto px-4 py-8">
        <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
          <div className="aspect-square bg-stone-100 flex items-center justify-center p-4">
            {!imageError ? (
              <img
                src={imagePath}
                alt={workout.name}
                className="w-full h-full object-contain"
                onError={tryNextExtension}
              />
            ) : (
              <p className="text-stone-400 text-sm p-4 text-center">
                No image yet. Add {workout.slug}.png (or .jpg / .webp) to public/workouts/
              </p>
            )}
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold text-stone-900">{workout.name}</h2>
            {WORKOUT_DESCRIPTIONS[workout.slug] && (
              <p className="mt-2 text-stone-600 text-sm leading-relaxed">
                {WORKOUT_DESCRIPTIONS[workout.slug]}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
