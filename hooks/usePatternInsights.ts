import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { computeCorrelations, Finding } from '../lib/correlations';

const LOOKBACK_DAYS = 60;

export function usePatternInsights() {
  const user = useAuthStore((state) => state.user);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) return;
    const since = new Date(Date.now() - LOOKBACK_DAYS * 86400000).toISOString();

    const [symptomsRes, moodRes, sleepRes, exerciseRes, hydrationRes] = await Promise.all([
      supabase.from('symptom_logs').select('severity, logged_at').eq('user_id', user.id).gte('logged_at', since),
      supabase.from('mood_checkins').select('mood_value, logged_at').eq('user_id', user.id).gte('logged_at', since),
      supabase.from('sleep_logs').select('bedtime, wake_time, logged_at').eq('user_id', user.id).gte('logged_at', since),
      supabase.from('exercise_logs').select('logged_at').eq('user_id', user.id).gte('logged_at', since),
      supabase.from('hydration_logs').select('glasses, logged_at').eq('user_id', user.id).gte('logged_at', since),
    ]);

    setFindings(
      computeCorrelations({
        symptomLogs: symptomsRes.data ?? [],
        moodCheckins: moodRes.data ?? [],
        sleepLogs: sleepRes.data ?? [],
        exerciseLogs: exerciseRes.data ?? [],
        hydrationLogs: hydrationRes.data ?? [],
      })
    );
    setLoading(false);
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  return { findings, loading };
}
