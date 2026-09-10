import { supabase } from './supabase';

export interface HealthSummary {
  periodCount: number;
  symptomCount: number;
  moodCount: number;
  exerciseCount: number;
  averageSleepHours: number | null;
  latestWeight: number | null;
  weightUnit: string | null;
}

export async function buildHealthSummary(userId: string, sinceDays = 30): Promise<HealthSummary> {
  const since = new Date(Date.now() - sinceDays * 86400000).toISOString();

  const [cycles, symptoms, moods, exercise, sleep, weight] = await Promise.all([
    supabase.from('cycles').select('id', { count: 'exact', head: true }).eq('user_id', userId).gte('start_date', since),
    supabase.from('symptom_logs').select('id', { count: 'exact', head: true }).eq('user_id', userId).gte('logged_at', since),
    supabase.from('mood_checkins').select('id', { count: 'exact', head: true }).eq('user_id', userId).gte('logged_at', since),
    supabase.from('exercise_logs').select('id', { count: 'exact', head: true }).eq('user_id', userId).gte('logged_at', since),
    supabase.from('sleep_logs').select('bedtime, wake_time').eq('user_id', userId).gte('logged_at', since),
    supabase.from('weight_logs').select('weight_value, unit').eq('user_id', userId).order('logged_at', { ascending: false }).limit(1),
  ]);

  const sleepRows = sleep.data ?? [];
  const sleepHours = sleepRows
    .filter((r) => r.bedtime && r.wake_time)
    .map((r) => (new Date(r.wake_time!).getTime() - new Date(r.bedtime!).getTime()) / 3600000);
  const averageSleepHours = sleepHours.length > 0 ? sleepHours.reduce((a, b) => a + b, 0) / sleepHours.length : null;

  return {
    periodCount: cycles.count ?? 0,
    symptomCount: symptoms.count ?? 0,
    moodCount: moods.count ?? 0,
    exerciseCount: exercise.count ?? 0,
    averageSleepHours,
    latestWeight: weight.data?.[0]?.weight_value ?? null,
    weightUnit: weight.data?.[0]?.unit ?? null,
  };
}
