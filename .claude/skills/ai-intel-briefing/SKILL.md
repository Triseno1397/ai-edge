---
name: ai-intel-briefing
description: >
  The default skill for this project. Runs a live, two-lane AI intelligence briefing: Lane 1 is the
  newest and biggest news in the AI field at large (top priority, included on merit), Lane 2 is tools,
  money plays, entertainment-industry moves, and skills tailored to Big Boy and Triseno Systems. Then
  archives it. Trigger on "brief me", "what's new", "go", "/brief", "/frontier", a bare greeting, or any
  request for an AI update / news / tools / opportunities roundup.
---

# AI Intel Briefing

You are running Big Boy's AI intelligence desk. Two jobs, kept separate: (1) put the absolute newest,
biggest AI developments in front of him so he's at the forefront of the field — whether or not they
touch him; (2) hand him the tailored tools, money plays, and skills that move his businesses. Read
`profile/big-boy-profile.md` first if you haven't this session.

## Step 1 — Anchor to today
Establish the real current date before searching. Your training data is stale for this project, so
**everything here comes from live web search**, not memory. Use the current year in queries (don't
search a past year by accident).

## Step 2 — Check the archive
Skim the most recent 1–2 files in `briefings/` (if any). Note what was already reported so you don't
repeat items. New angles on a developing story are fine; verbatim repeats are not.

## Step 3 — Search (frontier first, then tailored)
Training data is stale — everything comes from live search. Prefer original, high-signal sources over
SEO aggregators. Use the current month/year in queries.

**Do Lane 1 first and chase recency hard.** The lead of the brief must be the newest, biggest thing in
AI. Run breaking/recency searches before anything else:
- `AI news today` / `AI breaking news <month> <year>`
- `new frontier model release <month> <year>` / `<lab> announces <month> <year>`
- `biggest AI news this week` / `AI funding OR acquisition <month> <year>`
- Check fast movers: Hacker News front page (news.ycombinator.com), lab blogs (Anthropic, OpenAI,
  Google DeepMind, Meta AI, Mistral, xAI), Stratechery, The Information, Import AI, TLDR AI, The Rundown,
  Semafor Tech, llm-stats / leaderboards, arXiv. If something huge dropped, dig until you have it cold.

**Then Lane 2 (tailored):**
- Tools: Product Hunt, GitHub Trending, There's An AI For That, Future Tools.
- Money — two angles, BOTH required every time:
  1. **How people are making money with AI right now** (the broad landscape, included on merit): what
     AI services/agencies are getting paid for AND which AI-native companies/products are winning —
     a16z, YC RFS, Indie Hackers, Greg Isenberg, agency/founder threads on X, vertical-agent reports,
     real revenue case studies. Lead with what's actually working in the market.
  2. **His tailored plays**: what Triseno could package for its verticals (construction, e-commerce,
     events) or sell via his broadcast network.
- Entertainment/broadcast — cover the **whole production stack**, not just camera/video. Search across:
  - Video/camera: gen-video (Runway / Luma / Kling / Pika / Veo / Higgsfield), robotic/PTZ + AI tracking,
    media servers (disguise/Watchout), playback.
  - Switching/replay/graphics: AI auto-switching, automated replay/highlight detection, generative
    graphics & lower-thirds, real-time captioning/translation.
  - Audio: AI mixing, dialogue isolation/cleanup, voice cloning & dubbing, RF/comms automation.
  - Lighting / rigging / staging / scenic: AI-assisted design, previz, automation.
  - IT/networking & IP video (ST 2110 / NDI / SRT), transmission/streaming, cloud production (e.g.
    AWS Elemental), encoding.
  - Production/ops: AI scheduling, crewing/staffing, call sheets, budgeting, scriptbreakdown, post
    editing/color.
  - Source targets: NAB, IBC, TVTech, ProVideo Coalition, postPerspective, fxguide, Befores & Afters,
    RedShark News, NewscastStudio, plus vendor announcements (Blackmagic, Adobe, AWS, Disney, Netflix).
  - **Disruption lens (required):** for each entertainment item, name the role/vendor function it
    changes or eliminates, and the opening for him to own that change. Note it for `strategy/disruption-map.md`.
- Creative AI (his agency work — product ads for brands, plus short films and cinematic jobs). Four
  angles, and you need all four:
  1. **Releases & updates** — the gen-media stack: OpenAI/Sora, Google Veo & Flow, Runway, Luma,
     Kling, Pika, Midjourney, Black Forest Labs (FLUX), Higgsfield, Seedance/ByteDance, Topaz,
     ElevenLabs, Adobe Firefly, Freepik, Krea. Version bumps, new controls, pricing/API changes.
  2. **What's going viral** — formats and specific pieces blowing up right now: AI ad spots, UGC-style
     hooks, product demos, AI short films and trailers. Sources: r/aivideo, r/StableDiffusion,
     creator threads on X, TikTok/IG/YouTube trend roundups, Curious Refuge, AI film festivals,
     ad-teardown threads. Name the format, not just the clip.
  3. **Viral prompts** — actual copy-paste prompts that are producing the looks people are chasing.
     Prompt drops from model accounts, community prompt libraries, breakdown threads. Test the prompt
     reads coherently before you log it; don't pass along fragments.
  4. **Craft & tricks** — technique: character/product consistency, camera and motion control,
     lighting and grade matching, lipsync/VO, upscale and finishing, review/delivery pipeline.
  Check `creative/prompt-vault.md` and `creative/playbook.md` first so you don't re-report what's
  already logged.

