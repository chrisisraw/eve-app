import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { useEveStore, lookupFoodBank } from "@/hooks/useEveStore";
import { WORKOUT_CATALOG, CARDIO_INTENSITIES, SuggestedExercise } from "@/data/workout";
import { useSound } from "@/hooks/useSounds";
import { FOOD_BANK } from "@/data/foodbank";
import { MEALS, DAYS, SLOTS } from "@/data/meals";
import { PRELOADED_RECIPES } from "@/data/recipes";
import { ChevronLeft, ChevronRight, Plus, Minus, X, Dumbbell, Apple, Droplets, Check, Send, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const WATER_GOAL = 8;
const CARDIO_INTENSITY_PROMPTS = ['Easy', 'Moderate', 'Hard', 'Max Effort'];

function getTrainerResponse(msg: string): string {
  const q = msg.toLowerCase().trim();
  const has = (...terms: string[]) => terms.some(t => q.includes(t));

  // ── EXERCISE SWAPS & MODIFICATIONS ─────────────────────────────────────
  // Detect "replace X with Y" / "instead of X" / "not X, Y instead" patterns
  const swapMatch =
    q.match(/(?:replace|swap|change|switch|sub(?:stitute)?)\s+(.+?)\s+(?:with|for|to)\s+(.+)/) ||
    q.match(/(.+?)\s+instead of\s+(.+)/) ||
    q.match(/not\s+(.+?)[,.]?\s+(?:use|do|try|add|include)\s+(.+)/);

  if (swapMatch || has('pistol squat', 'pistol', 'single leg squat', 'goblet squat', 'barbell squat')) {
    const newEx  = swapMatch ? swapMatch[swapMatch[0].includes('instead') ? 1 : 2]?.trim() : 'pistol squat';
    const oldEx  = swapMatch ? swapMatch[swapMatch[0].includes('instead') ? 2 : 1]?.trim() : 'hack squat';
    const exLow  = (newEx || '').toLowerCase();

    if (has('goblet squat') && has('barbell squat')) {
      return `Okay — I’ll swap goblet squats for barbell squats.\n\nDifference: goblet squats are more upright, easier on the lower back, and great for form practice; barbell squats let you load much heavier and build more total strength once your technique is solid.\n\nI’d program barbell squats first in the session, 3×5–8, and keep the load conservative for week 1.`;
    }

    if (has('pistol squat', 'pistol')) {
      return `Done — pistol squats are actually a superior choice for functional strength and unilateral leg development! 🎯\n\nHere's how to progress safely:\n• Start with assisted pistols (hold a TRX, pole, or doorframe) to build the pattern\n• Work on ankle mobility daily — tight ankles are the #1 limiter\n• Add counterweight (5–10lb plate held out front) to make balance easier\n• Progress to bodyweight pistols, then add a goblet hold for extra load\n\nPistol squats hit your quads, glutes, hip flexors, and core simultaneously. Compared to hack squats, they also develop proprioception and injury-resistant strength. Aim for 3×5 each leg, building to 3×10 before adding weight.`;
    }
    if (has('bulgarian split squat', 'split squat', 'bulgarian')) {
      return `Smart swap! Bulgarian split squats are one of the most effective unilateral lower-body exercises available. 💪\n\nKey form points: elevate your rear foot on a bench (about shin height), keep your front foot far enough forward so your knee tracks over your toes without going too far past them, and drive through your front heel. Lean your torso slightly forward to bias the glutes.\n\nStart with bodyweight, then progress to dumbbells (2×8–12 each leg). They expose and correct imbalances that bilateral squats hide — expect some initial DOMS!`;
    }
    if (has('romanian deadlift', 'rdl', 'stiff leg')) {
      return `Excellent choice — Romanian deadlifts are the gold standard for posterior chain development and hamstring length. 🏋️\n\nForm checklist: hinge at the hips (not the lower back), maintain a neutral spine throughout, let the bar travel close to your legs, and feel the stretch in your hamstrings before reversing. The movement should feel like you're pushing your hips back toward a wall behind you.\n\nStart lighter than you think you need — this is a feel exercise. 3×8–12 is a great rep range. Pair with glute bridges on the same day for a complete posterior chain session.`;
    }
    if (has('pull up', 'pullup', 'chin up', 'chinup')) {
      return `Pull-ups are the king of upper back exercises — great call! 🙌\n\nProgression plan if you're building up:\n1. Dead hangs (30 sec) to build grip and shoulder stability\n2. Scapular pull-ups (depress and retract shoulder blades without bending elbow)\n3. Band-assisted pull-ups or negative pull-ups (jump up, lower slowly over 5 sec)\n4. Full pull-ups: aim for 3×5, then 3×8, then 3×12 before adding weight\n\nFor plant-based athletes: ensure adequate B12 and iron — deficiencies directly limit pulling strength. Hemp seeds (10g protein/3tbsp) pre-workout fuel the session.`;
    }
    if (has('dumbbell', 'db ')) {
      return `Switching to dumbbells is smart — they fix imbalances and increase range of motion compared to barbell or machine equivalents. 🎯\n\nKey advantage: each side works independently, so your dominant side can't compensate. You'll likely need to start 10–20% lighter than your barbell equivalent until you build coordination.\n\nFor plant-based lifters, prioritize pre-workout carbs (banana, dates, oats 1hr before) to fuel the extra stabilization demand that dumbbell work requires.`;
    }
    return `Great modification! Swapping ${oldEx || 'that exercise'} for ${newEx || 'this alternative'} is a solid choice for exercise variety and targeting the same muscle groups from a different angle. 🔄\n\nGeneral tips for any new exercise: start at 60–70% of your usual working weight for the first session, focus on form over load, and give yourself 2–3 sessions to neurologically adapt before judging the movement.\n\nIf you'd like specific form cues, sets/reps guidance, or muscle-group breakdown for ${newEx || 'this exercise'}, just ask!`;
  }

  // ── SPECIFIC EXERCISES ──────────────────────────────────────────────────
  if (has('squat', 'leg press', 'lunge')) {
    return `Squats are the cornerstone of lower-body development — they hit quads, glutes, hamstrings, and core simultaneously. 🦵\n\nFor plant-based athletes: fuel leg day with complex carbs 1–2 hours before (sweet potato, oats, brown rice). Your muscles need glycogen for heavy compound work.\n\nForm essentials: feet shoulder-width, chest up, knees track over toes, descend until thighs parallel or below. Recovery tip: tart cherry juice post-leg day has research backing for reducing DOMS by up to 20%. Aim for 3×6–12 depending on your goal (heavier = strength, lighter = hypertrophy).\n\nIf you want, I can swap one squat variation for another and update your workout plan.`;
  }
  if (has('deadlift', 'dead lift', 'hip hinge')) {
    return `Deadlifts are the ultimate full-body strength builder — they recruit more muscle mass than almost any other movement. 🏋️\n\nKey cues: set your lats ("protect your armpits"), push the floor away (don't think of it as a pull), maintain a neutral spine, and lock out glutes at the top. Start with a Romanian deadlift to build the hip hinge pattern before loading conventional.\n\nFor plant-based athletes: iron from lentils, spinach, and pumpkin seeds supports oxygen delivery critical for deadlift performance. Pair iron-rich foods with vitamin C for 3× better absorption.`;
  }
  if (has('bench press', 'chest press', 'push up', 'pushup', 'chest')) {
    return `For chest development, the bench press + push-up combination is unbeatable. 💪\n\nBench tip: don't flare your elbows to 90° — keep them at 45–75° to protect your rotator cuff. Squeeze the bar like you're trying to bend it, and drive your feet into the floor.\n\nPush-ups are underrated for hypertrophy — go slow (3 sec down, 1 up) and feel the stretch at the bottom. For plant-based fuel: hemp seeds provide 10g protein per 3 tbsp and contain all essential amino acids — perfect pre- or post-press snack.`;
  }
  if (has('row', 'back', 'lat pulldown', 'pull down')) {
    return `A strong back is the foundation of all other lifts and prevents injury. For plant-based athletes this is especially important since upper-back strength supports good posture during all-day sitting. 🎯\n\nProgram balance: for every pressing movement, match it with a pulling movement (1:1 push/pull ratio). Rows develop the rhomboids, mid-traps, and rear delts that are often under-developed.\n\nKey cue: initiate every row by retracting your shoulder blades first, then bend the elbow. This ensures your back — not your biceps — does the work.`;
  }
  if (has('overhead press', 'shoulder press', 'ohp', 'shoulder')) {
    return `The overhead press is one of the best measures of functional upper-body strength. 🙌\n\nForm keys: neutral grip if possible (less shoulder impingement), brace your core like you're about to get punched, and finish with your ears between your arms at the top. Avoid excessive arching of the lower back — that's a sign of insufficient core engagement or too much weight.\n\nShoulder health: turmeric + black pepper (bioavailability booster) has solid evidence for reducing joint inflammation. Add it to your morning oats or a golden milk latte.`;
  }
  if (has('plank', 'core', 'ab ', 'abs', 'crunch', 'sit up')) {
    return `Core strength is foundational — it's your body's power transfer center for every lift and movement. 🎯\n\nFor functional core work, prioritize: planks (front + side), dead bugs, pallof press, and hollow body holds over crunches — they train anti-rotation and stability, which is what your core actually does.\n\nAnti-inflammatory support for core recovery: flaxseeds (2 tbsp/day), walnuts, and algae-based omega-3 supplementation reduce the low-grade inflammation that slows ab definition progress alongside body fat reduction.`;
  }
  if (has('cardio', 'running', 'hiit', 'cycling', 'swim', 'aerobic', 'endurance')) {
    return `For plant-based endurance athletes, carbohydrate strategy is your biggest performance lever. 🏃\n\nFuel protocol:\n• Pre-session (1–2hrs): complex carbs — oats, banana, sweet potato\n• During (>60 min): dates, dried mango, or a homemade energy gel (dates + coconut water blended)\n• Post-session: 3:1 carb-to-protein ratio within 30 minutes — rice + tempeh, or a fruit + protein smoothie\n\nIron status is critical for endurance — low iron tanks VO2 max. Get blood work every 6 months and eat iron-rich foods (lentils, spinach, pumpkin seeds) with vitamin C daily.`;
  }
  if (has('yoga', 'stretch', 'flexibility', 'mobility', 'foam roll')) {
    return `Flexibility and mobility work is often the missing piece in plant-based athlete programs. 🧘\n\nBest protocol: dynamic stretching before training (leg swings, hip circles, arm circles), static stretching after training when muscles are warm (hold 30–60 sec each). Foam roll hip flexors, IT band, and thoracic spine 3–4x per week.\n\nAnti-inflammatory diet synergy: turmeric, ginger, and tart cherry all have research-backed effects on connective tissue recovery. A ginger-turmeric tea post-session can meaningfully reduce next-day stiffness.`;
  }

  // ── NUTRITION: PROTEIN ──────────────────────────────────────────────────
  if (has('protein', 'amino', 'complete protein', 'leucine')) {
    return `As a plant-based athlete, your protein target: 1.6–2.2g per kg of bodyweight daily. Complete sources with high leucine (the muscle-building trigger amino acid) 💪\n\nTop sources ranked by protein density:\n• Seitan: 25g per 3oz (highest, not for gluten-free)\n• Tempeh: 19g per 100g + gut-friendly probiotics\n• Edamame: 17g per cup + complete amino profile\n• Lentils: 18g per cup + iron + fiber\n• Tofu: 8g per 100g — silken is lower, firm is higher\n• Hemp seeds: 10g per 3tbsp + omega-3\n• Nutritional yeast: 8g per 2tbsp + B12 (if fortified)\n\nDistribute across 4–5 meals for maximum muscle protein synthesis. Leucine threshold per meal: ~2.5–3g (achieved with ~30–40g protein from plant sources).`;
  }

  // ── NUTRITION: CARBS ────────────────────────────────────────────────────
  if (has('carb', 'carbohydrate', 'glycogen', 'sugar', 'glucose')) {
    return `Carbohydrates are your muscles' primary fuel — don't fear them! For plant-based athletes they're especially important since most protein sources are also carbohydrate-containing. 🌾\n\nTiming strategy:\n• Pre-workout (1–2hrs): complex carbs — oats, sweet potato, brown rice, quinoa\n• Intra-workout (>60 min): simple carbs — banana, dates, coconut water\n• Post-workout: fast carbs + protein within 30 min to replenish glycogen and start recovery\n\nFor weight management: focus on fiber-rich carbs (legumes, vegetables, whole grains) that digest slowly and keep blood sugar stable. Minimize refined carbs and fruit juice, but whole fruit is always fine.`;
  }

  // ── NUTRITION: FATS ─────────────────────────────────────────────────────
  if (has('fat', 'omega', 'dha', 'epa', 'algae oil', 'flax', 'chia', 'avocado', 'nuts')) {
    return `Healthy fats are essential for hormone production, vitamin absorption (A, D, E, K are fat-soluble), and brain health. 🥑\n\nPlant-based omega-3 strategy:\n• ALA (plant omega-3): flaxseeds (highest), chia seeds, walnuts, hemp seeds\n• DHA/EPA: algae-based omega-3 supplement is non-negotiable for vegans — fish get their omega-3 from algae anyway, so skip the middleman. Dose: 250–500mg DHA+EPA daily\n• Conversion from ALA to DHA is only ~5–10%, so the supplement matters\n\nFor anti-inflammatory benefits: aim for a 3:1–4:1 omega-6 to omega-3 ratio. Most Western diets run 15:1+, driving chronic inflammation. Flaxseed oil drizzled on food (never heat it) is an easy daily upgrade.`;
  }

  // ── SUPPLEMENTS ─────────────────────────────────────────────────────────
  if (has('b12', 'vitamin b', 'supplement', 'deficien', 'blood work', 'blood test')) {
    return `B12 is the most critical supplement for vegans — it's non-negotiable. 🌿\n\nComplete vegan supplement stack (in priority order):\n1. B12: 1,000–2,000mcg cyanocobalamin or methylcobalamin, 2–3x per week (or 250mcg daily)\n2. Vitamin D3 (lichen-sourced): 2,000–4,000 IU daily, especially if you live above 35° latitude or work indoors\n3. Algae omega-3: 250–500mg DHA+EPA daily\n4. Iodine: from iodized salt or 150mcg supplement (seaweed is inconsistent)\n5. Creatine: 3–5g/day — 100% suitable for vegans, significant strength and cognitive benefits\n6. Zinc: 8–11mg/day (legumes contain phytates that reduce absorption, so vegans need slightly more)\n\nGet full bloodwork every 6 months: B12, ferritin, vitamin D, zinc, and CBC.`;
  }
  if (has('creatine')) {
    return `Creatine is one of the most research-backed supplements ever studied — and it's even more beneficial for vegans! 🏋️\n\nWhy especially beneficial for plant-based athletes: meat-eaters get 1–2g creatine daily from food; vegans get essentially zero. This means your baseline muscle creatine stores are lower, so supplementation has a larger performance impact.\n\nProtocol:\n• Loading (optional): 20g/day (4×5g) for 5–7 days to saturate stores quickly\n• Maintenance: 3–5g/day creatine monohydrate (the most studied, least expensive form)\n• Take with a carbohydrate source for better uptake\n• Results: 5–15% strength improvement, better high-intensity performance, and emerging evidence for cognitive benefits\n\nFully vegan (no animal products in creatine monohydrate).`;
  }
  if (has('iron', 'anaemia', 'anemia', 'ferritin')) {
    return `Iron is the nutrient most commonly low in plant-based athletes — and even mild deficiency tanks your energy and performance dramatically. 💚\n\nPlant-based iron strategy:\n• Best sources: lentils (6.6mg/cup), tofu (3mg/100g), tempeh, quinoa, pumpkin seeds (2.5mg/oz), blackstrap molasses\n• Always pair with vitamin C: bell peppers, lemon juice, strawberries, or broccoli increase non-heme iron absorption up to 3×\n• Avoid: coffee, tea, and calcium-rich foods within 1hr of iron-rich meals — they block absorption\n• For athletes: your iron needs are ~30–70% higher than sedentary people due to foot-strike hemolysis and sweat losses\n\nGet your ferritin tested (not just hemoglobin — ferritin shows storage iron). Optimal: 50–100 ng/mL for athletes.`;
  }
  if (has('vitamin d', 'sunshine', 'calcium', 'bone')) {
    return `Vitamin D3 and calcium are a critical duo for plant-based athletes — bone density and muscle contraction both depend on them. 🌞\n\nVitamin D:\n• Most people are deficient (especially if indoors often or living above 35° latitude)\n• Supplement with 2,000–4,000 IU D3 (lichen-sourced = vegan) daily\n• Take with your fattiest meal for best absorption\n\nCalcium (vegan sources):\n• Fortified plant milks: 300–450mg per cup\n• Tofu set with calcium sulfate: 350mg per half cup\n• Collard greens: 268mg per cup (cooked)\n• Bok choy and kale: highly bioavailable (better than dairy, surprisingly)\n• Target: 1,000–1,200mg/day total\n\nD3 and K2 work synergistically — K2 (natto, fermented foods) directs calcium into bones rather than arteries.`;
  }
  if (has('zinc', 'immune', 'immunity', 'testosterone')) {
    return `Zinc is critical for immune function, testosterone production, wound healing, and protein synthesis — yet it's frequently low in plant-based athletes. 💪\n\nWhy vegans need more: legumes and grains contain phytic acid which binds zinc and reduces absorption by 30–50%. You need ~1.5× the RDA compared to meat-eaters.\n\nBest plant sources: pumpkin seeds (2.5mg/oz — eat them daily!), hemp seeds, cashews, quinoa, tempeh, and oats.\n\nSoaking/sprouting legumes and grains significantly reduces phytic acid and improves zinc (and iron) absorption. If you're not hitting 11mg/day men, 8mg/day women from food, supplement with 15–25mg zinc picolinate or bisglycinate (more absorbable forms than zinc oxide).`;
  }

  // ── MUSCLE BUILDING ─────────────────────────────────────────────────────
  if (has('muscle', 'bulk', 'gain', 'mass', 'hypertrophy', 'bodybuilder', 'build')) {
    return `Building muscle on plants is absolutely achievable — and research shows plant-based athletes gain muscle just as effectively as omnivores when protein is equated. 🏋️\n\nThe non-negotiables for muscle growth:\n1. Caloric surplus: 200–300 kcal above maintenance (track for 2 weeks to find your true maintenance)\n2. Protein: 1.8–2.2g/kg bodyweight, distributed across 4–5 meals\n3. Progressive overload: increase weight, reps, or sets every 1–2 weeks\n4. Creatine: 3–5g/day — the single best supplement for plant-based strength athletes\n5. Sleep: 7–9 hours — growth hormone peaks during deep sleep\n6. Minimize cardio: 2x30 min max if bulking (excess cardio blunts mTOR signaling)\n\nMeal timing: pre-workout complex carbs + protein, post-workout fast carbs + protein within 30 min.`;
  }

  // ── WEIGHT LOSS / FAT LOSS ──────────────────────────────────────────────
  if (has('lose weight', 'weight loss', 'fat loss', 'cut', 'deficit', 'calorie deficit', 'slim', 'lean')) {
    return `Vegan diets are statistically the most effective dietary pattern for sustainable weight loss — here's the science-backed approach: 🔥\n\nThe framework:\n1. Caloric deficit: 300–500 kcal/day (more aggressive cuts increase muscle loss)\n2. Protein priority: 1.6–2g/kg bodyweight to preserve muscle during a cut\n3. Fiber focus: 35–45g/day from legumes, vegetables, and whole grains — controls hunger better than any diet pill\n4. Volume eating: leafy greens, cucumbers, zucchini, mushrooms fill your plate with minimal calories\n5. Minimize: processed vegan foods (Oreos are vegan, but…), oils, nut butters in excess\n\nExpect 0.5–1lb/week of true fat loss. Faster = mostly water + muscle. Meal prep Sunday saves willpower all week.`;
  }

  // ── PRE/POST WORKOUT NUTRITION ──────────────────────────────────────────
  if (has('before workout', 'pre workout', 'pre-workout', 'what to eat before', 'before training', 'fuel')) {
    return `Pre-workout nutrition is about delivering sustained energy without GI distress — timing is everything. ⚡\n\n2–3 hours before (full meal):\n• Oats + banana + nut butter + plant protein\n• Brown rice + tempeh + roasted vegetables\n• Sweet potato + black beans + avocado\n\n30–60 minutes before (light snack):\n• Banana + 1 tbsp almond butter\n• Dates (2–3) + a handful of cashews\n• Rice cake + jam (fast carbs = fast energy)\n\nAvoid: high-fat, high-fiber foods right before training — they slow gastric emptying and cause cramping. Save your lentil stew for dinner.\n\nCaffeine (black coffee or matcha) 30–45 min before training: increases strength by ~5%, endurance by 10–15%, and reduces perceived effort.`;
  }
  if (has('after workout', 'post workout', 'post-workout', 'what to eat after', 'after training', 'recovery meal', 'recovery nutrition')) {
    return `The post-workout window is real — within 30 minutes, your muscle cells are primed to absorb carbs and protein like a sponge. 🍒\n\nIdeal post-workout meal:\n• Carbs: 0.5–1g per kg bodyweight (fast-digesting: white rice, banana, mango)\n• Protein: 25–40g (fast-digesting: pea protein shake, edamame, silken tofu)\n• Example: banana + pea protein shake, white rice + steamed edamame, or a big mango-protein smoothie\n\nWithin 2 hours (full meal):\n• Rice + lentils + roasted veg (protein + carb + micronutrients)\n• Tempeh bowl + quinoa + leafy greens\n\nHydration: replace 150% of lost fluid. Weigh yourself before and after — every lb lost = 16oz to replace. Electrolytes matter (sodium, potassium) — coconut water or add a pinch of sea salt to your water.`;
  }

  // ── SPECIFIC NUTRITION TOPICS ───────────────────────────────────────────
  if (has('sleep', 'insomnia', 'rest', 'melatonin')) {
    return `Sleep is when muscle is actually built — it's the most underrated performance variable. 7–9 hours is non-negotiable for serious athletes. 😴\n\nPlant-based sleep optimization:\n• Tart cherry juice (1 cup before bed): contains natural melatonin — shown to increase sleep duration and quality in multiple RCTs\n• Magnesium glycinate (200–400mg before bed): most plant-based athletes are deficient; dramatically improves sleep quality\n• Pumpkin seeds: one of the richest sources of tryptophan (serotonin precursor) and magnesium\n• Avoid: caffeine after 2pm, alcohol (disrupts REM sleep even in small amounts)\n\nSleep debt is not linear — missing 1 hour of sleep reduces testosterone by 10–15% and muscle protein synthesis by ~18%. Prioritize it like training.`;
  }
  if (has('hydration', 'water', 'dehydrat', 'electrolyte', 'drink')) {
    return `Even mild dehydration (1–2% body weight) reduces strength by 5–10% and endurance by up to 20% — it's a hidden performance killer. 💧\n\nHydration targets:\n• Baseline: 35ml per kg bodyweight daily (e.g., 70kg athlete = 2.45L)\n• Add 500–750ml per hour of exercise\n• Hot weather or heavy sweating: add electrolytes, not just water\n\nElectrolyte sources (plant-based):\n• Sodium: sea salt, olives, miso\n• Potassium: banana, coconut water, sweet potato, avocado\n• Magnesium: pumpkin seeds, dark chocolate, leafy greens\n\nHydration check: urine should be pale yellow (straw-colored). Dark yellow = drink more. Clear = you're over-hydrating (which can dilute sodium). Coconut water is nature's electrolyte drink — great post-workout.`;
  }
  if (has('gut', 'digestion', 'bloat', 'gas', 'ibs', 'microbiome', 'probiotic', 'prebiotic')) {
    return `A healthy gut microbiome is the foundation of immunity, mental health, and nutrient absorption — and plant-based diets are the gold standard for gut health. 🌿\n\nFor digestive comfort (especially during high-fiber vegan transition):\n• Increase fiber gradually (your microbiome needs 2–4 weeks to adapt)\n• Soak legumes overnight and discard soaking water — reduces oligosaccharides that cause gas\n• Add digestive spices: cumin, fennel, ginger, and asafoetida (hing) to legume dishes\n• Chew thoroughly — digestion begins in the mouth, not the stomach\n\nProbiotic-rich vegan foods: tempeh, sauerkraut, kimchi, miso, water kefir, kombucha.\nPrebiotic foods that feed good bacteria: garlic, onion, leeks, asparagus, oats, chicory root, green bananas.`;
  }
  if (has('inflammation', 'anti-inflammatory', 'joint pain', 'arthritis', 'soreness', 'doms')) {
    return `Chronic inflammation is the root of many health issues and slows recovery — plant-based diets dramatically reduce inflammatory markers. 🌿\n\nTop anti-inflammatory foods backed by research:\n1. Turmeric + black pepper (curcumin bioavailability increases 2,000% with piperine)\n2. Tart cherry juice: reduces muscle soreness by ~20%, shown in multiple RCTs with athletes\n3. Ginger: 2g/day reduces exercise-induced muscle pain significantly\n4. Walnuts + flaxseeds: high ALA omega-3 reduces systemic inflammation\n5. Dark berries (blueberries, blackberries): anthocyanins accelerate muscle repair\n6. Leafy greens: vitamin K1 supports tissue repair\n\nWorkout recovery stack: tart cherry juice + protein + ginger post-session, magnesium glycinate before bed. This combination dramatically reduces next-day DOMS.`;
  }
  if (has('hormone', 'testosterone', 'estrogen', 'cortisol', 'thyroid', 'adrenal')) {
    return `Plant-based diets support healthy hormone balance when nutritionally complete. Here's what matters most: ⚖️\n\nTestosterone support:\n• Zinc (pumpkin seeds, hemp seeds) — critical for testosterone synthesis\n• Healthy fats (avocado, nuts, olive oil) — testosterone is made from cholesterol\n• Vitamin D3 — has a dose-dependent relationship with testosterone levels\n• Adequate calories — chronic caloric restriction suppresses testosterone\n• Heavy compound lifting — squats and deadlifts spike testosterone acutely\n\nCortisol management (stress hormone that breaks down muscle):\n• Ashwagandha (600mg KSM-66 extract): reduces cortisol by 30% in clinical trials\n• Adequate sleep — cortisol spikes with sleep deprivation\n• Meditation/breathwork — 10 min/day measurably reduces baseline cortisol\n• Don't overtrain — more workouts ≠ more gains when cortisol is chronically elevated`;
  }
  if (has('intermittent fast', 'fasting', '16:8', 'omad', 'time restrict')) {
    return `Intermittent fasting can work on a plant-based diet, but it requires more planning to hit protein targets in a compressed window. 🕐\n\nFor athletes, the 16:8 protocol (eat within an 8-hour window) is the most sustainable:\n• Training window: schedule workouts near the end of your fast or beginning of your eating window\n• First meal: prioritize protein (30–40g) + complex carbs to replenish glycogen\n• Distribute protein across 3–4 meals in your window — leucine threshold needs to be hit each meal for MPS\n\nCaveats for plant-based athletes:\n• Harder to hit 1.8–2.2g protein/kg in 8 hours from plant sources — may need protein supplementation\n• Not recommended during aggressive muscle-building phases\n• Ensure adequate micronutrient intake — smaller eating window means denser nutrition needed`;
  }
  if (has('cholesterol', 'heart', 'cardiovascular', 'blood pressure', 'hypertension')) {
    return `Plant-based diets are the most powerful dietary intervention for cardiovascular health — studies show they reduce LDL cholesterol by 15–30% and lower blood pressure significantly. ❤️\n\nHeart-protective nutrients in plant foods:\n• Soluble fiber (oats, beans, psyllium): binds cholesterol in the gut for excretion\n• Sterols (nuts, seeds): directly block cholesterol absorption\n• Potassium (beans, sweet potato, banana): lowers blood pressure\n• Nitrates (beets, leafy greens): dilate blood vessels, reducing cardiovascular strain\n\nSpecific foods with strongest evidence:\n• Oats daily (3g beta-glucan) reduces LDL by 5–10%\n• Walnuts: reduces LDL and triglycerides\n• Flaxseeds: lowers blood pressure and LDL\n• Berries: reduces oxidized LDL (the dangerous form)\n\nFor athletes: aerobic exercise + plant-based diet is the most powerful combination for cardiovascular health.`;
  }
  if (has('diabetes', 'blood sugar', 'insulin', 'glycemic', 'a1c')) {
    return `Plant-based diets are exceptional for blood sugar management — high fiber slows glucose absorption, and legumes have remarkably low glycemic indices. 🌿\n\nBlood sugar optimization:\n• Prioritize low-glycemic foods: lentils (GI 32), chickpeas (GI 28), oats (GI 55), sweet potato (GI 54)\n• The 'plate method': fill half with non-starchy vegetables, quarter with protein (legumes/tofu), quarter with complex carbs\n• Add vinegar to meals (1–2 tbsp apple cider vinegar): reduces post-meal blood sugar by 20–30%\n• Eat carbs last in the meal: vegetables → protein → then carbs in that order reduces blood sugar spike\n• Cinnamon (Ceylon, not cassia): 1–3g/day shown to reduce fasting blood sugar and A1C\n\nExercise timing: a 10–15 minute walk after meals is one of the most effective blood sugar stabilizers known.`;
  }
  if (has('stress', 'anxiety', 'mental health', 'mood', 'depression', 'brain')) {
    return `The gut-brain axis is real — your microbiome produces 90% of your serotonin, and a plant-rich diet is the best diet for mental health. 🧠\n\nPlant-based mood boosters:\n• Magnesium (pumpkin seeds, dark chocolate, leafy greens): deficiency is linked to anxiety and depression\n• Omega-3 DHA (algae supplement): meta-analyses show similar effects to antidepressants for mild-moderate depression\n• Folate (legumes, leafy greens): deficiency correlates strongly with depression\n• Ashwagandha: 600mg/day reduces anxiety scores by ~40% in clinical trials\n• Walnuts: associated with 26% lower depression rates in population studies\n\nExercise is the most potent natural antidepressant — 30 min moderate cardio 3x/week matches the effect of SSRIs for mild depression. Combined with a whole-food plant diet, the synergy is powerful.`;
  }
  if (has('budget', 'cheap', 'affordable', 'cost', 'expensive', 'money')) {
    return `Whole-food plant-based eating is actually the most affordable way to eat — here's how to maximize nutrition per dollar: 💚\n\nMost cost-effective plant proteins (per gram of protein):\n1. Dried lentils: ~$0.04/g protein (cheapest by far)\n2. Dried black beans, chickpeas: ~$0.05/g protein\n3. Oats: ~$0.06/g protein\n4. Frozen edamame: ~$0.08/g protein\n5. Tofu: ~$0.10/g protein\n\nCost-saving strategy:\n• Buy dried legumes, not canned (4× cheaper, soak and batch cook)\n• Buy grains in bulk: oats, brown rice, quinoa\n• Seasonal produce or frozen veg (same nutrition, far cheaper)\n• Cook once, eat 4 times: big pots of lentil soup, bean chili, curry\n\nA highly nutritious plant-based diet can be done for $30–50/week per person.`;
  }

  // ── MEAL PLANNING / WHAT TO EAT ─────────────────────────────────────────
  if (has('what to eat', 'meal plan', 'menu', 'diet plan', 'meal prep')) {
    return `Let me give you a solid plant-based day of eating for an active person: 🌿\n\nBreakfast: Overnight oats (oats + chia + plant milk + banana + hemp seeds) — ~450 kcal, 18g protein\nMid-morning snack: Apple + 2 tbsp almond butter + a handful of pumpkin seeds — ~250 kcal, 9g protein\nLunch: Big lentil & roasted veggie bowl over brown rice + nutritional yeast — ~550 kcal, 25g protein\nPre-workout: Banana + dates — ~150 kcal, fast energy\nPost-workout: Pea protein shake + mango — ~300 kcal, 30g protein\nDinner: Tempeh stir-fry with broccoli, peppers, brown rice + sesame-ginger sauce — ~600 kcal, 30g protein\n\nTotal: ~2,300 kcal, ~112g protein. Adjust portions to your goals. Need a specific meal day for muscle gain, weight loss, or athletic performance? Just ask!`;
  }

  // ── FALLBACK — SMART, GENERAL ───────────────────────────────────────────
  const fallbacks = [
    "That's a great question! As your plant-based wellness guide, I can help you with exercise programming, nutrition strategy, supplement guidance, recovery, and more. Could you give me a bit more detail so I can give you the most specific advice? For example — are you focused on performance, weight management, building muscle, or general health? 🌿",
    "I want to make sure I give you the most useful answer possible. Could you be a bit more specific? I can dive deep on topics like: specific exercises and programming, pre/post workout nutrition, supplement protocols, plant-based protein strategies, fat loss or muscle gain plans, gut health, sleep optimization, or managing specific health conditions on a plant-based diet. 💚",
    "Great topic to explore! Plant-based nutrition and fitness is my specialty. To give you the most targeted advice: tell me your current fitness goal (build muscle, lose fat, improve endurance, or general health), your approximate body weight, and whether you're newer to plant-based eating or more experienced. That lets me personalize my response properly. 🌱",
  ];
  return fallbacks[Math.abs(q.charCodeAt(0) + q.length) % fallbacks.length];
}

export default function TrackPage() {
  const store = useEveStore();
  const [activeTab, setActiveTab] = useState<'macros' | 'workouts' | 'trainer'>('macros');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  const changeDate = (days: number) => {
    const d = new Date(selectedDate + 'T12:00:00');
    d.setDate(d.getDate() + days);
    setSelectedDate(d.toISOString().slice(0, 10));
  };

  const dateStr = new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  });

  const tabs = [
    { id: 'macros' as const,   label: '🥗 Macros' },
    { id: 'workouts' as const, label: '🏋️ Workouts' },
    { id: 'trainer' as const,  label: '✨ Eve' },
  ];

  return (
    <div className="flex flex-col min-h-screen animate-in fade-in duration-500">
      <PageHero
        title="Track"
        subtitle="Macros · Workouts · Trainer"
        accent="◈"
        photos={[
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=300&fit=crop&crop=center&q=90",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center&q=90",
          "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=300&fit=crop&crop=center&q=90",
        ]}
      >
        <div className="flex items-center justify-between bg-white/60 dark:bg-white/5 backdrop-blur-sm p-1.5 rounded-2xl border border-border/40">
          <Button variant="ghost" size="icon" onClick={() => changeDate(-1)} className="rounded-xl h-8 w-8">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <p className="text-sm font-bold text-foreground">{dateStr}</p>
          <Button variant="ghost" size="icon" onClick={() => changeDate(1)} className="rounded-xl h-8 w-8">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex gap-2 mt-3">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={cn("flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                activeTab === tab.id ? "bg-primary text-primary-foreground shadow-md" : "bg-white/60 dark:bg-white/5 text-muted-foreground border border-border/40")}>
              {tab.label}
            </button>
          ))}
        </div>
      </PageHero>

      <div className="flex-1 overflow-y-auto pb-24">
        {activeTab === 'macros'   && <MacrosTab date={selectedDate} store={store} />}
        {activeTab === 'workouts' && <WorkoutsTab date={selectedDate} store={store} />}
        {activeTab === 'trainer'  && <TrainerTab />}
      </div>
    </div>
  );
}

