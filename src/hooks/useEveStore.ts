import { useState, useEffect, useCallback } from 'react';
import { BADGES } from '../data/gamification';
import { MEALS, DAYS, SLOTS } from '../data/meals';
import { JUICE_RECIPES, SMOOTHIE_RECIPES } from '../data/sips';
import { FOOD_BANK } from '../data/foodbank';
import { SuggestedExercise, PROFILE_WORKOUT_PLANS, DEFAULT_WORKOUT_PLAN } from '../data/workout';
import { PRELOADED_RECIPES } from '../data/recipes';

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface Recipe {
  title: string;
  servings?: number;
  prepTime: string;
  cookTime: string;
  difficulty: string;
  tags: string[];
  ingredients: Ingredient[];
  steps: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  source?: string;
}

export interface TrackerEntry {
  id: number;
  name: string;
  cal: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  time: string;
}

export interface Plant {
  name: string;
  variety: string;
  category: string;
  stage: 'seed' | 'growing' | 'ready';
}

export interface Friend {
  id: string;
  name: string;
  emoji: string;
  level: number;
  xp: number;
}

export interface WorkoutSet {
  weight: string;
  reps: string;
  duration?: string;
  distance?: string;
  intensity?: string;
}

export interface WorkoutEntry {
  id: number;
  category: string;
  exercise: string;
  sets: WorkoutSet[];
  notes: string;
  time: string;
}

export interface SocialPost {
  id: string;
  authorName: string;
  authorEmoji: string;
  content: string;
  image?: string;
  likes: number;
  liked: boolean;
  timestamp: string;
}

export const FITNESS_PROFILES: Record<string, { name: string; cal: number; protein: number; carbs: number; fat: number; fiber: number; note: string }> = {
  maintenance:  { name: '⚖️ Maintenance',  cal: 2000, protein: 50,  carbs: 250, fat: 65,  fiber: 30, note: 'Balanced everyday nutrition for health maintenance' },
  weightloss:   { name: '🔥 Weight Loss',  cal: 1500, protein: 80,  carbs: 150, fat: 45,  fiber: 35, note: 'High protein, lower carb for steady fat loss' },
  muscle:       { name: '💪 Muscle Gain',  cal: 2800, protein: 140, carbs: 320, fat: 80,  fiber: 35, note: 'High protein + surplus for muscle building' },
  bodybuilder:  { name: '🏋️ Bodybuilder',  cal: 3200, protein: 180, carbs: 380, fat: 90,  fiber: 40, note: 'Elite protein + carb cycling for serious mass gains' },
  cyclist:      { name: '🚴 Cyclist',       cal: 2800, protein: 110, carbs: 420, fat: 75,  fiber: 38, note: 'High-carb fueling for endurance cycling performance' },
  yogi:         { name: '🧘 Yogi',          cal: 1800, protein: 65,  carbs: 220, fat: 60,  fiber: 40, note: 'Mindful, plant-forward nutrition for yoga practitioners' },
  endurance:    { name: '🏃 Endurance',     cal: 2600, protein: 100, carbs: 380, fat: 70,  fiber: 38, note: 'Carb-focused for long distance athletes' },
  athlete:      { name: '⚡ Athlete',       cal: 3000, protein: 150, carbs: 360, fat: 85,  fiber: 38, note: 'Performance nutrition for competitive athletes' },
};

export interface EveState {
  weekPlan: Record<string, string>;
  recipes: Record<string, Recipe>;
  trackerLog: Record<string, TrackerEntry[]>;
  trackerGoals: { cal: number; protein: number; carbs: number; fat: number; fiber: number; water: number };
  waterLog: Record<string, number>;
  garden: Plant[];
  xp: number;
  unlockedBadges: string[];
  profile: { name: string; emoji: string; allergies: string[] };
  favorites: string[];
  servings: Record<string, number>;
  mealRatings: Record<string, number>;
  friends: Friend[];
  stats: { streak: number; mealsLogged: number; juicesLogged: number; smoothiesLogged: number; recipesTried: Record<string, boolean>; workoutDays: string[] };
  settings: { theme: 'light' | 'dark' | 'system'; calGoal: number; proteinGoal: number; carbsGoal: number; fatGoal: number; fitnessProfile: string };
  workoutLog: Record<string, WorkoutEntry[]>;
  suggestedWorkouts: Record<string, SuggestedExercise[]>;
  shoppingChecked: Record<string, boolean>;
  pantryItems: string[];
  groceryStore: string;
  customMeals: Recipe[];
  socialPosts: SocialPost[];
  onboarded: boolean;
}

