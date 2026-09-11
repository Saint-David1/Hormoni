-- Library expansion batch 3 of 6: pregnancy basics and breast/cervical
-- health screening topics.

INSERT INTO public.knowledge_base_entries (title, category, summary, tags, external_links, review_status) VALUES

(
  'Pregnancy Trimesters Overview',
  'Pregnancy',
  'Pregnancy is divided into three roughly 13-week trimesters, each with distinct developmental milestones and typical symptoms — nausea and fatigue often dominate the first, energy often returns in the second, and physical discomfort tends to increase in the third.',
  ARRAY['pregnancy', 'trimesters'],
  '[{"label":"Pregnancy week by week — Mayo Clinic","url":"https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week"}]'::jsonb,
  'approved'
),
(
  'Prenatal Vitamins',
  'Pregnancy',
  'Formulated with higher folic acid and iron than standard multivitamins to support fetal development and the increased blood volume of pregnancy. Doctors generally recommend starting them when trying to conceive, not just after a positive test.',
  ARRAY['prenatal-vitamins', 'pregnancy', 'nutrition'],
  '[{"label":"Prenatal vitamins — ACOG","url":"https://www.acog.org/womens-health/faqs/nutrition-during-pregnancy"}]'::jsonb,
  'approved'
),
(
  'Gestational Diabetes',
  'Pregnancy',
  'A form of diabetes that develops during pregnancy, more common in people with PCOS or pre-existing insulin resistance. It''s typically screened for around 24-28 weeks and, if managed well through diet, monitoring, and sometimes medication, usually leads to a healthy pregnancy outcome.',
  ARRAY['gestational-diabetes', 'pregnancy', 'pcos'],
  '[{"label":"Gestational diabetes — CDC","url":"https://www.cdc.gov/diabetes/basics/gestational.html"}]'::jsonb,
  'approved'
),
(
  'Preeclampsia',
  'Pregnancy',
  'A pregnancy complication involving high blood pressure and organ strain, usually after 20 weeks — potentially serious but manageable with monitoring and, when needed, early delivery. Sudden swelling, severe headache, or vision changes during pregnancy warrant prompt medical attention.',
  ARRAY['preeclampsia', 'pregnancy', 'blood-pressure'],
  '[{"label":"Preeclampsia — ACOG","url":"https://www.acog.org/womens-health/faqs/preeclampsia-and-high-blood-pressure-during-pregnancy"}]'::jsonb,
  'approved'
),
(
  'Morning Sickness',
  'Pregnancy',
  'Nausea (with or without vomiting) affects a majority of pregnancies, most commonly in the first trimester, and despite the name can happen at any time of day. Severe, persistent vomiting (hyperemesis gravidarum) is a distinct, more serious condition needing medical treatment.',
  ARRAY['morning-sickness', 'pregnancy', 'nausea'],
  '[{"label":"Morning sickness — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/morning-sickness"}]'::jsonb,
  'approved'
),
(
  'The Prenatal Care Schedule',
  'Pregnancy',
  'Typically monthly visits through 28 weeks, then every 2 weeks until 36 weeks, then weekly until delivery — more frequent for higher-risk pregnancies, including many with PCOS given the higher likelihood of gestational diabetes or blood pressure issues.',
  ARRAY['prenatal-care', 'pregnancy'],
  '[{"label":"Prenatal care — ACOG","url":"https://www.acog.org/womens-health/faqs/prenatal-care"}]'::jsonb,
  'approved'
),
(
  'Pregnancy Ultrasounds',
  'Pregnancy',
  'Used to confirm dating, check for major structural development, and monitor growth — the anatomy scan around 18-20 weeks is typically the most detailed. Frequency and purpose vary by how the pregnancy is progressing.',
  ARRAY['ultrasound', 'pregnancy'],
  '[{"label":"Pregnancy ultrasound — ACOG","url":"https://www.acog.org/womens-health/faqs/ultrasound-exams"}]'::jsonb,
  'approved'
),
(
  'Prenatal Genetic Screening',
  'Pregnancy',
  'Blood tests and sometimes additional screening can estimate the likelihood of certain chromosomal conditions like Down syndrome — these are screening tools, not diagnoses, and results that raise concern are typically followed up with more definitive diagnostic testing if desired.',
  ARRAY['genetic-screening', 'pregnancy'],
  '[{"label":"Prenatal genetic screening — ACOG","url":"https://www.acog.org/womens-health/faqs/prenatal-genetic-screening-tests"}]'::jsonb,
  'approved'
),
(
  'High-Risk Pregnancy Factors',
  'Pregnancy',
  'Age (under 17 or over 35), certain pre-existing conditions (including PCOS, diabetes, or high blood pressure), multiples, and prior pregnancy complications can all increase monitoring needs — "high-risk" is a label about extra vigilance, not a prediction of a bad outcome.',
  ARRAY['high-risk-pregnancy', 'pregnancy'],
  '[{"label":"High-risk pregnancy — March of Dimes","url":"https://www.marchofdimes.org/find-support/topics/pregnancy/high-risk-pregnancy"}]'::jsonb,
  'approved'
),
(
  'PCOS and Pregnancy',
  'Pregnancy',
  'People with PCOS can and do have healthy pregnancies, though rates of gestational diabetes, preeclampsia, and preterm birth are somewhat higher — which is why PCOS is usually flagged for closer monitoring throughout, not treated as a barrier to a good outcome.',
  ARRAY['pcos', 'pregnancy'],
  '[{"label":"PCOS and pregnancy — ACOG","url":"https://www.acog.org/womens-health/faqs/polycystic-ovary-syndrome-pcos"}]'::jsonb,
  'approved'
),
(
  'Pregnancy Weight Gain Guidelines',
  'Pregnancy',
  'Recommended ranges depend on pre-pregnancy weight, generally spanning roughly 15-40 lbs across a full-term pregnancy — a guideline to discuss individually with a provider rather than a strict universal target.',
  ARRAY['weight-gain', 'pregnancy'],
  '[{"label":"Weight gain during pregnancy — CDC","url":"https://www.cdc.gov/reproductivehealth/maternalinfanthealth/pregnancy-weight-gain.htm"}]'::jsonb,
  'approved'
),
(
  'Exercise During Pregnancy',
  'Pregnancy',
  'Most people with uncomplicated pregnancies are encouraged to stay active — 150 minutes of moderate activity weekly is a commonly cited target — with adjustments for certain conditions or pregnancy complications a doctor can advise on individually.',
  ARRAY['exercise', 'pregnancy'],
  '[{"label":"Exercise during pregnancy — ACOG","url":"https://www.acog.org/womens-health/faqs/exercise-during-pregnancy"}]'::jsonb,
  'approved'
),
(
  'Foods to Avoid During Pregnancy',
  'Pregnancy',
  'High-mercury fish, unpasteurized dairy, undercooked meat/eggs, and deli meats (unless heated) carry higher infection or contamination risk during pregnancy specifically. Most other foods remain fine in moderation — it''s a shorter list than internet advice sometimes implies.',
  ARRAY['pregnancy', 'nutrition', 'food-safety'],
  '[{"label":"Food safety during pregnancy — CDC","url":"https://www.cdc.gov/foodsafety/people-at-risk-food-poisoning.html"}]'::jsonb,
  'approved'
),
(
  'Rh Factor and Pregnancy',
  'Pregnancy',
  'If a pregnant person is Rh-negative and the fetus is Rh-positive, the body can develop antibodies against future Rh-positive pregnancies — routine blood typing and a preventive medication (RhoGAM) largely eliminate this risk today.',
  ARRAY['rh-factor', 'pregnancy'],
  '[{"label":"Rh factor — ACOG","url":"https://www.acog.org/womens-health/faqs/the-rh-factor-how-it-can-affect-your-pregnancy"}]'::jsonb,
  'approved'
),
(
  'The Placenta',
  'Pregnancy',
  'A temporary organ that develops during pregnancy to deliver oxygen and nutrients from parent to fetus and remove waste. It''s delivered after birth ("afterbirth") and its position and health are routinely checked during pregnancy ultrasounds.',
  ARRAY['placenta', 'pregnancy', 'anatomy'],
  '[{"label":"Placenta — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/body/22337-placenta"}]'::jsonb,
  'approved'
),
(
  'Signs of Labor',
  'Pregnancy',
  'Regular, strengthening contractions, water breaking, and the loss of the mucus plug are classic signs, though not everyone experiences all of them clearly. When in doubt, calling a provider to describe what''s happening is always reasonable.',
  ARRAY['labor', 'pregnancy', 'childbirth'],
  '[{"label":"Signs of labor — ACOG","url":"https://www.acog.org/womens-health/faqs/how-to-tell-when-labor-begins"}]'::jsonb,
  'approved'
),
(
  'C-Section vs. Vaginal Birth',
  'Pregnancy',
  'Both are valid ways to give birth, and the right choice depends on medical factors, the pregnancy''s progress, and sometimes personal preference. A planned or unplanned C-section isn''t a lesser birth experience — it''s a different, sometimes medically necessary, path to the same outcome.',
  ARRAY['c-section', 'childbirth', 'pregnancy'],
  '[{"label":"C-sections — ACOG","url":"https://www.acog.org/womens-health/faqs/cesarean-birth"}]'::jsonb,
  'approved'
),
(
  'Postpartum Recovery Timeline',
  'Postpartum',
  'Physical recovery (bleeding, healing, hormone shifts) typically spans about 6-8 weeks, though full recovery — physically and emotionally — often takes longer and looks different for everyone. The traditional "6-week checkup" is a checkpoint, not a finish line.',
  ARRAY['postpartum', 'recovery'],
  '[{"label":"Postpartum recovery — ACOG","url":"https://www.acog.org/womens-health/faqs/postpartum-care"}]'::jsonb,
  'approved'
),
(
  'Breastfeeding Basics',
  'Postpartum',
  'Milk supply is driven by demand — more frequent feeding or pumping generally signals the body to produce more. Difficulty isn''t a reflection of effort or ability; lactation consultants exist specifically to help troubleshoot common challenges.',
  ARRAY['breastfeeding', 'postpartum'],
  '[{"label":"Breastfeeding — CDC","url":"https://www.cdc.gov/breastfeeding/index.htm"}]'::jsonb,
  'approved'
),
(
  'Postpartum Body Changes',
  'Postpartum',
  'Hair shedding, skin changes, and a uterus that takes weeks to return to size are all normal — as is a body that simply looks different afterward. Comparison to pre-pregnancy expectations (including from media) often does more harm than the changes themselves.',
  ARRAY['postpartum', 'body-changes'],
  '[{"label":"Postpartum body — ACOG","url":"https://www.acog.org/womens-health/faqs/postpartum-care"}]'::jsonb,
  'approved'
),
(
  'Mastitis',
  'Postpartum',
  'A painful breast inflammation, sometimes with infection, common during breastfeeding when a duct becomes blocked. Continued feeding or pumping (not stopping) alongside warm compresses usually helps, and antibiotics are used if infection is present — worth a prompt call to a provider.',
  ARRAY['mastitis', 'postpartum', 'breastfeeding'],
  '[{"label":"Mastitis — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/mastitis"}]'::jsonb,
  'approved'
),
(
  'The Pap Smear',
  'Cervical Health',
  'A screening test collecting cervical cells to check for abnormal changes that could develop into cervical cancer, typically recommended every 3 years starting at 21 (often combined with HPV testing after 30, extending the interval to 5 years).',
  ARRAY['pap-smear', 'cervical-health', 'screening'],
  '[{"label":"Pap test — ACOG","url":"https://www.acog.org/womens-health/faqs/cervical-cancer-screening"}]'::jsonb,
  'approved'
),
(
  'Cervical Cancer Screening Guidelines',
  'Cervical Health',
  'Guidelines have shifted toward less frequent but more targeted testing (often combining Pap and HPV tests) as evidence has clarified how cervical cancer develops. Following current guidelines — not older ones you may remember — is worth confirming with your provider.',
  ARRAY['cervical-cancer', 'screening', 'guidelines'],
  '[{"label":"Cervical cancer screening — CDC","url":"https://www.cdc.gov/cancer/cervical/basic_info/screening.htm"}]'::jsonb,
  'approved'
),
(
  'Colposcopy',
  'Cervical Health',
  'A follow-up procedure using a magnifying instrument to examine the cervix more closely after an abnormal Pap result, sometimes including a small tissue biopsy. It''s a diagnostic step, not a treatment, and most findings turn out to be manageable.',
  ARRAY['colposcopy', 'cervical-health'],
  '[{"label":"Colposcopy — ACOG","url":"https://www.acog.org/womens-health/faqs/colposcopy"}]'::jsonb,
  'approved'
),
(
  'Cervical Dysplasia',
  'Cervical Health',
  'Abnormal cell changes on the cervix, usually caused by HPV, graded by severity — many mild cases resolve on their own as the immune system clears the virus, while more significant changes are monitored or treated to prevent progression to cancer.',
  ARRAY['cervical-dysplasia', 'hpv', 'cervical-health'],
  '[{"label":"Cervical dysplasia — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/diseases/15806-cervical-dysplasia"}]'::jsonb,
  'approved'
),
(
  'Breast Self-Awareness',
  'Breast Health',
  'Getting familiar with how your breasts normally look and feel makes it easier to notice genuine changes — current guidelines emphasize general self-awareness over rigid monthly self-exam routines, alongside regular clinical screening.',
  ARRAY['breast-self-exam', 'breast-health'],
  '[{"label":"Breast self-awareness — ACOG","url":"https://www.acog.org/womens-health/faqs/breast-cancer-screening"}]'::jsonb,
  'approved'
),
(
  'Mammogram Guidelines',
  'Breast Health',
  'Recommendations vary somewhat by organization, but most suggest starting regular mammograms between ages 40-50 for average-risk women, with earlier or more frequent screening for those with higher risk factors — worth a personalized conversation with a doctor.',
  ARRAY['mammogram', 'breast-cancer', 'screening'],
  '[{"label":"Mammograms — CDC","url":"https://www.cdc.gov/cancer/breast/basic_info/mammograms.htm"}]'::jsonb,
  'approved'
),
(
  'Fibrocystic Breast Changes',
  'Breast Health',
  'Lumpy, tender breast tissue that fluctuates with the cycle — extremely common and not a cancer risk factor on its own, though any new or distinctly different lump is still worth having checked.',
  ARRAY['fibrocystic-breasts', 'breast-health'],
  '[{"label":"Fibrocystic breasts — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/fibrocystic-breasts"}]'::jsonb,
  'approved'
),
(
  'Breast Cancer Risk Factors',
  'Breast Health',
  'Family history, certain genetic mutations (like BRCA1/2), age, and hormonal factors all contribute to risk — but most people diagnosed with breast cancer have no known major risk factor, which is why routine screening matters for everyone, not just "high-risk" people.',
  ARRAY['breast-cancer', 'risk-factors'],
  '[{"label":"Breast cancer risk factors — CDC","url":"https://www.cdc.gov/cancer/breast/basic_info/risk_factors.htm"}]'::jsonb,
  'approved'
),
(
  'BRCA Genes, Briefly',
  'Breast Health',
  'Inherited mutations in the BRCA1 or BRCA2 genes substantially raise lifetime risk of breast and ovarian cancer. Genetic counseling (not just testing alone) is recommended for anyone considering this, to properly interpret results and next steps.',
  ARRAY['brca', 'genetics', 'breast-health'],
  '[{"label":"BRCA genes — CDC","url":"https://www.cdc.gov/cancer/breast/young_women/bringyourbrave/hereditary_breast_cancer/index.htm"}]'::jsonb,
  'approved'
),
(
  'Nipple Discharge: When to Get It Checked',
  'Breast Health',
  'Discharge unrelated to breastfeeding or pregnancy — especially if spontaneous, from one breast, or bloody — is worth a prompt medical evaluation, even though most causes turn out to be benign (like a small non-cancerous growth called a papilloma).',
  ARRAY['nipple-discharge', 'breast-health', 'symptoms'],
  '[{"label":"Nipple discharge — Mayo Clinic","url":"https://www.mayoclinic.org/symptoms/nipple-discharge/basics/definition"}]'::jsonb,
  'approved'
);
