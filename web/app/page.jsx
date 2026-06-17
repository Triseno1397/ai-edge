import Link from "next/link";
import { getBriefings } from "../lib/content";
import { timecode, longLabel } from "../lib/format";
import { Brandline, PageHeader, EmptyState } from "./components/ui";
import Markdown from "./components/Markdown";

export const dynamic = "force-static";

export default function Today() {
  const briefs = getBriefings();
  const latest = briefs[0] || null;

  if (!latest) {
    return (
      <main>
        <Brandline right="Standby" />
        <div className="mt-8">
          <PageHeader kicker="The Desk · Today" title="No briefing on the wire yet." />
          <EmptyState
            title="The desk is live, the archive is empty"
            body="Open this project in Claude Code and run a briefing. It writes a dated file the desk picks up automatically — then it shows here."
            hint="/brief"
          />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link href="/map" className="panel px-4 py-3 transition-colors hover:border-line/80 hover:bg-ink-700/60">
              <div className="kicker mb-1">Strategy</div>
              <div className="text-sm font-medium text-fg">Disruption Map →</div>
            </Link>
            <Link href="/learn" className="panel px-4 py-3 transition-colors hover:border-line/80 hover:bg-ink-700/60">
              <div className="kicker mb-1">Learning</div>
              <div className="text-sm font-medium text-fg">Curriculum →</div>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Brandline right={`${briefs.length} ${briefs.length === 1 ? "Brief" : "Briefs"}`} />

      <div className="mb-5 mt-7 flex items-center gap-2.5 animate-rise">
        <span className="tally-dot" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-tally">On the Desk · Live</span>
        <span className="ml-auto font-mono text-[10px] tracking-[0.16em] text-faint">{timecode(latest.date)}</span>
      </div>

      <PageHeader
        kicker="Latest Briefing"
        title={latest.title.replace(/^AI Edge Briefing\s*[—-]\s*/i, "")}
        meta={longLabel(latest.date)}
      />

      <article className="border-t border-line pt-2">
        <Markdown>{latest.body}</Markdown>
      </article>

      {briefs.length > 1 ? (
        <Link
          href="/archive"
          className="mt-8 flex items-center justify-between rounded-xl border border-line bg-ink-800/55 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-fg"
        >
          <span>Archive · {briefs.length - 1} earlier</span>
          <span aria-hidden>→</span>
        </Link>
      ) : null}
    </main>
  );
}
