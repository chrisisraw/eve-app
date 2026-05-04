import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useEveStore } from "@/hooks/useEveStore";
import { getFoodPhoto } from "@/data/foodPhotos";
import { LEVELS } from "@/data/gamification";
import { PRELOADED_RECIPES } from "@/data/recipes";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, ChevronRight, Moon, Sun, Settings, Dumbbell, TrendingUp, ClipboardList, Flame } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { toast } from "sonner";
import { WellnessReportModal } from "@/components/WellnessReportModal";
import { RecipeModal } from "@/components/RecipeModal";
import { useSound } from "@/hooks/useSounds";

const homeDishImage = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=400&fit=crop&crop=entropy&q=90";

const PROFILE_LABELS: Record<string, string> = {
  maintenance:  'balanced maintenance',
  weightloss:   'weight loss',
  muscle:       'muscle building',
  bodybuilder:  'bodybuilding',
  cyclist:      'cycling performance',
  yogi:         'yoga & mindfulness',
  endurance:    'endurance training',
  athlete:      'athletic performance',
};

function buildPlanningSteps(profileId: string, profileName: string) {
  const goal = PROFILE_LABELS[profileId] || 'plant-based wellness';
  const name = profileName ? profileName.split(' ')[0] : null;
  const namePrefix = name ? `${name}, ` : '';
  return [
    { icon: '🧬', msg: `Reading your profile & allergies…` },
    { icon: '🥗', msg: `Curating plant-based meals for ${goal}…` },
    { icon: '⚖️', msg: `Balancing macros across your whole week…` },
    { icon: '💪', msg: `Building your ${goal} workout split…` },
    { icon: '✍️', msg: `Adding personalised coaching notes…` },
    { icon: '✨', msg: `${namePrefix}your perfect week is ready!` },
  ];
}
// Plates are positioned INSIDE the button wrapper div using exact geometry.
// Wrapper is centered via flex. Button = 200×200 (r=100).
// P1 @ ~80°: centre (272,78)  → left=192 top=-2   (top-right, clips off-screen edge)
// P2 @ ~150°: centre (190,275) → left=110 top=195  (lower-right)
// P3 @ ~220°: centre (−30,230) → left=−110 top=150 (lower-left, peeks from left edge)
// Min distance between any two plate centres ≥ 213px > 160px ✓

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  onOpenSettings?: () => void;
}

