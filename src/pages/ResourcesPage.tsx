import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Search, BookOpen, Heart, Leaf, Youtube, Globe, ChefHat } from "lucide-react";
import { cn } from "@/lib/utils";

const RESOURCES = {
  "📖 Getting Started": [
    { title: "Vegan Society — How to Go Vegan", url: "https://www.vegansociety.com/go-vegan/how-go-vegan", desc: "Step-by-step guide for transitioning to a vegan lifestyle", type: "guide" },
    { title: "Forks Over Knives — Plant-Based Beginner Guide", url: "https://www.forksoverknives.com/how-tos/plant-based-primer-beginners-guide-starting-plant-based-diet/", desc: "Comprehensive beginner guide to whole-food plant-based eating", type: "guide" },
    { title: "NutritionFacts.org", url: "https://nutritionfacts.org", desc: "Science-based nutrition research by Dr. Michael Greger", type: "science" },
    { title: "Physicians Committee — Plant-Based Diets", url: "https://www.pcrm.org/good-nutrition/plant-based-diets", desc: "Medical guidance on plant-based nutrition from doctors", type: "science" },
  ],
  "🍳 Recipe Websites": [
    { title: "Minimalist Baker", url: "https://minimalistbaker.com", desc: "Simple vegan recipes — 10 ingredients, 1 bowl, or 30 minutes", type: "recipes" },
    { title: "Oh She Glows", url: "https://ohsheglows.com", desc: "Award-winning plant-based recipes by Angela Liddon", type: "recipes" },
    { title: "The Full Helping", url: "https://www.thefullhelping.com", desc: "Nourishing, whole-food vegan cooking", type: "recipes" },
    { title: "Isa Chandra Moskowitz", url: "https://www.isachandra.com", desc: "Post Punk Kitchen — bold, delicious vegan cooking", type: "recipes" },
    { title: "Lazy Cat Kitchen", url: "https://www.lazycatkitchen.com", desc: "Globally-inspired vegan comfort food", type: "recipes" },
    { title: "BOSH!", url: "https://www.bosh.tv", desc: "Plant-based recipes with a fun twist", type: "recipes" },
  ],
  "💊 Nutrition & Supplements": [
    { title: "Vegan Health — Supplement Guide", url: "https://veganhealth.org/supplement-guide/", desc: "Evidence-based supplement recommendations for vegans (B12, D3, omega-3, etc.)", type: "science" },
    { title: "Examine.com — Vegan Supplements", url: "https://examine.com/topics/vegan-diet/", desc: "Research summaries on key nutrients for plant-based athletes", type: "science" },
    { title: "B12 — Critical Nutrient for Vegans", url: "https://www.vegansociety.com/resources/nutrition-and-health/nutrients/vitamin-b12", desc: "Why every vegan needs B12 supplementation and how to do it right", type: "guide" },
    { title: "Iron on a Vegan Diet", url: "https://nutritionfacts.org/topics/iron/", desc: "Maximizing iron absorption from plant-based sources", type: "science" },
  ],
  "🏋️ Vegan Athletes": [
    { title: "No Meat Athlete", url: "https://www.nomeatathlete.com", desc: "Plant-based nutrition for runners and endurance athletes", type: "fitness" },
    { title: "Vegan Bodybuilding", url: "https://www.veganbodybuilding.com", desc: "Muscle building on a plant-based diet — training & nutrition guides", type: "fitness" },
    { title: "Game Changers Documentary", url: "https://gamechangersmovie.com", desc: "Elite athletes share the power of plant-based performance", type: "media" },
    { title: "Plant-Based Performance Podcast", url: "https://plantbasedperformance.com", desc: "Interviews with vegan athletes, coaches, and nutritionists", type: "media" },
  ],
  "🌍 Environment & Ethics": [
    { title: "Our World in Data — Meat & the Environment", url: "https://ourworldindata.org/environmental-impacts-of-food", desc: "Data-driven look at the environmental impact of food choices", type: "science" },
    { title: "Cowspiracy Documentary", url: "https://www.cowspiracy.com", desc: "The sustainability secret — documentary on animal agriculture", type: "media" },
    { title: "Earthling Ed — YouTube", url: "https://youtube.com/earthlinged", desc: "Compassionate, fact-based discussions on veganism", type: "media" },
    { title: "Happy Cow Restaurant Finder", url: "https://www.happycow.net", desc: "Find vegan & vegan-friendly restaurants anywhere in the world", type: "tool" },
  ],
  "📱 Apps & Tools": [
    { title: "Cronometer", url: "https://cronometer.com", desc: "Detailed micronutrient tracking — ideal for vegans monitoring B12, zinc, iron", type: "tool" },
    { title: "Happy Cow", url: "https://www.happycow.net/apps", desc: "Find vegan restaurants near you worldwide", type: "tool" },
    { title: "VNutrition", url: "https://vnutrition.app", desc: "Vegan-specific nutrition app with plant-based food database", type: "tool" },
    { title: "Is It Vegan? Barcode Scanner", url: "https://www.isitveganapp.com", desc: "Scan barcodes to instantly check if products are vegan", type: "tool" },
  ],
  "🎥 YouTube Channels": [
    { title: "Dr. Neal Barnard — PCRM", url: "https://youtube.com/@PCRM", desc: "Medical doctor explains benefits of plant-based diets", type: "media" },
    { title: "Plant-Based News", url: "https://youtube.com/@PlantBasedNews", desc: "Latest vegan news, recipes, and lifestyle content", type: "media" },
    { title: "Simnett Nutrition", url: "https://youtube.com/@SimnettNutrition", desc: "Vegan nutrition deep dives with Derek Simnett", type: "media" },
    { title: "Mic the Vegan", url: "https://youtube.com/@micthevegan", desc: "Evidence-based vegan nutrition science explained simply", type: "media" },
    { title: "Cheap Lazy Vegan", url: "https://youtube.com/@CheapLazyVegan", desc: "Affordable, easy vegan meal prep and recipes", type: "media" },
  ],
};