const STORAGE_KEY = 'eve_state';

const MOCK_POSTS: SocialPost[] = [
  { id: 'p1', authorName: 'PlantPowered Priya', authorEmoji: '🌿', content: 'Just made the most amazing chickpea curry! Loaded with turmeric and coconut milk. Meal prep Sunday done right 💚', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=600&fit=crop&q=80', likes: 24, liked: false, timestamp: '2h ago' },
  { id: 'p2', authorName: 'VeganViking', authorEmoji: '⚔️', content: 'Hit a new PR on deadlifts today 🏋️ Proof that plant protein WORKS. 180g protein purely from whole foods this week!', likes: 41, liked: false, timestamp: '4h ago' },
  { id: 'p3', authorName: 'GreenGuru Maya', authorEmoji: '🧘', content: 'Morning smoothie bowl game is strong today 🌈 Pitaya base, fresh mango, granola crunch, hemp seeds. What are you all eating this morning?', image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&h=600&fit=crop&q=80', likes: 17, liked: false, timestamp: '6h ago' },
  { id: 'p4', authorName: 'Sprout Master', authorEmoji: '🌱', content: 'Week 3 of my 30-day vegan challenge! Energy levels through the roof and my digestion has never been better. Anyone else notice this?', likes: 33, liked: false, timestamp: '1d ago' },
  { id: 'p5', authorName: 'Earth Guardian', authorEmoji: '🌍', content: 'Homegrown tomatoes + basil from the garden + cashew mozzarella = best caprese I\'ve ever had 🍅 The Grow tab in EVE helped me time my harvest perfectly!', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&h=600&fit=crop&q=80', likes: 56, liked: false, timestamp: '1d ago' },
];

const initialState: EveState = {
  weekPlan: {},
  recipes: {},
  trackerLog: {},
  trackerGoals: { cal: 2000, protein: 50, carbs: 250, fat: 65, fiber: 30, water: 8 },
  waterLog: {},
  garden: [],
  xp: 0,
  unlockedBadges: [],
  profile: { name: 'Vegan Hero', emoji: '🌱', allergies: [] },
  favorites: [],
  servings: {},
  mealRatings: {},
  friends: [],
  stats: { streak: 0, mealsLogged: 0, juicesLogged: 0, smoothiesLogged: 0, recipesTried: {}, workoutDays: [] },
  settings: { theme: 'light', calGoal: 2000, proteinGoal: 50, carbsGoal: 250, fatGoal: 65, fitnessProfile: '' },
  workoutLog: {},
  suggestedWorkouts: {},
  shoppingChecked: {},
  pantryItems: [],
  groceryStore: 'walmart',
  customMeals: [],
  socialPosts: MOCK_POSTS,
  onboarded: false,
};

// ── Module-level singleton ───────────────────────────────────────────────────
// All components share this one instance. Changes propagate to every subscriber.

function loadState(): EveState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...initialState,
        ...parsed,
        profile: { ...initialState.profile, ...(parsed.profile || {}) },
        settings: { ...initialState.settings, ...(parsed.settings || {}) },
        socialPosts: parsed.socialPosts || MOCK_POSTS,
      };
    }
  } catch {
    // ignore corrupt data
  }
  return { ...initialState };
}

let _state: EveState = loadState();
const _listeners = new Set<() => void>();
let _saveTimer: ReturnType<typeof setTimeout> | null = null;

