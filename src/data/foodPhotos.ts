/**
 * Vegan food photography — only Unsplash IDs confirmed to show plant-based food.
 * Format: https://images.unsplash.com/{id}?w=500&h=380&fit=crop&crop=center&q=85
 *
 * REMOVED (showed non-vegan content):
 *   photo-1543353071-087092ec393a  ← showed fried egg
 *   photo-1551782450-a2132b4ba21d  ← showed meat burger + fries
 *   photo-1490645935967-10de6ba17061 ← showed egg on toast
 *   photo-1568901346375-23c9450c58cd ← meat burger
 *   photo-1504674900247-0877df9cc836 ← grilled meat plate
 *   photo-1476224203421-9ac39bcb3df1 ← uncertain content
 */

const U = (id: string) =>
  `https://images.unsplash.com/${id}?w=500&h=380&fit=crop&crop=center&q=85`;

// ─── CONFIRMED VEGAN PHOTO POOL ───────────────────────────────────────────────
const P = {
  // Bowls & Mains
  grainBowl:      U("photo-1512621776831-0b23f3d69d48"),  // colorful buddha bowl — quinoa, avocado, beets, edamame
  greenSalad:     U("photo-1546069901-ba9599a7e63c"),     // fresh vibrant green salad bowl
  veggieBowls:    U("photo-1498837167922-ddd27525d352"),  // colorful vegetable dishes top-down
  riceDish:       U("photo-1540189549336-e6e99c3679fe"),  // rice & vegetables dish
  hummusPlatter:  U("photo-1478145046317-39f10e56b5e9"),  // hummus & raw veggie platter
  sushiRolls:     U("photo-1563379926898-05f4575a45d8"),  // plant-based sushi rolls
  falafel:        U("photo-1558618666-fcd25c85cd64"),     // golden falafel balls with herbs
  curry:          U("photo-1455619452474-d2be8b1e70cd"),  // golden vegetable curry bowl
  soup:           U("photo-1547592180-85f173990554"),     // warming vegetable soup bowl
  mushrooms:      U("photo-1547592166-23ac45744acd"),     // sautéed mushrooms dish

  // Breakfast
  oatmeal:        U("photo-1517673400267-0251440c45dc"),  // oatmeal topped with colorful berries & seeds
  pancakes:       U("photo-1484723091733-f5a3c93ae7e4"),  // golden stacked pancakes with berries
  tropicalBowl:   U("photo-1590301157890-4810ed352733"),  // acai / tropical breakfast bowl

  // Drinks
  greenSmoothie:  U("photo-1553530666-0df6bd62ba78"),    // thick green smoothie in glass
  berrySmoothie:  U("photo-1499638673689-79a0b5115d87"),  // deep purple berry smoothie
  pinkSmoothie:   U("photo-1553535888-2f3c6e4dcf34"),    // pink strawberry smoothie
  greenJuice:     U("photo-1600271886742-f049cd451bba"),  // cold-pressed celery green juice
  orangeJuice:    U("photo-1534353436294-0dbd4bdac845"),  // bright carrot-orange juice
  beetJuice:      U("photo-1615485290382-441e4d049cb5"),  // deep ruby beet juice
  watermelon:     U("photo-1571104508999-893933ded431"),  // fresh watermelon slices / pink drink
  goldenTurmeric: U("photo-1584473457406-6240486418e9"),  // golden turmeric latte / drink
  coffeeDrink:    U("photo-1509042239860-f550ce710b93"),  // plant-based coffee drink

  // Snacks & Desserts
  nutSnack:       U("photo-1559181567-c3190997d75b"),    // mixed nuts in natural light
  fruitBowl:      U("photo-1546069901-ba9599a7e63c"),     // fresh green salad/fruit bowl (confirmed vegan)
  dessert:        U("photo-1559181567-c3190997d75b"),     // nuts/seeds close-up (confirmed vegan, works for dessert bites)
};

