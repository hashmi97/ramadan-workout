import type { DayTask } from '../types'
import toast from 'react-hot-toast'
import { toggleTask } from '../services/taskService'

interface ChecklistSectionProps {
  title: string
  tasks: DayTask[]
  onTaskToggle?: (taskId: string, completed: boolean) => void
  readOnly?: boolean
}

export function ChecklistSection({
  title,
  tasks,
  onTaskToggle,
  readOnly = false,
}: ChecklistSectionProps) {
  const completed = tasks.filter((t) => t.completed).length
  const total = tasks.length
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0

  async function handleToggle(task: DayTask) {
    const next = !task.completed
    if (onTaskToggle) {
      onTaskToggle(task.id, next)
    }
    if (readOnly) return

    try {
      await toggleTask(task.id, next)
    } catch {
      toast.error('Failed to save')
      if (onTaskToggle) onTaskToggle(task.id, task.completed)
    }
  }

  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-stone-800">{title}</h3>
        <span className="text-sm text-stone-500">{pct}%</span>
      </div>
      <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-500 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <ul className="space-y-1">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task)}
              disabled={readOnly}
              className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
            />
            <span
              className={
                task.completed ? 'text-stone-500 line-through' : 'text-stone-800'
              }
            >
              {task.task_label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
