// Plain-node tests for api/eve/import-recipe.js and api/eve/wellness-report.js.
// fetch and DNS are stubbed: no network, no real Anthropic call. Run: node scripts/test-api-hardening.mjs
import dns from 'node:dns';
import assert from 'node:assert/strict';

process.env.ANTHROPIC_API_KEY = 'test-key-not-real';
const { default: importRecipe } = await import('../api/eve/import-recipe.js');
const { default: wellness } = await import('../api/eve/wellness-report.js');

let calls = [];
let pages = {};     // url -> { status, headers, body }
let dnsMap = {};    // hostname -> [addresses]
let lookups = [];
let anthropicText = '{"title":"T"}';

globalThis.fetch = async (url, opts = {}) => {
  calls.push({ url: String(url), opts });
  if (String(url).startsWith('https://api.anthropic.com/')) {
    return new Response(JSON.stringify({ content: [{ type: 'text', text: anthropicText }] }), { status: 200 });
  }
  const p = pages[String(url)];
  if (!p) throw new Error('stub: unexpected fetch ' + url);
  return new Response(p.body ?? '', { status: p.status ?? 200, headers: p.headers ?? {} });
};
dns.promises.lookup = async (host) => {
  lookups.push(host);
  if (!dnsMap[host]) throw new Error('ENOTFOUND');
  return dnsMap[host].map((address) => ({ address, family: address.includes(':') ? 6 : 4 }));
};

const anthropicCalls = () => calls.filter((c) => c.url.startsWith('https://api.anthropic.com/')).length;
const reset = () => { calls = []; pages = {}; dnsMap = {}; lookups = []; anthropicText = '{"title":"T"}'; };

function run(handler, { method = 'POST', body } = {}) {
  return new Promise((resolve) => {
    const res = {
      code: 200,
      status(c) { this.code = c; return this; },
      json(o) { resolve({ status: this.code, body: o }); return this; },
    };
    Promise.resolve(handler({ method, body }, res)).catch((e) => resolve({ status: 'THREW', body: { error: e.message } }));
  });
}

let pass = 0, fail = 0;
async function t(name, fn) {
  reset();
  try { await fn(); pass++; console.log('PASS', name); }
  catch (e) { fail++; console.log('FAIL', name, '-', e.message); }
}
const noInternals = (r) => {
  const s = JSON.stringify(r.body);
  assert.ok(!/stub:|ENOTFOUND|SyntaxError|Unexpected|boom|internal-host|\bat \S+:\d+/.test(s), 'leaked internal message: ' + s);
};

