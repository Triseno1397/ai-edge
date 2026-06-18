# AI Edge — On-Demand Setup

The dashboard can generate briefings and answer questions on demand, triggered from your phone or
computer. This is how the wiring works and the one credential you maintain.

## How it works
```
Console (app, any device)
   → POST /api/run            (Vercel function; checks your run key, fires a GitHub event)
   → GitHub Action "AI Edge Run"   (runs Claude Code on YOUR subscription, generates, commits, pushes)
   → Vercel auto-deploys      (the connected git integration)
   → new content on your phone
```
`/api/status` reports progress so the Console can show "working… / done".

- **Run brief** writes `briefings/<date>.md` → populates the topic tabs.
- **Ask the desk** writes `answers/<id>.md` → shows on the **/ask** page.

## Configured already
- Vercel project `trisenos-projects/ai-edge`, git-connected, Root Directory = `web`.
- Vercel env (Production): `GITHUB_DISPATCH_TOKEN`, `RUN_SECRET`, `GITHUB_REPO`.
  (Values are `.trim()`-ed in code, so trailing newlines from `vercel env add` don't matter.)
- `.github/workflows/run.yml` — the on-demand runner.

## The one credential you maintain: `CLAUDE_CODE_OAUTH_TOKEN`
This is what runs generation on your Claude subscription (no API key, no per-use cost). Only you can
mint it.

1. On your computer (with Claude Code installed): `claude setup-token` → authorize in the browser →
   copy the token it prints.
2. Add it as a **GitHub Actions secret** named `CLAUDE_CODE_OAUTH_TOKEN`:
   - UI: GitHub repo → Settings → Secrets and variables → Actions → New repository secret.
   - or CLI: `gh secret set CLAUDE_CODE_OAUTH_TOKEN --repo Triseno1397/ai-edge`

That's it. Tap **Run** in the app, enter your run key once, and generate.

## Using it
- Open the dashboard → tap **Run** (bottom-right) → enter your **run key** (stored on the device after
  first use) → **Run today's briefing** or **Ask the desk**.
- Generation takes ~1–2 min; the new content appears after the auto-deploy (~1 min more).

## Rotating / hardening
- The `GITHUB_DISPATCH_TOKEN` currently reuses your `gh` CLI token. For a longer-lived, least-privilege
  setup, replace it with a GitHub fine-grained PAT (Contents: read/write, Actions: read) via
  `vercel env rm GITHUB_DISPATCH_TOKEN production` then `vercel env add ...`.
- Change the run key anytime: update `RUN_SECRET` in Vercel and re-enter it in the app.
- Lock the site behind a login: Vercel Project → Settings → Deployment Protection.
