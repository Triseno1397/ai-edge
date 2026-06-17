Publish the desk to the mobile dashboard. The web viewer (in `web/`) is deployed on Vercel and rebuilds
from the GitHub repo, so "publishing" = committing the desk's latest markdown and pushing.

Do this:
1. Run `git status` to see what changed (new/updated files in `briefings/`, `learning/`, `strategy/`,
   `profile/`).
2. Stage everything with `git add -A`.
3. Commit with a dated, descriptive message — e.g. `desk: brief 2026-06-17` (use the newest briefing
   date, or summarize what changed if it wasn't a briefing).
4. Push to `origin`. Vercel auto-builds and the new content appears on the phone in ~30–60s.

If there is no `origin` remote yet, stop and tell me — I still need to create the private GitHub repo
and connect Vercel (one-time setup). Never push the repo public; briefings are private.
