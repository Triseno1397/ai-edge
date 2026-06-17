# AI Edge — Mobile Dashboard

A read-only, phone-first web viewer for the AI Edge desk. It renders the markdown the desk produces
(`briefings/`, `learning/`, `strategy/`) as a dark, premium dashboard you can open anywhere — and
install to your home screen as a PWA.

It does **not** generate anything. Generation stays in Claude Code (`/brief`, `/disrupt`, `/learn`).
This is the reading surface.

## How content gets here
The desk's markdown lives at the repo root. `scripts/sync-content.mjs` copies `../briefings`,
`../learning`, `../strategy`, and `../profile` into `web/content/`, and every page is pre-rendered to
static HTML. So:

```
Claude Code (/brief)  →  briefings/2026-06-17.md  →  /publish  →  vercel --prod  →  live on your phone
```

New briefing on your phone = run `/publish` in Claude Code, or directly:
`npm --prefix web run deploy` (syncs content, then `vercel --prod`).

## Run it locally
```bash
cd web
npm install
npm run dev          # http://localhost:3000  (syncs content first)
```
`npm run build` produces the production build; `npm start` serves it.

## Deploy

Already deployed — **https://ai-edge-tau.vercel.app** (Vercel project `trisenos-projects/ai-edge`),
shipped from this folder with the Vercel CLI.

**Redeploy** (after a new briefing): `npm run deploy` from `web/`, or `/publish` in Claude Code. The
deploy pre-syncs the desk's markdown into `content/` and uploads it, so the build ships your latest
briefings even though they live outside `web/` in git.

**From a fresh clone**, re-link once with `vercel link --project ai-edge` (needs `vercel login`), then
`npm run deploy`.

**Privacy:** the site is on a public, unguessable URL. To require a login, enable Vercel **Deployment
Protection** (Project → Settings → Deployment Protection). Add to Home Screen on your phone for an
app-like icon.

## Views
- **Today** — the latest briefing, framed like a live rundown.
- **Archive** — every dated briefing, searchable.
- **Map** — the entertainment disruption map with NOW / NEAR / HORIZON badges.
- **Learn** — the curriculum (with a mastery meter) and the progress log.

## Stack
Next.js 14 (App Router, static-rendered) · Tailwind · Geist Sans/Mono · react-markdown. No database, no
runtime server logic — just baked HTML over your markdown.
