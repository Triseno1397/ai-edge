---
name: tool-deep-dive
description: >
  Deep evaluation of a single named AI tool, product, or platform. Trigger on "/deep", "deep dive on
  X", "is X worth it", "should I use X", "break down X", or whenever Big Boy names a specific tool and
  wants the full picture. Researches what it is, pricing, real-world fit for his businesses, alternatives,
  and a verdict.
---

# Tool Deep Dive

Big Boy named a tool (or will right after invoking this). Give him the full operator's picture so he
can decide fast. Read `profile/big-boy-profile.md` for fit context. Search live — pricing and features
change constantly.

## Research
1. **What it is** — the honest one-paragraph version. What problem it solves, who it's for.
2. **How it works / what's under the hood** — model(s), integrations, API availability, MCP support,
   self-host vs cloud. He's technical; don't dumb it down.
3. **Pricing** — real current numbers, tiers, and the catch (rate limits, per-seat, usage pricing).
4. **Fit for his stack** — specific uses across Triseno (agents/automation/client work), broadcast/
   live production, Shopify/Mil Apparel, or personal workflow. Be concrete.
5. **Resale / productization angle** — could Triseno wrap, resell, or build a service on top of this?
6. **Alternatives** — 2–3 competitors with the one-line tradeoff for each.
7. **Verdict** — adopt now / pilot it / wait / skip, with one sentence of reasoning.

## Output shape
```
# Deep Dive — <Tool> (<date>)

**What it is:** …
**Under the hood:** …
**Pricing:** …
**Fit for you:**
- Triseno: …
- Broadcast/production: …
- E-commerce/personal: …
**Resale angle:** …
**Alternatives:** A (tradeoff) · B (tradeoff) · C (tradeoff)
**Verdict:** <adopt / pilot / wait / skip> — <why>.
<links>
```

Keep it tight and decision-oriented. End with the single next action if he wants to try it.