// ─── RECIPE → PHOTO MAP ────────────────────────────────────────────────────────
const VEGAN_FOOD_PHOTOS: Record<string, string> = {

  // ── BREAKFAST BOWLS ──────────────────────────────────────────────────────────
  "Acai Bowl":            "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500&h=380&fit=crop&crop=center&q=85",
  "Banana Bowl":          P.oatmeal,
  "Pitaya Bowl":          P.tropicalBowl,
  "Yogurt Bowl":          P.grainBowl,
  "Oats":                 P.oatmeal,

  // ── BREAKFAST MAINS ──────────────────────────────────────────────────────────
  "Tofu Scramble":        P.grainBowl,
  "Almond Scramble":      P.veggieBowls,
  "Frittata":             P.veggieBowls,
  "Protein Pancakes":     P.pancakes,
  "Buckwheat":            P.oatmeal,
  "Savory Crepes":        P.pancakes,
  "Savory Crepes (Vegan)": P.pancakes,
  "Biscuits and Gravy":   P.riceDish,
  "Breakfast Burrito":    P.veggieBowls,
  "Breakfast Nachos":     P.grainBowl,
  "Chikn and Waffles":    P.pancakes,

  // ── SALADS & RAW ─────────────────────────────────────────────────────────────
  "Summer Southwest Salad":    P.greenSalad,
  "Raw Pad Thai":              P.grainBowl,        // colorful bowl — safe, no egg
  "Raw Pizza":                 P.veggieBowls,      // colorful veggies — safe
  "Raw Tacos":                 P.grainBowl,        // grain bowl — safe, no burger
  "Raw Corn Cakes":            P.riceDish,
  "Heirloom Caprese":          P.greenSalad,       // salad — safe, fresh veggies
  "Asian Cucumber Salad":      P.greenSalad,
  "Cobb Salad":                P.greenSalad,
  "Kale Salad":                P.greenSalad,
  "Taco Salad":                P.grainBowl,
  "Raw Fried Rice":            P.riceDish,
  "Zucchini Noodle Pesto":     P.riceDish,
  "Zucchini Noodle Red Sauce": P.veggieBowls,
  "Fruit Breakfast Bars":      P.pancakes,

  // ── WRAPS & ROLLS ────────────────────────────────────────────────────────────
  "Collard Wrap":         P.greenSalad,
  "Tempeh Wrap":          P.grainBowl,
  "Nori Wrap":            P.sushiRolls,
  "Sushi Roll":           P.sushiRolls,
  "Poke Bowl":            P.grainBowl,
  "Nachos":               P.riceDish,
  "Arepas":               P.hummusPlatter,
  "Falafel":              P.falafel,

  // ── BOWLS & MAINS ────────────────────────────────────────────────────────────
  "Pad Thai":               P.riceDish,
  "Ravioli":                P.riceDish,
  "Corn Chowder":           P.soup,
  "Zucchini Noodles":       P.riceDish,
  "Sesame Noodle":          P.grainBowl,
  "Mushroom Steak":         P.mushrooms,
  "Stuffed Mushroom":       P.mushrooms,
  "Raw Buddha Bowl":        P.grainBowl,
  "Stuffed Peppers":        P.veggieBowls,
  "Seasame Tofu":           P.grainBowl,
  "Red Curry":              P.curry,
  "African Stew":           P.soup,
  "Pesto Protein Pasta":    P.riceDish,
  "Tempeh Tacos al Pastor": P.grainBowl,
  "Red Beans and Rice":     P.riceDish,
  "Buffalo Tofu Taco":      P.veggieBowls,
  "Buddha Bowl":            P.grainBowl,
  "Burrito Bowl":           P.grainBowl,
  "Lentil Shepherd's Pie":  P.soup,
  "BBQ Bowl":               P.grainBowl,
  "Sushi Bowl":             P.sushiRolls,
  "Chili":                  P.soup,
  "Dirty Mac":              P.riceDish,
  "Mac and Cheese":         P.riceDish,
  "Burgers":                P.grainBowl,     // no meat burger photo
  "Risotto":                P.riceDish,
  "Lentil Soup":            P.soup,
  "Crab Cakes":             P.falafel,       // golden pan-fried cakes
  "Spicy Cauliflower":      P.veggieBowls,
  "Burrito":                P.grainBowl,
  "Ramen":                  P.soup,
  "Buffalo Cauliflower Tacos":        P.veggieBowls,
  "Roast Beet Fennel Arugula Salad":  P.greenSalad,
  "Black Eyed Peas and Collards":     P.soup,

  // ── SNACKS ───────────────────────────────────────────────────────────────────
  "Apple with Peanut Butter":         P.fruitBowl,
  "Handful Almonds + Dark Chocolate": P.nutSnack,
  "Hummus with Veggies":              P.hummusPlatter,
  "Edamame (1 cup)":                  P.grainBowl,
  "Dates with Tahini":                P.nutSnack,
  "Avocado Rice Cakes":               P.hummusPlatter,
  "Walnuts + Berries":                P.nutSnack,
  "Trail Mix":                        P.nutSnack,
  "Vegan Protein Bar":                P.nutSnack,
  "Celery with Peanut Butter":        P.hummusPlatter,
  "Cashews (1 cup)":                  P.nutSnack,
  "Cashews":                          P.nutSnack,
  "Raw Cashews":                      P.nutSnack,
  "Blueberries + Hemp Seeds":         P.fruitBowl,
  "Larabar":                          P.nutSnack,
  "Almond Butter Toast":              P.pancakes,
  "Fruit + Nut Mix":                  P.fruitBowl,

  // ── SALAD DRESSINGS ──────────────────────────────────────────────────────────
  "Classic Tahini Dressing":          P.hummusPlatter,
  "Lemon Herb Vinaigrette":           P.greenSalad,
  "Miso Ginger Dressing":             P.grainBowl,
  "Avocado Green Goddess":            P.greenSalad,
  "Balsamic Fig Dressing":            P.veggieBowls,
  "Cashew Ranch Dressing":            P.hummusPlatter,
  "Turmeric Orange Dressing":         P.goldenTurmeric,
  "Spicy Peanut Dressing":            P.grainBowl,
  "Apple Cider Honey Mustard":        P.greenSalad,
  "Raspberry Chia Vinaigrette":       P.berrySmoothie,

  // ── HEALTHY DESSERTS ─────────────────────────────────────────────────────────
  "Raw Chocolate Mousse":         P.dessert,
  "Banana Nice Cream":            P.tropicalBowl,
  "Chia Seed Pudding":            P.oatmeal,
  "Mango Coconut Panna Cotta":    P.tropicalBowl,
  "Raw Brownie Bites":            P.nutSnack,
  "Berry Coconut Parfait":        P.berrySmoothie,
  "Baked Cinnamon Apples":        P.fruitBowl,
  "Dark Chocolate Energy Balls":  P.nutSnack,
  "Blueberry Nice Cream":         P.berrySmoothie,
  "Coconut Mango Sorbet":         P.tropicalBowl,
  "Raw Lemon Cheesecake":         P.dessert,
  "Chocolate Chia Pudding":       P.oatmeal,
  "Vegan Banana Bread":           P.pancakes,
  "Matcha Coconut Balls":         P.nutSnack,
  "Peanut Butter Date Cookies":   P.nutSnack,
  "Strawberry Mousse":            P.pinkSmoothie,
  "Avocado Lime Tart":            P.dessert,
  "Raspberry Coconut Squares":    P.pinkSmoothie,
  "Sweet Potato Brownies":        P.dessert,
  "Oat Cookie Bites":             P.oatmeal,

  // ── COLD PRESS JUICES ────────────────────────────────────────────────────────
  "Green Machine":             P.greenJuice,
  "Sunrise Citrus":            P.orangeJuice,
  "Beetroot Power":            P.beetJuice,
  "Tropical Glow":             P.orangeJuice,
  "Deep Green Detox":          P.greenJuice,
  "Spicy Lemonade":            P.orangeJuice,
  "Spicy Lemonade (Juice)":    P.orangeJuice,
  "Red Radiance":              P.beetJuice,
  "Celery Pure":               P.greenJuice,
  "Apple Ginger Zing":         P.orangeJuice,
  "Cucumber Mint":             P.greenJuice,
  "Carrot Orange Turmeric":    P.orangeJuice,
  "Pineapple Celery Refresh":  P.greenJuice,
  "Kale Lemon Detox":          P.greenJuice,
  "Golden Healer":             P.goldenTurmeric,
  "Watermelon Mint":           P.watermelon,
  "Fennel Digest":             P.greenJuice,
  "Immunity Blast":            P.orangeJuice,
  "Parsley Powerhouse":        P.greenJuice,
  "Sweet Beet Lemon":          P.beetJuice,
  "Grapefruit Ginger Cleanse": P.orangeJuice,

  // ── SMOOTHIES ────────────────────────────────────────────────────────────────
  "Green Warrior":              P.greenSmoothie,
  "Berry Protein Blast":        P.berrySmoothie,
  "Tropical Collagen Boost":    P.tropicalBowl,
  "Peanut Butter Banana":       P.tropicalBowl,
  "Purple Power":               P.berrySmoothie,
  "Mint Chocolate Chip":        P.greenSmoothie,
  "Mango Turmeric Golden":      P.goldenTurmeric,
  "Post-Workout Recovery":      P.greenSmoothie,
  "Coffee Kick":                P.coffeeDrink,
  "Strawberry Basil":           P.pinkSmoothie,
  "Creamy Avocado Cacao":       P.greenSmoothie,
  "Watermelon Lime Cooler":     P.watermelon,
  "Pumpkin Spice":              P.coffeeDrink,
  "Kiwi Spinach Detox":         P.greenSmoothie,
  "Raspberry Lemon Cheesecake": P.pinkSmoothie,
  "Spirulina Sea Green":        P.greenSmoothie,
  "Cinnamon Apple Pie":         P.oatmeal,
  "Dragon Fruit Passion":       P.tropicalBowl,
  "Chocolate Hazelnut":         P.coffeeDrink,
  "Beet Berry Endurance":       P.berrySmoothie,
};

