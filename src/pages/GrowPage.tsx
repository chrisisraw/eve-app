import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { useEveStore } from "@/hooks/useEveStore";
import type { Plant } from "@/hooks/useEveStore";
import { GARDEN_CATALOG, getPlantCare } from "@/data/garden";
import { PRELOADED_RECIPES } from "@/data/recipes";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, X, Leaf, ChevronDown, ChevronUp, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

// Variety-specific photo overrides: key = "plantname|variety" (both lowercased, trimmed)
const VARIETY_PHOTOS: Record<string, string> = {
  // Parsley varieties
  'parsley|curly':                 'https://images.unsplash.com/photo-1599778150914-88e98e0c3b0a?w=600&h=320&fit=crop&q=82',
  'parsley|flat leaf (italian)':   'https://images.unsplash.com/photo-1615485736407-0de6dfc0fa01?w=600&h=320&fit=crop&q=82',
  'parsley|hamburg root':          'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&h=320&fit=crop&q=82',

  // Kale varieties
  'kale|curly':                    'https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?w=600&h=320&fit=crop&q=82',
  'kale|lacinato (dinosaur)':      'https://images.unsplash.com/photo-1547050605-2fb4b15a5bd8?w=600&h=320&fit=crop&q=82',
  'kale|red russian':              'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&h=320&fit=crop&q=82',

  // Tomato varieties
  'tomatoes|cherry':               'https://images.unsplash.com/photo-1561155707-29c35e855ef5?w=600&h=320&fit=crop&q=82',
  'tomatoes|sun gold':             'https://images.unsplash.com/photo-1561155707-29c35e855ef5?w=600&h=320&fit=crop&q=82',
  'tomatoes|heirloom':             'https://images.unsplash.com/photo-1546094096-0df4bcaad337?w=600&h=320&fit=crop&q=82',
  'tomatoes|black krim':           'https://images.unsplash.com/photo-1546094096-0df4bcaad337?w=600&h=320&fit=crop&q=82',
  'tomatoes|brandywine':           'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&h=320&fit=crop&q=82',
  'tomatoes|beefsteak':            'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&h=320&fit=crop&q=82',
  'tomatoes (cherry)|sungold':     'https://images.unsplash.com/photo-1561155707-29c35e855ef5?w=600&h=320&fit=crop&q=82',
  'tomatoes (cherry)|black cherry':'https://images.unsplash.com/photo-1561155707-29c35e855ef5?w=600&h=320&fit=crop&q=82',
  'tomatoes (cherry)|yellow pear': 'https://images.unsplash.com/photo-1561155707-29c35e855ef5?w=600&h=320&fit=crop&q=82',

  // Carrot varieties
  'carrots|rainbow':               'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=600&h=320&fit=crop&q=82',
  'carrots|nantes':                'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&h=320&fit=crop&q=82',
  'carrots|chantenay':             'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&h=320&fit=crop&q=82',

  // Bell Pepper varieties
  'bell peppers|red':              'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&h=320&fit=crop&q=82',
  'bell peppers|yellow':           'https://images.unsplash.com/photo-1508747703725-719777637510?w=600&h=320&fit=crop&q=82',
  'bell peppers|orange':           'https://images.unsplash.com/photo-1508747703725-719777637510?w=600&h=320&fit=crop&q=82',
  'bell peppers|purple':           'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&h=320&fit=crop&q=82',
  'bell peppers|chocolate':        'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&h=320&fit=crop&q=82',
  'bell peppers|green':            'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&h=320&fit=crop&q=82',

  // Beet varieties
  'beets|golden':                  'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&h=320&fit=crop&q=82',
  'beets|chioggia':                'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=600&h=320&fit=crop&q=82',
  'beets|detroit dark red':        'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=600&h=320&fit=crop&q=82',

  // Lettuce varieties
  'lettuce|romaine':               'https://images.unsplash.com/photo-1558818498-28c1e002b655?w=600&h=320&fit=crop&q=82',
  'lettuce|butterhead':            'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&h=320&fit=crop&q=82',
  'lettuce|red leaf':              'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&h=320&fit=crop&q=82',
  'lettuce|arugula':               'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=600&h=320&fit=crop&q=82',

  // Cauliflower varieties
  'cauliflower|purple':            'https://images.unsplash.com/photo-1568584711271-6d7e2e59e3ea?w=600&h=320&fit=crop&q=82',
  'cauliflower|romanesco':         'https://images.unsplash.com/photo-1584868404890-b3777b1bef93?w=600&h=320&fit=crop&q=82',
  'cauliflower|orange':            'https://images.unsplash.com/photo-1568584711271-6d7e2e59e3ea?w=600&h=320&fit=crop&q=82',

  // Lentil varieties
  'lentils|black':                 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=600&h=320&fit=crop&q=82',
  'lentils|red':                   'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=600&h=320&fit=crop&q=82',
  'lentils|french (puy)':          'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=600&h=320&fit=crop&q=82',
  'lentils|green':                 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=600&h=320&fit=crop&q=82',

  // Green Beans varieties
  'green beans|bush':              'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=600&h=320&fit=crop&q=82',
  'green beans|pole':              'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=600&h=320&fit=crop&q=82',
  'green beans|french (haricot vert)': 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=600&h=320&fit=crop&q=82',

  // Broccoli varieties
  'broccoli|romanesco':            'https://images.unsplash.com/photo-1584868404890-b3777b1bef93?w=600&h=320&fit=crop&q=82',
  'broccoli|purple sprouting':     'https://images.unsplash.com/photo-1584868404890-b3777b1bef93?w=600&h=320&fit=crop&q=82',

  // Basil varieties
  'basil|thai':                    'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=600&h=320&fit=crop&q=82',
  'basil|purple':                  'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&h=320&fit=crop&q=82',
  'basil|lemon':                   'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=320&fit=crop&q=82',
  'basil|genovese':                'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=320&fit=crop&q=82',

  // Radish varieties
  'radishes|daikon':               'https://images.unsplash.com/photo-1592997570678-3fde4ee22b3e?w=600&h=320&fit=crop&q=82',
  'radishes|watermelon':           'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=600&h=320&fit=crop&q=82',

  // Onion varieties
  'onions|red':                    'https://images.unsplash.com/photo-1518977812040-6e81a1c88f71?w=600&h=320&fit=crop&q=82',
  'onions|shallots':               'https://images.unsplash.com/photo-1548010860-293cfb4572e3?w=600&h=320&fit=crop&q=82',

  // Sweet Potato varieties
  'sweet potatoes|purple':         'https://images.unsplash.com/photo-1601579112934-17ac2aa86292?w=600&h=320&fit=crop&q=82',

  // Mint varieties
  'mint|peppermint':               'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600&h=320&fit=crop&q=82',
  'mint|chocolate mint':           'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600&h=320&fit=crop&q=82',
  'mint|spearmint':                'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600&h=320&fit=crop&q=82',

  // Strawberry varieties
  'strawberries|albion':           'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&h=320&fit=crop&q=82',
  'strawberries|chandler':         'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&h=320&fit=crop&q=82',

  // Blueberry varieties
  'blueberries|highbush':          'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=600&h=320&fit=crop&q=82',

  // Microgreens
  'microgreens|sunflower':         'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=320&fit=crop&q=82',
  'microgreens|pea shoots':        'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=600&h=320&fit=crop&q=82',
  'microgreens|radish':            'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=320&fit=crop&q=82',
  'sunflower sprouts|black oil':   'https://images.unsplash.com/photo-1469460340997-2f854421e72f?w=600&h=320&fit=crop&q=82',
  'pea shoots|speckled':           'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=320&fit=crop&q=82',

  // Chickpeas
  'chickpeas|desi':                'https://images.unsplash.com/photo-1515518554379-14c8c7d4fe50?w=600&h=320&fit=crop&q=82',
  'chickpeas|kabuli':              'https://images.unsplash.com/photo-1515518554379-14c8c7d4fe50?w=600&h=320&fit=crop&q=82',

  // Edamame
  'edamame|sayamusume':            'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=600&h=320&fit=crop&q=82',
  'edamame|envy':                  'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=600&h=320&fit=crop&q=82',

  // Avocado
  'avocado|hass':                  'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&h=320&fit=crop&q=82',

  // Watermelon
  'watermelon|sugar baby':         'https://images.unsplash.com/photo-1467100421209-2d62f3e27479?w=600&h=320&fit=crop&q=82',
};