function MacrosTab({ date, store }: { date: string; store: ReturnType<typeof useEveStore> }) {
  const { trackerLog, trackerGoals, waterLog, weekPlan, logMeal, removeTrackerEntry, updateTrackerGoals, addWater, getWeeklyTotals } = store;
  const { play } = useSound();
  const logs = trackerLog[date] || [];
  const water = waterLog[date] || 0;
  const [manualName, setManualName] = useState('');
  const [manualMacros, setManualMacros] = useState({ cal: '', protein: '', carbs: '', fat: '', fiber: '' });
  const [foodBankOpen, setFoodBankOpen] = useState(false);
  const [foodBankSearch, setFoodBankSearch] = useState('');
  const [editGoals, setEditGoals] = useState(false);
  const [localGoals, setLocalGoals] = useState({ ...trackerGoals });
  const [showWeekly, setShowWeekly] = useState(false);
  const weeklyTotals = getWeeklyTotals();

  const totals = logs.reduce((acc, e) => ({
    cal: acc.cal + (e.cal || 0), protein: acc.protein + (e.protein || 0),
    carbs: acc.carbs + (e.carbs || 0), fat: acc.fat + (e.fat || 0), fiber: acc.fiber + (e.fiber || 0),
  }), { cal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });

  const handleManualLog = () => {
    if (!manualName.trim()) { toast.error('Enter a food name'); return; }
    const fromBank = lookupFoodBank(manualName.trim());
    const macros = fromBank || {
      cal: parseFloat(manualMacros.cal) || 0, protein: parseFloat(manualMacros.protein) || 0,
      carbs: parseFloat(manualMacros.carbs) || 0, fat: parseFloat(manualMacros.fat) || 0, fiber: parseFloat(manualMacros.fiber) || 0,
    };
    logMeal(date, { name: manualName.trim(), ...macros, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) });
    if (fromBank) toast.success(`✓ ${manualName.trim()} logged from food bank! +10 XP`);
    else toast.success(`✓ ${manualName.trim()} logged! +10 XP`);
    setManualName(''); setManualMacros({ cal: '', protein: '', carbs: '', fat: '', fiber: '' });
  };

  const handleFoodBankLog = (item: { n: string; cal: number; p: number; c: number; f: number; fi: number }) => {
    logMeal(date, { name: item.n, cal: item.cal, protein: item.p, carbs: item.c, fat: item.f, fiber: item.fi, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) });
    toast.success(`✓ ${item.n} logged! +10 XP`);
  };

  const saveGoals = () => { updateTrackerGoals(localGoals); setEditGoals(false); toast.success('Goals updated!'); };

  const allFoodBankItems = Object.values(FOOD_BANK).flat();
  const filteredItems = foodBankSearch
    ? allFoodBankItems.filter(i => i.n.toLowerCase().includes(foodBankSearch.toLowerCase()))
    : null;

  // Today's planned meals for quick-log
  const today = new Date(date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long' });
  const plannedMeals = SLOTS.map(slot => ({
    slot, name: weekPlan[`${today}-${slot}`]
  })).filter(m => m.name);

  const autoFillFromName = (name: string) => {
    const found = lookupFoodBank(name);
    if (found) {
      setManualMacros({
        cal: String(found.cal), protein: String(found.protein),
        carbs: String(found.carbs), fat: String(found.fat), fiber: String(found.fiber)
      });
    }
  };

  return (
    <div className="p-4 space-y-4">
      <MacroRing totals={totals} goals={trackerGoals} />

      <div className="grid grid-cols-5 gap-1.5">
        {([
          { key: 'cal', label: 'Cal', unit: 'kcal', color: 'bg-primary' },
          { key: 'protein', label: 'Pro', unit: 'g', color: 'bg-blue-500' },
          { key: 'carbs', label: 'Car', unit: 'g', color: 'bg-amber-500' },
          { key: 'fat', label: 'Fat', unit: 'g', color: 'bg-yellow-600' },
          { key: 'fiber', label: 'Fib', unit: 'g', color: 'bg-green-600' },
        ] as const).map(({ key, label, unit, color }) => {
          const val = totals[key as keyof typeof totals];
          const goal = trackerGoals[key as keyof typeof trackerGoals];
          const pct = Math.min(100, Math.round((val / Math.max(goal, 1)) * 100));
          return (
            <div key={key} className="bg-card border border-border/50 rounded-xl p-2 text-center space-y-1">
              <div className="text-[10px] font-bold text-muted-foreground uppercase">{label}</div>
              <div className="text-sm font-bold text-foreground">{val}</div>
              <div className="text-[8px] text-muted-foreground">{goal}{unit}</div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly summary toggle */}
      <button onClick={() => setShowWeekly(!showWeekly)}
        className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border/50 hover:bg-muted/30 transition-colors">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-foreground">Weekly Summary</span>
          {weeklyTotals.days > 0 && <span className="text-[9px] text-muted-foreground">{weeklyTotals.days} days logged</span>}
        </div>
        <span className="text-xs text-muted-foreground">{showWeekly ? '↑' : '↓'}</span>
      </button>
      {showWeekly && (
        <div className="grid grid-cols-5 gap-1.5 p-3 bg-muted/10 rounded-xl border border-border/30">
          {([
            { key: 'cal', label: 'Cal', color: 'text-primary' },
            { key: 'protein', label: 'Pro', color: 'text-blue-500' },
            { key: 'carbs', label: 'Car', color: 'text-amber-500' },
            { key: 'fat', label: 'Fat', color: 'text-yellow-600' },
            { key: 'fiber', label: 'Fib', color: 'text-green-600' },
          ] as const).map(({ key, label, color }) => (
            <div key={key} className="text-center">
              <div className={cn("text-base font-bold", color)}>{weeklyTotals[key as keyof typeof weeklyTotals]}</div>
              <div className="text-[8px] text-muted-foreground uppercase font-bold">{label}</div>
              <div className="text-[8px] text-muted-foreground">total</div>
            </div>
          ))}
        </div>
      )}

      {/* Water tracker */}
      <Card className="border-border/50">
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-bold text-foreground uppercase tracking-widest">Water</span>
              <span className="text-xs text-muted-foreground">{water}/{WATER_GOAL} glasses</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => addWater(date, -1)} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80 transition-colors"><Minus className="w-3 h-3" /></button>
              <button onClick={() => { addWater(date, 1); play('water'); if ((water + 1) >= WATER_GOAL) toast.success('💧 Hydration goal reached! +5 XP'); }}
                className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-colors"><Plus className="w-3 h-3" /></button>
            </div>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: WATER_GOAL }, (_, i) => (
              <div key={i} className={cn("flex-1 h-2 rounded-full transition-colors duration-300", i < water ? "bg-blue-500" : "bg-muted")} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Planned meals quick-log */}
      {plannedMeals.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Today's Planned Meals</h3>
            <span className="text-[9px] text-muted-foreground">Tap + to log</span>
          </div>
          <div className="space-y-1.5">
            {plannedMeals.map(({ slot, name }) => {
              const recipe = (PRELOADED_RECIPES as any)[name];
              const cal = recipe?.nutrition?.calories;
              const alreadyLogged = logs.some(e => e.name === name);
              return (
                <div key={`${slot}-${name}`} className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-colors",
                  alreadyLogged ? "bg-green-500/10 border-green-500/20" : "bg-card border-border/50"
                )}>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">{name}</p>
                    <p className="text-[9px] text-muted-foreground">{slot}{cal ? ` · ${cal} kcal` : ''}</p>
                  </div>
                  {alreadyLogged ? (
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                  ) : (
                    <button
                      onClick={() => {
                        const macros = recipe ? {
                          cal: recipe.nutrition.calories, protein: recipe.nutrition.protein,
                          carbs: recipe.nutrition.carbs, fat: recipe.nutrition.fat, fiber: recipe.nutrition.fiber
                        } : lookupFoodBank(name) || { cal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };
                        logMeal(date, { name, ...macros, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) });
                        toast.success(`✓ ${name} logged!`);
                      }}
                      className="shrink-0 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Log food card */}
      <Card className="border-border/50">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">➕ Log Food</h3>
            <button onClick={() => setEditGoals(!editGoals)} className="text-[10px] font-bold text-primary uppercase tracking-widest">
              {editGoals ? 'Done' : '⚙️ Goals'}
            </button>
          </div>
          {editGoals && (
            <div className="grid grid-cols-2 gap-2 p-3 bg-muted/20 rounded-xl border border-border/50">
              {(['cal', 'protein', 'carbs', 'fat', 'fiber'] as const).map(k => (
                <div key={k}>
                  <label className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">{k === 'cal' ? 'Calories (kcal)' : `${k} (g)`}</label>
                  <input type="number" value={localGoals[k]} onChange={e => setLocalGoals(prev => ({ ...prev, [k]: +e.target.value }))}
                    className="w-full bg-background border border-border rounded-lg px-2 py-1 text-sm font-bold text-foreground outline-none focus:border-primary mt-1" />
                </div>
              ))}
              <div className="col-span-2">
                <Button onClick={saveGoals} size="sm" className="w-full h-8 rounded-lg text-xs font-bold">Save Goals</Button>
              </div>
            </div>
          )}
          <div className="space-y-1">
            <input value={manualName} onChange={e => { setManualName(e.target.value); autoFillFromName(e.target.value); }}
              onBlur={() => autoFillFromName(manualName)}
              placeholder="Food name (auto-fills from food bank)..."
              className="w-full bg-muted/20 border border-border/50 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" />
            {manualName && lookupFoodBank(manualName) && (
              <p className="text-[10px] text-green-600 font-bold px-1">✓ Found in food bank — macros auto-filled!</p>
            )}
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {(['cal', 'protein', 'carbs', 'fat', 'fiber'] as const).map(k => (
              <div key={k} className="text-center">
                <div className="text-[8px] uppercase font-bold text-muted-foreground mb-1">{k === 'cal' ? 'kcal' : k}</div>
                <input type="number" value={manualMacros[k]} onChange={e => setManualMacros(prev => ({ ...prev, [k]: e.target.value }))}
                  placeholder="0"
                  className="w-full bg-muted/20 border border-border/50 rounded-lg px-1 py-1.5 text-xs font-bold text-foreground text-center outline-none focus:border-primary" />
              </div>
            ))}
          </div>
          <Button onClick={handleManualLog} className="w-full h-9 rounded-xl text-xs font-bold uppercase tracking-widest">
            + Add Entry
          </Button>
        </CardContent>
      </Card>

      {/* Today's log */}
      {logs.length > 0 && (
        <section className="space-y-2">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Logged Today ({logs.length})</h3>
          {logs.map(entry => (
            <div key={entry.id} className="bg-card border border-border/50 rounded-xl px-3 py-2.5 flex items-center gap-3 shadow-sm">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground truncate">{entry.name}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  <span className="text-primary font-bold">{entry.cal}kcal</span>{' | '}
                  P:{entry.protein}g C:{entry.carbs}g F:{entry.fat}g
                  {entry.fiber > 0 && ` | Fi:${entry.fiber}g`}
                  {entry.time && <span className="opacity-60"> · {entry.time}</span>}
                </p>
              </div>
              <button onClick={() => removeTrackerEntry(date, entry.id)}
                className="p-1 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </section>
      )}

      {/* Food bank */}
      <div>
        <button onClick={() => setFoodBankOpen(!foodBankOpen)}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#1e1008] to-[#2d1a0a] text-white font-bold text-sm">
          <span>🗂 Plant-Based Food Bank (200+ foods)</span>
          <span className="text-lg">{foodBankOpen ? '↑' : '↓'}</span>
        </button>
        {foodBankOpen && (
          <div className="border border-border border-t-0 rounded-b-xl overflow-hidden">
            <div className="sticky top-0 bg-background border-b border-border p-2 z-10">
              <input value={foodBankSearch} onChange={e => setFoodBankSearch(e.target.value)}
                placeholder="Search 200+ vegan foods..."
                className="w-full bg-muted/20 border border-border/50 rounded-full px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" />
            </div>
            <div className="p-2 max-h-96 overflow-y-auto space-y-1">
              {filteredItems
                ? filteredItems.map(item => <FoodBankRow key={item.n} item={item} onLog={() => handleFoodBankLog(item)} />)
                : Object.entries(FOOD_BANK).map(([cat, items]) => (
                    <div key={cat}>
                      <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest px-2 py-1.5">{cat}</div>
                      {[...items].sort((a, b) => a.n.localeCompare(b.n)).map(item => <FoodBankRow key={item.n} item={item} onLog={() => handleFoodBankLog(item)} />)}
                    </div>
                  ))
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FoodBankRow({ item, onLog }: { item: { n: string; cal: number; p: number; c: number; f: number; fi: number }; onLog: () => void }) {
  return (
    <div className="flex items-center gap-2 bg-card border border-border/40 rounded-xl px-3 py-2 shadow-sm">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-foreground truncate">{item.n}</p>
        <p className="text-[9px] text-muted-foreground"><span className="text-primary font-bold">{item.cal}kcal</span>{' | '}P:{item.p}g C:{item.c}g F:{item.f}g Fi:{item.fi}g</p>
      </div>
      <button onClick={onLog} className="shrink-0 px-2.5 py-1 bg-primary text-primary-foreground rounded-full text-[9px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity">
        + Log
      </button>
    </div>
  );
}

function MacroRing({
  totals,
  goals,
}: {
  totals: { cal: number; protein: number; carbs: number; fat: number; fiber: number };
  goals: { cal: number; protein: number; carbs: number; fat: number; fiber: number };
}) {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  );
  useEffect(() => {
    const id = setInterval(
      () => setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })),
      15000
    );
    return () => clearInterval(id);
  }, []);

  const calPct  = Math.min(100, (totals.cal     / Math.max(goals.cal,     1)) * 100);
  const proPct  = Math.min(100, (totals.protein  / Math.max(goals.protein, 1)) * 100);
  const carbPct = Math.min(100, (totals.carbs    / Math.max(goals.carbs,   1)) * 100);
  const fatPct  = Math.min(100, (totals.fat      / Math.max(goals.fat,     1)) * 100);
  const fibPct  = Math.min(100, (totals.fiber    / Math.max(goals.fiber,   1)) * 100);

  const r    = 60;
  const circ = 2 * Math.PI * r;

  const MacroLabel = ({
    label,
    val,
    goal,
    unit,
    pct,
    align,
    color,
  }: {
    label: string;
    val: number;
    goal: number;
    unit: string;
    pct: number;
    align: 'left' | 'right';
    color: string;
  }) => (
    <div className={cn('flex flex-col gap-[2px]', align === 'right' ? 'items-end' : 'items-start')}>
      <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground leading-none">
        {label}
      </span>
      <span className={cn('text-[13px] font-bold leading-none', color)}>
        {val}
        <span className="text-[9px] font-normal text-muted-foreground ml-[1px]">{unit}</span>
      </span>
      <span className="text-[8px] text-muted-foreground leading-none">
        /{goal}{unit}
      </span>
      <div className="w-10 h-[3px] bg-muted rounded-full overflow-hidden mt-[2px]">
        <div
          className={cn('h-full rounded-full transition-all duration-700', color.replace('text-', 'bg-'))}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="flex justify-center py-3">
      <div className="relative select-none" style={{ width: 300, height: 200 }}>
        {/* ── SVG ring — centred ── */}
        <div
          className="absolute"
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <div className="relative" style={{ width: 152, height: 152 }}>
            <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r={r} stroke="currentColor" strokeWidth="11" fill="transparent"
                className="text-muted/25" />
              <circle cx="70" cy="70" r={r} stroke="currentColor" strokeWidth="11" fill="transparent"
                strokeDasharray={circ} strokeDashoffset={circ - (calPct / 100) * circ}
                strokeLinecap="round"
                className="text-primary transition-all duration-1000 ease-out" />
            </svg>
            {/* ── Centre text ── */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[7px] font-black uppercase tracking-[0.22em] text-muted-foreground leading-none">
                Today
              </span>
              <span className="text-[28px] font-serif font-bold text-foreground leading-none mt-0.5">
                {totals.cal}
              </span>
              <span className="text-[7px] text-muted-foreground leading-none mt-[2px]">
                /{goals.cal} kcal
              </span>
              <span className="text-[8px] font-bold text-primary leading-none mt-[3px]">
                {time}
              </span>
              {totals.cal < goals.cal && (
                <span className="text-[7px] text-muted-foreground leading-none mt-[2px]">
                  {goals.cal - totals.cal} left
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Macro labels at corners + left ── */}

        {/* Calories — top-left */}
        <div className="absolute" style={{ top: 0, left: 0 }}>
          <MacroLabel label="Calories" val={totals.cal} goal={goals.cal} unit="kcal"
            pct={calPct} align="left" color="text-primary" />
        </div>

        {/* Protein — top-right */}
        <div className="absolute" style={{ top: 0, right: 0 }}>
          <MacroLabel label="Protein" val={totals.protein} goal={goals.protein} unit="g"
            pct={proPct} align="right" color="text-blue-500" />
        </div>

        {/* Carbs — left-middle */}
        <div className="absolute" style={{ top: '50%', left: 0, transform: 'translateY(-50%)' }}>
          <MacroLabel label="Carbs" val={totals.carbs} goal={goals.carbs} unit="g"
            pct={carbPct} align="left" color="text-amber-500" />
        </div>

        {/* Fat — bottom-left */}
        <div className="absolute" style={{ bottom: 0, left: 0 }}>
          <MacroLabel label="Fat" val={totals.fat} goal={goals.fat} unit="g"
            pct={fatPct} align="left" color="text-yellow-600" />
        </div>

        {/* Fiber — bottom-right */}
        <div className="absolute" style={{ bottom: 0, right: 0 }}>
          <MacroLabel label="Fiber" val={totals.fiber} goal={goals.fiber} unit="g"
            pct={fibPct} align="right" color="text-green-600" />
        </div>
      </div>
    </div>
  );
}

// ── Per-exercise emoji icons ────────────────────────────────────────────────
const EXERCISE_ICONS: Record<string, string> = {
  // Back
  'Pull-Ups': '🔝', 'Lat Pulldown': '⬇️', 'Bent-Over Row': '🏋️',
  'Seated Cable Row': '🪑', 'T-Bar Row': '↔️', 'Single-Arm Dumbbell Row': '💪',
  'Face Pulls': '😤', 'Straight-Arm Pulldown': '📉', 'Deadlift': '🏗️', 'Hyperextensions': '🔄',
  // Chest
  'Barbell Bench Press': '🏋️', 'Dumbbell Bench Press': '🤲', 'Incline Bench Press': '📐',
  'Decline Bench Press': '📉', 'Chest Fly': '🦅', 'Cable Crossover': '✖️',
  'Push-Ups': '🤸', 'Dips': '⬇️', 'Pec Deck Machine': '🦾', 'Close-Grip Bench Press': '🤜',
  // Arms
  'Barbell Curl': '💪', 'Dumbbell Curl': '🏋️', 'Hammer Curl': '🔨', 'Preacher Curl': '🪑',
  'Concentration Curl': '🎯', 'Tricep Pushdown': '⬇️', 'Skull Crushers': '💀',
  'Overhead Tricep Extension': '☝️', 'Diamond Push-Ups': '💎',
  // Shoulders
  'Overhead Press': '⬆️', 'Dumbbell Shoulder Press': '🏋️', 'Lateral Raise': '↔️',
  'Front Raise': '⬆️', 'Rear Delt Fly': '🦅', 'Arnold Press': '🌀',
  'Upright Row': '↑', 'Cable Lateral Raise': '📡', 'Face Pull': '😤', 'Shrugs': '🤷',
  // Legs
  'Barbell Squat': '🏋️', 'Leg Press': '🦵', 'Romanian Deadlift': '🏗️',
  'Leg Curl': '🦵', 'Leg Extension': '↗️', 'Lunges': '🚶',
  'Bulgarian Split Squat': '🧘', 'Calf Raise': '👟', 'Hack Squat': '⬇️', 'Goblet Squat': '🍶',
  // Core
  'Plank': '⏤', 'Crunches': '🔄', 'Bicycle Crunches': '🚴', 'Leg Raises': '🦵',
  'Russian Twists': '🌀', 'Ab Rollout': '⭕', 'Hanging Knee Raises': '🔼',
  'Cable Crunch': '📎', 'Side Plank': '↔️', 'Mountain Climbers': '⛰️',
  // Cardio
  'Treadmill Run': '🏃', 'Stationary Bike': '🚴', 'Rowing Machine': '🚣',
  'Elliptical': '🔄', 'Jump Rope': '➰', 'Stair Climber': '🪜',
  'HIIT Sprints': '⚡', 'Swimming': '🏊', 'Cycling': '🚵', 'Burpees': '💥',
  // Full Body
  'Clean and Press': '🏋️', 'Kettlebell Swing': '⚙️', 'Thrusters': '🚀',
  'Battle Ropes': '🌊', 'Box Jumps': '📦', "Farmer's Walk": '👨‍🌾',
  'Turkish Get-Up': '🌙', 'Man Makers': '💪',
};

const CATEGORY_STYLE: Record<string, { grad: string; text: string; active: string }> = {
  'Back':      { grad: 'from-blue-600 to-blue-500',     text: 'text-blue-600 dark:text-blue-400',     active: 'bg-blue-500/12 border-blue-500/50' },
  'Chest':     { grad: 'from-rose-500 to-primary',      text: 'text-rose-500 dark:text-rose-400',     active: 'bg-rose-500/12 border-rose-500/50' },
  'Arms':      { grad: 'from-purple-600 to-violet-500', text: 'text-purple-600 dark:text-purple-400', active: 'bg-purple-500/12 border-purple-500/50' },
  'Shoulders': { grad: 'from-amber-500 to-yellow-400',  text: 'text-amber-600 dark:text-amber-400',   active: 'bg-amber-500/12 border-amber-500/50' },
  'Legs':      { grad: 'from-emerald-600 to-green-500', text: 'text-emerald-600 dark:text-emerald-400',active: 'bg-emerald-500/12 border-emerald-500/50' },
  'Core':      { grad: 'from-orange-500 to-amber-400',  text: 'text-orange-500 dark:text-orange-400', active: 'bg-orange-500/12 border-orange-500/50' },
  'Cardio':    { grad: 'from-red-500 to-rose-400',      text: 'text-red-500 dark:text-red-400',       active: 'bg-red-500/12 border-red-500/50' },
  'Full Body': { grad: 'from-teal-600 to-cyan-500',     text: 'text-teal-600 dark:text-teal-400',     active: 'bg-teal-500/12 border-teal-500/50' },
};

function WorkoutsTab({ date, store }: { date: string; store: ReturnType<typeof useEveStore> }) {
  const { workoutLog, logWorkout, removeWorkoutEntry, suggestedWorkouts } = store;
  const { play } = useSound();
  const todayLog = workoutLog[date] || [];

  // Today's suggested plan (filter already-logged exercises)
  const todayName = new Date(date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long' });
  const todayPlan = (suggestedWorkouts[todayName] || []).filter(
    s => !todayLog.some(l => l.exercise === s.exercise)
  );

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [sets, setSets] = useState([{ weight: '', reps: '' }]);
  const [cardioData, setCardioData] = useState({ duration: '', distance: '', intensity: 'Moderate' });
  const [notes, setNotes] = useState('');
  const [editingEntryId, setEditingEntryId] = useState<number | null>(null);
  const [editWeight, setEditWeight] = useState('');
  const [editReps, setEditReps] = useState('');
  const [editNotes, setEditNotes] = useState('');

  const isCardio = activeCategory === 'Cardio';

  // Scan all historical log entries for a given exercise name
  const getExerciseHistory = (exerciseName: string) => {
    return Object.entries(workoutLog)
      .flatMap(([logDate, entries]) =>
        entries.filter(e => e.exercise === exerciseName).map(e => ({ ...e, logDate }))
      )
      .sort((a, b) => b.logDate.localeCompare(a.logDate))
      .slice(0, 3);
  };

  const getRelativeDate = (d: string) => {
    const diff = Math.floor((Date.now() - new Date(d).getTime()) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return `${diff}d ago`;
    return `${Math.floor(diff / 7)}w ago`;
  };

  const getSuggestion = (history: ReturnType<typeof getExerciseHistory>) => {
    if (!history.length) return 'First time! Start moderate and nail your form. 🎯';
    const last = history[0];
    if (last.sets[0]?.duration) {
      const dur = parseInt(last.sets[0].duration || '0');
      const dist = parseFloat(last.sets[0].distance || '0');
      const lvl = last.sets[0].intensity || 'Moderate';
      const intensities = ['Easy', 'Moderate', 'Hard', 'Max Effort'];
      const next = intensities[Math.min(intensities.indexOf(lvl) + 1, 3)];
      return `Last: ${dur} min${dist ? ` · ${dist}km` : ''} at ${lvl}. Try ${dur + 5} min or bump to ${next}. 🔥`;
    }
    const w = parseFloat(last.sets[0]?.weight || '0');
    const r = parseInt(last.sets[0]?.reps || '0');
    const s = last.sets.length;
    if (w > 0) {
      const bump = w >= 60 ? 2.5 : 1.25;
      return `Last: ${s}×${r} @ ${w}kg. Aim for ${w + bump}kg, or ${s}×${r + 2} @ ${w}kg. 💪`;
    }
    return `Last: ${s}×${r} reps bodyweight. Try ${s}×${r + 2} or add a set today! 🔥`;
  };

  const selectExercise = (ex: string) => {
    setSelectedExercise(ex === selectedExercise ? null : ex);
    setSets([{ weight: '', reps: '' }]);
    setCardioData({ duration: '', distance: '', intensity: 'Moderate' });
    setNotes('');
  };

  const handleQuickLog = (item: SuggestedExercise, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCategory(item.category);
    selectExercise(item.exercise);
  };

  const addSet = () => setSets(p => [...p, { weight: '', reps: '' }]);
  const removeSet = (i: number) => setSets(p => p.filter((_, idx) => idx !== i));
  const updateSet = (i: number, field: 'weight' | 'reps', val: string) =>
    setSets(p => p.map((s, idx) => idx === i ? { ...s, [field]: val } : s));

  const handleLog = () => {
    if (!activeCategory || !selectedExercise) return;
    if (isCardio) {
      if (!cardioData.duration) { toast.error('Enter duration'); return; }
      logWorkout(date, { category: activeCategory, exercise: selectedExercise, notes, sets: [{ weight: '', reps: cardioData.duration, duration: cardioData.duration, distance: cardioData.distance, intensity: cardioData.intensity }] });
    } else {
      const valid = sets.filter(s => s.reps);
      if (!valid.length) { toast.error('Add at least one set with reps'); return; }
      logWorkout(date, { category: activeCategory, exercise: selectedExercise, notes, sets: valid });
    }
    play('workout');
    toast.success(`✓ ${selectedExercise} logged! +15 XP 💪`);
    setSelectedExercise(null);
  };

  const startEdit = (entry: typeof todayLog[number]) => {
    const firstSet = entry.sets[0];
    setEditingEntryId(entry.id);
    setEditWeight(firstSet?.weight || '');
    setEditReps(firstSet?.reps || firstSet?.duration || '');
    setEditNotes(entry.notes || '');
  };

  const saveEdit = (entryId: number) => {
    const entry = todayLog.find(e => e.id === entryId);
    if (!entry) return;
    const isCardioEntry = !!entry.sets[0]?.duration;
    const updated = todayLog.map(item => item.id === entryId ? {
      ...item,
      notes: editNotes,
      sets: isCardioEntry
        ? [{ ...item.sets[0], duration: editReps, reps: editReps }]
        : item.sets.map(set => ({ ...set, weight: editWeight, reps: editReps })),
    } : item);
    store.setState(prev => ({ ...prev, workoutLog: { ...prev.workoutLog, [date]: updated } }));
    toast.success('Workout updated!');
    setEditingEntryId(null);
  };

  const catStyle = (cat: string) => CATEGORY_STYLE[cat] || CATEGORY_STYLE['Back'];
  const history = selectedExercise ? getExerciseHistory(selectedExercise) : [];

  return (
    <div className="p-4 space-y-4 pb-32">

      {/* Header */}
      <div className="rounded-2xl overflow-hidden shadow-sm" style={{ border: '1px solid rgba(201,168,76,0.32)' }}>
        <div className="bg-gradient-to-r from-[#1e1008] to-[#2d1a0a] p-4">
          <h2 className="text-white font-serif text-xl font-bold">Workout Logger</h2>
          <p className="text-white/70 text-xs mt-1">
            {todayLog.length} exercise{todayLog.length !== 1 ? 's' : ''} logged today
          </p>
        </div>
      </div>

      {/* Today's AI-generated workout plan */}
      {todayPlan.length > 0 && (
        <div className="rounded-2xl overflow-hidden shadow-sm" style={{ border: '1px solid rgba(201,168,76,0.28)' }}>
          <div className="bg-gradient-to-r from-[#1e1008] to-[#2d1a0a] px-4 py-3 flex items-center gap-2">
            <span className="text-base">📋</span>
            <div>
              <h3 className="text-white font-serif text-sm font-bold leading-tight">Today's Training Plan</h3>
              <p className="text-white/55 text-[10px] mt-0.5">Tap any exercise to jump straight to logging it</p>
            </div>
          </div>
          <div className="bg-card divide-y divide-border/30">
            {todayPlan.map((item, idx) => (
              <div key={idx} className="flex items-center divide-x divide-border/30">
                {/* Main row — tap to open full log form */}
                <button
                  onClick={() => { setActiveCategory(item.category); selectExercise(item.exercise); }}
                  className="flex-1 flex items-center gap-3 px-4 py-3 hover:bg-muted/20 active:bg-muted/30 transition-colors text-left min-w-0"
                >
                  <span className="text-xl shrink-0 leading-none">{EXERCISE_ICONS[item.exercise] || '💪'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={cn(
                        "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0",
                        CATEGORY_STYLE[item.category]?.active || 'bg-primary/10 text-primary border-primary/20'
                      )}>{item.category}</span>
                      <span className="text-sm font-bold text-foreground truncate">{item.exercise}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {item.sets > 1 ? `${item.sets} sets × ` : ''}{item.reps}
                      <span className="ml-1.5 text-primary/70">— {item.note}</span>
                    </p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
                </button>
                {/* + Quick-log button */}
                <button
                  onClick={e => handleQuickLog(item, e)}
                  title="Quick log with default sets"
                  className="shrink-0 w-12 self-stretch flex items-center justify-center hover:bg-primary/10 active:bg-primary/20 transition-colors group"
                >
                  <Plus className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state: rest day vs no plan yet */}
      {(suggestedWorkouts[todayName] || []).length === 0 && (
        Object.values(suggestedWorkouts).some(w => w.length > 0) ? (
          <div className="rounded-2xl border border-dashed border-border/60 p-5 text-center space-y-1.5">
            <span className="text-2xl block">🧘</span>
            <p className="text-sm font-bold text-foreground">Rest Day</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Today is a planned recovery day — your body grows during rest. Stay active with a walk or gentle stretching!
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border/60 p-5 text-center space-y-1.5">
            <span className="text-2xl block">🏋️</span>
            <p className="text-sm font-bold text-foreground">No workout plan yet</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Tap <strong>Auto-Plan</strong> on the Home tab to generate a personalised weekly workout plan based on your fitness profile.
            </p>
          </div>
        )
      )}

      {/* Category pill row */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Muscle Group</p>
          <span className="flex items-center gap-0.5 text-[9px] text-muted-foreground/50 font-medium">
            swipe <ChevronRight className="w-3 h-3" />
          </span>
        </div>
        <div className="relative">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 pr-8">
          {Object.keys(WORKOUT_CATALOG).map(cat => {
            const s = catStyle(cat);
            const isActive = activeCategory === cat;
            return (
              <button key={cat}
                onClick={() => { setActiveCategory(isActive ? null : cat); setSelectedExercise(null); }}
                className={cn(
                  "shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all",
                  isActive
                    ? `bg-gradient-to-r ${s.grad} text-white border-transparent shadow-sm`
                    : "bg-muted/20 text-muted-foreground border-border hover:border-primary/30"
                )}>
                {cat.replace(/&/g, 'and')}
              </button>
            );
          })}
        </div>
        {/* Scroll fade hint */}
        <div className="absolute right-0 top-0 bottom-1 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none rounded-r-full" />
        </div>
      </div>

      {/* Exercise icon grid */}
      <AnimatePresence mode="wait">
        {activeCategory && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-3 gap-2"
          >
            {(WORKOUT_CATALOG[activeCategory] || []).map(ex => {
              const s = catStyle(activeCategory);
              const isSel = selectedExercise === ex;
              const hasDone = Object.values(workoutLog).some(entries => entries.some(e => e.exercise === ex));
              return (
                <motion.button
                  key={ex}
                  onClick={() => selectExercise(ex)}
                  whileTap={{ scale: 0.94 }}
                  className={cn(
                    "relative flex flex-col items-center gap-1.5 p-3 rounded-2xl border transition-all text-center",
                    isSel ? `${s.active} shadow-sm` : "bg-card border-border/60 hover:border-primary/30 hover:bg-muted/20"
                  )}
                >
                  <span className="text-2xl leading-none">{EXERCISE_ICONS[ex] || '💪'}</span>
                  <span className={cn("text-[8.5px] font-bold leading-tight", isSel ? s.text : "text-foreground/80")}>
                    {ex}
                  </span>
                  {hasDone && (
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm" />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exercise detail + log panel */}
      <AnimatePresence>
        {selectedExercise && activeCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-2xl overflow-hidden border border-border/60 shadow-sm"
          >
            {/* Coloured header */}
            <div className={cn("bg-gradient-to-r p-4", catStyle(activeCategory).grad)}>
              <div className="flex items-center gap-3">
                <span className="text-3xl drop-shadow">{EXERCISE_ICONS[selectedExercise] || '💪'}</span>
                <div>
                  <h3 className="text-white font-serif text-lg font-bold leading-tight">{selectedExercise}</h3>
                  <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest">{activeCategory}</span>
                </div>
              </div>
            </div>

            <div className="bg-card p-4 space-y-4">

              {/* History cards */}
              {history.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">📊 Last Sessions</p>
                  <div className="grid grid-cols-3 gap-2">
                    {history.map((h, i) => (
                      <div key={i} className="bg-muted/20 rounded-xl p-2.5 text-center border border-border/40">
                        <p className="text-[9px] text-muted-foreground font-bold">{getRelativeDate(h.logDate)}</p>
                        <p className="text-[10px] font-bold text-foreground mt-1 leading-tight">
                          {h.sets[0]?.duration
                            ? `${h.sets[0].duration}min${h.sets[0].distance ? ` · ${h.sets[0].distance}km` : ''}`
                            : `${h.sets.length}×${h.sets[0]?.reps || '?'}${h.sets[0]?.weight ? ` @${h.sets[0].weight}kg` : ''}`}
                        </p>
                        {h.sets[0]?.intensity && (
                          <p className="text-[8px] text-muted-foreground mt-0.5">{h.sets[0].intensity}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-muted/15 rounded-xl p-3 text-center border border-border/30">
                  <p className="text-[10px] text-muted-foreground font-medium">No history yet — this will be your first log!</p>
                </div>
              )}

              {/* Progression suggestion */}
              <div className="flex items-start gap-2.5 p-3 bg-primary/8 border border-primary/20 rounded-xl">
                <span className="text-base shrink-0">🎯</span>
                <p className="text-xs text-foreground leading-relaxed">{getSuggestion(history)}</p>
              </div>

              {/* Cardio inputs */}
              {isCardio ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Duration (min)</label>
                      <input type="number" inputMode="numeric" value={cardioData.duration}
                        onChange={e => setCardioData(p => ({ ...p, duration: e.target.value }))} placeholder="30"
                        className="w-full bg-muted/20 border border-border rounded-xl px-3 py-2 text-sm text-foreground outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Distance (km)</label>
                      <input type="number" inputMode="decimal" value={cardioData.distance}
                        onChange={e => setCardioData(p => ({ ...p, distance: e.target.value }))} placeholder="5.0"
                        className="w-full bg-muted/20 border border-border rounded-xl px-3 py-2 text-sm text-foreground outline-none focus:border-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">Intensity</label>
                    <div className="flex gap-2 flex-wrap">
                      {CARDIO_INTENSITIES.map(lvl => (
                        <button key={lvl} onClick={() => setCardioData(p => ({ ...p, intensity: lvl }))}
                          className={cn("px-3 py-1 rounded-full text-xs font-bold transition-all border",
                            cardioData.intensity === lvl
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-muted/20 text-muted-foreground border-border hover:border-primary/30")}>
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Strength sets */
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Sets</label>
                    <button onClick={addSet} className="text-[9px] font-bold text-primary uppercase tracking-widest">+ Add Set</button>
                  </div>
                  {sets.map((set, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-muted-foreground w-6 text-center shrink-0">S{i + 1}</span>
                      <input type="number" inputMode="decimal" value={set.weight}
                        onChange={e => updateSet(i, 'weight', e.target.value)} placeholder="kg"
                        className="flex-1 bg-muted/20 border border-border rounded-xl px-3 py-1.5 text-xs text-foreground outline-none focus:border-primary" />
                      <input type="number" inputMode="numeric" value={set.reps}
                        onChange={e => updateSet(i, 'reps', e.target.value)} placeholder="reps"
                        className="flex-1 bg-muted/20 border border-border rounded-xl px-3 py-1.5 text-xs text-foreground outline-none focus:border-primary" />
                      {sets.length > 1 && (
                        <button onClick={() => removeSet(i)} className="text-muted-foreground hover:text-destructive shrink-0">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Notes */}
              <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes (optional)..."
                className="w-full bg-muted/20 border border-border rounded-xl px-3 py-1.5 text-xs text-foreground outline-none focus:border-primary" />

              <Button onClick={handleLog} className="w-full h-10 rounded-xl font-bold text-xs uppercase tracking-widest">
                <Dumbbell className="w-4 h-4 mr-2" /> Log {selectedExercise}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Today's logged workout */}
      {todayLog.length > 0 && (
        <section className="space-y-2">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Today's Workout</h3>
          {todayLog.map(entry =>
            editingEntryId === entry.id ? (
              <div key={entry.id} className="bg-card border border-primary/30 rounded-xl px-3 py-3 shadow-sm space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{EXERCISE_ICONS[entry.exercise] || '💪'}</span>
                  <span className="text-sm font-bold text-foreground">{entry.exercise}</span>
                  <span className="text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider ml-auto">{entry.category}</span>
                </div>
                {!entry.sets[0]?.duration ? (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">Weight (kg)</label>
                      <input type="number" inputMode="decimal" value={editWeight} onChange={e => setEditWeight(e.target.value)} placeholder="optional"
                        className="w-full bg-muted/20 border border-border rounded-lg px-2 py-1.5 text-xs text-foreground outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">Reps</label>
                      <input type="number" inputMode="numeric" value={editReps} onChange={e => setEditReps(e.target.value)} placeholder="10"
                        className="w-full bg-muted/20 border border-border rounded-lg px-2 py-1.5 text-xs text-foreground outline-none focus:border-primary" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">Duration (min)</label>
                    <input type="number" inputMode="numeric" value={editReps} onChange={e => setEditReps(e.target.value)} placeholder="30"
                      className="w-full bg-muted/20 border border-border rounded-lg px-2 py-1.5 text-xs text-foreground outline-none focus:border-primary" />
                  </div>
                )}
                <input value={editNotes} onChange={e => setEditNotes(e.target.value)} placeholder="Notes (optional)..."
                  className="w-full bg-muted/20 border border-border rounded-lg px-2 py-1.5 text-xs text-foreground outline-none focus:border-primary" />
                <div className="flex gap-2">
                  <Button onClick={() => saveEdit(entry.id)} size="sm" className="flex-1 h-7 rounded-lg text-[10px] font-bold uppercase tracking-wider">Save</Button>
                  <button onClick={() => setEditingEntryId(null)} className="flex-1 h-7 rounded-lg text-[10px] font-bold border border-border text-muted-foreground hover:bg-muted/20 transition-colors">Cancel</button>
                </div>
              </div>
            ) : (
              <div key={entry.id} className="bg-card border border-border/50 rounded-xl px-3 py-2.5 flex items-start gap-3 shadow-sm">
                <span className="text-xl shrink-0 mt-0.5">{EXERCISE_ICONS[entry.exercise] || '💪'}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">{entry.category}</span>
                    <span className="text-sm font-bold text-foreground">{entry.exercise}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {entry.sets.map((s, i) =>
                      s.duration
                        ? `${s.duration}min${s.distance ? ` · ${s.distance}km` : ''}${s.intensity ? ` · ${s.intensity}` : ''}`
                        : `S${i + 1}: ${s.weight ? `${s.weight}kg × ` : ''}${s.reps} reps`
                    ).join(' | ')}
                  </p>
                  {entry.notes && <p className="text-[9px] text-muted-foreground italic mt-0.5">"{entry.notes}"</p>}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => startEdit(entry)}
                    className="p-1 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    title="Edit entry">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => removeWorkoutEntry(date, entry.id)}
                    className="p-1 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    title="Delete entry">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )
          )}
        </section>
      )}
    </div>
  );
}

interface ChatMessage { role: 'user' | 'assistant'; text: string; }

function TrainerTab() {
  const store = useEveStore();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', text: "Hi, I'm Eve 🌿 Think of me as your plant-based wellness companion. Whether it's nutrition, fitness, recovery, or just figuring out what to eat — I'm here for all of it. What's on your mind today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text }]);
    setLoading(true);
    try {
      const weekSummary = DAYS.map(d => {
        const meals = SLOTS.map(s => store.weekPlan[d+'-'+s]).filter(Boolean);
        return meals.length ? d+': '+meals.join(', ') : null;
      }).filter(Boolean).join(' | ');
      const ctx = 'Week plan: '+weekSummary+'. Goals: '+JSON.stringify(store.trackerGoals)+'. Profile: '+(store.settings?.fitnessProfile||'general');
      const resp = await fetch('/api/eve/wellness-report',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:text,context:ctx})});
      const data = await resp.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.report || 'Sorry, try again!' }]);
    } catch(e) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Connection error.' }]);
    }
    setLoading(false);
  };

  const contextualQuickPrompts = [
    'I need a vegan pre-workout snack',
    'What should I eat after lifting?',
    'How much protein do I need?',
    'My squat form feels off',
  ];

  const QUICK_QUESTIONS = [
    'Am I getting enough protein?',
    'What should I eat before a workout?',
    'How do I build muscle on plants?',
    'Help me lose weight',
    'Recovery tips 🍒',
  ];

  return (
    <div className="flex flex-col h-full" style={{ height: 'calc(100vh - 200px)' }}>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-2">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {contextualQuickPrompts.map(q => (
            <button key={q} onClick={() => setInput(q)}
              className="shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold border border-border/50 bg-muted/20 text-muted-foreground">
              {q}
            </button>
          ))}
        </div>

        {/* Eve identity card */}
        <div
          className="flex items-center gap-3 p-4 rounded-2xl mb-1"
          style={{
            background: 'linear-gradient(135deg, rgba(196,133,106,0.10) 0%, rgba(201,168,76,0.07) 100%)',
            border: '1px solid rgba(201,168,76,0.28)',
          }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-[22px] flex-shrink-0"
            style={{
              background: 'linear-gradient(145deg, hsl(12 42% 62%) 0%, hsl(12 42% 50%) 100%)',
              boxShadow: '0 0 0 2.5px rgba(201,168,76,0.45), 0 4px 14px rgba(0,0,0,0.14)',
            }}
          >
            🌿
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground font-serif">Eve</p>
            <p className="text-[10px] text-muted-foreground">Your Plant-Based Wellness Guide</p>
          </div>
          <span
            className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0"
            style={{ background: 'rgba(201,168,76,0.12)', color: '#B8922A' }}
          >
            ✦ Online
          </span>
        </div>

        {messages.map((msg, i) => (
          <div key={i} className={cn("flex gap-2", msg.role === 'user' ? 'justify-end' : 'justify-start items-end')}>
            {msg.role === 'assistant' && (
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 mb-0.5"
                style={{
                  background: 'linear-gradient(145deg, hsl(12 42% 62%) 0%, hsl(12 42% 50%) 100%)',
                  boxShadow: '0 0 0 1.5px rgba(201,168,76,0.35)',
                }}
              >
                🌿
              </div>
            )}
            <div className={cn(
              "max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed",
              msg.role === 'user'
                ? "bg-primary text-primary-foreground rounded-br-sm"
                : "bg-card text-foreground rounded-bl-sm"
            )}
              style={msg.role === 'assistant' ? { border: '1px solid rgba(201,168,76,0.20)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' } : {}}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2 items-end">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0"
              style={{ background: 'linear-gradient(145deg, hsl(12 42% 62%) 0%, hsl(12 42% 50%) 100%)', boxShadow: '0 0 0 1.5px rgba(201,168,76,0.35)' }}
            >🌿</div>
            <div className="bg-card rounded-2xl rounded-bl-sm px-4 py-3" style={{ border: '1px solid rgba(201,168,76,0.20)' }}>
              <div className="flex gap-1">
                {[0,1,2].map(i => <div key={i} className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {QUICK_QUESTIONS.map(q => (
            <button key={q} onClick={() => setInput(q)}
              className="text-[10px] font-medium text-foreground border rounded-full px-2.5 py-1 transition-all hover:bg-primary/10 hover:border-primary/30"
              style={{ borderColor: 'rgba(201,168,76,0.30)', background: 'rgba(201,168,76,0.06)' }}>
              {q}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 border-t border-border/50 bg-background">
        <div className="flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask Eve anything..."
            className="flex-1 bg-muted/20 border border-border/50 rounded-2xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" />
          <button onClick={sendMessage} disabled={!input.trim() || loading}
            className="w-10 h-10 text-primary-foreground rounded-2xl flex items-center justify-center disabled:opacity-40 hover:opacity-90 transition-opacity shrink-0"
            style={{ background: 'linear-gradient(145deg, hsl(12 42% 62%) 0%, hsl(12 42% 50%) 100%)' }}>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
