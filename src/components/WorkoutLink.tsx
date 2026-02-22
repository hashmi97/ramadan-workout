import { Link } from 'react-router-dom'
import { toSlug } from '../utils/workoutSlug'

interface WorkoutLinkProps {
  name: string
  className?: string
}

export function WorkoutLink({ name, className = '' }: WorkoutLinkProps) {
  const slug = toSlug(name)

  return (
    <Link
      to={`/workout/${slug}`}
      className={`text-amber-600 hover:text-amber-700 hover:underline ${className}`}
    >
      {name}
    </Link>
  )
}
