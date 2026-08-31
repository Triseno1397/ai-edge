import Link from "next/link";
import { EmptyState } from "./ui";
import Markdown from "./Markdown";
import { timecode } from "../../lib/format";

// The "what matters" digest, pinned at the top of What's New.
export function TldrCard({ content }) {
  if (!content) return null;
  return (
    <div className="mt-5 rounded-xl border border-signal/25 bg-signal/[0.05] px-4 py-3.5 animate-rise">
      <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
        The few that matter
      </div>
      <Markdown>{content}</Markdown>
    </div>
  );
}

export function FullBriefLink({ date }) {
  if (!date) return null;
  return (
    <Link
      href={`/brief/${date}`}
      className="mt-8 flex items-center justify-between rounded-xl border border-line bg-ink-800/55 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-fg"
    >
      <span>Full briefing · {timecode(date)}</span>
      <span aria-hidden>→</span>
    </Link>
  );
}

// Shown on any topic tab when there's no briefing yet.
export function EmptyTopic({ title, body, hint }) {
  return (
    <EmptyState
      title={title}
      body={body || "Your morning brief lands here automatically each day. Want one right now? Run a briefing in Claude Code."}
      hint={hint || "/brief"}
    />
  );
}
