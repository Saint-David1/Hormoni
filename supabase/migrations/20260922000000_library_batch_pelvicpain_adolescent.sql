-- Library expansion batch 6 of 6: fibroids/pelvic pain conditions,
-- adolescent health, and remaining PCOS/skin topics — brings the library
-- comfortably past 200 total entries.

INSERT INTO public.knowledge_base_entries (title, category, summary, tags, external_links, review_status) VALUES

(
  'Uterine Fibroids',
  'Related Conditions',
  'Non-cancerous growths in or around the uterus, extremely common (many people have them without ever knowing) and more prevalent in Black women specifically. Symptoms depend on size and location — some cause no issues, others cause heavy bleeding or pelvic pressure needing treatment.',
  ARRAY['fibroids', 'related-conditions'],
  '[{"label":"Uterine fibroids — Office on Women''s Health","url":"https://www.womenshealth.gov/a-z-topics/uterine-fibroids"}]'::jsonb,
  'approved'
),
(
  'Fibroid Symptoms to Watch For',
  'Related Conditions',
  'Heavy or prolonged periods, pelvic pressure or pain, frequent urination, and pain during sex can all signal fibroids — though many fibroids cause no symptoms at all and are found incidentally during a routine exam or ultrasound.',
  ARRAY['fibroids', 'symptoms'],
  '[{"label":"Fibroid symptoms — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/uterine-fibroids"}]'::jsonb,
  'approved'
),
(
  'Fibroid Treatment Options',
  'Treatment',
  'Options range from watchful waiting (for symptom-free fibroids) to medication, minimally invasive procedures, and surgery — the right approach depends on symptom severity, fibroid size/location, and whether future fertility is a priority.',
  ARRAY['fibroids', 'treatment'],
  '[{"label":"Fibroid treatment — ACOG","url":"https://www.acog.org/womens-health/faqs/uterine-fibroids"}]'::jsonb,
  'approved'
),
(
  'Chronic Pelvic Pain: An Overview',
  'Related Conditions',
  'Pelvic pain lasting 6 months or more can stem from endometriosis, fibroids, adenomyosis, pelvic floor dysfunction, or a combination — sometimes without a single clear cause identified. A specialist experienced in chronic pelvic pain can help build a management plan even without a perfect diagnosis.',
  ARRAY['chronic-pelvic-pain', 'related-conditions'],
  '[{"label":"Chronic pelvic pain — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/chronic-pelvic-pain"}]'::jsonb,
  'approved'
),
(
  'Endometriosis Staging',
  'Related Conditions',
  'Endometriosis is staged (I-IV) based on the extent and location of tissue found during surgery — but stage doesn''t reliably predict pain severity or fertility impact. Someone with "minimal" stage disease can have significant pain, and vice versa.',
  ARRAY['endometriosis', 'staging'],
  '[{"label":"Endometriosis stages — ACOG","url":"https://www.acog.org/womens-health/faqs/endometriosis"}]'::jsonb,
  'approved'
),
(
  'Endometriosis and Fertility',
  'Fertility',
  'Endometriosis is found in a significant share of people evaluated for infertility, though many people with the condition conceive without assistance. When fertility is affected, treatment ranges from surgery to remove tissue to assisted reproductive technologies like IVF.',
  ARRAY['endometriosis', 'fertility'],
  '[{"label":"Endometriosis and fertility — ASRM","url":"https://www.reproductivefacts.org/news-and-publications/patient-fact-sheets-and-booklets/documents/fact-sheets-and-info-booklets/endometriosis/"}]'::jsonb,
  'approved'
),
(
  'Pelvic Floor Dysfunction',
  'Related Conditions',
  'When pelvic floor muscles are too tight, too weak, or poorly coordinated, it can cause pain, urinary issues, or pain during sex. Pelvic floor physical therapy — a specialized field — is often the most effective treatment, distinct from general physical therapy.',
  ARRAY['pelvic-floor', 'related-conditions'],
  '[{"label":"Pelvic floor dysfunction — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/diseases/14459-pelvic-floor-dysfunction"}]'::jsonb,
  'approved'
),
(
  'Vaginismus',
  'Related Conditions',
  'Involuntary tightening of vaginal muscles that makes penetration (sexual or medical, like a Pap smear) painful or impossible. It''s a real physical response, not something "in your head," and pelvic floor therapy or gradual desensitization approaches can genuinely help.',
  ARRAY['vaginismus', 'pelvic-pain'],
  '[{"label":"Vaginismus — Cleveland Clinic","url":"https://my.clevelandclinic.org/health/diseases/vaginismus"}]'::jsonb,
  'approved'
),
(
  'Vulvodynia',
  'Related Conditions',
  'Chronic vulvar pain or discomfort without a clear identifiable cause, lasting 3 months or more — a real, diagnosable condition even when standard tests come back normal. Multiple treatment approaches exist, and a specialist in vulvar pain can help when a general provider is unfamiliar with it.',
  ARRAY['vulvodynia', 'chronic-pain'],
  '[{"label":"Vulvodynia — Office on Women''s Health","url":"https://www.womenshealth.gov/a-z-topics/vulvodynia"}]'::jsonb,
  'approved'
),
(
  'Dyspareunia (Painful Sex)',
  'Related Conditions',
  'Pain during sex has many possible causes — vaginal dryness, infection, endometriosis, vaginismus, or pelvic floor dysfunction among them. It''s common but not something to consider "normal" or permanent; identifying the underlying cause usually opens up effective treatment options.',
  ARRAY['dyspareunia', 'painful-sex'],
  '[{"label":"Painful intercourse — Mayo Clinic","url":"https://www.mayoclinic.org/symptoms/painful-intercourse/basics/definition"}]'::jsonb,
  'approved'
),
(
  'Puberty Stages',
  'Life Stages',
  'Puberty typically unfolds over several years — breast development usually starts first, followed by pubic hair growth, a growth spurt, and menarche roughly 2-2.5 years after breast development begins. Timing varies widely and a broad range is considered normal.',
  ARRAY['puberty', 'life-stages'],
  '[{"label":"Puberty — KidsHealth / Nemours","url":"https://kidshealth.org/en/teens/puberty.html"}]'::jsonb,
  'approved'
),
(
  'Delayed Puberty',
  'Life Stages',
  'No breast development by age 13, or no period by age 15-16, is generally considered delayed and worth medical evaluation — causes range from simple constitutional delay (running in families) to hormonal or genetic conditions needing specific treatment.',
  ARRAY['delayed-puberty', 'life-stages'],
  '[{"label":"Delayed puberty — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/delayed-puberty"}]'::jsonb,
  'approved'
),
(
  'Precocious (Early) Puberty',
  'Life Stages',
  'Puberty signs before age 8 are considered early and warrant evaluation, since causes range from normal variation to conditions needing treatment to prevent early growth plate closure and other effects. A pediatric endocrinologist typically guides this evaluation.',
  ARRAY['precocious-puberty', 'life-stages'],
  '[{"label":"Precocious puberty — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/precocious-puberty"}]'::jsonb,
  'approved'
),
(
  'Diagnosing PCOS in Teenagers',
  'PCOS',
  'PCOS diagnosis is trickier in adolescence because irregular cycles and some acne are common and often temporary in the first couple of years after menarche anyway. Specialists generally use stricter criteria in teens to avoid over-diagnosing what might just be normal pubertal variation.',
  ARRAY['pcos', 'teenagers', 'diagnosis'],
  '[{"label":"PCOS in adolescents — ACOG","url":"https://www.acog.org/womens-health/faqs/polycystic-ovary-syndrome-pcos"}]'::jsonb,
  'approved'
),
(
  'Talking to a Doctor About Period Problems as a Teen',
  'Life Stages',
  'Bringing a tracked history (even a few months logged in an app) makes these conversations far more productive than trying to recall details from memory. It''s normal and encouraged to ask questions directly, including about privacy from parents where relevant to your care.',
  ARRAY['teen-health', 'life-stages'],
  '[{"label":"Teen gynecological care — ACOG","url":"https://www.acog.org/womens-health/faqs/your-first-gynecologic-visit"}]'::jsonb,
  'approved'
),
(
  'The First Gynecological Visit',
  'Life Stages',
  'Often recommended between ages 13-15, an initial visit frequently involves just a conversation and general health screening — not necessarily a pelvic exam, which is usually only needed if there''s a specific concern or once a person becomes sexually active.',
  ARRAY['gynecology', 'first-visit', 'life-stages'],
  '[{"label":"First gynecologic visit — ACOG","url":"https://www.acog.org/womens-health/faqs/your-first-gynecologic-visit"}]'::jsonb,
  'approved'
),
(
  'Melasma and Hormonal Skin Changes',
  'Symptoms',
  'Patches of darker skin, often on the face, can be triggered by hormonal shifts — pregnancy, birth control, or PCOS-related hormone changes among them — and are worsened by sun exposure. Sunscreen is a key part of both prevention and treatment.',
  ARRAY['melasma', 'skin', 'hormones'],
  '[{"label":"Melasma — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/melasma"}]'::jsonb,
  'approved'
),
(
  'Skin Tags and PCOS',
  'Symptoms',
  'Small, harmless skin growths, often in areas of friction (neck, underarms), that occur more frequently with insulin resistance — including in PCOS. They''re not dangerous and can be removed for cosmetic reasons if desired, but don''t need treatment otherwise.',
  ARRAY['skin-tags', 'pcos', 'insulin-resistance'],
  '[{"label":"Skin tags — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/skin-tags"}]'::jsonb,
  'approved'
),
(
  'Acanthosis Nigricans',
  'Symptoms',
  'Dark, velvety patches of skin, often at the neck or underarms, that are a visible marker of insulin resistance — common enough in PCOS that noticing it can prompt earlier insulin/blood sugar testing.',
  ARRAY['acanthosis-nigricans', 'insulin-resistance', 'skin'],
  '[{"label":"Acanthosis nigricans — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/acanthosis-nigricans"}]'::jsonb,
  'approved'
),
(
  'PCOS Medication Options: An Overview',
  'Treatment',
  'Depending on the goal — regulating cycles, managing androgen symptoms, improving insulin sensitivity, or inducing ovulation for fertility — options include hormonal birth control, anti-androgen medications, metformin, and ovulation-inducing drugs, often used in combination tailored to what matters most to you right now.',
  ARRAY['pcos', 'treatment', 'medication'],
  '[{"label":"PCOS treatment — ACOG","url":"https://www.acog.org/womens-health/faqs/polycystic-ovary-syndrome-pcos"}]'::jsonb,
  'approved'
),
(
  'Anti-Androgen Medications',
  'Treatment',
  'Medications like spironolactone can reduce androgen-related symptoms (hirsutism, acne) in PCOS by blocking androgen effects, usually taking a few months to show visible results. They''re not appropriate during pregnancy, so reliable contraception is typically required alongside their use.',
  ARRAY['anti-androgens', 'spironolactone', 'treatment'],
  '[{"label":"Spironolactone — MedlinePlus","url":"https://medlineplus.gov/druginfo/meds/a682627.html"}]'::jsonb,
  'approved'
),
(
  'Hair Removal Options for Hirsutism',
  'Treatment',
  'Shaving, waxing, and depilatory creams offer temporary results; laser hair removal and electrolysis offer longer-term or permanent reduction but require multiple sessions and more investment. Combining a removal method with medical treatment of the underlying androgen excess often gives the best long-term results.',
  ARRAY['hirsutism', 'hair-removal', 'treatment'],
  '[{"label":"Hirsutism treatment — Mayo Clinic","url":"https://www.mayoclinic.org/diseases-conditions/hirsutism"}]'::jsonb,
  'approved'
),
(
  'PCOS Support Beyond Medication',
  'PCOS',
  'Nutrition changes, movement, sleep, and stress management all have evidence-backed roles in PCOS management alongside (not instead of) medical treatment when needed — a genuinely multi-pronged condition responds best to a multi-pronged approach.',
  ARRAY['pcos', 'lifestyle', 'treatment'],
  '[{"label":"PCOS lifestyle management — NIH/NICHD","url":"https://www.nichd.nih.gov/health/topics/pcos"}]'::jsonb,
  'approved'
),
(
  'Questions to Ask at a PCOS Diagnosis Appointment',
  'PCOS',
  'Useful questions include which specific Rotterdam criteria you met, what your individual risk factors look like (diabetes, heart health), whether fertility is a current concern, and what a realistic first treatment step looks like — a diagnosis appointment is also a chance to build your own understanding, not just receive a label.',
  ARRAY['pcos', 'diagnosis', 'self-advocacy'],
  '[{"label":"Talking to your doctor about PCOS — Office on Women''s Health","url":"https://www.womenshealth.gov/a-z-topics/polycystic-ovary-syndrome"}]'::jsonb,
  'approved'
),
(
  'Finding a PCOS-Informed Doctor',
  'PCOS',
  'Not every general practitioner or gynecologist has deep PCOS expertise — reproductive endocrinologists specialize in exactly this. If your concerns feel dismissed or a treatment plan doesn''t seem to fit your actual symptoms, seeking a second opinion is a reasonable, common step.',
  ARRAY['pcos', 'self-advocacy', 'care'],
  '[{"label":"Finding a specialist — Endocrine Society","url":"https://www.endocrine.org/patient-engagement/find-an-endocrinologist"}]'::jsonb,
  'approved'
);