// Plant-name level photos (no variety needed)
const PLANT_PHOTOS: Record<string, string> = {
  'basil':           'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=320&fit=crop&q=82',
  'cilantro':        'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=600&h=320&fit=crop&q=82',
  'parsley':         'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&h=320&fit=crop&q=82',
  'mint':            'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600&h=320&fit=crop&q=82',
  'rosemary':        'https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=600&h=320&fit=crop&q=82',
  'thyme':           'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&h=320&fit=crop&q=82',
  'oregano':         'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=320&fit=crop&q=82',
  'chives':          'https://images.unsplash.com/photo-1584316712724-a54b7e58ffe2?w=600&h=320&fit=crop&q=82',
  'dill':            'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=320&fit=crop&q=82',
  'tarragon':        'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&h=320&fit=crop&q=82',
  'sage':            'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=600&h=320&fit=crop&q=82',
  'lemongrass':      'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&h=320&fit=crop&q=82',
  'lavender':        'https://images.unsplash.com/photo-1499578124509-1611b77778c8?w=600&h=320&fit=crop&q=82',
  'spinach':         'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=600&h=320&fit=crop&q=82',
  'kale':            'https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?w=600&h=320&fit=crop&q=82',
  'lettuce':         'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=320&fit=crop&q=82',
  'swiss chard':     'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=600&h=320&fit=crop&q=82',
  'arugula':         'https://images.unsplash.com/photo-1556909172-8c2f746f9138?w=600&h=320&fit=crop&q=82',
  'collard greens':  'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=600&h=320&fit=crop&q=82',
  'bok choy':        'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=600&h=320&fit=crop&q=82',
  'cabbage':         'https://images.unsplash.com/photo-1518977676405-d4660bbe25e3?w=600&h=320&fit=crop&q=82',
  'brussels sprouts':'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=600&h=320&fit=crop&q=82',
  'microgreens':     'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=320&fit=crop&q=82',
  'tomatoes':        'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&h=320&fit=crop&q=82',
  'tomatoes (cherry)':'https://images.unsplash.com/photo-1561155707-29c35e855ef5?w=600&h=320&fit=crop&q=82',
  'bell peppers':    'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&h=320&fit=crop&q=82',
  'jalapeños':       'https://images.unsplash.com/photo-1596565611890-efa9e3f47c04?w=600&h=320&fit=crop&q=82',
  'chili peppers':   'https://images.unsplash.com/photo-1596565611890-efa9e3f47c04?w=600&h=320&fit=crop&q=82',
  'cucumbers':       'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=600&h=320&fit=crop&q=82',
  'zucchini':        'https://images.unsplash.com/photo-1563635271742-c7e2b5b5e718?w=600&h=320&fit=crop&q=82',
  'summer squash':   'https://images.unsplash.com/photo-1563635271742-c7e2b5b5e718?w=600&h=320&fit=crop&q=82',
  'eggplant':        'https://images.unsplash.com/photo-1613743983303-b3e89f8a2b80?w=600&h=320&fit=crop&q=82',
  'okra':            'https://images.unsplash.com/photo-1573167278390-76a1d44a2ac6?w=600&h=320&fit=crop&q=82',
  'tomatillos':      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&h=320&fit=crop&q=82',
  'carrots':         'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&h=320&fit=crop&q=82',
  'beets':           'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=600&h=320&fit=crop&q=82',
  'radishes':        'https://images.unsplash.com/photo-1592997570678-3fde4ee22b3e?w=600&h=320&fit=crop&q=82',
  'turnips':         'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=600&h=320&fit=crop&q=82',
  'sweet potatoes':  'https://images.unsplash.com/photo-1601579112934-17ac2aa86292?w=600&h=320&fit=crop&q=82',
  'potatoes':        'https://images.unsplash.com/photo-1518977676405-d4660bbe25e3?w=600&h=320&fit=crop&q=82',
  'parsnips':        'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&h=320&fit=crop&q=82',
  'garlic':          'https://images.unsplash.com/photo-1548010860-293cfb4572e3?w=600&h=320&fit=crop&q=82',
  'onions':          'https://images.unsplash.com/photo-1518977812040-6e81a1c88f71?w=600&h=320&fit=crop&q=82',
  'fennel':          'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&h=320&fit=crop&q=82',
  'ginger':          'https://images.unsplash.com/photo-1615485290382-eef8e9f3f5aa?w=600&h=320&fit=crop&q=82',
  'turmeric':        'https://images.unsplash.com/photo-1615485290382-eef8e9f3f5aa?w=600&h=320&fit=crop&q=82',
  'green beans':     'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=600&h=320&fit=crop&q=82',
  'edamame':         'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=600&h=320&fit=crop&q=82',
  'snow peas':       'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=600&h=320&fit=crop&q=82',
  'sugar snap peas': 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=600&h=320&fit=crop&q=82',
  'garden peas':     'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=600&h=320&fit=crop&q=82',
  'chickpeas':       'https://images.unsplash.com/photo-1515518554379-14c8c7d4fe50?w=600&h=320&fit=crop&q=82',
  'lentils':         'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=600&h=320&fit=crop&q=82',
  'broccoli':        'https://images.unsplash.com/photo-1584868404890-b3777b1bef93?w=600&h=320&fit=crop&q=82',
  'cauliflower':     'https://images.unsplash.com/photo-1568584711271-6d7e2e59e3ea?w=600&h=320&fit=crop&q=82',
  'kohlrabi':        'https://images.unsplash.com/photo-1568584711271-6d7e2e59e3ea?w=600&h=320&fit=crop&q=82',
  'green onions':    'https://images.unsplash.com/photo-1548010860-293cfb4572e3?w=600&h=320&fit=crop&q=82',
  'leeks':           'https://images.unsplash.com/photo-1548010860-293cfb4572e3?w=600&h=320&fit=crop&q=82',
  'strawberries':    'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&h=320&fit=crop&q=82',
  'blueberries':     'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=600&h=320&fit=crop&q=82',
  'watermelon':      'https://images.unsplash.com/photo-1467100421209-2d62f3e27479?w=600&h=320&fit=crop&q=82',
  'cantaloupe':      'https://images.unsplash.com/photo-1467100421209-2d62f3e27479?w=600&h=320&fit=crop&q=82',
  'lemon':           'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=600&h=320&fit=crop&q=82',
  'lime':            'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=600&h=320&fit=crop&q=82',
  'avocado':         'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&h=320&fit=crop&q=82',
  'moringa':         'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=320&fit=crop&q=82',
  'stevia':          'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&h=320&fit=crop&q=82',
  'ashwagandha':     'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=320&fit=crop&q=82',
  'sunflower sprouts':'https://images.unsplash.com/photo-1469460340997-2f854421e72f?w=600&h=320&fit=crop&q=82',
  'pea shoots':      'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=600&h=320&fit=crop&q=82',
  'radish sprouts':  'https://images.unsplash.com/photo-1592997570678-3fde4ee22b3e?w=600&h=320&fit=crop&q=82',
  'wheatgrass':      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=320&fit=crop&q=82',
  'broccoli sprouts':'https://images.unsplash.com/photo-1584868404890-b3777b1bef93?w=600&h=320&fit=crop&q=82',
};

