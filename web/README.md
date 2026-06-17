# AI Edge — Mobile Dashboard

A read-only, phone-first web viewer for the AI Edge desk. It renders the markdown the desk produces
(`briefings/`, `learning/`, `strategy/`) as a dark, premium dashboard you can open anywhere — and
install to your home screen as a PWA.

It does **not** generate anything. Generation stays in Claude Code (`/brief`, `/disrupt`, `/learn`).
This is the reading surface.

## How content gets here
The desk's markdown lives at the repo root. At build time, `scripts/sync-content.mjs` copies
`../briefings`, `../learning`, `../strategy`, and `../profile` into `web/content/`, and every page is
pre-rendered to static HTML. So:

```
Claude Code (/brief)  →  briefings/2026-06-17.md  →  git push  →  Vercel rebuild  →  live on your phone
```

New briefing on your phone = one push. From the project root, run `/publish` in Claude Code (or
`git add -A && git commit -m "desk: <date>" && git push`).

## Run it locally
```bash
cd web
npm install
npm run dev          # http://localhost:3000  (syncs content first)
```
`npm run build` produces the production build; `npm start` serves it.

## Deploy to Vercel (one-time)
1. Push this repo to a **private** GitHub repo (briefings are personal).
2. In Vercel: **New Project → import the repo**.
3. Set **Root Directory = `web`**. Framework preset auto-detects **Next.js**. No env vars needed.
4. Deploy. You get a URL like `ai-edge.vercel.app` — open it on your phone and **Add to Home Screen**.

Because Root Directory is `web/`, Vercel still checks out the whole repo, so the prebuild step can read
`../briefings` etc. After the first deploy, every `git push` redeploys automatically.

## Views
- **Today** — the latest briefing, framed like a live rundown.
- **Archive** — every dated briefing, searchable.
- **Map** — the entertainment disruption map with NOW / NEAR / HORIZON badges.
- **Learn** — the curriculum (with a mastery meter) and the progress log.

## Stack
Next.js 14 (App Router, static-rendered) · Tailwind · Geist Sans/Mono · react-markdown. No database, no
runtime server logic — just baked HTML over your markdown.
