import { useState, useMemo } from "react";
import { PageHero } from "@/components/PageHero";
import { useEveStore } from "@/hooks/useEveStore";
import { PRELOADED_RECIPES } from "@/data/recipes";
import { VEGAN_BRANDS } from "@/data/brands";
import { AISLE_MAP, MEALS } from "@/data/meals";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink, X, ShoppingCart, Package, ArrowDownAZ, LayoutList } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const AISLE_LABELS: Record<string, string> = {
  produce:   '🥦 Produce',
  grains:    '🌾 Grains & Legumes',
  protein:   '💪 Protein',
  dairy_alt: '🥛 Dairy Alternatives',
  pantry:    '🫙 Pantry Staples',
  spices:    '🧂 Spices',
  canned:    '🥫 Canned & Packaged',
  other:     '🛒 Other',
};

const AISLE_ORDER = ['produce', 'grains', 'protein', 'dairy_alt', 'pantry', 'spices', 'canned', 'other'];

const GROCERY_STORES = [
  { id: 'walmart',    name: 'Walmart',      emoji: '🛒', url: (q: string) => `https://www.walmart.com/search?q=vegan+${encodeURIComponent(q)}` },
  { id: 'target',     name: 'Target',       emoji: '🎯', url: (q: string) => `https://www.target.com/s?searchTerm=vegan+${encodeURIComponent(q)}` },
  { id: 'amazon',     name: 'Amazon Fresh', emoji: '📦', url: (q: string) => `https://www.amazon.com/s?k=vegan+${encodeURIComponent(q)}` },
  { id: 'wholeFoods', name: 'Whole Foods',  emoji: '🌿', url: (q: string) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}&i=wholefoods` },
  { id: 'kroger',     name: 'Kroger',       emoji: '🏬', url: (q: string) => `https://www.kroger.com/search?query=vegan+${encodeURIComponent(q)}` },
  { id: 'traderjoes', name: "Trader Joe's", emoji: '🛍️', url: (q: string) => `https://www.traderjoes.com/home/search?q=${encodeURIComponent(q)}&section=products&global=no` },
  { id: 'sprouts',    name: 'Sprouts',      emoji: '🌱', url: (q: string) => `https://www.sprouts.com/search/?q=${encodeURIComponent(q)}` },
  { id: 'costco',     name: 'Costco',       emoji: '📦', url: (q: string) => `https://www.costco.com/CatalogSearch?keyword=vegan+${encodeURIComponent(q)}` },
];

interface PantryResult {
  canMakeFully: string[];
  recipesUsing: { meal: string; matched: string[]; total: number }[];
  pantryTip: string;
  onlineSuggestions: { name: string; url: string }[];
}

// Reverse-lookup aisle for an ingredient name using keyword matching
function getIngredientAisle(ing: string): string {
  const lower = ing.toLowerCase().trim();
  for (const [aisle, keywords] of Object.entries(AISLE_MAP)) {
    if ((keywords as string[]).some(kw => lower.includes(kw) || kw.includes(lower.split(' ')[0]))) {
      return aisle;
    }
  }
  return 'other';
}

// Allergen-ingredient keyword map for substitution suggestions
const ALLERGEN_SUBS: Record<string, { match: string[]; sub: string }> = {
  peanuts: { match: ['peanut'], sub: 'cashews or sunflower seed butter' },
  peanut:  { match: ['peanut'], sub: 'cashews or sunflower seed butter' },
  nuts:    { match: ['almond', 'walnut', 'cashew', 'pecan', 'nut'], sub: 'seeds (sunflower/pumpkin)' },
  soy:     { match: ['tofu', 'tempeh', 'edamame', 'soy', 'tamari', 'miso'], sub: 'chickpeas or lentils' },
  gluten:  { match: ['bread', 'pasta', 'noodle', 'waffle', 'pancake', 'wrap', 'flour'], sub: 'gluten-free alternatives' },
  corn:    { match: ['corn', 'tortilla', 'polenta'], sub: 'rice or quinoa' },
};