function setStore(updater: (s: EveState) => EveState): void {
  _state = updater(_state);
  // Notify every mounted hook instance to re-render
  _listeners.forEach(fn => fn());
  // Debounced localStorage persist
  if (_saveTimer) clearTimeout(_saveTimer);
  _saveTimer = setTimeout(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(_state));
  }, 300);
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function meetsAllergyFilter(mealName: string, allergies: string[]): boolean {
  if (!allergies.length) return true;
  const lower = mealName.toLowerCase();
  for (const allergy of allergies) {
    const a = allergy.toLowerCase().trim();
    if (!a) continue;
    if (a === 'gluten' && (lower.includes('bread') || lower.includes('pasta') || lower.includes('noodle') || lower.includes('waffle') || lower.includes('pancake') || lower.includes('burrito') || lower.includes('wrap') || lower.includes('crepe') || lower.includes('biscuit'))) return false;
    if (a === 'soy' && (lower.includes('tofu') || lower.includes('tempeh') || lower.includes('edamame') || lower.includes('soy'))) return false;
    if (a === 'nuts' && (lower.includes('almond') || lower.includes('cashew') || lower.includes('walnut') || lower.includes('pecan') || lower.includes('pistachio') || lower.includes('nut'))) return false;
    if (a === 'peanuts' && (lower.includes('peanut'))) return false;
    if (a === 'corn' && (lower.includes('corn') || lower.includes('nacho') || lower.includes('tortilla'))) return false;
    if (lower.includes(a)) return false;
  }
  return true;
}