// ---------- shared checks, both functions ----------
const fns = [
  ['import-recipe', importRecipe, 'content', 'a'.repeat(12001), 'lentil soup recipe'],
  ['wellness-report', wellness, 'question', 'q'.repeat(1001), 'am I getting enough protein?'],
];
for (const [name, h, field, big, ok] of fns) {
  await t(`${name}: GET -> 405, no fetch`, async () => {
    const r = await run(h, { method: 'GET' });
    assert.equal(r.status, 405); assert.equal(calls.length, 0);
  });
  await t(`${name}: empty body (undefined) -> 400, no fetch`, async () => {
    const r = await run(h, { body: undefined });
    assert.equal(r.status, 400); assert.equal(calls.length, 0);
  });
  await t(`${name}: empty object -> 400, no fetch`, async () => {
    const r = await run(h, { body: {} });
    assert.equal(r.status, 400); assert.equal(calls.length, 0);
  });
  await t(`${name}: malformed JSON string -> 400 (not 500), no fetch`, async () => {
    const r = await run(h, { body: '{"' + field + '": ' });
    assert.equal(r.status, 400); assert.equal(calls.length, 0); noInternals(r);
  });
  await t(`${name}: JSON array body -> 400`, async () => {
    const r = await run(h, { body: [1, 2] });
    assert.equal(r.status, 400); assert.equal(calls.length, 0);
  });
  await t(`${name}: oversized ${field} -> 400, fetch NOT called`, async () => {
    const r = await run(h, { body: { [field]: big } });
    assert.equal(r.status, 400); assert.equal(calls.length, 0);
  });
  await t(`${name}: wrong type (number) -> 400, no fetch`, async () => {
    const r = await run(h, { body: { [field]: 12345 } });
    assert.equal(r.status, 400); assert.equal(calls.length, 0);
  });
  await t(`${name}: wrong type (array/object) -> 400, no fetch`, async () => {
    assert.equal((await run(h, { body: { [field]: ['x'] } })).status, 400);
    assert.equal((await run(h, { body: { [field]: { a: 1 } } })).status, 400);
    assert.equal(calls.length, 0);
  });
  await t(`${name}: whitespace-only ${field} -> 400, no fetch`, async () => {
    const r = await run(h, { body: { [field]: '   \n ' } });
    assert.equal(r.status, 400); assert.equal(calls.length, 0);
  });
  await t(`${name}: valid small input reaches Anthropic stub exactly once`, async () => {
    const r = await run(h, { body: { [field]: ok } });
    assert.equal(r.status, 200); assert.equal(anthropicCalls(), 1); assert.equal(calls.length, 1);
  });
  await t(`${name}: Anthropic fetch throws -> 500 generic, no internal message`, async () => {
    const orig = globalThis.fetch;
    globalThis.fetch = async () => { throw new Error('boom internal-host:1234'); };
    const r = await run(h, { body: { [field]: ok } });
    globalThis.fetch = orig;
    assert.equal(r.status, 500); assert.equal(r.body.error, 'Something went wrong'); noInternals(r);
  });
  await t(`${name}: input exactly at the cap is accepted`, async () => {
    const r = await run(h, { body: { [field]: 'a'.repeat(big.length - 1) } });
    assert.equal(r.status, 200); assert.equal(anthropicCalls(), 1);
  });
}

// ---------- wellness-report specific ----------
await t('wellness: context 8192 ok, 8193 -> 400 no fetch', async () => {
  assert.equal((await run(wellness, { body: { question: 'hi', context: 'c'.repeat(8192) } })).status, 200);
  reset();
  const r = await run(wellness, { body: { question: 'hi', context: 'c'.repeat(8193) } });
  assert.equal(r.status, 400); assert.equal(calls.length, 0);
});
await t('wellness: context wrong type -> 400 no fetch', async () => {
  const r = await run(wellness, { body: { question: 'hi', context: { a: 1 } } });
  assert.equal(r.status, 400); assert.equal(calls.length, 0);
});
await t('wellness: context omitted/null ok', async () => {
  assert.equal((await run(wellness, { body: { question: 'hi' } })).status, 200);
  assert.equal((await run(wellness, { body: { question: 'hi', context: null } })).status, 200);
});
await t('wellness: JSON string body is parsed', async () => {
  const r = await run(wellness, { body: JSON.stringify({ question: 'hi' }) });
  assert.equal(r.status, 200); assert.equal(anthropicCalls(), 1);
});

// ---------- import-recipe: URL / SSRF ----------
const rejected = async (url, dnsSetup) => {
  if (dnsSetup) dnsMap = dnsSetup;
  const r = await run(importRecipe, { body: { content: url } });
  assert.ok([400, 422].includes(r.status), `expected 400/422 for ${url}, got ${r.status}`);
  assert.equal(anthropicCalls(), 0, 'Anthropic must not be called');
  assert.equal(calls.length, 0, 'no outbound fetch at all for ' + url);
  noInternals(r);
};
for (const u of [
  'http://127.0.0.1/', 'http://127.1/', 'http://2130706433/', 'http://10.0.0.5/', 'http://172.16.0.1/', 'http://192.168.1.1/',
  'http://169.254.169.254/latest/meta-data/', 'http://100.64.0.1/', 'http://0.0.0.0/', 'http://[::1]/', 'http://[::]/',
  'http://[fe80::1]/', 'http://[fd00::1]/', 'http://[fc00::1]/', 'http://[::ffff:127.0.0.1]/', 'http://[::ffff:a9fe:a9fe]/',
  'http://[fd00:ec2::254]/', 'http://localhost/', 'http://LOCALHOST:3000/', 'http://foo.localhost/', 'http://printer.local/',
  'http://metadata.google.internal/',
]) await t(`import-recipe SSRF rejected: ${u}`, () => rejected(u));

