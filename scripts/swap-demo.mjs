// Demo/check for the weekly exercise swap. Run: node scripts/swap-demo.mjs
// Swaps one exercise on Monday of the athlete plan and prints the week, then
// checks the swapped-out exercise is gone from every later day. Also loads
// an old-shape eve_state (no workoutSwaps) through normalizeSwaps.
import { PROFILE_WORKOUT_PLANS, WEEK_DAYS, swapExercise, normalizeSwaps, weekStartOf } from '../src/data/workout.ts';

const template = PROFILE_WORKOUT_PLANS.athlete;
const plan = Object.fromEntries(WEEK_DAYS.map((d, i) => [d, template[i] || []]));

// Put the same exercise on Mon and Fri to prove the later-day removal.
plan.Friday = [...plan.Friday, { ...plan.Monday[0] }];
const target = plan.Monday[0].exercise;

const show = (label, p) => {
  console.log(`\n== ${label}`);
  for (const d of WEEK_DAYS) console.log(`${d.padEnd(9)} ${p[d].map(e => e.exercise).join(' | ') || '(rest)'}`);
};

show('BEFORE', plan);
const swaps = { weekStart: weekStartOf(new Date()), out: [] };
const res = swapExercise(plan, swaps, 'Monday', target);
if (!res) { console.error('FAIL: swap returned null'); process.exit(1); }
show(`AFTER swapping "${target}" on Monday`, res.plan);
console.log('\nswaps state:', JSON.stringify(res.swaps));
console.log('Monday replacement:', res.plan.Monday[0].exercise);

const later = WEEK_DAYS.slice(1).flatMap(d => res.plan[d].map(e => e.exercise));
if (later.includes(target)) { console.error(`FAIL: "${target}" still present after Monday`); process.exit(1); }
console.log(`PASS: "${target}" absent from Tue-Sun`);

// Old saved shape: no workoutSwaps / junk values must default safely.
for (const raw of [undefined, null, {}, { weekStart: 5, out: 'x' }, { weekStart: '2026-10-05', out: ['A', 3] }]) {
  console.log('normalizeSwaps(', JSON.stringify(raw), ') ->', JSON.stringify(normalizeSwaps(raw)));
}
