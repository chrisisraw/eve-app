import { useState, useRef } from "react";
import { PageHero } from "@/components/PageHero";
import { useEveStore } from "@/hooks/useEveStore";
import { MEALS, DAYS, SLOTS, SLOT_DISPLAY } from "@/data/meals";
import { getFoodPhoto } from "@/data/foodPhotos";
import { PRELOADED_RECIPES } from "@/data/recipes";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Plus, ChevronDown, ChevronUp, X, Search, Upload, Link, FileText, Loader2, Trash2, Heart, Clock, ChefHat, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { JUICE_RECIPES, SMOOTHIE_RECIPES } from "@/data/sips";
import type { Recipe } from "@/hooks/useEveStore";
import { RecipeModal } from "@/components/RecipeModal";

const ALL_MEALS_FLAT = Object.entries(MEALS).flatMap(([cat, meals]) => meals.map(m => ({ name: m, category: cat })));
const ALL_JUICES = JUICE_RECIPES.map(r => ({ name: r.name, category: 'Juices', cal: r.cal }));
const ALL_SMOOTHIES = SMOOTHIE_RECIPES.map(r => ({ name: r.name, category: 'Smoothies', cal: r.cal }));
const CATEGORY_LABELS: Record<string, string> = {
  'Salads & Raw': 'Salads & Raw',
  'Wraps & Rolls': 'Wraps & Rolls',
  'Bowls & Mains': 'Bowls & Mains',
  '🍎 Snacks': 'Snacks',
  '🥗 Dressings': 'Dressings',
  '🍫 Desserts': 'Desserts',
};

function isGlutenFree(name: string) {
  const lower = name.toLowerCase();
  return !['bread', 'pasta', 'noodle', 'waffle', 'pancake', 'wrap', 'crepe', 'biscuit', 'wheat', 'flour tortilla', 'pita', 'sourdough'].some(w => lower.includes(w));
}

function isOilFree(name: string) {
  const lower = name.toLowerCase();
  return !['fried', 'sautéed', 'sauteed', 'stir-fry', 'stir fry'].some(w => lower.includes(w));
}

