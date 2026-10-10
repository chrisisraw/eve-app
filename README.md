# EVE — Vegan Meal Planner

## Deploy to Vercel (recommended)
1. Go to vercel.com → New Project
2. Upload this folder or connect your GitHub repo
3. Vercel auto-detects Vite — just click Deploy
4. Add your Anthropic API key as a server-side environment variable named `ANTHROPIC_API_KEY` in the host's environment settings. Never prefix it with `VITE_`: anything `VITE_`-prefixed is bundled into the browser code and exposed to every visitor.

## Deploy to Netlify
1. Go to netlify.com → Add new site → Deploy manually
2. Run `npm install && npm run build` first
3. Upload the `dist/` folder

## Run locally
```bash
npm install
npm run dev
```

## Environment Variables
- `ANTHROPIC_API_KEY` — your Anthropic API key for AI features. Server-side only: set it in the host's environment settings and never prefix it with `VITE_`.
read me boo