function getPlantPhoto(name: string, variety?: string): string {
  const nameLower = name.toLowerCase().trim();
  const varLower  = (variety || '').toLowerCase().trim();

  // 1. Exact variety+name combo
  if (varLower) {
    const combo = VARIETY_PHOTOS[`${nameLower}|${varLower}`];
    if (combo) return combo;
  }

  // 2. Plant name exact match
  const byName = PLANT_PHOTOS[nameLower];
  if (byName) return byName;

  // 3. Keyword fallback for custom plants or anything not in the map
  const combined = `${nameLower} ${varLower}`;
  if (combined.includes('tomato'))    return PLANT_PHOTOS['tomatoes']!;
  if (combined.includes('kale') || combined.includes('collard') || combined.includes('chard'))
    return PLANT_PHOTOS['kale']!;
  if (combined.includes('spinach'))   return PLANT_PHOTOS['spinach']!;
  if (combined.includes('lettuce'))   return PLANT_PHOTOS['lettuce']!;
  if (combined.includes('carrot'))    return PLANT_PHOTOS['carrots']!;
  if (combined.includes('pepper'))    return PLANT_PHOTOS['bell peppers']!;
  if (combined.includes('cucumber'))  return PLANT_PHOTOS['cucumbers']!;
  if (combined.includes('zucchini') || combined.includes('squash'))
    return PLANT_PHOTOS['zucchini']!;
  if (combined.includes('bean'))      return PLANT_PHOTOS['green beans']!;
  if (combined.includes('pea'))       return PLANT_PHOTOS['snow peas']!;
  if (combined.includes('broccoli'))  return PLANT_PHOTOS['broccoli']!;
  if (combined.includes('cauliflower')) return PLANT_PHOTOS['cauliflower']!;
  if (combined.includes('garlic') || combined.includes('onion') || combined.includes('leek'))
    return PLANT_PHOTOS['garlic']!;
  if (combined.includes('basil'))     return PLANT_PHOTOS['basil']!;
  if (combined.includes('mint'))      return PLANT_PHOTOS['mint']!;
  if (combined.includes('rosemary'))  return PLANT_PHOTOS['rosemary']!;
  if (combined.includes('lavender'))  return PLANT_PHOTOS['lavender']!;
  if (combined.includes('parsley'))   return PLANT_PHOTOS['parsley']!;
  if (combined.includes('cilantro'))  return PLANT_PHOTOS['cilantro']!;
  if (combined.includes('strawberry')) return PLANT_PHOTOS['strawberries']!;
  if (combined.includes('blueberry') || combined.includes('raspberry') || combined.includes('berry'))
    return PLANT_PHOTOS['blueberries']!;
  if (combined.includes('avocado'))   return PLANT_PHOTOS['avocado']!;
  if (combined.includes('lentil'))    return PLANT_PHOTOS['lentils']!;
  if (combined.includes('chickpea'))  return PLANT_PHOTOS['chickpeas']!;
  if (combined.includes('sunflower')) return PLANT_PHOTOS['sunflower sprouts']!;

  // Ultimate fallback — search Unsplash by plant name (source.unsplash.com still resolves via redirect)
  const query = encodeURIComponent(`${nameLower} ${varLower} plant`.trim());
  return `https://source.unsplash.com/600x320/?${query}`;
}

