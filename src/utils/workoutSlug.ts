/**
 * Converts exercise name to URL-safe slug.
 * e.g. "Bench press" -> "bench-press", "Pushups" -> "pushups"
 * Bodyweight squats and Squats share the same slug/image.
 * Light lunges and Lunges share the same slug/image.
 * Arm circles + stretch and Arm circles share the same slug/image.
 * Shoulder stretch and Arm stretch share the same slug/image.
 */
export function toSlug(name: string): string {
  if (name === 'Bodyweight squats') return 'squats'
  if (name === 'Light lunges') return 'lunges'
  if (name === 'Arm circles + stretch') return 'arm-circles'
  if (name === 'Shoulder stretch') return 'arm-stretch'
  return name
    .toLowerCase()
    .replace(/\s*\([^)]*\)\s*/g, ' ') // Remove parentheticals, keep content before/after
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^\-|\-$/g, '')
}
