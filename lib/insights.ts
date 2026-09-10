import { PhaseKey } from '../theme/tokens';
import { MOOD_LABELS } from './moodLabels';

const DAY_MS = 86400000;

export interface CyclePrediction {
  cycleDay: number;
  predictedLength: number;
  hasEnoughData: boolean;
  progress: number; // 0..1 through the predicted cycle, clamped
}

export function computeCycleDay(latestStart: string, today: Date = new Date()): number {
  const start = new Date(latestStart);
  const diffDays = Math.floor((today.getTime() - start.getTime()) / DAY_MS);
  return diffDays + 1;
}

export function computePredictedLength(cycles: { start_date: string }[]): { length: number; hasEnoughData: boolean } {
  const sorted = [...cycles].sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()).slice(0, 6);
  if (sorted.length < 2) return { length: 28, hasEnoughData: false };

  const gaps: number[] = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    const diff = Math.round((new Date(sorted[i].start_date).getTime() - new Date(sorted[i + 1].start_date).getTime()) / DAY_MS);
    if (diff > 0) gaps.push(diff);
  }
  if (gaps.length === 0) return { length: 28, hasEnoughData: false };

  const avg = Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length);
  return { length: Math.max(21, Math.min(45, avg)), hasEnoughData: true };
}

export function computeCyclePrediction(cycles: { start_date: string }[], today: Date = new Date()): CyclePrediction | null {
  if (cycles.length === 0) return null;
  const latest = [...cycles].sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())[0];
  const cycleDay = computeCycleDay(latest.start_date, today);
  const { length: predictedLength, hasEnoughData } = computePredictedLength(cycles);
  const progress = Math.max(0, Math.min(1, cycleDay / predictedLength));
  return { cycleDay, predictedLength, hasEnoughData, progress };
}

export interface PhaseResult {
  phase: PhaseKey;
  confidence: 'estimated' | 'confirmed';
}

export function computePhase(cycleDay: number, predictedLength: number, hasEnoughData: boolean): PhaseResult {
  const ovulationDay = predictedLength / 2;
  let phase: PhaseKey;

  if (cycleDay <= 5) {
    phase = 'period';
  } else if (Math.abs(cycleDay - ovulationDay) <= 2) {
    phase = 'ovulation';
  } else if (cycleDay < ovulationDay - 2) {
    phase = 'fertile';
  } else {
    phase = 'luteal';
  }

  return { phase, confidence: hasEnoughData ? 'confirmed' : 'estimated' };
}

export type SymptomScore = 'none' | 'low' | 'moderate' | 'high';

export function computeSymptomScore(logs: { severity: number; logged_at: string }[], today: Date = new Date()): SymptomScore {
  const cutoff = today.getTime() - 7 * DAY_MS;
  const recent = logs.filter((l) => new Date(l.logged_at).getTime() >= cutoff);
  if (recent.length === 0) return 'none';

  const avg = recent.reduce((sum, l) => sum + l.severity, 0) / recent.length;
  if (avg < 2) return 'low';
  if (avg < 3.5) return 'moderate';
  return 'high';
}

export interface MoodTrendResult {
  kind: 'trend' | 'single' | 'none';
  label: string;
}

export function computeMoodTrend(checkins: { mood_value: number; logged_at: string }[], today: Date = new Date()): MoodTrendResult {
  const cutoff14 = today.getTime() - 14 * DAY_MS;
  const recent = checkins.filter((c) => new Date(c.logged_at).getTime() >= cutoff14);

  if (recent.length === 0) return { kind: 'none', label: 'No check-ins yet' };
  if (recent.length === 1) return { kind: 'single', label: MOOD_LABELS[recent[0].mood_value] ?? 'Logged' };

  const cutoff7 = today.getTime() - 7 * DAY_MS;
  const last7 = recent.filter((c) => new Date(c.logged_at).getTime() >= cutoff7);
  const prior7 = recent.filter((c) => new Date(c.logged_at).getTime() < cutoff7);

  if (last7.length === 0 || prior7.length === 0) {
    const avg = recent.reduce((sum, c) => sum + c.mood_value, 0) / recent.length;
    return { kind: 'trend', label: MOOD_LABELS[Math.round(avg)] ?? 'Steady' };
  }

  const avgRecent = last7.reduce((sum, c) => sum + c.mood_value, 0) / last7.length;
  const avgPrior = prior7.reduce((sum, c) => sum + c.mood_value, 0) / prior7.length;
  const delta = avgRecent - avgPrior;

  if (delta >= 0.5) return { kind: 'trend', label: 'Improving' };
  if (delta <= -0.5) return { kind: 'trend', label: 'Declining' };
  return { kind: 'trend', label: 'Steady' };
}
