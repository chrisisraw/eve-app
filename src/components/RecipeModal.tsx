const acaiBowlFallback = "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&h=400&fit=crop&q=80";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, ChefHat, Flame, CalendarDays, Minus, Plus, Heart, PlayCircle } from "lucide-react";
import { PRELOADED_RECIPES } from "@/data/recipes";
import { JUICE_RECIPES, SMOOTHIE_RECIPES } from "@/data/sips";
import { getFoodPhoto } from "@/data/foodPhotos";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEveStore } from "@/hooks/useEveStore";

interface RecipeModalProps {
  name: string | null;
  onClose: () => void;
  onSchedule?: (name: string) => void;
}

function getSipRecipe(name: string) {
  const all = [...JUICE_RECIPES, ...SMOOTHIE_RECIPES];
  const sip = all.find(r => r.name === name);
  if (!sip) return null;
  const isJuice = JUICE_RECIPES.some(r => r.name === name);
  return {
    title: sip.name,
    servings: 1,
    prepTime: '5 min',
    cookTime: '0 min',
    difficulty: 'Easy',
    tags: [isJuice ? 'cold press' : 'smoothie', sip.benefits],
    ingredients: sip.ingredients.map((ing: string) => ({ name: ing, amount: '1', unit: '' })),
    steps: [`Combine all ingredients: ${sip.ingredients.join(', ')}.`, isJuice ? 'Run through cold-press juicer and serve over ice.' : 'Blend on high until completely smooth. Serve immediately.'],
    nutrition: { calories: sip.cal, protein: sip.protein, carbs: sip.carbs, fat: sip.fat, fiber: 2 },
  };
}

/** Scale a numeric amount string by a factor. Non-numeric strings are returned as-is. */
function scaleAmount(amountStr: string, factor: number): string {
  if (!amountStr) return '';
  // Handle fractions like "1/2"
  if (amountStr.includes('/')) {
    const [num, den] = amountStr.split('/').map(Number);
    if (!isNaN(num) && !isNaN(den) && den !== 0) {
      const scaled = (num / den) * factor;
      return formatAmount(scaled);
    }
  }
  const n = parseFloat(amountStr);
  if (isNaN(n)) return amountStr;
  return formatAmount(n * factor);
}

function formatAmount(n: number): string {
  if (n === Math.round(n)) return String(Math.round(n));
  // Show up to 2 decimals, trim trailing zeros
  return parseFloat(n.toFixed(2)).toString();
}

