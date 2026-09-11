-- Library expansion batch 1 of 6: reproductive anatomy basics + menstrual
-- health conditions beyond what's already seeded. Same brief-summary +
-- credible-external-link format as prior knowledge base migrations.

INSERT INTO public.knowledge_base_entries (title, category, summary, tags, external_links, review_status) VALUES

(
  'The Uterus',
  'Anatomy',
  'A muscular, pear-shaped organ where a fertilized egg implants and a fetus develops during pregnancy. Its inner lining (the endometrium) is what sheds during a period when pregnancy doesn''t occur.',
  ARRAY['anatomy', 'uterus'],
  '[{"label":"Uterus — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/body/22443-uterus"}]'::jsonb,
  'approved'
),
(
  'The Ovaries',
  'Anatomy',
  'Two small organs that store eggs (present from birth) and produce estrogen and progesterone. One ovary typically releases an egg each cycle, alternating loosely between the two.',
  ARRAY['anatomy', 'ovaries'],
  '[{"label":"Ovaries — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/body/21982-ovaries"}]'::jsonb,
  'approved'
),
(
  'The Fallopian Tubes',
  'Anatomy',
  'Thin tubes connecting each ovary to the uterus, where fertilization normally happens as an egg travels toward the uterus. Blocked or damaged tubes are a common, treatable cause of fertility difficulty.',
  ARRAY['anatomy', 'fallopian-tubes', 'fertility'],
  '[{"label":"Fallopian tubes — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/body/21980-fallopian-tubes"}]'::jsonb,
  'approved'
),
(
  'The Cervix',
  'Anatomy',
  'The lower, narrow part of the uterus that opens into the vagina. Its mucus changes texture across the cycle (a basis for fertility-awareness tracking), and it''s the site checked during a Pap smear.',
  ARRAY['anatomy', 'cervix'],
  '[{"label":"Cervix — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/body/21669-cervix"}]'::jsonb,
  'approved'
),
(
  'The Vulva vs. the Vagina',
  'Anatomy',
  'The vulva is the external genital area (including the labia and clitoris); the vagina is the internal muscular canal connecting the vulva to the cervix. The terms are often used interchangeably but refer to different structures — useful to know when describing symptoms to a doctor.',
  ARRAY['anatomy', 'vulva', 'vagina'],
  '[{"label":"Vulva and vagina — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/body/22834-vulva"}]'::jsonb,
  'approved'
),
(
  'The Pelvic Floor',
  'Anatomy',
  'A group of muscles supporting the bladder, uterus, and bowel. It can weaken from pregnancy, childbirth, or aging, contributing to issues like urinary leakage — and it can often be strengthened with targeted exercises.',
  ARRAY['anatomy', 'pelvic-floor'],
  '[{"label":"Pelvic floor — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/body/22729-pelvic-floor"}]'::jsonb,
  'approved'
),
(
  'What Actually Happens During a Period',
  'Cycle Basics',
  'A period is the shedding of the uterine lining built up in the prior cycle, triggered by a drop in progesterone when pregnancy doesn''t occur. Average blood loss is small (about 2-3 tablespoons total) even though it can feel like more.',
  ARRAY['period', 'menstruation', 'cycle'],
  '[{"label":"Menstrual cycle — Office on Women''s Health","url":"https://www.womenshealth.gov/menstrual-cycle/your-menstrual-cycle"}]'::jsonb,
  'approved'
),
(
  'Menarche (Your First Period)',
  'Life Stages',
  'The first period typically arrives between ages 10-15, a couple of years after other puberty signs like breast development begin. Cycles are often irregular for the first year or two afterward as the hormonal system matures — that''s normal, not necessarily a red flag.',
  ARRAY['menarche', 'puberty', 'life-stages'],
  '[{"label":"Menarche — Office on Women''s Health","url":"https://www.womenshealth.gov/menstrual-cycle/your-menstrual-cycle"}]'::jsonb,
  'approved'
),
(
  'Dysmenorrhea (Painful Periods)',
  'Symptoms',
  'Cramping from the uterus contracting to shed its lining, driven by prostaglandins. Mild-to-moderate cramps are common, but pain severe enough to disrupt daily life isn''t something to just accept — it can signal conditions like endometriosis or fibroids worth investigating.',
  ARRAY['dysmenorrhea', 'cramps', 'pain'],
  '[{"label":"Menstrual cramps — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/menstrual-cramps"}]'::jsonb,
  'approved'
),
(
  'Menorrhagia (Heavy Periods)',
  'Symptoms',
  'Periods heavy enough to soak through a pad or tampon every hour for several hours, last more than 7 days, or include large clots. It has many causes — including PCOS, fibroids, and thyroid issues — and is worth evaluating rather than managing silently.',
  ARRAY['menorrhagia', 'heavy-bleeding', 'symptoms'],
  '[{"label":"Heavy menstrual bleeding — CDC","url":"https://www.cdc.gov/ncbddd/blooddisorders/women/menorrhagia.html"}]'::jsonb,
  'approved'
),
(
  'Oligomenorrhea (Infrequent Periods)',
  'Symptoms',
  'Cycles longer than 35 days apart, one of the more common signs of PCOS but also seen with significant weight changes, high stress, or over-exercise. Occasional long cycles happen; a consistent pattern is worth a conversation with a doctor.',
  ARRAY['oligomenorrhea', 'irregular-periods'],
  '[{"label":"Irregular periods — Mayo Clinic","url":"https://www.mayoclinic.org/symptoms/irregular-periods/basics/definition"}]'::jsonb,
  'approved'
),
(
  'Toxic Shock Syndrome (TSS) Awareness',
  'Symptoms',
  'A rare but serious bacterial illness historically linked to prolonged tampon use, though it can occur without tampons too. Symptoms include sudden high fever, rash, and dizziness — it''s a medical emergency, not something to wait out.',
  ARRAY['tss', 'tampons', 'safety'],
  '[{"label":"Toxic shock syndrome — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/toxic-shock-syndrome"}]'::jsonb,
  'approved'
),
(
  'Choosing Menstrual Products',
  'General Wellness',
  'Pads, tampons, menstrual cups, discs, and period underwear all work by different mechanisms (absorption vs. collection) and suit different preferences and flow levels. There''s no single "correct" choice — what matters is comfort, safety practices (like following tampon wear-time guidance), and access.',
  ARRAY['menstrual-products', 'period-care'],
  '[{"label":"Menstrual hygiene products — Office on Women''s Health","url":"https://www.womenshealth.gov/menstrual-cycle/staying-healthy-during-your-period"}]'::jsonb,
  'approved'
),
(
  'Exercise During Your Period',
  'General Wellness',
  'There''s no medical reason to avoid exercise during a period, and many people find moderate activity actually eases cramps by improving blood flow and releasing endorphins. Listening to your energy levels matters more than any blanket rule.',
  ARRAY['exercise', 'period', 'lifestyle'],
  '[{"label":"Exercise and your period — Office on Women''s Health","url":"https://www.womenshealth.gov/menstrual-cycle/staying-healthy-during-your-period"}]'::jsonb,
  'approved'
),
(
  'Menstrual Migraines',
  'Symptoms',
  'Some people experience migraines timed closely to the drop in estrogen right before a period. They''re treatable, often with strategies distinct from typical migraine care, so mentioning the cycle-timing pattern to a doctor helps guide treatment.',
  ARRAY['migraine', 'headache', 'hormones'],
  '[{"label":"Menstrual migraine — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/diseases/21877-menstrual-migraine"}]'::jsonb,
  'approved'
),
(
  '"Period Flu": Why You Might Feel Sick Before Your Period',
  'Symptoms',
  'Prostaglandins released around menstruation — the same compounds causing cramps — can also trigger nausea, fatigue, headaches, and body aches that mimic flu-like symptoms. It''s not an actual infection, and it usually eases once the period starts.',
  ARRAY['period-flu', 'symptoms', 'prostaglandins'],
  '[{"label":"PMS symptoms — Office on Women''s Health","url":"https://www.womenshealth.gov/menstrual-cycle/premenstrual-syndrome"}]'::jsonb,
  'approved'
),
(
  'Breakthrough Bleeding on Hormonal Birth Control',
  'Contraception',
  'Unexpected light bleeding is common in the first few months of starting or switching hormonal birth control as your body adjusts. It usually settles on its own, but bleeding that persists past 3 months is worth discussing with a doctor.',
  ARRAY['breakthrough-bleeding', 'birth-control'],
  '[{"label":"Birth control side effects — Planned Parenthood","url":"https://www.plannedparenthood.org/learn/birth-control"}]'::jsonb,
  'approved'
),
(
  'Cycle Length Variability: What''s Normal',
  'Cycle Basics',
  'A "normal" cycle ranges from about 21 to 35 days, and some month-to-month variation (a few days) is typical even for people without PCOS. It''s a consistent pattern outside that range, not one unusual cycle, that''s worth tracking and mentioning to a doctor.',
  ARRAY['cycle-length', 'cycle-basics'],
  '[{"label":"Menstrual cycle — Office on Women''s Health","url":"https://www.womenshealth.gov/menstrual-cycle/your-menstrual-cycle"}]'::jsonb,
  'approved'
),
(
  'Cervical Mucus Changes Across the Cycle',
  'Cycle Basics',
  'Cervical mucus shifts from dry/sticky after a period to clear and stretchy (like raw egg white) near ovulation, then thicker afterward. Tracking this is one basis of fertility-awareness methods, though it can be less predictable with PCOS.',
  ARRAY['cervical-mucus', 'fertility-awareness', 'ovulation'],
  '[{"label":"Fertility awareness methods — Planned Parenthood","url":"https://www.plannedparenthood.org/learn/birth-control/fertility-awareness-based-methods-fams"}]'::jsonb,
  'approved'
),
(
  'Period Poverty',
  'General Wellness',
  'The lack of access to menstrual products, education, or sanitation due to cost or stigma — a real barrier affecting people worldwide, including in higher-income countries. Community programs and school-based initiatives are increasingly addressing this as a public health issue, not just a personal one.',
  ARRAY['period-poverty', 'access', 'public-health'],
  '[{"label":"Menstrual health — WHO","url":"https://www.who.int/health-topics/menstrual-health-and-hygiene"}]'::jsonb,
  'approved'
),
(
  'Retrograde Menstruation',
  'Cycle Basics',
  'Some menstrual blood flowing backward through the fallopian tubes into the pelvis instead of out through the vagina — thought to happen in most people to some degree, and considered a leading theory for how endometriosis develops. Having it doesn''t mean endometriosis is guaranteed.',
  ARRAY['retrograde-menstruation', 'endometriosis'],
  '[{"label":"Endometriosis causes — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/endometriosis"}]'::jsonb,
  'approved'
),
(
  'Preparing a Child for Their First Period',
  'Life Stages',
  'Talking about periods before they start — what to expect, what products are available, and that it''s a normal, healthy process — tends to reduce fear and stigma when menarche arrives. Many pediatric guidelines now recommend starting these conversations around age 8-9.',
  ARRAY['menarche', 'parenting', 'education'],
  '[{"label":"Talking about puberty — Office on Women''s Health","url":"https://www.womenshealth.gov/menstrual-cycle/your-menstrual-cycle"}]'::jsonb,
  'approved'
),
(
  'Period Blood Color: What It Might Mean',
  'Symptoms',
  'Bright red, dark brown, or even black blood are all typically normal — color mostly reflects how long blood has been in contact with air (older blood oxidizes and darkens) rather than a health problem. Consistently gray or foul-smelling discharge is different and worth checking.',
  ARRAY['period-blood', 'myths', 'symptoms'],
  '[{"label":"Period blood color — Cleveland Clinic","url":"https://health.clevelandclinic.org/period-blood-color-guide"}]'::jsonb,
  'approved'
),
(
  'Blood Clots During Your Period',
  'Symptoms',
  'Small clots (smaller than a quarter) are a normal part of heavier flow days, formed when the body''s anticoagulants can''t keep up with faster bleeding. Frequent large clots alongside heavy flow are worth mentioning to a doctor as they can indicate fibroids or other causes.',
  ARRAY['blood-clots', 'period', 'symptoms'],
  '[{"label":"Period blood clots — Cleveland Clinic","url":"https://health.clevelandclinic.org/period-blood-clots"}]'::jsonb,
  'approved'
),
(
  'Cycle Syncing: What the Evidence Actually Shows',
  'General Wellness',
  'The idea of adjusting diet and exercise to each cycle phase is popular, but rigorous evidence for its specific benefits is still limited. Paying attention to how you feel across your cycle is reasonable and can be useful — just be cautious of strong claims marketed around it.',
  ARRAY['cycle-syncing', 'wellness', 'evidence'],
  '[{"label":"Menstrual cycle and exercise — ACOG","url":"https://www.acog.org/womens-health"}]'::jsonb,
  'approved'
),
(
  'Period Sex: What to Know',
  'General Wellness',
  'Having sex during a period is safe for most people and a matter of personal preference — pregnancy is also still possible, especially with shorter or irregular cycles, so contraception still matters if that''s a goal.',
  ARRAY['period-sex', 'general-wellness'],
  '[{"label":"Sex during your period — Planned Parenthood","url":"https://www.plannedparenthood.org/learn"}]'::jsonb,
  'approved'
),
(
  'Prolonged Periods (Longer Than 7 Days)',
  'Symptoms',
  'A period lasting more than a week can be a variant of normal for some people but is also associated with fibroids, polyps, hormonal imbalance, or (rarely) bleeding disorders. It''s worth flagging, especially if it''s a change from your usual pattern.',
  ARRAY['prolonged-period', 'symptoms'],
  '[{"label":"Abnormal uterine bleeding — ACOG","url":"https://www.acog.org/womens-health/faqs/abnormal-uterine-bleeding"}]'::jsonb,
  'approved'
),
(
  'The Clitoris',
  'Anatomy',
  'An organ with erectile tissue extending internally well beyond its visible external tip, central to sexual arousal and pleasure. Its full anatomy wasn''t comprehensively mapped in medical literature until relatively recently — a notable gap in historical women''s health research.',
  ARRAY['anatomy', 'clitoris'],
  '[{"label":"Clitoris anatomy — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/body/23948-clitoris"}]'::jsonb,
  'approved'
),
(
  'Vaginal Discharge: Normal vs. a Sign to See a Doctor',
  'Symptoms',
  'Clear-to-white discharge that changes texture across the cycle is normal and helps keep the vagina clean. Discharge that''s green, gray, foul-smelling, or accompanied by itching or burning is worth getting checked, as it can signal an infection.',
  ARRAY['discharge', 'vaginal-health', 'symptoms'],
  '[{"label":"Vaginal discharge — Mayo Clinic","url":"https://www.mayoclinic.org/symptoms/vaginal-discharge/basics/definition"}]'::jsonb,
  'approved'
),
(
  'Vaginal pH and Why It Matters',
  'Vaginal Health',
  'A healthy vagina is naturally acidic (pH around 3.8-4.5), which helps prevent harmful bacteria and yeast from overgrowing. Douching, certain soaps, and some infections can disrupt this balance — which is why doctors generally advise against douching.',
  ARRAY['vaginal-ph', 'vaginal-health'],
  '[{"label":"Vaginal health — Office on Women''s Health","url":"https://www.womenshealth.gov/a-z-topics/vaginal-yeast-infections"}]'::jsonb,
  'approved'
);
