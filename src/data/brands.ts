export interface Brand {
  name: string;
  tag: string;
  emoji: string;
  url: string;
  img: string;
  desc: string;
  products: string[];
}

export const VEGAN_BRANDS: Record<string, Brand[]> = {
  "👗 Women's Fashion": [
    { name: "Reformation", tag: "Sustainable chic", emoji: "👗", url: "https://www.thereformation.com", img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=120&h=80&fit=crop&q=60", desc: "Eco-conscious dresses, tops & denim", products: ["Linen Midi Dress", "Vintage Jeans", "Wrap Top"] },
    { name: "Stella McCartney", tag: "Luxury vegan fashion", emoji: "⭐", url: "https://www.stellamccartney.com", img: "https://images.unsplash.com/photo-1558171813-0bb9ecf5019a?w=120&h=80&fit=crop&q=60", desc: "High-end 100% animal-free luxury", products: ["Falabella Bag", "Tailored Blazer", "Evening Gown"] },
    { name: "Girlfriend Collective", tag: "Recycled activewear", emoji: "🏃", url: "https://girlfriend.com", img: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=120&h=80&fit=crop&q=60", desc: "Leggings & sports bras from recycled bottles", products: ["Compressive Legging", "Float Sports Bra", "Bike Shorts"] },
    { name: "Thought Clothing", tag: "Bamboo & hemp basics", emoji: "🌿", url: "https://www.thoughtclothing.com", img: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=120&h=80&fit=crop&q=60", desc: "Everyday staples in natural fibres", products: ["Bamboo T-Shirt", "Hemp Joggers", "Organic Jumper"] },
  ],
  "👔 Men's Fashion": [
    { name: "Veja", tag: "Ethical sneakers", emoji: "👟", url: "https://www.veja-store.com", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=80&fit=crop&q=60", desc: "Sneakers made with organic cotton & recycled", products: ["V-10 Sneaker", "Campo Trainer", "Esplar Low"] },
    { name: "WAMA Underwear", tag: "Hemp underwear", emoji: "🌱", url: "https://www.wama.com", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120&h=80&fit=crop&q=60", desc: "Super-soft hemp basics for men", products: ["Boxer Brief", "Trunk", "Tank Top"] },
    { name: "Patagonia", tag: "Fleece & outdoor", emoji: "🏔️", url: "https://www.patagonia.com", img: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=120&h=80&fit=crop&q=60", desc: "Recycled fleece, vegan-certified styles", products: ["Synchilla Fleece", "Board Shorts", "Baggies Jacket"] },
    { name: "tentree", tag: "Plants a tree per item", emoji: "🌳", url: "https://www.tentree.com", img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=120&h=80&fit=crop&q=60", desc: "Sustainable basics — 10 trees per purchase", products: ["French Terry Hoodie", "Organic Tee", "Jogger Pant"] },
  ],
  "👟 Shoes & Footwear": [
    { name: "Will's Vegan Store", tag: "100% vegan certified", emoji: "🥾", url: "https://www.willsvegan.com", img: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=120&h=80&fit=crop&q=60", desc: "Full range of vegan boots, shoes & trainers", products: ["Chelsea Boot", "Derby Shoe", "Sneaker"] },
    { name: "Native Shoes", tag: "Lightweight & plant-based", emoji: "👡", url: "https://www.nativeshoes.com", img: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=120&h=80&fit=crop&q=60", desc: "Plant-based shoes, sandals & kids styles", products: ["Jefferson Moc", "Miles Sneaker", "Fitzsimmons Boot"] },
    { name: "Bourgeois Bohème", tag: "Luxury vegan heels", emoji: "💎", url: "https://www.bboheme.com", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=120&h=80&fit=crop&q=60", desc: "Elegant, cruelty-free heels & flats", products: ["Stiletto Heel", "Mule", "Ballet Flat"] },
    { name: "Nae Vegan Shoes", tag: "Portuguese craftsmanship", emoji: "🇵🇹", url: "https://www.nae-vegan.com", img: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=120&h=80&fit=crop&q=60", desc: "Handmade vegan shoes from Portugal", products: ["Loafer", "Ankle Boot", "Oxford"] },
  ],
  "💄 Beauty & Skincare": [
    { name: "Herbivore Botanicals", tag: "Clean plant-based skincare", emoji: "🌿", url: "https://www.herbivorebotanicals.com", img: "https://images.unsplash.com/photo-1570554520913-ce2d76a79e0d?w=120&h=80&fit=crop&q=60", desc: "Minimalist serums, oils & masks", products: ["Emerald Facial Oil", "Prism Serum", "Blue Tansy Mask"] },
    { name: "e.l.f. Cosmetics", tag: "100% vegan & cruelty-free", emoji: "💄", url: "https://www.elfcosmetics.com", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=120&h=80&fit=crop&q=60", desc: "Affordable, fully vegan makeup range", products: ["Halo Glow Serum", "Power Grip Primer", "Putty Blush"] },
    { name: "Pacifica Beauty", tag: "100% vegan certified", emoji: "🌸", url: "https://www.pacificabeauty.com", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=120&h=80&fit=crop&q=60", desc: "Skincare, hair & colour — all vegan", products: ["Glow Baby Serum", "Wake Up Beautiful Mask", "Vegan Collagen Complex"] },
    { name: "Hurraw! Balm", tag: "Raw vegan lip care", emoji: "💋", url: "https://www.hurrawbalm.com", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=120&h=80&fit=crop&q=60", desc: "Organic, raw, vegan lip balms", products: ["Chai Lip Balm", "Moon Balm Night Treatment", "Vanilla Lip Balm"] },
  ],
  "🏠 Home & Kitchen": [
    { name: "Public Goods", tag: "Plastic-free home essentials", emoji: "🏠", url: "https://www.publicgoods.com", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=120&h=80&fit=crop&q=60", desc: "Clean, sustainable home & kitchen staples", products: ["Dish Soap", "Laundry Detergent", "Paper Towels"] },
    { name: "Grove Collaborative", tag: "Natural cleaning & home", emoji: "🧴", url: "https://www.grove.co", img: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=120&h=80&fit=crop&q=60", desc: "Plant-based cleaning & home care", products: ["Multi-Surface Spray", "Dish Soap", "Hand Soap Set"] },
    { name: "Made In Cookware", tag: "Non-toxic kitchen", emoji: "🍳", url: "https://madeincookware.com", img: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=120&h=80&fit=crop&q=60", desc: "Professional-grade non-toxic cookware", products: ["Carbon Steel Wok", "Stainless Skillet", "Non-Stick Pan"] },
    { name: "Bambu Home", tag: "Bamboo kitchenware", emoji: "🎋", url: "https://bambu.com", img: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=120&h=80&fit=crop&q=60", desc: "Sustainable bamboo utensils & boards", products: ["Cutting Board", "Utensil Set", "Serving Bowls"] },
  ],
  "💊 Supplements & Food": [
    { name: "Garden of Life", tag: "Certified organic protein", emoji: "🌱", url: "https://www.gardenoflife.com", img: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=120&h=80&fit=crop&q=60", desc: "Vegan protein, probiotics & vitamins", products: ["Sport Organic Protein", "Raw Probiotics", "mykind B12"] },
    { name: "Ora Organic", tag: "Plant-based wellness", emoji: "☀️", url: "https://www.ora.organic", img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=120&h=80&fit=crop&q=60", desc: "Clean protein powder, collagen & omegas", products: ["So Lean & So Clean Protein", "Trust Your Gut Probiotic", "The Omega-3"] },
    { name: "Thrive Market", tag: "Wholesale organic groceries", emoji: "🛒", url: "https://thrivemarket.com", img: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=120&h=80&fit=crop&q=60", desc: "Members-get-wholesale on vegan staples", products: ["Almond Butter", "Oat Milk", "Organic Pasta"] },
    { name: "Complement", tag: "Complete vegan nutrition", emoji: "💊", url: "https://lovecomplement.com", img: "https://images.unsplash.com/photo-1544991875-5dc1b05f607d?w=120&h=80&fit=crop&q=60", desc: "All-in-one vegan vitamin formula", products: ["Essential Stack", "Omega-3", "Vitamin D3+K2"] },
  ],
  "🎒 Bags & Accessories": [
    { name: "Doshi", tag: "Luxury vegan leather", emoji: "👜", url: "https://www.doshi.shop", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=120&h=80&fit=crop&q=60", desc: "Handcrafted vegan leather bags & wallets", products: ["Tote Bag", "Bifold Wallet", "Backpack"] },
    { name: "Gunas New York", tag: "Designer vegan handbags", emoji: "👛", url: "https://www.gunasnewyork.com", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=120&h=80&fit=crop&q=60", desc: "Chic cruelty-free handbags & clutches", products: ["Satchel", "Crossbody", "Evening Clutch"] },
    { name: "Matt & Nat", tag: "Recycled lining bags", emoji: "♻️", url: "https://mattandnat.com", img: "https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?w=120&h=80&fit=crop&q=60", desc: "Stylish bags lined with recycled bottles", products: ["PURITY Tote", "BRAVE Backpack", "PIXEL Satchel"] },
    { name: "Votch", tag: "Vegan watches", emoji: "⌚", url: "https://votch.com", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&h=80&fit=crop&q=60", desc: "Minimalist watches with plant-based straps", products: ["Classic Apple Watch Strap", "Cactus Leather Band", "Mesh Strap"] },
  ],
};
