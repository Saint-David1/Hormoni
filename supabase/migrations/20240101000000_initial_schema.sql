-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    age INTEGER,
    diagnosis_status TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Health Assessments
CREATE TABLE public.health_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    answers JSONB,
    result TEXT,
    flagged BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Cycles
CREATE TABLE public.cycles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE,
    predicted_next_date DATE
);

-- 4. Symptom Logs
CREATE TABLE public.symptom_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    symptom_type TEXT NOT NULL,
    severity INTEGER CHECK (severity >= 1 AND severity <= 5),
    note TEXT,
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Weight Logs
CREATE TABLE public.weight_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    weight_value NUMERIC NOT NULL,
    unit TEXT CHECK (unit IN ('kg', 'lbs')),
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Mood Checkins
CREATE TABLE public.mood_checkins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    mood_value INTEGER CHECK (mood_value >= 1 AND mood_value <= 5),
    note TEXT,
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Journal Entries
CREATE TABLE public.journal_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    tagged_symptoms JSONB,
    include_in_summary BOOLEAN DEFAULT FALSE,
    entry_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Educational Content
CREATE TABLE public.educational_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT,
    body TEXT,
    review_status TEXT DEFAULT 'pending',
    reviewer_id UUID REFERENCES auth.users(id),
    published_at TIMESTAMP WITH TIME ZONE
);

-- 9. Providers
CREATE TABLE public.providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    credential_reference TEXT,
    verification_status TEXT DEFAULT 'pending'
);

-- 10. Guidance Requests
CREATE TABLE public.guidance_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES public.providers(id),
    data_snapshot JSONB,
    status TEXT DEFAULT 'pending',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    responded_at TIMESTAMP WITH TIME ZONE
);

-- 11. Settings
CREATE TABLE public.settings (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    notification_prefs JSONB,
    privacy_prefs JSONB,
    discreet_mode_enabled BOOLEAN DEFAULT FALSE,
    app_lock_enabled BOOLEAN DEFAULT FALSE,
    unit_prefs JSONB
);

-- 12. Consent Records
CREATE TABLE public.consent_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    policy_version TEXT NOT NULL,
    accepted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptom_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weight_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.educational_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guidance_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consent_records ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
-- Profiles: Users can select/insert/update/delete their own profile
CREATE POLICY "Users can manage their own profiles" ON public.profiles FOR ALL USING (auth.uid() = id);

-- Health Assessments
CREATE POLICY "Users can manage their own health assessments" ON public.health_assessments FOR ALL USING (auth.uid() = user_id);

-- Cycles
CREATE POLICY "Users can manage their own cycles" ON public.cycles FOR ALL USING (auth.uid() = user_id);

-- Symptom Logs
CREATE POLICY "Users can manage their own symptom logs" ON public.symptom_logs FOR ALL USING (auth.uid() = user_id);

-- Weight Logs
CREATE POLICY "Users can manage their own weight logs" ON public.weight_logs FOR ALL USING (auth.uid() = user_id);

-- Mood Checkins
CREATE POLICY "Users can manage their own mood checkins" ON public.mood_checkins FOR ALL USING (auth.uid() = user_id);

-- Journal Entries
CREATE POLICY "Users can manage their own journal entries" ON public.journal_entries FOR ALL USING (auth.uid() = user_id);

-- Settings
CREATE POLICY "Users can manage their own settings" ON public.settings FOR ALL USING (auth.uid() = user_id);

-- Consent Records
CREATE POLICY "Users can manage their own consent records" ON public.consent_records FOR ALL USING (auth.uid() = user_id);

-- Guidance Requests
CREATE POLICY "Users can manage their own guidance requests" ON public.guidance_requests FOR ALL USING (auth.uid() = user_id);

-- Educational Content: Read-only for regular users, writable by admin (needs admin role, for now just allow read for approved)
CREATE POLICY "Anyone can read approved educational content" ON public.educational_content FOR SELECT USING (review_status = 'approved');

-- Providers: Read-only for regular users (only verified)
CREATE POLICY "Anyone can read verified providers" ON public.providers FOR SELECT USING (verification_status = 'verified');
