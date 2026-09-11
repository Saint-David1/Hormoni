// Deployed as a Supabase Edge Function and invoked by Database Webhooks:
//   - educational_content, on UPDATE (fires when review_status becomes 'approved')
//   - foods, on INSERT
// Deploy with: supabase functions deploy notify-new-content --no-verify-jwt
// (--no-verify-jwt because Database Webhooks call this without a user JWT)
//
// Requires these secrets, set via `supabase secrets set`:
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (both are auto-injected by Supabase
//   for Edge Functions in the same project, no manual setup needed)

import { createClient } from 'jsr:@supabase/supabase-js@2';

interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  record: Record<string, unknown>;
  old_record: Record<string, unknown> | null;
}

Deno.serve(async (req: Request) => {
  const payload: WebhookPayload = await req.json();
  const { table, record } = payload;

  // Only notify for articles once they're actually approved, not on every edit.
  if (table === 'educational_content' && record.review_status !== 'approved') {
    return new Response('skipped: not approved', { status: 200 });
  }

  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const { data: tokens, error } = await supabaseAdmin.from('push_tokens').select('expo_push_token');
  if (error) {
    console.error('Failed to fetch push tokens', error);
    return new Response('error fetching tokens', { status: 500 });
  }
  if (!tokens || tokens.length === 0) {
    return new Response('no tokens registered', { status: 200 });
  }

  const isFood = table === 'foods';
  const title = isFood ? 'New food suggestion' : `New article: ${record.title as string}`;
  const body = isFood ? `${record.name as string} was just added to Nutrition` : 'Check it out in the Learn tab';

  const messages = tokens.map((t: { expo_push_token: string }) => ({
    to: t.expo_push_token,
    sound: 'default',
    title,
    body,
    data: { table, id: record.id },
  }));

  const pushResponse = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(messages),
  });

  if (!pushResponse.ok) {
    console.error('Expo push send failed', await pushResponse.text());
    return new Response('push send failed', { status: 502 });
  }

  return new Response('ok', { status: 200 });
});
