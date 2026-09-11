import { toLocalDateKey } from './date';

// Cross-references lifestyle logs (sleep, exercise, hydration) against
// symptom severity and mood over a recent window, surfacing plain-language
// findings only when there's enough data in both comparison groups —
// otherwise no claim is made. Same honesty-first approach as
// lib/insights.ts's estimated/confirmed cycle-phase confidence: this is the
// one differentiator that actually cross-analyzes data the app already
// collects, instead of just logging it back at the user.

const MIN_SAMPLE_PER_GROUP = 4;
const MEANINGFUL_DELTA = 0.4;
const SLEEP_GOOD_HOURS = 7;
const HYDRATION_GOAL_GLASSES = 8;

export interface Finding {
  id: string;
  text: string;
  sampleSize: number;
}

interface DayBucket {
  withFactor: number[];
  withoutFactor: number[];
}

function bucketByFactor(valueByDay: Map<string, number>, factorDays: Set<string>): DayBucket {
  const withFactor: number[] = [];
  const withoutFactor: number[] = [];
  for (const [day, value] of valueByDay) {
    (factorDays.has(day) ? withFactor : withoutFactor).push(value);
  }
  return { withFactor, withoutFactor };
}

function average(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

// Returns { avgWith, avgWithout, n } only when both groups clear the minimum
// sample size — null means "not enough data to say anything," not "no effect."
function compareGroups(valueByDay: Map<string, number>, factorDays: Set<string>) {
  const { withFactor, withoutFactor } = bucketByFactor(valueByDay, factorDays);
  if (withFactor.length < MIN_SAMPLE_PER_GROUP || withoutFactor.length < MIN_SAMPLE_PER_GROUP) return null;
  return {
    avgWith: average(withFactor),
    avgWithout: average(withoutFactor),
    n: withFactor.length + withoutFactor.length,
  };
}

function averageByDay(logs: { logged_at: string; value: number }[]): Map<string, number> {
  const byDay = new Map<string, number[]>();
  for (const log of logs) {
    const day = toLocalDateKey(new Date(log.logged_at));
    if (!byDay.has(day)) byDay.set(day, []);
    byDay.get(day)!.push(log.value);
  }
  return new Map(Array.from(byDay.entries()).map(([day, values]) => [day, average(values)]));
}

interface CorrelationInputs {
  symptomLogs: { severity: number; logged_at: string }[];
  moodCheckins: { mood_value: number; logged_at: string }[];
  sleepLogs: { bedtime: string | null; wake_time: string | null; logged_at: string }[];
  exerciseLogs: { logged_at: string }[];
  hydrationLogs: { glasses: number; logged_at: string }[];
}

export function computeCorrelations(inputs: CorrelationInputs): Finding[] {
  const symptomByDay = averageByDay(inputs.symptomLogs.map((l) => ({ logged_at: l.logged_at, value: l.severity })));
  const moodByDay = averageByDay(inputs.moodCheckins.map((c) => ({ logged_at: c.logged_at, value: c.mood_value })));

  const slptWellDays = new Set(
    inputs.sleepLogs
      .filter((s) => s.bedtime && s.wake_time)
      .filter((s) => (new Date(s.wake_time!).getTime() - new Date(s.bedtime!).getTime()) / 3600000 >= SLEEP_GOOD_HOURS)
      .map((s) => toLocalDateKey(new Date(s.logged_at)))
  );
  const exercisedDays = new Set(inputs.exerciseLogs.map((e) => toLocalDateKey(new Date(e.logged_at))));
  const hydratedDays = new Set(
    inputs.hydrationLogs.filter((h) => h.glasses >= HYDRATION_GOAL_GLASSES).map((h) => toLocalDateKey(new Date(h.logged_at)))
  );

  const findings: Finding[] = [];

  const sleepVsSymptoms = compareGroups(symptomByDay, slptWellDays);
  if (sleepVsSymptoms && sleepVsSymptoms.avgWithout - sleepVsSymptoms.avgWith >= MEANINGFUL_DELTA) {
    findings.push({
      id: 'sleep-symptoms',
      text: `Your symptoms tend to be milder on days you sleep ${SLEEP_GOOD_HOURS}+ hours.`,
      sampleSize: sleepVsSymptoms.n,
    });
  }

  const sleepVsMood = compareGroups(moodByDay, slptWellDays);
  if (sleepVsMood && sleepVsMood.avgWith - sleepVsMood.avgWithout >= MEANINGFUL_DELTA) {
    findings.push({
      id: 'sleep-mood',
      text: `Your mood tends to be better on days you sleep ${SLEEP_GOOD_HOURS}+ hours.`,
      sampleSize: sleepVsMood.n,
    });
  }

  const exerciseVsSymptoms = compareGroups(symptomByDay, exercisedDays);
  if (exerciseVsSymptoms && exerciseVsSymptoms.avgWithout - exerciseVsSymptoms.avgWith >= MEANINGFUL_DELTA) {
    findings.push({
      id: 'exercise-symptoms',
      text: 'Your symptoms tend to be milder on days you log exercise.',
      sampleSize: exerciseVsSymptoms.n,
    });
  }

  const exerciseVsMood = compareGroups(moodByDay, exercisedDays);
  if (exerciseVsMood && exerciseVsMood.avgWith - exerciseVsMood.avgWithout >= MEANINGFUL_DELTA) {
    findings.push({
      id: 'exercise-mood',
      text: 'Your mood tends to be better on days you log exercise.',
      sampleSize: exerciseVsMood.n,
    });
  }

  const hydrationVsSymptoms = compareGroups(symptomByDay, hydratedDays);
  if (hydrationVsSymptoms && hydrationVsSymptoms.avgWithout - hydrationVsSymptoms.avgWith >= MEANINGFUL_DELTA) {
    findings.push({
      id: 'hydration-symptoms',
      text: `Your symptoms tend to be milder on days you hit ${HYDRATION_GOAL_GLASSES}+ glasses of water.`,
      sampleSize: hydrationVsSymptoms.n,
    });
  }

  return findings;
}
