export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  const { content } = await req.json();
  if (!content) return new Response(JSON.stringify({ error: 'content is required' }), { status: 400 });
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return new Response(JSON.stringify({ error: 'API key not configured' }), { status: 500 });
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 2048, messages: [{ role: 'user', content: `Parse this into a vegan recipe JSON. Return ONLY raw JSON: {"title":"string","source":"string","prepTime":"string","cookTime":"string","difficulty":"Easy|Medium|Hard","tags":[],"ingredients":[{"name":"string","amount":"string","unit":"string"}],"steps":[],"nutrition":{"calories":0,"protein":0,"carbs":0,"fat":0,"fiber":0}}\n\nInput:\n${content}` }] }),
    });
    const data = await response.json();
    const raw = data.content?.[0]?.text?.replace(/```json|```/g, '').trim() || '';
    const parsed = JSON.parse(raw);
    return new Response(JSON.stringify({ recipe: parsed }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
