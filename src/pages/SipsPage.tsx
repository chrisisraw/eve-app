import { useEveStore } from "@/hooks/useEveStore";
import { PageHero } from "@/components/PageHero";
import { JUICE_RECIPES, SMOOTHIE_RECIPES } from "@/data/sips";
import { DAYS, SLOTS } from "@/data/meals";
import { getFoodPhoto } from "@/data/foodPhotos";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Droplets, Zap, Activity, Flame, Plus, CalendarDays, Info } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useSound } from "@/hooks/useSounds";
import { RecipeModal } from "@/components/RecipeModal";

export default function SipsPage() {
  const [activeTab, setActiveTab] = useState("juices");
  const { addXp, planMeal, logMeal } = useEveStore();
  const { play } = useSound();
  const [recipeModal, setRecipeModal] = useState<string | null>(null);

  const handleLog = (recipe: typeof JUICE_RECIPES[0], _type: 'juice' | 'smoothie') => {
    const today = new Date().toISOString().slice(0, 10);
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    logMeal(today, {
      name: recipe.name,
      cal: recipe.cal,
      protein: recipe.protein,
      carbs: recipe.carbs,
      fat: recipe.fat,
      fiber: 0,
      time,
    });
    addXp(20);
    play('water');
    toast.success(`${recipe.name} logged! +20 XP`);
  };

  const handleScheduleWeek = (type: 'juice' | 'smoothie', recipes: typeof JUICE_RECIPES) => {
    const today = new Date();
    const currentDay = today.toLocaleDateString('en-US', { weekday: 'long' });
    const slot = type === 'juice' ? 'Juice' : 'Smoothie';
    let count = 0;
    DAYS.forEach((day, i) => {
      const recipe = recipes[i % recipes.length];
      planMeal(day, slot, recipe.name);
      count++;
    });
    addXp(30);
    toast.success(`✓ Scheduled ${count} ${type === 'juice' ? 'juices' : 'smoothies'} for the week! +30 XP`);
  };

  return (
    <div className="flex flex-col min-h-screen animate-in fade-in duration-500">
      <PageHero
        title="Sips"
        subtitle="Cold press · Vitamix smoothies"
        accent="✿"
        photos={[
          "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=300&fit=crop&crop=center&q=90",
          "https://images.unsplash.com/photo-1553530666-0df6bd62ba78?w=300&h=300&fit=crop&crop=center&q=90",
          "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=300&h=300&fit=crop&crop=center&q=90",
        ]}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-5 border-b border-border sticky top-0 bg-background z-10">
          <TabsList className="w-full bg-transparent h-11 p-0 gap-6">
            <TabsTrigger
              value="juices"
              className="relative h-11 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs font-bold uppercase tracking-widest text-muted-foreground data-[state=active]:text-primary"
            >
              Cold Press Juices
            </TabsTrigger>
            <TabsTrigger
              value="smoothies"
              className="relative h-11 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs font-bold uppercase tracking-widest text-muted-foreground data-[state=active]:text-primary"
            >
              Vitamix Smoothies
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="juices" className="flex-1 p-4 space-y-4 m-0 pb-24 overflow-y-auto">
          <button
            onClick={() => handleScheduleWeek('juice', JUICE_RECIPES)}
            className="w-full flex items-center gap-2 justify-center py-2.5 rounded-xl bg-emerald-600/10 border border-emerald-600/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-600/20 transition-colors"
          >
            <CalendarDays className="w-3.5 h-3.5" />
            Schedule Juices for the Week
          </button>
          {JUICE_RECIPES.map(recipe => (
            <SipCard
              key={recipe.name}
              recipe={recipe}
              type="juice"
              onLog={() => handleLog(recipe, 'juice')}
              onSchedule={day => { planMeal(day, 'Juice', recipe.name); toast.success(`✓ ${recipe.name} scheduled for ${day}`); }}
              onViewRecipe={() => setRecipeModal(recipe.name)}
            />
          ))}
        </TabsContent>

        <TabsContent value="smoothies" className="flex-1 p-4 space-y-4 m-0 pb-24 overflow-y-auto">
          <button
            onClick={() => handleScheduleWeek('smoothie', SMOOTHIE_RECIPES)}
            className="w-full flex items-center gap-2 justify-center py-2.5 rounded-xl bg-purple-600/10 border border-purple-600/20 text-purple-700 dark:text-purple-400 text-xs font-bold hover:bg-purple-600/20 transition-colors"
          >
            <CalendarDays className="w-3.5 h-3.5" />
            Schedule Smoothies for the Week
          </button>
          {SMOOTHIE_RECIPES.map(recipe => (
            <SipCard
              key={recipe.name}
              recipe={recipe}
              type="smoothie"
              onLog={() => handleLog(recipe, 'smoothie')}
              onSchedule={day => { planMeal(day, 'Smoothie', recipe.name); toast.success(`✓ ${recipe.name} scheduled for ${day}`); }}
              onViewRecipe={() => setRecipeModal(recipe.name)}
            />
          ))}
        </TabsContent>
      </Tabs>

      <RecipeModal name={recipeModal} onClose={() => setRecipeModal(null)} />
    </div>
  );
}