Aim for ~3–5 searches on Lane 1 (more if a big story is breaking) and ~2–3 per Lane 2 section.

## Step 4 — Filter (two different bars)
- **Lane 1 bar:** is it genuinely big or new for the field? Include on merit even if it's useless to him.
  Cut only true fluff and vaporware. Magnitude and recency win.
- **Lane 2 bar:** can he use/buy/sell/build on it, or does it move Triseno / his verticals / his industry /
  his skills? If not, it belongs in Lane 1 or gets cut.
Quality over volume — 2–4 items per section.

## Step 5 — Write the briefing (this exact shape)

```
# AI Edge Briefing — <Weekday>, <Month DD, YYYY>

## TL;DR
- <3–5 bullets, newest/biggest field news first, then the few tailored items he'd regret missing>

# LANE 1 — The AI World
## Breaking & Biggest
**<Headline>** — <one sentence: what it is>.
Why it's big: <significance to the field>.
<link>

## Notable Tools & Capabilities
(same format, Why it's big: line)

## Power & Policy
(same format, Why it's big: line)

# LANE 2 — Your Edge
## Money Opportunities
**<Headline>** — <what it is>.
→ For you: <how he ships it: Triseno service/product/tool, vertical, or money play>.
<link>

## Entertainment-Industry AI
(same format, → For you: line; go deeper here)

## Creative AI

### Releases & Updates
### Going Viral
### Viral Prompts
### Craft & Tricks
(2 items per sub-section in a normal brief. Keep all four `###` headers exactly — the dashboard
turns them into sub-tabs. See "Creative item format" below.)

## Learn This
**<Method/workflow>** — one-line why it's worth learning now. (Run `/learn` for the full lesson.)

## Do This Week
1. <highest-payoff concrete action, from Lane 2>
2. <second>
3. <optional third>
```

**Item formatting (so the dashboard renders each cleanly).** Rank items most-important-first. Write
each item with a **blank line between every part**, and separate items with a `---` line:

```
**<Headline>** — one tight sentence of what it is.

Why it's big: <significance>.          (Lane 1)   ·   → For you: <his play>.   (Lane 2)

<link>

---
```

Bold headlines, `Why it's big:` in Lane 1 and `→ For you:` in Lane 2, real links, phone-scannable. No
filler caveats. No hype. Sharp ops partner, not a newsletter. Keep the exact section headers above —
the dashboard splits the brief into tabs by them.

**Creative item format (this section is visual — show the work).** Same block shape, plus tags and media:

```
**<Headline>** — one tight sentence.

`VIDEO` `ADS`

![<short caption>](<direct image URL>)

<bare video URL on its own line>

→ For you: <the ad build or film shot this changes, in his agency's terms>.

<source link>

---
```

- **Tags** go on their own line as inline-code spans. Medium: `IMAGE` `VIDEO` `AUDIO`. Business side:
  `ADS` (brand/product work) or `FILM` (short-film/cinematic). One medium + one side is usually right.
- **Images**: standard markdown image syntax with a **direct image URL** (ends in .jpg/.png/.webp) — a
  link to an article page renders as a broken frame. Skip the image rather than guess a URL.
- **Video**: put the URL **alone on its own line**. YouTube and Vimeo become tap-to-play players.
  TikTok/X/Instagram can't be embedded — they render as a card that opens the post, so add a poster
  image line above them when you have one.
- **Prompts**: put the full prompt in a fenced code block so it gets a copy button. Never truncate a
  prompt with "..." — either log the whole thing or don't log it.
- Every creative item needs a `→ For you:` line framed to real agency work: a client product ad, a
  UGC/paid-social hook, or a short-film/cinematic shot.

## Step 6 — Archive & library upkeep
Save to `briefings/YYYY-MM-DD.md`. If today's file exists, append a timestamped update instead of
overwriting.

Then keep the two standing creative libraries current — they're what makes this compound:
- Any prompt worth reusing → append to `creative/prompt-vault.md` under the right heading, in that
  file's entry format (tags, model, date, "Use it for", "Swap", source).
- Any technique worth reusing → append to `creative/playbook.md` under the problem it solves.
Dedupe against what's already there; a better version of an existing entry replaces it rather than
sitting beside it. Don't log a prompt or technique you couldn't verify — the libraries are only
useful if everything in them actually works.

Confirm the save paths in one line at the end.

## Modes
If the user invoked a narrow command, run only the relevant part(s):
- `/frontier` → Lane 1 only (Breaking & Biggest, Notable Tools, Power & Policy). Go a bit deeper —
  4–6 items in Breaking & Biggest. This is the "make me the most-informed person in the room" mode.
- `/tools` → Notable Tools (Lane 1) + any tailored tools (Lane 2).
- `/opps` → Lane 2 Money Opportunities only.
- `/entertainment` → Lane 2 Entertainment-Industry AI only, expanded to 4–6 items.
- `/creative` → hand off to the `creative-scout` skill: a deep gen-media scan for his creative agency
  (releases, viral formats, prompts, craft), 3–5 items per sub-section, and library upkeep.
- `/disrupt` → deep entertainment-disruption scan. Go department by department across the production
  stack (video, audio, lighting, switching/replay, graphics, media servers, IT/IP video, transmission/
  streaming, post, production/crewing). For each area where AI is moving, name the role/workflow at risk
  and the specific tool or service he could build/sell to own that change. Then **update
  `strategy/disruption-map.md`** with anything new. End with the 2–3 highest-leverage plays to pursue.
Otherwise run the full two-lane briefing.
