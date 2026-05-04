export interface SipRecipe {
  name: string;
  ingredients: string[];
  benefits: string;
  cal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export const JUICE_RECIPES: SipRecipe[] = [
  { name: "Green Machine", ingredients: ["4 stalks celery", "1 cucumber", "2 cups spinach", "1 green apple", "1 lemon", "1 inch ginger"], benefits: "Alkalising | anti-inflammatory | rich in chlorophyll", cal: 95, protein: 3, carbs: 22, fat: 0 },
  { name: "Sunrise Citrus", ingredients: ["4 carrots", "3 oranges", "1 lemon", "1 inch turmeric", "pinch black pepper"], benefits: "Vitamin C boost | immune support | anti-inflammatory", cal: 130, protein: 2, carbs: 31, fat: 0 },
  { name: "Beetroot Power", ingredients: ["2 medium beets", "3 carrots", "1 apple", "1 lemon", "1 inch ginger"], benefits: "Nitric oxide | endurance | liver cleanse", cal: 140, protein: 3, carbs: 33, fat: 0 },
  { name: "Tropical Glow", ingredients: ["1 cup pineapple chunks", "3 carrots", "1 orange", "1 inch ginger", "1/2 lemon"], benefits: "Bromelain | digestion | skin glow", cal: 120, protein: 2, carbs: 29, fat: 0 },
  { name: "Deep Green Detox", ingredients: ["1 head romaine", "4 stalks celery", "1 cucumber", "2 green apples", "1/2 lemon", "1 inch ginger"], benefits: "Deep detox | alkalising | hydrating", cal: 105, protein: 3, carbs: 24, fat: 0 },
  { name: "Spicy Lemonade", ingredients: ["6 lemons", "1 inch ginger", "1 inch turmeric", "2 apples", "1 cup water", "pinch cayenne"], benefits: "Metabolism boost | vitamin C | liver support", cal: 90, protein: 1, carbs: 21, fat: 0 },
  { name: "Red Radiance", ingredients: ["2 beets", "1 cup watermelon", "2 carrots", "1 lemon", "handful mint"], benefits: "Antioxidants | anti-inflammatory | hydration", cal: 110, protein: 2, carbs: 26, fat: 0 },
  { name: "Celery Pure", ingredients: ["1 full bunch celery", "1/2 lemon", "1 inch ginger"], benefits: "Gut healing | sodium balance | anti-bloat", cal: 50, protein: 2, carbs: 10, fat: 0 },
  { name: "Apple Ginger Zing", ingredients: ["4 green apples", "2 inch ginger", "1 lemon", "2 stalks celery"], benefits: "Digestive fire | immune boost | refreshing", cal: 115, protein: 1, carbs: 28, fat: 0 },
  { name: "Cucumber Mint", ingredients: ["2 cucumbers", "handful fresh mint", "2 green apples", "1 lime", "3 stalks celery"], benefits: "Cooling | hydrating | breath freshening", cal: 85, protein: 2, carbs: 20, fat: 0 },
  { name: "Carrot Orange Turmeric", ingredients: ["5 carrots", "2 oranges", "1 inch turmeric", "1/2 lemon", "pinch black pepper"], benefits: "Beta-carotene | eye health | anti-inflammatory", cal: 125, protein: 2, carbs: 30, fat: 0 },
  { name: "Pineapple Celery Refresh", ingredients: ["1 cup pineapple", "6 stalks celery", "1 cucumber", "1 lime", "handful parsley"], benefits: "Enzyme rich | digestion | kidney support", cal: 95, protein: 2, carbs: 22, fat: 0 },
  { name: "Kale Lemon Detox", ingredients: ["4 kale leaves", "1 cucumber", "2 green apples", "1 lemon", "1 inch ginger", "2 stalks celery"], benefits: "Liver detox | iron | folate", cal: 100, protein: 4, carbs: 22, fat: 0 },
  { name: "Golden Healer", ingredients: ["4 carrots", "2 oranges", "1 inch turmeric", "1 inch ginger", "1 lemon", "1 apple"], benefits: "Anti-inflammatory | immune | joint support", cal: 135, protein: 2, carbs: 32, fat: 0 },
  { name: "Watermelon Mint", ingredients: ["3 cups watermelon", "handful mint", "1 lime", "1 cucumber"], benefits: "Lycopene | hydration | muscle recovery", cal: 80, protein: 1, carbs: 19, fat: 0 },
  { name: "Fennel Digest", ingredients: ["1 fennel bulb", "3 apples", "1 lemon", "1 inch ginger", "3 stalks celery"], benefits: "Bloat relief | digestion | anti-spasm", cal: 110, protein: 2, carbs: 26, fat: 0 },
  { name: "Immunity Blast", ingredients: ["4 oranges", "2 grapefruits", "1 lemon", "1 inch ginger", "1 inch turmeric"], benefits: "Vitamin C overload | antiviral | antioxidant", cal: 145, protein: 2, carbs: 34, fat: 0 },
  { name: "Parsley Powerhouse", ingredients: ["large bunch parsley", "4 stalks celery", "2 green apples", "1 lemon", "1 cucumber"], benefits: "Iron | vitamin K | kidney cleanse", cal: 90, protein: 3, carbs: 20, fat: 0 },
  { name: "Sweet Beet Lemon", ingredients: ["2 beets", "2 lemons", "3 carrots", "2 apples", "1 inch ginger"], benefits: "Athletic recovery | blood pressure | iron", cal: 130, protein: 3, carbs: 31, fat: 0 },
  { name: "Grapefruit Ginger Cleanse", ingredients: ["2 grapefruits", "3 carrots", "1 inch ginger", "1 lemon", "2 stalks celery"], benefits: "Fat metabolism | liver flush | digestive enzymes", cal: 105, protein: 2, carbs: 24, fat: 0 },
];

export const SMOOTHIE_RECIPES: SipRecipe[] = [
  { name: "Green Warrior", ingredients: ["2 cups spinach", "1 banana", "1 cup mango", "1 cup coconut water", "1 tbsp hemp seeds", "1 tsp spirulina"], benefits: "Plant protein | iron | sustained energy", cal: 280, protein: 9, carbs: 52, fat: 5 },
  { name: "Berry Protein Blast", ingredients: ["1 cup mixed berries", "1 scoop vegan protein powder", "1 cup oat milk", "1 banana", "1 tbsp almond butter", "1 tsp maca"], benefits: "High protein | antioxidants | muscle recovery", cal: 380, protein: 28, carbs: 42, fat: 10 },
  { name: "Tropical Collagen Boost", ingredients: ["1 cup pineapple", "1 mango", "1 cup coconut milk", "1 tbsp chia seeds", "1 tsp turmeric", "handful spinach"], benefits: "Vitamin C | anti-inflammatory | skin health", cal: 310, protein: 6, carbs: 58, fat: 9 },
  { name: "Peanut Butter Banana", ingredients: ["2 bananas", "2 tbsp peanut butter", "1 cup oat milk", "1 tsp cacao", "1 date", "handful oats"], benefits: "Sustained energy | potassium | pre-workout", cal: 420, protein: 14, carbs: 65, fat: 14 },
  { name: "Purple Power", ingredients: ["1 cup blueberries", "1 cup blackberries", "1 cup acai", "1 banana", "1 cup almond milk", "1 tbsp flax seeds"], benefits: "Antioxidants | brain health | omega-3", cal: 320, protein: 7, carbs: 60, fat: 8 },
  { name: "Mint Chocolate Chip", ingredients: ["2 cups spinach", "1 banana", "1 cup oat milk", "2 tbsp cacao nibs", "handful fresh mint", "1 tbsp almond butter", "4 ice cubes"], benefits: "Iron | magnesium | mood boost", cal: 340, protein: 10, carbs: 48, fat: 12 },
  { name: "Mango Turmeric Golden", ingredients: ["11/2 cups mango", "1 cup coconut milk", "1 inch ginger", "1 tsp turmeric", "1 tbsp hemp seeds", "1 tsp black pepper", "1 orange"], benefits: "Anti-inflammatory | vitamin C | immune", cal: 295, protein: 7, carbs: 50, fat: 9 },
  { name: "Post-Workout Recovery", ingredients: ["1 scoop vegan protein", "1 banana", "1 cup tart cherry juice", "1 cup oat milk", "1 tbsp chia seeds", "1 tsp cinnamon"], benefits: "Muscle repair | anti-inflammatory | glycogen reload", cal: 410, protein: 30, carbs: 58, fat: 6 },
  { name: "Coffee Kick", ingredients: ["1 cup cold brew", "1 banana", "2 dates", "1 cup oat milk", "1 tbsp almond butter", "1 tsp maca", "4 ice cubes"], benefits: "Natural caffeine | sustained energy | pre-workout", cal: 350, protein: 8, carbs: 55, fat: 10 },
  { name: "Strawberry Basil", ingredients: ["2 cups strawberries", "handful fresh basil", "1 banana", "1 cup coconut water", "1 tbsp hemp seeds", "squeeze lemon"], benefits: "Vitamin C | anti-inflammatory | gut health", cal: 240, protein: 7, carbs: 45, fat: 4 },
  { name: "Creamy Avocado Cacao", ingredients: ["1/2 avocado", "2 tbsp cacao powder", "1 banana", "1 cup oat milk", "2 dates", "1 tbsp hemp seeds"], benefits: "Healthy fats | magnesium | heart health", cal: 450, protein: 10, carbs: 55, fat: 22 },
  { name: "Watermelon Lime Cooler", ingredients: ["3 cups watermelon", "1 lime (juice)", "1 cup coconut water", "handful mint", "1 tsp spirulina", "4 ice cubes"], benefits: "Lycopene | electrolytes | cooling", cal: 180, protein: 4, carbs: 38, fat: 1 },
  { name: "Pumpkin Spice", ingredients: ["1/2 cup pumpkin purée", "1 banana", "1 cup oat milk", "1 tsp cinnamon", "1/2 tsp nutmeg", "2 dates", "1 tbsp almond butter"], benefits: "Beta-carotene | fiber | immune support", cal: 360, protein: 8, carbs: 62, fat: 10 },
  { name: "Kiwi Spinach Detox", ingredients: ["3 kiwis", "2 cups spinach", "1 banana", "1 cup coconut water", "1 tbsp flax seeds", "squeeze lemon"], benefits: "Vitamin K | digestion | detox", cal: 255, protein: 6, carbs: 52, fat: 4 },
  { name: "Raspberry Lemon Cheesecake", ingredients: ["11/2 cups raspberries", "1/2 cup cashews (soaked)", "1 lemon juice+zest", "1 cup oat milk", "2 dates", "1 tsp vanilla"], benefits: "Antioxidants | healthy fats | gut support", cal: 390, protein: 9, carbs: 50, fat: 18 },
  { name: "Spirulina Sea Green", ingredients: ["1 tsp spirulina", "1 banana", "1 cup mango", "1 cup coconut water", "1 tbsp hemp seeds", "1 cup spinach"], benefits: "Complete protein | B12 | iron | detox", cal: 290, protein: 12, carbs: 50, fat: 5 },
  { name: "Cinnamon Apple Pie", ingredients: ["11/2 cups apple", "1 banana", "1 cup oat milk", "1 tsp cinnamon", "1 tbsp almond butter", "2 dates", "handful oats"], benefits: "Fiber | blood sugar balance | comforting", cal: 380, protein: 9, carbs: 65, fat: 10 },
  { name: "Dragon Fruit Passion", ingredients: ["1 dragon fruit", "1 mango", "1 passion fruit", "1 cup coconut milk", "1 banana", "1 tbsp chia seeds"], benefits: "Antioxidants | prebiotic fiber | vitamin C", cal: 340, protein: 6, carbs: 62, fat: 10 },
  { name: "Chocolate Hazelnut", ingredients: ["2 tbsp cacao", "2 tbsp hazelnut butter", "1 banana", "1 cup oat milk", "2 dates", "1 tbsp hemp seeds", "4 ice cubes"], benefits: "Magnesium | healthy fats | mood boost", cal: 460, protein: 11, carbs: 60, fat: 20 },
  { name: "Beet Berry Endurance", ingredients: ["1 small beet (cooked)", "1 cup berries", "1 banana", "1 cup tart cherry juice", "1 scoop vegan protein", "1 tbsp flax seeds"], benefits: "Nitric oxide | endurance | muscle recovery", cal: 390, protein: 25, carbs: 58, fat: 6 },
];