await t('import-recipe: hostname resolving to private address rejected', () =>
  rejected('http://evil.example.com/', { 'evil.example.com': ['10.1.2.3'] }));
await t('import-recipe: hostname with one public + one private answer rejected', () =>
  rejected('https://mixed.example.com/', { 'mixed.example.com': ['93.184.216.34', '169.254.169.254'] }));
await t('import-recipe: hostname resolving to IPv6 loopback rejected', () =>
  rejected('https://v6.example.com/', { 'v6.example.com': ['::1'] }));
await t('import-recipe: unresolvable hostname -> 422, no Anthropic', () =>
  rejected('https://nope.example.com/'));
await t('import-recipe: credentials in URL -> 400, no fetch', async () => {
  const r = await run(importRecipe, { body: { content: 'https://user:pw@example.com/' } });
  assert.equal(r.status, 400); assert.equal(calls.length, 0); assert.equal(lookups.length, 0);
});
await t('import-recipe: ftp:// is never fetched (treated as plain text)', async () => {
  await run(importRecipe, { body: { content: 'ftp://example.com/x' } });
  assert.ok(!calls.some((c) => c.url.startsWith('ftp:')));
});
await t('import-recipe: URL over 2000 chars -> 400, no fetch', async () => {
  const r = await run(importRecipe, { body: { content: 'https://example.com/' + 'a'.repeat(2000) } });
  assert.equal(r.status, 400); assert.equal(calls.length, 0);
});
await t('import-recipe: redirect to private IP rejected, Anthropic not called', async () => {
  dnsMap = { 'good.example.com': ['93.184.216.34'] };
  pages['https://good.example.com/r'] = { status: 302, headers: { location: 'http://169.254.169.254/latest/meta-data/' } };
  const r = await run(importRecipe, { body: { content: 'https://good.example.com/r' } });
  assert.equal(r.status, 422); assert.equal(anthropicCalls(), 0);
  assert.ok(!calls.some((c) => c.url.includes('169.254')), 'private hop must never be fetched');
});
await t('import-recipe: redirect to hostname that resolves private rejected', async () => {
  dnsMap = { 'good.example.com': ['93.184.216.34'], 'internal.example.com': ['10.0.0.9'] };
  pages['https://good.example.com/r'] = { status: 301, headers: { location: 'https://internal.example.com/x' } };
  const r = await run(importRecipe, { body: { content: 'https://good.example.com/r' } });
  assert.equal(r.status, 422); assert.equal(anthropicCalls(), 0);
  assert.ok(!calls.some((c) => c.url.includes('internal.example.com')));
});
await t('import-recipe: redirect to non-http scheme rejected', async () => {
  dnsMap = { 'good.example.com': ['93.184.216.34'] };
  pages['https://good.example.com/r'] = { status: 302, headers: { location: 'file:///etc/passwd' } };
  const r = await run(importRecipe, { body: { content: 'https://good.example.com/r' } });
  assert.equal(r.status, 422); assert.equal(anthropicCalls(), 0);
});
await t('import-recipe: >3 redirects rejected (4th hop never fetched)', async () => {
  dnsMap = { 'a.example.com': ['93.184.216.34'] };
  for (let i = 0; i < 6; i++) pages[`https://a.example.com/${i}`] = { status: 302, headers: { location: `/${i + 1}` } };
  const r = await run(importRecipe, { body: { content: 'https://a.example.com/0' } });
  assert.equal(r.status, 422); assert.equal(anthropicCalls(), 0);
  assert.equal(calls.length, 4, 'original + 3 redirects = 4 fetches, got ' + calls.length);
});
await t('import-recipe: exactly 3 redirects then 200 is accepted', async () => {
  dnsMap = { 'a.example.com': ['93.184.216.34'] };
  for (let i = 0; i < 3; i++) pages[`https://a.example.com/${i}`] = { status: 302, headers: { location: `/${i + 1}` } };
  pages['https://a.example.com/3'] = { status: 200, body: '<p>Soup</p>' };
  const r = await run(importRecipe, { body: { content: 'https://a.example.com/0' } });
  assert.equal(r.status, 200); assert.equal(anthropicCalls(), 1);
});
await t('import-recipe: redirect fetch uses redirect:"manual" and a timeout signal', async () => {
  dnsMap = { 'good.example.com': ['93.184.216.34'] };
  pages['https://good.example.com/'] = { status: 200, body: '<p>Soup</p>' };
  await run(importRecipe, { body: { content: 'https://good.example.com/' } });
  const page = calls.find((c) => c.url === 'https://good.example.com/');
  assert.equal(page.opts.redirect, 'manual');
  assert.ok(page.opts.signal instanceof AbortSignal);
});
await t('import-recipe: normal public URL works; page text sliced to 6000, tags stripped', async () => {
  dnsMap = { 'recipes.example.com': ['93.184.216.34'] };
  pages['https://recipes.example.com/soup'] = { status: 200, body: '<script>evil()</script><p>' + 'word '.repeat(5000) + '</p>' };
  const r = await run(importRecipe, { body: { content: 'https://recipes.example.com/soup' } });
  assert.equal(r.status, 200); assert.deepEqual(r.body, { recipe: { title: 'T' } });
  assert.equal(anthropicCalls(), 1);
  const sent = JSON.parse(calls.find((c) => c.url.includes('anthropic')).opts.body).messages[0].content;
  const pageText = sent.split('\nText:\n')[1];
  assert.ok(pageText.length <= 6000, 'page text length ' + pageText.length);
  assert.ok(!pageText.includes('evil') && !pageText.includes('<p>'));
});
await t('import-recipe: >1 MB body is read only partially and does not hang', async () => {
  dnsMap = { 'big.example.com': ['93.184.216.34'] };
  let pulled = 0;
  const stream = new ReadableStream({
    pull(c) { pulled += 65536; c.enqueue(new Uint8Array(65536).fill(97)); if (pulled > 20 * 1024 * 1024) c.close(); },
  });
  pages['https://big.example.com/'] = { status: 200, body: stream };
  const r = await run(importRecipe, { body: { content: 'https://big.example.com/' } });
  assert.equal(r.status, 200);
  assert.ok(pulled <= 2 * 1024 * 1024, 'pulled ' + pulled + ' bytes from a 20 MB stream');
});
await t('import-recipe: upstream 404 -> 422 generic, no Anthropic', async () => {
  dnsMap = { 'x.example.com': ['93.184.216.34'] };
  pages['https://x.example.com/'] = { status: 404 };
  const r = await run(importRecipe, { body: { content: 'https://x.example.com/' } });
  assert.equal(r.status, 422); assert.equal(anthropicCalls(), 0);
});
await t('import-recipe: pasted text over 6000 and up to 12000 is accepted', async () => {
  const r = await run(importRecipe, { body: { content: 'Soup. ' + 'x '.repeat(5500) } });
  assert.equal(r.status, 200); assert.equal(anthropicCalls(), 1);
});
await t('import-recipe: non-JSON model output -> 422 (existing behavior kept)', async () => {
  anthropicText = 'sorry';
  const r = await run(importRecipe, { body: { content: 'soup' } });
  assert.equal(r.status, 422);
});
await t('import-recipe: model returns broken JSON -> 500 generic', async () => {
  anthropicText = '{not json';
  const r = await run(importRecipe, { body: { content: 'soup' } });
  assert.equal(r.status, 500); assert.equal(r.body.error, 'Something went wrong'); noInternals(r);
});

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
