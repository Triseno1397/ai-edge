# AI Edge

Your personal AI intelligence desk for Claude Code. Open this project and it keeps you ahead of the
game on AI news, tools, money opportunities, and entertainment-industry AI — filtered for you and
Triseno Systems.

## Setup
1. Drop this `ai-edge/` folder anywhere on your machine.
2. Open it in Claude Code: `cd ai-edge && claude`
3. (Optional) Make it a git repo so your briefings build a searchable history:
   `git init && git add -A && git commit -m "AI Edge init"`

That's it. `CLAUDE.md` loads automatically and tells Claude how to run the desk.

## Daily use
Just open the project and type any of these:

| Command | What it does |
|---|---|
| `/brief` (or "go", "what's new", "brief me") | Full two-lane briefing |
| `/frontier` | Lane 1 only — the newest, biggest AI news in the field (most-informed-in-the-room mode) |
| `/tools` | New/updated AI tools |
| `/opps` | Money opportunities, tailored to Triseno |
| `/entertainment` | Entertainment/broadcast AI, expanded |
| `/disrupt` | Deep disruption scan across the whole production stack + updates the disruption map |
| `/creative` | Deep gen-media scan for the creative agency — releases, what's going viral, viral prompts, craft — + updates the prompt vault and playbook |
| `/learn` | Teach me one new AI method this session + log it to my curriculum |
| `/deep <tool>` | Full deep dive on one tool |
| `/publish` | Push the latest briefings/map/learning to your phone (commits + deploys the `web/` dashboard) |

**Two lanes:** every full briefing leads with **Lane 1 — The AI World** (the newest, biggest
developments, included whether or not they touch you) and then **Lane 2 — Your Edge** (tools, money,
entertainment, creative/gen-media, and learning tailored to you and Triseno). The two are kept separate
on purpose.

Every full briefing auto-saves to `briefings/YYYY-MM-DD.md`, and every lesson logs to
`learning/progress.md`, so over time this folder becomes a record of how the field moved and how your
skills compounded. You can ask Claude to search across past briefings ("what did we say about AI video
tools last month?") or your learning log ("what challenges do I still have pending?").

**Standing libraries** (they accumulate instead of rolling off with each briefing):
`strategy/disruption-map.md` — where AI hits each production role and your angle to own it.
`creative/prompt-vault.md` — prompts worth reusing, filed by the job they win.
`creative/playbook.md` — craft fixes, filed by the problem they solve.

## Keep it sharp
- Edit `profile/big-boy-profile.md` whenever your focus shifts. The briefings only get more tailored.
- Tweak source lists or category emphasis in `.claude/skills/ai-intel-briefing/SKILL.md`.
- Add new skills under `.claude/skills/<name>/SKILL.md` and new commands under `.claude/commands/`.

## Structure
```
ai-edge/
├── CLAUDE.md                          # project brain (auto-loaded)
├── README.md                          # this file
├── profile/
│   └── big-boy-profile.md             # your context — edit freely
├── briefings/                         # dated archive of every briefing
├── learning/
│   ├── curriculum.md                  # your AI skills roadmap
│   └── progress.md                    # running log of lessons + open challenges
├── strategy/
│   └── disruption-map.md              # living map: where AI hits each production role + your angle to own it
├── creative/
│   ├── prompt-vault.md                # prompts that produce work — product ads, cinematic, stills, motion
│   └── playbook.md                    # craft library: consistency, camera, grade, lipsync, finishing
├── web/                               # mobile dashboard (Next.js PWA) — read-only viewer, deploy on Vercel
└── .claude/
    ├── skills/
    │   ├── ai-intel-briefing/         # the default two-lane briefing
    │   ├── opportunity-scout/         # money-only deep dive
    │   ├── tool-deep-dive/            # single-tool evaluation
    │   └── ai-learning/               # teaches one method/session, builds curriculum
    └── commands/                      # /brief /frontier /tools /opps /entertainment /disrupt /learn /deep /publish
```

## Mobile dashboard
A read-only, phone-first web viewer lives in [web/](web/). It renders your briefings, disruption map,
and learning as a dark, premium dashboard you can open anywhere and install to your home screen. It
never generates anything — generation stays in Claude Code; the dashboard is just the reading surface.
Deploy it once on Vercel (see [web/README.md](web/README.md)), then run `/publish` after each briefing to
push new content to your phone.
