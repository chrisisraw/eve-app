#!/usr/bin/env node
/**
 * Build gate: every name a user can pick in the planner must resolve to a recipe.
 *
 * The picker lists (MEALS, JUICE_RECIPES, SMOOTHIE_RECIPES) and the recipe bodies
 * (PRELOADED_RECIPES, and the sip arrays which are their own bodies) are hand-maintained
 * in separate files. Nothing at runtime enforces that they agree: every lookup site uses
 * optional chaining, so a name with no recipe degrades quietly — it contributes no
 * ingredients to the shopping list and zero calories to the daily totals, with no error.
 *
 * This script turns that silent drift into a loud pre-build failure.
 *
 * Deliberately dependency-free: it reads the data modules as text so it runs before
 * `npm install` and cannot be broken by a toolchain change. It parses structurally
 * (brace matching, quote-aware) rather than by loose regex, and throws on anything it
 * cannot parse — a checker that fails open would be worse than no checker.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');

/**
 * Extract the literal assigned to `export const <name>` by scanning from the opening
 * brace/bracket to its match, tracking string and comment state so that braces inside
 * strings ("Lentil Shepherd's Pie") or comments don't throw off the depth count.
 */
function extractLiteral(source, exportName, file) {
  const decl = new RegExp(`export\\s+const\\s+${exportName}\\b[^=]*=\\s*`).exec(source);
  if (!decl) throw new Error(`${file}: could not find "export const ${exportName}"`);

  const start = decl.index + decl[0].length;
  const open = source[start];
  if (open !== '{' && open !== '[') {
    throw new Error(`${file}: ${exportName} is not an object or array literal (starts with "${open}")`);
  }
  const close = open === '{' ? '}' : ']';

  let depth = 0;
  let quote = null;      // active string delimiter, or null
  let comment = null;    // 'line' | 'block' | null

  for (let i = start; i < source.length; i++) {
    const ch = source[i];
    const next = source[i + 1];

    if (comment === 'line') { if (ch === '\n') comment = null; continue; }
    if (comment === 'block') { if (ch === '*' && next === '/') { comment = null; i++; } continue; }

    if (quote) {
      if (ch === '\\') { i++; continue; }        // skip escaped char
      if (ch === quote) quote = null;
      continue;
    }

    if (ch === '/' && next === '/') { comment = 'line'; i++; continue; }
    if (ch === '/' && next === '*') { comment = 'block'; i++; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }

    if (ch === open) depth++;
    else if (ch === close) {
      depth--;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }
  throw new Error(`${file}: unbalanced "${open}" in ${exportName} — literal never closes`);
}

function evaluate(literal, label) {
  let value;
  try {
    value = new Function(`return (${literal});`)();
  } catch (err) {
    throw new Error(`${label}: literal did not evaluate — ${err.message}`);
  }
  const empty = Array.isArray(value) ? value.length === 0 : Object.keys(value ?? {}).length === 0;
  if (empty) throw new Error(`${label}: parsed to an empty value — refusing to report a clean result`);
  return value;
}

const load = (rel, name) => evaluate(extractLiteral(read(rel), name, rel), `${rel}:${name}`);

try {
  const MEALS = load('src/data/meals.ts', 'MEALS');
  const PRELOADED_RECIPES = load('src/data/recipes.ts', 'PRELOADED_RECIPES');
  const JUICE_RECIPES = load('src/data/sips.ts', 'JUICE_RECIPES');
  const SMOOTHIE_RECIPES = load('src/data/sips.ts', 'SMOOTHIE_RECIPES');

  // Shape sanity — catches a data file that parsed but isn't what we think it is.
  for (const [cat, names] of Object.entries(MEALS)) {
    if (!Array.isArray(names) || names.some((n) => typeof n !== 'string')) {
      throw new Error(`MEALS["${cat}"] is not an array of strings`);
    }
  }
  for (const [label, arr] of [['JUICE_RECIPES', JUICE_RECIPES], ['SMOOTHIE_RECIPES', SMOOTHIE_RECIPES]]) {
    if (arr.some((r) => typeof r?.name !== 'string')) throw new Error(`${label} contains an entry with no name`);
  }

  // The picker offers meal names from MEALS, plus sip names for the Juice/Smoothie slots.
  const sipNames = [...JUICE_RECIPES, ...SMOOTHIE_RECIPES].map((r) => r.name);
  const mealNames = Object.values(MEALS).flat();

  // RecipeModal resolves a name against PRELOADED_RECIPES, then the sip arrays.
  const resolvable = new Set([...Object.keys(PRELOADED_RECIPES), ...sipNames]);

  const problems = [];

  // 1. Pickable but unresolvable — the failure this gate exists to prevent.
  const orphansByCategory = Object.entries(MEALS)
    .map(([cat, names]) => [cat, names.filter((n) => !resolvable.has(n))])
    .filter(([, orphans]) => orphans.length > 0);

  if (orphansByCategory.length > 0) {
    const total = orphansByCategory.reduce((sum, [, o]) => sum + o.length, 0);
    problems.push(
      `${total} pickable name(s) have no recipe body. Picking one shows an empty recipe sheet, ` +
        `adds no ingredients to the shopping list, and logs zero calories:\n` +
        orphansByCategory
          .map(([cat, orphans]) => `    ${cat}\n${orphans.map((n) => `      - ${n}`).join('\n')}`)
          .join('\n')
    );
  }

  // 2. A recipe no picker lists is dead weight — worth knowing, same class of drift.
  const pickable = new Set([...mealNames, ...sipNames]);
  const unreachable = Object.keys(PRELOADED_RECIPES).filter((k) => !pickable.has(k));
  if (unreachable.length > 0) {
    problems.push(
      `${unreachable.length} recipe(s) exist but are absent from every picker list, so no user can reach them:\n` +
        unreachable.map((n) => `      - ${n}`).join('\n')
    );
  }

  // 3. Every lookup site reads .nutrition, .ingredients or .steps. A recipe missing one
  //    degrades as quietly as a missing recipe does.
  const incomplete = Object.entries(PRELOADED_RECIPES)
    .map(([name, r]) => {
      const missing = [];
      if (!r?.nutrition) missing.push('nutrition');
      if (!Array.isArray(r?.ingredients) || r.ingredients.length === 0) missing.push('ingredients');
      if (!Array.isArray(r?.steps) || r.steps.length === 0) missing.push('steps');
      return missing.length ? `      - ${name} (missing: ${missing.join(', ')})` : null;
    })
    .filter(Boolean);

  if (incomplete.length > 0) {
    problems.push(`${incomplete.length} recipe(s) are missing fields the UI reads:\n${incomplete.join('\n')}`);
  }

  if (problems.length > 0) {
    console.error('\n✗ Recipe coverage check FAILED\n');
    problems.forEach((p) => console.error(`  • ${p}\n`));
    console.error('  Fix by adding the missing recipe to src/data/recipes.ts, or removing the');
    console.error('  name from src/data/meals.ts. Do not ship a name that resolves to nothing.\n');
    process.exit(1);
  }

  console.log(
    `✓ Recipe coverage: ${pickable.size} pickable names, all resolve ` +
      `(${Object.keys(PRELOADED_RECIPES).length} meal recipes + ${sipNames.length} sips). No orphans, none unreachable.`
  );
} catch (err) {
  // Fail closed. If this script cannot read the data files it must never print a
  // clean result — an unparseable data module is itself a reason to stop the build.
  console.error('\n\u2717 Recipe coverage check could not run\n');
  console.error(`  ${err.message}\n`);
  console.error('  This gate reads src/data/{meals,recipes,sips}.ts as text. If those files were');
  console.error('  restructured, update scripts/check-recipe-coverage.mjs to match.\n');
  process.exit(1);
}
