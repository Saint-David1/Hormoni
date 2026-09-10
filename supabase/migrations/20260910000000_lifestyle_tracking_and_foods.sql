-- Name fields collected during onboarding, not at signup
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_name TEXT;

-- Lifestyle tracking domains
CREATE TABLE public.exercise_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    activity TEXT NOT NULL, duration_minutes INTEGER, logged_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE public.sleep_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    bedtime TIMESTAMPTZ, wake_time TIMESTAMPTZ, quality TEXT, logged_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE public.hydration_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    glasses INTEGER NOT NULL, logged_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE public.habits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL, target_frequency TEXT, created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE public.habit_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    habit_id UUID NOT NULL REFERENCES public.habits(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Local reminders (drives expo-notifications scheduling, not a push backend)
CREATE TABLE public.reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL, scheduled_time TIME NOT NULL, repeat_pattern TEXT DEFAULT 'daily',
    enabled BOOLEAN DEFAULT TRUE, created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Nutrition content — publicly readable, not user-owned (same pattern as educational_content)
CREATE TABLE public.foods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL, category TEXT CHECK (category IN ('explore','limit')),
    description TEXT, glycemic_note TEXT, tags JSONB, created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.exercise_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sleep_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hydration_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habit_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.foods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own exercise logs" ON public.exercise_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own sleep logs" ON public.sleep_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own hydration logs" ON public.hydration_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own habits" ON public.habits FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own habit completions" ON public.habit_completions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own reminders" ON public.reminders FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone can read foods" ON public.foods FOR SELECT USING (true);

-- Seed a curated set of Nigerian foods for the Nutrition section. Educational,
-- qualitative framing only (no fabricated precise clinical/GI numbers) —
-- flagged for professional review before real production use, same as the
-- existing Learn articles.
INSERT INTO public.foods (name, category, description, glycemic_note, tags) VALUES
('Unripe plantain (boiled or amala)', 'explore', 'Higher in resistant starch and fiber than ripe plantain, which slows glucose absorption. Pairs well with a protein-rich soup.', 'Lower glycemic impact than ripe plantain or white rice.', '["fiber", "swallow"]'),
('Beans (ewa/moin moin)', 'explore', 'A plant protein and fiber source that can help with fullness and steadier blood sugar when eaten with vegetables.', 'Fiber and protein slow digestion compared to refined starches.', '["protein", "fiber"]'),
('Ofada rice', 'explore', 'A less-processed local rice variety with more fiber retained than polished white rice.', 'Less processed than polished white rice.', '["grain"]'),
('Wheat or semovita swallow', 'explore', 'A whole-grain-leaning alternative to heavily processed swallows, especially when portioned with vegetable soup.', 'Better whole-grain option than some processed swallows.', '["swallow"]'),
('Efo riro / Ewedu / Edikaikong', 'explore', 'Leafy vegetable soups rich in fiber and micronutrients that support balanced meals.', NULL, '["vegetable", "soup"]'),
('Ogbono soup', 'explore', 'Contains fiber from the ground ogbono seeds, which can support satiety.', NULL, '["soup", "fiber"]'),
('Groundnuts / tiger nuts', 'explore', 'A source of healthy fats and protein useful as a snack in moderate portions.', NULL, '["snack", "protein"]'),
('Grilled fish or chicken (suya-style, less oil)', 'explore', 'A lean protein option; grilling instead of deep-frying reduces added fat.', NULL, '["protein"]'),
('Okra soup', 'explore', 'Fiber-rich vegetable soup that pairs well with a smaller swallow portion.', NULL, '["vegetable", "soup"]'),
('Zobo (unsweetened)', 'explore', 'A hibiscus drink that can be a lower-sugar alternative to soft drinks when made without added sugar.', NULL, '["drink"]'),

('White rice (large portions)', 'limit', 'A refined starch that can raise blood sugar faster than less-processed alternatives — smaller portions with protein and vegetables are gentler.', 'Higher glycemic impact, especially in large portions.', '["grain"]'),
('Regular eba / white garri swallow', 'limit', 'A highly refined starch; pairing with fiber-rich soup and controlling portion size can help.', 'Higher glycemic impact than less-processed swallows.', '["swallow"]'),
('Sugary soft drinks and juice', 'limit', 'Adds a large amount of fast-absorbing sugar with little nutritional benefit.', 'High glycemic impact.', '["drink", "sugar"]'),
('Deep-fried foods (puff-puff, fried plantain in excess oil)', 'limit', 'High in added fat and calories; occasional, smaller portions are gentler than frequent large servings.', NULL, '["fried"]'),
('Sweetened pastries and bread', 'limit', 'Often combines refined flour and added sugar, both of which can spike blood sugar.', 'Higher glycemic impact.', '["baked", "sugar"]'),
('Processed/canned foods high in sodium', 'limit', 'High sodium intake is generally worth moderating as part of an overall balanced diet.', NULL, '["processed"]')
ON CONFLICT DO NOTHING;
