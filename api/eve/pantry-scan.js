export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { pantryItems, ingredients, meals } = req.body;
  const items = pantryItems || ingredients || [];
  if (!items.length) {
    return res.status(400).json({ error: 'ingredients required' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2048,
        messages: [{
          role: 'user',
          content: `I have these ingredients: ${items.join(', ')}

IMPORTANT: This is a 100% vegan app. Suggest ONLY fully plant-based vegan meals. Never suggest any animal products.

From this meal list, tell me which I can make (full or partial):
${(meals || []).join(', ')}

Also suggest 3 bonus VEGAN recipes I could make right now with what I have.

Return ONLY raw JSON:
{
  "canMakeFully": ["meal name"],
  "canMakePartially": [{"meal":"name","missing":["ingredient1"]}],
  "bonusRecipes": [{"title":"string","description":"string","extraIngredients":["extras"]}],
  "pantryTip": "one helpful tip"
}`,
        }],
      }),
    });

    const data = await response.json();
    const block = data.content?.[0];
    const raw = block?.type === 'text' ? block.text.replace(/```json|```/g, '').trim() : '';
    const parsed = JSON.parse(raw);
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Pantry scan failed' });
  }
}
