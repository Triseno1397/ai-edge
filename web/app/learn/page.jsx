import { docs } from "../../lib/content";
import { Brandline, PageHeader, SectionLabel, EmptyState } from "../components/ui";
import Markdown from "../components/Markdown";

export const dynamic = "force-static";

function tally(body) {
  if (!body) return { done: 0, total: 0 };
  const total = (body.match(/-\s*\[[ xX]\]/g) || []).length;
  const done = (body.match(/-\s*\[[xX]\]/g) || []).length;
  return { done, total };
}

export default function LearnPage() {
  const curriculum = docs.curriculum();
  const progress = docs.progress();
  const { done, total } = tally(curriculum?.body);
  const pct = total ? Math.round((done / total) * 100) : 0;

  if (!curriculum && !progress) {
    return (
      <main>
        <Brandline right="Learning" />
        <div className="mt-8">
          <PageHeader kicker="Learning" title="Skill curriculum" />
          <EmptyState
            title="No curriculum loaded"
            body="The learning roadmap lives in learning/curriculum.md. Run /learn in Claude Code to start a lesson and build the log."
            hint="/learn"
          />
        </div>
      </main>
    );
  }

  return (
    <main>
      <Brandline right="Learning" />
      <div className="mt-8">
        <PageHeader kicker="Learning" title={curriculum?.title || "Skill curriculum"}>
          {total ? (
            <div className="mt-5">
              <div className="mb-2 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.16em]">
                <span className="text-muted">Mastered</span>
                <span className="text-fg">
                  {done} <span className="text-faint">/ {total}</span>
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-ink-600">
                <div className="h-full rounded-full bg-signal/80" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ) : null}
        </PageHeader>

        {curriculum ? (
          <article className="border-t border-line pt-2">
            <Markdown>{curriculum.body}</Markdown>
          </article>
        ) : null}

        {progress ? (
          <section className="mt-10">
            <SectionLabel index="//">Progress Log</SectionLabel>
            <Markdown>{progress.body}</Markdown>
          </section>
        ) : null}
      </div>
    </main>
  );
}
