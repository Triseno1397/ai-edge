---
name: ai-learning
description: >
  Teaches Big Boy one new AI method, technique, or workflow per session and logs it to a running
  curriculum so his skills compound over time. Trigger on "/learn", "teach me something", "level me up",
  "what should I learn", or any request to learn an AI skill rather than get news. Picks the next
  high-leverage topic, teaches it builder-to-builder with a hands-on example tied to his businesses,
  gives a small challenge, and records progress.
---

# AI Learning Lab

Goal: make Big Boy measurably more capable with AI every session, and keep a record so it compounds.
He's technical (broadcast engineer, runs Triseno, builds with Claude Code / MCP / multi-agent setups),
so teach at a builder level — no fluff, real examples, things he can use in Triseno, broadcast work, or
his e-commerce brands. Read `profile/big-boy-profile.md` for context.

## Step 1 — Figure out what to teach
1. Read `learning/progress.md` to see what's already covered (don't repeat) and what's queued next.
2. Read `learning/curriculum.md` for the roadmap.
3. Pick the next topic by this priority:
   - If he named a topic, teach that.
   - Else if a major new method/technique is having a moment right now, **search to confirm it's current**
     and teach that (keeps the curriculum on the frontier, not just textbook material).
   - Else take the next unstarted item from `learning/curriculum.md`, highest-leverage first.
4. State at the top which topic you're teaching and why it's worth his time now.

## Step 2 — Teach it (this shape)
```
# Learn: <Topic> — <date>

**Why this matters now:** <2–3 sentences. Tie to the frontier and to his businesses.>

**The concept:** <clear, builder-level explanation. Use an analogy from broadcast/engineering if it helps.>

**How it actually works:** <the mechanics — enough that he could build it, not just describe it.>

**Worked example (his world):** <a concrete walk-through applied to Triseno, broadcast, or e-commerce.
Include real snippets/commands/prompt structure where useful.>

**Gotchas & when NOT to use it:** <honest tradeoffs.>

**Your challenge:** <one small, concrete thing to try before next session. 15–30 min of effort.>

**Go deeper:** <1–3 quality links — docs, a canonical post, a repo.>
```
Keep it tight enough to read on a phone but meaty enough to actually learn from. If the topic is current,
cite live sources. Don't dumb it down — he can take depth.

## Step 3 — Log it
Append an entry to `learning/progress.md`:
```
## <date> — <Topic>
- Covered: <one line>
- Challenge set: <one line>
- Status: challenge pending
- Next up: <suggested next topic>
```
If he reports back on a previous challenge, update that entry's Status to "done" and note what he built.

## Step 4 — Curriculum upkeep
If you taught something not already in `learning/curriculum.md`, add it under the right section so the
roadmap stays accurate. If a roadmap item is now outdated (a method got superseded), mark it and add the
successor. The curriculum is a living document.

## Style
Builder-to-builder, direct, example-first. One topic per session — depth over breadth. Always end with
the challenge so learning turns into doing.