export default function HomePage({ setActiveTab, onOpenSettings }: HomePageProps) {
  const { profile, xp, calcStreak, weekPlan, autoPlan, autoplanWorkouts, getTodayCalories, getWeeklyTotals, getYesterdayTotals, getLastWorkout, settings } = useEveStore();
  const { play } = useSound();
  const { theme, setTheme } = useTheme();
  const [showWellnessReport, setShowWellnessReport] = useState(false);
  const [recipeModal, setRecipeModal] = useState<string | null>(null);
  const [planning, setPlanning] = useState(false);
  const [planStep, setPlanStep] = useState(0);
  const [barWidth, setBarWidth] = useState(0);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const streak = calcStreak();
  const todayCalories = getTodayCalories();
  const weeklyTotals = getWeeklyTotals();
  const yesterdayTotals = getYesterdayTotals();
  const lastWorkout = getLastWorkout();

  const currentLevel = LEVELS.reduce((prev, curr) => (xp >= curr.xp ? curr : prev), LEVELS[0]);

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { line1: "Good", line2: "morning" };
    if (hour < 17) return { line1: "Good", line2: "afternoon" };
    return { line1: "Good", line2: "evening" };
  };

  const greeting = getTimeGreeting();

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaysMeals = ["Juice", "Smoothie", "Breakfast", "Snack 1", "Lunch", "Snack 2", "Dinner"]
    .map(slot => ({ slot, name: weekPlan[`${today}-${slot}`] }))
    .filter(m => m.name);

  const planningSteps = buildPlanningSteps(settings.fitnessProfile || '', profile.name || '');
  const STEP_MS = 1800;

  const handleAutoPlan = () => {
    if (planning) return;
    // Clear any old timers
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];

    setPlanning(true);
    setPlanStep(0);
    setBarWidth(0);

    // Advance through each step
    planningSteps.forEach((_, i) => {
      const t = setTimeout(() => {
        setPlanStep(i);
        setBarWidth(Math.round(((i + 1) / planningSteps.length) * 100));
      }, i * STEP_MS);
      timerRefs.current.push(t);
    });

    // On last step: fire the real plan + sound, then close
    const doneDelay = planningSteps.length * STEP_MS;
    const doneTimer = setTimeout(() => {
      autoPlan();
      autoplanWorkouts();
      play('autoplan');
    }, doneDelay);
    timerRefs.current.push(doneTimer);

    const closeTimer = setTimeout(() => {
      setPlanning(false);
      setPlanStep(0);
      setBarWidth(0);
      toast.success('✨ Week + workouts optimised! +75 XP', { duration: 3000 });
    }, doneDelay + 600);
    timerRefs.current.push(closeTimer);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => { timerRefs.current.forEach(clearTimeout); };
  }, []);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="animate-in fade-in duration-500 pb-28">

      {/* ── HERO ──────────────────────────────────────────── */}
      <div className="relative bg-white dark:bg-background overflow-hidden" style={{ minHeight: 720 }}>

        {/* Plates are anchored inside the button wrapper — see below */}

        {/* Main hero content */}
        <div className="relative z-10 px-6 pt-14 pb-8">

          {/* Scripty greeting — centered, personalised */}
          <div className="mb-5 text-center">
            <h1
              className="leading-[0.95] select-none text-foreground dark:text-foreground"
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: 'clamp(44px, 13vw, 58px)',
                fontWeight: 400,
              }}
            >
              {greeting.line1} {greeting.line2}{profile.name ? `, ${profile.name.split(' ')[0]}` : ''}...
            </h1>
          </div>

          {/* Stat cards row */}
          <div className="flex gap-3 mb-5">
            {/* Calories — rose gold gradient */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
              className="flex-1 rounded-[22px] p-4 flex flex-col justify-between min-h-[130px]"
              style={{
                background: 'linear-gradient(145deg, hsl(15 46% 68%), hsl(10 50% 56%))',
                border: '1px solid rgba(201,168,76,0.55)',
                boxShadow: '0 0 0 1px rgba(201,168,76,0.20), inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 24px rgba(0,0,0,0.12)',
              }}
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-white/90 leading-tight">CALORIES<br />TODAY</p>
              <p className="text-[42px] font-serif font-bold text-white leading-none mt-1">
                {todayCalories > 0 ? todayCalories.toLocaleString() : "—"}
              </p>
            </motion.div>

            {/* Streak */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
              className="flex-1 rounded-[22px] p-4 bg-white dark:bg-card flex flex-col justify-between min-h-[130px]"
              style={{
                border: '1px solid rgba(201,168,76,0.50)',
                boxShadow: '0 0 0 1px rgba(201,168,76,0.15), inset 0 1px 0 rgba(255,255,255,0.80), 0 8px 24px rgba(0,0,0,0.08)',
              }}
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-foreground/60 leading-tight">STREAK</p>
              <div>
                <p className="text-[46px] font-serif font-bold text-foreground leading-none">{streak}</p>
                <p className="text-sm text-foreground/50 font-medium">days</p>
              </div>
            </motion.div>

            {/* XP */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
              className="flex-1 rounded-[22px] p-4 bg-white dark:bg-card flex flex-col justify-between min-h-[130px]"
              style={{
                border: '1px solid rgba(201,168,76,0.50)',
                boxShadow: '0 0 0 1px rgba(201,168,76,0.15), inset 0 1px 0 rgba(255,255,255,0.80), 0 8px 24px rgba(0,0,0,0.08)',
              }}
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-foreground/60 leading-tight">+<br />XP</p>
              <p className="text-[46px] font-serif font-bold text-foreground leading-none">{xp}</p>
            </motion.div>
          </div>

          {/*
            Cluster centered via flex wrapper. Button = 200×200 (r=100, r+pad=100).
            Plate r=80. Min safe centre-to-centre = 180+gap.
            P1 @ 85°:  centre=(294,83)  → left=214 top=3    d≈195 ✓
            P2 @ 145°: centre=(212,260) → left=132 top=180  d≈195 ✓
            P3 @ 215°: centre=(−12,260) → left=−92 top=180  d≈195 ✓
            All plate-to-button distances ≈ 195 > 180 — zero overlap guaranteed.
            Photos: pure overhead single-dish flat-lay, plate fills full frame.
          */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 200, height: 200 }}>

              {/* P1 — right of button, top: acai smoothie bowl overhead */}
              <motion.div
                initial={{ opacity: 0, scale: 0.65 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.28, type: 'spring', stiffness: 180, damping: 20 }}
                style={{
                  position: 'absolute', width: 160, height: 160, borderRadius: '50%',
                  overflow: 'hidden', left: 214, top: 3,
                  border: '4px solid #ffffff',
                  boxShadow: '0 8px 28px rgba(0,0,0,0.22)', zIndex: 1,
                }}
              >
                <img
                  src={homeDishImage}
                  alt="Vegan dish" className="w-full h-full object-cover pointer-events-none select-none" />
              </motion.div>

              {/* P2 — lower-right: grain & veg bowl overhead, rose rim */}
              <motion.div
                initial={{ opacity: 0, scale: 0.65 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.38, type: 'spring', stiffness: 180, damping: 20 }}
                style={{
                  position: 'absolute', width: 160, height: 160, borderRadius: '50%',
                  overflow: 'hidden', left: 132, top: 180,
                  border: '4px solid hsl(12 42% 60%)',
                  boxShadow: '0 8px 28px rgba(0,0,0,0.22)', zIndex: 1,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=400&h=400&fit=crop&crop=entropy&q=90"
                  alt="Grain bowl" className="w-full h-full object-cover pointer-events-none select-none" />
              </motion.div>

              {/* P3 — lower-left, peeks from edge: colourful roasted veg plate overhead */}
              <motion.div
                initial={{ opacity: 0, scale: 0.65 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.48, type: 'spring', stiffness: 180, damping: 20 }}
                style={{
                  position: 'absolute', width: 160, height: 160, borderRadius: '50%',
                  overflow: 'hidden', left: -92, top: 180,
                  border: '4px solid #ffffff',
                  boxShadow: '0 8px 28px rgba(0,0,0,0.22)', zIndex: 1,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop&crop=entropy&q=90"
                  alt="Roasted veg plate" className="w-full h-full object-cover pointer-events-none select-none" />
              </motion.div>

              {/* The button itself sits above plates at z-index 2 */}
              <motion.button
                data-testid="button-auto-plan"
                onClick={handleAutoPlan}
                whileTap={{ scale: planning ? 1 : 0.93 }}
                whileHover={{ scale: planning ? 1 : 1.04 }}
                className="rounded-full flex flex-col items-center justify-center gap-2 cursor-pointer shadow-xl"
                style={{
                  position: 'relative', zIndex: 2,
                  width: 200, height: 200,
                  background: planning
                    ? 'linear-gradient(145deg, hsl(10 48% 40%), hsl(15 46% 32%))'
                    : 'linear-gradient(145deg, hsl(15 46% 68%), hsl(10 48% 54%))',
                  border: '1px solid rgba(201,168,76,0.45)',
                  boxShadow: '0 0 0 1px rgba(201,168,76,0.18), 0 16px 48px rgba(0,0,0,0.18)',
                  transition: 'background 0.4s ease',
                }}
              >
                <AnimatePresence mode="wait">
                  {planning ? (
                    <motion.div
                      key="spinning"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-1"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                      >
                        <Leaf className="w-10 h-10 text-white/90" strokeWidth={1.5} />
                      </motion.div>
                      <span className="text-[11px] font-bold text-white/80 uppercase tracking-widest">Planning…</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <Leaf className="w-12 h-12 text-white" strokeWidth={1.5} />
                      <span className="text-[22px] font-serif font-bold text-white tracking-tight">Auto-Plan</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

        </div>
      </div>
      {/* ── END HERO ───────────────────────────────────────── */}

      {/* Dashboard below */}
      <div className="px-5 space-y-6 pt-5">

        {/* ── AUTO-PLAN PROGRESS CARD — below food pics, above check-in ── */}
        <AnimatePresence>
          {planning && (
            <motion.div
              key="plan-card"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1e1008 0%, #2d1a0a 100%)',
                border: '1px solid rgba(201,168,76,0.35)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.28)',
              }}
            >
              <div className="px-5 pt-4 pb-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C9A84C]/70">
                    E.V.E. Auto-Plan
                  </span>
                  <span className="text-[10px] font-semibold text-white/40">
                    {planStep + 1} / {planningSteps.length}
                  </span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={planStep}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-2xl leading-none select-none">
                      {planningSteps[planStep]?.icon}
                    </span>
                    <span className="text-[13px] font-medium text-white/90 leading-snug">
                      {planningSteps[planStep]?.msg}
                    </span>
                  </motion.div>
                </AnimatePresence>
                <div className="rounded-full overflow-hidden" style={{ height: 4, background: 'rgba(255,255,255,0.1)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #C9A84C, #e8c87a)' }}
                    animate={{ width: `${barWidth}%` }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* E.V.E. Check-In pill — long thin oval */}
        <motion.button
          data-testid="button-wellness-report"
          onClick={() => setShowWellnessReport(true)}
          whileTap={{ scale: 0.97, y: 1 }}
          whileHover={{ scale: 1.01 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
          className="w-full flex items-center justify-center gap-2.5 cursor-pointer"
          style={{
            height: 46,
            borderRadius: 999,
            background: 'linear-gradient(100deg, hsl(15 46% 68%) 0%, hsl(10 48% 54%) 60%, hsl(30 45% 52%) 100%)',
            border: '1px solid rgba(201,168,76,0.55)',
            boxShadow: '0 0 0 1px rgba(201,168,76,0.18), inset 0 1px 0 rgba(255,255,255,0.20), 0 6px 20px rgba(0,0,0,0.12)',
          }}
        >
          <ClipboardList className="w-4 h-4 text-white" strokeWidth={2} />
          <span
            className="text-white font-bold tracking-wide"
            style={{ fontSize: 14, letterSpacing: '0.05em' }}
          >
            E.V.E. Check-In
          </span>
          <span className="text-white/85 text-[12px] font-semibold">· Your Progress So Far</span>
        </motion.button>

        {/* Nutrition Dashboard */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h2 className="text-lg font-serif text-foreground">Nutrition Dashboard</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Card className="shadow-sm" style={{ border: '1px solid rgba(201,168,76,0.32)', boxShadow: '0 0 0 1px rgba(201,168,76,0.08), inset 0 1px 0 rgba(255,255,255,0.65), 0 4px 14px rgba(0,0,0,0.05)' }}>
              <CardContent className="p-3 space-y-2">
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Yesterday</p>
                {yesterdayTotals.cal > 0 ? (
                  <div className="space-y-1.5">
                    {[
                      { label: "Calories", val: `${yesterdayTotals.cal}`, color: "text-primary" },
                      { label: "Protein", val: `${yesterdayTotals.protein}g`, color: "text-blue-500" },
                      { label: "Carbs", val: `${yesterdayTotals.carbs}g`, color: "text-amber-500" },
                      { label: "Fat", val: `${yesterdayTotals.fat}g`, color: "text-yellow-600" },
                      { label: "Fiber", val: `${yesterdayTotals.fiber}g`, color: "text-green-600" },
                    ].map(row => (
                      <div key={row.label} className="flex justify-between items-center">
                        <span className="text-[10px] text-muted-foreground">{row.label}</span>
                        <span className={`text-xs font-bold ${row.color}`}>{row.val}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10px] text-muted-foreground/60 italic">Nothing logged yet</p>
                )}
              </CardContent>
            </Card>
            <Card className="shadow-sm" style={{ border: '1px solid rgba(201,168,76,0.32)', boxShadow: '0 0 0 1px rgba(201,168,76,0.08), inset 0 1px 0 rgba(255,255,255,0.65), 0 4px 14px rgba(0,0,0,0.05)' }}>
              <CardContent className="p-3 space-y-2">
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">This Week</p>
                {weeklyTotals.days > 0 ? (
                  <div className="space-y-1.5">
                    {[
                      { label: "Avg Cal", val: `${Math.round(weeklyTotals.cal / weeklyTotals.days)}`, color: "text-primary" },
                      { label: "Protein", val: `${weeklyTotals.protein}g`, color: "text-blue-500" },
                      { label: "Carbs", val: `${weeklyTotals.carbs}g`, color: "text-amber-500" },
                      { label: "Fat", val: `${weeklyTotals.fat}g`, color: "text-yellow-600" },
                    ].map(row => (
                      <div key={row.label} className="flex justify-between items-center">
                        <span className="text-[10px] text-muted-foreground">{row.label}</span>
                        <span className={`text-xs font-bold ${row.color}`}>{row.val}</span>
                      </div>
                    ))}
                    <p className="text-[9px] text-muted-foreground opacity-60">{weeklyTotals.days} days logged</p>
                  </div>
                ) : (
                  <p className="text-[10px] text-muted-foreground/60 italic">Start tracking in the Track tab!</p>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Last Workout */}
        {lastWorkout && (
          <section className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <Dumbbell className="w-4 h-4 text-primary" />
              <h2 className="text-lg font-serif text-foreground">Last Workout</h2>
              <span className="text-[10px] text-muted-foreground ml-auto">{formatDate(lastWorkout.date)}</span>
            </div>
            <Card className="overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.32)', boxShadow: '0 0 0 1px rgba(201,168,76,0.08), inset 0 1px 0 rgba(255,255,255,0.65), 0 4px 14px rgba(0,0,0,0.05)' }}>
              <div className="h-1 bg-gradient-to-r from-primary to-primary/40" />
              <CardContent className="p-3 space-y-1.5">
                {lastWorkout.entries.slice(0, 3).map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">{entry.category}</span>
                      <span className="text-xs font-bold text-foreground">{entry.exercise}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{entry.sets.length} set{entry.sets.length !== 1 ? 's' : ''}</span>
                  </div>
                ))}
                {lastWorkout.entries.length > 3 && (
                  <p className="text-[10px] text-muted-foreground">+{lastWorkout.entries.length - 3} more exercises</p>
                )}
                <button onClick={() => setActiveTab('track')} className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">
                  Log Today's Workout →
                </button>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Today's Meals */}
        <section className="space-y-3">
          <div className="flex justify-between items-end px-1">
            <h2 className="text-2xl font-serif text-foreground">Today's Meals</h2>
            <button onClick={() => setActiveTab('plan')} className="flex items-center text-primary text-xs font-bold uppercase tracking-widest">
              See Plan <ChevronRight className="w-4 h-4 ml-0.5" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-4 snap-x no-scrollbar -mx-5 px-5">
            {todaysMeals.length > 0 ? todaysMeals.map((meal, idx) => {
              const cal = (PRELOADED_RECIPES as any)[meal.name]?.nutrition?.calories;
              return (
                <motion.button
                  key={meal.slot}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setRecipeModal(meal.name)}
                  className="snap-start flex-shrink-0 w-48 text-left cursor-pointer"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: '4/5' }}>
                    <img
                      src={getFoodPhoto(meal.name)}
                      alt={meal.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                    {/* Calorie pill top-right */}
                    {cal && (
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-0.5 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5 border border-white/15">
                        <Flame className="w-2.5 h-2.5 text-orange-400" />
                        <span className="text-[9px] font-bold text-white">{cal}</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 p-3 text-white w-full">
                      <p className="text-[9px] uppercase font-bold tracking-widest text-white/65 mb-0.5">{meal.slot}</p>
                      <h3 className="text-[13px] font-bold leading-tight">{meal.name}</h3>
                      <p className="text-[9px] text-white/50 mt-1 font-medium">Tap to view recipe →</p>
                    </div>
                  </div>
                </motion.button>
              );
            }) : (
              <div className="w-full text-center py-10 bg-muted/20 rounded-2xl border-2 border-dashed border-border">
                <p className="text-muted-foreground text-sm font-medium">No meals planned for today.</p>
                <button onClick={handleAutoPlan} className="text-primary text-xs mt-2 font-bold uppercase tracking-widest">
                  Tap Auto-Plan to start!
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      <AnimatePresence>
        {showWellnessReport && (
          <WellnessReportModal onClose={() => setShowWellnessReport(false)} />
        )}
      </AnimatePresence>

      <RecipeModal
        name={recipeModal}
        onClose={() => setRecipeModal(null)}
        onSchedule={(name) => {
          setRecipeModal(null);
          setActiveTab('plan');
          toast.success(`Open Plan tab to schedule ${name}`);
        }}
      />
    </div>
  );
}
