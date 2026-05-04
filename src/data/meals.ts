export const MEALS: Record<string, string[]> = {
  "Breakfast": ["Acai Bowl", "Banana Bowl", "Pitaya Bowl", "Oats", "Almond Scramble", "Yogurt Bowl", "Buckwheat", "Biscuits and Gravy", "Breakfast Nachos", "Breakfast Burrito", "Protein Pancakes", "Tofu Scramble", "Chikn and Waffles", "Frittata", "Savory Crepes"],
  "Salads & Raw": ["Summer Southwest Salad", "Raw Pad Thai", "Raw Pizza", "Raw Tacos", "Raw Corn Cakes", "Heirloom Caprese", "Asian Cucumber Salad", "Cobb Salad", "Kale Salad", "Taco Salad", "Raw Fried Rice", "Zucchini Noodle Pesto", "Zucchini Noodle Red Sauce", "Fruit Breakfast Bars"],
  "Wraps & Rolls": ["Collard Wrap", "Tempeh Wrap", "Nori Wrap", "Sushi Roll", "Poke Bowl", "Nachos", "Arepas", "Falafel"],
  "Bowls & Mains": ["Pad Thai", "Ravioli", "Corn Chowder", "Zucchini Noodles", "Sesame Noodle", "Mushroom Steak", "Stuffed Mushroom", "Raw Buddha Bowl", "Stuffed Peppers", "Seasame Tofu", "Red Curry", "African Stew", "Pesto Protein Pasta", "Tempeh Tacos al Pastor", "Red Beans and Rice", "Buffalo Tofu Taco", "Buddha Bowl", "Burrito Bowl", "Lentil Shepherd's Pie", "BBQ Bowl", "Sushi Bowl", "Chili", "Dirty Mac", "Burgers", "Risotto", "Lentil Soup", "Crab Cakes", "Spicy Cauliflower", "Burrito", "Ramen", "Buffalo Cauliflower Tacos", "Roast Beet Fennel Arugula Salad", "Black Eyed Peas and Collards"],
  "🍎 Snacks": ["Apple with Peanut Butter", "Handful Almonds + Dark Chocolate", "Hummus with Veggies", "Edamame (1 cup)", "Dates with Tahini", "Avocado Rice Cakes", "Walnuts + Berries", "Trail Mix", "Vegan Protein Bar", "Celery with Peanut Butter", "Cashews (1 cup)", "Blueberries + Hemp Seeds", "Larabar", "Almond Butter Toast", "Fruit + Nut Mix"],
  "🥗 Dressings": ["Classic Tahini Dressing", "Lemon Herb Vinaigrette", "Miso Ginger Dressing", "Avocado Green Goddess", "Balsamic Fig Dressing", "Cashew Ranch Dressing", "Turmeric Orange Dressing", "Spicy Peanut Dressing", "Apple Cider Honey Mustard", "Raspberry Chia Vinaigrette"],
  "🍫 Desserts": ["Raw Chocolate Mousse", "Banana Nice Cream", "Chia Seed Pudding", "Mango Coconut Panna Cotta", "Raw Brownie Bites", "Berry Coconut Parfait", "Baked Cinnamon Apples", "Dark Chocolate Energy Balls", "Blueberry Nice Cream", "Coconut Mango Sorbet", "Raw Lemon Cheesecake", "Chocolate Chia Pudding", "Vegan Banana Bread", "Matcha Coconut Balls", "Peanut Butter Date Cookies", "Strawberry Mousse", "Avocado Lime Tart", "Raspberry Coconut Squares", "Sweet Potato Brownies", "Oat Cookie Bites"]
};

export const AISLE_MAP: Record<string, string[]> = {
  produce: ["tomato", "lettuce", "spinach", "kale", "arugula", "cucumber", "zucchini", "bell pepper", "onion", "garlic", "ginger", "lemon", "lime", "avocado", "jalapeno", "cilantro", "basil", "parsley", "mint", "scallion", "green onion", "beet", "carrot", "celery", "corn", "mushroom", "broccoli", "cauliflower", "fennel", "leek", "shallot", "sweet potato", "potato", "eggplant", "cabbage", "bok choy", "mango", "banana", "berries", "strawberry", "blueberry", "raspberry", "apple", "orange", "lime", "lemon", "peach", "cherry", "melon", "watermelon", "pineapple", "coconut", "dates", "fig"],
  pantry: ["olive oil", "coconut oil", "sesame oil", "vinegar", "soy sauce", "tamari", "liquid aminos", "miso", "nutritional yeast", "tahini", "almond butter", "peanut butter", "agave", "maple syrup", "hot sauce", "sriracha", "hoisin", "rice vinegar", "apple cider vinegar", "dijon", "mustard", "ketchup"],
  grains: ["rice", "quinoa", "oats", "pasta", "noodle", "bread", "tortilla", "flour", "corn", "polenta", "farro", "barley", "buckwheat", "bulgur", "couscous", "lentil", "split pea", "bread crumbs", "panko", "pita", "wrap"],
  protein: ["tofu", "tempeh", "seitan", "chickpea", "black bean", "kidney bean", "white bean", "edamame", "lentil", "hemp seed", "chia seed", "flax seed", "nutritional yeast", "protein powder", "pea protein", "cashew", "almond", "walnut", "pecan", "pine nut", "sunflower seed", "pumpkin seed"],
  dairy_alt: ["oat milk", "almond milk", "coconut milk", "soy milk", "cashew milk", "coconut cream", "vegan butter", "vegan cheese", "vegan yogurt", "cream cheese"],
  spices: ["salt", "pepper", "cumin", "paprika", "turmeric", "chili", "oregano", "thyme", "rosemary", "bay leaf", "coriander", "cardamom", "cinnamon", "nutmeg", "cayenne", "garlic powder", "onion powder", "smoked paprika", "curry", "garam masala", "zaatar", "sumac", "dried", "powder", "flakes"],
  canned: ["can", "canned", "diced tomato", "tomato paste", "tomato sauce", "coconut milk", "broth", "stock", "jackfruit", "artichoke", "olive", "capers", "bean"],
  other: []
};

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const SLOTS = ["Juice", "Smoothie", "Breakfast", "Snack 1", "Lunch", "Snack 2", "Dinner"];

export const SLOT_DISPLAY: Record<string, string> = {
  'Juice': '🥤 Juice',
  'Smoothie': '🫐 Smoothie',
  'Breakfast': '🌅 Breakfast',
  'Snack 1': '🍎 Snack 1',
  'Lunch': '☀️ Lunch',
  'Snack 2': '🍎 Snack 2',
  'Dinner': '🌙 Dinner'
};
