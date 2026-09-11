# Hormoni Admin Panel

Separate web app for publishing Learn articles and Nutrition food suggestions into the Hormoni app's Supabase project. Publishing here updates the mobile app live (no app update needed) and triggers a push notification to users once the Edge Function + Database Webhooks are set up (see the repo root `supabase/functions/notify-new-content/`).

## Setup

1. `cp .env.example .env` and fill in the same `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` values used by the mobile app's `.env`.
2. Run the repo-root migration `supabase/migrations/20260911000000_admin_content_and_push.sql` in the Supabase SQL Editor if you haven't already.
3. Flag your own account as an admin (one-time, run in the SQL Editor):
   ```sql
   UPDATE public.profiles SET is_admin = true
     WHERE id = (SELECT id FROM auth.users WHERE email = 'you@example.com');
   ```
4. Sign-in is email + password (see below). If your account was originally created via the old magic-link flow, it has no password yet — set one directly in **Authentication → Users → (your user) → Reset Password** in the Supabase dashboard, which lets you type a new password immediately without sending any email.
5. `npm install && npm run dev`, then sign in at `http://localhost:5173` with that email/password.

## Auth

The admin panel and the mobile app both use plain Supabase email/password auth (`signInWithPassword`) rather than magic links, to avoid depending on transactional email delivery for the login path itself. Email is only used for the optional "Forgot password" flow — if that's still unreliable in your Supabase project's SMTP config, use the dashboard's manual password-reset field instead (step 4 above).

## What it does

- **Articles**: create/edit `educational_content` rows. Status `pending` keeps an article hidden from the app; `approved` publishes it immediately and (once the webhook is set up) sends a push notification.
- **Foods**: create/edit `foods` rows (Nutrition's "Explore"/"Limit" lists). Every new food notifies users.

Row Level Security is what actually enforces admin-only writes — this app has no server of its own, it's a thin client over Supabase, gated by `profiles.is_admin`.