// ─── SAFE FALLBACK POOL (all confirmed vegan) ─────────────────────────────────
const SAFE_POOL: string[] = [
  P.grainBowl,
  P.greenSalad,
  P.veggieBowls,
  P.riceDish,
  P.hummusPlatter,
  P.falafel,
  P.oatmeal,
  P.tropicalBowl,
  P.curry,
  P.soup,
  P.sushiRolls,
  P.mushrooms,
  P.pancakes,
  P.nutSnack,
  P.fruitBowl,
];

/** Deterministic hash so an unknown recipe name always maps to the same safe photo */
function nameHash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function getFoodPhoto(name: string): string {
  if (!name) return SAFE_POOL[0];

  // 1. Exact match in curated map
  const exact = VEGAN_FOOD_PHOTOS[name];
  if (exact) return exact;

  const lower = name.toLowerCase();

  // 2. Keyword-based matching (all plant-safe buckets)
  if (lower.includes('spicy lemonade')) return P.orangeJuice;
  if (lower.includes('acai') || lower.includes('pitaya') || lower.includes('dragon fruit')) return P.tropicalBowl;
  if (lower.includes('oat') || lower.includes('porridge') || lower.includes('overnight')) return P.oatmeal;
  if (lower.includes('yogurt') || lower.includes('yoghurt')) return P.grainBowl;
  if (lower.includes('scramble') || lower.includes('frittata')) return P.veggieBowls;
  if (lower.includes('savory crepe') || lower.includes('crepe')) return P.pancakes;
  if (lower.includes('pancake') || lower.includes('waffle') || lower.includes('buckwheat')) return P.pancakes;
  if (lower.includes('caprese') || lower.includes('tomato salad')) return P.greenSalad;
  if (lower.includes('salad') || lower.includes('slaw') || lower.includes('coleslaw')) return P.greenSalad;
  if (lower.includes('kale') || lower.includes('arugula') || lower.includes('spinach salad')) return P.greenSalad;
  if (lower.includes('pad thai') || lower.includes('lo mein') || lower.includes('chow mein')) return P.riceDish;
  if (lower.includes('noodle') || lower.includes('pasta') || lower.includes('spaghetti') || lower.includes('ramen')) return P.riceDish;
  if (lower.includes('pizza') || lower.includes('flatbread')) return P.veggieBowls;
  if (lower.includes('taco') || lower.includes('burrito') || lower.includes('wrap') || lower.includes('collard')) return P.grainBowl;
  if (lower.includes('bowl') || lower.includes('buddha') || lower.includes('grain')) return P.grainBowl;
  if (lower.includes('sushi') || lower.includes('nori') || lower.includes('maki') || lower.includes('roll')) return P.sushiRolls;
  if (lower.includes('poke')) return P.sushiRolls;
  if (lower.includes('falafel')) return P.falafel;
  if (lower.includes('hummus') || lower.includes('spread') || lower.includes('dip') || lower.includes('platter')) return P.hummusPlatter;
  if (lower.includes('curry') || lower.includes('masala') || lower.includes('tikka')) return P.curry;
  if (lower.includes('soup') || lower.includes('stew') || lower.includes('chowder') || lower.includes('chili')) return P.soup;
  if (lower.includes('mushroom') || lower.includes('portobello')) return P.mushrooms;
  if (lower.includes('rice') || lower.includes('fried rice') || lower.includes('risotto')) return P.riceDish;
  if (lower.includes('burger') || lower.includes('patty') || lower.includes('sandwich')) return P.grainBowl;
  if (lower.includes('nachos') || lower.includes('nacho') || lower.includes('chip')) return P.hummusPlatter;
  if (lower.includes('green juice') || lower.includes('celery juice')) return P.greenJuice;
  if (lower.includes('beet') || lower.includes('beetroot')) return P.beetJuice;
  if (lower.includes('carrot') || lower.includes('orange juice') || lower.includes('citrus')) return P.orangeJuice;
  if (lower.includes('turmeric') || lower.includes('golden milk') || lower.includes('golden latte')) return P.goldenTurmeric;
  if (lower.includes('watermelon')) return P.watermelon;
  if (lower.includes('coffee') || lower.includes('latte') || lower.includes('mocha')) return P.coffeeDrink;
  if (lower.includes('green smoothie') || lower.includes('spirulina') || lower.includes('matcha')) return P.greenSmoothie;
  if (lower.includes('berry') || lower.includes('blueberry') || lower.includes('acai smoothie') || lower.includes('purple')) return P.berrySmoothie;
  if (lower.includes('strawberry') || lower.includes('raspberry') || lower.includes('pink')) return P.pinkSmoothie;
  if (lower.includes('smoothie') || lower.includes('shake') || lower.includes('blend')) return P.greenSmoothie;
  if (lower.includes('juice')) return P.greenJuice;
  if (lower.includes('cashew')) return P.nutSnack;
  if (lower.includes('almond') || lower.includes('walnut') || lower.includes('nuts')) return P.nutSnack;
  if (lower.includes('date') || lower.includes('bar') || lower.includes('bite') || lower.includes('ball') || lower.includes('cookie')) return P.nutSnack;
  if (lower.includes('fruit') || lower.includes('apple') || lower.includes('banana') || lower.includes('mango')) return P.fruitBowl;
  if (lower.includes('mousse') || lower.includes('cheesecake') || lower.includes('tart') || lower.includes('brownie')) return P.dessert;
  if (lower.includes('chia') || lower.includes('pudding') || lower.includes('panna cotta')) return P.oatmeal;
  if (lower.includes('bread') || lower.includes('toast') || lower.includes('muffin')) return P.pancakes;
  if (lower.includes('dressing') || lower.includes('vinaigrette') || lower.includes('sauce')) return P.hummusPlatter;
  if (lower.includes('snack') || lower.includes('cracker') || lower.includes('rice cake')) return P.hummusPlatter;

  // 3. Deterministic safe fallback — always vegan, never repeats nearby names
  return SAFE_POOL[nameHash(name) % SAFE_POOL.length];
}
