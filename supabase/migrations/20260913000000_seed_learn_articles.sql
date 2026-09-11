-- The Learn tab is admin-published only (RLS: "Anyone can read approved
-- educational content") and had zero seed rows — a fresh install shows an
-- empty tab until someone manually authors content in the admin panel.
-- Seeding a handful of real, cautiously-worded articles means a demo install
-- has something to show immediately; the admin panel remains the place to
-- add/edit/retire content going forward.

INSERT INTO public.educational_content (title, category, body, review_status, published_at) VALUES
('What Is PCOS, Really?', 'PCOS Basics', $body$
Polycystic Ovary Syndrome (PCOS) is one of the most common hormonal conditions affecting people with ovaries, but it's also one of the most misunderstood — partly because it doesn't look the same for everyone.

## The basics

PCOS is diagnosed when someone has at least two of the following three features:

- Irregular or absent ovulation (which usually shows up as irregular periods)
- Higher-than-typical levels of androgens ("male" hormones like testosterone), either measured in blood work or visible as symptoms like acne or extra hair growth
- Ovaries that appear to have many small follicles on an ultrasound

You don't need all three to be diagnosed, and having follicles on an ultrasound alone doesn't mean you have PCOS — it's genuinely common to have some without meeting the full diagnostic picture.

## Why it happens

Researchers don't fully understand the root cause yet. Insulin resistance is thought to play a significant role for many people, and there's a strong genetic component — PCOS often runs in families.

## What it isn't

PCOS is not caused by anything you did. It's not about weight, even though weight and insulin resistance can interact with symptoms. And a PCOS diagnosis doesn't mean the same treatment plan for everyone — it's genuinely individual.

If you suspect you have PCOS or have been recently diagnosed, a conversation with a healthcare provider familiar with the condition is the best next step — this article is a starting point, not a substitute for that.
$body$, 'approved', NOW() - INTERVAL '30 days'),

('Understanding Irregular Cycles', 'Cycle Tracking', $body$
"Irregular" gets used loosely, but it has a fairly specific meaning when it comes to cycles: a cycle length that swings by more than about 7-9 days from one cycle to the next, cycles shorter than 21 days or longer than 35 days, or missing periods altogether.

## Why tracking helps

A single irregular cycle usually isn't cause for concern — stress, travel, illness, and changes in weight or exercise can all shift a cycle temporarily. What matters more is the *pattern* over several months, which is exactly what consistent tracking makes visible.

## What Hornomi's predictions actually mean

When you see a "predicted" cycle length or phase in the app, it's calculated from your own recent logged cycles — not a generic 28-day assumption. The more cycles you log, the more that prediction reflects your actual pattern, and the app will tell you plainly when it doesn't have enough data yet to be confident.

## When to bring it to a doctor

Consider talking to a healthcare provider if you notice: periods consistently more than 35 days apart, missing periods for 3+ months (outside of pregnancy or menopause), or a sudden, unexplained change from your usual pattern. Bring your logged history with you — it's exactly the kind of detail that makes that conversation more productive.
$body$, 'approved', NOW() - INTERVAL '25 days'),

('Eating for PCOS: What the Evidence Actually Supports', 'Nutrition', $body$
There's a lot of noise online about "the PCOS diet" — much of it oversimplified or sold as a miracle fix. Here's what's more modestly but genuinely supported.

## Blood sugar stability, not restriction

Because insulin resistance is common in PCOS, meals that avoid sharp blood-sugar spikes tend to be helpful for many people. In practice that often looks like pairing carbohydrates with protein or fiber rather than eating them alone — not cutting out entire food groups.

## Fiber matters more than most people expect

Foods like beans, lentils, and leafy greens slow digestion and help with the blood-sugar-stability goal above, alongside broader digestive and metabolic benefits.

## There's no single forbidden food

You'll see lists claiming certain foods "cause" PCOS symptoms. Evidence for strict elimination is thin for most people — what's better supported is an overall pattern: more whole foods, steadier meals, and less reliance on highly processed, sugar-heavy options, in a way that's actually sustainable for you.

## A note on weight

Weight and PCOS symptoms can interact, but a person's size alone doesn't determine their symptom severity, and this isn't a reason to pursue extreme restriction. If nutrition feels overwhelming, a registered dietitian experienced with PCOS can build a plan specific to you — far more useful than any generic list.
$body$, 'approved', NOW() - INTERVAL '20 days'),

('The PCOS–Mental Health Connection', 'Mental Health', $body$
It's not "just in your head" — research consistently shows higher rates of anxiety and depression among people with PCOS compared to the general population, and there are real, physical reasons why.

## Why the link exists

Hormonal fluctuations directly affect mood-regulating brain chemistry. On top of that, living with a chronic condition that affects appearance, fertility, and daily symptoms carries a real emotional weight that's easy to underestimate from the outside — including by yourself.

## Signs worth paying attention to

Persistent low mood, loss of interest in things you used to enjoy, sleep or appetite changes that last more than two weeks, or anxiety that feels disproportionate to what's actually happening are all worth naming out loud to someone, whether that's a friend, a doctor, or a therapist.

## It's a legitimate reason to seek support

Mental health support isn't a lesser priority than the physical symptoms of PCOS — for many people it's just as important to treat. If you're logging consistently low mood check-ins in this app, consider it a signal worth acting on, not just data to observe.

If you're in crisis or having thoughts of harming yourself, please contact a crisis line or emergency services in your area right away — this article isn't a substitute for that kind of urgent support.
$body$, 'approved', NOW() - INTERVAL '15 days'),

('Exercise and PCOS: Finding What Actually Helps', 'Exercise', $body$
"Just exercise more" is common, unhelpful advice — it flattens a genuinely nuanced picture into a one-liner. Here's a more useful way to think about it.

## Not all exercise affects PCOS the same way

Some research suggests a mix of moderate cardio and resistance training may help with insulin sensitivity more than cardio alone. That doesn't mean cardio is bad — it means variety, not intensity for its own sake, is likely what matters.

## Consistency beats intensity

A sustainable routine you can actually keep up several times a week tends to matter more for hormonal and metabolic effects than infrequent, extreme sessions. This is exactly why logging exercise here focuses on frequency and how you felt afterward, not just calories or duration.

## Overtraining can backfire

Very intense or excessive exercise can raise cortisol and, for some people, actually worsen cycle irregularity. If you notice your symptoms getting worse alongside a much more intense routine, that's worth mentioning to a doctor rather than pushing through.

## Start where you are

If exercise feels like a source of guilt rather than something sustainable, that's worth addressing too — even short, regular walks are a legitimate starting point, not a lesser one.
$body$, 'approved', NOW() - INTERVAL '10 days'),

('PCOS and Fertility: What to Know', 'Fertility', $body$
PCOS is one of the most common causes of ovulatory infertility — but "common cause of difficulty" is very different from "cause of infertility," and that distinction matters.

## Why PCOS can affect fertility

Irregular or absent ovulation means there are fewer or less predictable opportunities for conception each cycle. It doesn't mean conception isn't possible — many people with PCOS conceive without medical intervention, and many others do so with support.

## Tracking can help, with a caveat

Because ovulation is less predictable with PCOS, standard calendar-based fertility methods are often less reliable. Consistently logging cycle and symptom data can still help you and a provider spot patterns, but it's not a substitute for medical guidance if you're actively trying to conceive.

## Treatment options exist and often work well

From lifestyle approaches to medications that induce ovulation to assisted reproductive technologies, there's a genuine range of options — and PCOS-related fertility challenges are generally considered quite treatable compared to many other causes of infertility.

## When to seek help

If you're under 35 and have been trying to conceive for over a year (or over six months if you're 35+), or if your cycles are very irregular and you're planning to try soon, it's worth talking to a doctor or fertility specialist sooner rather than later — earlier conversations tend to open up more options, not fewer.
$body$, 'approved', NOW() - INTERVAL '5 days'),

('Sleep and Hormones: An Underrated Connection', 'Sleep', $body$
Sleep doesn't get as much attention in PCOS conversations as diet or exercise, but the connection runs both ways: PCOS can disrupt sleep, and poor sleep can worsen PCOS symptoms.

## Why PCOS can disrupt sleep

Higher rates of sleep apnea are documented in people with PCOS, independent of weight — likely related to hormonal factors. Hormonal fluctuations more broadly can also affect sleep quality and timing.

## Why sleep loss can worsen symptoms

Poor sleep is linked to increased insulin resistance and higher cortisol, both of which can feed back into the same hormonal patterns underlying PCOS. It can become a two-way cycle: worse sleep, worse symptoms, worse sleep.

## Small, realistic changes

Consistent sleep and wake times (even on weekends), reducing screen exposure in the hour before bed, and keeping the bedroom cool and dark are modest but genuinely evidence-backed places to start — not a cure, but a real lever.

## When it's worth a conversation

Loud snoring, gasping during sleep, or persistent daytime exhaustion despite adequate time in bed are worth raising with a doctor — sleep apnea is treatable, and treating it can meaningfully improve how you feel day to day.
$body$, 'approved', NOW() - INTERVAL '2 days');
