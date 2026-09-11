import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import {
  computeCyclePrediction,
  computePhase,
  computeSymptomScore,
  computeMoodTrend,
  SymptomScore,
  MoodTrendResult,
  PhaseResult,
} from '../lib/insights';

interface HomeStats {
  loading: boolean;
  hasCycles: boolean;
  cycleDay: number;
  predictedLength: number;
  progress: number;
  phase: PhaseResult;
  symptomScore: SymptomScore;
  moodTrend: MoodTrendResult;
  goals: string[];
}

const EMPTY_STATS: HomeStats = {
  loading: true,
  hasCycles: false,
  cycleDay: 0,
  predictedLength: 28,
  progress: 0,
  phase: { phase: 'period', confidence: 'estimated' },
  symptomScore: 'none',
  moodTrend: { kind: 'none', label: 'No check-ins yet' },
  goals: [],
};

export function useHomeStats() {
  const user = useAuthStore((state) => state.user);
  const [stats, setStats] = useState<HomeStats>(EMPTY_STATS);

  const load = useCallback(async () => {
    if (!user) return;

    const [cyclesRes, symptomsRes, moodRes, profileRes] = await Promise.all([
      supabase.from('cycles').select('start_date').eq('user_id', user.id).order('start_date', { ascending: false }).limit(6),
      supabase.from('symptom_logs').select('severity, logged_at').eq('user_id', user.id).order('logged_at', { ascending: false }).limit(30),
      supabase.from('mood_checkins').select('mood_value, logged_at').eq('user_id', user.id).order('logged_at', { ascending: false }).limit(30),
      supabase.from('profiles').select('goals').eq('id', user.id).single(),
    ]);

    const cycles = cyclesRes.data ?? [];
    const symptoms = symptomsRes.data ?? [];
    const moods = moodRes.data ?? [];
    const goals = profileRes.data?.goals ?? [];

    const prediction = computeCyclePrediction(cycles);

    setStats({
      loading: false,
      hasCycles: prediction !== null,
      cycleDay: prediction?.cycleDay ?? 0,
      predictedLength: prediction?.predictedLength ?? 28,
      progress: prediction?.progress ?? 0,
      phase: prediction ? computePhase(prediction.cycleDay, prediction.predictedLength, prediction.hasEnoughData) : { phase: 'period', confidence: 'estimated' },
      symptomScore: computeSymptomScore(symptoms),
      moodTrend: computeMoodTrend(moods),
      goals,
    });
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  return stats;
}