export function RecipeModal({ name, onClose, onSchedule }: RecipeModalProps) {
  const { favorites, toggleFavorite } = useEveStore();
  const [servings, setServings] = useState(2);

  // Resolve recipe first (needed to read base servings for init)
  const preloaded = name ? (PRELOADED_RECIPES as Record<string, any>)[name] : null;
  const sipRecipe = name && !preloaded ? getSipRecipe(name) : null;
  const recipe = preloaded || sipRecipe;

  // Sync servings to recipe's base servings whenever the recipe changes
  useEffect(() => {
    setServings(recipe?.servings || 2);
  }, [name, recipe?.servings]);

  const NUT_ROWS = [
    { k: 'calories', label: 'Kcal',    color: 'text-primary' },
    { k: 'protein',  label: 'Protein', color: 'text-blue-500' },
    { k: 'carbs',    label: 'Carbs',   color: 'text-amber-500' },
    { k: 'fat',      label: 'Fat',     color: 'text-yellow-600' },
    { k: 'fiber',    label: 'Fiber',   color: 'text-green-600' },
  ];

  if (!name) return null;

  const baseServings = recipe?.servings || 2;
  const scaleFactor = servings / baseServings;
  const isFav = favorites.includes(name);

  return (
    <AnimatePresence>
      <motion.div
        key="recipe-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        key="recipe-sheet"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-background rounded-t-3xl z-50 shadow-2xl border-t border-border max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Hero photo */}
        <div className="shrink-0 relative h-52 overflow-hidden rounded-t-3xl">
          <img
            src={getFoodPhoto(name)}
            alt={name}
            className="w-full h-full object-cover"
            onError={e => { (e.target as HTMLImageElement).src = acaiBowlFallback; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0905]/90 via-black/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white backdrop-blur-sm border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleFavorite(name)}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white backdrop-blur-sm border border-white/10"
          >
            <Heart className={cn("w-4 h-4 transition-colors", isFav ? "fill-red-400 text-red-400" : "text-white/70")} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
            <h2 className="text-2xl font-serif font-bold text-white leading-tight drop-shadow-lg">{name}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-5 space-y-5">
            {recipe ? (
              <>
                {/* Meta chips */}
                <div className="flex flex-wrap gap-1.5">
                  {recipe.prepTime && (
                    <span className="text-[10px] bg-muted rounded-full px-2.5 py-1 font-bold text-muted-foreground flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> {recipe.prepTime}
                    </span>
                  )}
                  {recipe.cookTime && recipe.cookTime !== '0 min' && (
                    <span className="text-[10px] bg-muted rounded-full px-2.5 py-1 font-bold text-muted-foreground flex items-center gap-1">
                      <Flame className="w-2.5 h-2.5" /> {recipe.cookTime}
                    </span>
                  )}
                  {recipe.difficulty && (
                    <span className="text-[10px] bg-primary/10 text-primary rounded-full px-2.5 py-1 font-bold">
                      {recipe.difficulty}
                    </span>
                  )}
                  {(recipe.tags || []).map((tag: string) => (
                    <span key={tag} className="text-[10px] bg-muted rounded-full px-2.5 py-1 font-bold text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* ── Servings Scaler ── */}
                <div className="flex items-center justify-between bg-muted/30 rounded-2xl px-4 py-3 border border-border/50">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Servings</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-0.5">Scales ingredients below</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setServings(s => Math.max(1, s - 1))}
                      className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-primary/10 hover:border-primary/40 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-lg font-bold text-foreground w-6 text-center tabular-nums">{servings}</span>
                    <button
                      onClick={() => setServings(s => Math.min(20, s + 1))}
                      className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-primary/10 hover:border-primary/40 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Nutrition grid — always per-serving, but total shown when servings > 1 */}
                {recipe.nutrition && (
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #1e1008 0%, #2d1a0a 100%)', border: '1px solid rgba(201,168,76,0.25)' }}
                  >
                    <p className="text-center text-[9px] text-white/40 uppercase font-bold tracking-widest pt-2.5">
                      {servings > 1 ? `Total for ${servings} servings` : 'Per serving'}
                    </p>
                    <div className="grid grid-cols-5">
                      {NUT_ROWS.map(({ k, label, color }) => {
                        const perServing = recipe.nutrition[k] ?? 0;
                        const displayed = scaleFactor !== 1 ? Math.round(perServing * scaleFactor) : perServing;
                        return (
                          <div key={k} className="text-center py-3 px-1">
                            <div className={cn("text-base font-bold", color)}>
                              {displayed}{k !== 'calories' ? 'g' : ''}
                            </div>
                            <div className="text-[8px] text-white/50 uppercase font-bold mt-0.5 tracking-wider">{label}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Ingredients — scaled */}
                {recipe.ingredients && recipe.ingredients.length > 0 && (
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground mb-3">
                      Ingredients
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {recipe.ingredients.map((ing: any, i: number) => {
                        const scaledAmt = scaleAmount(String(ing.amount || ''), scaleFactor);
                        const parts = [scaledAmt, ing.unit, ing.name].filter(Boolean).join(' ');
                        return (
                          <span
                            key={i}
                            className="text-[11px] bg-muted/60 border border-border/50 rounded-full px-3 py-1 font-medium text-foreground"
                          >
                            {parts}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Method */}
                {recipe.steps && recipe.steps.length > 0 && (
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground mb-3">
                      Method
                    </h3>
                    <ol className="space-y-3">
                      {recipe.steps.map((step: string, i: number) => (
                        <li key={i} className="flex gap-3 text-sm">
                          <span
                            className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                            style={{ background: 'linear-gradient(135deg, hsl(15 46% 68%), hsl(10 48% 54%))', color: 'white' }}
                          >
                            {i + 1}
                          </span>
                          <span className="text-foreground leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

              </>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                <ChefHat className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">No recipe details yet.</p>
                <p className="text-xs mt-1 opacity-60">Import this recipe using the Meal Bank tab!</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer buttons */}
        <div className="shrink-0 p-4 border-t border-border/50 flex gap-2 bg-background">
          <Button variant="outline" onClick={onClose} className="flex-1 rounded-full text-xs">
            Close
          </Button>
          {onSchedule && (
            <Button
              onClick={() => { onSchedule(name); onClose(); }}
              className="flex-1 rounded-full text-xs gap-1.5"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              Schedule This
            </Button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
