import type { DayTask } from '../types'

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
  function handleToggle(task: DayTask) {
    const next = !task.completed
    if (onTaskToggle) {
      onTaskToggle(task.id, next)
    }
  }

  return (
    <section className="space-y-2">
      <h3 className="font-medium text-stone-800">{title}</h3>
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
