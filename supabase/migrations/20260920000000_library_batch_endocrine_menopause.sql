-- Library expansion batch 4 of 6: broader endocrine/hormonal health and
-- menopause topics.

INSERT INTO public.knowledge_base_entries (title, category, summary, tags, external_links, review_status) VALUES

(
  'Estrogen''s Role in the Body',
  'Hormones',
  'Beyond reproduction, estrogen affects bone density, cholesterol levels, skin elasticity, and mood regulation — which is why its natural decline (in perimenopause/menopause) or imbalance (as in PCOS) can produce effects well beyond the reproductive system.',
  ARRAY['estrogen', 'hormones'],
  '[{"label":"Estrogen — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/body/22353-estrogen"}]'::jsonb,
  'approved'
),
(
  'Progesterone''s Role in the Body',
  'Hormones',
  'Produced mainly after ovulation, progesterone prepares the uterine lining for a possible pregnancy and has calming, sleep-supporting effects for many people. Low progesterone (common with infrequent ovulation in PCOS) can contribute to irregular or heavy bleeding.',
  ARRAY['progesterone', 'hormones'],
  '[{"label":"Progesterone — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/body/24562-progesterone"}]'::jsonb,
  'approved'
),
(
  'Testosterone in Women''s Bodies',
  'Hormones',
  'Women produce testosterone too, in smaller amounts than men, contributing to libido, muscle mass, and bone density. Elevated levels — common in PCOS — are what drive symptoms like acne and hirsutism.',
  ARRAY['testosterone', 'androgens', 'hormones'],
  '[{"label":"Testosterone in women — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/articles/24101-androgens"}]'::jsonb,
  'approved'
),
(
  'Cortisol and the Adrenal Glands',
  'Hormones',
  'Cortisol, produced by the adrenal glands, regulates the body''s stress response and interacts with blood sugar, blood pressure, and inflammation. Chronically elevated cortisol from ongoing stress can worsen insulin resistance, one reason stress management is medically, not just emotionally, relevant.',
  ARRAY['cortisol', 'adrenal', 'hormones'],
  '[{"label":"Cortisol — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/articles/22187-cortisol"}]'::jsonb,
  'approved'
),
(
  'Prolactin''s Role',
  'Hormones',
  'Best known for stimulating milk production after childbirth, prolactin is also produced at low levels outside of pregnancy. Elevated prolactin unrelated to breastfeeding can disrupt ovulation and cause irregular periods — a treatable cause worth ruling out alongside PCOS.',
  ARRAY['prolactin', 'hormones'],
  '[{"label":"Prolactin — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/body/22429-prolactin"}]'::jsonb,
  'approved'
),
(
  'Hyperprolactinemia',
  'Related Conditions',
  'Abnormally high prolactin levels, sometimes from a small, usually benign pituitary growth, that can cause irregular periods and unexpected milk production. It''s diagnosed with a blood test and is generally very treatable with medication.',
  ARRAY['hyperprolactinemia', 'related-conditions'],
  '[{"label":"Hyperprolactinemia — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/prolactinoma"}]'::jsonb,
  'approved'
),
(
  'Metabolic Syndrome',
  'Related Conditions',
  'A cluster of conditions — high blood pressure, high blood sugar, excess abdominal fat, and abnormal cholesterol — that together raise heart disease and diabetes risk. It overlaps significantly with insulin-resistant PCOS, which is part of why cardiometabolic screening matters for PCOS management.',
  ARRAY['metabolic-syndrome', 'insulin-resistance'],
  '[{"label":"Metabolic syndrome — NIH/NHLBI","url":"https://www.nhlbi.nih.gov/health/metabolic-syndrome"}]'::jsonb,
  'approved'
),
(
  'Hypothalamic Amenorrhea',
  'Related Conditions',
  'Missing periods caused by the brain suppressing reproductive hormone signals, often from a combination of low energy availability, high exercise volume, or significant stress. It can look similar to PCOS-related irregularity but has a very different underlying cause and treatment approach.',
  ARRAY['hypothalamic-amenorrhea', 'related-conditions'],
  '[{"label":"Hypothalamic amenorrhea — ACOG","url":"https://www.acog.org/womens-health/faqs/amenorrhea"}]'::jsonb,
  'approved'
),
(
  'Primary Ovarian Insufficiency',
  'Related Conditions',
  'When the ovaries stop functioning normally before age 40, causing irregular or absent periods and reduced fertility — different from early menopause in that some ovarian function can return unpredictably. It''s a distinct diagnosis from PCOS requiring different management, including bone and heart health monitoring given the earlier drop in estrogen.',
  ARRAY['primary-ovarian-insufficiency', 'related-conditions'],
  '[{"label":"Primary ovarian insufficiency — NIH/NICHD","url":"https://www.nichd.nih.gov/health/topics/poi"}]'::jsonb,
  'approved'
),
(
  'Congenital Adrenal Hyperplasia, Briefly',
  'Related Conditions',
  'A group of inherited conditions affecting adrenal hormone production that can cause symptoms overlapping with PCOS, like irregular cycles and excess hair growth. It''s identified through specific hormone testing and is important to rule out since management differs from PCOS.',
  ARRAY['cah', 'related-conditions'],
  '[{"label":"Congenital adrenal hyperplasia — NIH/NICHD","url":"https://www.nichd.nih.gov/health/topics/cah"}]'::jsonb,
  'approved'
),
(
  'Insulin Resistance Testing',
  'Tests & Screening',
  'Fasting glucose, fasting insulin, HbA1c, and oral glucose tolerance tests are the common ways to assess insulin resistance — often recommended at PCOS diagnosis and periodically afterward given the elevated diabetes risk.',
  ARRAY['insulin-resistance', 'tests', 'diabetes'],
  '[{"label":"Diabetes tests — CDC","url":"https://www.cdc.gov/diabetes/basics/getting-tested.html"}]'::jsonb,
  'approved'
),
(
  'Hot Flashes',
  'Menopause',
  'Sudden feelings of intense heat, often with sweating and a racing heart, caused by declining and fluctuating estrogen affecting the brain''s temperature regulation. They typically ease within a few years but can be managed with lifestyle changes or medication if disruptive.',
  ARRAY['hot-flashes', 'menopause'],
  '[{"label":"Hot flashes — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/hot-flashes"}]'::jsonb,
  'approved'
),
(
  'Night Sweats',
  'Menopause',
  'Hot flashes that occur during sleep, often disrupting rest significantly — the resulting sleep loss can compound other menopause symptoms like mood changes and fatigue, so it''s worth treating as its own problem, not just "part of the deal."',
  ARRAY['night-sweats', 'menopause', 'sleep'],
  '[{"label":"Night sweats — Mayo Clinic","url":"https://www.mayoclinic.org/symptoms/night-sweats/basics/definition"}]'::jsonb,
  'approved'
),
(
  'Vaginal Atrophy (Genitourinary Syndrome of Menopause)',
  'Menopause',
  'Declining estrogen after menopause thins and dries vaginal tissue, which can cause discomfort, pain with sex, and urinary symptoms. It''s common, under-discussed, and genuinely treatable — not something to just live with quietly.',
  ARRAY['vaginal-atrophy', 'menopause'],
  '[{"label":"Vaginal atrophy — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/vaginal-atrophy"}]'::jsonb,
  'approved'
),
(
  'Hormone Replacement Therapy (HRT) Basics',
  'Menopause',
  'HRT replaces declining estrogen (often with progesterone too, if the uterus is intact) to manage menopause symptoms. Risk and benefit depend heavily on individual health history and timing — a nuanced conversation with a doctor, not a simple yes/no decision.',
  ARRAY['hrt', 'menopause', 'treatment'],
  '[{"label":"Hormone therapy — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/menopause/in-depth/hormone-therapy"}]'::jsonb,
  'approved'
),
(
  'Bone Health After Menopause',
  'Menopause',
  'Estrogen helps maintain bone density, so its decline after menopause accelerates bone loss and raises osteoporosis risk. Weight-bearing exercise, adequate calcium and vitamin D, and bone density screening become increasingly important in this life stage.',
  ARRAY['bone-health', 'osteoporosis', 'menopause'],
  '[{"label":"Osteoporosis — NIH/NIA","url":"https://www.nia.nih.gov/health/osteoporosis"}]'::jsonb,
  'approved'
),
(
  'Heart Disease Risk After Menopause',
  'Menopause',
  'Estrogen has some protective cardiovascular effects, so heart disease risk rises after menopause and eventually approaches that of men. It''s a key reason cardiovascular screening (blood pressure, cholesterol) deserves attention in this transition, not just bone and hormone symptoms.',
  ARRAY['heart-disease', 'menopause'],
  '[{"label":"Menopause and heart health — American Heart Association","url":"https://www.heart.org/en/health-topics/consumer-healthcare/what-is-cardiovascular-disease/women-and-heart-disease"}]'::jsonb,
  'approved'
),
(
  'Mood Changes During Menopause',
  'Menopause',
  'Fluctuating (then declining) estrogen affects neurotransmitters linked to mood, which is why irritability, anxiety, or low mood are common during perimenopause and menopause — genuinely hormonal, not just situational, and treatable through several approaches.',
  ARRAY['mood', 'menopause', 'mental-health'],
  '[{"label":"Menopause and mental health — Office on Women''s Health","url":"https://www.womenshealth.gov/menopause/menopause-symptoms-and-relief"}]'::jsonb,
  'approved'
),
(
  'Menopause and Weight Changes',
  'Menopause',
  'Hormonal shifts, muscle loss with age, and slowing metabolism can make weight management feel different after menopause than before. Strength training and adequate protein intake become particularly useful tools during this transition.',
  ARRAY['weight', 'menopause'],
  '[{"label":"Menopause weight gain — Mayo Clinic","url":"https://www.mayoclinic.org/healthy-lifestyle/womens-health/in-depth/menopause-weight-gain"}]'::jsonb,
  'approved'
),
(
  'Early and Premature Menopause',
  'Menopause',
  'Menopause before 45 (early) or before 40 (premature) can occur naturally, from surgery (like ovary removal), or from certain medical treatments. It carries extra long-term considerations for bone and heart health given the longer time spent with lower estrogen.',
  ARRAY['early-menopause', 'premature-menopause'],
  '[{"label":"Early menopause — ACOG","url":"https://www.acog.org/womens-health/faqs/early-menopause"}]'::jsonb,
  'approved'
),
(
  'Perimenopause Symptoms in Detail',
  'Menopause',
  'Beyond irregular cycles, perimenopause often brings sleep disruption, mood shifts, changes in libido, and new or worsening headaches — a wider symptom picture than "just" the hot flashes commonly associated with menopause itself.',
  ARRAY['perimenopause', 'symptoms'],
  '[{"label":"Perimenopause symptoms — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/perimenopause"}]'::jsonb,
  'approved'
),
(
  'Menopause and Libido',
  'Menopause',
  'Changes in desire during menopause can stem from hormonal shifts, vaginal dryness making sex uncomfortable, sleep disruption, or mood changes — often more than one factor at once, which is why addressing it sometimes needs more than a single fix.',
  ARRAY['libido', 'menopause'],
  '[{"label":"Menopause and sex — Office on Women''s Health","url":"https://www.womenshealth.gov/menopause/menopause-symptoms-and-relief"}]'::jsonb,
  'approved'
),
(
  'Surgical Menopause',
  'Menopause',
  'Removal of both ovaries (oophorectomy) causes an abrupt menopause regardless of age, often with more sudden and intense symptoms than natural menopause since there''s no gradual hormonal decline. Extra attention to symptom management and long-term health monitoring is typically recommended.',
  ARRAY['surgical-menopause', 'oophorectomy'],
  '[{"label":"Surgical menopause — ACOG","url":"https://www.acog.org/womens-health/faqs/early-menopause"}]'::jsonb,
  'approved'
),
(
  'Sleep Changes During Menopause',
  'Menopause',
  'Beyond night sweats disrupting sleep directly, declining estrogen and progesterone (which has natural sleep-supporting effects) can independently affect sleep quality — worth distinguishing from other sleep issues when discussing options with a doctor.',
  ARRAY['sleep', 'menopause'],
  '[{"label":"Menopause and sleep — Sleep Foundation","url":"https://www.sleepfoundation.org/women-sleep/menopause-and-sleep"}]'::jsonb,
  'approved'
),
(
  'Androgen Insensitivity Syndrome, Briefly',
  'Related Conditions',
  'A rare genetic condition where the body doesn''t respond typically to androgen hormones, affecting reproductive development. It''s a specialized diagnosis requiring genetic and endocrine specialist care — mentioned here only for awareness that hormone-related conditions span a wide spectrum beyond PCOS.',
  ARRAY['ais', 'related-conditions', 'genetics'],
  '[{"label":"Androgen insensitivity syndrome — MedlinePlus","url":"https://medlineplus.gov/genetics/condition/androgen-insensitivity-syndrome/"}]'::jsonb,
  'approved'
),
(
  'What "Estrogen Dominance" Actually Means',
  'Hormones',
  'A popular wellness term, but not a formal medical diagnosis — it''s typically used to describe symptoms from an estrogen-to-progesterone imbalance, most often low progesterone from infrequent ovulation (as in PCOS) rather than truly excess estrogen. Worth discussing symptoms directly with a doctor rather than self-diagnosing from the term alone.',
  ARRAY['estrogen-dominance', 'hormones', 'myths'],
  '[{"label":"Hormone imbalance — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/diseases/22673-hormonal-imbalance"}]'::jsonb,
  'approved'
),
(
  'How Hormonal Birth Control Affects Natural Hormones',
  'Contraception',
  'Hormonal birth control works partly by suppressing the body''s natural hormone fluctuations and preventing ovulation — which is also why it can mask underlying irregular cycles until you stop taking it, sometimes making an existing condition like PCOS more noticeable afterward, not newly caused by it.',
  ARRAY['birth-control', 'hormones'],
  '[{"label":"How birth control works — Planned Parenthood","url":"https://www.plannedparenthood.org/learn/birth-control"}]'::jsonb,
  'approved'
),
(
  'Thyroid Function Tests Explained',
  'Tests & Screening',
  'TSH is the standard first test for thyroid function; if abnormal, further tests (T3, T4, thyroid antibodies) help clarify the cause. Since thyroid issues can mimic or coexist with PCOS symptoms, this is a common test alongside a PCOS workup.',
  ARRAY['thyroid', 'tests', 'tsh'],
  '[{"label":"Thyroid tests — American Thyroid Association","url":"https://www.thyroid.org/thyroid-function-tests/"}]'::jsonb,
  'approved'
),
(
  'Hashimoto''s Thyroiditis',
  'Related Conditions',
  'An autoimmune condition where the immune system attacks the thyroid, gradually causing an underactive thyroid — one of the most common thyroid disorders in women and another condition doctors screen for when investigating irregular cycles or fatigue.',
  ARRAY['hashimotos', 'thyroid', 'autoimmune'],
  '[{"label":"Hashimoto''s disease — NIH/NIDDK","url":"https://www.niddk.nih.gov/health-information/endocrine-diseases/hashimotos-disease"}]'::jsonb,
  'approved'
),
(
  'Autoimmune Conditions More Common in Women',
  'Related Conditions',
  'Conditions like lupus, rheumatoid arthritis, and Hashimoto''s thyroiditis occur significantly more often in women, likely tied to immune-hormone interactions that researchers are still working to fully understand. Persistent joint pain, unusual fatigue, or unexplained symptoms across multiple body systems are worth a thorough medical workup.',
  ARRAY['autoimmune', 'related-conditions'],
  '[{"label":"Autoimmune diseases and women — Office on Women''s Health","url":"https://www.womenshealth.gov/a-z-topics/autoimmune-diseases"}]'::jsonb,
  'approved'
);
