export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question, context } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'question is required' });
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
    res.status(500).json({ error: err.message || 'Wellness report failed' });
  }
}
