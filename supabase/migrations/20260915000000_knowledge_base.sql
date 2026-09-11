-- Replaces the old canned-response "Ask the Advisor" chatbot with a real,
-- admin-curated, searchable knowledge base ("Library" in the app) covering
-- PCOS and broader female-health topics — a brief summary plus links to
-- credible external sources, distinct from the long-form articles in
-- educational_content (the Learn tab).
CREATE TABLE public.knowledge_base_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    summary TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    external_links JSONB DEFAULT '[]', -- [{ "label": "...", "url": "..." }]
    review_status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.knowledge_base_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read approved knowledge base entries" ON public.knowledge_base_entries
  FOR SELECT USING (review_status = 'approved');

CREATE POLICY "Admins can manage knowledge base entries" ON public.knowledge_base_entries
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- Seed a handful of entries so the Library isn't empty on first use. Building
-- out real breadth here is ongoing admin-panel content work.
INSERT INTO public.knowledge_base_entries (title, category, summary, tags, external_links, review_status) VALUES
(
  'PCOS',
  'PCOS',
  'Polycystic Ovary Syndrome is a common hormonal condition involving irregular ovulation, elevated androgens, and/or polycystic ovaries on ultrasound. It affects an estimated 1 in 10 people with ovaries and looks different from person to person.',
  ARRAY['pcos', 'hormones', 'diagnosis'],
  '[{"label":"PCOS overview — Office on Women''s Health (US)","url":"https://www.womenshealth.gov/a-z-topics/polycystic-ovary-syndrome"},{"label":"PCOS — World Health Organization","url":"https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome"}]'::jsonb,
  'approved'
),
(
  'Insulin Resistance',
  'PCOS',
  'A condition where the body''s cells respond less effectively to insulin, often leading to higher blood sugar and insulin levels. It''s common in PCOS and is linked to weight, energy, and cycle irregularity, though it doesn''t affect everyone with PCOS.',
  ARRAY['insulin', 'metabolism', 'pcos'],
  '[{"label":"Insulin resistance — NIH/NIDDK","url":"https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-diabetes/prediabetes-insulin-resistance"}]'::jsonb,
  'approved'
),
(
  'Ovulation',
  'Cycle Basics',
  'The release of an egg from an ovary, typically around the midpoint of a menstrual cycle. Irregular or absent ovulation is one of the core features of PCOS and is the reason cycles can be unpredictable.',
  ARRAY['ovulation', 'cycle'],
  '[{"label":"Ovulation overview — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/articles/23439-ovulation"}]'::jsonb,
  'approved'
),
(
  'Amenorrhea',
  'Cycle Basics',
  'The absence of menstrual periods — for at least 3 months if periods were previously regular, or 6 months if they were already irregular. It has many possible causes, including PCOS, and is worth discussing with a doctor rather than waiting it out indefinitely.',
  ARRAY['amenorrhea', 'periods', 'cycle'],
  '[{"label":"Amenorrhea — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/amenorrhea/symptoms-causes/syc-20369299"}]'::jsonb,
  'approved'
),
(
  'Hirsutism',
  'Symptoms',
  'Excess hair growth in a male-pattern distribution (face, chest, back), often driven by elevated androgens. It''s one of the more visible PCOS symptoms and is treatable through several approaches, from cosmetic to medical.',
  ARRAY['hirsutism', 'androgens', 'symptoms'],
  '[{"label":"Hirsutism — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/hirsutism/symptoms-causes/syc-20354935"}]'::jsonb,
  'approved'
),
(
  'Endometriosis',
  'Related Conditions',
  'A condition where tissue similar to the uterine lining grows outside the uterus, often causing pelvic pain and heavier periods. It''s a distinct condition from PCOS but shares some overlapping symptoms, so an accurate diagnosis matters.',
  ARRAY['endometriosis', 'pain', 'related-conditions'],
  '[{"label":"Endometriosis — WHO","url":"https://www.who.int/news-room/fact-sheets/detail/endometriosis"}]'::jsonb,
  'approved'
),
(
  'Basal Body Temperature (BBT)',
  'Cycle Basics',
  'Your body''s temperature at rest, which rises slightly after ovulation. Tracking it over time can help identify ovulation patterns, though it''s less reliable on its own for people with PCOS due to less predictable ovulation.',
  ARRAY['bbt', 'fertility', 'tracking'],
  '[{"label":"BBT charting — American Pregnancy Association","url":"https://americanpregnancy.org/getting-pregnant/basal-body-temperature/"}]'::jsonb,
  'approved'
),
(
  'Postpartum Depression vs. Baby Blues',
  'Mental Health',
  '"Baby blues" are mild mood changes in the first two weeks after childbirth that resolve on their own. Postpartum depression is more intense, lasts longer, and needs treatment — the distinction matters because one needs medical support and the other usually doesn''t.',
  ARRAY['mental-health', 'postpartum'],
  '[{"label":"Postpartum depression — CDC","url":"https://www.cdc.gov/reproductivehealth/depression/index.htm"}]'::jsonb,
  'approved'
);