const STAGE_CONFIG = {
  seed:    { label: 'Seed',    emoji: '🌰', pill: 'bg-amber-100 text-amber-800 border-amber-300',    bar: 'bg-amber-300' },
  growing: { label: 'Growing', emoji: '🌱', pill: 'bg-pink-100 text-pink-700 border-pink-300',        bar: 'bg-pink-300' },
  ready:   { label: 'Ready',   emoji: '🌿', pill: 'bg-emerald-100 text-emerald-700 border-emerald-300', bar: 'bg-emerald-400' },
};

function getRecipesUsingPlant(plantName: string): string[] {
  // Strip variety info in parens, lowercase
  const keyword = plantName.toLowerCase().replace(/\s*\(.*?\)\s*/g, '').trim();
  // Handle plurals: "Cucumbers" → "cucumber", "Tomatoes" → "tomato", "Berries" → "berry"
  const singular = keyword.replace(/ies$/, 'y').replace(/ves$/, 'f').replace(/s$/, '');

  const matches: string[] = [];
  for (const [recipeName, recipe] of Object.entries(PRELOADED_RECIPES as Record<string, any>)) {
    const ingredients: string[] = recipe?.ingredients?.map((i: any) => (i.name || '').toLowerCase()) || [];
    const found = ingredients.some(ing =>
      ing.includes(keyword) ||
      ing.includes(singular) ||
      keyword.split(' ').every(word => word.length > 3 && ing.includes(word)) ||
      singular.split(' ').every(word => word.length > 3 && ing.includes(word))
    );
    if (found) matches.push(recipeName);
  }
  return matches.sort();
}

