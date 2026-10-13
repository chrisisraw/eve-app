// Demo/check: changing the Fitness Profile regenerates the week and resets swaps; re-selecting
// the same profile changes nothing; an old saved eve_state (no workoutSwaps) still loads.
// Bundles the real store module with esbuild (vite's own dependency); no test runner needed.
import { build } from 'esbuild';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';

const out = join(mkdtempSync(join(tmpdir(), 'eve-regen-')), 'store.mjs');
await build({ entryPoints: ['src/hooks/useEveStore.ts'], bundle: true, format: 'esm', platform: 'node',
  outfile: out, logLevel: 'error' });

const mem = new Map();
globalThis.localStorage = { getItem: k => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, v) };
const { applyFitnessProfile, buildSuggestedWeek, loadState } = await import(pathToFileURL(out).href);

const names = (w, d) => w[d].map(e => e.exercise).join(', ');
const show = (label, s) => {
  console.log(`\n[${label}] profile=${s.settings.fitnessProfile || '(none)'} swaps=${JSON.stringify(s.workoutSwaps)}`);
  console.log('  Monday :', names(s.suggestedWorkouts, 'Monday'));
  console.log('  Tuesday:', names(s.suggestedWorkouts, 'Tuesday'));
};

const now = new Date(2026, 9, 12); // Mon 2026-10-12
let s = loadState();
s = { ...s, settings: { ...s.settings, fitnessProfile: 'bodybuilder' },
  suggestedWorkouts: buildSuggestedWeek('bodybuilder', s.workoutLog),
  workoutSwaps: { weekStart: '2026-10-12', out: ['Deadlift', 'Barbell Bench Press'] } };
show('start: bodybuilder week, stale swaps', s);

const ath = applyFitnessProfile(s, 'athlete', now);
show('switch -> athlete', ath);
assert.match(names(ath.suggestedWorkouts, 'Monday'), /Weighted Dips/);
assert.match(names(ath.suggestedWorkouts, 'Monday'), /Wildcard/);
assert.equal(names(ath.suggestedWorkouts, 'Tuesday'), 'Deadlift, Barbell Squat, Clean and Press');
assert.deepEqual(ath.workoutSwaps, { weekStart: '2026-10-12', out: [] });
assert.equal(ath.trackerGoals.cal, 3000);

const back = applyFitnessProfile(ath, 'bodybuilder', now);
show('switch back -> bodybuilder', back);
assert.match(names(back.suggestedWorkouts, 'Monday'), /Cable Crossover/);

// same profile: week and swaps untouched (identity-equal), macros as before
const edited = { ...ath, workoutSwaps: { weekStart: '2026-10-12', out: ['Weighted Dips'] } };
const same = applyFitnessProfile(edited, 'athlete', now);
assert.equal(same.suggestedWorkouts, edited.suggestedWorkouts);
assert.deepEqual(same.workoutSwaps, edited.workoutSwaps);
console.log('\n[same profile] week unchanged: true, swaps unchanged:', JSON.stringify(same.workoutSwaps));

// old saved eve_state with no workoutSwaps / suggestedWorkouts
mem.set('eve_state', JSON.stringify({ settings: { theme: 'light', fitnessProfile: 'bodybuilder' }, xp: 40, workoutLog: {} }));
const old = loadState();
assert.deepEqual(old.workoutSwaps, { weekStart: '', out: [] });
const sw = applyFitnessProfile(old, 'athlete', now);
assert.match(names(sw.suggestedWorkouts, 'Monday'), /Weighted Dips/);
console.log('[old saved state] loaded without error; workoutSwaps =', JSON.stringify(old.workoutSwaps), '; switch OK');

// clear profile -> default template, still changes
const cleared = applyFitnessProfile(ath, '', now);
assert.equal(cleared.settings.fitnessProfile, '');
console.log('[clear] profile cleared, Monday:', names(cleared.suggestedWorkouts, 'Monday'));
console.log('\nALL CHECKS PASSED');
