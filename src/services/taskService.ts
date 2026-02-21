import { supabase } from '../lib/supabase'

export async function toggleTask(taskId: string, completed: boolean) {
  const { error } = await supabase
    .from('day_tasks')
    .update({ completed })
    .eq('id', taskId)

  if (error) throw error
}

export async function updateGymType(planDayId: string, gymType: 'A' | 'B' | 'C') {
  const { error } = await supabase
    .from('plan_days')
    .update({ gym_type: gymType })
    .eq('id', planDayId)

  if (error) throw error
}
