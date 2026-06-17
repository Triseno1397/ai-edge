import { getLatestBrief, docs } from "../../lib/content";
import { parseBrief, topicSections } from "../../lib/brief-parse";
import { timecode } from "../../lib/format";
import { Brandline, PageHeader, SectionLabel, EmptyState } from "../components/ui";
import Section from "../components/Section";
import Markdown from "../components/Markdown";

export const dynamic = "force-static";

function tally(body) {
  if (!body) return { done: 0, total: 0 };
  const total = (body.match(/-\s*\[[ xX]\]/g) || []).length;
  const done = (body.match(/-\s*\[[xX]\]/g) || []).length;
  return { done, total };
}

export default function Learn() {
  const brief = getLatestBrief();
  const learnSections = brief ? topicSections(parseBrief(brief.body), "learn") : [];
  const curriculum = docs.curriculum();
  const progress = docs.progress();
  const { done, total } = tally(curriculum?.body);
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <main>
      <Brandline right={brief ? timecode(brief.date) : "Standby"} />
      <div className="mt-8">
        <PageHeader kicker="Learn · methods & ways to move faster" title="Skill Up">
          {total ? (
            <div className="mt-5">
              <div className="mb-2 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.16em]">
                <span className="text-muted">Mastered</span>
                <span className="text-fg">{done} <span className="text-faint">/ {total}</span></span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-ink-600">
                <div className="h-full rounded-full bg-signal/80" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ) : null}
        </PageHeader>

        {/* This cycle's recommended method, pulled from the latest briefing */}
        {learnSections.length > 0 ? (
          <div className="rounded-xl border border-signal/25 bg-signal/[0.05] px-4 py-3.5">
            <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Learn this now</div>
            {learnSections.map((s, i) => (
              <Markdown key={i}>{s.content}</Markdown>
            ))}
          </div>
        ) : null}

        {curriculum ? (
          <Section heading="Curriculum" content={curriculum.body} asCards={false} index="//" />
        ) : null}

        {progress ? (
          <section className="mt-10">
            <SectionLabel index="//">Progress Log</SectionLabel>
            <Markdown>{progress.body}</Markdown>
          </section>
        ) : null}

        {!curriculum && !progress && learnSections.length === 0 ? (
          <EmptyState
            title="No curriculum loaded"
            body="The learning roadmap lives in learning/curriculum.md. Run /learn in Claude Code to start a lesson."
            hint="/learn"
          />
        ) : null}
      </div>
    </main>
  );
}
