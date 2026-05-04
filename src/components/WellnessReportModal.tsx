import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RefreshCw, Loader2 } from "lucide-react";
import { useEveStore, FITNESS_PROFILES } from "@/hooks/useEveStore";
import { PRELOADED_RECIPES } from "@/data/recipes";

interface Report {
  score: number;
  status: string;
  overview: string;
  mealsPlanned: number;
  avgDailyCal: number;
  avgDailyProtein: number;
  avgDailyFiber: number;
  uniqueMeals: number;
  nutrientIssues: string[];
  coaching: string;
  profileTip: string;
  suggestions: string[];
}

function buildReport(store: ReturnType<typeof useEveStore>): Report {
  const { weekPlan, trackerGoals, settings } = store;

  const mealEntries = Object.values(weekPlan).filter(Boolean) as string[];
  const plannedCount = mealEntries.length;
  const planPct = plannedCount / 49; // 7 days × 7 slots

  let totalCal = 0, totalProtein = 0, totalFiber = 0;
  let nutritionCount = 0;

  mealEntries.forEach(mealName => {
    const recipe = (PRELOADED_RECIPES as any)[mealName];
    if (recipe?.nutrition) {
      totalCal     += recipe.nutrition.calories || 0;
      totalProtein += recipe.nutrition.protein  || 0;
      totalFiber   += recipe.nutrition.fiber    || 0;
      nutritionCount++;
    }
  });

  const avgDailyCal     = nutritionCount > 0 ? Math.round(totalCal     / 7) : 0;
  const avgDailyProtein = nutritionCount > 0 ? Math.round(totalProtein / 7) : 0;
  const avgDailyFiber   = nutritionCount > 0 ? Math.round(totalFiber   / 7) : 0;
  const uniqueMeals     = new Set(mealEntries).size;

  const goalCal     = trackerGoals.cal     || 2000;
  const goalProtein = trackerGoals.protein || 50;
  const goalFiber   = trackerGoals.fiber   || 30;

  // Score
  let score = 40;
  if (planPct >= 0.7) score += 20; else if (planPct >= 0.4) score += 12; else if (planPct >= 0.2) score += 6;
  if (avgDailyProtein >= goalProtein * 0.8) score += 13; else if (avgDailyProtein >= goalProtein * 0.5) score += 6;
  if (avgDailyFiber   >= goalFiber   * 0.8) score += 9;
  if (avgDailyCal > 0 && avgDailyCal <= goalCal * 1.2) score += 8; else if (avgDailyCal > goalCal * 1.4) score -= 6;
  if (uniqueMeals >= 15) score += 10; else if (uniqueMeals >= 8) score += 6;
  score = Math.min(100, Math.max(10, score));

  const status =
    score >= 85 ? "Excellent" :
    score >= 70 ? "Good with Room to Improve" :
    score >= 50 ? "Building Momentum" :
    "Just Getting Started";

  // Nutrient issues
  const nutrientIssues: string[] = [];
  if (avgDailyProtein > 0 && avgDailyProtein < goalProtein * 0.7)
    nutrientIssues.push(`⚠️ Protein averaging ${avgDailyProtein}g/day — below your ${goalProtein}g goal. Add more tofu, tempeh, lentils, and edamame.`);
  if (avgDailyFiber > 0 && avgDailyFiber < goalFiber * 0.7)
    nutrientIssues.push(`⚠️ Fiber averaging ${avgDailyFiber}g/day — below your ${goalFiber}g goal. Include more beans, oats, leafy greens, and chia seeds.`);
  if (avgDailyCal > goalCal * 1.35)
    nutrientIssues.push(`⚠️ Calories tracking ~${Math.round((avgDailyCal / goalCal - 1) * 100)}% above goal. Consider lighter snack choices.`);
  if (avgDailyCal > 0 && avgDailyCal < goalCal * 0.7)
    nutrientIssues.push(`⚠️ Calories running low at ${avgDailyCal}/day — ensure you're eating enough to fuel your goals.`);
  if (nutrientIssues.length === 0 && plannedCount > 0)
    nutrientIssues.push("✅ Macros look balanced across your plan — nicely done!");

  // Always flag vegan-specific micronutrients
  nutrientIssues.push("💊 Don't forget: B12 supplementation is essential for all vegans. Consider D3, omega-3 (algae oil), and zinc.");

  // Coaching
  const coaching =
    plannedCount >= 30
      ? `Outstanding planning with ${plannedCount} meals on the schedule! Your ~${avgDailyCal} avg daily calories are ${Math.abs(avgDailyCal - goalCal)} kcal ${avgDailyCal > goalCal ? "above" : "below"} goal — ${avgDailyCal > goalCal * 1.2 ? "consider trimming heavier snacks" : "right on track"}. Protein at ${avgDailyProtein}g/day is ${avgDailyProtein >= goalProtein * 0.8 ? "looking strong 💪" : "worth boosting with an extra legume meal"}.`
      : plannedCount >= 15
      ? `Good start with ${plannedCount} meals planned. Fill in the remaining slots or tap Auto-Plan. Current data shows ~${avgDailyCal} avg cal and ${avgDailyProtein}g protein/day. ${uniqueMeals} unique meals — ${uniqueMeals >= 8 ? "great variety!" : "try diversifying more for better micronutrient coverage."}`
      : `${plannedCount} meals planned so far. Tap Auto-Plan on the home screen to fill your week in one tap — a fully planned week is the #1 driver of nutritional success on a plant-based diet!`;

  // Profile-specific tip
  const fpKey = settings.fitnessProfile;
  const fp = fpKey ? FITNESS_PROFILES[fpKey] : null;
  let profileTip = "Set a fitness profile in Community → Profile to unlock personalized coaching for your goals.";
  if (fp && fpKey) {
    if (fpKey === "bodybuilder" || fpKey === "muscle")
      profileTip = `${fp.name}: Your ${goalProtein}g protein goal is mission-critical. Prioritise Tempeh Wrap (30g), Sesame Noodles (22g), Falafel (18g), and Lentil Soup (18g) this week. Creatine (3–5g/day) is the single best evidence-based supplement for plant-based athletes building mass.`;
    else if (fpKey === "weightloss")
      profileTip = `${fp.name}: Your ${goalCal} calorie target keeps the deficit sustainable. High-fiber, high-protein meals (Lentil Soup, Buddha Bowl, Stuffed Peppers) keep you full. Avoid calorie-dense snacks stacked together in one day.`;
    else if (fpKey === "runner" || fpKey === "endurance")
      profileTip = `${fp.name}: Load complex carbs before long runs — Red Curry, Burrito Bowl, and Sushi Rolls are ideal. Replenish with a Smoothie + banana post-run. Iron-rich meals (lentils, spinach) paired with vitamin C maximise absorption for endurance.`;
    else if (fpKey === "athlete")
      profileTip = `${fp.name}: Performance demands consistent fuelling. Time carbs around training sessions and ensure protein is spread across 4–5 meals rather than concentrated. Tart cherry juice is excellent for reducing muscle soreness.`;
    else
      profileTip = `${fp.name}: Your plan targets ${goalCal} kcal and ${goalProtein}g protein daily. Diversify protein sources across legumes, soy, seeds, and seitan for a complete amino acid profile throughout the week.`;
  }

  // Suggestions
  const suggestions: string[] = [];
  if (uniqueMeals < 10) suggestions.push("🔄 Add more variety — aim for at least 10 unique meals this week to cover a wider micronutrient spectrum.");
  if (plannedCount < 35) suggestions.push("📅 Fill in any empty slots in the Planner or hit Auto-Plan for instant coverage.");
  if (avgDailyProtein < goalProtein * 0.8 && avgDailyProtein > 0) suggestions.push("🥦 Swap 1–2 snacks for high-protein options: edamame (17g/cup), hummus + wrap, or a protein smoothie.");
  suggestions.push("🌿 Add at least one cruciferous vegetable (broccoli, kale, Brussels sprouts) to your plan every other day for cancer-protective compounds.");
  suggestions.push("💧 Hydration matters! Aim for 8+ glasses of water daily — especially important on high-fiber plant-based diets.");
  if (suggestions.length > 4) suggestions.splice(4);

  const overview =
    `Your weekly vegan plan has ${plannedCount} of 49 possible meals scheduled (${Math.round(planPct * 100)}%). ` +
    (nutritionCount > 0
      ? `Estimated averages: ~${avgDailyCal} calories, ${avgDailyProtein}g protein, ${avgDailyFiber}g fiber per day. ` +
        `${uniqueMeals} unique meals across the week provides ${uniqueMeals >= 12 ? "excellent" : uniqueMeals >= 7 ? "solid" : "limited"} nutritional diversity.`
      : `Plan more meals to unlock nutritional estimates and a personalised score.`);

  return {
    score, status, overview,
    mealsPlanned: plannedCount,
    avgDailyCal, avgDailyProtein, avgDailyFiber, uniqueMeals,
    nutrientIssues, coaching, profileTip, suggestions,
  };
}