export default function PlanPage() {
  const store = useEveStore();
  const { weekPlan, recipes, planMeal, clearMeal, clearDay, clearWeek, setMealRating, mealRatings, addCustomMeal, customMeals, favorites, toggleFavorite } = store;
  const [activeTab, setActiveTab] = useState("week");
  const [expandedDay, setExpandedDay] = useState<string | null>(
    new Date().toLocaleDateString('en-US', { weekday: 'long' })
  );
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerContext, setPickerContext] = useState<{ day: string; slot: string } | null>(null);
  const [pickerSearch, setPickerSearch] = useState('');
  const [recipeModal, setRecipeModal] = useState<{ name: string; isCustom?: boolean } | null>(null);
  const [confirmClearWeek, setConfirmClearWeek] = useState(false);
  const [schedulePickerMeal, setSchedulePickerMeal] = useState<string | null>(null);

  const openPicker = (day: string, slot: string) => {
    setPickerContext({ day, slot });
    setPickerSearch('');
    setPickerOpen(true);
  };

  const handlePick = (mealName: string) => {
    if (!pickerContext) return;
    planMeal(pickerContext.day, pickerContext.slot, mealName);
    toast.success(`✓ ${mealName} → ${pickerContext.day} ${pickerContext.slot}`);
    setPickerOpen(false);
    setPickerContext(null);
  };

  const handleScheduleMeal = (mealName: string, day: string, slot: string) => {
    planMeal(day, slot, mealName);
    toast.success(`✓ "${mealName}" → ${day} ${slot}`);
    setSchedulePickerMeal(null);
  };

  const getPickerOptions = () => {
    if (!pickerContext) return [];
    const slot = pickerContext.slot;
    if (slot === 'Juice') return ALL_JUICES;
    if (slot === 'Smoothie') return ALL_SMOOTHIES;
    if (slot === 'Breakfast') return MEALS['Breakfast'].map(n => ({ name: n, category: 'Breakfast', cal: (PRELOADED_RECIPES as any)[n]?.nutrition?.calories }));
    if (slot === 'Snack 1' || slot === 'Snack 2') return [
      ...(MEALS['🍎 Snacks'] || []).map(n => ({ name: n, category: 'Snacks', cal: (PRELOADED_RECIPES as any)[n]?.nutrition?.calories })),
      ...(MEALS['🍫 Desserts'] || []).map(n => ({ name: n, category: 'Desserts', cal: (PRELOADED_RECIPES as any)[n]?.nutrition?.calories })),
    ];
    return ALL_MEALS_FLAT.map(m => ({ ...m, cal: (PRELOADED_RECIPES as any)[m.name]?.nutrition?.calories }));
  };

  const pickerOptions = getPickerOptions().filter(m =>
    !pickerSearch || m.name.toLowerCase().includes(pickerSearch.toLowerCase())
  );

  const recipeData = recipeModal
    ? ((PRELOADED_RECIPES as any)[recipeModal.name] || customMeals.find(r => r.title === recipeModal.name) || null)
    : null;

  return (
    <div className="flex flex-col min-h-screen animate-in fade-in duration-500">
      <PageHero
        title="Planner"
        subtitle="Your weekly vegan menu"
        accent="✦"
        photos={[
          "https://images.unsplash.com/photo-1512621776831-0b23f3d69d48?w=300&h=300&fit=crop&crop=center&q=90",
          "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=300&fit=crop&crop=center&q=90",
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop&crop=center&q=90",
        ]}
      >
        {activeTab === 'week' && (
          <button
            onClick={() => setConfirmClearWeek(true)}
            className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground hover:text-destructive transition-colors uppercase tracking-widest"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Week
          </button>
        )}
      </PageHero>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-5 border-b border-border sticky top-0 bg-background z-10">
          <TabsList className="w-full bg-transparent h-11 p-0 gap-6">
            {['week', 'bank'].map(tab => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="relative h-11 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs font-bold uppercase tracking-widest text-muted-foreground data-[state=active]:text-primary"
              >
                {tab === 'week' ? 'Week Plan' : 'Meal Bank'}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="week" className="flex-1 p-4 space-y-3 m-0 overflow-y-auto pb-24">
          {DAYS.map(day => (
            <DayCard
              key={day}
              day={day}
              isExpanded={expandedDay === day}
              onToggle={() => setExpandedDay(expandedDay === day ? null : day)}
              plan={weekPlan}
              recipes={{ ...recipes, ...(PRELOADED_RECIPES as Record<string, Recipe>) }}
              onAdd={openPicker}
              onClear={clearMeal}
              onClearDay={clearDay}
              onViewRecipe={(name) => setRecipeModal({ name })}
            />
          ))}
        </TabsContent>

        <TabsContent value="bank" className="flex-1 m-0">
          <MealBank
            mealRatings={mealRatings}
            onRate={setMealRating}
            onSchedule={(name) => setSchedulePickerMeal(name)}
            onAddCustomMeal={addCustomMeal}
            customMeals={customMeals}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onViewRecipe={(name, isCustom) => setRecipeModal({ name, isCustom })}
          />
        </TabsContent>
      </Tabs>

      {/* Slot picker */}
      <AnimatePresence>
        {pickerOpen && pickerContext && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={() => setPickerOpen(false)} />
            <motion.div
              initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-background rounded-b-3xl z-50 shadow-2xl border-t border-border max-h-[85vh] flex flex-col"
            >
              <div className="p-4 border-b border-border/50 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-foreground">Pick a meal</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-0.5">
                    {pickerContext.day} · {SLOT_DISPLAY[pickerContext.slot as keyof typeof SLOT_DISPLAY]}
                  </p>
                </div>
                <button onClick={() => setPickerOpen(false)} className="p-2 rounded-xl text-muted-foreground hover:bg-muted/30"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-3 border-b border-border/50">
                <div className="flex items-center gap-2 bg-muted/20 rounded-xl px-3 py-2 border border-border/50">
                  <Search className="w-3.5 h-3.5 text-muted-foreground" />
                  <input autoFocus value={pickerSearch} onChange={e => setPickerSearch(e.target.value)}
                    placeholder="Search meals..." className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
                {pickerOptions.map(opt => (
                  <button key={opt.name} onClick={() => handlePick(opt.name)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-card hover:bg-muted/30 border border-border/40 transition-colors text-left">
                    <img src={getFoodPhoto(opt.name)} alt={opt.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{opt.name}</p>
                      <p className="text-[10px] text-muted-foreground">{opt.category}{opt.cal ? ` · ${opt.cal} kcal` : ''}</p>
                    </div>
                  </button>
                ))}
                {pickerOptions.length === 0 && <div className="text-center py-8 text-muted-foreground text-sm">No meals found</div>}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Schedule a specific meal — pick day+slot */}
      <AnimatePresence>
        {schedulePickerMeal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={() => setSchedulePickerMeal(null)} />
            <motion.div
              initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-background rounded-b-3xl z-50 shadow-2xl border-t border-border max-h-[85vh] flex flex-col"
            >
              <div className="p-4 border-b border-border/50 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-foreground">Schedule "{schedulePickerMeal}"</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-0.5">Choose a day and time slot</p>
                </div>
                <button onClick={() => setSchedulePickerMeal(null)} className="p-2 rounded-xl text-muted-foreground hover:bg-muted/30"><X className="w-4 h-4" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {DAYS.map(day => (
                  <div key={day}>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1">{day}</p>
                    <div className="grid grid-cols-4 gap-1">
                      {SLOTS.map(slot => {
                        const taken = weekPlan[`${day}-${slot}`];
                        return (
                          <button
                            key={slot}
                            onClick={() => handleScheduleMeal(schedulePickerMeal!, day, slot)}
                            className={cn(
                              "py-1.5 px-1 rounded-xl text-[8px] font-bold border transition-all text-left",
                              taken ? "border-primary/40 bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:bg-primary/5"
                            )}
                          >
                            <div className="leading-tight">{SLOT_DISPLAY[slot as keyof typeof SLOT_DISPLAY]}</div>
                            {taken && <div className="text-[7px] truncate opacity-60 mt-0.5">{taken}</div>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <RecipeModal
        name={recipeModal?.name ?? null}
        onClose={() => setRecipeModal(null)}
        onSchedule={(name) => {
          setSchedulePickerMeal(name);
          setRecipeModal(null);
        }}
      />

      {/* Confirm clear week */}
      <AnimatePresence>
        {confirmClearWeek && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={() => setConfirmClearWeek(false)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-x-6 top-1/3 max-w-[420px] mx-auto bg-background rounded-2xl z-50 shadow-2xl p-6 space-y-4"
            >
              <h3 className="text-lg font-serif font-bold text-foreground">Clear the whole week?</h3>
              <p className="text-sm text-muted-foreground">This will remove all meals from your weekly plan. This cannot be undone.</p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setConfirmClearWeek(false)} className="flex-1 rounded-full">Cancel</Button>
                <Button variant="destructive" onClick={() => { clearWeek(); setConfirmClearWeek(false); toast.success('Week cleared'); }} className="flex-1 rounded-full">
                  Clear All
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function DayCard({ day, isExpanded, onToggle, plan, recipes, onAdd, onClear, onClearDay, onViewRecipe }: {
  day: string; isExpanded: boolean; onToggle: () => void;
  plan: Record<string, string>; recipes: Record<string, any>;
  onAdd: (day: string, slot: string) => void; onClear: (day: string, slot: string) => void;
  onClearDay: (day: string) => void; onViewRecipe: (name: string) => void;
}) {
  const filledCount = SLOTS.filter(s => plan[`${day}-${s}`]).length;
  const totalCal = SLOTS.reduce((sum, s) => {
    const m = plan[`${day}-${s}`];
    return sum + (m ? ((PRELOADED_RECIPES as any)[m]?.nutrition || recipes[m]?.nutrition?.calories || 0) : 0);
  }, 0);

  return (
    <Card className="overflow-hidden border-border/50 shadow-sm">
      <button onClick={onToggle} className="w-full p-4 flex justify-between items-center hover:bg-muted/20 transition-colors">
        <div className="flex items-center gap-3">
          <span className="text-base font-serif font-bold">{day}</span>
          <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
            {filledCount}/{SLOTS.length}
          </span>
          {totalCal > 0 && <span className="text-[9px] text-muted-foreground font-bold flex items-center gap-0.5"><Flame className="w-2.5 h-2.5" />{totalCal}</span>}
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="border-t border-border/50 overflow-hidden">
            <div className="p-3 space-y-2">
              <div className="flex justify-end">
                <button onClick={() => onClearDay(day)}
                  className="flex items-center gap-1 text-[9px] font-bold text-muted-foreground hover:text-destructive transition-colors uppercase tracking-widest">
                  <Trash2 className="w-2.5 h-2.5" /> Clear Day
                </button>
              </div>
              {SLOTS.map(slot => {
                const key = `${day}-${slot}`;
                const mealName = plan[key];
                const nutrition = mealName ? ((PRELOADED_RECIPES as any)[mealName]?.nutrition || recipes[mealName]?.nutrition) : null;
                const calFromPreloaded = nutrition?.calories || null;
                return (
                  <div key={slot} className="flex gap-2 items-center">
                    <div className="w-16 text-[8px] uppercase font-bold tracking-widest text-muted-foreground shrink-0">
                      {SLOT_DISPLAY[slot as keyof typeof SLOT_DISPLAY]}
                    </div>
                    {mealName ? (
                      <div
                        className="flex-1 relative overflow-hidden rounded-xl group cursor-pointer"
                        style={{ minHeight: 58 }}
                        onClick={() => onViewRecipe(mealName)}
                      >
                        <img
                          src={getFoodPhoto(mealName)}
                          alt={mealName}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/40 to-transparent" />
                        <div className="relative flex items-center h-full px-2.5 py-2 gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-bold text-white leading-tight truncate drop-shadow">{mealName}</p>
                            {nutrition && (
                              <div className="flex gap-1.5 mt-0.5"><span className="text-[9px] text-white/75 font-semibold">{nutrition.calories}kcal</span><span className="text-[9px] text-blue-300/80 font-semibold">{nutrition.protein}p</span><span className="text-[9px] text-yellow-300/80 font-semibold">{nutrition.carbs}c</span><span className="text-[9px] text-orange-300/80 font-semibold">{nutrition.fat}f</span></div>
                            )}
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <button onClick={e => { e.stopPropagation(); onAdd(day, slot); }}
                              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-colors" title="Change">
                              <Plus className="w-3 h-3" />
                            </button>
                            <button onClick={e => { e.stopPropagation(); onClear(day, slot); }}
                              className="p-1 rounded-lg text-white/80 hover:text-red-300 hover:bg-red-500/20 transition-colors" title="Remove">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => onAdd(day, slot)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border-2 border-dashed border-border hover:border-primary/40 hover:bg-primary/5 transition-all text-muted-foreground/50">
                        <Plus className="w-3 h-3" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Add</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

function StarRating({ meal, rating, onRate }: { meal: string; rating: number; onRate: (meal: string, r: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <button key={star} onClick={e => { e.stopPropagation(); onRate(meal, star === rating ? 0 : star); }}
          onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}
          className="p-0.5 transition-transform hover:scale-110">
          <Star className={cn("w-3.5 h-3.5 transition-colors", (hover || rating) >= star ? "fill-amber-400 text-amber-400" : "text-white/40")} />
        </button>
      ))}
    </div>
  );
}

// ── Local recipe text parser (works without AI) ──────────────────────────────
function parseRecipeText(raw: string): Recipe {
  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);

  // Title: first non-empty line (strip markdown #)
  const title = (lines[0] || 'Imported Recipe').replace(/^#+\s*/, '').replace(/\*+/g, '').trim();

  // Time patterns
  const prepMatch = raw.match(/prep\s*(?:time)?[:\s]+(\d+)\s*(?:min|minutes?)/i);
  const cookMatch = raw.match(/cook\s*(?:time)?[:\s]+(\d+)\s*(?:min|minutes?)/i);
  const prepTime = prepMatch ? `${prepMatch[1]} min` : '15 min';
  const cookTime = cookMatch ? `${cookMatch[1]} min` : '0 min';

  // Find section boundaries
  const sectionIdx = (keywords: string[]) => {
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i].toLowerCase().replace(/[^a-z ]/g, '');
      if (keywords.some(k => l === k || l.startsWith(k + ' ') || l === k + 's')) return i;
    }
    return -1;
  };
  const ingStart = sectionIdx(['ingredient', 'ingredients', 'what you need', 'you will need']);
  const stepStart = sectionIdx(['instruction', 'instructions', 'method', 'directions', 'direction', 'steps', 'preparation', 'how to make', 'how to prepare']);

  // Parse ingredients
  const ingLines = ingStart >= 0
    ? lines.slice(ingStart + 1, stepStart > ingStart ? stepStart : undefined)
    : lines.slice(1, Math.ceil(lines.length * 0.5));

  const ingPattern = /^[-•*\d.]+\s*(.+)/;
  const amtPattern = /^([\d½¼¾⅓⅔⅛]+(?:\/\d+)?(?:\.\d+)?)\s*(cups?|tbsp?|tsp?|tablespoons?|teaspoons?|oz|g|grams?|ml|l|litres?|pounds?|lbs?|cloves?|cans?|bunch(?:es)?|stalks?|slices?|pieces?|handfuls?)?\s*(.*)/i;

  const ingredients = ingLines
    .filter(l => ingPattern.test(l) && l.length < 120)
    .slice(0, 20)
    .map(l => {
      const clean = l.replace(/^[-•*\d.]+\s*/, '').trim();
      const m = clean.match(amtPattern);
      if (m) return { amount: m[1], unit: m[2] || '', name: m[3].trim() };
      return { amount: '', unit: '', name: clean };
    });

  // Parse steps
  const stepLines = stepStart >= 0 ? lines.slice(stepStart + 1) : lines.slice(Math.ceil(lines.length * 0.5));
  const steps = stepLines
    .filter(l => l.length > 15 && l.length < 500)
    .map(l => l.replace(/^[\d]+[.)]\s*/, '').replace(/^[-•*]\s*/, '').trim())
    .filter(l => !l.match(/^(ingredient|instruction|step|method|direction)/i))
    .slice(0, 12);

  // Difficulty heuristic
  const totalMins = (prepMatch ? parseInt(prepMatch[1]) : 15) + (cookMatch ? parseInt(cookMatch[1]) : 0);
  const difficulty: 'Easy' | 'Medium' | 'Hard' = totalMins < 20 ? 'Easy' : totalMins < 45 ? 'Medium' : 'Hard';

  // Auto-tags
  const rawLower = raw.toLowerCase();
  const tags: string[] = [];
  if (rawLower.includes('gluten-free') || rawLower.includes('gluten free')) tags.push('gluten-free');
  if (rawLower.includes('oil-free') || rawLower.includes('oil free')) tags.push('oil-free');
  if (rawLower.includes('raw ')) tags.push('raw');
  if (totalMins <= 20) tags.push('quick');
  if (rawLower.match(/\b(protein|tofu|tempeh|beans|lentil|quinoa)/)) tags.push('high-protein');
  if (rawLower.match(/\b(spicy|chili|jalapeño|sriracha)/)) tags.push('spicy');

  return {
    title,
    servings: 2,
    prepTime,
    cookTime,
    difficulty,
    tags,
    ingredients: ingredients.length > 0 ? ingredients : [{ amount: '', unit: '', name: 'See recipe text' }],
    steps: steps.length > 0 ? steps : [raw.slice(0, 300)],
    nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
    source: 'User imported',
  };
}

function ImportRecipeModal({ onClose, onSave }: { onClose: () => void; onSave: (r: Recipe) => void }) {
  const [tab, setTab] = useState<'url' | 'text' | 'file'>('url');
  const [urlVal, setUrlVal] = useState('');
  const [textVal, setTextVal] = useState('');
  const [fileText, setFileText] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [parsed, setParsed] = useState<Recipe | null>(null);
  const [aiUsed, setAiUsed] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    const reader = new FileReader();
    reader.onload = ev => setFileText(ev.target?.result as string || '');
    reader.readAsText(f);
  };

  const processImport = async () => {
    let content = '';
    if (tab === 'url') {
      if (!urlVal.trim()) { setError('Please enter a URL.'); return; }
      // For URLs, attempt AI parse since we can't fetch client-side
      content = urlVal.trim();
    } else if (tab === 'text') {
      if (!textVal.trim()) { setError('Please paste or type a recipe.'); return; }
      content = textVal.trim();
    } else {
      if (!fileText) { setError('Please select a file first.'); return; }
      content = fileText;
    }

    setLoading(true); setError(''); setParsed(null); setAiUsed(false);

    // For text/file tabs: always parse locally first (instant, no API needed)
    if (tab !== 'url') {
      const local = parseRecipeText(content);
      // Then try AI enhancement in background
      try {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 8000);
        const resp = await fetch('/api/eve/import-recipe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content }),
          signal: ctrl.signal,
        });
        clearTimeout(timer);
        if (resp.ok) {
          const data = await resp.json();
          if (data.recipe && data.recipe.title) {
            setParsed(data.recipe);
            setAiUsed(true);
            setLoading(false);
            return;
          }
        }
      } catch {
        // AI failed — use local parse silently
      }
      setParsed(local);
      setLoading(false);
      return;
    }

    // URL tab — needs AI
    try {
      const resp = await fetch('/api/eve/import-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      if (!resp.ok) { const ed = await resp.json().catch(()=>({})); throw new Error(ed.error || "Status " + resp.status); }
      const data = await resp.json();
      if (!data.recipe?.title) throw new Error('No recipe found at that URL.');
      setParsed(data.recipe);
      setAiUsed(true);
    } catch (err: any) {
      setError('Import failed: ' + (err?.message || 'unknown error') + '. Try the Paste tab.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-4 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="bg-background rounded-b-3xl w-full max-w-[480px] max-h-[92vh] flex flex-col shadow-2xl"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="p-5 pb-3 border-b border-border flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-xl font-serif text-foreground">Import Recipe</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Paste text or upload a file — parses instantly</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Tab selector */}
          <div className="grid grid-cols-3 gap-2">
            {([['url', '🔗 URL'], ['text', '📋 Paste'], ['file', '📄 File']] as const).map(([id, label]) => (
              <button key={id} onClick={() => { setTab(id); setError(''); setParsed(null); }}
                className={cn("py-2.5 rounded-xl text-xs font-bold border transition-all",
                  tab === id ? "bg-primary/10 border-primary/40 text-primary" : "bg-card border-border text-muted-foreground hover:border-primary/30")}>
                {label}
              </button>
            ))}
          </div>

          {/* Hint banner */}
          {!parsed && tab === 'text' && (
            <div className="bg-primary/8 border border-primary/15 rounded-xl px-3 py-2">
              <p className="text-[10px] text-primary font-medium">
                💡 Paste any recipe — from a blog, book, or your own notes. Works instantly without internet.
              </p>
            </div>
          )}

          {!parsed && (
            <>
              {tab === 'url' && (
                <div className="space-y-1.5">
                  <Input placeholder="https://minimalistbaker.com/recipe/..." value={urlVal}
                    onChange={e => setUrlVal(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && processImport()}
                    className="rounded-xl bg-muted/30 text-sm" />
                  <p className="text-[10px] text-muted-foreground">Requires AI connection. Works with most vegan recipe blogs.</p>
                </div>
              )}
              {tab === 'text' && (
                <textarea rows={9}
                  placeholder={`Paste your recipe here...\n\nExample:\nBuffalo Cauliflower Tacos\n\nIngredients:\n- 1 head cauliflower\n- 2 tbsp hot sauce\n...\n\nInstructions:\n1. Preheat oven to 425°F\n2. ...`}
                  value={textVal} onChange={e => setTextVal(e.target.value)}
                  className="w-full rounded-xl bg-muted/30 border border-border/50 text-sm p-3 outline-none resize-none focus:border-primary/50 transition-colors text-foreground placeholder:text-muted-foreground" />
              )}
              {tab === 'file' && (
                <div className="space-y-2">
                  <button onClick={() => fileRef.current?.click()}
                    className="w-full border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/40 hover:bg-primary/5 transition-all">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                    <p className="text-sm font-medium text-muted-foreground">Click to choose a file</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">.txt or .md recipe files</p>
                  </button>
                  <input ref={fileRef} type="file" accept=".txt,.md" onChange={handleFile} className="hidden" />
                  {fileName && (
                    <div className="flex items-center justify-center gap-2 text-xs text-primary bg-primary/8 rounded-xl py-2">
                      <FileText className="w-3.5 h-3.5" />
                      {fileName}
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="bg-destructive/8 border border-destructive/20 rounded-xl px-3 py-2.5">
                  <p className="text-xs text-destructive">⚠️ {error}</p>
                </div>
              )}

              <Button onClick={processImport} disabled={loading} className="w-full rounded-full h-11 text-sm font-bold">
                {loading
                  ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Parsing recipe...</>
                  : <><ChefHat className="w-4 h-4 mr-2" />Parse &amp; Import Recipe</>
                }
              </Button>
            </>
          )}

          {/* Parsed preview */}
          {parsed && (
            <div className="space-y-4">
              {aiUsed && (
                <div className="flex items-center gap-1.5 text-[10px] text-primary/70 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 inline-block" />
                  Enhanced with AI
                </div>
              )}
              <div className="bg-primary/8 border border-primary/20 rounded-2xl p-4 space-y-3">
                <h3 className="text-base font-serif font-bold text-foreground">{parsed.title}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {parsed.prepTime && <span className="text-[10px] bg-muted rounded-full px-2 py-0.5 font-bold text-muted-foreground flex items-center gap-1"><Clock className="w-2.5 h-2.5" />{parsed.prepTime}</span>}
                  {parsed.cookTime && parsed.cookTime !== '0 min' && <span className="text-[10px] bg-muted rounded-full px-2 py-0.5 font-bold text-muted-foreground flex items-center gap-1"><Flame className="w-2.5 h-2.5" />{parsed.cookTime}</span>}
                  {parsed.difficulty && <span className="text-[10px] bg-primary/10 text-primary rounded-full px-2 py-0.5 font-bold">{parsed.difficulty}</span>}
                  {(parsed.tags || []).map(tag => <span key={tag} className="text-[10px] bg-muted rounded-full px-2 py-0.5 font-bold text-muted-foreground">{tag}</span>)}
                </div>
                {parsed.ingredients && parsed.ingredients.length > 0 && (
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1.5">Ingredients ({parsed.ingredients.length})</p>
                    <div className="flex flex-wrap gap-1">
                      {parsed.ingredients.slice(0, 6).map((ing, i) => (
                        <span key={i} className="text-[10px] bg-muted/60 rounded-full px-2 py-0.5 text-foreground">
                          {[ing.amount, ing.unit, ing.name].filter(Boolean).join(' ')}
                        </span>
                      ))}
                      {parsed.ingredients.length > 6 && (
                        <span className="text-[10px] text-muted-foreground px-1">+{parsed.ingredients.length - 6} more</span>
                      )}
                    </div>
                  </div>
                )}
                <p className="text-[10px] text-muted-foreground">{(parsed.steps || []).length} steps</p>
              </div>

              {/* Editable title */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Recipe name (tap to edit)</label>
                <Input
                  value={parsed.title}
                  onChange={e => setParsed(p => p ? { ...p, title: e.target.value } : p)}
                  className="rounded-xl text-sm font-medium"
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setParsed(null)} className="flex-1 rounded-full text-xs">
                  ← Edit
                </Button>
                <Button onClick={() => { onSave(parsed); onClose(); }} className="flex-1 rounded-full text-xs font-bold">
                  ✅ Add to My Recipes
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function MealBank({ mealRatings, onRate, onSchedule, onAddCustomMeal, customMeals, favorites, onToggleFavorite, onViewRecipe }: {
  mealRatings: Record<string, number>;
  onRate: (meal: string, r: number) => void;
  onSchedule: (name: string) => void;
  onAddCustomMeal: (r: Recipe) => void;
  customMeals: Recipe[];
  favorites: string[];
  onToggleFavorite: (name: string) => void;
  onViewRecipe: (name: string, isCustom?: boolean) => void;
}) {
  const allCats = [...Object.keys(MEALS), ...(customMeals.length ? ['My Recipes'] : []), 'Gluten-Free', 'Oil-Free', 'Favorites'];
  const [activeCategory, setActiveCategory] = useState(Object.keys(MEALS)[0]);
  const [showImport, setShowImport] = useState(false);

  const getCurrentMeals = (): string[] => {
    if (activeCategory === 'My Recipes') return customMeals.map(r => r.title);
    if (activeCategory === 'Gluten-Free') return Object.values(MEALS).flat().filter(isGlutenFree);
    if (activeCategory === 'Oil-Free') return Object.values(MEALS).flat().filter(isOilFree);
    if (activeCategory === 'Favorites') return favorites;
    return MEALS[activeCategory] || [];
  };

  const currentMeals = getCurrentMeals();

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-border bg-muted/10 space-y-2">
        <button onClick={() => setShowImport(true)}
          className="w-full flex items-center gap-2.5 p-3 bg-primary/10 border border-primary/20 rounded-2xl hover:bg-primary/15 transition-colors">
          <Upload className="w-4 h-4 text-primary" />
          <div className="text-left flex-1">
            <p className="text-xs font-bold text-primary">Import Recipe</p>
            <p className="text-[10px] text-muted-foreground">URL · Paste text · Upload file — AI parses it instantly</p>
          </div>
          <span className="text-[10px] font-bold text-primary bg-primary/15 rounded-full px-2 py-0.5">AI</span>
        </button>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {allCats.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={cn("px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest whitespace-nowrap transition-all shrink-0",
                activeCategory === cat ? "bg-primary text-primary-foreground shadow-md" : "bg-background border border-border text-muted-foreground hover:border-primary/50")}>
              {CATEGORY_LABELS[cat] || cat}
              {cat === 'Favorites' && ` (${favorites.length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-3 pb-24 overflow-y-auto no-scrollbar">
        {currentMeals.map(meal => {
          const rating = mealRatings[meal] || 0;
          const isFav = favorites.includes(meal);
          return (
            <div key={meal} onClick={() => onViewRecipe(meal, activeCategory === 'My Recipes')}
              className="group relative border-none shadow-md overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer">
              <img src={getFoodPhoto(meal)} alt={meal} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <button onClick={e => { e.stopPropagation(); onToggleFavorite(meal); }}
                className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
                <Heart className={cn("w-3.5 h-3.5 transition-colors", isFav ? "fill-red-400 text-red-400" : "text-white/70")} />
              </button>
              <div className="absolute bottom-0 p-2.5 w-full">
                <h3 className="text-xs font-bold text-white leading-tight mb-1.5">{meal}</h3>
                <StarRating meal={meal} rating={rating} onRate={onRate} />
                <button onClick={e => { e.stopPropagation(); onSchedule(meal); }}
                  className="mt-2 w-full py-1 bg-white/20 hover:bg-white/40 text-white rounded-lg text-[9px] font-bold uppercase tracking-widest backdrop-blur-md border border-white/20 transition-colors">
                  + Schedule
                </button>
              </div>
            </div>
          );
        })}
        {currentMeals.length === 0 && (
          <div className="col-span-2 py-12 text-center text-muted-foreground text-sm">
            {activeCategory === 'Favorites' ? 'No favorites yet — tap ♡ on any meal card!' :
             activeCategory === 'My Recipes' ? 'No imported recipes yet — use the button above!' :
             'No meals in this category.'}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showImport && (
          <ImportRecipeModal
            onClose={() => setShowImport(false)}
            onSave={(recipe) => {
              onAddCustomMeal(recipe);
              setActiveCategory('My Recipes');
              toast.success(`✓ "${recipe.title}" added to My Recipes!`);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