// Photo lookup is handled by getFoodPhoto from foodPhotos.ts,
// which has a verified entry for every juice and smoothie recipe.

function SipCard({ recipe, type, onLog, onSchedule, onViewRecipe }: {
  recipe: typeof JUICE_RECIPES[0];
  type: 'juice' | 'smoothie';
  onLog: () => void;
  onSchedule: (day: string) => void;
  onViewRecipe: () => void;
}) {
  const isJuice = type === 'juice';
  const [showDayPicker, setShowDayPicker] = useState(false);
  const DAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const DAY_MAP: Record<string, string> = {
    Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday',
    Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday'
  };
  const photoUrl = getFoodPhoto(recipe.name);

  return (
    <Card className="overflow-hidden border-border/50 shadow-sm group">
        <div className="relative h-36 overflow-hidden">
        <img
          src={photoUrl}
          alt={recipe.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className={cn(
          "absolute inset-0",
          isJuice
            ? "bg-gradient-to-t from-emerald-900/75 via-emerald-800/30 to-transparent"
            : "bg-gradient-to-t from-purple-900/75 via-purple-800/25 to-transparent"
        )} />
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-xl font-serif font-bold text-white leading-tight drop-shadow-lg">{recipe.name}</h3>
          <p className="text-[10px] font-bold uppercase tracking-widest mt-0.5 text-white/80">{recipe.benefits}</p>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {recipe.ingredients.map((ing: string) => (
            <span key={ing} className="text-[9px] font-medium px-2 py-0.5 bg-muted rounded-full text-muted-foreground border border-border/50">
              {ing}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-2 pt-2 border-t border-border/50">
          <Stat label="CAL" value={recipe.cal} icon={Flame} color="text-orange-500" />
          <Stat label="PRO" value={recipe.protein} icon={Zap} color="text-blue-500" />
          <Stat label="CAR" value={recipe.carbs} icon={Activity} color="text-amber-600" />
          <Stat label="FAT" value={recipe.fat} icon={Droplets} color="text-yellow-600" />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onLog}
            className={cn(
              "flex-1 rounded-xl font-bold uppercase tracking-widest h-9 text-xs",
              isJuice ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"
            )}
          >
            <Plus className="w-3.5 h-3.5 mr-1" /> Log Sip
          </Button>
          <button
            onClick={onViewRecipe}
            className="px-3 rounded-xl border border-border text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors"
            title="View full recipe"
          >
            <Info className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowDayPicker(!showDayPicker)}
            className={cn(
              "px-3 rounded-xl border text-[9px] font-bold uppercase tracking-wider transition-colors",
              showDayPicker
                ? "bg-primary/10 border-primary/30 text-primary"
                : "border-border text-muted-foreground hover:border-primary/30"
            )}
            title="Schedule for a day"
          >
            <CalendarDays className="w-4 h-4" />
          </button>
        </div>

        {showDayPicker && (
          <div className="space-y-1.5 p-2 bg-muted/20 rounded-xl border border-border/50">
            <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground text-center">Schedule for:</p>
            <div className="flex gap-1 flex-wrap justify-center">
              {DAYS_SHORT.map(d => (
                <button
                  key={d}
                  onClick={() => { onSchedule(DAY_MAP[d]); setShowDayPicker(false); }}
                  className="px-2.5 py-1 rounded-lg bg-background border border-border text-[9px] font-bold text-foreground hover:bg-primary/10 hover:border-primary/40 transition-colors"
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Stat({ label, value, icon: Icon, color }: { label: string; value: number; icon: any; color: string }) {
  return (
    <div className="text-center space-y-1">
      <div className={cn("flex justify-center", color)}>
        <Icon className="w-3 h-3" />
      </div>
      <div className="text-sm font-bold text-foreground leading-none">{value}</div>
      <div className="text-[8px] font-black text-muted-foreground uppercase tracking-tighter">{label}</div>
    </div>
  );
}
