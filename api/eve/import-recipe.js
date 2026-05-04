export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'content is required' });
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
          content: `Parse this into a vegan recipe JSON. If the recipe contains non-vegan ingredients, substitute them with vegan alternatives.

Input:
${content}

Return ONLY raw JSON, no markdown, no backticks:
{
  "title": "string",
  "source": "URL or 'User uploaded'",
  "prepTime": "X min",
  "cookTime": "X min",
  "difficulty": "Easy|Medium|Hard",
  "tags": ["tag1","tag2"],
  "ingredients": [{"name":"string","amount":"string","unit":"string"}],
  "steps": ["string"],
  "nutrition": {"calories":0,"protein":0,"carbs":0,"fat":0,"fiber":0}
}
Tags: pick 2-4 from [high-protein,quick,raw,gluten-free,oil-free,nut-free,low-carb,high-fiber,spicy,light]
Nutrition is per serving for 2 servings.`,
        }],
      }),
    });

    const data = await response.json();
    const block = data.content?.[0];
    const raw = block?.type === 'text' ? block.text.replace(/```json|```/g, '').trim() : '';
    const parsed = JSON.parse(raw);
    res.json({ recipe: parsed });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to parse recipe' });
  }
}
