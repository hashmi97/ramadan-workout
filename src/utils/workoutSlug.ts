/**
 * Converts exercise name to URL-safe slug.
 * e.g. "Bench press" -> "bench-press", "Pushups" -> "pushups"
 */
export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s*\([^)]*\)\s*/g, ' ') // Remove parentheticals, keep content before/after
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^\-|\-$/g, '')
}
