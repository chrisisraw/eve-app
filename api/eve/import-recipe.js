import dns from 'node:dns';
import net from 'node:net';

const MAX_TEXT = 12000;
const MAX_URL = 2000;
const MAX_REDIRECTS = 3;
const FETCH_TIMEOUT_MS = 8000;
const MAX_BODY_BYTES = 1024 * 1024;
const MAX_PAGE_CHARS = 6000;
const FETCH_FAILED = 'Could not access that website. Please copy the recipe text and use the Paste tab instead.';

function readBody(req) {
  let b = req.body;
  if (typeof b === 'string') {
    try { b = JSON.parse(b); } catch { return null; }
  }
  if (!b || typeof b !== 'object' || Array.isArray(b) || Buffer.isBuffer(b)) return null;
  return b;
}

// Parse an IPv6 literal into 8 16-bit groups, or null if malformed.
function parseIPv6(addr) {
  let a = addr.split('%')[0].toLowerCase();
  const dotted = a.match(/(\d+\.\d+\.\d+\.\d+)$/);
  if (dotted) {
    const p = dotted[1].split('.').map(Number);
    if (p.some((n) => n > 255)) return null;
    a = a.slice(0, -dotted[1].length) + ((p[0] << 8) | p[1]).toString(16) + ':' + ((p[2] << 8) | p[3]).toString(16);
  }
  const halves = a.split('::');
  if (halves.length > 2) return null;
  const head = halves[0] ? halves[0].split(':') : [];
  const tail = halves.length === 2 && halves[1] ? halves[1].split(':') : [];
  const fill = halves.length === 2 ? 8 - head.length - tail.length : 0;
  if (fill < 0 || (halves.length === 1 && head.length !== 8)) return null;
  const groups = [...head, ...Array(fill).fill('0'), ...tail].map((g) => parseInt(g, 16));
  if (groups.length !== 8 || groups.some((g) => !Number.isInteger(g) || g < 0 || g > 0xffff)) return null;
  return groups;
}

function isBlockedIPv4(addr) {
  const [a, b, c] = addr.split('.').map(Number);
  return (
    a === 0 || a === 10 || a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 0 && c === 0) ||
    (a === 192 && b === 0 && c === 2) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19)) ||
    (a === 198 && b === 51 && c === 100) ||
    (a === 203 && b === 0 && c === 113) ||
    a >= 224
  );
}

function isBlockedIPv6(addr) {
  const g = parseIPv6(addr);
  if (!g) return true;
  if (g.every((x) => x === 0)) return true; // ::
  if (g.slice(0, 7).every((x) => x === 0) && g[7] === 1) return true; // ::1
  if (g.slice(0, 5).every((x) => x === 0) && (g[5] === 0xffff || g[5] === 0)) {
    // ::ffff:a.b.c.d (mapped) and ::a.b.c.d (compatible): judge by the embedded IPv4
    return isBlockedIPv4(`${g[6] >> 8}.${g[6] & 255}.${g[7] >> 8}.${g[7] & 255}`);
  }
  if ((g[0] & 0xfe00) === 0xfc00) return true; // fc00::/7 unique-local
  if ((g[0] & 0xffc0) === 0xfe80) return true; // fe80::/10 link-local
  if ((g[0] & 0xffc0) === 0xfec0) return true; // fec0::/10 site-local
  if ((g[0] & 0xff00) === 0xff00) return true; // ff00::/8 multicast
  if (g[0] === 0x2001 && g[1] === 0x0db8) return true; // documentation
  if (g[0] === 0x0064 && g[1] === 0xff9b) return true; // 64:ff9b::/96 NAT64
  return false;
}

function isBlockedAddress(addr) {
  if (net.isIPv4(addr)) return isBlockedIPv4(addr);
  if (net.isIPv6(addr)) return isBlockedIPv6(addr);
  return true;
}

// Throws if the URL is not safe to fetch. Resolves the hostname and rejects if any answer is non-public.
async function assertPublicUrl(url) {
  if (url.protocol !== 'http:' && url.protocol !== 'https:') throw new Error('blocked');
  if (url.username || url.password) throw new Error('blocked');
  const host = url.hostname.replace(/^\[|\]$/g, '').toLowerCase();
  if (!host || host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') || host.endsWith('.internal')) {
    throw new Error('blocked');
  }
  if (net.isIP(host)) {
    if (isBlockedAddress(host)) throw new Error('blocked');
    return;
  }
  const answers = await dns.promises.lookup(host, { all: true });
  if (!answers.length || answers.some((a) => isBlockedAddress(a.address))) throw new Error('blocked');
}

async function readCapped(resp) {
  const reader = resp.body.getReader();
  const chunks = [];
  let total = 0;
  while (total < MAX_BODY_BYTES) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    total += value.length;
  }
  reader.cancel().catch(() => {});
  return new TextDecoder().decode(Buffer.concat(chunks.map((c) => Buffer.from(c))).subarray(0, MAX_BODY_BYTES));
}

// Fetch a public web page. Redirects are followed manually and every hop is re-checked.
async function fetchPublicPage(rawUrl) {
  const signal = AbortSignal.timeout(FETCH_TIMEOUT_MS);
  let url = new URL(rawUrl);
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    await assertPublicUrl(url);
    const resp = await fetch(url.href, {
      redirect: 'manual',
      signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; RecipeParser/1.0)' },
    });
    if (resp.status >= 300 && resp.status < 400) {
      const loc = resp.headers.get('location');
      if (!loc) throw new Error('bad redirect');
      url = new URL(loc, url);
      continue;
    }
    if (!resp.ok) throw new Error('bad status');
    return readCapped(resp);
  }
  throw new Error('too many redirects');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = readBody(req);
  if (!body) return res.status(400).json({ error: 'Invalid request' });
  const { content } = body;
  if (typeof content !== 'string') return res.status(400).json({ error: 'content is required' });
  const text = content.trim();
  if (!text) return res.status(400).json({ error: 'content is required' });

  const isUrl = /^https?:\/\//i.test(text);
  if (text.length > (isUrl ? MAX_URL : MAX_TEXT)) return res.status(400).json({ error: 'Input too long' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  let recipeContent = text;

  if (isUrl) {
    let parsedUrl;
    try {
      parsedUrl = new URL(text);
    } catch {
      return res.status(400).json({ error: 'Invalid URL' });
    }
    if (parsedUrl.username || parsedUrl.password) return res.status(400).json({ error: 'Invalid URL' });

    try {
      const html = await fetchPublicPage(text);
      recipeContent = html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/[^\x20-\x7E\n]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, MAX_PAGE_CHARS);
    } catch {
      return res.status(422).json({ error: FETCH_FAILED });
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
      return res.status(422).json({ error: 'Could not parse recipe. Try the Paste tab with the recipe text.' });
    }
    const parsed = JSON.parse(raw);
    return res.status(200).json({ recipe: parsed });
  } catch (err) {
    console.error('import-recipe failed:', err?.name);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
