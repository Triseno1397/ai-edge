---
name: creative-scout
description: >
  Deep gen-media scan for Big Boy's creative AI agency — the image/video side of the business: product
  ads for brands, plus short films and cinematic work. Covers model releases, what's going viral right
  now, copy-paste viral prompts, and craft techniques, then files the keepers into the standing prompt
  vault and playbook. Trigger on "/creative", "what's going viral", "new prompts", "AI video news",
  "image gen update", "what should I be making", or any request focused on generative image/video craft
  rather than a general news roundup.
---

# Creative Scout

Big Boy runs a **creative AI agency as a Triseno Systems service line**: product ads for brands, plus
short films and cinematic jobs. This skill keeps him ahead on the gen-media stack and stocked with
material he can actually shoot with — not a tool roundup. Read `profile/big-boy-profile.md` if you
haven't this session.

Two standing questions behind every run: **what can he sell to a brand next week**, and **what makes the
work look less like AI and more like film**.

## Step 1 — Anchor and check what's already logged
Establish the real current date. Then read:
- `creative/prompt-vault.md` — prompts already banked
- `creative/playbook.md` — techniques already banked
- the last 1–2 files in `briefings/` — creative items already reported

Don't re-report any of it. A materially better version of a banked prompt or technique is worth an
update; a restatement isn't.

## Step 2 — Search, four angles (all four, every run)
Everything comes from live search — training data is stale for this. Use the current month/year.

**1. Releases & updates.** The stack: OpenAI/Sora, Google Veo & Flow, Runway, Luma, Kling, Pika,
Midjourney, Black Forest Labs (FLUX), Higgsfield, Seedance/ByteDance, Topaz, ElevenLabs, Adobe Firefly,
Freepik, Krea, plus editor-side (Premiere/Resolve AI, CapCut). Hunt version bumps, new controls
(camera, reference, character, duration, audio), pricing and API changes, and licensing terms that
matter for **client** work.

**2. What's going viral.** Named formats, not just individual clips: AI ad spots that ran, UGC-style
hooks, product-demo patterns, AI short films and trailers, aesthetic trends. Sources: r/aivideo,
r/StableDiffusion, creator threads on X, TikTok/IG/YouTube trend roundups, Curious Refuge, AI film
festivals, ad-teardown threads. For each: what the format IS, why it's landing, and how it maps to a
brand deliverable.

**3. Viral prompts.** Actual copy-paste prompts producing the looks people are chasing — prompt drops
from model accounts, community libraries, breakdown threads. Log the **whole** prompt or none of it.
Note which model it was written for; prompts don't transfer cleanly across models.

**4. Craft & tricks.** Technique that separates a deliverable from an obvious AI clip:
character/product consistency, camera and motion control, lighting and grade matching, lipsync and VO,
upscale and finishing, versioning and client review, spec compliance.

Aim for ~3–4 searches per angle. Prefer the original post, drop, or release notes over a roundup blog.

## Step 3 — Filter
Include if he could use it on a job, sell it to a brand, or steal the technique. Cut: vaporware,
waitlists with no access, tools that can't produce client-usable resolution, and anything whose
licensing blocks commercial use (say so explicitly when a tool has that problem — it's the fastest way
to waste a week).

3–5 items per sub-section. Quality over volume.

## Step 4 — Write it
Write into today's `briefings/YYYY-MM-DD.md` under `## Creative AI` in Lane 2 (create the file with the
standard briefing shape if it doesn't exist yet; if the section already exists, merge rather than
duplicate). Keep these four `###` headers exactly — the dashboard turns them into sub-tabs:

```
## Creative AI

### Releases & Updates
### Going Viral
### Viral Prompts
### Craft & Tricks
```

Item shape — this section is visual, so show the work:

```
**<Headline>** — one tight sentence.

`VIDEO` `ADS`

![<short caption>](<direct image URL>)

<bare video URL on its own line>

→ For you: <the ad build or film shot this changes>.

<source link>

---
```

- **Tags**, own line, inline-code spans. Medium: `IMAGE` `VIDEO` `AUDIO`. Side of the business: `ADS`
  or `FILM`.
- **Images**: direct image URLs only (.jpg/.png/.webp). A page URL renders as a broken frame — skip the
  image rather than guess.
- **Video**: URL alone on its own line. YouTube/Vimeo become tap-to-play; TikTok/X/Instagram become a
  card that opens the post, so add a poster image above those when you have one.
- **Prompts**: full prompt in a fenced code block (it gets a copy button). Never truncate with "...".
- Every item gets a `→ For you:` line in real agency terms — a client packshot, a paid-social hook, a
  short-film shot — not "this could be useful."

## Step 5 — File the keepers
This is the part that compounds:
- Prompts worth reusing → `creative/prompt-vault.md`, under the right heading, in that file's entry
  format (tags, model, date added, "Use it for", "Swap", source).
- Techniques worth reusing → `creative/playbook.md`, under the problem they solve.
Replace superseded entries instead of stacking near-duplicates. Nothing goes in that you couldn't
verify — an unverified prompt in the vault costs him a render credit and an hour.

## Step 6 — Close
End with **"Shoot This Week"**: 1–3 concrete things to make or test — a prompt to run, a format to
copy for a specific client, a technique to prove out. Then confirm the files you wrote in one line.

## Style
Builder-to-builder, director-to-director. He knows lenses, lighting, and grade — use the real
vocabulary. No hype, no "the future of creativity." Tell him what to make.