interface PlantCardProps {
  plant: Plant;
  idx: number;
  onAdvance: (idx: number, stage: Plant['stage']) => void;
  onRemove: (idx: number) => void;
}

function PlantCard({ plant, idx, onAdvance, onRemove }: PlantCardProps) {
  const [showInfo, setShowInfo] = useState(false);
  const stage = STAGE_CONFIG[plant.stage];
  const care = getPlantCare(plant.name);
  const usedIn = getRecipesUsingPlant(plant.name);

  const stages: Plant['stage'][] = ['seed', 'growing', 'ready'];

  return (
    <Card className="shadow-sm overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.22)' }}>
      {/* Plant photo header */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={getPlantPhoto(plant.name, plant.variety)}
          alt={plant.name}
          className="w-full h-full object-cover"
          onError={e => {
            (e.currentTarget as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=320&fit=crop&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-2.5 left-3 right-10">
          <p className="text-white font-serif font-bold text-base leading-tight drop-shadow-lg">
            {stage.emoji} {plant.name}
          </p>
          {plant.variety && <p className="text-white/80 text-[10px] mt-0.5">{plant.variety}</p>}
        </div>
        <button
          onClick={() => onRemove(idx)}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/55 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
        <span className={cn("absolute top-2 left-3 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border", stage.pill)}>
          {stage.label}
        </span>
      </div>
      <div className={cn("h-1", stage.bar)} />
      <CardContent className="p-4 space-y-3 relative">
        <div />

        {/* Stage pills — clickable */}
        <div className="flex gap-1.5">
          {stages.map(s => {
            const cfg = STAGE_CONFIG[s];
            const isActive = plant.stage === s;
            const stageIdx = stages.indexOf(s);
            const currentIdx = stages.indexOf(plant.stage);
            const canClick = stageIdx === currentIdx + 1;
            return (
              <button
                key={s}
                onClick={() => canClick && onAdvance(idx, s)}
                disabled={!canClick && !isActive}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all",
                  isActive ? cfg.pill + " ring-1 ring-offset-1 ring-current" : "bg-muted/30 text-muted-foreground border-border/40",
                  canClick && "cursor-pointer hover:opacity-80 hover:scale-105",
                  !canClick && !isActive && "opacity-40 cursor-default"
                )}>
                {cfg.emoji} {cfg.label}
              </button>
            );
          })}
        </div>

        {/* Used in recipes */}
        {usedIn.length > 0 && (
          <div className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground/70">Used in: </span>
            <span className="text-primary font-medium">
              {usedIn.join(', ')}
            </span>
          </div>
        )}
        {usedIn.length === 0 && (
          <p className="text-xs text-muted-foreground/50 italic">No recipe matches found yet</p>
        )}

        {/* Info button */}
        {care && (
          <div>
            <button
              onClick={() => setShowInfo(v => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold border border-primary/20 hover:bg-primary/20 transition-colors">
              <Info className="w-3 h-3" />
              Info {showInfo ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden">
                  <div className="mt-2 p-3 bg-muted/30 rounded-xl space-y-1.5 border border-border/40 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-medium">Difficulty</span>
                      <span className={cn("font-bold", care.difficulty === 'Easy' ? 'text-green-600' : care.difficulty === 'Medium' ? 'text-amber-600' : 'text-red-500')}>{care.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-medium">Days to Harvest</span>
                      <span className="font-semibold text-foreground">{care.daysToHarvest}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-medium">Sunlight</span>
                      <span className="font-semibold text-foreground text-right max-w-[55%]">{care.sunlight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-medium">Water</span>
                      <span className="font-semibold text-foreground text-right max-w-[55%]">{care.water}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-medium">Spacing</span>
                      <span className="font-semibold text-foreground">{care.spacing}</span>
                    </div>
                    <div className="pt-1 border-t border-border/30">
                      <p className="text-muted-foreground font-medium mb-0.5">💡 Tips</p>
                      <p className="text-foreground/80 leading-snug">{care.tips}</p>
                    </div>
                    <div className="pt-1 border-t border-border/30">
                      <p className="text-muted-foreground font-medium mb-0.5">🌿 Good Companions</p>
                      <p className="text-foreground/80">{care.companions}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function GrowPage() {
  const { garden, setState, addXp } = useEveStore();
  const [selectedCat, setSelectedCat] = useState('');
  const [selectedPlant, setSelectedPlant] = useState('');
  const [selectedVariety, setSelectedVariety] = useState('');
  const [customPlantName, setCustomPlantName] = useState('');
  const [useCustom, setUseCustom] = useState(false);

  const categories = Object.keys(GARDEN_CATALOG);

  const plantsInCat: string[] = selectedCat
    ? GARDEN_CATALOG[selectedCat]?.map(p => p.name) || []
    : [];

  const varieties: string[] = selectedCat && selectedPlant
    ? GARDEN_CATALOG[selectedCat]?.find(p => p.name === selectedPlant)?.varieties || []
    : [];

  const finalPlantName = useCustom ? customPlantName.trim() : selectedPlant;

  const addPlant = () => {
    if (!finalPlantName) {
      toast.error('Enter or select a plant name first');
      return;
    }
    const newPlant: Plant = {
      name: finalPlantName,
      variety: useCustom ? '' : selectedVariety,
      category: useCustom ? 'Custom' : selectedCat,
      stage: 'seed',
    };
    setState(prev => ({ ...prev, garden: [...prev.garden, newPlant] }));
    addXp(50);
    toast.success(`🌱 ${finalPlantName} added to your garden! +50 XP`);
    setSelectedPlant('');
    setSelectedVariety('');
    setCustomPlantName('');
  };

  const handleAdvance = (idx: number, toStage: Plant['stage']) => {
    setState(prev => {
      const updated = [...prev.garden];
      updated[idx] = { ...updated[idx], stage: toStage };
      if (toStage === 'ready') {
        toast.success(`🎉 ${updated[idx].name} is ready to harvest! +25 XP`);
      } else {
        toast.success(`🌱 ${updated[idx].name} is now ${toStage}! +25 XP`);
      }
      return { ...prev, garden: updated };
    });
    addXp(25);
  };

  const removePlant = (idx: number) => {
    setState(prev => {
      const updated = [...prev.garden];
      updated.splice(idx, 1);
      return { ...prev, garden: updated };
    });
  };

  const readyCount = garden.filter(p => p.stage === 'ready').length;
  const growingCount = garden.filter(p => p.stage === 'growing').length;

  return (
    <div className="p-5 space-y-6 animate-in fade-in duration-500 pb-24">
      <div className="-mx-5 -mt-5">
        <PageHero
          title="Garden"
          subtitle={`${garden.length} plant${garden.length !== 1 ? 's' : ''} · ${readyCount} ready · ${growingCount} growing`}
          accent="🌿"
          photos={[
            "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop&crop=center&q=90",
            "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=300&h=300&fit=crop&crop=center&q=90",
            "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300&h=300&fit=crop&crop=center&q=90",
          ]}
        />
      </div>

      {/* Add plant card */}
      <Card className="border-border/50 shadow-sm overflow-hidden">
        {/* Live plant photo preview — appears when a name is chosen */}
        {finalPlantName ? (
          <div className="relative h-44 overflow-hidden">
            <img
              src={getPlantPhoto(finalPlantName)}
              alt={finalPlantName}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <p className="text-white font-serif font-bold text-xl leading-tight drop-shadow-lg">
                {finalPlantName}
              </p>
              <p className="text-white/70 text-[10px] uppercase tracking-widest font-bold mt-0.5">
                Ready to plant
              </p>
            </div>
            <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-500/80 text-white border border-emerald-300/40 backdrop-blur-sm">
              🌰 Seed Stage
            </span>
          </div>
        ) : (
          <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-400" />
        )}
        <CardContent className="p-4 space-y-3">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary" /> Add a Plant
          </h3>

          {/* Toggle: catalog or custom */}
          <div className="flex gap-2">
            <button
              onClick={() => setUseCustom(false)}
              className={cn("flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors",
                !useCustom ? "bg-primary text-primary-foreground border-primary" : "bg-muted/30 text-muted-foreground border-border/40 hover:border-border")}>
              From Catalog
            </button>
            <button
              onClick={() => setUseCustom(true)}
              className={cn("flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors",
                useCustom ? "bg-primary text-primary-foreground border-primary" : "bg-muted/30 text-muted-foreground border-border/40 hover:border-border")}>
              Custom Name
            </button>
          </div>

          {useCustom ? (
            <div>
              <label className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest mb-1 block">Plant Name</label>
              <input
                value={customPlantName}
                onChange={e => setCustomPlantName(e.target.value)}
                placeholder="e.g. Dragon Fruit, Moringa, Purslane…"
                className="w-full bg-muted/20 border border-border rounded-xl px-3 py-2 text-sm text-foreground outline-none focus:border-primary placeholder:text-muted-foreground/50"
              />
              <p className="text-[10px] text-muted-foreground/60 mt-1">Type any plant not in the catalog</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div>
                <label className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest mb-1 block">Category</label>
                <select value={selectedCat} onChange={e => { setSelectedCat(e.target.value); setSelectedPlant(''); setSelectedVariety(''); }}
                  className="w-full bg-muted/20 border border-border rounded-xl px-3 py-2 text-sm text-foreground outline-none focus:border-primary">
                  <option value="">-- Select Category --</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              {selectedCat && (
                <div>
                  <label className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest mb-1 block">Plant</label>
                  <select value={selectedPlant} onChange={e => { setSelectedPlant(e.target.value); setSelectedVariety(''); }}
                    className="w-full bg-muted/20 border border-border rounded-xl px-3 py-2 text-sm text-foreground outline-none focus:border-primary">
                    <option value="">-- Select Plant --</option>
                    {plantsInCat.map(name => <option key={name} value={name}>{name}</option>)}
                  </select>
                </div>
              )}
              {selectedPlant && varieties.length > 0 && (
                <div>
                  <label className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest mb-1 block">Variety (optional)</label>
                  <select value={selectedVariety} onChange={e => setSelectedVariety(e.target.value)}
                    className="w-full bg-muted/20 border border-border rounded-xl px-3 py-2 text-sm text-foreground outline-none focus:border-primary">
                    <option value="">-- Any Variety --</option>
                    {varieties.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              )}
            </div>
          )}

          <Button onClick={addPlant} disabled={!finalPlantName} className="w-full h-10 rounded-xl font-bold text-xs uppercase tracking-widest">
            <Leaf className="w-4 h-4 mr-2" /> Plant It! (+50 XP)
          </Button>
        </CardContent>
      </Card>

      {/* Garden list */}
      {garden.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-lg font-serif text-foreground px-1">Your Garden</h2>
          <AnimatePresence>
            {garden.map((plant, idx) => (
              <motion.div key={`${plant.name}-${idx}`}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}>
                <PlantCard plant={plant} idx={idx} onAdvance={handleAdvance} onRemove={removePlant} />
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      ) : (
        <div className="text-center py-14 space-y-3">
          <div className="text-5xl">🌱</div>
          <p className="text-base font-serif text-muted-foreground">Your garden is empty</p>
          <p className="text-xs text-muted-foreground/70 max-w-xs mx-auto">Add plants above to track their growth, find recipes that use them, and get notified when to harvest!</p>
        </div>
      )}

      {/* Ready harvest callout */}
      {readyCount > 0 && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/40 rounded-2xl">
          <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
            🌿 {readyCount} plant{readyCount !== 1 ? 's are' : ' is'} ready to harvest!
          </p>
          <p className="text-xs text-emerald-600/80 dark:text-emerald-400/70 mt-1">
            Check the Shop tab — items you can grow yourself are marked "Harvest from Garden" instead of buying.
          </p>
        </div>
      )}
    </div>
  );
}
