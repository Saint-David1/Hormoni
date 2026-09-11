-- Library expansion batch 5 of 6: nutrition/general wellness and broader
-- mental & emotional health topics.

INSERT INTO public.knowledge_base_entries (title, category, summary, tags, external_links, review_status) VALUES

(
  'Iron Deficiency Anemia',
  'Nutrition',
  'Menstruating women are at higher risk of low iron due to regular blood loss, especially with heavy periods. Fatigue, pale skin, and shortness of breath are common signs — a simple blood test confirms it, and it''s usually correctable with diet changes or supplements.',
  ARRAY['iron', 'anemia', 'nutrition'],
  '[{"label":"Iron deficiency anemia — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/iron-deficiency-anemia"}]'::jsonb,
  'approved'
),
(
  'Calcium Needs Across Life Stages',
  'Nutrition',
  'Calcium needs rise during adolescence, pregnancy, breastfeeding, and after menopause — periods when bone-building or bone-preserving demands increase. Dairy, leafy greens, and fortified foods are common sources alongside supplements when needed.',
  ARRAY['calcium', 'nutrition', 'bone-health'],
  '[{"label":"Calcium — NIH Office of Dietary Supplements","url":"https://ods.od.nih.gov/factsheets/Calcium-Consumer/"}]'::jsonb,
  'approved'
),
(
  'Vitamin D and Hormonal Health',
  'Nutrition',
  'Beyond bone health, vitamin D receptors are found in reproductive tissue, and deficiency has been linked in research to worse insulin resistance and cycle irregularity in PCOS. Many people run low, especially with limited sun exposure, making it a reasonable one to test for.',
  ARRAY['vitamin-d', 'nutrition', 'pcos'],
  '[{"label":"Vitamin D — NIH Office of Dietary Supplements","url":"https://ods.od.nih.gov/factsheets/VitaminD-Consumer/"}]'::jsonb,
  'approved'
),
(
  'Vitamin B12',
  'Nutrition',
  'Important for nerve function and red blood cell production; deficiency can cause fatigue and, notably, is a known side effect of long-term metformin use — worth periodic testing if you''re on that medication for PCOS.',
  ARRAY['b12', 'nutrition', 'metformin'],
  '[{"label":"Vitamin B12 — NIH Office of Dietary Supplements","url":"https://ods.od.nih.gov/factsheets/VitaminB12-Consumer/"}]'::jsonb,
  'approved'
),
(
  'Omega-3 Fatty Acids',
  'Nutrition',
  'Found in fatty fish, walnuts, and flaxseed, omega-3s have anti-inflammatory properties studied for potential benefit in insulin sensitivity and mood — a reasonable addition to a PCOS-conscious diet, though not a standalone treatment.',
  ARRAY['omega-3', 'nutrition'],
  '[{"label":"Omega-3s — NIH Office of Dietary Supplements","url":"https://ods.od.nih.gov/factsheets/Omega3FattyAcids-Consumer/"}]'::jsonb,
  'approved'
),
(
  'Gut Health and Hormones',
  'Nutrition',
  'Emerging research suggests gut bacteria influence estrogen metabolism and inflammation, both relevant to PCOS — an active area of study rather than settled science, so approach specific probiotic marketing claims with some skepticism.',
  ARRAY['gut-health', 'hormones', 'nutrition'],
  '[{"label":"Gut microbiome — NIH","url":"https://www.nih.gov/news-events/nih-research-matters/gut-microbiome"}]'::jsonb,
  'approved'
),
(
  'Fiber Intake and Blood Sugar',
  'Nutrition',
  'Fiber slows carbohydrate digestion, blunting blood sugar spikes — directly relevant to the insulin-resistance component of PCOS. Most people fall short of recommended daily fiber intake, making it a practical, low-risk place to start dietary changes.',
  ARRAY['fiber', 'blood-sugar', 'nutrition'],
  '[{"label":"Dietary fiber — Mayo Clinic","url":"https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/fiber/art-20043983"}]'::jsonb,
  'approved'
),
(
  'Protein Needs for Active Women',
  'Nutrition',
  'Protein supports muscle maintenance, satiety, and blood sugar stability — all relevant to PCOS management. Needs vary by activity level and body size, but spreading protein intake across meals (rather than one large serving) tends to be more metabolically useful.',
  ARRAY['protein', 'nutrition'],
  '[{"label":"Protein — MedlinePlus","url":"https://medlineplus.gov/proteininyourdiet.html"}]'::jsonb,
  'approved'
),
(
  'Caffeine and Hormones',
  'Nutrition',
  'Moderate caffeine intake (around 400mg/day, roughly 4 cups of coffee) is generally considered safe for most people, though it can worsen anxiety, disrupt sleep, or intensify breast tenderness for some — worth noticing your own individual sensitivity rather than assuming a universal safe amount.',
  ARRAY['caffeine', 'hormones', 'nutrition'],
  '[{"label":"Caffeine — Mayo Clinic","url":"https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/caffeine/art-20045678"}]'::jsonb,
  'approved'
),
(
  'Alcohol and Hormonal Health',
  'Nutrition',
  'Alcohol is metabolized by the liver, which also processes excess hormones — heavy use can interfere with this and worsen hormonal imbalance over time. Moderate, occasional use is a personal choice to weigh, but it''s not a neutral factor for hormone health.',
  ARRAY['alcohol', 'hormones'],
  '[{"label":"Alcohol and health — CDC","url":"https://www.cdc.gov/alcohol/fact-sheets/moderate-drinking.htm"}]'::jsonb,
  'approved'
),
(
  'Smoking and Reproductive Health',
  'General Wellness',
  'Smoking accelerates egg loss, is linked to earlier menopause, and increases risks during pregnancy — one of the more clearly evidence-backed lifestyle factors affecting reproductive health, with benefits from quitting starting almost immediately.',
  ARRAY['smoking', 'reproductive-health'],
  '[{"label":"Smoking and reproductive health — CDC","url":"https://www.cdc.gov/reproductivehealth/tobaccousepregnancy/index.htm"}]'::jsonb,
  'approved'
),
(
  'Sleep Hygiene Basics',
  'General Wellness',
  'Consistent sleep/wake times, limiting screens before bed, and a cool dark room are simple, evidence-backed steps — genuinely relevant to PCOS given the two-way relationship between poor sleep and worse insulin resistance and mood.',
  ARRAY['sleep', 'wellness'],
  '[{"label":"Sleep hygiene — CDC","url":"https://www.cdc.gov/sleep/about_sleep/sleep_hygiene.html"}]'::jsonb,
  'approved'
),
(
  'Hydration Needs',
  'General Wellness',
  'The "8 glasses a day" rule is a rough guideline, not a precise requirement — needs vary by body size, activity, and climate. Urine that''s pale yellow is a simpler practical indicator of adequate hydration than any fixed number.',
  ARRAY['hydration', 'wellness'],
  '[{"label":"Water and healthy living — CDC","url":"https://www.cdc.gov/healthyweight/healthy_eating/water-and-healthier-drinks.html"}]'::jsonb,
  'approved'
),
(
  'Strength Training for Hormonal Health',
  'General Wellness',
  'Building muscle improves insulin sensitivity, since muscle tissue is a major site of glucose uptake — making resistance training particularly relevant for PCOS-related insulin resistance, not just a tool for building strength or appearance.',
  ARRAY['exercise', 'strength-training', 'insulin'],
  '[{"label":"Strength training — CDC","url":"https://www.cdc.gov/physicalactivity/basics/adults/index.htm"}]'::jsonb,
  'approved'
),
(
  'Anxiety in Women',
  'Mental Health',
  'Anxiety disorders are diagnosed roughly twice as often in women as men, with hormonal fluctuations across the cycle, pregnancy, and menopause thought to play a contributing role alongside social and biological factors. It''s treatable through therapy, medication, or both.',
  ARRAY['anxiety', 'mental-health'],
  '[{"label":"Anxiety — NIH/NIMH","url":"https://www.nimh.nih.gov/health/topics/anxiety-disorders"}]'::jsonb,
  'approved'
),
(
  'Depression in Women',
  'Mental Health',
  'Women are diagnosed with depression at roughly twice the rate of men, with hormonal transitions (postpartum, perimenopause) representing particularly higher-risk windows. Persistent low mood, loss of interest, or hopelessness lasting more than two weeks warrants professional support.',
  ARRAY['depression', 'mental-health'],
  '[{"label":"Depression in women — NIH/NIMH","url":"https://www.nimh.nih.gov/health/publications/depression-in-women"}]'::jsonb,
  'approved'
),
(
  'Eating Disorders',
  'Mental Health',
  'Conditions like anorexia, bulimia, and binge eating disorder can develop or worsen alongside the body-image pressures common with PCOS symptoms (weight changes, hair growth). They''re serious medical conditions needing specialized treatment, not simply willpower or dieting issues.',
  ARRAY['eating-disorders', 'mental-health'],
  '[{"label":"Eating disorders — NIH/NIMH","url":"https://www.nimh.nih.gov/health/topics/eating-disorders"}]'::jsonb,
  'approved'
),
(
  'Body Dysmorphia',
  'Mental Health',
  'A preoccupation with perceived flaws in appearance that feels distressing and hard to control — distinct from ordinary body-image concerns in its intensity and impact on daily life. Cognitive behavioral therapy is a well-studied, effective treatment.',
  ARRAY['body-dysmorphia', 'mental-health'],
  '[{"label":"Body dysmorphic disorder — NIH/NIMH","url":"https://www.nimh.nih.gov/health/statistics/body-dysmorphic-disorder"}]'::jsonb,
  'approved'
),
(
  'Types of Therapy: A Brief Overview',
  'Mental Health',
  'Cognitive behavioral therapy (CBT) focuses on thought patterns, while other approaches (like ACT or psychodynamic therapy) take different angles — no single type works best for everyone, and finding the right fit sometimes takes trying more than one.',
  ARRAY['therapy', 'mental-health'],
  '[{"label":"Psychotherapies — NIH/NIMH","url":"https://www.nimh.nih.gov/health/topics/psychotherapies"}]'::jsonb,
  'approved'
),
(
  'Medication for Anxiety and Depression: What to Expect',
  'Mental Health',
  'Antidepressants and anti-anxiety medications often take several weeks to show full effect and sometimes require trying more than one to find the right fit — a normal part of the process, not a sign that treatment has failed.',
  ARRAY['medication', 'mental-health'],
  '[{"label":"Mental health medications — NIH/NIMH","url":"https://www.nimh.nih.gov/health/topics/mental-health-medications"}]'::jsonb,
  'approved'
),
(
  'Mindfulness Basics',
  'Mental Health',
  'A practice of paying attention to the present moment without judgment, with research supporting benefits for stress and anxiety symptoms. It''s a skill built with practice, not something that has to feel natural or effective immediately.',
  ARRAY['mindfulness', 'mental-health'],
  '[{"label":"Mindfulness — NIH/NCCIH","url":"https://www.nccih.nih.gov/health/meditation-and-mindfulness-what-you-need-to-know"}]'::jsonb,
  'approved'
),
(
  'The Value of Support Groups',
  'Mental Health',
  'Connecting with others navigating similar conditions (like PCOS or fertility challenges) can reduce the isolation that often comes with chronic health conditions — a complement to, not a replacement for, medical care.',
  ARRAY['support-groups', 'mental-health', 'community'],
  '[{"label":"Support groups — NIH/NIMH","url":"https://www.nimh.nih.gov/health/find-help"}]'::jsonb,
  'approved'
),
(
  'Recognizing Burnout',
  'Mental Health',
  'Chronic stress from work, caregiving, or managing a health condition can lead to emotional exhaustion, cynicism, and reduced sense of accomplishment — a real, definable state, not just "being tired," and worth addressing deliberately rather than pushing through.',
  ARRAY['burnout', 'mental-health', 'stress'],
  '[{"label":"Burnout — WHO","url":"https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases"}]'::jsonb,
  'approved'
),
(
  'Seasonal Affective Disorder (SAD)',
  'Mental Health',
  'A form of depression tied to seasonal changes, most often in fall/winter, thought to be linked to reduced light exposure affecting mood-regulating brain chemistry. Light therapy is a well-supported treatment alongside standard depression treatments.',
  ARRAY['sad', 'seasonal-depression', 'mental-health'],
  '[{"label":"Seasonal affective disorder — NIH/NIMH","url":"https://www.nimh.nih.gov/health/publications/seasonal-affective-disorder"}]'::jsonb,
  'approved'
),
(
  'Setting Boundaries for Mental Health',
  'Mental Health',
  'Clearly communicating limits — in relationships, work, or caregiving — is a learnable skill linked to lower stress and better emotional health, not a selfish act. It often takes practice, especially for people used to prioritizing others'' needs first.',
  ARRAY['boundaries', 'mental-health'],
  '[{"label":"Healthy relationships — Office on Women''s Health","url":"https://www.womenshealth.gov/relationships-and-safety/healthy-relationships"}]'::jsonb,
  'approved'
),
(
  'When to Seek Professional Mental Health Support',
  'Mental Health',
  'Symptoms lasting more than two weeks, interfering with daily functioning, or including thoughts of self-harm are clear signals to reach out — but you don''t need to hit a crisis point to benefit from talking to a therapist. Struggling "enough" isn''t a prerequisite for support.',
  ARRAY['mental-health', 'therapy', 'when-to-seek-help'],
  '[{"label":"Find help — NIH/NIMH","url":"https://www.nimh.nih.gov/health/find-help"}]'::jsonb,
  'approved'
),
(
  'Grief After Pregnancy Loss',
  'Mental Health',
  'Grief after miscarriage or stillbirth is valid regardless of how early the loss occurred or how the outside world responds to it — and it doesn''t follow a fixed timeline. Specialized grief counselors and support groups exist specifically for this kind of loss.',
  ARRAY['grief', 'pregnancy-loss', 'mental-health'],
  '[{"label":"Coping with pregnancy loss — ACOG","url":"https://www.acog.org/womens-health/faqs/early-pregnancy-loss"}]'::jsonb,
  'approved'
),
(
  'Self-Care vs. Self-Indulgence',
  'Mental Health',
  'Genuine self-care (sleep, boundaries, medical care, movement) supports long-term wellbeing, while marketing sometimes conflates it with purchases or short-term comfort. Both can have a place — the distinction is whether it''s actually restoring you or just distracting you.',
  ARRAY['self-care', 'mental-health', 'wellness'],
  '[{"label":"Self-care — NIH/NIMH","url":"https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health"}]'::jsonb,
  'approved'
),
(
  'Healthy Relationships',
  'General Wellness',
  'Mutual respect, honest communication, and both people''s needs being considered are hallmarks of healthy relationships — patterns worth recognizing (and their absence worth taking seriously) in romantic, family, or friend relationships alike.',
  ARRAY['relationships', 'general-wellness'],
  '[{"label":"Healthy relationships — Office on Women''s Health","url":"https://www.womenshealth.gov/relationships-and-safety/healthy-relationships"}]'::jsonb,
  'approved'
),
(
  'Recognizing Relationship Red Flags',
  'General Wellness',
  'Controlling behavior, isolation from friends/family, or reproductive coercion (pressuring someone about pregnancy or contraception) are serious warning signs, not "normal relationship friction." Confidential support is available through domestic violence hotlines if needed.',
  ARRAY['relationships', 'safety'],
  '[{"label":"Relationship safety — Office on Women''s Health","url":"https://www.womenshealth.gov/relationships-and-safety"}]'::jsonb,
  'approved'
);
