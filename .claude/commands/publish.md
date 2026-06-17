Publish the desk to the live mobile dashboard: https://ai-edge-tau.vercel.app
(Vercel project `trisenos-projects/ai-edge`, deployed from `web/` via the Vercel CLI).

Do this:
1. **Back up + history.** `git add -A`, commit with a dated message (e.g. `desk: brief 2026-06-17` —
   use the newest briefing date or summarize the change), and `git push` to `origin`
   (private repo `Triseno1397/ai-edge`).
2. **Deploy the dashboard.** Run `npm --prefix web run deploy`. That syncs the latest
   `briefings/` / `learning/` / `strategy/` into `web/content/` and runs `vercel --prod`. New content
   is live in ~40s.
3. Report the production URL from the CLI output.

Notes:
- The web viewer never generates anything — it only renders what the desk has produced. Run `/brief`,
  `/disrupt`, or `/learn` FIRST, then `/publish`.
- Needs the Vercel CLI logged in (already set up as `triseno1397`). If `vercel` errors with auth, the
  one-time fix is `vercel login`.
- The live site is currently on a public (unguessable) URL. If asked to lock it down, use Vercel
  Deployment Protection (Project → Settings → Deployment Protection).