export default function ShopPage() {
  const { weekPlan, shoppingChecked, pantryItems, groceryStore, garden, profile, setPantryItems, setGroceryStore, setState } = useEveStore();
  const allergies = (profile.allergies || []).map(a => a.toLowerCase().trim());

  // Ready plants that can be harvested
  const gardenReadyNames = garden
    .filter(p => p.stage === 'ready')
    .map(p => p.name.toLowerCase().replace(/\s*\(.*?\)\s*/g, '').trim());

  const canHarvestItem = (item: string): boolean => {
    const itemLower = item.toLowerCase();
    return gardenReadyNames.some(plant =>
      itemLower.includes(plant) || plant.includes(itemLower) ||
      itemLower.split(' ').some(word => word.length > 3 && plant.includes(word))
    );
  };
  const [customItem, setCustomItem] = useState('');
  const [pantryInput, setPantryInput] = useState('');
  const [brandSearch, setBrandSearch] = useState('');
  const [brandCategory, setBrandCategory] = useState('All');
  const [discoverSearch, setDiscoverSearch] = useState('');
  const [sortMode, setSortMode] = useState<'department' | 'alpha'>('department');

  // Build shopping list from week plan, sorted alphabetically within each aisle
  const shoppingList = useMemo(() => {
    const itemMap: Record<string, Set<string>> = {};
    Object.values(weekPlan).forEach(mealName => {
      if (!mealName) return;
      const recipe = (PRELOADED_RECIPES as any)[mealName];
      const ingredients: string[] = recipe?.ingredients?.map((i: any) => i.name?.toLowerCase()) || [];
      ingredients.forEach(ing => {
        if (!ing) return;
        const aisle = getIngredientAisle(ing);
        if (!itemMap[aisle]) itemMap[aisle] = new Set();
        itemMap[aisle].add(ing);
      });
    });
    return Object.fromEntries(
      Object.entries(itemMap).map(([aisle, items]) => [aisle, [...items].sort()])
    );
  }, [weekPlan]);

  const allItems = Object.values(shoppingList).flat();
  const checkedCount = allItems.filter(item => shoppingChecked[item]).length;
  const progressPct = allItems.length > 0 ? (checkedCount / allItems.length) * 100 : 0;

  const toggleChecked = (item: string) => {
    setState(prev => ({
      ...prev,
      shoppingChecked: { ...prev.shoppingChecked, [item]: !prev.shoppingChecked[item] }
    }));
  };

  const addCustom = () => {
    if (!customItem.trim()) return;
    const itemLower = customItem.trim().toLowerCase();
    const aisle = getIngredientAisle(itemLower);
    toast.success(`✓ "${customItem.trim()}" added to list`);
    setCustomItem('');
    setState(prev => {
      const newChecked = { ...prev.shoppingChecked, [itemLower]: false };
      return { ...prev, shoppingChecked: newChecked };
    });
    // Just toast — in a fuller app we'd persist custom items separately
  };

  // Reactive pantry matching — finds every recipe that CONTAINS the pantry items
  const pantryResult = useMemo((): PantryResult | null => {
    if (pantryItems.length === 0) return null;

    const pantryLower = pantryItems.map(p => p.toLowerCase().trim());
    const canMakeFully: string[] = [];
    const recipesUsing: { meal: string; matched: string[]; total: number }[] = [];

    // Build a list of allergen keyword arrays based on user's allergies
    const allergenKeywords: string[] = [];
    allergies.forEach(a => {
      const sub = ALLERGEN_SUBS[a];
      if (sub) allergenKeywords.push(...sub.match);
      else allergenKeywords.push(a);
    });

    Object.entries(PRELOADED_RECIPES as Record<string, any>).forEach(([key, recipe]) => {
      if (!recipe?.ingredients) return;
      const mealIngs: string[] = recipe.ingredients
        .map((i: any) => (i.name || '').toLowerCase().trim())
        .filter(Boolean);

      // Skip recipe if any ingredient contains an allergen
      if (allergenKeywords.length > 0) {
        const hasAllergen = mealIngs.some(ing =>
          allergenKeywords.some(kw => ing.includes(kw))
        );
        if (hasAllergen) return;
      }

      // Which pantry items appear in this recipe's ingredients?
      const matched = pantryLower.filter(p =>
        mealIngs.some(ing => ing.includes(p) || p.includes(ing))
      );
      if (matched.length === 0) return;

      const displayName = recipe.title || key;
      const allCovered = mealIngs.every(ing =>
        pantryLower.some(p => ing.includes(p) || p.includes(ing))
      );

      if (allCovered) {
        canMakeFully.push(displayName);
      } else {
        recipesUsing.push({ meal: displayName, matched, total: mealIngs.length });
      }
    });

    // Sort: most pantry items matched first
    recipesUsing.sort((a, b) => b.matched.length - a.matched.length);

    const hasProtein = pantryLower.some(p =>
      ['tofu', 'tempeh', 'lentils', 'chickpeas', 'beans', 'edamame', 'seitan'].includes(p));
    const hasGrains  = pantryLower.some(p =>
      ['rice', 'oats', 'quinoa', 'pasta', 'noodles', 'bread', 'buckwheat'].includes(p));
    const hasFat     = pantryLower.some(p =>
      ['avocado', 'olive oil', 'tahini', 'nuts', 'coconut milk', 'peanut butter', 'almond butter'].includes(p));

    const pantryTip =
      !hasProtein ? '💡 Add a plant protein (tofu, lentils, chickpeas, tempeh) to unlock many more recipes.' :
      !hasGrains  ? '💡 Add a whole grain (brown rice, quinoa, oats) for balanced, complete meals.' :
      !hasFat     ? '💡 Add a healthy fat source (tahini, avocado, olive oil) for better nutrient absorption.' :
      '🌟 Great pantry! Proteins, grains, and healthy fats — a solid plant-based foundation.';

    const searchQuery = pantryLower.slice(0, 3).join(' ');
    const onlineSuggestions = [
      { name: 'Minimalist Baker', url: `https://minimalistbaker.com/?s=${encodeURIComponent(searchQuery)}` },
      { name: 'Oh She Glows',     url: `https://ohsheglows.com/?s=${encodeURIComponent(searchQuery)}` },
      { name: 'Loving It Vegan',  url: `https://lovingitvegan.com/?s=${encodeURIComponent(searchQuery)}` },
    ];

    return {
      canMakeFully:  canMakeFully.slice(0, 10),
      recipesUsing:  recipesUsing.slice(0, 20),
      pantryTip,
      onlineSuggestions,
    };
  }, [pantryItems]);

  const addPantryItem = () => {
    const trimmed = pantryInput.trim().toLowerCase();
    if (!trimmed) return;
    if (!pantryItems.map(p => p.toLowerCase()).includes(trimmed)) {
      setPantryItems([...pantryItems, trimmed]);
    }
    setPantryInput('');
  };

  const removePantryItem = (item: string) => {
    setPantryItems(pantryItems.filter(p => p !== item));
  };

  const brandCategories = ['All', ...Object.keys(VEGAN_BRANDS as object)];
  const filteredBrands = useMemo(() => {
    const cats = brandCategory === 'All' ? Object.entries(VEGAN_BRANDS as object) : [[brandCategory, (VEGAN_BRANDS as any)[brandCategory]]];
    return cats.flatMap(([cat, brands]: [string, any[]]) =>
      brands
        .filter((b: any) => !brandSearch || b.name?.toLowerCase().includes(brandSearch.toLowerCase()) || b.description?.toLowerCase().includes(brandSearch.toLowerCase()))
        .map((b: any) => ({ ...b, cat }))
    );
  }, [brandCategory, brandSearch]);

  // Discover store links with search
  const VEGAN_STORES = [
    { name: 'Thrive Market',  url: 'https://thrivemarket.com/c/vegan', logo: '🛒', desc: 'Members-only vegan grocery delivery' },
    { name: 'Vegan Essentials', url: 'https://veganessentials.com', logo: '🌱', desc: 'Vegan specialty products since 1997' },
    { name: 'Whole Foods',    url: 'https://www.wholefoodsmarket.com/products/special-diet/vegan', logo: '🌿', desc: 'In-store & delivery, huge vegan section' },
    { name: 'Trader Joe\'s',  url: 'https://www.traderjoes.com/home/search?q=vegan&section=products&global=no', logo: '🛍️', desc: 'Affordable vegan staples & frozen meals' },
    { name: 'Sprouts',        url: 'https://www.sprouts.com/search/?q=vegan', logo: '🥦', desc: 'Natural & organic grocery with great vegan selection' },
    { name: 'Amazon Fresh',   url: 'https://www.amazon.com/s?k=vegan+food', logo: '📦', desc: 'Fast delivery of vegan pantry staples' },
  ];

  return (
    <div className="flex flex-col min-h-screen animate-in fade-in duration-500">
      <PageHero
        title="Shop"
        subtitle="List · Pantry · Brands · Discover"
        accent="✦"
        photos={[
          "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop&crop=center&q=90",
          "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300&h=300&fit=crop&crop=center&q=90",
          "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=300&h=300&fit=crop&crop=center&q=90",
        ]}
      />

      <Tabs defaultValue="list" className="flex-1 flex flex-col">
        <div className="px-5 border-b border-border sticky top-0 bg-background z-10">
          <TabsList className="w-full bg-transparent h-11 p-0 gap-6">
            {[['list','🛒 List'],['pantry','🧺 Pantry'],['brands','🏷️ Brands'],['discover','🌐 Discover']].map(([val, label]) => (
              <TabsTrigger key={val} value={val}
                className="relative h-11 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-[10px] font-bold uppercase tracking-widest text-muted-foreground data-[state=active]:text-primary px-0">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* SHOPPING LIST TAB */}
        <TabsContent value="list" className="flex-1 overflow-y-auto p-4 space-y-4 m-0 pb-24">
          {/* Store picker */}
          <div>
            <label className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest mb-2 block">Your Grocery Store</label>
            <div className="relative">
              <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'hsl(var(--border)) transparent' }}>
                {GROCERY_STORES.map(store => (
                  <button key={store.id} onClick={() => setGroceryStore(store.id)}
                    className={cn("shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold border transition-all",
                      groceryStore === store.id ? "bg-primary/10 border-primary/40 text-primary" : "bg-muted/20 border-border text-muted-foreground")}>
                    {store.emoji} {store.name}
                  </button>
                ))}
              </div>
              {/* Right-edge fade hint — indicates more stores are scrollable */}
              <div className="pointer-events-none absolute right-0 top-0 bottom-1 w-10 bg-gradient-to-l from-background to-transparent" />
            </div>
          </div>

          {/* Progress */}
          {allItems.length > 0 && (
            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-foreground">Shopping Progress</span>
                  <span className="text-primary font-bold">{checkedCount}/{allItems.length} items</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Custom item */}
          <div className="flex gap-2">
            <input value={customItem} onChange={e => setCustomItem(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addCustom()}
              placeholder="Add a custom item..."
              className="flex-1 bg-muted/20 border border-border/50 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" />
            <Button onClick={addCustom} size="sm" className="rounded-xl shrink-0 px-3">Add</Button>
          </div>

          {/* Sort toggle */}
          {allItems.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => setSortMode('department')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border text-[11px] font-bold transition-all",
                  sortMode === 'department'
                    ? "bg-primary/10 border-primary/40 text-primary"
                    : "bg-muted/20 border-border text-muted-foreground hover:border-primary/30"
                )}
              >
                <LayoutList className="w-3.5 h-3.5" />
                By Department
              </button>
              <button
                onClick={() => setSortMode('alpha')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border text-[11px] font-bold transition-all",
                  sortMode === 'alpha'
                    ? "bg-primary/10 border-primary/40 text-primary"
                    : "bg-muted/20 border-border text-muted-foreground hover:border-primary/30"
                )}
              >
                <ArrowDownAZ className="w-3.5 h-3.5" />
                Alphabetical
              </button>
            </div>
          )}

          {allItems.length === 0 ? (
            <div className="text-center py-14 space-y-3">
              <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground/30" />
              <p className="text-base font-serif text-muted-foreground">Your list is empty</p>
              <p className="text-xs text-muted-foreground/60">Plan your meals in the Plan tab to auto-generate a shopping list.</p>
            </div>
          ) : sortMode === 'alpha' ? (
            /* ── Alphabetical flat list ── */
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">
                All Items A–Z · {checkedCount}/{allItems.length}
              </p>
              {[...allItems].sort((a, b) => a.localeCompare(b)).map(item => {
                const harvest = canHarvestItem(item);
                const currentStore = GROCERY_STORES.find(s => s.id === groceryStore) || GROCERY_STORES[0];
                return (
                  <label key={item} className={cn(
                    "flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all",
                    harvest ? "border-emerald-300/60 bg-emerald-50/50 dark:bg-emerald-900/10" :
                    shoppingChecked[item] ? "bg-muted/20 border-border/30 opacity-50" : "bg-card border-border/50 hover:border-primary/30"
                  )}>
                    <div onClick={() => toggleChecked(item)}
                      className={cn("w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0",
                        shoppingChecked[item] ? "bg-primary border-primary" : harvest ? "border-emerald-400" : "border-border")}>
                      {shoppingChecked[item] && <span className="text-white text-[10px] font-black">✓</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={cn("text-sm capitalize block", shoppingChecked[item] ? "line-through text-muted-foreground" : "text-foreground font-medium")}>
                        {item}
                      </span>
                      {harvest && !shoppingChecked[item] && (
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">🌿 Harvest from garden</span>
                      )}
                    </div>
                    {!harvest && (
                      <a href={currentStore.url(item)} target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="text-muted-foreground/40 hover:text-primary transition-colors">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </label>
                );
              })}
            </div>
          ) : (
            /* ── By Department grouped list ── */
            AISLE_ORDER.filter(aisle => shoppingList[aisle]?.length > 0).map(aisle => {
              const items = shoppingList[aisle] || [];
              const checkedInAisle = items.filter(i => shoppingChecked[i]).length;
              const currentStore = GROCERY_STORES.find(s => s.id === groceryStore) || GROCERY_STORES[0];
              return (
                <div key={aisle} className="space-y-1.5">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {AISLE_LABELS[aisle]} · {checkedInAisle}/{items.length}
                    </h3>
                    <a href={currentStore.url(aisle.replace('_', ' '))} target="_blank" rel="noopener noreferrer"
                      className="text-[9px] font-bold text-primary flex items-center gap-0.5 hover:underline">
                      {currentStore.emoji} Shop <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                  {items.map(item => {
                    const harvest = canHarvestItem(item);
                    return (
                      <label key={item} className={cn(
                        "flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all",
                        harvest ? "border-emerald-300/60 bg-emerald-50/50 dark:bg-emerald-900/10" :
                        shoppingChecked[item] ? "bg-muted/20 border-border/30 opacity-50" : "bg-card border-border/50 hover:border-primary/30"
                      )}>
                        <div onClick={() => toggleChecked(item)}
                          className={cn("w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0",
                            shoppingChecked[item] ? "bg-primary border-primary" : harvest ? "border-emerald-400" : "border-border")}>
                          {shoppingChecked[item] && <span className="text-white text-[10px] font-black">✓</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={cn("text-sm capitalize block", shoppingChecked[item] ? "line-through text-muted-foreground" : "text-foreground font-medium")}>
                            {item}
                          </span>
                          {harvest && !shoppingChecked[item] && (
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                              🌿 Harvest from garden
                            </span>
                          )}
                        </div>
                        {!harvest && (
                          <a href={currentStore.url(item)} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="text-muted-foreground/40 hover:text-primary transition-colors">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </label>
                    );
                  })}
                </div>
              );
            })
          )}
        </TabsContent>

        {/* PANTRY MATCH TAB */}
        <TabsContent value="pantry" className="flex-1 overflow-y-auto p-4 space-y-4 m-0 pb-24">
          <div className="rounded-2xl overflow-hidden border border-border/50 shadow-sm">
            <div className="bg-gradient-to-r from-[#1e1008] to-[#2d1a0a] p-4">
              <h2 className="text-white font-serif text-xl font-bold">Pantry Match</h2>
              <p className="text-white/70 text-xs mt-1">Enter what you have — we'll find what you can make</p>
            </div>
            <div className="bg-card p-4 space-y-4">
              <div className="flex gap-2">
                <input
                  value={pantryInput}
                  onChange={e => setPantryInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addPantryItem()}
                  placeholder="e.g. chickpeas, spinach, lemon..."
                  className="flex-1 bg-muted/20 border border-border/50 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                />
                <Button onClick={addPantryItem} size="sm" className="rounded-xl shrink-0">Add</Button>
              </div>

              {pantryItems.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {pantryItems.map(item => (
                    <span key={item} className="flex items-center gap-1 px-2.5 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold">
                      {item}
                      <button onClick={() => removePantryItem(item)} className="hover:text-destructive"><X className="w-2.5 h-2.5" /></button>
                    </span>
                  ))}
                </div>
              )}

              {/* Quick-add common ingredients */}
              <div>
                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest mb-2">Quick Add Pantry Staples</p>
                <div className="flex flex-wrap gap-1.5">
                  {['chickpeas', 'lentils', 'spinach', 'tofu', 'oats', 'tomatoes', 'garlic', 'onion', 'rice', 'pasta', 'coconut milk', 'tahini'].map(item => {
                    const added = pantryItems.map(p => p.toLowerCase()).includes(item);
                    return (
                      <button key={item}
                        onClick={() => added ? removePantryItem(item) : setPantryItems([...pantryItems, item])}
                        className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all",
                          added ? "bg-primary/15 text-primary border-primary/40" : "bg-muted/20 text-muted-foreground border-border hover:border-primary/40")}>
                        {added ? '✓ ' : '+ '}{item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {pantryItems.length === 0 && (
                <p className="text-[11px] text-center text-muted-foreground/60 pb-1">
                  Add any ingredient above — matches update instantly ✨
                </p>
              )}
            </div>
          </div>

          <AnimatePresence>
            {pantryResult && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                {pantryResult.canMakeFully.length === 0 && pantryResult.recipesUsing.length === 0 && (
                  <div className="text-center py-8 space-y-2">
                    <p className="text-2xl">🔍</p>
                    <p className="text-sm font-bold text-foreground">No recipes found</p>
                    <p className="text-xs text-muted-foreground">None of the E.V.E. recipes use those ingredients — try something like chickpeas, tofu or lentils.</p>
                  </div>
                )}

                {pantryResult.canMakeFully.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-green-600 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      ✅ Can Make Right Now ({pantryResult.canMakeFully.length})
                    </h3>
                    {pantryResult.canMakeFully.map(meal => (
                      <div key={meal} className="flex items-center gap-3 p-3 bg-green-500/8 border border-green-500/20 rounded-xl mb-1.5">
                        <span className="text-lg">🍽️</span>
                        <p className="text-sm font-bold text-foreground">{meal}</p>
                      </div>
                    ))}
                  </div>
                )}

                {pantryResult.recipesUsing.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
                      🥘 Recipes Using Your Ingredients ({pantryResult.recipesUsing.length})
                    </h3>
                    {pantryResult.recipesUsing.map(({ meal, matched, total }) => (
                      <div key={meal} className="p-3 bg-primary/5 border border-primary/15 rounded-xl mb-1.5">
                        <p className="text-sm font-bold text-foreground">{meal}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary/50 rounded-full" style={{ width: `${(matched.length / total) * 100}%` }} />
                          </div>
                          <p className="text-[10px] text-primary font-bold shrink-0">
                            {matched.length}/{total} ingredients
                          </p>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          Uses: {matched.join(', ')}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {pantryResult.pantryTip && (
                  <div className="p-3 bg-primary/8 border border-primary/20 rounded-xl">
                    <p className="text-xs font-bold text-primary mb-1">💡 Pantry Tip</p>
                    <p className="text-xs text-muted-foreground">{pantryResult.pantryTip}</p>
                  </div>
                )}

                <div className="rounded-2xl overflow-hidden border border-border/40">
                  <div className="bg-gradient-to-r from-[#1e1008] to-[#2d1a0a] px-4 py-3">
                    <p className="text-white font-bold text-xs uppercase tracking-widest">🌐 Search Online Vegan Recipes</p>
                    <p className="text-white/70 text-[10px] mt-0.5">Find more ideas using your ingredients</p>
                  </div>
                  <div className="bg-card divide-y divide-border/30">
                    {pantryResult.onlineSuggestions.map(s => (
                      <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors">
                        <span className="text-sm font-semibold text-foreground">{s.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-primary" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>

        {/* BRANDS TAB */}
        <TabsContent value="brands" className="flex-1 overflow-y-auto p-4 space-y-4 m-0 pb-24">
          <div className="flex items-center gap-2 bg-muted/20 rounded-xl px-3 py-2 border border-border/50">
            <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <input value={brandSearch} onChange={e => setBrandSearch(e.target.value)}
              placeholder="Search brands..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {brandCategories.map(cat => (
              <button key={cat} onClick={() => setBrandCategory(cat)}
                className={cn("shrink-0 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all",
                  brandCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted/20 text-muted-foreground border border-border")}>
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            {filteredBrands.map((brand: any, i: number) => (
              <a key={`${brand.name}-${i}`} href={brand.website || '#'} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-card border border-border/50 rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center text-xl shrink-0">
                  {brand.emoji || '🌱'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold text-foreground">{brand.name}</p>
                    <span className="text-[8px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full uppercase tracking-wider">{brand.cat}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{brand.description}</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />
              </a>
            ))}
            {filteredBrands.length === 0 && (
              <div className="text-center py-10 text-muted-foreground text-sm">No brands found.</div>
            )}
          </div>
        </TabsContent>

        {/* DISCOVER TAB */}
        <TabsContent value="discover" className="flex-1 overflow-y-auto p-4 space-y-4 m-0 pb-24">
          <div>
            <h2 className="text-lg font-serif text-foreground mb-1">Vegan Stores</h2>
            <p className="text-xs text-muted-foreground">Shop directly from these vegan-friendly retailers</p>
          </div>
          <div className="flex items-center gap-2 bg-muted/20 rounded-xl px-3 py-2 border border-border/50">
            <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <input value={discoverSearch} onChange={e => setDiscoverSearch(e.target.value)}
              placeholder="Search for a product or store..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
          </div>
          {discoverSearch && (
            <div>
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Search Results</h3>
              <div className="flex flex-wrap gap-2">
                {GROCERY_STORES.map(store => (
                  <a key={store.id} href={store.url(discoverSearch)} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/20 rounded-xl text-xs font-bold text-primary hover:bg-primary/20 transition-colors">
                    {store.emoji} Search on {store.name} <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          )}
          <div className="space-y-3">
            {VEGAN_STORES.map(store => (
              <a key={store.name} href={store.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-card border border-border/50 rounded-2xl hover:border-primary/30 hover:shadow-md transition-all shadow-sm group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl shrink-0 group-hover:bg-primary/15 transition-colors">
                  {store.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-bold text-foreground">{store.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{store.desc}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0" />
              </a>
            ))}
          </div>

          {/* Top vegan products */}
          <div>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 px-1">🔥 Top Vegan Products</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'Beyond Burger', cat: 'Protein', emoji: '🍔', query: 'beyond burger' },
                { name: 'Oatly Oat Milk', cat: 'Dairy Alt', emoji: '🥛', query: 'oatly oat milk' },
                { name: 'Miyoko\'s Butter', cat: 'Dairy Alt', emoji: '🧈', query: "miyoko's butter" },
                { name: 'JUST Egg', cat: 'Protein', emoji: '🥚', query: 'just egg' },
                { name: 'Violife Cheese', cat: 'Dairy Alt', emoji: '🧀', query: 'violife cheese' },
                { name: 'Ripple Pea Milk', cat: 'Dairy Alt', emoji: '🥛', query: 'ripple pea milk' },
              ].map(prod => {
                const store = GROCERY_STORES.find(s => s.id === 'amazon') || GROCERY_STORES[0];
                return (
                  <a key={prod.name} href={store.url(prod.query)} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-card border border-border/50 rounded-xl hover:border-primary/30 transition-all shadow-sm">
                    <span className="text-xl">{prod.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-foreground truncate">{prod.name}</p>
                      <p className="text-[9px] text-muted-foreground">{prod.cat}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
