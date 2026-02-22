const STORAGE_KEY = 'ramadan-cut-tracker'

export type StoredState = {
  tasks: Record<string, boolean>  // taskId -> completed
  gymTypes: Record<string, 'A' | 'B' | 'C'>  // planDayId (date) -> gymType
}

function load(): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { tasks: {}, gymTypes: {} }
    const parsed = JSON.parse(raw) as Partial<StoredState>
    return {
      tasks: parsed.tasks ?? {},
      gymTypes: parsed.gymTypes ?? {},
    }
  } catch {
    return { tasks: {}, gymTypes: {} }
  }
}

function save(state: StoredState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function getTaskCompleted(taskId: string): boolean {
  return load().tasks[taskId] ?? false
}

export function setTaskCompleted(taskId: string, completed: boolean) {
  const state = load()
  state.tasks[taskId] = completed
  save(state)
}

export function getGymType(planDayId: string): 'A' | 'B' | 'C' | null {
  const gym = load().gymTypes[planDayId]
  return gym ?? null
}

export function setGymType(planDayId: string, gymType: 'A' | 'B' | 'C') {
  const state = load()
  state.gymTypes[planDayId] = gymType
  save(state)
}
