const MAX_QUESTION = 1000;
const MAX_CONTEXT = 8192;

function readBody(req) {
  let b = req.body;
  if (typeof b === 'string') {
    try { b = JSON.parse(b); } catch { return null; }
  }
  if (!b || typeof b !== 'object' || Array.isArray(b) || Buffer.isBuffer(b)) return null;
  return b;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = readBody(req);
  if (!body) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  if (typeof body.question !== 'string' || (body.context != null && typeof body.context !== 'string')) {
    return res.status(400).json({ error: 'question is required' });
  }
  const question = body.question.trim();
  const context = body.context == null ? '' : body.context.trim();
  if (!question) {
    return res.status(400).json({ error: 'question is required' });
  }
  if (question.length > MAX_QUESTION || context.length > MAX_CONTEXT) {
    return res.status(400).json({ error: 'Input too long' });
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
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: `You are a friendly AI Wellness Coach for a vegan nutrition app called E.V.E. (Everything Vegan Ever).

User data context: ${context || 'No data available'}

User question: "${question}"

Give a warm, encouraging, personalized wellness insight in 3-4 sentences. Focus on plant-based nutrition, vegan fitness, and healthy habits. Use specific numbers from the context when available. End with one actionable tip. Keep it conversational and supportive. Use 1-2 emojis.`,
        }],
      }),
    });

    const data = await response.json();
    const block = data.content?.[0];
    const report = block?.type === 'text' ? block.text.trim() : 'Keep up the great plant-based work! 🌱';
    res.json({ report });
  } catch (err) {
    console.error('wellness-report failed:', err?.name);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