export function lookupFoodBank(name: string): { cal: number; protein: number; carbs: number; fat: number; fiber: number } | null {
  const search = name.toLowerCase().trim();
  for (const items of Object.values(FOOD_BANK)) {
    for (const item of items) {
      if (item.n.toLowerCase().includes(search) || search.includes(item.n.toLowerCase().split('(')[0].trim())) {
        return { cal: item.cal, protein: item.p, carbs: item.c, fat: item.f, fiber: item.fi };
      }
    }
  }
  return null;
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useEveStore() {
  // Subscribe to singleton — re-render this component whenever store changes
  const [, rerender] = useState(0);
  useEffect(() => {
    const listener = () => rerender(n => n + 1);
    _listeners.add(listener);
    return () => { _listeners.delete(listener); };
  }, []);

  // ── Actions ────────────────────────────────────────────────────────────────

  const addXp = useCallback((amount: number) => {
    setStore(s => ({ ...s, xp: s.xp + amount }));
    try { window.dispatchEvent(new CustomEvent('eve:xp', { detail: { amount } })); } catch {}
  }, []);

  const awardBadge = useCallback((id: string) => {
    setStore(s => {
      if (s.unlockedBadges.includes(id)) return s;
      const badge = BADGES.find(b => b.id === id);
      setTimeout(() => {
        try { window.dispatchEvent(new CustomEvent('eve:badge', { detail: { id, badge } })); } catch {}
      }, 100);
      return { ...s, unlockedBadges: [...s.unlockedBadges, id], xp: s.xp + (badge?.xp || 0) };
    });
  }, []);

  const syncBadgeUnlocks = useCallback(() => {
    setStore(s => {
      const eligible = new Set<string>();
      if (s.stats.streak >= 3) eligible.add('streak_3');
      if (s.stats.streak >= 7) eligible.add('streak_7');
      if (s.stats.streak >= 30) eligible.add('streak_30');
      if (s.stats.mealsLogged >= 10) eligible.add('meals_10');
      if (s.stats.mealsLogged >= 50) eligible.add('meals_50');
      if (s.stats.juicesLogged >= 10) eligible.add('juices_10');
      if (s.stats.smoothiesLogged >= 10) eligible.add('smoothies_10');
      if (s.garden.length >= 1) eligible.add('garden_1');
      if (s.garden.length >= 5) eligible.add('garden_5');
      if (s.customMeals.length >= 1) eligible.add('recipe_upload');
      const unlockedBadges = [...new Set([...s.unlockedBadges, ...eligible])];
      return unlockedBadges.length === s.unlockedBadges.length ? s : { ...s, unlockedBadges };
    });
  }, []);

  const calcStreak = useCallback(() => {
    let streak = 0;
    const d = new Date();
    for (let i = 0; i < 60; i++) {
      const key = d.toISOString().slice(0, 10);
      const log = _state.trackerLog[key] || [];
      const totCal = log.reduce((sum, e) => sum + (e.cal || 0), 0);
      if (i === 0 && totCal === 0) { d.setDate(d.getDate() - 1); continue; }
      if (totCal >= _state.trackerGoals.cal * 0.7) { streak++; }
      else if (i > 0 || totCal > 0) { break; }
      d.setDate(d.getDate() - 1);
    }
    return streak;
  }, []);

  const updateProfile = useCallback((profile: Partial<EveState['profile']>) => {
    setStore(s => ({ ...s, profile: { ...s.profile, ...profile } }));
  }, []);

  const setAllergies = useCallback((allergies: string[]) => {
    setStore(s => ({ ...s, profile: { ...s.profile, allergies } }));
  }, []);

  const setFitnessProfile = useCallback((id: string) => {
    const fp = FITNESS_PROFILES[id];
    if (fp) {
      setStore(s => ({
        ...s,
        settings: { ...s.settings, fitnessProfile: id },
        trackerGoals: { ...s.trackerGoals, cal: fp.cal, protein: fp.protein, carbs: fp.carbs, fat: fp.fat, fiber: fp.fiber },
      }));
    } else {
      setStore(s => ({ ...s, settings: { ...s.settings, fitnessProfile: '' } }));
    }
  }, []);

  const logMeal = useCallback((date: string, entry: Omit<TrackerEntry, 'id'>) => {
    setStore(s => {
      const dayLog = s.trackerLog[date] || [];
      return {
        ...s,
        trackerLog: { ...s.trackerLog, [date]: [...dayLog, { ...entry, id: Date.now() }] },
        stats: { ...s.stats, mealsLogged: s.stats.mealsLogged + 1 },
        xp: s.xp + 10,
      };
    });
  }, []);

  const removeTrackerEntry = useCallback((date: string, id: number) => {
    setStore(s => {
      const dayLog = (s.trackerLog[date] || []).filter(e => e.id !== id);
      return { ...s, trackerLog: { ...s.trackerLog, [date]: dayLog } };
    });
  }, []);

  const updateTrackerGoals = useCallback((goals: Partial<EveState['trackerGoals']>) => {
    setStore(s => ({ ...s, trackerGoals: { ...s.trackerGoals, ...goals } }));
  }, []);

  const addWater = useCallback((date: string, delta: number) => {
    setStore(s => {
      const current = s.waterLog[date] || 0;
      return { ...s, waterLog: { ...s.waterLog, [date]: Math.max(0, current + delta) } };
    });
  }, []);

  const toggleFavorite = useCallback((mealName: string) => {
    setStore(s => {
      const favorites = s.favorites.includes(mealName)
        ? s.favorites.filter(f => f !== mealName)
        : [...s.favorites, mealName];
      return { ...s, favorites };
    });
  }, []);

  const setMealRating = useCallback((mealName: string, rating: number) => {
    setStore(s => ({ ...s, mealRatings: { ...s.mealRatings, [mealName]: rating } }));
  }, []);

  const planMeal = useCallback((day: string, slot: string, mealName: string) => {
    setStore(s => ({ ...s, weekPlan: { ...s.weekPlan, [`${day}-${slot}`]: mealName }, xp: s.xp + 5 }));
  }, []);

  const clearMeal = useCallback((day: string, slot: string) => {
    setStore(s => {
      const newPlan = { ...s.weekPlan };
      delete newPlan[`${day}-${slot}`];
      return { ...s, weekPlan: newPlan };
    });
  }, []);

  const clearDay = useCallback((day: string) => {
    setStore(s => {
      const newPlan = { ...s.weekPlan };
      SLOTS.forEach(slot => { delete newPlan[`${day}-${slot}`]; });
      return { ...s, weekPlan: newPlan };
    });
  }, []);

  const clearWeek = useCallback(() => {
    setStore(s => ({ ...s, weekPlan: {} }));
  }, []);

  const logWorkout = useCallback((date: string, entry: Omit<WorkoutEntry, 'id' | 'time'>) => {
    setStore(s => {
      const dayLog = s.workoutLog[date] || [];
      const newEntry: WorkoutEntry = {
        ...entry,
        id: Date.now(),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      const workoutDays = s.stats.workoutDays.includes(date)
        ? s.stats.workoutDays
        : [...s.stats.workoutDays, date];
      return {
        ...s,
        workoutLog: { ...s.workoutLog, [date]: [...dayLog, newEntry] },
        stats: { ...s.stats, workoutDays },
        xp: s.xp + 15,
      };
    });
  }, []);

  const removeWorkoutEntry = useCallback((date: string, id: number) => {
    setStore(s => {
      const dayLog = (s.workoutLog[date] || []).filter(e => e.id !== id);
      return { ...s, workoutLog: { ...s.workoutLog, [date]: dayLog } };
    });
  }, []);

  const autoplanWorkouts = useCallback(() => {
    const profileId = _state.settings.fitnessProfile;
    const template = (profileId && PROFILE_WORKOUT_PLANS[profileId])
      ? PROFILE_WORKOUT_PLANS[profileId]
      : DEFAULT_WORKOUT_PLAN;

    // Count how many times each exercise has been done (for personalised notes)
    const exerciseFreq: Record<string, number> = {};
    Object.values(_state.workoutLog).flat().forEach(entry => {
      exerciseFreq[entry.exercise] = (exerciseFreq[entry.exercise] || 0) + 1;
    });

    // Find exercises the user has done frequently (≥3×) to prioritise them
    const frequentExercises = new Set(
      Object.entries(exerciseFreq).filter(([, count]) => count >= 3).map(([ex]) => ex)
    );

    const DAYS_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const suggested: Record<string, SuggestedExercise[]> = {};

    DAYS_ORDER.forEach((day, i) => {
      const dayPlan = (template[i] || []) as SuggestedExercise[];
      suggested[day] = dayPlan.map(ex => {
        const count = exerciseFreq[ex.exercise] || 0;
        const isFav = frequentExercises.has(ex.exercise);
        const personalNote = count > 0
          ? isFav
            ? `You've crushed this ${count}× — push for a new PR today! 🔥`
            : `You've done this ${count}× before — beat that last session! 💪`
          : ex.note;
        return { ...ex, note: personalNote };
      });
    });

    setStore(s => ({ ...s, suggestedWorkouts: suggested, xp: s.xp + 25 }));
  }, []);

  const autoPlan = useCallback(() => {
    const allergies = _state.profile.allergies || [];
    const profileId = _state.settings.fitnessProfile;
    const fp = (profileId && FITNESS_PROFILES[profileId]) ? FITNESS_PROFILES[profileId] : FITNESS_PROFILES['maintenance'];
    const dailyCal = fp.cal;
    const dailyProtein = fp.protein;
    const wantsHighProtein = ['muscle', 'bodybuilder', 'athlete'].includes(profileId || '');

    // Slot calorie proportions of the daily target
    // Juice 4% | Smoothie 14% | Breakfast 19% | Snack1 9% | Lunch 23% | Snack2 9% | Dinner 22%
    const slotPct: Record<string, number> = {
      'Juice': 0.04, 'Smoothie': 0.14, 'Breakfast': 0.19,
      'Snack 1': 0.09, 'Lunch': 0.23, 'Snack 2': 0.09, 'Dinner': 0.22,
    };

    // Score a named meal by calorie fit (closer to slot target = higher score)
    // Also adds a protein bonus for high-protein profiles
    const scoreMeal = (name: string, slotCal: number): number => {
      const rec = (PRELOADED_RECIPES as Record<string, { nutrition?: { calories?: number; protein?: number } }>)[name];
      const cal = rec?.nutrition?.calories ?? 0;
      const protein = rec?.nutrition?.protein ?? 0;
      if (cal === 0) return 0.3; // unknown — neutral
      const calScore = 1 / (1 + Math.abs(cal - slotCal) / (slotCal * 0.35));
      const proteinBonus = wantsHighProtein ? Math.min(protein / dailyProtein, 0.4) : 0;
      return calScore + proteinBonus;
    };

    // Pick best-fitting meal from a pool (weighted random among top 5)
    const pickFit = (pool: string[], slotCal: number, fallback: string[]): string => {
      const src = pool.length ? pool : fallback;
      if (!src.length) return '';
      const scored = src
        .map(m => ({ m, s: scoreMeal(m, slotCal) }))
        .sort((a, b) => b.s - a.s);
      const top = scored.slice(0, Math.min(5, scored.length));
      return top[Math.floor(Math.random() * top.length)].m;
    };

    // Score a sip by its known calorie value
    const scoreSip = (cal: number, slotCal: number) =>
      1 / (1 + Math.abs(cal - slotCal) / (slotCal * 0.35));

    const pickFitSip = (recipes: typeof JUICE_RECIPES, slotCal: number): string => {
      const scored = recipes
        .map(r => ({ name: r.name, s: scoreSip(r.cal, slotCal) }))
        .sort((a, b) => b.s - a.s);
      const top = scored.slice(0, Math.min(5, scored.length));
      return top[Math.floor(Math.random() * top.length)]?.name ?? recipes[0].name;
    };

    const filter = (arr: string[]) => arr.filter(m => meetsAllergyFilter(m, allergies));
    const breakfasts = filter(MEALS['Breakfast'] || []);
    const salads     = filter(MEALS['Salads & Raw'] || []);
    const bowls      = filter(MEALS['Bowls & Mains'] || []);
    const wraps      = filter(MEALS['Wraps & Rolls'] || []);
    const snacks     = filter(MEALS['🍎 Snacks'] || []);
    const lunches    = [...salads, ...wraps, ...bowls];
    const dinners    = [...bowls, ...wraps];

    const pickUnique = (pool: string[], slotCal: number, fallback: string[], used: Set<string>) => {
      const available = pool.filter(m => !used.has(m));
      const choice = pickFit(available, slotCal, fallback);
      if (choice) used.add(choice);
      return choice;
    };

    const newPlan: Record<string, string> = {};
    const usedMeals = new Set<string>();
    DAYS.forEach(day => {
      SLOTS.forEach(slot => {
        const key = `${day}-${slot}`;
        const slotCal = dailyCal * (slotPct[slot] ?? 0.14);
        switch (slot) {
          case 'Juice':     newPlan[key] = pickUnique(JUICE_RECIPES.map(r => r.name), slotCal, JUICE_RECIPES.map(r => r.name), usedMeals); break;
          case 'Smoothie':  newPlan[key] = pickUnique(SMOOTHIE_RECIPES.map(r => r.name), slotCal, SMOOTHIE_RECIPES.map(r => r.name), usedMeals); break;
          case 'Breakfast': newPlan[key] = pickUnique(breakfasts, slotCal, MEALS['Breakfast'] || [], usedMeals); break;
          case 'Snack 1':   newPlan[key] = pickUnique(snacks, slotCal, MEALS['🍎 Snacks'] || [], usedMeals); break;
          case 'Lunch':     newPlan[key] = pickUnique(lunches, slotCal, [...(MEALS['Salads & Raw'] || []), ...(MEALS['Bowls & Mains'] || [])], usedMeals); break;
          case 'Snack 2':   newPlan[key] = pickUnique(snacks, slotCal, MEALS['🍎 Snacks'] || [], usedMeals); break;
          case 'Dinner':    newPlan[key] = pickUnique(dinners, slotCal, MEALS['Bowls & Mains'] || [], usedMeals); break;
        }
      });
    });
    setStore(s => ({ ...s, weekPlan: newPlan, xp: s.xp + 50 }));
  }, []);

  const setPantryItems = useCallback((items: string[]) => {
    setStore(s => ({ ...s, pantryItems: items }));
  }, []);

  const setGroceryStore = useCallback((storeId: string) => {
    setStore(s => ({ ...s, groceryStore: storeId }));
  }, []);

  const addCustomMeal = useCallback((recipe: Recipe) => {
    setStore(s => ({
      ...s,
      customMeals: [...s.customMeals, recipe],
      recipes: { ...s.recipes, [recipe.title]: recipe },
    }));
  }, []);

  const getTodayCalories = useCallback(() => {
    const today = new Date().toISOString().slice(0, 10);
    return (_state.trackerLog[today] || []).reduce((sum, e) => sum + (e.cal || 0), 0);
  }, []);

  const getTodayWater = useCallback(() => {
    const today = new Date().toISOString().slice(0, 10);
    return _state.waterLog[today] || 0;
  }, []);

  const getWeeklyTotals = useCallback(() => {
    const totals = { cal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, days: 0 };
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const log = _state.trackerLog[d.toISOString().slice(0, 10)] || [];
      if (log.length) {
        totals.days++;
        log.forEach(e => {
          totals.cal += e.cal || 0; totals.protein += e.protein || 0;
          totals.carbs += e.carbs || 0; totals.fat += e.fat || 0; totals.fiber += e.fiber || 0;
        });
      }
    }
    return totals;
  }, []);

  const getYesterdayTotals = useCallback(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const log = _state.trackerLog[yesterday.toISOString().slice(0, 10)] || [];
    return log.reduce((acc, e) => ({
      cal: acc.cal + (e.cal || 0), protein: acc.protein + (e.protein || 0),
      carbs: acc.carbs + (e.carbs || 0), fat: acc.fat + (e.fat || 0), fiber: acc.fiber + (e.fiber || 0),
    }), { cal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
  }, []);

  const getLastWorkout = useCallback(() => {
    const sorted = Object.entries(_state.workoutLog)
      .filter(([, entries]) => entries.length > 0)
      .sort(([a], [b]) => b.localeCompare(a));
    if (!sorted.length) return null;
    const [date, entries] = sorted[0];
    return { date, entries };
  }, []);

  const togglePostLike = useCallback((postId: string) => {
    setStore(s => ({
      ...s,
      socialPosts: s.socialPosts.map(p =>
        p.id === postId ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      ),
    }));
  }, []);

  const addSocialPost = useCallback((content: string, image?: string) => {
    setStore(s => ({
      ...s,
      socialPosts: [
        {
          id: `post_${Date.now()}`,
          authorName: s.profile.name,
          authorEmoji: s.profile.emoji,
          content,
          image,
          likes: 0,
          liked: false,
          timestamp: 'just now',
        },
        ...s.socialPosts,
      ],
      xp: s.xp + 20,
    }));
    try { window.dispatchEvent(new CustomEvent('eve:xp', { detail: { amount: 20 } })); } catch {}
  }, []);

  useEffect(() => {
    syncBadgeUnlocks();
  }, [syncBadgeUnlocks]);

  // Generic setState proxy — lets pages call setState(prev => ({...prev, ...}))
  // without knowing the internal setStore name. All calls go through the singleton.
  const setState = useCallback((updater: ((s: EveState) => EveState) | Partial<EveState>) => {
    if (typeof updater === 'function') {
      setStore(updater as (s: EveState) => EveState);
    } else {
      setStore(s => ({ ...s, ...updater }));
    }
  }, []);

  // Return current singleton state + all actions
  return {
    ..._state,
    setState,
    addXp,
    awardBadge,
    syncBadgeUnlocks,
    calcStreak,
    updateProfile,
    setAllergies,
    setFitnessProfile,
    logMeal,
    removeTrackerEntry,
    updateTrackerGoals,
    addWater,
    toggleFavorite,
    setMealRating,
    planMeal,
    clearMeal,
    clearDay,
    clearWeek,
    logWorkout,
    removeWorkoutEntry,
    autoPlan,
    autoplanWorkouts,
    getTodayCalories,
    getTodayWater,
    getWeeklyTotals,
    getYesterdayTotals,
    getLastWorkout,
    setPantryItems,
    setGroceryStore,
    addCustomMeal,
    togglePostLike,
    addSocialPost,
  };
}