/* ── Score arc SVG ───────────────────────────────────── */
function ScoreArc({ score }: { score: number }) {
  const r = 54, cx = 64, cy = 64;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color =
    score >= 80 ? "#22c55e" :
    score >= 60 ? "hsl(12 42% 60%)" :
    score >= 40 ? "#f59e0b" : "#ef4444";

  return (
    <svg width={128} height={128} viewBox="0 0 128 128" className="shrink-0">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth={10} className="text-muted/30" />
      <motion.circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke={color} strokeWidth={10}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - dash }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize={28} fontWeight="bold" fill={color} fontFamily="serif">{score}</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize={11} fill="currentColor" opacity={0.5}>/100</text>
    </svg>
  );
}

interface Props {
  onClose: () => void;
}

export function WellnessReportModal({ onClose }: Props) {
  const store = useEveStore();
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const report = useMemo(() => buildReport(store), [store.weekPlan, store.trackerGoals, store.settings, refreshKey]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => { setRefreshKey(k => k + 1); setRefreshing(false); }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: "spring", damping: 24, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-[480px] max-h-[90dvh] bg-background rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="relative shrink-0 px-5 py-4"
          style={{ background: "linear-gradient(135deg, hsl(12 50% 52%), hsl(20 60% 62%), hsl(38 70% 60%))" }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/70">E.V.E.</p>
              <h2 className="text-xl font-serif font-bold text-white leading-tight">Weekly Wellness Report</h2>
              <p className="text-xs text-white/70 mt-0.5">{report.mealsPlanned} meals planned this week</p>
            </div>
            <div className="flex gap-2">
              <button onClick={handleRefresh} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                {refreshing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
              </button>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          {/* Gold shimmer rule */}
          <div className="absolute bottom-0 left-0 right-0 h-[1.5px]"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4) 50%, transparent)" }} />
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 p-4 space-y-4 pb-8">

          {/* Score + Overview */}
          <div className="bg-card border border-border/50 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <ScoreArc score={report.score} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-serif font-bold text-foreground leading-tight">{report.status}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">{report.overview}</p>
            </div>
          </div>

          {/* Stats row */}
          {report.mealsPlanned > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Avg Cal", val: report.avgDailyCal > 0 ? `${report.avgDailyCal}` : "—", sub: "per day" },
                { label: "Avg Protein", val: report.avgDailyProtein > 0 ? `${report.avgDailyProtein}g` : "—", sub: "per day" },
                { label: "Variety", val: `${report.uniqueMeals}`, sub: "unique meals" },
              ].map(s => (
                <div key={s.label} className="bg-muted/30 rounded-xl p-3 text-center border border-border/40">
                  <p className="text-[18px] font-serif font-bold text-foreground">{s.val}</p>
                  <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mt-0.5">{s.label}</p>
                  <p className="text-[9px] text-muted-foreground/60">{s.sub}</p>
                </div>
              ))}
            </div>
          )}

          {/* Today's Coaching */}
          <div className="bg-amber-50 dark:bg-amber-900/15 border border-amber-200/60 dark:border-amber-700/30 rounded-2xl p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-2">🏅 Weekly Coaching</p>
            <p className="text-sm text-foreground/90 leading-relaxed">{report.coaching}</p>
          </div>

          {/* Nutrient Spotlight */}
          <div className="bg-card border border-border/50 rounded-2xl p-4 space-y-2 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">🔬 Nutrient Spotlight</p>
            {report.nutrientIssues.map((issue, i) => (
              <p key={i} className="text-xs text-foreground/85 leading-relaxed border-l-2 border-primary/30 pl-3 py-0.5">{issue}</p>
            ))}
          </div>

          {/* Profile Tip */}
          <div className="rounded-2xl p-4 border border-primary/25"
            style={{ background: "linear-gradient(135deg, hsl(12 42% 60% / 0.08), hsl(38 70% 60% / 0.06))" }}>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">🎯 Your Profile</p>
            <p className="text-xs text-foreground/90 leading-relaxed">{report.profileTip}</p>
          </div>

          {/* Suggestions */}
          <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">💡 Suggestions</p>
            {report.suggestions.map((s, i) => (
              <p key={i} className="text-xs text-foreground/85 leading-relaxed">{s}</p>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
