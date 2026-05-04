# EVE — Vegan Meal Planner

## Deploy to Vercel (recommended)
1. Go to vercel.com → New Project
2. Upload this folder or connect your GitHub repo
3. Vercel auto-detects Vite — just click Deploy
4. Add your Anthropic API key as an environment variable: `VITE_ANTHROPIC_KEY`

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
- `VITE_ANTHROPIC_KEY` — your Anthropic API key for AI features
