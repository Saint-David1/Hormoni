-- Substantially expands the Library beyond the initial 8 entries seeded in
-- 20260915000000_knowledge_base.sql, per explicit request for broader,
-- genuinely useful coverage of PCOS and female health topics. Same
-- brief-summary + credible-external-link format; admin panel remains the
-- place to keep expanding and editing this going forward.

INSERT INTO public.knowledge_base_entries (title, category, summary, tags, external_links, review_status) VALUES

(
  'The Rotterdam Criteria',
  'PCOS',
  'The most widely used diagnostic framework for PCOS, requiring at least two of three features: irregular/absent ovulation, elevated androgens, or polycystic ovaries on ultrasound. It''s why PCOS presentations vary so much from person to person — you don''t need every feature to be diagnosed.',
  ARRAY['pcos', 'diagnosis', 'rotterdam-criteria'],
  '[{"label":"PCOS diagnosis — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/pcos"}]'::jsonb,
  'approved'
),
(
  'PCOS Phenotypes',
  'PCOS',
  'Because diagnosis only requires two of three Rotterdam criteria, there are recognized "phenotypes" of PCOS — some with more pronounced insulin resistance, others with more androgen-related symptoms, others closer to regular ovulation. This is part of why one treatment approach doesn''t fit everyone.',
  ARRAY['pcos', 'phenotypes'],
  '[{"label":"PCOS overview — NICHD (NIH)","url":"https://www.nichd.nih.gov/health/topics/pcos"}]'::jsonb,
  'approved'
),
(
  'Long-Term Health Risks Linked to PCOS',
  'PCOS',
  'Beyond cycle and fertility effects, PCOS is associated with higher long-term risk of type 2 diabetes, cardiovascular disease, and endometrial cancer (from prolonged unopposed estrogen when ovulation is infrequent). This is why regular checkups matter even when day-to-day symptoms feel manageable.',
  ARRAY['pcos', 'long-term-health', 'diabetes'],
  '[{"label":"PCOS health risks — CDC","url":"https://www.cdc.gov/diabetes/risk-factors/pcos-diabetes.html"}]'::jsonb,
  'approved'
),
(
  'The Follicular Phase',
  'Cycle Basics',
  'The first half of the cycle, starting on the first day of a period and ending at ovulation. Estrogen rises as the body prepares an egg for release. Its length is the main reason total cycle length varies — the luteal phase afterward is usually more consistent.',
  ARRAY['follicular-phase', 'cycle'],
  '[{"label":"Menstrual cycle phases — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/articles/10132-menstrual-cycle"}]'::jsonb,
  'approved'
),
(
  'The Luteal Phase',
  'Cycle Basics',
  'The second half of the cycle, from ovulation to the next period, typically lasting 12-14 days fairly consistently. Progesterone dominates this phase, which is why PMS-type symptoms cluster here. A luteal phase consistently shorter than 10 days is worth mentioning to a doctor.',
  ARRAY['luteal-phase', 'cycle', 'pms'],
  '[{"label":"Luteal phase — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/articles/24417-luteal-phase"}]'::jsonb,
  'approved'
),
(
  'Anovulatory Cycles',
  'Cycle Basics',
  'A menstrual-like bleed can happen without ovulation actually occurring — common in PCOS. These cycles are often less predictable in length and flow than ovulatory ones, which is part of why cycle tracking alone can''t confirm ovulation with certainty.',
  ARRAY['ovulation', 'anovulation', 'pcos'],
  '[{"label":"Anovulation — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/diseases/23336-anovulation"}]'::jsonb,
  'approved'
),
(
  'Spotting Between Periods',
  'Cycle Basics',
  'Light bleeding outside your expected period has many possible causes — ovulation, hormonal birth control adjustment, or hormonal fluctuation from PCOS itself. Occasional spotting usually isn''t urgent, but frequent or heavy spotting is worth discussing with a doctor.',
  ARRAY['spotting', 'bleeding', 'cycle'],
  '[{"label":"Spotting between periods — Mayo Clinic","url":"https://www.mayoclinic.org/symptoms/spotting/basics/definition"}]'::jsonb,
  'approved'
),
(
  'Perimenopause',
  'Life Stages',
  'The transitional years before menopause, often starting in the 40s (sometimes earlier), marked by increasingly irregular cycles as hormone levels fluctuate. PCOS and perimenopause can look similar on paper (irregular cycles), so age and symptom pattern both matter for telling them apart.',
  ARRAY['perimenopause', 'menopause', 'life-stages'],
  '[{"label":"Perimenopause — Office on Women''s Health","url":"https://www.womenshealth.gov/menopause/menopause-basics"}]'::jsonb,
  'approved'
),
(
  'Hormonal Acne',
  'Symptoms',
  'Acne linked to androgen levels tends to cluster along the jawline and chin and can flare with cycle phase. It''s a common PCOS symptom because of elevated androgens, and it usually responds to the same range of treatments as other acne, sometimes alongside hormonal approaches.',
  ARRAY['acne', 'androgens', 'symptoms'],
  '[{"label":"Hormonal acne — MedlinePlus","url":"https://medlineplus.gov/acne.html"}]'::jsonb,
  'approved'
),
(
  'Androgenic Alopecia (Hair Thinning)',
  'Symptoms',
  'Thinning at the crown or widening part line, distinct from hirsutism (excess body/facial hair) — both can stem from the same elevated androgens in PCOS, just affecting different hair follicles differently. It''s treatable, and a dermatologist can help identify the best approach for your situation.',
  ARRAY['hair-loss', 'alopecia', 'androgens'],
  '[{"label":"Hair loss — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/hair-loss"}]'::jsonb,
  'approved'
),
(
  'Fatigue and PCOS',
  'Symptoms',
  'Persistent tiredness is a commonly under-discussed PCOS symptom, often tied to insulin resistance, disrupted sleep (including higher sleep apnea rates), or the mental load of managing a chronic condition. It''s a legitimate symptom to log and raise with a doctor, not something to just push through.',
  ARRAY['fatigue', 'symptoms', 'energy'],
  '[{"label":"Fatigue — MedlinePlus","url":"https://medlineplus.gov/fatigue.html"}]'::jsonb,
  'approved'
),
(
  'Combined Hormonal Birth Control',
  'Contraception',
  'Pills, patches, and rings containing estrogen and progestin are often used to regulate cycles and reduce androgen-related symptoms in PCOS, separate from their use as contraception. They manage symptoms rather than treat the underlying condition — worth understanding when weighing options with a doctor.',
  ARRAY['birth-control', 'contraception', 'hormones'],
  '[{"label":"Combined hormonal birth control — Planned Parenthood","url":"https://www.plannedparenthood.org/learn/birth-control/birth-control-pill"}]'::jsonb,
  'approved'
),
(
  'Non-Hormonal Contraception Options',
  'Contraception',
  'Copper IUDs, condoms, and fertility-awareness methods avoid added hormones entirely. Fertility-awareness methods are typically less reliable for people with PCOS specifically, since irregular ovulation makes calendar-based tracking harder to trust for this purpose.',
  ARRAY['contraception', 'non-hormonal'],
  '[{"label":"Birth control options — Office on Women''s Health","url":"https://www.womenshealth.gov/a-z-topics/birth-control-methods"}]'::jsonb,
  'approved'
),
(
  'Understanding Hormone Blood Tests (LH, FSH, Testosterone, AMH)',
  'Tests & Screening',
  'LH and FSH help assess ovulation patterns (an elevated LH:FSH ratio is common in PCOS, though not required for diagnosis). Testosterone checks for elevated androgens. AMH reflects ovarian reserve and is often higher in PCOS. None of these alone diagnoses PCOS — they''re interpreted together with symptoms.',
  ARRAY['blood-tests', 'lh', 'fsh', 'testosterone', 'amh'],
  '[{"label":"Hormone testing — MedlinePlus","url":"https://medlineplus.gov/lab-tests/hormone-levels-testing/"}]'::jsonb,
  'approved'
),
(
  'Pelvic Ultrasound',
  'Tests & Screening',
  'Used to look at ovary structure and check for the follicle pattern associated with PCOS. Having many small follicles visible on ultrasound is common and, on its own, doesn''t mean you have PCOS — it''s one of three Rotterdam criteria, not a standalone diagnosis.',
  ARRAY['ultrasound', 'tests', 'diagnosis'],
  '[{"label":"Pelvic ultrasound — Mayo Clinic","url":"https://www.mayoclinic.org/tests-procedures/pelvic-ultrasound"}]'::jsonb,
  'approved'
),
(
  'Metformin for PCOS',
  'Treatment',
  'Originally a diabetes medication, metformin is commonly prescribed off-label for PCOS to improve insulin sensitivity, which can help with cycle regularity and metabolic symptoms for some people. Like any medication, it has side effects and isn''t right for everyone — a doctor can weigh it against your specific situation.',
  ARRAY['metformin', 'treatment', 'insulin'],
  '[{"label":"Metformin — MedlinePlus","url":"https://medlineplus.gov/druginfo/meds/a696005.html"}]'::jsonb,
  'approved'
),
(
  'Inositol Supplements',
  'Treatment',
  'Myo-inositol and D-chiro-inositol are supplements studied for insulin sensitivity and cycle regularity in PCOS, with some promising but still-developing evidence. As with any supplement, quality and dosing vary widely between products, and it''s worth discussing with a doctor rather than self-prescribing based on marketing claims.',
  ARRAY['inositol', 'supplements', 'treatment'],
  '[{"label":"Inositol — NIH Office of Dietary Supplements","url":"https://ods.od.nih.gov/factsheets/list-all/"}]'::jsonb,
  'approved'
),
(
  'Thyroid Disorders and Cycle Irregularity',
  'Related Conditions',
  'Both an underactive and overactive thyroid can cause irregular or absent periods, sometimes mimicking PCOS. Because thyroid issues are common and very treatable, doctors typically test thyroid function when investigating irregular cycles, alongside PCOS-specific tests.',
  ARRAY['thyroid', 'related-conditions', 'cycle'],
  '[{"label":"Thyroid disease — Office on Women''s Health","url":"https://www.womenshealth.gov/a-z-topics/thyroid-disease"}]'::jsonb,
  'approved'
),
(
  'PMDD (Premenstrual Dysphoric Disorder)',
  'Mental Health',
  'A severe form of PMS involving significant mood symptoms — intense irritability, anxiety, or depression — in the week or two before a period, resolving shortly after it starts. It''s a recognized medical condition with treatment options, not something to dismiss as "just PMS."',
  ARRAY['pmdd', 'mental-health', 'pms'],
  '[{"label":"PMDD — Office on Women''s Health","url":"https://www.womenshealth.gov/menstrual-cycle/premenstrual-syndrome"}]'::jsonb,
  'approved'
),
(
  'Adenomyosis',
  'Related Conditions',
  'A condition where uterine-lining-like tissue grows into the muscular wall of the uterus, often causing heavy periods and cramping. It''s distinct from both PCOS and endometriosis, though symptoms can overlap, so imaging and a specialist''s evaluation help tell them apart.',
  ARRAY['adenomyosis', 'related-conditions', 'pain'],
  '[{"label":"Adenomyosis — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/adenomyosis"}]'::jsonb,
  'approved'
),
(
  'Miscarriage: What''s Known',
  'Fertility',
  'Miscarriage is common — occurring in an estimated 10-20% of known pregnancies, most often from chromosomal factors unrelated to anything the pregnant person did. PCOS is associated with a somewhat higher miscarriage rate, but most people with PCOS who conceive go on to have successful pregnancies. Grief after loss is valid regardless of the statistics.',
  ARRAY['miscarriage', 'fertility', 'pregnancy-loss'],
  '[{"label":"Miscarriage — ACOG","url":"https://www.acog.org/womens-health/faqs/early-pregnancy-loss"}]'::jsonb,
  'approved'
),
(
  'IVF Basics',
  'Fertility',
  'In vitro fertilization involves retrieving eggs, fertilizing them in a lab, and transferring a resulting embryo to the uterus. It''s one option among several for PCOS-related fertility challenges — often considered after simpler approaches like ovulation-inducing medication, not usually the first step.',
  ARRAY['ivf', 'fertility', 'treatment'],
  '[{"label":"IVF — Mayo Clinic","url":"https://www.mayoclinic.org/tests-procedures/in-vitro-fertilization"}]'::jsonb,
  'approved'
),
(
  'Body Image and PCOS',
  'Mental Health',
  'Symptoms like weight changes, acne, and hair growth patterns can affect body image and self-esteem, and it''s common for this to weigh as heavily as the physical symptoms themselves. This is a legitimate thing to bring to a therapist, not a lesser concern than the "medical" side of PCOS.',
  ARRAY['body-image', 'mental-health', 'pcos'],
  '[{"label":"Body image resources — Office on Women''s Health","url":"https://www.womenshealth.gov/mental-health/mental-health-conditions/body-image"}]'::jsonb,
  'approved'
),
(
  'Stress, Cortisol, and Your Cycle',
  'Mental Health',
  'Chronic stress raises cortisol, which can interact with the same hormonal pathways involved in ovulation and insulin sensitivity — meaning high stress periods can coincide with worse cycle or symptom patterns. It''s one more reason stress management is a legitimate part of PCOS care, not just a wellness add-on.',
  ARRAY['stress', 'cortisol', 'mental-health'],
  '[{"label":"Stress and your health — Office on Women''s Health","url":"https://www.womenshealth.gov/mental-health/good-mental-health/stress-and-your-health"}]'::jsonb,
  'approved'
),
(
  'Sleep Apnea and PCOS',
  'Related Conditions',
  'People with PCOS have higher rates of obstructive sleep apnea than the general population, independent of weight — likely tied to hormonal factors. Loud snoring, gasping during sleep, or persistent daytime exhaustion are worth raising with a doctor; sleep apnea is very treatable once identified.',
  ARRAY['sleep-apnea', 'sleep', 'related-conditions'],
  '[{"label":"Sleep apnea — MedlinePlus","url":"https://medlineplus.gov/sleepapnea.html"}]'::jsonb,
  'approved'
),
(
  'Endometrial Health and PCOS',
  'PCOS',
  'When ovulation is infrequent, the uterine lining can build up without the regular shedding a period provides, which over time raises endometrial cancer risk. This is a key reason doctors care about cycle regularity in PCOS beyond fertility — hormonal birth control or periodic progestin is often used specifically to manage this risk.',
  ARRAY['pcos', 'endometrial-health', 'long-term-health'],
  '[{"label":"Endometrial hyperplasia — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/diseases/15507-endometrial-hyperplasia"}]'::jsonb,
  'approved'
);
