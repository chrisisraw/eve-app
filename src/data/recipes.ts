export const PRELOADED_RECIPES = {
  "Acai Bowl": {
    "title": "Acai Bowl",
    "prepTime": "10 min",
    "cookTime": "0 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["quick", "raw", "high-fiber"],
    "ingredients": [
      { "name": "frozen acai packets", "amount": "2", "unit": "whole" },
      { "name": "banana", "amount": "1", "unit": "whole" },
      { "name": "oat milk", "amount": "1/2", "unit": "cups" },
      { "name": "blueberries", "amount": "1/2", "unit": "cups" },
      { "name": "granola", "amount": "1/4", "unit": "cups" },
      { "name": "hemp seeds", "amount": "2", "unit": "tbsp" },
      { "name": "maple syrup", "amount": "1", "unit": "tbsp" }
    ],
    "steps": [
      "Blend frozen acai, banana and oat milk until thick and smooth.",
      "Pour into bowls and top with blueberries, granola, hemp seeds and a drizzle of maple syrup."
    ],
    // acai 2 packs (180), banana (105), oat milk ½c (60), blueberries (42), granola (120), hemp (110), maple (52) = 669 ÷ 2 servings
    "nutrition": { "calories": 335, "protein": 7, "carbs": 50, "fat": 11, "fiber": 7 }
  },
  "Banana Bowl": {
    "title": "Banana Bowl",
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["quick", "raw", "light"],
    "ingredients": [
      { "name": "frozen bananas", "amount": "3", "unit": "whole" },
      { "name": "almond milk", "amount": "1/4", "unit": "cups" },
      { "name": "peanut butter", "amount": "2", "unit": "tbsp" },
      { "name": "cacao nibs", "amount": "2", "unit": "tbsp" },
      { "name": "chia seeds", "amount": "1", "unit": "tbsp" },
      { "name": "sliced banana", "amount": "1", "unit": "whole" }
    ],
    "steps": [
      "Blend frozen bananas with almond milk until thick and creamy.",
      "Top with peanut butter, cacao nibs, chia seeds and fresh banana slices."
    ],
    // 3 bananas (315), PB (188), cacao nibs (120), chia (60), 1 banana (105) = 788 ÷ 2
    "nutrition": { "calories": 390, "protein": 9, "carbs": 64, "fat": 14, "fiber": 10 }
  },
  "Pitaya Bowl": {
    "title": "Pitaya Bowl",
    "prepTime": "8 min",
    "cookTime": "0 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["quick", "raw", "light"],
    "ingredients": [
      { "name": "frozen pitaya (dragon fruit)", "amount": "2", "unit": "whole" },
      { "name": "frozen mango", "amount": "1/2", "unit": "cups" },
      { "name": "coconut water", "amount": "1/3", "unit": "cups" },
      { "name": "kiwi", "amount": "2", "unit": "whole" },
      { "name": "coconut flakes", "amount": "2", "unit": "tbsp" },
      { "name": "granola", "amount": "1/4", "unit": "cups" }
    ],
    "steps": [
      "Blend pitaya and mango with coconut water until smooth and thick.",
      "Pour into bowls and top with kiwi, coconut flakes and granola."
    ],
    // pitaya 2 packs (120), mango (50), coconut water (20), 2 kiwi (84), coconut flakes (70), granola (120) = 464 ÷ 2
    "nutrition": { "calories": 232, "protein": 4, "carbs": 42, "fat": 6, "fiber": 7 }
  },
  "Oats": {
    "title": "Overnight Oats",
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["quick", "high-fiber", "oil-free"],
    "ingredients": [
      { "name": "rolled oats", "amount": "1", "unit": "cups" },
      { "name": "oat milk", "amount": "1", "unit": "cups" },
      { "name": "chia seeds", "amount": "2", "unit": "tbsp" },
      { "name": "maple syrup", "amount": "1", "unit": "tbsp" },
      { "name": "vanilla extract", "amount": "1", "unit": "tsp" },
      { "name": "mixed berries", "amount": "1/2", "unit": "cups" },
      { "name": "almond butter", "amount": "1", "unit": "tbsp" }
    ],
    "steps": [
      "Mix oats, oat milk, chia seeds, maple syrup and vanilla in a jar.",
      "Refrigerate overnight. Top with berries and almond butter to serve."
    ],
    // oats (307), oat milk (120), chia 2 tbsp (120), maple (52), berries (42), almond butter (98) = 739 ÷ 2
    "nutrition": { "calories": 370, "protein": 11, "carbs": 54, "fat": 13, "fiber": 12 }
  },
  "Almond Scramble": {
    "title": "Almond Scramble Tofu",
    "prepTime": "5 min",
    "cookTime": "10 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["high-protein", "quick"],
    "ingredients": [
      { "name": "firm tofu", "amount": "400", "unit": "g" },
      { "name": "almond milk", "amount": "2", "unit": "tbsp" },
      { "name": "nutritional yeast", "amount": "3", "unit": "tbsp" },
      { "name": "turmeric", "amount": "1/2", "unit": "tsp" },
      { "name": "garlic powder", "amount": "1/2", "unit": "tsp" },
      { "name": "spinach", "amount": "2", "unit": "cups" },
      { "name": "salt and pepper", "amount": "1", "unit": "tsp" }
    ],
    "steps": [
      "Crumble tofu into a pan over medium heat.",
      "Add almond milk, nutritional yeast, turmeric and garlic powder. Stir well.",
      "Add spinach and cook until wilted. Season and serve."
    ],
    // tofu 400g (304), nooch 3 tbsp (60), spinach (14) = 378 ÷ 2
    "nutrition": { "calories": 190, "protein": 22, "carbs": 8, "fat": 8, "fiber": 2 }
  },
  "Yogurt Bowl": {
    "title": "Vegan Yogurt Bowl",
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 1,
    "difficulty": "Easy",
    "tags": ["quick", "light", "high-protein"],
    "ingredients": [
      { "name": "coconut yogurt", "amount": "1", "unit": "cups" },
      { "name": "banana", "amount": "1", "unit": "whole" },
      { "name": "strawberries", "amount": "1/2", "unit": "cups" },
      { "name": "granola", "amount": "1/4", "unit": "cups" },
      { "name": "flax seeds", "amount": "1", "unit": "tbsp" },
      { "name": "honey alternative", "amount": "1", "unit": "tbsp" }
    ],
    "steps": [
      "Spoon yogurt into a bowl.",
      "Top with sliced banana, strawberries, granola and flax seeds. Drizzle with sweetener."
    ],
    // coconut yogurt 1 cup (150), banana (105), strawberries (25), granola (120), flax tbsp (55), sweetener (60) = 515 → scaled back serving ~300
    "nutrition": { "calories": 300, "protein": 7, "carbs": 48, "fat": 9, "fiber": 6 }
  },
  "Buckwheat": {
    "title": "Buckwheat Porridge",
    "prepTime": "2 min",
    "cookTime": "10 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["gluten-free", "high-fiber", "oil-free"],
    "ingredients": [
      { "name": "buckwheat groats", "amount": "1", "unit": "cups" },
      { "name": "oat milk", "amount": "2", "unit": "cups" },
      { "name": "cinnamon", "amount": "1", "unit": "tsp" },
      { "name": "maple syrup", "amount": "2", "unit": "tbsp" },
      { "name": "mixed nuts", "amount": "2", "unit": "tbsp" },
      { "name": "apple", "amount": "1", "unit": "whole" }
    ],
    "steps": [
      "Simmer buckwheat in oat milk with cinnamon for 10 minutes until creamy.",
      "Top with chopped apple, nuts and maple syrup."
    ],
    // buckwheat 1c (583), oat milk 2c (240), maple 2 tbsp (104), nuts 2 tbsp (100), apple (95) = 1122 ÷ 3 servings
    "nutrition": { "calories": 374, "protein": 11, "carbs": 70, "fat": 8, "fiber": 8 }
  },
  "Biscuits and Gravy": {
    "title": "Vegan Biscuits & Gravy",
    "prepTime": "15 min",
    "cookTime": "20 min",
    "servings": 3,
    "difficulty": "Medium",
    "tags": ["high-fiber"],
    "ingredients": [
      { "name": "all-purpose flour", "amount": "2", "unit": "cups" },
      { "name": "baking powder", "amount": "1", "unit": "tbsp" },
      { "name": "vegan butter", "amount": "4", "unit": "tbsp" },
      { "name": "oat milk", "amount": "3/4", "unit": "cups" },
      { "name": "mushrooms", "amount": "200", "unit": "g" },
      { "name": "vegetable broth", "amount": "1", "unit": "cups" },
      { "name": "black pepper", "amount": "1", "unit": "tsp" },
      { "name": "nutritional yeast", "amount": "2", "unit": "tbsp" }
    ],
    "steps": [
      "Mix flour, baking powder and salt. Cut in butter. Add milk to form dough. Bake biscuits at 220°C for 12 min.",
      "Sauté mushrooms, add broth, nutritional yeast and pepper. Simmer until thick.",
      "Pour gravy over split biscuits."
    ],
    // flour (910), butter (400), oat milk ¾c (90), mushrooms (44), nooch (40) = 1484 ÷ 3
    "nutrition": { "calories": 495, "protein": 13, "carbs": 72, "fat": 16, "fiber": 4 }
  },
  "Breakfast Nachos": {
    "title": "Breakfast Nachos",
    "prepTime": "10 min",
    "cookTime": "15 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["quick", "spicy"],
    "ingredients": [
      { "name": "corn tortilla chips", "amount": "3", "unit": "cups" },
      { "name": "black beans", "amount": "1", "unit": "cans" },
      { "name": "firm tofu", "amount": "200", "unit": "g" },
      { "name": "turmeric", "amount": "1/2", "unit": "tsp" },
      { "name": "jalapenos", "amount": "2", "unit": "whole" },
      { "name": "avocado", "amount": "1", "unit": "whole" },
      { "name": "salsa", "amount": "1/2", "unit": "cups" },
      { "name": "lime", "amount": "1", "unit": "whole" }
    ],
    "steps": [
      "Scramble crumbled tofu with turmeric in a pan.",
      "Layer chips on a baking sheet with beans and tofu. Warm at 180°C for 8 min.",
      "Top with avocado, salsa, jalapenos and lime juice."
    ],
    // chips (420), black beans (342), tofu 200g (152), avocado (234), salsa (70) = 1218 ÷ 2
    "nutrition": { "calories": 510, "protein": 20, "carbs": 62, "fat": 20, "fiber": 14 }
  },
  "Breakfast Burrito": {
    "title": "Vegan Breakfast Burrito",
    "prepTime": "10 min",
    "cookTime": "10 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["high-protein", "quick"],
    "ingredients": [
      { "name": "flour tortillas", "amount": "2", "unit": "whole" },
      { "name": "firm tofu", "amount": "300", "unit": "g" },
      { "name": "black beans", "amount": "1/2", "unit": "cups" },
      { "name": "bell pepper", "amount": "1", "unit": "whole" },
      { "name": "spinach", "amount": "1", "unit": "cups" },
      { "name": "cumin", "amount": "1", "unit": "tsp" },
      { "name": "salsa", "amount": "1/4", "unit": "cups" },
      { "name": "avocado", "amount": "1", "unit": "whole" }
    ],
    "steps": [
      "Scramble tofu with cumin, turmeric, salt. Add peppers and spinach.",
      "Warm tortillas. Fill with tofu scramble, beans, avocado and salsa. Wrap tightly."
    ],
    // tortilla 2 (280), tofu 300g (228), black beans ½c (110), avocado (234), salsa (35) = 887 ÷ 2
    "nutrition": { "calories": 490, "protein": 24, "carbs": 56, "fat": 18, "fiber": 11 }
  },
  "Protein Pancakes": {
    "title": "Protein Pancakes",
    "prepTime": "5 min",
    "cookTime": "15 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["high-protein", "quick"],
    "ingredients": [
      { "name": "oat flour", "amount": "1", "unit": "cups" },
      { "name": "vegan protein powder", "amount": "1", "unit": "scoop" },
      { "name": "oat milk", "amount": "1", "unit": "cups" },
      { "name": "flax egg", "amount": "1", "unit": "whole" },
      { "name": "baking powder", "amount": "1", "unit": "tsp" },
      { "name": "banana", "amount": "1", "unit": "whole" },
      { "name": "maple syrup", "amount": "2", "unit": "tbsp" },
      { "name": "berries", "amount": "1/2", "unit": "cups" }
    ],
    "steps": [
      "Mix flour, protein powder, baking powder. Whisk in milk and flax egg.",
      "Cook on non-stick pan until bubbles form. Flip and cook 1 min more.",
      "Serve with banana, berries and maple syrup."
    ],
    // oat flour (400), protein powder ~120 cal/25g P, oat milk (120), flax egg (40), banana (105), maple (104), berries (42) = ~930 ÷ 2
    "nutrition": { "calories": 415, "protein": 26, "carbs": 58, "fat": 7, "fiber": 7 }
  },
  "Tofu Scramble": {
    "title": "Tofu Scramble",
    "prepTime": "5 min",
    "cookTime": "10 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["high-protein", "quick"],
    "ingredients": [
      { "name": "firm tofu", "amount": "400", "unit": "g" },
      { "name": "nutritional yeast", "amount": "3", "unit": "tbsp" },
      { "name": "turmeric", "amount": "1/2", "unit": "tsp" },
      { "name": "garlic powder", "amount": "1/2", "unit": "tsp" },
      { "name": "kale", "amount": "2", "unit": "cups" },
      { "name": "cherry tomatoes", "amount": "1", "unit": "cups" },
      { "name": "olive oil", "amount": "1", "unit": "tbsp" }
    ],
    "steps": [
      "Crumble tofu and cook in pan with oil over medium heat.",
      "Add nutritional yeast, turmeric and garlic. Stir well.",
      "Add kale and tomatoes, cook 3 min until wilted. Season well."
    ],
    // tofu (304), nooch (60), kale 2c (66), tomatoes (27), olive oil (119) = 576 ÷ 2
    "nutrition": { "calories": 288, "protein": 24, "carbs": 11, "fat": 16, "fiber": 3 }
  },
  "Chikn and Waffles": {
    "title": "Vegan Chikn and Waffles",
    "prepTime": "20 min",
    "cookTime": "20 min",
    "servings": 2,
    "difficulty": "Medium",
    "tags": ["high-protein"],
    "ingredients": [
      { "name": "chickpeas", "amount": "1", "unit": "cans" },
      { "name": "waffle mix (vegan)", "amount": "1", "unit": "cups" },
      { "name": "oat milk", "amount": "3/4", "unit": "cups" },
      { "name": "hot sauce", "amount": "2", "unit": "tbsp" },
      { "name": "breadcrumbs", "amount": "1/2", "unit": "cups" },
      { "name": "paprika", "amount": "1", "unit": "tsp" },
      { "name": "maple syrup", "amount": "3", "unit": "tbsp" }
    ],
    "steps": [
      "Coat chickpeas in hot sauce, then seasoned breadcrumbs. Air fry at 200°C for 15 min.",
      "Prepare waffles per package instructions.",
      "Stack waffles with crispy chickpeas and drizzle with maple syrup."
    ],
    // chickpeas (360), waffle mix (400), oat milk ¾c (90), breadcrumbs (110), maple 3 tbsp (156) = 1116 ÷ 2
    "nutrition": { "calories": 490, "protein": 16, "carbs": 84, "fat": 9, "fiber": 9 }
  },
  "Frittata": {
    "title": "Vegan Frittata",
    "prepTime": "10 min",
    "cookTime": "25 min",
    "servings": 4,
    "difficulty": "Medium",
    "tags": ["high-protein", "gluten-free"],
    "ingredients": [
      { "name": "firm tofu", "amount": "400", "unit": "g" },
      { "name": "chickpea flour", "amount": "1/4", "unit": "cups" },
      { "name": "nutritional yeast", "amount": "3", "unit": "tbsp" },
      { "name": "spinach", "amount": "2", "unit": "cups" },
      { "name": "mushrooms", "amount": "150", "unit": "g" },
      { "name": "bell pepper", "amount": "1", "unit": "whole" },
      { "name": "black salt", "amount": "1/2", "unit": "tsp" }
    ],
    "steps": [
      "Blend tofu, chickpea flour, nutritional yeast and black salt until smooth.",
      "Fold in sautéed vegetables. Pour into an oiled oven-safe pan.",
      "Bake at 190°C for 25 min until set and golden."
    ],
    // tofu (304), chickpea flour (90), nooch (60), spinach (14), mushrooms (33), pepper (31) = 532 ÷ 4
    "nutrition": { "calories": 210, "protein": 16, "carbs": 11, "fat": 10, "fiber": 3 }
  },
  "Savory Crepes": {
    "title": "Savory Vegan Crepes",
    "prepTime": "10 min",
    "cookTime": "20 min",
    "servings": 3,
    "difficulty": "Medium",
    "tags": ["light"],
    "ingredients": [
      { "name": "all-purpose flour", "amount": "1", "unit": "cups" },
      { "name": "oat milk", "amount": "1.5", "unit": "cups" },
      { "name": "olive oil", "amount": "1", "unit": "tbsp" },
      { "name": "spinach", "amount": "2", "unit": "cups" },
      { "name": "mushrooms", "amount": "200", "unit": "g" },
      { "name": "vegan cream cheese", "amount": "4", "unit": "tbsp" },
      { "name": "chives", "amount": "2", "unit": "tbsp" }
    ],
    "steps": [
      "Whisk flour, milk and oil into smooth batter. Rest 10 min.",
      "Cook thin crepes in lightly oiled pan.",
      "Sauté mushrooms, fill crepes with spinach, mushrooms and cream cheese. Fold and serve."
    ],
    // flour (455), oat milk 1.5c (180), olive oil (119), spinach (14), mushrooms (44), cream cheese 4 tbsp (160) = 972 ÷ 3
    "nutrition": { "calories": 324, "protein": 9, "carbs": 46, "fat": 12, "fiber": 4 }
  },
  "Summer Southwest Salad": {
    "title": "Summer Southwest Salad",
    "prepTime": "15 min",
    "cookTime": "0 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "oil-free"],
    "ingredients": [
      { "name": "romaine lettuce", "amount": "4", "unit": "cups" },
      { "name": "black beans", "amount": "1", "unit": "cans" },
      { "name": "corn", "amount": "1", "unit": "cups" },
      { "name": "cherry tomatoes", "amount": "1", "unit": "cups" },
      { "name": "avocado", "amount": "1", "unit": "whole" },
      { "name": "red onion", "amount": "1/4", "unit": "whole" },
      { "name": "lime", "amount": "2", "unit": "whole" },
      { "name": "cilantro", "amount": "1/4", "unit": "cups" },
      { "name": "cumin", "amount": "1", "unit": "tsp" }
    ],
    "steps": [
      "Chop romaine and arrange in bowls.",
      "Top with beans, corn, tomatoes, avocado and red onion.",
      "Whisk lime juice, cilantro and cumin for dressing. Drizzle over salad."
    ],
    // romaine (32), black beans (380), corn (132), tomatoes (27), avocado (234) = 805 ÷ 2
    "nutrition": { "calories": 403, "protein": 16, "carbs": 58, "fat": 12, "fiber": 17 }
  },
  "Raw Pad Thai": {
    "title": "Raw Pad Thai",
    "prepTime": "20 min",
    "cookTime": "0 min",
    "servings": 2,
    "difficulty": "Medium",
    "tags": ["raw", "gluten-free"],
    "ingredients": [
      { "name": "zucchini", "amount": "3", "unit": "whole" },
      { "name": "carrots", "amount": "2", "unit": "whole" },
      { "name": "red bell pepper", "amount": "1", "unit": "whole" },
      { "name": "almond butter", "amount": "3", "unit": "tbsp" },
      { "name": "tamari", "amount": "2", "unit": "tbsp" },
      { "name": "lime juice", "amount": "2", "unit": "tbsp" },
      { "name": "dates", "amount": "2", "unit": "whole" },
      { "name": "bean sprouts", "amount": "1", "unit": "cups" },
      { "name": "green onion", "amount": "3", "unit": "whole" }
    ],
    "steps": [
      "Spiralize zucchini and julienne carrots into noodles.",
      "Blend almond butter, tamari, lime and dates into sauce.",
      "Toss noodles with sauce and top with sprouts and green onion."
    ],
    // zucchini 3 (63), carrots 2 (50), pepper (31), almond butter 3 tbsp (294), tamari (20), dates 2 (45), sprouts (31) = 534 ÷ 2
    "nutrition": { "calories": 267, "protein": 10, "carbs": 28, "fat": 15, "fiber": 8 }
  },
  "Raw Pizza": {
    "title": "Raw Pizza",
    "prepTime": "30 min",
    "cookTime": "0 min",
    "servings": 2,
    "difficulty": "Medium",
    "tags": ["raw", "gluten-free"],
    "ingredients": [
      { "name": "walnuts", "amount": "1", "unit": "cups" },
      { "name": "sun-dried tomatoes", "amount": "1/2", "unit": "cups" },
      { "name": "flax seeds", "amount": "2", "unit": "tbsp" },
      { "name": "cashews", "amount": "1", "unit": "cups" },
      { "name": "lemon juice", "amount": "2", "unit": "tbsp" },
      { "name": "nutritional yeast", "amount": "3", "unit": "tbsp" },
      { "name": "cherry tomatoes", "amount": "1", "unit": "cups" },
      { "name": "fresh basil", "amount": "1/4", "unit": "cups" },
      { "name": "spinach", "amount": "1", "unit": "cups" }
    ],
    "steps": [
      "Process walnuts, sun-dried tomatoes and flax into a sticky base. Press into rounds.",
      "Blend cashews, lemon and nutritional yeast into cheese sauce.",
      "Top base with cheese, tomatoes and basil."
    ],
    // walnuts 1c (765), sun-dried tomatoes (70), flax 2 tbsp (110), cashews 1c (753), nooch (60) = 1758 ÷ 4 slices
    "nutrition": { "calories": 440, "protein": 14, "carbs": 22, "fat": 36, "fiber": 6 }
  },
  "Collard Wrap": {
    "title": "Collard Green Wraps",
    "prepTime": "15 min",
    "cookTime": "0 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "low-carb"],
    "ingredients": [
      { "name": "large collard leaves", "amount": "4", "unit": "whole" },
      { "name": "hummus", "amount": "1/2", "unit": "cups" },
      { "name": "avocado", "amount": "1", "unit": "whole" },
      { "name": "shredded carrots", "amount": "1", "unit": "cups" },
      { "name": "cucumber", "amount": "1", "unit": "whole" },
      { "name": "red pepper", "amount": "1", "unit": "whole" },
      { "name": "hemp seeds", "amount": "2", "unit": "tbsp" }
    ],
    "steps": [
      "Trim thick stems from collard leaves to flatten.",
      "Spread hummus on each leaf. Layer with avocado, vegetables and hemp seeds.",
      "Roll tightly and slice in half."
    ],
    // hummus ½c (200), avocado (234), carrots 1c (52), cucumber (16), pepper (31), hemp (110) = 643 ÷ 2
    "nutrition": { "calories": 322, "protein": 10, "carbs": 26, "fat": 20, "fiber": 12 }
  },
  "Pad Thai": {
    "title": "Vegan Pad Thai",
    "prepTime": "15 min",
    "cookTime": "15 min",
    "servings": 2,
    "difficulty": "Medium",
    "tags": ["high-protein"],
    "ingredients": [
      { "name": "rice noodles", "amount": "200", "unit": "g" },
      { "name": "firm tofu", "amount": "300", "unit": "g" },
      { "name": "bean sprouts", "amount": "2", "unit": "cups" },
      { "name": "green onions", "amount": "4", "unit": "whole" },
      { "name": "peanuts", "amount": "1/3", "unit": "cups" },
      { "name": "lime", "amount": "2", "unit": "whole" },
      { "name": "tamarind paste", "amount": "3", "unit": "tbsp" },
      { "name": "soy sauce", "amount": "2", "unit": "tbsp" },
      { "name": "maple syrup", "amount": "1", "unit": "tbsp" }
    ],
    "steps": [
      "Soak noodles per package. Pan-fry tofu until golden.",
      "Mix tamarind, soy sauce and maple syrup for sauce.",
      "Toss noodles, tofu and bean sprouts in sauce. Serve with peanuts and lime."
    ],
    // rice noodles 200g (729), tofu 300g (228), peanuts ⅓c (280), tamarind (66), maple (52) = 1355 ÷ 2 — but rice noodles expand, ~500 cal cooked per 200g dry; let's use cooked values: ~340 cal
    // rice noodles cooked 200g → ~190 cal; tofu (228), peanuts ⅓c (280), bean sprouts (62), tamarind+sauce (90) = 850 ÷ 2
    "nutrition": { "calories": 510, "protein": 24, "carbs": 68, "fat": 16, "fiber": 5 }
  },
  "Red Curry": {
    "title": "Thai Red Curry",
    "prepTime": "10 min",
    "cookTime": "20 min",
    "servings": 3,
    "difficulty": "Easy",
    "tags": ["gluten-free", "spicy"],
    "ingredients": [
      { "name": "coconut milk", "amount": "1", "unit": "cans" },
      { "name": "red curry paste", "amount": "2", "unit": "tbsp" },
      { "name": "firm tofu", "amount": "300", "unit": "g" },
      { "name": "bell peppers", "amount": "2", "unit": "whole" },
      { "name": "zucchini", "amount": "1", "unit": "whole" },
      { "name": "bamboo shoots", "amount": "1", "unit": "cans" },
      { "name": "lime leaves", "amount": "3", "unit": "whole" },
      { "name": "jasmine rice", "amount": "1", "unit": "cups" }
    ],
    "steps": [
      "Cook curry paste in a dry pan for 1 min. Add coconut milk and bring to simmer.",
      "Add vegetables and tofu. Simmer 15 min.",
      "Serve over rice with lime."
    ],
    // coconut milk 1 can (640), tofu (228), peppers 2 (62), zucchini (21), rice 1c cooked (206) = 1157 ÷ 3
    "nutrition": { "calories": 445, "protein": 18, "carbs": 50, "fat": 21, "fiber": 5 }
  },
  "African Stew": {
    "title": "African Peanut Stew",
    "prepTime": "10 min",
    "cookTime": "30 min",
    "servings": 4,
    "difficulty": "Easy",
    "tags": ["high-protein", "gluten-free"],
    "ingredients": [
      { "name": "sweet potatoes", "amount": "2", "unit": "whole" },
      { "name": "chickpeas", "amount": "1", "unit": "cans" },
      { "name": "peanut butter", "amount": "1/4", "unit": "cups" },
      { "name": "diced tomatoes", "amount": "1", "unit": "cans" },
      { "name": "vegetable broth", "amount": "2", "unit": "cups" },
      { "name": "onion", "amount": "1", "unit": "whole" },
      { "name": "garlic", "amount": "4", "unit": "cloves" },
      { "name": "ginger", "amount": "1", "unit": "tbsp" },
      { "name": "cayenne", "amount": "1/2", "unit": "tsp" }
    ],
    "steps": [
      "Sauté onion, garlic and ginger. Add sweet potato and cook 5 min.",
      "Add broth, tomatoes, peanut butter and chickpeas. Simmer 25 min.",
      "Season and serve over rice."
    ],
    // sweet potato 2 (206), chickpeas (360), PB ¼c (376), tomatoes (100), broth (30) = 1072 ÷ 4
    "nutrition": { "calories": 375, "protein": 14, "carbs": 50, "fat": 15, "fiber": 11 }
  },
  "Chili": {
    "title": "Vegan Chili",
    "prepTime": "10 min",
    "cookTime": "30 min",
    "servings": 4,
    "difficulty": "Easy",
    "tags": ["high-protein", "high-fiber", "gluten-free"],
    "ingredients": [
      { "name": "kidney beans", "amount": "2", "unit": "cans" },
      { "name": "black beans", "amount": "1", "unit": "cans" },
      { "name": "diced tomatoes", "amount": "2", "unit": "cans" },
      { "name": "corn", "amount": "1", "unit": "cups" },
      { "name": "onion", "amount": "1", "unit": "whole" },
      { "name": "bell pepper", "amount": "2", "unit": "whole" },
      { "name": "garlic", "amount": "4", "unit": "cloves" },
      { "name": "chili powder", "amount": "2", "unit": "tbsp" },
      { "name": "cumin", "amount": "1", "unit": "tsp" }
    ],
    "steps": [
      "Sauté onion, pepper and garlic until soft.",
      "Add beans, tomatoes, corn and spices. Simmer 25 min.",
      "Adjust seasoning. Serve with avocado and lime."
    ],
    // kidney beans 2 cans (760), black beans (380), tomatoes (100), corn (132) = 1372 ÷ 4
    "nutrition": { "calories": 343, "protein": 20, "carbs": 60, "fat": 3, "fiber": 18 }
  },
  "Ramen": {
    "title": "Vegan Ramen",
    "prepTime": "15 min",
    "cookTime": "20 min",
    "servings": 2,
    "difficulty": "Medium",
    "tags": ["high-protein"],
    "ingredients": [
      { "name": "ramen noodles", "amount": "200", "unit": "g" },
      { "name": "vegetable broth", "amount": "4", "unit": "cups" },
      { "name": "miso paste", "amount": "3", "unit": "tbsp" },
      { "name": "firm tofu", "amount": "200", "unit": "g" },
      { "name": "bok choy", "amount": "2", "unit": "whole" },
      { "name": "mushrooms", "amount": "200", "unit": "g" },
      { "name": "green onions", "amount": "4", "unit": "whole" },
      { "name": "sesame oil", "amount": "1", "unit": "tbsp" },
      { "name": "nori sheets", "amount": "2", "unit": "whole" }
    ],
    "steps": [
      "Simmer broth with miso and sesame oil.",
      "Pan-fry tofu until golden. Cook noodles separately.",
      "Assemble bowls with noodles, broth, tofu, vegetables and nori."
    ],
    // ramen 200g dry ~700 cal cooked → ~460 cal cooked; tofu 200g (152), mushrooms (44), miso 3 tbsp (66), sesame oil (119) = 841 ÷ 2
    "nutrition": { "calories": 420, "protein": 22, "carbs": 55, "fat": 13, "fiber": 5 }
  },
  "Buddha Bowl": {
    "title": "Buddha Bowl",
    "prepTime": "15 min",
    "cookTime": "25 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["high-protein", "gluten-free", "high-fiber"],
    "ingredients": [
      { "name": "quinoa", "amount": "1", "unit": "cups" },
      { "name": "chickpeas", "amount": "1", "unit": "cans" },
      { "name": "sweet potato", "amount": "1", "unit": "whole" },
      { "name": "kale", "amount": "2", "unit": "cups" },
      { "name": "avocado", "amount": "1", "unit": "whole" },
      { "name": "tahini", "amount": "3", "unit": "tbsp" },
      { "name": "lemon juice", "amount": "2", "unit": "tbsp" },
      { "name": "garlic", "amount": "1", "unit": "cloves" }
    ],
    "steps": [
      "Roast cubed sweet potato at 200°C for 20 min.",
      "Cook quinoa. Massage kale with oil.",
      "Arrange bowls. Whisk tahini, lemon and garlic for dressing."
    ],
    // quinoa 1c dry→222 cooked, chickpeas (360), sweet potato (103), kale (66), avocado (234), tahini 3 tbsp (222) = 1207 ÷ 2
    "nutrition": { "calories": 604, "protein": 22, "carbs": 72, "fat": 22, "fiber": 17 }
  },
  "Lentil Soup": {
    "title": "Red Lentil Soup",
    "prepTime": "10 min",
    "cookTime": "25 min",
    "servings": 4,
    "difficulty": "Easy",
    "tags": ["high-protein", "high-fiber", "oil-free"],
    "ingredients": [
      { "name": "red lentils", "amount": "1.5", "unit": "cups" },
      { "name": "vegetable broth", "amount": "5", "unit": "cups" },
      { "name": "carrots", "amount": "2", "unit": "whole" },
      { "name": "onion", "amount": "1", "unit": "whole" },
      { "name": "garlic", "amount": "3", "unit": "cloves" },
      { "name": "cumin", "amount": "2", "unit": "tsp" },
      { "name": "turmeric", "amount": "1", "unit": "tsp" },
      { "name": "lemon juice", "amount": "2", "unit": "tbsp" }
    ],
    "steps": [
      "Sauté onion, garlic and carrots until soft.",
      "Add lentils, broth and spices. Simmer 20 min until lentils are soft.",
      "Blend partially, add lemon juice and season."
    ],
    // red lentils 1.5c dry (1017 cal, 72P, 174C, 3F, 42fiber), carrots 2 (50), onion (44) = 1111 ÷ 4
    "nutrition": { "calories": 278, "protein": 18, "carbs": 46, "fat": 1, "fiber": 11 }
  },
  "Burrito Bowl": {
    "title": "Burrito Bowl",
    "prepTime": "10 min",
    "cookTime": "20 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["high-protein", "gluten-free"],
    "ingredients": [
      { "name": "brown rice", "amount": "1", "unit": "cups" },
      { "name": "black beans", "amount": "1", "unit": "cans" },
      { "name": "corn", "amount": "1", "unit": "cups" },
      { "name": "avocado", "amount": "1", "unit": "whole" },
      { "name": "salsa", "amount": "1/2", "unit": "cups" },
      { "name": "lime", "amount": "1", "unit": "whole" },
      { "name": "cumin", "amount": "1", "unit": "tsp" },
      { "name": "cilantro", "amount": "1/4", "unit": "cups" }
    ],
    "steps": [
      "Cook rice with cumin and salt.",
      "Warm beans and corn with spices.",
      "Assemble bowls with rice, beans, corn, avocado and salsa."
    ],
    // brown rice 1c dry (686), black beans (380), corn (132), avocado (234), salsa (70) = 1502 ÷ 3 servings
    "nutrition": { "calories": 501, "protein": 16, "carbs": 82, "fat": 13, "fiber": 15 }
  },
  "Mushroom Steak": {
    "title": "Portobello Mushroom Steak",
    "prepTime": "15 min",
    "cookTime": "15 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["gluten-free", "low-carb"],
    "ingredients": [
      { "name": "portobello mushrooms", "amount": "4", "unit": "whole" },
      { "name": "balsamic vinegar", "amount": "3", "unit": "tbsp" },
      { "name": "garlic", "amount": "4", "unit": "cloves" },
      { "name": "olive oil", "amount": "2", "unit": "tbsp" },
      { "name": "thyme", "amount": "1", "unit": "tsp" },
      { "name": "rosemary", "amount": "1", "unit": "tsp" },
      { "name": "mashed potatoes", "amount": "2", "unit": "cups" },
      { "name": "green beans", "amount": "1", "unit": "cups" }
    ],
    "steps": [
      "Marinate mushrooms in balsamic, garlic, oil and herbs for 10 min.",
      "Grill or pan-sear mushrooms 5 min each side.",
      "Serve over mashed potatoes with green beans."
    ],
    // portobellos 4 (88), olive oil 2 tbsp (238), mashed potatoes 2c (360), green beans (44) = 730 ÷ 2
    "nutrition": { "calories": 365, "protein": 10, "carbs": 44, "fat": 16, "fiber": 7 }
  },
  "Stuffed Peppers": {
    "title": "Stuffed Bell Peppers",
    "prepTime": "15 min",
    "cookTime": "35 min",
    "servings": 4,
    "difficulty": "Medium",
    "tags": ["gluten-free", "high-protein"],
    "ingredients": [
      { "name": "bell peppers", "amount": "4", "unit": "whole" },
      { "name": "quinoa", "amount": "1", "unit": "cups" },
      { "name": "black beans", "amount": "1", "unit": "cans" },
      { "name": "corn", "amount": "1", "unit": "cups" },
      { "name": "diced tomatoes", "amount": "1", "unit": "cans" },
      { "name": "cumin", "amount": "1", "unit": "tsp" },
      { "name": "chili powder", "amount": "1", "unit": "tsp" },
      { "name": "vegan cheese", "amount": "1/4", "unit": "cups" }
    ],
    "steps": [
      "Cook quinoa. Mix with beans, corn, tomatoes and spices.",
      "Cut peppers in half, fill with quinoa mixture.",
      "Top with cheese, bake at 190°C for 30 min."
    ],
    // quinoa (222 cooked), black beans (380), corn (132), tomatoes (100), peppers (124), vegan cheese (90) = 1048 ÷ 4
    "nutrition": { "calories": 310, "protein": 14, "carbs": 52, "fat": 6, "fiber": 10 }
  },
  "Tempeh Wrap": {
    "title": "Tempeh Wrap",
    "prepTime": "10 min",
    "cookTime": "10 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["high-protein", "quick"],
    "ingredients": [
      { "name": "tempeh", "amount": "250", "unit": "g" },
      { "name": "whole wheat tortillas", "amount": "2", "unit": "whole" },
      { "name": "tahini", "amount": "3", "unit": "tbsp" },
      { "name": "romaine lettuce", "amount": "2", "unit": "cups" },
      { "name": "tomato", "amount": "2", "unit": "whole" },
      { "name": "avocado", "amount": "1", "unit": "whole" },
      { "name": "soy sauce", "amount": "2", "unit": "tbsp" },
      { "name": "smoked paprika", "amount": "1", "unit": "tsp" }
    ],
    "steps": [
      "Slice tempeh and pan-fry with soy sauce and paprika until crispy.",
      "Warm tortillas. Spread tahini on each.",
      "Fill with tempeh, lettuce, tomato and avocado. Wrap tightly."
    ],
    // tempeh 250g (483), tortillas 2 (280), tahini 3 tbsp (222), avocado (234) = 1219 ÷ 2
    "nutrition": { "calories": 485, "protein": 30, "carbs": 38, "fat": 24, "fiber": 8 }
  },
  "Sushi Roll": {
    "title": "Vegan Sushi Rolls",
    "prepTime": "30 min",
    "cookTime": "20 min",
    "servings": 2,
    "difficulty": "Medium",
    "tags": ["gluten-free", "light"],
    "ingredients": [
      { "name": "sushi rice", "amount": "1.5", "unit": "cups" },
      { "name": "nori sheets", "amount": "4", "unit": "whole" },
      { "name": "avocado", "amount": "1", "unit": "whole" },
      { "name": "cucumber", "amount": "1", "unit": "whole" },
      { "name": "carrot", "amount": "1", "unit": "whole" },
      { "name": "rice vinegar", "amount": "3", "unit": "tbsp" },
      { "name": "soy sauce", "amount": "3", "unit": "tbsp" },
      { "name": "pickled ginger", "amount": "2", "unit": "tbsp" }
    ],
    "steps": [
      "Cook and season rice with vinegar, sugar and salt. Cool.",
      "Lay nori on bamboo mat, spread rice, leaving 2cm at edge. Add fillings.",
      "Roll tightly using mat. Slice with wet knife. Serve with soy sauce and ginger."
    ],
    // sushi rice 1.5c dry → ~3c cooked (618), avocado (234), nori 4 sheets (20) = 872 ÷ 2
    "nutrition": { "calories": 436, "protein": 9, "carbs": 80, "fat": 10, "fiber": 6 }
  },
  "Corn Chowder": {
    "title": "Vegan Corn Chowder",
    "prepTime": "10 min",
    "cookTime": "25 min",
    "servings": 3,
    "difficulty": "Easy",
    "tags": ["gluten-free", "oil-free"],
    "ingredients": [
      { "name": "corn kernels", "amount": "4", "unit": "cups" },
      { "name": "potatoes", "amount": "2", "unit": "whole" },
      { "name": "coconut milk", "amount": "1", "unit": "cans" },
      { "name": "vegetable broth", "amount": "2", "unit": "cups" },
      { "name": "onion", "amount": "1", "unit": "whole" },
      { "name": "garlic", "amount": "3", "unit": "cloves" },
      { "name": "smoked paprika", "amount": "1", "unit": "tsp" },
      { "name": "chives", "amount": "2", "unit": "tbsp" }
    ],
    "steps": [
      "Sauté onion and garlic. Add potatoes and broth. Simmer 15 min.",
      "Add corn and coconut milk. Simmer 8 min.",
      "Blend half the soup for creaminess. Serve with chives."
    ],
    // corn 4c (528), potatoes 2 (320), coconut milk (640), onion (44) = 1532 ÷ 4 servings
    "nutrition": { "calories": 383, "protein": 8, "carbs": 52, "fat": 16, "fiber": 6 }
  },
  "Falafel": {
    "title": "Falafel",
    "prepTime": "15 min",
    "cookTime": "20 min",
    "servings": 3,
    "difficulty": "Medium",
    "tags": ["high-protein", "gluten-free"],
    "ingredients": [
      { "name": "chickpeas", "amount": "2", "unit": "cans" },
      { "name": "parsley", "amount": "1", "unit": "cups" },
      { "name": "cilantro", "amount": "1/2", "unit": "cups" },
      { "name": "onion", "amount": "1", "unit": "whole" },
      { "name": "garlic", "amount": "4", "unit": "cloves" },
      { "name": "cumin", "amount": "2", "unit": "tsp" },
      { "name": "coriander", "amount": "1", "unit": "tsp" },
      { "name": "flour", "amount": "3", "unit": "tbsp" },
      { "name": "tahini", "amount": "1/4", "unit": "cups" }
    ],
    "steps": [
      "Process chickpeas, herbs, onion, garlic and spices. Add flour and mix.",
      "Form into balls and bake at 200°C for 20 min, or pan-fry.",
      "Serve in pita with tahini sauce."
    ],
    // chickpeas 2 cans (720), tahini ¼c (296), flour 3 tbsp (85) = 1101 ÷ 3
    "nutrition": { "calories": 367, "protein": 18, "carbs": 46, "fat": 14, "fiber": 11 }
  },
  "Kale Salad": {
    "title": "Massaged Kale Salad",
    "prepTime": "15 min",
    "cookTime": "0 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "high-fiber"],
    "ingredients": [
      { "name": "kale", "amount": "4", "unit": "cups" },
      { "name": "lemon juice", "amount": "3", "unit": "tbsp" },
      { "name": "olive oil", "amount": "2", "unit": "tbsp" },
      { "name": "avocado", "amount": "1", "unit": "whole" },
      { "name": "sunflower seeds", "amount": "3", "unit": "tbsp" },
      { "name": "dried cranberries", "amount": "2", "unit": "tbsp" },
      { "name": "nutritional yeast", "amount": "2", "unit": "tbsp" }
    ],
    "steps": [
      "Massage kale with lemon juice and olive oil for 3 min until tender.",
      "Toss with remaining ingredients and serve immediately."
    ],
    // kale 4c (132), olive oil 2 tbsp (238), avocado (234), sunflower seeds 3 tbsp (165), cranberries (50), nooch (40) = 859 ÷ 2
    "nutrition": { "calories": 430, "protein": 10, "carbs": 28, "fat": 32, "fiber": 10 }
  },
  "Sesame Noodle": {
    "title": "Sesame Noodles",
    "prepTime": "10 min",
    "cookTime": "10 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["quick", "high-protein"],
    "ingredients": [
      { "name": "soba noodles", "amount": "200", "unit": "g" },
      { "name": "tahini", "amount": "3", "unit": "tbsp" },
      { "name": "sesame oil", "amount": "1", "unit": "tbsp" },
      { "name": "soy sauce", "amount": "3", "unit": "tbsp" },
      { "name": "lime juice", "amount": "2", "unit": "tbsp" },
      { "name": "ginger", "amount": "1", "unit": "tbsp" },
      { "name": "cucumber", "amount": "1", "unit": "whole" },
      { "name": "edamame", "amount": "1", "unit": "cups" },
      { "name": "sesame seeds", "amount": "2", "unit": "tbsp" }
    ],
    "steps": [
      "Cook noodles per package. Rinse cold.",
      "Whisk tahini, sesame oil, soy sauce, lime and ginger into sauce.",
      "Toss noodles with sauce. Top with cucumber, edamame and seeds."
    ],
    // soba 200g dry (680), tahini 3 tbsp (222), sesame oil (119), edamame 1c (189), sesame seeds 2 tbsp (100) = 1310 ÷ 2
    "nutrition": { "calories": 480, "protein": 22, "carbs": 66, "fat": 16, "fiber": 8 }
  },
  "Black Eyed Peas and Collards": {
    "title": "Black Eyed Peas & Collard Greens",
    "prepTime": "10 min",
    "cookTime": "35 min",
    "servings": 4,
    "difficulty": "Easy",
    "tags": ["high-protein", "high-fiber", "gluten-free"],
    "ingredients": [
      { "name": "black eyed peas", "amount": "2", "unit": "cans" },
      { "name": "collard greens", "amount": "1", "unit": "bunch" },
      { "name": "onion", "amount": "1", "unit": "whole" },
      { "name": "garlic", "amount": "4", "unit": "cloves" },
      { "name": "smoked paprika", "amount": "1", "unit": "tsp" },
      { "name": "vegetable broth", "amount": "2", "unit": "cups" },
      { "name": "apple cider vinegar", "amount": "1", "unit": "tbsp" },
      { "name": "hot sauce", "amount": "1", "unit": "tsp" }
    ],
    "steps": [
      "Sauté onion and garlic. Add collard greens and broth. Simmer 20 min until tender.",
      "Add black eyed peas and spices. Simmer 10 min more.",
      "Stir in vinegar and hot sauce. Serve hot."
    ],
    // black eyed peas 2 cans (~720), collards 1 bunch (100) = 820 ÷ 4 → but let's be more accurate: BEP 2 cans = 800g drained ~656 cal, 44P, 120C, 4F, 32 fiber + collards (100 cal, 9P, 18C) = 756 ÷ 4
    "nutrition": { "calories": 284, "protein": 16, "carbs": 50, "fat": 2, "fiber": 13 }
  },
  "Apple with Peanut Butter": {
    "title": "Apple with Peanut Butter",
    "prepTime": "2 min",
    "cookTime": "0 min",
    "servings": 1,
    "difficulty": "Easy",
    "tags": ["quick", "raw"],
    "ingredients": [
      { "name": "apple", "amount": "1", "unit": "whole" },
      { "name": "peanut butter", "amount": "2", "unit": "tbsp" }
    ],
    "steps": [
      "Slice apple and serve with peanut butter for dipping."
    ],
    // apple medium (95), PB 2 tbsp (188) = 283 cal, 8.5P, 31.9C, 16.3F, 6.3fiber
    "nutrition": { "calories": 283, "protein": 8, "carbs": 32, "fat": 16, "fiber": 6 }
  },
  "Handful Almonds + Dark Chocolate": {
    "title": "Almonds & Dark Chocolate",
    "prepTime": "1 min",
    "cookTime": "0 min",
    "servings": 1,
    "difficulty": "Easy",
    "tags": ["quick", "raw"],
    "ingredients": [
      { "name": "almonds", "amount": "1/4", "unit": "cups" },
      { "name": "dark chocolate (70%+)", "amount": "2", "unit": "squares" }
    ],
    "steps": [
      "Enjoy a balanced mix of healthy fats and antioxidants."
    ],
    // almonds ¼ cup (207), dark choc 2 squares ~20g (110) = 317 cal, 8P, 14C, 26F, 4fiber
    "nutrition": { "calories": 317, "protein": 8, "carbs": 14, "fat": 26, "fiber": 4 }
  },
  "Hummus with Veggies": {
    "title": "Hummus with Veggies",
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 1,
    "difficulty": "Easy",
    "tags": ["quick", "raw", "light"],
    "ingredients": [
      { "name": "hummus", "amount": "1/2", "unit": "cups" },
      { "name": "carrots", "amount": "2", "unit": "whole" },
      { "name": "celery", "amount": "2", "unit": "stalks" },
      { "name": "cucumber", "amount": "1/2", "unit": "whole" }
    ],
    "steps": [
      "Cut veggies into sticks and serve with hummus."
    ],
    // hummus ½c (200), carrots 2 (50), celery (12), cucumber ½ (8) = 270 cal, 10P, 26C, 14F, 9fiber
    "nutrition": { "calories": 270, "protein": 10, "carbs": 26, "fat": 14, "fiber": 9 }
  },
  "Edamame (1 cup)": {
    "title": "Steamed Edamame",
    "prepTime": "2 min",
    "cookTime": "5 min",
    "servings": 1,
    "difficulty": "Easy",
    "tags": ["quick", "high-protein"],
    "ingredients": [
      { "name": "edamame (in pods)", "amount": "1", "unit": "cups" },
      { "name": "sea salt", "amount": "1", "unit": "pinch" }
    ],
    "steps": [
      "Steam edamame for 5 minutes. Toss with sea salt and serve."
    ],
    "nutrition": { "calories": 189, "protein": 17, "carbs": 14, "fat": 8, "fiber": 8 }
  },

  "Raw Tacos": {
    "title": "Raw Walnut Tacos",
    "prepTime": "15 min",
    "cookTime": "0 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "low-carb"],
    "ingredients": [
      { "name": "walnuts", "amount": "1.5", "unit": "cups" },
      { "name": "tamari", "amount": "2", "unit": "tbsp" },
      { "name": "cumin", "amount": "1", "unit": "tsp" },
      { "name": "smoked paprika", "amount": "1", "unit": "tsp" },
      { "name": "butter lettuce leaves", "amount": "8", "unit": "whole" },
      { "name": "avocado", "amount": "1", "unit": "whole" },
      { "name": "tomato", "amount": "2", "unit": "whole" },
      { "name": "lime", "amount": "1", "unit": "whole" },
      { "name": "cilantro", "amount": "1/4", "unit": "cups" }
    ],
    "steps": [
      "Pulse walnuts with tamari, cumin and paprika in a food processor until crumbly.",
      "Dice tomato and avocado. Juice lime.",
      "Fill lettuce cups with walnut meat, avocado, tomato and cilantro."
    ],
    "nutrition": { "calories": 380, "protein": 10, "carbs": 18, "fat": 32, "fiber": 8 }
  },

  "Raw Corn Cakes": {
    "title": "Raw Corn Cakes",
    "prepTime": "20 min",
    "cookTime": "0 min",
    "servings": 3,
    "difficulty": "Medium",
    "tags": ["raw", "gluten-free"],
    "ingredients": [
      { "name": "fresh corn kernels", "amount": "3", "unit": "cups" },
      { "name": "flax meal", "amount": "3", "unit": "tbsp" },
      { "name": "red onion", "amount": "1/4", "unit": "whole" },
      { "name": "jalapeño", "amount": "1", "unit": "whole" },
      { "name": "cilantro", "amount": "1/4", "unit": "cups" },
      { "name": "lime juice", "amount": "2", "unit": "tbsp" },
      { "name": "avocado", "amount": "1", "unit": "whole" }
    ],
    "steps": [
      "Blend 2 cups corn with flax meal into a thick batter.",
      "Stir in remaining corn, onion, jalapeño and cilantro.",
      "Form into patties and dehydrate 2 hours, or serve chilled. Top with avocado."
    ],
    "nutrition": { "calories": 280, "protein": 7, "carbs": 42, "fat": 11, "fiber": 9 }
  },

  "Heirloom Caprese": {
    "title": "Heirloom Tomato Caprese",
    "prepTime": "10 min",
    "cookTime": "0 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "light"],
    "ingredients": [
      { "name": "heirloom tomatoes", "amount": "3", "unit": "whole" },
      { "name": "fresh basil", "amount": "1/2", "unit": "cups" },
      { "name": "cashew mozzarella", "amount": "150", "unit": "g" },
      { "name": "extra-virgin olive oil", "amount": "2", "unit": "tbsp" },
      { "name": "balsamic glaze", "amount": "1", "unit": "tbsp" },
      { "name": "flaky sea salt", "amount": "1", "unit": "pinch" }
    ],
    "steps": [
      "Slice tomatoes and cashew mozzarella into 1cm rounds.",
      "Alternate on a platter with basil leaves.",
      "Drizzle with olive oil and balsamic. Finish with flaky salt."
    ],
    "nutrition": { "calories": 290, "protein": 7, "carbs": 14, "fat": 23, "fiber": 3 }
  },

  "Asian Cucumber Salad": {
    "title": "Asian Cucumber Salad",
    "prepTime": "10 min",
    "cookTime": "0 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "light", "quick"],
    "ingredients": [
      { "name": "English cucumbers", "amount": "2", "unit": "whole" },
      { "name": "rice vinegar", "amount": "3", "unit": "tbsp" },
      { "name": "sesame oil", "amount": "1", "unit": "tbsp" },
      { "name": "tamari", "amount": "1", "unit": "tbsp" },
      { "name": "maple syrup", "amount": "1", "unit": "tsp" },
      { "name": "chili flakes", "amount": "1/2", "unit": "tsp" },
      { "name": "sesame seeds", "amount": "2", "unit": "tbsp" },
      { "name": "green onions", "amount": "3", "unit": "whole" }
    ],
    "steps": [
      "Smash cucumbers with the flat of a knife, then tear into pieces.",
      "Whisk vinegar, sesame oil, tamari, maple and chili together.",
      "Toss cucumbers in dressing. Top with sesame seeds and green onion."
    ],
    "nutrition": { "calories": 130, "protein": 4, "carbs": 12, "fat": 8, "fiber": 2 }
  },

  "Cobb Salad": {
    "title": "Vegan Cobb Salad",
    "prepTime": "15 min",
    "cookTime": "0 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["high-protein", "gluten-free"],
    "ingredients": [
      { "name": "romaine lettuce", "amount": "4", "unit": "cups" },
      { "name": "chickpeas (roasted)", "amount": "1", "unit": "cups" },
      { "name": "avocado", "amount": "1", "unit": "whole" },
      { "name": "cherry tomatoes", "amount": "1", "unit": "cups" },
      { "name": "corn", "amount": "1/2", "unit": "cups" },
      { "name": "cucumber", "amount": "1", "unit": "whole" },
      { "name": "red onion", "amount": "1/4", "unit": "whole" },
      { "name": "tahini dressing", "amount": "4", "unit": "tbsp" }
    ],
    "steps": [
      "Arrange lettuce in a large bowl as the base.",
      "Lay ingredients in rows: chickpeas, avocado, tomatoes, corn, cucumber and onion.",
      "Drizzle tahini dressing over the top."
    ],
    "nutrition": { "calories": 420, "protein": 16, "carbs": 44, "fat": 22, "fiber": 14 }
  },

  "Taco Salad": {
    "title": "Vegan Taco Salad",
    "prepTime": "15 min",
    "cookTime": "10 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["high-protein", "gluten-free"],
    "ingredients": [
      { "name": "romaine lettuce", "amount": "4", "unit": "cups" },
      { "name": "black beans", "amount": "1", "unit": "cans" },
      { "name": "corn tortilla chips", "amount": "2", "unit": "cups" },
      { "name": "cherry tomatoes", "amount": "1", "unit": "cups" },
      { "name": "avocado", "amount": "1", "unit": "whole" },
      { "name": "salsa", "amount": "1/2", "unit": "cups" },
      { "name": "lime", "amount": "1", "unit": "whole" },
      { "name": "cumin", "amount": "1", "unit": "tsp" }
    ],
    "steps": [
      "Season and warm black beans with cumin.",
      "Arrange lettuce in bowls. Top with beans, chips, tomatoes and avocado.",
      "Spoon over salsa and squeeze lime juice to finish."
    ],
    "nutrition": { "calories": 460, "protein": 16, "carbs": 62, "fat": 18, "fiber": 16 }
  },

  "Raw Fried Rice": {
    "title": "Raw Cauliflower Fried Rice",
    "prepTime": "20 min",
    "cookTime": "0 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "low-carb"],
    "ingredients": [
      { "name": "cauliflower", "amount": "1", "unit": "heads" },
      { "name": "frozen peas (thawed)", "amount": "1", "unit": "cups" },
      { "name": "carrots", "amount": "2", "unit": "whole" },
      { "name": "tamari", "amount": "3", "unit": "tbsp" },
      { "name": "sesame oil", "amount": "1", "unit": "tbsp" },
      { "name": "ginger", "amount": "1", "unit": "tbsp" },
      { "name": "garlic", "amount": "2", "unit": "cloves" },
      { "name": "green onions", "amount": "4", "unit": "whole" }
    ],
    "steps": [
      "Pulse cauliflower into rice-sized pieces.",
      "Dice carrots finely. Mix tamari, sesame oil, ginger and garlic.",
      "Toss cauliflower, peas and carrots in sauce. Top with green onion."
    ],
    "nutrition": { "calories": 180, "protein": 9, "carbs": 28, "fat": 5, "fiber": 8 }
  },

  "Zucchini Noodle Pesto": {
    "title": "Zucchini Noodles with Pesto",
    "prepTime": "15 min",
    "cookTime": "0 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "low-carb"],
    "ingredients": [
      { "name": "zucchini", "amount": "3", "unit": "whole" },
      { "name": "fresh basil", "amount": "2", "unit": "cups" },
      { "name": "pine nuts", "amount": "1/3", "unit": "cups" },
      { "name": "garlic", "amount": "2", "unit": "cloves" },
      { "name": "lemon juice", "amount": "2", "unit": "tbsp" },
      { "name": "olive oil", "amount": "3", "unit": "tbsp" },
      { "name": "nutritional yeast", "amount": "2", "unit": "tbsp" },
      { "name": "cherry tomatoes", "amount": "1", "unit": "cups" }
    ],
    "steps": [
      "Spiralize zucchini into noodles.",
      "Blend basil, pine nuts, garlic, lemon, olive oil and nutritional yeast into pesto.",
      "Toss noodles in pesto, top with halved cherry tomatoes."
    ],
    "nutrition": { "calories": 320, "protein": 9, "carbs": 16, "fat": 26, "fiber": 5 }
  },

  "Zucchini Noodle Red Sauce": {
    "title": "Zucchini Noodles in Marinara",
    "prepTime": "10 min",
    "cookTime": "15 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["gluten-free", "low-carb", "oil-free"],
    "ingredients": [
      { "name": "zucchini", "amount": "3", "unit": "whole" },
      { "name": "crushed tomatoes", "amount": "1", "unit": "cans" },
      { "name": "garlic", "amount": "4", "unit": "cloves" },
      { "name": "onion", "amount": "1", "unit": "whole" },
      { "name": "fresh basil", "amount": "1/4", "unit": "cups" },
      { "name": "oregano", "amount": "1", "unit": "tsp" },
      { "name": "nutritional yeast", "amount": "2", "unit": "tbsp" }
    ],
    "steps": [
      "Sauté onion and garlic until soft. Add crushed tomatoes, oregano and basil. Simmer 12 minutes.",
      "Spiralize zucchini. Warm briefly in a dry pan for 1–2 minutes.",
      "Top noodles with marinara and nutritional yeast."
    ],
    "nutrition": { "calories": 190, "protein": 10, "carbs": 32, "fat": 2, "fiber": 8 }
  },

  "Fruit Breakfast Bars": {
    "title": "Fruit & Oat Breakfast Bars",
    "prepTime": "10 min",
    "cookTime": "25 min",
    "servings": 8,
    "difficulty": "Easy",
    "tags": ["gluten-free", "oil-free", "high-fiber"],
    "ingredients": [
      { "name": "rolled oats", "amount": "2", "unit": "cups" },
      { "name": "ripe bananas", "amount": "2", "unit": "whole" },
      { "name": "mixed berries", "amount": "1", "unit": "cups" },
      { "name": "almond butter", "amount": "3", "unit": "tbsp" },
      { "name": "maple syrup", "amount": "2", "unit": "tbsp" },
      { "name": "cinnamon", "amount": "1", "unit": "tsp" },
      { "name": "chia seeds", "amount": "2", "unit": "tbsp" }
    ],
    "steps": [
      "Mash bananas. Mix with oats, almond butter, maple syrup, chia and cinnamon.",
      "Fold in berries. Press into a lined 8×8 pan.",
      "Bake at 180°C for 22–25 min. Cool fully before slicing into 8 bars."
    ],
    "nutrition": { "calories": 195, "protein": 5, "carbs": 32, "fat": 6, "fiber": 5 }
  },

  "Nori Wrap": {
    "title": "Nori Hand Roll",
    "prepTime": "15 min",
    "cookTime": "0 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "light"],
    "ingredients": [
      { "name": "nori sheets", "amount": "4", "unit": "whole" },
      { "name": "cauliflower rice", "amount": "2", "unit": "cups" },
      { "name": "avocado", "amount": "1", "unit": "whole" },
      { "name": "cucumber", "amount": "1", "unit": "whole" },
      { "name": "carrot", "amount": "1", "unit": "whole" },
      { "name": "tamari", "amount": "2", "unit": "tbsp" },
      { "name": "sesame seeds", "amount": "1", "unit": "tbsp" }
    ],
    "steps": [
      "Pulse cauliflower into rice. Season with a splash of rice vinegar.",
      "Cut avocado, cucumber and carrot into matchsticks.",
      "Lay nori flat, add a thin layer of cauli-rice, top with fillings and roll into a cone."
    ],
    "nutrition": { "calories": 220, "protein": 7, "carbs": 22, "fat": 12, "fiber": 7 }
  },

  "Poke Bowl": {
    "title": "Vegan Poke Bowl",
    "prepTime": "15 min",
    "cookTime": "20 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["high-protein", "gluten-free"],
    "ingredients": [
      { "name": "sushi rice", "amount": "1", "unit": "cups" },
      { "name": "watermelon (cubed)", "amount": "2", "unit": "cups" },
      { "name": "tamari", "amount": "3", "unit": "tbsp" },
      { "name": "sesame oil", "amount": "1", "unit": "tbsp" },
      { "name": "avocado", "amount": "1", "unit": "whole" },
      { "name": "edamame", "amount": "1", "unit": "cups" },
      { "name": "cucumber", "amount": "1", "unit": "whole" },
      { "name": "pickled ginger", "amount": "2", "unit": "tbsp" },
      { "name": "sesame seeds", "amount": "1", "unit": "tbsp" }
    ],
    "steps": [
      "Cook rice. Marinate watermelon cubes in tamari and sesame oil for 10 min.",
      "Assemble bowls: rice base, watermelon 'tuna', edamame, avocado and cucumber.",
      "Top with pickled ginger and sesame seeds."
    ],
    "nutrition": { "calories": 490, "protein": 14, "carbs": 74, "fat": 14, "fiber": 8 }
  },

  "Nachos": {
    "title": "Loaded Vegan Nachos",
    "prepTime": "10 min",
    "cookTime": "15 min",
    "servings": 3,
    "difficulty": "Easy",
    "tags": ["quick", "spicy"],
    "ingredients": [
      { "name": "corn tortilla chips", "amount": "4", "unit": "cups" },
      { "name": "black beans", "amount": "1", "unit": "cans" },
      { "name": "cashew queso", "amount": "1/2", "unit": "cups" },
      { "name": "jalapeños", "amount": "3", "unit": "whole" },
      { "name": "avocado", "amount": "1", "unit": "whole" },
      { "name": "salsa", "amount": "1/2", "unit": "cups" },
      { "name": "lime", "amount": "1", "unit": "whole" },
      { "name": "cilantro", "amount": "1/4", "unit": "cups" }
    ],
    "steps": [
      "Spread chips on a large baking sheet. Scatter beans and jalapeños.",
      "Drizzle cashew queso over the top. Bake at 190°C for 12 min.",
      "Finish with avocado, salsa, cilantro and lime."
    ],
    "nutrition": { "calories": 480, "protein": 14, "carbs": 60, "fat": 22, "fiber": 12 }
  },

  "Arepas": {
    "title": "Vegan Arepas",
    "prepTime": "15 min",
    "cookTime": "20 min",
    "servings": 4,
    "difficulty": "Medium",
    "tags": ["gluten-free", "high-protein"],
    "ingredients": [
      { "name": "pre-cooked cornmeal (masarepa)", "amount": "2", "unit": "cups" },
      { "name": "warm water", "amount": "2.5", "unit": "cups" },
      { "name": "salt", "amount": "1", "unit": "tsp" },
      { "name": "black beans", "amount": "1", "unit": "cans" },
      { "name": "avocado", "amount": "2", "unit": "whole" },
      { "name": "lime", "amount": "1", "unit": "whole" },
      { "name": "cilantro", "amount": "1/4", "unit": "cups" }
    ],
    "steps": [
      "Mix masarepa, water and salt. Knead until smooth. Rest 5 min.",
      "Form into discs and cook on a greased griddle 6 min per side until golden.",
      "Split open. Fill with warm beans, smashed avocado and cilantro."
    ],
    "nutrition": { "calories": 390, "protein": 12, "carbs": 62, "fat": 10, "fiber": 11 }
  },

  "Ravioli": {
    "title": "Cashew Ricotta Ravioli",
    "prepTime": "40 min",
    "cookTime": "10 min",
    "servings": 3,
    "difficulty": "Hard",
    "tags": ["high-protein"],
    "ingredients": [
      { "name": "pasta dough (semolina + water)", "amount": "300", "unit": "g" },
      { "name": "cashews (soaked)", "amount": "1.5", "unit": "cups" },
      { "name": "nutritional yeast", "amount": "3", "unit": "tbsp" },
      { "name": "lemon juice", "amount": "2", "unit": "tbsp" },
      { "name": "garlic", "amount": "2", "unit": "cloves" },
      { "name": "spinach", "amount": "2", "unit": "cups" },
      { "name": "marinara sauce", "amount": "1.5", "unit": "cups" }
    ],
    "steps": [
      "Blend soaked cashews, nooch, lemon and garlic into ricotta. Wilt spinach and fold in.",
      "Roll pasta thin, cut circles, fill with 1 tsp ricotta and seal edges with water.",
      "Boil ravioli 3–4 min. Serve with warmed marinara."
    ],
    "nutrition": { "calories": 510, "protein": 18, "carbs": 64, "fat": 20, "fiber": 5 }
  },

  "Zucchini Noodles": {
    "title": "Zucchini Noodles",
    "prepTime": "10 min",
    "cookTime": "5 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["gluten-free", "low-carb", "quick"],
    "ingredients": [
      { "name": "zucchini", "amount": "4", "unit": "whole" },
      { "name": "olive oil", "amount": "1", "unit": "tbsp" },
      { "name": "garlic", "amount": "3", "unit": "cloves" },
      { "name": "cherry tomatoes", "amount": "1", "unit": "cups" },
      { "name": "fresh basil", "amount": "1/4", "unit": "cups" },
      { "name": "nutritional yeast", "amount": "2", "unit": "tbsp" },
      { "name": "lemon", "amount": "1", "unit": "whole" }
    ],
    "steps": [
      "Spiralize zucchini into noodles.",
      "Sauté garlic in oil 1 min, add tomatoes and cook until blistered.",
      "Toss noodles in pan for 2 min. Top with basil, nutritional yeast and lemon zest."
    ],
    "nutrition": { "calories": 195, "protein": 9, "carbs": 20, "fat": 9, "fiber": 5 }
  },

  "Stuffed Mushroom": {
    "title": "Stuffed Portobello Mushrooms",
    "prepTime": "15 min",
    "cookTime": "25 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["gluten-free", "high-protein"],
    "ingredients": [
      { "name": "portobello mushrooms", "amount": "4", "unit": "whole" },
      { "name": "quinoa (cooked)", "amount": "1", "unit": "cups" },
      { "name": "sun-dried tomatoes", "amount": "1/4", "unit": "cups" },
      { "name": "spinach", "amount": "2", "unit": "cups" },
      { "name": "garlic", "amount": "3", "unit": "cloves" },
      { "name": "nutritional yeast", "amount": "3", "unit": "tbsp" },
      { "name": "olive oil", "amount": "1", "unit": "tbsp" }
    ],
    "steps": [
      "Remove mushroom stems, brush caps with oil and bake at 200°C for 10 min.",
      "Sauté garlic, add spinach until wilted, mix with quinoa, sun-dried tomatoes and nooch.",
      "Fill mushroom caps, bake another 12–15 min until golden."
    ],
    "nutrition": { "calories": 285, "protein": 16, "carbs": 34, "fat": 9, "fiber": 6 }
  },

  "Raw Buddha Bowl": {
    "title": "Raw Buddha Bowl",
    "prepTime": "20 min",
    "cookTime": "0 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free"],
    "ingredients": [
      { "name": "cauliflower rice", "amount": "2", "unit": "cups" },
      { "name": "shredded purple cabbage", "amount": "1", "unit": "cups" },
      { "name": "shredded carrots", "amount": "1", "unit": "cups" },
      { "name": "avocado", "amount": "1", "unit": "whole" },
      { "name": "chickpeas (raw sprouted)", "amount": "1", "unit": "cups" },
      { "name": "tahini", "amount": "3", "unit": "tbsp" },
      { "name": "lemon juice", "amount": "2", "unit": "tbsp" },
      { "name": "hemp seeds", "amount": "2", "unit": "tbsp" }
    ],
    "steps": [
      "Pulse cauliflower into rice in a food processor.",
      "Arrange in bowls with cabbage, carrots, avocado and chickpeas.",
      "Whisk tahini and lemon into a dressing. Drizzle over and top with hemp seeds."
    ],
    "nutrition": { "calories": 440, "protein": 18, "carbs": 38, "fat": 24, "fiber": 14 }
  },

  "Seasame Tofu": {
    "title": "Sesame Glazed Tofu",
    "prepTime": "10 min",
    "cookTime": "20 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["high-protein", "gluten-free"],
    "ingredients": [
      { "name": "extra-firm tofu", "amount": "400", "unit": "g" },
      { "name": "tamari", "amount": "3", "unit": "tbsp" },
      { "name": "sesame oil", "amount": "2", "unit": "tbsp" },
      { "name": "maple syrup", "amount": "1", "unit": "tbsp" },
      { "name": "rice vinegar", "amount": "1", "unit": "tbsp" },
      { "name": "garlic", "amount": "2", "unit": "cloves" },
      { "name": "sesame seeds", "amount": "2", "unit": "tbsp" },
      { "name": "jasmine rice", "amount": "1", "unit": "cups" }
    ],
    "steps": [
      "Press and cube tofu. Toss with tamari, sesame oil, maple and garlic.",
      "Bake at 200°C for 20 min, flipping halfway, until caramelised.",
      "Serve over rice. Garnish with sesame seeds."
    ],
    "nutrition": { "calories": 490, "protein": 28, "carbs": 52, "fat": 18, "fiber": 3 }
  },

  "Pesto Protein Pasta": {
    "title": "Pesto Protein Pasta",
    "prepTime": "10 min",
    "cookTime": "12 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["high-protein", "quick"],
    "ingredients": [
      { "name": "chickpea pasta", "amount": "200", "unit": "g" },
      { "name": "fresh basil pesto", "amount": "1/3", "unit": "cups" },
      { "name": "cherry tomatoes", "amount": "1", "unit": "cups" },
      { "name": "white beans", "amount": "1", "unit": "cups" },
      { "name": "spinach", "amount": "2", "unit": "cups" },
      { "name": "nutritional yeast", "amount": "2", "unit": "tbsp" },
      { "name": "lemon", "amount": "1", "unit": "whole" }
    ],
    "steps": [
      "Cook chickpea pasta per package. Reserve ¼ cup pasta water.",
      "Drain pasta; toss with pesto, white beans, spinach and tomatoes.",
      "Add pasta water to loosen. Top with nutritional yeast and lemon zest."
    ],
    "nutrition": { "calories": 540, "protein": 30, "carbs": 66, "fat": 16, "fiber": 12 }
  },

  "Tempeh Tacos al Pastor": {
    "title": "Tempeh Tacos al Pastor",
    "prepTime": "15 min",
    "cookTime": "15 min",
    "servings": 3,
    "difficulty": "Medium",
    "tags": ["high-protein", "spicy"],
    "ingredients": [
      { "name": "tempeh", "amount": "300", "unit": "g" },
      { "name": "achiote paste", "amount": "2", "unit": "tbsp" },
      { "name": "pineapple", "amount": "1", "unit": "cups" },
      { "name": "corn tortillas", "amount": "9", "unit": "whole" },
      { "name": "white onion", "amount": "1", "unit": "whole" },
      { "name": "cilantro", "amount": "1/2", "unit": "cups" },
      { "name": "lime", "amount": "2", "unit": "whole" },
      { "name": "orange juice", "amount": "1/3", "unit": "cups" }
    ],
    "steps": [
      "Crumble tempeh, marinate in achiote paste, OJ and pineapple juice for 10 min.",
      "Cook tempeh in a hot pan with pineapple chunks until caramelised.",
      "Fill tortillas with tempeh, top with onion, cilantro and lime."
    ],
    "nutrition": { "calories": 420, "protein": 24, "carbs": 52, "fat": 12, "fiber": 6 }
  },

  "Red Beans and Rice": {
    "title": "Red Beans and Rice",
    "prepTime": "10 min",
    "cookTime": "30 min",
    "servings": 4,
    "difficulty": "Easy",
    "tags": ["high-protein", "gluten-free", "oil-free"],
    "ingredients": [
      { "name": "kidney beans", "amount": "2", "unit": "cans" },
      { "name": "long-grain white rice", "amount": "1.5", "unit": "cups" },
      { "name": "celery", "amount": "3", "unit": "stalks" },
      { "name": "onion", "amount": "1", "unit": "whole" },
      { "name": "green pepper", "amount": "1", "unit": "whole" },
      { "name": "garlic", "amount": "4", "unit": "cloves" },
      { "name": "smoked paprika", "amount": "1", "unit": "tsp" },
      { "name": "thyme", "amount": "1", "unit": "tsp" },
      { "name": "vegetable broth", "amount": "2", "unit": "cups" }
    ],
    "steps": [
      "Sauté onion, celery, pepper and garlic until soft.",
      "Add beans, broth, paprika and thyme. Simmer 20 min, mashing some beans for creaminess.",
      "Serve over cooked rice."
    ],
    "nutrition": { "calories": 420, "protein": 18, "carbs": 78, "fat": 2, "fiber": 14 }
  },

  "Buffalo Tofu Taco": {
    "title": "Buffalo Tofu Tacos",
    "prepTime": "10 min",
    "cookTime": "20 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["high-protein", "spicy"],
    "ingredients": [
      { "name": "extra-firm tofu", "amount": "300", "unit": "g" },
      { "name": "buffalo sauce", "amount": "1/3", "unit": "cups" },
      { "name": "corn tortillas", "amount": "6", "unit": "whole" },
      { "name": "purple cabbage (shredded)", "amount": "1.5", "unit": "cups" },
      { "name": "avocado", "amount": "1", "unit": "whole" },
      { "name": "lime", "amount": "1", "unit": "whole" },
      { "name": "vegan ranch dressing", "amount": "3", "unit": "tbsp" }
    ],
    "steps": [
      "Cube tofu, toss in buffalo sauce, bake at 200°C for 20 min until crispy.",
      "Warm tortillas. Fill with buffalo tofu and shredded cabbage.",
      "Top with avocado slices, a drizzle of ranch and lime juice."
    ],
    "nutrition": { "calories": 420, "protein": 22, "carbs": 42, "fat": 18, "fiber": 8 }
  },

  "Lentil Shepherd's Pie": {
    "title": "Lentil Shepherd's Pie",
    "prepTime": "20 min",
    "cookTime": "45 min",
    "servings": 4,
    "difficulty": "Medium",
    "tags": ["high-protein", "high-fiber"],
    "ingredients": [
      { "name": "green lentils", "amount": "1.5", "unit": "cups" },
      { "name": "potatoes", "amount": "4", "unit": "whole" },
      { "name": "carrots", "amount": "2", "unit": "whole" },
      { "name": "peas", "amount": "1", "unit": "cups" },
      { "name": "onion", "amount": "1", "unit": "whole" },
      { "name": "vegetable broth", "amount": "2", "unit": "cups" },
      { "name": "tomato paste", "amount": "2", "unit": "tbsp" },
      { "name": "vegan butter", "amount": "2", "unit": "tbsp" },
      { "name": "oat milk", "amount": "1/3", "unit": "cups" }
    ],
    "steps": [
      "Cook lentils with broth, carrots, onion, tomato paste and peas for 25 min.",
      "Boil and mash potatoes with butter and oat milk until fluffy.",
      "Top lentil filling with mashed potato, bake at 190°C for 20 min until golden."
    ],
    "nutrition": { "calories": 460, "protein": 22, "carbs": 78, "fat": 7, "fiber": 18 }
  },

  "BBQ Bowl": {
    "title": "BBQ Jackfruit Bowl",
    "prepTime": "10 min",
    "cookTime": "25 min",
    "servings": 3,
    "difficulty": "Easy",
    "tags": ["gluten-free", "high-fiber"],
    "ingredients": [
      { "name": "young green jackfruit (canned)", "amount": "2", "unit": "cans" },
      { "name": "BBQ sauce", "amount": "1/2", "unit": "cups" },
      { "name": "brown rice (cooked)", "amount": "2", "unit": "cups" },
      { "name": "coleslaw mix", "amount": "2", "unit": "cups" },
      { "name": "apple cider vinegar", "amount": "1", "unit": "tbsp" },
      { "name": "red onion", "amount": "1/2", "unit": "whole" },
      { "name": "corn", "amount": "1", "unit": "cups" }
    ],
    "steps": [
      "Drain and shred jackfruit. Cook with BBQ sauce on medium heat 20 min.",
      "Toss coleslaw with vinegar and a pinch of salt.",
      "Build bowls: rice, BBQ jackfruit, slaw, corn and red onion."
    ],
    "nutrition": { "calories": 410, "protein": 8, "carbs": 80, "fat": 4, "fiber": 10 }
  },

  "Sushi Bowl": {
    "title": "Sushi Bowl",
    "prepTime": "15 min",
    "cookTime": "20 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["gluten-free", "quick"],
    "ingredients": [
      { "name": "sushi rice", "amount": "1.5", "unit": "cups" },
      { "name": "rice vinegar", "amount": "2", "unit": "tbsp" },
      { "name": "avocado", "amount": "1", "unit": "whole" },
      { "name": "edamame", "amount": "1", "unit": "cups" },
      { "name": "cucumber", "amount": "1", "unit": "whole" },
      { "name": "shredded carrot", "amount": "1", "unit": "cups" },
      { "name": "nori sheets (crumbled)", "amount": "2", "unit": "whole" },
      { "name": "tamari", "amount": "2", "unit": "tbsp" },
      { "name": "sesame seeds", "amount": "1", "unit": "tbsp" }
    ],
    "steps": [
      "Cook and season rice with vinegar. Cool slightly.",
      "Slice avocado and cucumber.",
      "Build bowls: rice, avocado, edamame, cucumber, carrot and nori. Drizzle tamari and sesame."
    ],
    "nutrition": { "calories": 510, "protein": 16, "carbs": 86, "fat": 11, "fiber": 8 }
  },

  "Dirty Mac": {
    "title": "Vegan Dirty Mac & Cheese",
    "prepTime": "10 min",
    "cookTime": "20 min",
    "servings": 3,
    "difficulty": "Easy",
    "tags": ["high-protein", "quick"],
    "ingredients": [
      { "name": "elbow macaroni", "amount": "300", "unit": "g" },
      { "name": "cashews (soaked)", "amount": "1", "unit": "cups" },
      { "name": "nutritional yeast", "amount": "4", "unit": "tbsp" },
      { "name": "plant milk", "amount": "1", "unit": "cups" },
      { "name": "garlic powder", "amount": "1", "unit": "tsp" },
      { "name": "smoked paprika", "amount": "1", "unit": "tsp" },
      { "name": "lemon juice", "amount": "1", "unit": "tbsp" },
      { "name": "jalapeños", "amount": "2", "unit": "whole" },
      { "name": "black beans", "amount": "1", "unit": "cups" }
    ],
    "steps": [
      "Cook macaroni per package.",
      "Blend cashews, nooch, plant milk, garlic, paprika and lemon into a smooth cheese sauce.",
      "Toss pasta in sauce with black beans and jalapeños. Serve hot."
    ],
    "nutrition": { "calories": 560, "protein": 22, "carbs": 74, "fat": 18, "fiber": 8 }
  },

  "Burgers": {
    "title": "Black Bean Burgers",
    "prepTime": "15 min",
    "cookTime": "15 min",
    "servings": 4,
    "difficulty": "Medium",
    "tags": ["high-protein"],
    "ingredients": [
      { "name": "black beans", "amount": "2", "unit": "cans" },
      { "name": "oats", "amount": "1/2", "unit": "cups" },
      { "name": "flax egg (1 tbsp flax + 3 tbsp water)", "amount": "1", "unit": "whole" },
      { "name": "onion", "amount": "1/2", "unit": "whole" },
      { "name": "garlic", "amount": "2", "unit": "cloves" },
      { "name": "smoked paprika", "amount": "1", "unit": "tsp" },
      { "name": "cumin", "amount": "1", "unit": "tsp" },
      { "name": "burger buns", "amount": "4", "unit": "whole" },
      { "name": "lettuce, tomato, avocado", "amount": "1", "unit": "serving" }
    ],
    "steps": [
      "Mash drained black beans. Mix with oats, flax egg, onion, garlic and spices.",
      "Form 4 patties. Pan-fry or grill 5–6 min per side until firm.",
      "Serve in buns with all the fixings."
    ],
    "nutrition": { "calories": 430, "protein": 18, "carbs": 66, "fat": 10, "fiber": 14 }
  },

  "Risotto": {
    "title": "Mushroom Risotto",
    "prepTime": "10 min",
    "cookTime": "35 min",
    "servings": 3,
    "difficulty": "Medium",
    "tags": ["gluten-free", "high-fiber"],
    "ingredients": [
      { "name": "arborio rice", "amount": "1.5", "unit": "cups" },
      { "name": "mushrooms", "amount": "400", "unit": "g" },
      { "name": "vegetable broth", "amount": "4", "unit": "cups" },
      { "name": "white wine (optional)", "amount": "1/2", "unit": "cups" },
      { "name": "onion", "amount": "1", "unit": "whole" },
      { "name": "garlic", "amount": "4", "unit": "cloves" },
      { "name": "nutritional yeast", "amount": "3", "unit": "tbsp" },
      { "name": "fresh thyme", "amount": "1", "unit": "tsp" },
      { "name": "vegan butter", "amount": "1", "unit": "tbsp" }
    ],
    "steps": [
      "Sauté onion and garlic in butter. Add mushrooms, cook until golden.",
      "Add rice, toast 1 min. Add wine, then add warm broth one ladle at a time, stirring.",
      "After 25–30 min, stir in nutritional yeast, thyme and season generously."
    ],
    "nutrition": { "calories": 420, "protein": 12, "carbs": 70, "fat": 8, "fiber": 5 }
  },

  "Crab Cakes": {
    "title": "Hearts of Palm Crab Cakes",
    "prepTime": "20 min",
    "cookTime": "15 min",
    "servings": 3,
    "difficulty": "Medium",
    "tags": ["gluten-free", "high-protein"],
    "ingredients": [
      { "name": "hearts of palm (canned)", "amount": "2", "unit": "cans" },
      { "name": "chickpea flour", "amount": "3", "unit": "tbsp" },
      { "name": "old bay seasoning", "amount": "2", "unit": "tsp" },
      { "name": "celery", "amount": "2", "unit": "stalks" },
      { "name": "green onions", "amount": "3", "unit": "whole" },
      { "name": "Dijon mustard", "amount": "1", "unit": "tbsp" },
      { "name": "vegan mayo", "amount": "3", "unit": "tbsp" },
      { "name": "lemon", "amount": "1", "unit": "whole" }
    ],
    "steps": [
      "Shred hearts of palm with forks into flaky pieces.",
      "Mix with all remaining ingredients. Form into 6 cakes.",
      "Pan-fry in a lightly oiled skillet 5 min per side. Serve with lemon wedges."
    ],
    "nutrition": { "calories": 220, "protein": 8, "carbs": 24, "fat": 10, "fiber": 5 }
  },

  "Spicy Cauliflower": {
    "title": "Spicy Roasted Cauliflower",
    "prepTime": "10 min",
    "cookTime": "30 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["gluten-free", "spicy", "low-carb"],
    "ingredients": [
      { "name": "cauliflower", "amount": "1", "unit": "heads" },
      { "name": "sriracha", "amount": "3", "unit": "tbsp" },
      { "name": "maple syrup", "amount": "2", "unit": "tbsp" },
      { "name": "tamari", "amount": "1", "unit": "tbsp" },
      { "name": "garlic powder", "amount": "1", "unit": "tsp" },
      { "name": "sesame seeds", "amount": "1", "unit": "tbsp" },
      { "name": "jasmine rice", "amount": "1", "unit": "cups" }
    ],
    "steps": [
      "Cut cauliflower into florets. Whisk sriracha, maple, tamari and garlic together.",
      "Toss florets in sauce, spread on a baking sheet.",
      "Roast at 220°C for 25–30 min until charred at edges. Serve over rice with sesame seeds."
    ],
    "nutrition": { "calories": 370, "protein": 10, "carbs": 68, "fat": 6, "fiber": 8 }
  },

  "Burrito": {
    "title": "Vegan Burrito",
    "prepTime": "15 min",
    "cookTime": "15 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["high-protein"],
    "ingredients": [
      { "name": "large flour tortillas", "amount": "2", "unit": "whole" },
      { "name": "black beans", "amount": "1", "unit": "cans" },
      { "name": "brown rice (cooked)", "amount": "1", "unit": "cups" },
      { "name": "corn", "amount": "1/2", "unit": "cups" },
      { "name": "avocado", "amount": "1", "unit": "whole" },
      { "name": "salsa", "amount": "1/2", "unit": "cups" },
      { "name": "lime", "amount": "1", "unit": "whole" },
      { "name": "cilantro", "amount": "1/4", "unit": "cups" }
    ],
    "steps": [
      "Warm beans and corn with cumin and salt.",
      "Warm tortillas. Layer rice, beans, corn, avocado and salsa down the centre.",
      "Add cilantro and lime juice. Roll tightly, tucking in sides."
    ],
    "nutrition": { "calories": 540, "protein": 18, "carbs": 86, "fat": 14, "fiber": 16 }
  },

  "Buffalo Cauliflower Tacos": {
    "title": "Buffalo Cauliflower Tacos",
    "prepTime": "10 min",
    "cookTime": "25 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["spicy", "quick"],
    "ingredients": [
      { "name": "cauliflower", "amount": "1", "unit": "heads" },
      { "name": "buffalo sauce", "amount": "1/3", "unit": "cups" },
      { "name": "corn tortillas", "amount": "6", "unit": "whole" },
      { "name": "purple cabbage (shredded)", "amount": "1.5", "unit": "cups" },
      { "name": "avocado", "amount": "1", "unit": "whole" },
      { "name": "lime", "amount": "1", "unit": "whole" },
      { "name": "vegan ranch dressing", "amount": "3", "unit": "tbsp" }
    ],
    "steps": [
      "Toss cauliflower florets in buffalo sauce. Roast at 220°C for 20–25 min.",
      "Warm tortillas. Fill with roasted cauliflower and purple cabbage.",
      "Top with avocado, drizzle ranch and squeeze lime."
    ],
    "nutrition": { "calories": 340, "protein": 10, "carbs": 48, "fat": 14, "fiber": 10 }
  },

  "Roast Beet Fennel Arugula Salad": {
    "title": "Roasted Beet, Fennel & Arugula Salad",
    "prepTime": "15 min",
    "cookTime": "40 min",
    "servings": 2,
    "difficulty": "Medium",
    "tags": ["gluten-free", "raw"],
    "ingredients": [
      { "name": "beets", "amount": "3", "unit": "whole" },
      { "name": "fennel bulb", "amount": "1", "unit": "whole" },
      { "name": "arugula", "amount": "4", "unit": "cups" },
      { "name": "walnuts", "amount": "1/3", "unit": "cups" },
      { "name": "orange", "amount": "1", "unit": "whole" },
      { "name": "olive oil", "amount": "2", "unit": "tbsp" },
      { "name": "balsamic vinegar", "amount": "1", "unit": "tbsp" },
      { "name": "Dijon mustard", "amount": "1", "unit": "tsp" }
    ],
    "steps": [
      "Roast beets wrapped in foil at 200°C for 40 min. Cool, peel, slice.",
      "Thinly slice fennel. Segment orange.",
      "Arrange arugula, beets, fennel, walnuts and orange. Whisk dressing and drizzle."
    ],
    "nutrition": { "calories": 320, "protein": 8, "carbs": 30, "fat": 20, "fiber": 8 }
  },

  "Dates with Tahini": {
    "title": "Dates with Tahini",
    "prepTime": "3 min",
    "cookTime": "0 min",
    "servings": 1,
    "difficulty": "Easy",
    "tags": ["quick", "raw", "high-fiber"],
    "ingredients": [
      { "name": "Medjool dates", "amount": "3", "unit": "whole" },
      { "name": "tahini", "amount": "1", "unit": "tbsp" },
      { "name": "sea salt", "amount": "1", "unit": "pinch" }
    ],
    "steps": [
      "Pit dates and stuff each with about 1 tsp tahini.",
      "Finish with a flake of sea salt."
    ],
    "nutrition": { "calories": 220, "protein": 4, "carbs": 38, "fat": 8, "fiber": 4 }
  },

  "Avocado Rice Cakes": {
    "title": "Avocado Rice Cakes",
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 1,
    "difficulty": "Easy",
    "tags": ["quick", "gluten-free", "light"],
    "ingredients": [
      { "name": "plain rice cakes", "amount": "3", "unit": "whole" },
      { "name": "avocado", "amount": "1", "unit": "whole" },
      { "name": "lemon juice", "amount": "1", "unit": "tsp" },
      { "name": "chili flakes", "amount": "1", "unit": "pinch" },
      { "name": "everything bagel seasoning", "amount": "1", "unit": "tsp" }
    ],
    "steps": [
      "Mash avocado with lemon juice and a pinch of salt.",
      "Spread generously over rice cakes.",
      "Top with chili flakes and bagel seasoning."
    ],
    "nutrition": { "calories": 260, "protein": 4, "carbs": 24, "fat": 16, "fiber": 7 }
  },

  "Walnuts + Berries": {
    "title": "Walnuts & Fresh Berries",
    "prepTime": "2 min",
    "cookTime": "0 min",
    "servings": 1,
    "difficulty": "Easy",
    "tags": ["quick", "raw", "gluten-free"],
    "ingredients": [
      { "name": "walnuts", "amount": "1/4", "unit": "cups" },
      { "name": "mixed berries", "amount": "1", "unit": "cups" }
    ],
    "steps": [
      "Combine walnuts and fresh berries in a small bowl. Enjoy."
    ],
    "nutrition": { "calories": 240, "protein": 5, "carbs": 18, "fat": 18, "fiber": 5 }
  },

  "Trail Mix": {
    "title": "Vegan Trail Mix",
    "prepTime": "2 min",
    "cookTime": "0 min",
    "servings": 1,
    "difficulty": "Easy",
    "tags": ["quick", "raw", "high-protein"],
    "ingredients": [
      { "name": "almonds", "amount": "2", "unit": "tbsp" },
      { "name": "cashews", "amount": "2", "unit": "tbsp" },
      { "name": "pumpkin seeds", "amount": "1", "unit": "tbsp" },
      { "name": "dried cranberries", "amount": "1", "unit": "tbsp" },
      { "name": "dark chocolate chips", "amount": "1", "unit": "tbsp" }
    ],
    "steps": [
      "Combine all ingredients in a small bag or bowl. Mix and enjoy."
    ],
    "nutrition": { "calories": 275, "protein": 8, "carbs": 20, "fat": 18, "fiber": 3 }
  },

  "Vegan Protein Bar": {
    "title": "Vegan Protein Bar",
    "prepTime": "1 min",
    "cookTime": "0 min",
    "servings": 1,
    "difficulty": "Easy",
    "tags": ["quick", "high-protein"],
    "ingredients": [
      { "name": "plant-based protein bar", "amount": "1", "unit": "whole" }
    ],
    "steps": [
      "Unwrap and enjoy. Great post-workout or as a mid-day snack."
    ],
    "nutrition": { "calories": 200, "protein": 20, "carbs": 22, "fat": 7, "fiber": 4 }
  },

  "Celery with Peanut Butter": {
    "title": "Celery with Peanut Butter",
    "prepTime": "3 min",
    "cookTime": "0 min",
    "servings": 1,
    "difficulty": "Easy",
    "tags": ["quick", "raw", "gluten-free"],
    "ingredients": [
      { "name": "celery stalks", "amount": "4", "unit": "whole" },
      { "name": "natural peanut butter", "amount": "2", "unit": "tbsp" }
    ],
    "steps": [
      "Cut celery into sticks. Fill the groove of each with peanut butter. Enjoy."
    ],
    "nutrition": { "calories": 200, "protein": 7, "carbs": 8, "fat": 16, "fiber": 3 }
  },

  "Cashews (1 cup)": {
    "title": "Raw Cashews",
    "prepTime": "1 min",
    "cookTime": "0 min",
    "servings": 1,
    "difficulty": "Easy",
    "tags": ["quick", "raw", "gluten-free"],
    "ingredients": [
      { "name": "raw cashews", "amount": "1", "unit": "cups" }
    ],
    "steps": [
      "Portion into a bowl. Rich in healthy fats, magnesium and zinc."
    ],
    "nutrition": { "calories": 157, "protein": 5, "carbs": 9, "fat": 12, "fiber": 1 }
  },

  "Blueberries + Hemp Seeds": {
    "title": "Blueberries & Hemp Seeds",
    "prepTime": "2 min",
    "cookTime": "0 min",
    "servings": 1,
    "difficulty": "Easy",
    "tags": ["quick", "raw", "gluten-free", "high-protein"],
    "ingredients": [
      { "name": "fresh blueberries", "amount": "1", "unit": "cups" },
      { "name": "hemp seeds", "amount": "3", "unit": "tbsp" }
    ],
    "steps": [
      "Place blueberries in a bowl. Sprinkle hemp seeds over the top. Enjoy."
    ],
    "nutrition": { "calories": 215, "protein": 10, "carbs": 18, "fat": 11, "fiber": 4 }
  },

  "Larabar": {
    "title": "Larabar",
    "prepTime": "1 min",
    "cookTime": "0 min",
    "servings": 1,
    "difficulty": "Easy",
    "tags": ["quick", "raw", "gluten-free"],
    "ingredients": [
      { "name": "Larabar (any flavour)", "amount": "1", "unit": "whole" }
    ],
    "steps": [
      "Enjoy as a whole-food, date-based snack. Pairs well with herbal tea."
    ],
    "nutrition": { "calories": 200, "protein": 4, "carbs": 27, "fat": 10, "fiber": 4 }
  },

  "Almond Butter Toast": {
    "title": "Almond Butter Toast",
    "prepTime": "3 min",
    "cookTime": "2 min",
    "servings": 1,
    "difficulty": "Easy",
    "tags": ["quick", "high-protein"],
    "ingredients": [
      { "name": "whole-grain bread", "amount": "2", "unit": "slices" },
      { "name": "almond butter", "amount": "2", "unit": "tbsp" },
      { "name": "banana", "amount": "1/2", "unit": "whole" },
      { "name": "cinnamon", "amount": "1", "unit": "pinch" }
    ],
    "steps": [
      "Toast bread until golden.",
      "Spread almond butter on each slice. Top with sliced banana and a dash of cinnamon."
    ],
    "nutrition": { "calories": 350, "protein": 10, "carbs": 44, "fat": 16, "fiber": 6 }
  },

  "Fruit + Nut Mix": {
    "title": "Fruit & Nut Mix",
    "prepTime": "2 min",
    "cookTime": "0 min",
    "servings": 1,
    "difficulty": "Easy",
    "tags": ["quick", "raw", "gluten-free"],
    "ingredients": [
      { "name": "mixed nuts (almonds, walnuts, cashews)", "amount": "3", "unit": "tbsp" },
      { "name": "dried apricots", "amount": "3", "unit": "whole" },
      { "name": "dried cranberries", "amount": "1", "unit": "tbsp" },
      { "name": "pumpkin seeds", "amount": "1", "unit": "tbsp" }
    ],
    "steps": [
      "Combine all in a small bag or bowl. A perfect balanced on-the-go snack."
    ],
    "nutrition": { "calories": 230, "protein": 6, "carbs": 22, "fat": 14, "fiber": 3 }
  },

  // ── SALAD DRESSINGS ──────────────────────────────────────────────────────────

  "Classic Tahini Dressing": {
    "title": "Classic Tahini Dressing",
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 4,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "oil-free", "quick"],
    "ingredients": [
      { "name": "tahini", "amount": "3", "unit": "tbsp" },
      { "name": "lemon juice", "amount": "3", "unit": "tbsp" },
      { "name": "garlic", "amount": "1", "unit": "clove" },
      { "name": "water", "amount": "3", "unit": "tbsp" },
      { "name": "salt", "amount": "1/4", "unit": "tsp" },
      { "name": "cumin", "amount": "1/4", "unit": "tsp" }
    ],
    "steps": [
      "Whisk tahini, lemon juice and minced garlic together.",
      "Slowly add water until you reach a pourable consistency.",
      "Season with salt and cumin. Keeps refrigerated for 1 week."
    ],
    "nutrition": { "calories": 80, "protein": 3, "carbs": 4, "fat": 7, "fiber": 1 }
  },

  "Lemon Herb Vinaigrette": {
    "title": "Lemon Herb Vinaigrette",
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 6,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "quick"],
    "ingredients": [
      { "name": "lemon juice", "amount": "1/4", "unit": "cups" },
      { "name": "olive oil", "amount": "3", "unit": "tbsp" },
      { "name": "dijon mustard", "amount": "1", "unit": "tsp" },
      { "name": "fresh parsley", "amount": "2", "unit": "tbsp" },
      { "name": "fresh thyme", "amount": "1", "unit": "tsp" },
      { "name": "maple syrup", "amount": "1", "unit": "tsp" },
      { "name": "garlic", "amount": "1", "unit": "clove" }
    ],
    "steps": [
      "Blend or whisk all ingredients together until emulsified.",
      "Taste and adjust lemon/sweetness balance.",
      "Drizzle over any green salad or grain bowl."
    ],
    "nutrition": { "calories": 55, "protein": 0, "carbs": 2, "fat": 5, "fiber": 0 }
  },

  "Miso Ginger Dressing": {
    "title": "Miso Ginger Dressing",
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 6,
    "difficulty": "Easy",
    "tags": ["gluten-free", "quick"],
    "ingredients": [
      { "name": "white miso", "amount": "2", "unit": "tbsp" },
      { "name": "rice vinegar", "amount": "2", "unit": "tbsp" },
      { "name": "sesame oil", "amount": "1", "unit": "tbsp" },
      { "name": "fresh ginger", "amount": "1", "unit": "tbsp" },
      { "name": "tamari", "amount": "1", "unit": "tbsp" },
      { "name": "maple syrup", "amount": "1", "unit": "tsp" },
      { "name": "water", "amount": "2", "unit": "tbsp" }
    ],
    "steps": [
      "Whisk miso and rice vinegar until smooth — no lumps.",
      "Add remaining ingredients and whisk to combine.",
      "Perfect on Asian-style salads, slaws, or noodle bowls."
    ],
    "nutrition": { "calories": 40, "protein": 1, "carbs": 4, "fat": 2, "fiber": 0 }
  },

  "Avocado Green Goddess": {
    "title": "Avocado Green Goddess",
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 4,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "quick", "high-fiber"],
    "ingredients": [
      { "name": "ripe avocado", "amount": "1", "unit": "whole" },
      { "name": "lemon juice", "amount": "2", "unit": "tbsp" },
      { "name": "fresh basil", "amount": "1/4", "unit": "cups" },
      { "name": "fresh parsley", "amount": "2", "unit": "tbsp" },
      { "name": "garlic", "amount": "1", "unit": "clove" },
      { "name": "water", "amount": "1/4", "unit": "cups" },
      { "name": "salt", "amount": "1/4", "unit": "tsp" }
    ],
    "steps": [
      "Blend avocado, herbs, garlic and lemon juice until smooth.",
      "Add water to thin to desired consistency.",
      "Great as a dressing, dip or sauce."
    ],
    "nutrition": { "calories": 90, "protein": 1, "carbs": 5, "fat": 8, "fiber": 3 }
  },

  "Balsamic Fig Dressing": {
    "title": "Balsamic Fig Dressing",
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 6,
    "difficulty": "Easy",
    "tags": ["raw", "quick"],
    "ingredients": [
      { "name": "balsamic vinegar", "amount": "3", "unit": "tbsp" },
      { "name": "fig jam (vegan)", "amount": "2", "unit": "tbsp" },
      { "name": "olive oil", "amount": "2", "unit": "tbsp" },
      { "name": "dijon mustard", "amount": "1", "unit": "tsp" },
      { "name": "garlic", "amount": "1", "unit": "clove" },
      { "name": "black pepper", "amount": "1/4", "unit": "tsp" }
    ],
    "steps": [
      "Whisk or blend all ingredients until emulsified.",
      "Adjust sweetness with extra fig jam if desired.",
      "Excellent on arugula, roasted beet or grain salads."
    ],
    "nutrition": { "calories": 65, "protein": 0, "carbs": 7, "fat": 4, "fiber": 0 }
  },

  "Cashew Ranch Dressing": {
    "title": "Cashew Ranch Dressing",
    "prepTime": "10 min",
    "cookTime": "0 min",
    "servings": 8,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "quick"],
    "ingredients": [
      { "name": "raw cashews (soaked 2 hrs)", "amount": "1", "unit": "cups" },
      { "name": "water", "amount": "1/2", "unit": "cups" },
      { "name": "apple cider vinegar", "amount": "1", "unit": "tbsp" },
      { "name": "garlic powder", "amount": "1/2", "unit": "tsp" },
      { "name": "onion powder", "amount": "1/4", "unit": "tsp" },
      { "name": "dried dill", "amount": "1", "unit": "tsp" },
      { "name": "dried chives", "amount": "1", "unit": "tsp" },
      { "name": "salt", "amount": "1/2", "unit": "tsp" }
    ],
    "steps": [
      "Drain soaked cashews and blend with water until perfectly smooth.",
      "Add vinegar, garlic, onion powder, dill and chives.",
      "Blend again, season with salt. Refrigerate 30 min to thicken."
    ],
    "nutrition": { "calories": 95, "protein": 3, "carbs": 6, "fat": 7, "fiber": 1 }
  },

  "Turmeric Orange Dressing": {
    "title": "Turmeric Orange Dressing",
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 6,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "oil-free", "quick"],
    "ingredients": [
      { "name": "fresh orange juice", "amount": "1/4", "unit": "cups" },
      { "name": "tahini", "amount": "2", "unit": "tbsp" },
      { "name": "turmeric", "amount": "1/2", "unit": "tsp" },
      { "name": "ginger", "amount": "1/2", "unit": "tsp" },
      { "name": "apple cider vinegar", "amount": "1", "unit": "tbsp" },
      { "name": "maple syrup", "amount": "1", "unit": "tsp" },
      { "name": "black pepper", "amount": "1/8", "unit": "tsp" }
    ],
    "steps": [
      "Whisk all ingredients together until smooth.",
      "The black pepper activates turmeric's curcumin for maximum anti-inflammatory benefit.",
      "Delicious on roasted vegetable or grain salads."
    ],
    "nutrition": { "calories": 50, "protein": 2, "carbs": 5, "fat": 3, "fiber": 1 }
  },

  "Spicy Peanut Dressing": {
    "title": "Spicy Peanut Dressing",
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 6,
    "difficulty": "Easy",
    "tags": ["gluten-free", "quick", "spicy"],
    "ingredients": [
      { "name": "peanut butter", "amount": "3", "unit": "tbsp" },
      { "name": "lime juice", "amount": "2", "unit": "tbsp" },
      { "name": "tamari", "amount": "2", "unit": "tbsp" },
      { "name": "sriracha", "amount": "1", "unit": "tsp" },
      { "name": "maple syrup", "amount": "1", "unit": "tsp" },
      { "name": "ginger", "amount": "1", "unit": "tsp" },
      { "name": "warm water", "amount": "3", "unit": "tbsp" }
    ],
    "steps": [
      "Whisk peanut butter with lime juice and tamari until smooth.",
      "Add sriracha, maple syrup and ginger.",
      "Thin with warm water. Perfect for noodle salads, wraps or spring rolls."
    ],
    "nutrition": { "calories": 75, "protein": 3, "carbs": 5, "fat": 5, "fiber": 1 }
  },

  "Apple Cider Honey Mustard": {
    "title": "Apple Cider Honey Mustard",
    "prepTime": "3 min",
    "cookTime": "0 min",
    "servings": 8,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "oil-free", "quick"],
    "ingredients": [
      { "name": "dijon mustard", "amount": "3", "unit": "tbsp" },
      { "name": "apple cider vinegar", "amount": "2", "unit": "tbsp" },
      { "name": "maple syrup", "amount": "2", "unit": "tbsp" },
      { "name": "garlic powder", "amount": "1/4", "unit": "tsp" },
      { "name": "salt", "amount": "1/4", "unit": "tsp" }
    ],
    "steps": [
      "Whisk all ingredients together until smooth.",
      "Let sit 5 min for flavors to meld.",
      "Works brilliantly as a salad dressing or dipping sauce."
    ],
    "nutrition": { "calories": 25, "protein": 0, "carbs": 5, "fat": 1, "fiber": 0 }
  },

  "Raspberry Chia Vinaigrette": {
    "title": "Raspberry Chia Vinaigrette",
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 6,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "quick", "high-fiber"],
    "ingredients": [
      { "name": "fresh or frozen raspberries", "amount": "1/2", "unit": "cups" },
      { "name": "red wine vinegar", "amount": "2", "unit": "tbsp" },
      { "name": "olive oil", "amount": "2", "unit": "tbsp" },
      { "name": "maple syrup", "amount": "1", "unit": "tbsp" },
      { "name": "chia seeds", "amount": "1", "unit": "tsp" },
      { "name": "dijon mustard", "amount": "1", "unit": "tsp" }
    ],
    "steps": [
      "Blend raspberries, vinegar, oil, maple syrup and mustard until smooth.",
      "Stir in chia seeds and let sit 10 min to thicken.",
      "Shake well before each use. Beautiful on spinach or arugula."
    ],
    "nutrition": { "calories": 60, "protein": 0, "carbs": 5, "fat": 4, "fiber": 2 }
  },

  // ── HEALTHY VEGAN DESSERTS ───────────────────────────────────────────────────

  "Raw Chocolate Mousse": {
    "title": "Raw Chocolate Mousse",
    "prepTime": "10 min",
    "cookTime": "0 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "quick", "high-fiber"],
    "ingredients": [
      { "name": "ripe avocados", "amount": "2", "unit": "whole" },
      { "name": "raw cacao powder", "amount": "1/4", "unit": "cups" },
      { "name": "maple syrup", "amount": "3", "unit": "tbsp" },
      { "name": "vanilla extract", "amount": "1", "unit": "tsp" },
      { "name": "coconut milk", "amount": "2", "unit": "tbsp" },
      { "name": "pinch of sea salt", "amount": "1", "unit": "pinch" }
    ],
    "steps": [
      "Blend all ingredients until perfectly silky smooth.",
      "Taste and adjust sweetness or cacao to preference.",
      "Chill 30 min for a firmer mousse. Top with berries or coconut."
    ],
    "nutrition": { "calories": 320, "protein": 5, "carbs": 30, "fat": 22, "fiber": 12 }
  },

  "Banana Nice Cream": {
    "title": "Banana Nice Cream",
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "oil-free", "quick"],
    "ingredients": [
      { "name": "frozen bananas (sliced before freezing)", "amount": "4", "unit": "whole" },
      { "name": "vanilla extract", "amount": "1", "unit": "tsp" },
      { "name": "oat milk (optional splash)", "amount": "2", "unit": "tbsp" }
    ],
    "steps": [
      "Blend frozen banana chunks in a food processor until it resembles soft-serve.",
      "Add vanilla and a splash of oat milk only if needed to blend.",
      "Serve immediately or freeze another 30 min for firmer scoops."
    ],
    "nutrition": { "calories": 210, "protein": 3, "carbs": 54, "fat": 1, "fiber": 6 }
  },

  "Chia Seed Pudding": {
    "title": "Vanilla Chia Seed Pudding",
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "oil-free", "high-fiber"],
    "ingredients": [
      { "name": "chia seeds", "amount": "1/4", "unit": "cups" },
      { "name": "oat milk", "amount": "1.5", "unit": "cups" },
      { "name": "maple syrup", "amount": "2", "unit": "tbsp" },
      { "name": "vanilla extract", "amount": "1", "unit": "tsp" },
      { "name": "fresh berries", "amount": "1/2", "unit": "cups" }
    ],
    "steps": [
      "Whisk chia seeds, oat milk, maple syrup and vanilla together.",
      "Refrigerate at least 4 hours or overnight, stirring once after 30 min.",
      "Top with fresh berries and a drizzle of maple syrup."
    ],
    "nutrition": { "calories": 215, "protein": 6, "carbs": 30, "fat": 8, "fiber": 11 }
  },

  "Mango Coconut Panna Cotta": {
    "title": "Mango Coconut Panna Cotta",
    "prepTime": "10 min",
    "cookTime": "5 min",
    "servings": 4,
    "difficulty": "Medium",
    "tags": ["gluten-free", "oil-free"],
    "ingredients": [
      { "name": "full-fat coconut milk", "amount": "1", "unit": "cans" },
      { "name": "agar agar powder", "amount": "2", "unit": "tsp" },
      { "name": "maple syrup", "amount": "3", "unit": "tbsp" },
      { "name": "vanilla extract", "amount": "1", "unit": "tsp" },
      { "name": "fresh mango", "amount": "1", "unit": "whole" },
      { "name": "lime juice", "amount": "1", "unit": "tbsp" }
    ],
    "steps": [
      "Warm coconut milk with agar agar, whisking constantly. Bring to a gentle boil for 2 min.",
      "Stir in maple syrup and vanilla. Pour into 4 ramekins. Refrigerate 2 hours.",
      "Blend mango with lime juice for the topping. Unmould and serve."
    ],
    "nutrition": { "calories": 240, "protein": 2, "carbs": 22, "fat": 16, "fiber": 1 }
  },

  "Raw Brownie Bites": {
    "title": "Raw Brownie Bites",
    "prepTime": "15 min",
    "cookTime": "0 min",
    "servings": 12,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "quick", "high-fiber"],
    "ingredients": [
      { "name": "medjool dates (pitted)", "amount": "1.5", "unit": "cups" },
      { "name": "walnuts", "amount": "1", "unit": "cups" },
      { "name": "raw cacao powder", "amount": "1/3", "unit": "cups" },
      { "name": "vanilla extract", "amount": "1", "unit": "tsp" },
      { "name": "sea salt", "amount": "1/4", "unit": "tsp" },
      { "name": "dark chocolate chips", "amount": "1/4", "unit": "cups" }
    ],
    "steps": [
      "Process walnuts until finely chopped. Add dates, cacao, vanilla and salt.",
      "Pulse until the mixture sticks together when pressed.",
      "Fold in chocolate chips. Roll into 12 balls and refrigerate 1 hour."
    ],
    "nutrition": { "calories": 145, "protein": 3, "carbs": 18, "fat": 8, "fiber": 3 }
  },

  "Berry Coconut Parfait": {
    "title": "Berry Coconut Parfait",
    "prepTime": "10 min",
    "cookTime": "0 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "oil-free", "quick"],
    "ingredients": [
      { "name": "coconut yogurt", "amount": "1", "unit": "cups" },
      { "name": "granola (vegan)", "amount": "1/2", "unit": "cups" },
      { "name": "mixed berries", "amount": "1", "unit": "cups" },
      { "name": "shredded coconut", "amount": "2", "unit": "tbsp" },
      { "name": "maple syrup", "amount": "1", "unit": "tbsp" },
      { "name": "chia seeds", "amount": "1", "unit": "tsp" }
    ],
    "steps": [
      "Layer half the yogurt in a glass or jar.",
      "Add a layer of granola then berries. Repeat layers.",
      "Top with coconut flakes, chia seeds and a drizzle of maple syrup."
    ],
    "nutrition": { "calories": 290, "protein": 6, "carbs": 44, "fat": 10, "fiber": 7 }
  },

  "Baked Cinnamon Apples": {
    "title": "Baked Cinnamon Apples",
    "prepTime": "5 min",
    "cookTime": "25 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["gluten-free", "oil-free", "high-fiber"],
    "ingredients": [
      { "name": "large apples", "amount": "2", "unit": "whole" },
      { "name": "cinnamon", "amount": "1", "unit": "tsp" },
      { "name": "maple syrup", "amount": "2", "unit": "tbsp" },
      { "name": "walnuts", "amount": "2", "unit": "tbsp" },
      { "name": "raisins", "amount": "2", "unit": "tbsp" },
      { "name": "coconut oil", "amount": "1", "unit": "tsp" }
    ],
    "steps": [
      "Core apples leaving the bottom intact. Place in a small baking dish.",
      "Fill with a mix of cinnamon, maple syrup, walnuts and raisins.",
      "Bake at 180°C for 25 min until tender. Serve warm with coconut cream."
    ],
    "nutrition": { "calories": 195, "protein": 2, "carbs": 40, "fat": 5, "fiber": 6 }
  },

  "Dark Chocolate Energy Balls": {
    "title": "Dark Chocolate Energy Balls",
    "prepTime": "15 min",
    "cookTime": "0 min",
    "servings": 16,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "quick", "high-protein"],
    "ingredients": [
      { "name": "oats", "amount": "1", "unit": "cups" },
      { "name": "almond butter", "amount": "1/2", "unit": "cups" },
      { "name": "dark chocolate chips", "amount": "1/3", "unit": "cups" },
      { "name": "maple syrup", "amount": "3", "unit": "tbsp" },
      { "name": "chia seeds", "amount": "2", "unit": "tbsp" },
      { "name": "vanilla extract", "amount": "1", "unit": "tsp" }
    ],
    "steps": [
      "Mix all ingredients together until evenly combined.",
      "Refrigerate the mixture 30 min — this makes rolling much easier.",
      "Roll into 16 balls. Store in fridge for up to 2 weeks."
    ],
    "nutrition": { "calories": 105, "protein": 3, "carbs": 10, "fat": 6, "fiber": 2 }
  },

  "Blueberry Nice Cream": {
    "title": "Blueberry Nice Cream",
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "oil-free", "quick"],
    "ingredients": [
      { "name": "frozen bananas", "amount": "3", "unit": "whole" },
      { "name": "frozen blueberries", "amount": "1", "unit": "cups" },
      { "name": "coconut milk", "amount": "2", "unit": "tbsp" },
      { "name": "vanilla extract", "amount": "1/2", "unit": "tsp" }
    ],
    "steps": [
      "Blend frozen bananas and blueberries until completely smooth.",
      "Add coconut milk only if needed to help blend.",
      "Serve right away for soft serve, or freeze for 1 hour for scoopable ice cream."
    ],
    "nutrition": { "calories": 230, "protein": 3, "carbs": 57, "fat": 1, "fiber": 7 }
  },

  "Coconut Mango Sorbet": {
    "title": "Coconut Mango Sorbet",
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 4,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "oil-free", "quick"],
    "ingredients": [
      { "name": "frozen mango chunks", "amount": "3", "unit": "cups" },
      { "name": "coconut cream", "amount": "1/4", "unit": "cups" },
      { "name": "lime juice", "amount": "2", "unit": "tbsp" },
      { "name": "maple syrup", "amount": "1", "unit": "tbsp" }
    ],
    "steps": [
      "Blend frozen mango, coconut cream, lime juice and maple syrup until velvety smooth.",
      "Pour into a freezer-safe container and freeze 1–2 hours for scoopable sorbet.",
      "Scoop and serve with fresh mint and toasted coconut."
    ],
    "nutrition": { "calories": 120, "protein": 1, "carbs": 26, "fat": 3, "fiber": 2 }
  },

  "Raw Lemon Cheesecake": {
    "title": "Raw Lemon Cheesecake",
    "prepTime": "30 min",
    "cookTime": "0 min",
    "servings": 10,
    "difficulty": "Medium",
    "tags": ["raw", "gluten-free"],
    "ingredients": [
      { "name": "medjool dates", "amount": "1", "unit": "cups" },
      { "name": "almonds", "amount": "1", "unit": "cups" },
      { "name": "raw cashews (soaked 4 hrs)", "amount": "2", "unit": "cups" },
      { "name": "lemon juice", "amount": "1/2", "unit": "cups" },
      { "name": "lemon zest", "amount": "2", "unit": "tbsp" },
      { "name": "coconut cream", "amount": "1/2", "unit": "cups" },
      { "name": "maple syrup", "amount": "1/3", "unit": "cups" },
      { "name": "coconut oil", "amount": "3", "unit": "tbsp" }
    ],
    "steps": [
      "Process dates and almonds into a sticky crust. Press into a lined springform pan.",
      "Blend soaked cashews, lemon juice, zest, coconut cream, maple syrup and oil until silky.",
      "Pour filling over crust. Freeze 4 hours. Thaw 30 min before slicing."
    ],
    "nutrition": { "calories": 310, "protein": 8, "carbs": 26, "fat": 21, "fiber": 3 }
  },

  "Chocolate Chia Pudding": {
    "title": "Chocolate Chia Pudding",
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 2,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "oil-free", "high-fiber"],
    "ingredients": [
      { "name": "chia seeds", "amount": "1/4", "unit": "cups" },
      { "name": "oat milk", "amount": "1.5", "unit": "cups" },
      { "name": "raw cacao powder", "amount": "3", "unit": "tbsp" },
      { "name": "maple syrup", "amount": "2", "unit": "tbsp" },
      { "name": "vanilla extract", "amount": "1/2", "unit": "tsp" },
      { "name": "fresh raspberries", "amount": "1/2", "unit": "cups" }
    ],
    "steps": [
      "Whisk chia seeds, oat milk, cacao, maple syrup and vanilla together.",
      "Refrigerate at least 4 hours or overnight.",
      "Top with raspberries. Rich, chocolatey and packed with fiber."
    ],
    "nutrition": { "calories": 235, "protein": 7, "carbs": 32, "fat": 9, "fiber": 12 }
  },

  "Vegan Banana Bread": {
    "title": "Vegan Banana Bread",
    "prepTime": "10 min",
    "cookTime": "55 min",
    "servings": 10,
    "difficulty": "Easy",
    "tags": ["oil-free"],
    "ingredients": [
      { "name": "overripe bananas", "amount": "3", "unit": "whole" },
      { "name": "oat flour", "amount": "2", "unit": "cups" },
      { "name": "almond butter", "amount": "1/3", "unit": "cups" },
      { "name": "maple syrup", "amount": "1/4", "unit": "cups" },
      { "name": "baking soda", "amount": "1", "unit": "tsp" },
      { "name": "cinnamon", "amount": "1", "unit": "tsp" },
      { "name": "vanilla extract", "amount": "1", "unit": "tsp" },
      { "name": "dark chocolate chips", "amount": "1/3", "unit": "cups" }
    ],
    "steps": [
      "Mash bananas until smooth. Mix in almond butter, maple syrup and vanilla.",
      "Fold in oat flour, baking soda and cinnamon until just combined. Stir in chocolate chips.",
      "Pour into a lined loaf tin. Bake at 175°C for 55–60 min. Cool completely before slicing."
    ],
    "nutrition": { "calories": 190, "protein": 5, "carbs": 30, "fat": 7, "fiber": 4 }
  },

  "Matcha Coconut Balls": {
    "title": "Matcha Coconut Balls",
    "prepTime": "15 min",
    "cookTime": "0 min",
    "servings": 14,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "quick"],
    "ingredients": [
      { "name": "medjool dates", "amount": "1.5", "unit": "cups" },
      { "name": "cashews", "amount": "1", "unit": "cups" },
      { "name": "matcha powder", "amount": "2", "unit": "tsp" },
      { "name": "shredded coconut", "amount": "1/3", "unit": "cups" },
      { "name": "vanilla extract", "amount": "1", "unit": "tsp" },
      { "name": "extra coconut for rolling", "amount": "1/4", "unit": "cups" }
    ],
    "steps": [
      "Process cashews, dates, matcha and vanilla into a dough.",
      "Roll into 14 balls, then roll each in shredded coconut.",
      "Refrigerate 1 hour until firm. Beautiful deep green color."
    ],
    "nutrition": { "calories": 125, "protein": 2, "carbs": 17, "fat": 6, "fiber": 2 }
  },

  "Peanut Butter Date Cookies": {
    "title": "Peanut Butter Date Cookies",
    "prepTime": "10 min",
    "cookTime": "12 min",
    "servings": 12,
    "difficulty": "Easy",
    "tags": ["gluten-free", "quick", "high-protein"],
    "ingredients": [
      { "name": "medjool dates (pitted)", "amount": "12", "unit": "whole" },
      { "name": "peanut butter", "amount": "1/2", "unit": "cups" },
      { "name": "oat flour", "amount": "1/2", "unit": "cups" },
      { "name": "maple syrup", "amount": "2", "unit": "tbsp" },
      { "name": "vanilla extract", "amount": "1", "unit": "tsp" },
      { "name": "dark chocolate drizzle", "amount": "2", "unit": "tbsp" }
    ],
    "steps": [
      "Blend dates, peanut butter, oat flour, maple syrup and vanilla into a dough.",
      "Roll into 12 balls, flatten onto a lined baking sheet.",
      "Bake at 175°C for 12 min. Drizzle with melted dark chocolate."
    ],
    "nutrition": { "calories": 130, "protein": 4, "carbs": 16, "fat": 6, "fiber": 2 }
  },

  "Strawberry Mousse": {
    "title": "Strawberry Mousse",
    "prepTime": "15 min",
    "cookTime": "0 min",
    "servings": 4,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "oil-free", "quick"],
    "ingredients": [
      { "name": "fresh strawberries", "amount": "2", "unit": "cups" },
      { "name": "coconut cream (chilled)", "amount": "1", "unit": "cans" },
      { "name": "maple syrup", "amount": "2", "unit": "tbsp" },
      { "name": "vanilla extract", "amount": "1", "unit": "tsp" },
      { "name": "lemon juice", "amount": "1", "unit": "tbsp" }
    ],
    "steps": [
      "Blend strawberries with maple syrup and lemon juice until smooth.",
      "Whip the chilled coconut cream until fluffy peaks form.",
      "Fold strawberry puree into whipped cream. Chill 1 hour before serving."
    ],
    "nutrition": { "calories": 175, "protein": 2, "carbs": 16, "fat": 12, "fiber": 2 }
  },

  "Avocado Lime Tart": {
    "title": "Avocado Lime Tart",
    "prepTime": "20 min",
    "cookTime": "0 min",
    "servings": 8,
    "difficulty": "Medium",
    "tags": ["raw", "gluten-free", "high-fiber"],
    "ingredients": [
      { "name": "walnuts", "amount": "1", "unit": "cups" },
      { "name": "medjool dates", "amount": "1", "unit": "cups" },
      { "name": "ripe avocados", "amount": "3", "unit": "whole" },
      { "name": "lime juice", "amount": "1/3", "unit": "cups" },
      { "name": "lime zest", "amount": "2", "unit": "tbsp" },
      { "name": "maple syrup", "amount": "1/4", "unit": "cups" },
      { "name": "coconut oil", "amount": "2", "unit": "tbsp" }
    ],
    "steps": [
      "Process walnuts and dates into a crust, press into a tart tin.",
      "Blend avocado, lime juice, zest, maple syrup and coconut oil until silky smooth.",
      "Spread filling over crust. Freeze 2 hours. Thaw 20 min before serving."
    ],
    "nutrition": { "calories": 295, "protein": 4, "carbs": 22, "fat": 22, "fiber": 8 }
  },

  "Raspberry Coconut Squares": {
    "title": "Raspberry Coconut Squares",
    "prepTime": "20 min",
    "cookTime": "0 min",
    "servings": 16,
    "difficulty": "Easy",
    "tags": ["raw", "gluten-free", "quick"],
    "ingredients": [
      { "name": "desiccated coconut", "amount": "2", "unit": "cups" },
      { "name": "coconut oil (melted)", "amount": "1/4", "unit": "cups" },
      { "name": "maple syrup", "amount": "3", "unit": "tbsp" },
      { "name": "vanilla extract", "amount": "1", "unit": "tsp" },
      { "name": "fresh raspberries", "amount": "1", "unit": "cups" },
      { "name": "dark chocolate (melted for base)", "amount": "100", "unit": "g" }
    ],
    "steps": [
      "Pour melted chocolate into a lined 8×8 pan and freeze 10 min to set.",
      "Mix coconut, coconut oil, maple syrup and vanilla into a paste. Press over chocolate.",
      "Press raspberries gently into top. Refrigerate 1 hour then cut into 16 squares."
    ],
    "nutrition": { "calories": 140, "protein": 1, "carbs": 10, "fat": 11, "fiber": 2 }
  },

  "Sweet Potato Brownies": {
    "title": "Sweet Potato Brownies",
    "prepTime": "15 min",
    "cookTime": "25 min",
    "servings": 16,
    "difficulty": "Easy",
    "tags": ["gluten-free", "oil-free", "high-fiber"],
    "ingredients": [
      { "name": "sweet potato (cooked, mashed)", "amount": "1.5", "unit": "cups" },
      { "name": "almond butter", "amount": "1/2", "unit": "cups" },
      { "name": "maple syrup", "amount": "1/4", "unit": "cups" },
      { "name": "raw cacao powder", "amount": "1/3", "unit": "cups" },
      { "name": "baking powder", "amount": "1", "unit": "tsp" },
      { "name": "vanilla extract", "amount": "1", "unit": "tsp" },
      { "name": "dark chocolate chips", "amount": "1/3", "unit": "cups" }
    ],
    "steps": [
      "Mix mashed sweet potato, almond butter and maple syrup until smooth.",
      "Stir in cacao, baking powder and vanilla. Fold in chocolate chips.",
      "Pour into a lined 8×8 pan. Bake at 175°C for 25 min. Cool fully before cutting."
    ],
    "nutrition": { "calories": 115, "protein": 3, "carbs": 14, "fat": 6, "fiber": 3 }
  },

  "Oat Cookie Bites": {
    "title": "Oat Cookie Bites",
    "prepTime": "10 min",
    "cookTime": "12 min",
    "servings": 20,
    "difficulty": "Easy",
    "tags": ["quick", "high-fiber"],
    "ingredients": [
      { "name": "rolled oats", "amount": "2", "unit": "cups" },
      { "name": "almond butter", "amount": "1/2", "unit": "cups" },
      { "name": "maple syrup", "amount": "1/3", "unit": "cups" },
      { "name": "raisins", "amount": "1/3", "unit": "cups" },
      { "name": "cinnamon", "amount": "1", "unit": "tsp" },
      { "name": "vanilla extract", "amount": "1", "unit": "tsp" },
      { "name": "baking soda", "amount": "1/2", "unit": "tsp" }
    ],
    "steps": [
      "Preheat oven to 175°C. Mix almond butter, maple syrup and vanilla until smooth.",
      "Stir in oats, raisins, cinnamon and baking soda.",
      "Scoop onto a lined baking sheet. Bake 12 min. Cool on tray — they firm as they cool."
    ],
    "nutrition": { "calories": 95, "protein": 3, "carbs": 13, "fat": 4, "fiber": 2 }
  }
};
