-- Onboarding already asks what a user cares about (profile-setup's goals,
-- assessment's lifestyle focus areas) but the answers only ever lived in
-- memory (store/authStore.ts), shown back once on the personalize recap
-- screen and then discarded. Persisting them lets Home/Lifestyle actually
-- act on what the user told us during onboarding.
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS goals TEXT[] DEFAULT '{}';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS focus_areas TEXT[] DEFAULT '{}';
