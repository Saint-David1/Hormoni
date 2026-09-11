-- Library expansion batch 2 of 6: fertility/conception basics and
-- vaginal/urinary/sexual health topics.

INSERT INTO public.knowledge_base_entries (title, category, summary, tags, external_links, review_status) VALUES

(
  'The Fertile Window',
  'Fertility',
  'The days in a cycle when pregnancy is possible — roughly the 5 days before ovulation plus the day of ovulation itself, since sperm can survive several days while an egg survives about 24 hours. With PCOS, a less predictable ovulation timing makes this window harder to pinpoint from the calendar alone.',
  ARRAY['fertile-window', 'fertility', 'conception'],
  '[{"label":"Fertile window — Office on Women''s Health","url":"https://www.womenshealth.gov/pregnancy/you-get-pregnant/trying-conceive"}]'::jsonb,
  'approved'
),
(
  'Ovulation Predictor Kits',
  'Fertility',
  'These detect a surge in luteinizing hormone (LH) that typically precedes ovulation by 24-36 hours. With PCOS, chronically elevated LH can sometimes cause false or unclear results, so kits may need to be paired with other tracking methods.',
  ARRAY['ovulation-kits', 'fertility', 'tracking'],
  '[{"label":"Ovulation testing — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/diagnostics/24448-ovulation-test"}]'::jsonb,
  'approved'
),
(
  'Egg Freezing (Fertility Preservation)',
  'Fertility',
  'A process of retrieving and freezing unfertilized eggs for potential future use, sometimes considered by people wanting to delay childbearing or before medical treatments that could affect fertility. Success depends heavily on age at freezing — it''s worth a detailed conversation with a fertility specialist about realistic odds.',
  ARRAY['egg-freezing', 'fertility-preservation'],
  '[{"label":"Egg freezing — ACOG","url":"https://www.acog.org/womens-health/faqs/fertility-preservation"}]'::jsonb,
  'approved'
),
(
  'Unexplained Infertility',
  'Fertility',
  'A diagnosis given when standard testing doesn''t identify a clear cause after a year of trying (or 6 months if over 35) — accounting for a meaningful share of fertility cases. It doesn''t mean nothing can be done; treatment often proceeds empirically based on what tends to help.',
  ARRAY['infertility', 'fertility'],
  '[{"label":"Unexplained infertility — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/female-infertility"}]'::jsonb,
  'approved'
),
(
  'Male Factor Infertility',
  'Fertility',
  'Sperm-related issues contribute to roughly 40-50% of infertility cases, either alone or combined with a female-side factor — which is why fertility evaluation typically involves both partners, not just the person trying to conceive.',
  ARRAY['male-fertility', 'infertility'],
  '[{"label":"Male infertility — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/male-infertility"}]'::jsonb,
  'approved'
),
(
  'Secondary Infertility',
  'Fertility',
  'Difficulty conceiving after a previous successful pregnancy — surprisingly common and often just as emotionally difficult as primary infertility, sometimes dismissed because "you already have a child." The causes and treatment approach are largely the same as primary infertility evaluation.',
  ARRAY['secondary-infertility', 'fertility'],
  '[{"label":"Secondary infertility — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/diseases/16082-infertility"}]'::jsonb,
  'approved'
),
(
  'Recurrent Pregnancy Loss',
  'Fertility',
  'Defined as two or more consecutive miscarriages, this warrants a dedicated medical workup (looking at genetics, uterine structure, hormones, and clotting factors) rather than being treated as "just bad luck" after the second loss.',
  ARRAY['recurrent-miscarriage', 'fertility', 'pregnancy-loss'],
  '[{"label":"Recurrent pregnancy loss — ACOG","url":"https://www.acog.org/womens-health/faqs/repeated-miscarriages"}]'::jsonb,
  'approved'
),
(
  'Ectopic Pregnancy',
  'Fertility',
  'A pregnancy implanting outside the uterus, most often in a fallopian tube — not viable and a medical emergency if the tube ruptures. Sharp one-sided pelvic pain with a positive pregnancy test needs urgent medical attention, not a wait-and-see approach.',
  ARRAY['ectopic-pregnancy', 'emergency', 'fertility'],
  '[{"label":"Ectopic pregnancy — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/ectopic-pregnancy"}]'::jsonb,
  'approved'
),
(
  'Molar Pregnancy',
  'Fertility',
  'A rare, non-viable pregnancy where abnormal tissue grows in the uterus instead of a normal embryo, caused by a chromosomal error at fertilization. It requires medical treatment to remove the tissue and follow-up monitoring — and doesn''t reflect anything the pregnant person did.',
  ARRAY['molar-pregnancy', 'pregnancy-loss'],
  '[{"label":"Molar pregnancy — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/molar-pregnancy"}]'::jsonb,
  'approved'
),
(
  'Chemical Pregnancy',
  'Fertility',
  'A very early pregnancy loss occurring around the time a period would be due, often before it would even be detected without a sensitive test. It''s extremely common and usually indicates nothing about future pregnancy chances.',
  ARRAY['chemical-pregnancy', 'pregnancy-loss'],
  '[{"label":"Early pregnancy loss — ACOG","url":"https://www.acog.org/womens-health/faqs/early-pregnancy-loss"}]'::jsonb,
  'approved'
),
(
  'Intrauterine Insemination (IUI)',
  'Fertility',
  'A fertility treatment placing prepared sperm directly into the uterus around ovulation, often tried before more involved options like IVF. It''s frequently combined with ovulation-inducing medication for people with PCOS-related ovulation issues.',
  ARRAY['iui', 'fertility', 'treatment'],
  '[{"label":"IUI — Mayo Clinic","url":"https://www.mayoclinic.org/tests-procedures/intrauterine-insemination"}]'::jsonb,
  'approved'
),
(
  'Ovulation Induction Medications (Clomid & Letrozole)',
  'Fertility',
  'Both stimulate ovulation and are commonly used first-line for PCOS-related infertility; letrozole is now often preferred as research has shown better pregnancy rates for PCOS specifically. Response and side effects vary, which is why monitoring during treatment matters.',
  ARRAY['clomid', 'letrozole', 'fertility', 'pcos'],
  '[{"label":"Ovulation induction — ACOG","url":"https://www.acog.org/womens-health"}]'::jsonb,
  'approved'
),
(
  'Donor Eggs and Donor Sperm',
  'Fertility',
  'Options when using one''s own eggs or sperm isn''t possible or desired — a well-established path to parenthood with its own medical and legal processes. Clinics typically provide counseling to help navigate the emotional and practical considerations involved.',
  ARRAY['donor-eggs', 'donor-sperm', 'fertility'],
  '[{"label":"Third-party reproduction — ASRM","url":"https://www.reproductivefacts.org/"}]'::jsonb,
  'approved'
),
(
  'Preconception Health Checkup',
  'Fertility',
  'A visit before trying to conceive to review medications, vaccinations, chronic conditions (including PCOS), and nutrition — a chance to address modifiable factors ahead of time rather than only after conception.',
  ARRAY['preconception', 'fertility', 'planning'],
  '[{"label":"Preconception health — CDC","url":"https://www.cdc.gov/preconception/index.html"}]'::jsonb,
  'approved'
),
(
  'Folic Acid Before and During Pregnancy',
  'Fertility',
  'Recommended starting at least a month before trying to conceive, folic acid significantly reduces the risk of neural tube defects, which form very early in pregnancy — often before someone knows they''re pregnant.',
  ARRAY['folic-acid', 'pregnancy', 'nutrition'],
  '[{"label":"Folic acid — CDC","url":"https://www.cdc.gov/ncbddd/folicacid/index.html"}]'::jsonb,
  'approved'
),
(
  'Age and Fertility Decline',
  'Fertility',
  'Egg quantity and quality decline gradually through the 30s and more sharply after 35 — a biological reality worth knowing, though individual variation is significant and PCOS can sometimes mean a slower decline in egg count specifically (while other factors still apply).',
  ARRAY['age', 'fertility', 'egg-quality'],
  '[{"label":"Age and fertility — ACOG","url":"https://www.acog.org/womens-health/faqs/having-a-baby-after-age-35"}]'::jsonb,
  'approved'
),
(
  'Common Fertility Myths',
  'Fertility',
  'Popular claims — like specific sex positions affecting conception odds, or that stress alone causes infertility — mostly lack solid evidence. Reliable fertility information is best sourced from a doctor or reproductive endocrinologist rather than social media trends.',
  ARRAY['fertility-myths', 'fertility'],
  '[{"label":"Fertility facts — ASRM","url":"https://www.reproductivefacts.org/"}]'::jsonb,
  'approved'
),
(
  'Urinary Tract Infections (UTIs)',
  'Urinary Health',
  'A bacterial infection of the urinary tract, far more common in women due to a shorter urethra. Burning with urination, urgency, and pelvic discomfort are typical signs — UTIs are very treatable with antibiotics but shouldn''t be left untreated, as they can spread to the kidneys.',
  ARRAY['uti', 'urinary-health'],
  '[{"label":"UTIs — Office on Women''s Health","url":"https://www.womenshealth.gov/a-z-topics/urinary-tract-infections"}]'::jsonb,
  'approved'
),
(
  'Interstitial Cystitis (Painful Bladder Syndrome)',
  'Urinary Health',
  'A chronic condition causing bladder pressure and pain without infection, sometimes mistaken for recurrent UTIs. It''s harder to diagnose and treat than a typical UTI, often needing a specialist familiar with chronic pelvic pain conditions.',
  ARRAY['interstitial-cystitis', 'urinary-health', 'chronic-pain'],
  '[{"label":"Interstitial cystitis — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/interstitial-cystitis"}]'::jsonb,
  'approved'
),
(
  'Yeast Infections',
  'Vaginal Health',
  'An overgrowth of naturally occurring Candida fungus, causing itching, thick discharge, and irritation. Very common and treatable with over-the-counter or prescription antifungals — though recurrent infections (4+ per year) warrant a doctor''s evaluation for underlying causes.',
  ARRAY['yeast-infection', 'vaginal-health'],
  '[{"label":"Yeast infections — Office on Women''s Health","url":"https://www.womenshealth.gov/a-z-topics/vaginal-yeast-infections"}]'::jsonb,
  'approved'
),
(
  'Bacterial Vaginosis (BV)',
  'Vaginal Health',
  'An imbalance of naturally occurring vaginal bacteria, causing thin gray discharge with a distinct odor — the most common vaginal condition in reproductive-age women, though many cases have no symptoms at all. It''s treated differently than a yeast infection, so an accurate diagnosis matters.',
  ARRAY['bacterial-vaginosis', 'vaginal-health'],
  '[{"label":"Bacterial vaginosis — CDC","url":"https://www.cdc.gov/std/bv/default.htm"}]'::jsonb,
  'approved'
),
(
  'Vaginal Dryness',
  'Vaginal Health',
  'Can result from lower estrogen (during breastfeeding, perimenopause, or on certain birth control), certain medications, or reduced arousal — not something to just tolerate, since lubricants, moisturizers, and other treatments can genuinely help.',
  ARRAY['vaginal-dryness', 'vaginal-health'],
  '[{"label":"Vaginal dryness — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/vaginal-dryness"}]'::jsonb,
  'approved'
),
(
  'Pelvic Inflammatory Disease (PID)',
  'Related Conditions',
  'An infection of the reproductive organs, often resulting from an untreated STI like chlamydia or gonorrhea spreading upward. Left untreated it can cause chronic pain and fertility damage, which is why prompt treatment of the underlying infection matters.',
  ARRAY['pid', 'related-conditions', 'sti'],
  '[{"label":"PID — CDC","url":"https://www.cdc.gov/std/pid/default.htm"}]'::jsonb,
  'approved'
),
(
  'STIs: An Overview',
  'Sexual Health',
  'Sexually transmitted infections range from easily treated (chlamydia, gonorrhea) to manageable chronic conditions (herpes, HIV) — regular testing based on your risk factors, not just symptoms, is the most reliable way to catch and treat them early.',
  ARRAY['sti', 'sexual-health'],
  '[{"label":"STIs — CDC","url":"https://www.cdc.gov/std/default.htm"}]'::jsonb,
  'approved'
),
(
  'Chlamydia',
  'Sexual Health',
  'One of the most common STIs, often causing no symptoms at all — which is exactly why routine screening matters, since untreated chlamydia can lead to PID and fertility problems. It''s fully curable with antibiotics.',
  ARRAY['chlamydia', 'sti'],
  '[{"label":"Chlamydia — CDC","url":"https://www.cdc.gov/std/chlamydia/default.htm"}]'::jsonb,
  'approved'
),
(
  'HPV (Human Papillomavirus)',
  'Sexual Health',
  'Extremely common — most sexually active people encounter it at some point, and most infections clear on their own. Persistent infection with certain high-risk strains is the main cause of cervical cancer, which is why the HPV vaccine and regular screening both matter.',
  ARRAY['hpv', 'sti', 'cervical-health'],
  '[{"label":"HPV — CDC","url":"https://www.cdc.gov/hpv/index.html"}]'::jsonb,
  'approved'
),
(
  'The HPV Vaccine',
  'Sexual Health',
  'Recommended starting around ages 11-12 (though approved through age 45), it protects against the HPV strains responsible for most cervical cancers and genital warts. It''s most effective when given before HPV exposure, but still offers benefit later.',
  ARRAY['hpv-vaccine', 'prevention', 'cervical-health'],
  '[{"label":"HPV vaccine — CDC","url":"https://www.cdc.gov/vaccines/vpd/hpv/index.html"}]'::jsonb,
  'approved'
),
(
  'Genital Herpes',
  'Sexual Health',
  'A common viral infection causing periodic outbreaks of sores, manageable with antiviral medication even though it isn''t curable. Many people carry the virus without ever having a noticeable outbreak, which is part of why it spreads easily.',
  ARRAY['herpes', 'sti'],
  '[{"label":"Genital herpes — CDC","url":"https://www.cdc.gov/std/herpes/default.htm"}]'::jsonb,
  'approved'
),
(
  'HIV and Women''s Health',
  'Sexual Health',
  'HIV affects women somewhat differently than men in terms of symptom presentation and some health risks, and effective treatment (antiretroviral therapy) allows people with HIV to live long, healthy lives and, with sustained undetectable viral load, not transmit the virus to partners.',
  ARRAY['hiv', 'sexual-health'],
  '[{"label":"HIV and women — CDC","url":"https://www.cdc.gov/hiv/group/gender/women/index.html"}]'::jsonb,
  'approved'
),
(
  'Safe Sex Practices',
  'Sexual Health',
  'Condoms remain the only contraception method that also reduces STI transmission risk — worth using alongside other birth control methods (like the pill or an IUD) if STI prevention is also a goal, not just pregnancy prevention.',
  ARRAY['safe-sex', 'sexual-health', 'prevention'],
  '[{"label":"Safer sex — Planned Parenthood","url":"https://www.plannedparenthood.org/learn/stds-hiv-safer-sex"}]'::jsonb,
  'approved'
);
