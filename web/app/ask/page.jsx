import { getAnswers } from "../../lib/content";
import { Brandline, PageHeader, EmptyState } from "../components/ui";
import Markdown from "../components/Markdown";

export const dynamic = "force-static";

export default function Ask() {
  const answers = getAnswers();

  return (
    <main>
      <Brandline right={`${answers.length} ${answers.length === 1 ? "Answer" : "Answers"}`} />
      <div className="mt-8">
        <PageHeader kicker="Ask the desk" title="Your questions, answered." />

        {answers.length === 0 ? (
          <EmptyState
            title="No questions yet"
            body="Tap Run (bottom-right) and choose “Ask the desk.” Type any question and it researches it live and answers here — on your phone or computer."
          />
        ) : (
          <div className="space-y-3">
            {answers.map((a, i) => (
              <article
                key={a.id}
                className="rounded-xl border border-line bg-ink-800/45 px-4 py-4 animate-rise"
                style={{ animationDelay: `${Math.min(i, 8) * 35}ms` }}
              >
                <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Question</div>
                <h2 className="mb-2 text-[17px] font-semibold leading-snug text-fg">{a.title}</h2>
                <Markdown>{a.body}</Markdown>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
