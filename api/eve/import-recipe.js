export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  const { content } = await req.json();
  if (!content) return new Response(JSON.stringify({ error: 'content is required' }), { status: 400 });
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return new Response(JSON.stringify({ error: 'API key not configured' }), { status: 500 });

  let recipeContent = content;
  let fetchFailed = false;

  if (content.trim().startsWith('http')) {
    try {
      const pageResp = await fetch(content.trim(), {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; RecipeParser/1.0)' }
      });
      if (pageResp.ok) {
        const html = await pageResp.text();
        recipeContent = html
          .replace(/<script[\s\S]*?<\/script>/gi, '')
          .replace(/<style[\s\S]*?<\/style>/gi, '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/[^\x20-\x7E\n]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 6000);
      } else {
        fetchFailed = true;
      }
    } catch(e) {
      fetchFailed = true;
    }

    if (fetchFailed) {
      return new Response(JSON.stringify({ 
        error: 'Could not access that website. Please copy the recipe text and use the Paste tab instead.' 
      }), { status: 422 });
    }
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
          content: `Extract the recipe from this text. Return ONLY a JSON object, no other text, no markdown, no explanation.

{"title":"string","source":"string","prepTime":"X min","cookTime":"X min","difficulty":"Easy|Medium|Hard","tags":["tag1"],"ingredients":[{"name":"string","amount":"string","unit":"string"}],"steps":["step1"],"nutrition":{"calories":0,"protein":0,"carbs":0,"fat":0,"fiber":0}}

Text:
${recipeContent}`
        }]
      }),
    });

    const data = await response.json();
    const raw = (data.content?.[0]?.text || '').replace(/```json|```/g, '').trim();
    if (!raw.startsWith('{')) {
      return new Response(JSON.stringify({ error: 'Could not parse recipe. Try the Paste tab with the recipe text.' }), { status: 422 });
    }
    const parsed = JSON.parse(raw);
    return new Response(JSON.stringify({ recipe: parsed }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch(err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