const TYPE_CONFIG: Record<string, { color: string; label: string }> = {
  guide:   { color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",   label: "Guide" },
  science: { color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400", label: "Science" },
  recipes: { color: "bg-primary/10 text-primary",  label: "Recipes" },
  fitness: { color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400", label: "Fitness" },
  media:   { color: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",   label: "Media" },
  tool:    { color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", label: "Tool" },
};

export default function ResourcesPage() {
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('All');

  const allTypes = ['All', 'guide', 'science', 'recipes', 'fitness', 'media', 'tool'];

  const filteredResources = Object.entries(RESOURCES).reduce((acc, [cat, items]) => {
    const filtered = items.filter(item => {
      const matchesSearch = !search ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.desc.toLowerCase().includes(search.toLowerCase());
      const matchesType = activeType === 'All' || item.type === activeType;
      return matchesSearch && matchesType;
    });
    if (filtered.length > 0) acc[cat] = filtered;
    return acc;
  }, {} as Record<string, typeof RESOURCES[keyof typeof RESOURCES]>);

  const totalCount = Object.values(RESOURCES).flat().length;

  return (
    <div className="flex flex-col min-h-screen animate-in fade-in duration-500 pb-24">
      <PageHero
        title="Resources"
        subtitle={`${totalCount}+ curated vegan resources`}
        accent="◈"
        photos={[
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=300&fit=crop&crop=center&q=90",
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=300&fit=crop&crop=center&q=90",
          "https://images.unsplash.com/photo-1512621776831-0b23f3d69d48?w=300&h=300&fit=crop&crop=center&q=90",
        ]}
      />

      <div className="px-4 space-y-3 sticky top-0 bg-background pb-3 z-10 border-b border-border/50">
        <div className="flex items-center gap-2 bg-muted/20 rounded-xl px-3 py-2 border border-border/50">
          <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search recipes, nutrition, tools..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          {search && <button onClick={() => setSearch('')} className="text-muted-foreground hover:text-foreground"><span className="text-sm">×</span></button>}
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {allTypes.map(type => (
            <button key={type} onClick={() => setActiveType(type)}
              className={cn("shrink-0 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all",
                activeType === type ? "bg-primary text-primary-foreground shadow-md" : "bg-muted/20 text-muted-foreground border border-border/50 hover:border-primary/30")}>
              {type === 'All' ? '✦ All' : TYPE_CONFIG[type]?.label || type}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-6 overflow-y-auto">
        {Object.keys(filteredResources).length === 0 && (
          <div className="text-center py-14 text-muted-foreground">
            <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No resources found for "{search}"</p>
          </div>
        )}
        {Object.entries(filteredResources).map(([cat, items]) => (
          <section key={cat} className="space-y-2.5">
            <h2 className="text-base font-serif font-bold text-foreground px-1">{cat}</h2>
            {items.map(item => (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3.5 bg-card border border-border/50 rounded-2xl hover:border-primary/30 hover:shadow-md transition-all shadow-sm group block"
              >
                <div className="w-9 h-9 rounded-xl bg-muted/30 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors mt-0.5">
                  {item.type === 'recipes' ? <ChefHat className="w-4 h-4 text-primary" /> :
                   item.type === 'science' ? <BookOpen className="w-4 h-4 text-purple-500" /> :
                   item.type === 'fitness' ? <Heart className="w-4 h-4 text-orange-500" /> :
                   item.type === 'media' ? <Youtube className="w-4 h-4 text-pink-500" /> :
                   item.type === 'tool' ? <Globe className="w-4 h-4 text-emerald-500" /> :
                   <Leaf className="w-4 h-4 text-blue-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{item.title}</p>
                    <ExternalLink className="w-3 h-3 text-muted-foreground/40 shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                  <span className={cn("inline-block mt-1.5 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest", TYPE_CONFIG[item.type]?.color || 'bg-muted text-muted-foreground')}>
                    {TYPE_CONFIG[item.type]?.label || item.type}
                  </span>
                </div>
              </a>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
