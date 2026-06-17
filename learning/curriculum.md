# AI Learning Curriculum

A living roadmap of high-leverage AI skills for Big Boy — ordered roughly by payoff for Triseno, his
broadcast/entertainment work, and his own edge. The `ai-learning` skill works down this list (or jumps
to whatever's hot on the frontier). Reorder, add, or cut freely.

## Tier 1 — Agent building (Triseno's core product)
- [ ] Agent architectures: single-agent vs multi-agent, orchestration patterns ("council of agents")
- [ ] MCP deep dive: building and wiring your own MCP servers, not just consuming them
- [ ] Tool/function-call design: schemas, error handling, when to give an agent a tool vs a sub-agent
- [ ] Agent evals & reliability: how to actually prove an agent works before you sell it to a client
- [ ] Guardrails & structured outputs: keeping agents on-rails and machine-parseable
- [ ] Production deployment: auth, observability, audit logs, cost ceilings, human-in-the-loop approvals
- [ ] Agent security: the OWASP Agentic Top 10, prompt-injection defense, scoped permissions

## Tier 2 — Context & cost (makes your agents cheap and sharp)
- [ ] Context engineering: long-context vs RAG, what to put in context vs retrieve
- [ ] RAG done right: chunking, embeddings, reranking, and evaluating retrieval quality
- [ ] Prompt caching & cost/latency optimization
- [ ] Multi-model routing: picking the right model per task (quality vs cost vs latency vs modality)
- [ ] Memory systems for agents: short-term, long-term, and when each matters

## Tier 3 — Voice & conversational (your highest-ROI money lane)
- [ ] Voice agent pipelines: STT → LLM → TTS, latency budgets, barge-in/interruption handling
- [ ] Designing conversational flows that book, qualify, and hand off cleanly
- [ ] Telephony integration: getting a voice agent onto a real phone number

## Tier 4 — Gen-media for entertainment (your home turf)
- [ ] Gen-video control: prompting, multi-model routing (Kling / Luma / Veo / Runway), shot consistency
- [ ] Building a repeatable gen-video production pipeline (brief → shots → assembly → delivery)
- [ ] Real-time / live generative video for events and activations
- [ ] Voice cloning & dubbing pipelines for content/localization

## Tier 5 — Growth & ops (sell more, faster)
- [ ] Lead-gen automation patterns: enrichment, scoring, personalized outreach at scale
- [ ] Building internal tools fast with Claude Code (turn repeated work into a command/skill)
- [ ] Evaluating and pricing AI services: outcome-based pricing, demos that close

## Frontier slots (filled dynamically)
- [ ] Whatever major new technique is having a moment — added by the skill when it teaches it.
