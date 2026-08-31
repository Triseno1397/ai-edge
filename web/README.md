# AI Edge — Mobile Dashboard

A read-only, phone-first web viewer for the AI Edge desk. It renders the markdown the desk produces
(`briefings/`, `learning/`, `strategy/`, `creative/`) as a dark, premium dashboard you can open
anywhere — and install to your home screen as a PWA.

It does **not** generate anything. Generation stays in Claude Code (`/brief`, `/disrupt`, `/creative`,
`/learn`). This is the reading surface.

## How content gets here
The desk's markdown lives at the repo root. `scripts/sync-content.mjs` copies `../briefings`,
`../learning`, `../strategy`, `../creative`, and `../profile` into `web/content/`, and every page is
pre-rendered to static HTML. So:

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

Live at **https://ai-edge-tau.vercel.app** (Vercel project `trisenos-projects/ai-edge`).

The project is **connected to GitHub** (`Triseno1397/ai-edge`) with **Root Directory = `web`**, so
**every push to `main` auto-deploys.** A git build checks out the whole repo and runs the prebuild
sync, which reads `../briefings` etc. — so your latest content ships automatically. A daily routine
generates the morning brief and pushes, so the phone is current without you doing anything.

- **Out-of-cycle update:** `/publish` in Claude Code (commit + push).
- **Manual CLI fallback** (bypasses git): `npm run deploy` from `web/` does a direct `vercel --prod`.

**Privacy:** the site is on a public, unguessable URL. To require a login, enable Vercel **Deployment
Protection** (Project → Settings → Deployment Protection). Add to Home Screen on your phone for an
app-like icon.

## Views
Navigation is the ☰ drawer on the top-left of every page — there's no bottom bar.

- **What's New** — Lane 1 of the latest briefing, framed like a live rundown.
- **Money** — money plays plus "Do This Week."
- **Entertainment** — production-stack AI, with a link into the Map.
- **Creative** — gen-media for the agency, split into sub-tabs (Releases / Viral / Prompts / Craft).
  Images render inline, YouTube and Vimeo play in place, TikTok/X/IG become cards, and prompts in
  fenced blocks get a Copy button.
- **Learn** — the curriculum (with a mastery meter) and the progress log.
- **Libraries** — the disruption Map (NOW / NEAR / HORIZON badges), the Prompt Vault, and the Playbook.
- **Archive / Answers** — every dated briefing, and answers to questions asked from the phone.

### Rendering conventions the briefing must follow
The parser in `lib/brief-parse.js` routes `##` section headers to tabs and `###` sub-headers to the
Creative sub-tabs, so those headers have to stay exact (they're specified in `CLAUDE.md`). In
`components/Markdown.jsx`: inline code spans matching `NOW/NEAR/HORIZON` or
`IMAGE/VIDEO/AUDIO/ADS/FILM` become tag chips, a lone image or lone video link in a paragraph becomes
media, and fenced blocks become copyable prompts.

## Stack
Next.js 14 (App Router, static-rendered) · Tailwind · Geist Sans/Mono · react-markdown. No database, no
runtime server logic — just baked HTML over your markdown.
