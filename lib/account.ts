import { supabase } from './supabase';
import { clearQueue } from './db';

// Tables keyed by user_id that the client is allowed (via RLS) to delete its
// own rows from. This does NOT remove the auth.users record itself — that
// requires the Supabase admin API / service role key, which must never live
// in a mobile client, so it has to happen server-side (e.g. an Edge Function
// the app calls, or a support-driven process).
const OWNED_TABLES = [
  'journal_entries',
  'guidance_requests',
  'consent_records',
  'settings',
  'mood_checkins',
  'weight_logs',
  'symptom_logs',
  'cycles',
  'health_assessments',
  'profiles',
] as const;

export const deleteAllUserData = async (userId: string) => {
  for (const table of OWNED_TABLES) {
    const { error } = await supabase.from(table).delete().eq(table === 'profiles' ? 'id' : 'user_id', userId);
    if (error) {
      throw new Error(`Failed to delete ${table}: ${error.message}`);
    }
  }
  await clearQueue();
};
