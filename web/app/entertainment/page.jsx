import Link from "next/link";
import { getLatestBrief } from "../../lib/content";
import { parseBrief, topicSections } from "../../lib/brief-parse";
import { timecode, longLabel } from "../../lib/format";
import { Brandline, PageHeader } from "../components/ui";
import Section from "../components/Section";
import { FullBriefLink, EmptyTopic } from "../components/topic";

export const dynamic = "force-static";

function MapLink() {
  return (
    <Link
      href="/map"
      className="mt-5 flex items-center justify-between rounded-xl border border-line bg-ink-800/55 px-4 py-3.5 transition-colors hover:border-line/90 hover:bg-ink-700/55"
    >
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal">Strategy</div>
        <div className="mt-0.5 text-[15px] font-medium text-fg">The Disruption Map</div>
        <div className="text-[12px] text-muted">Where AI hits each production role — and your angle to own it</div>
      </div>
      <span className="text-faint" aria-hidden>→</span>
    </Link>
  );
}

export default function Entertainment() {
  const brief = getLatestBrief();
  const parsed = brief ? parseBrief(brief.body) : null;
  const sections = parsed ? topicSections(parsed, "entertainment") : [];

  return (
    <main>
      <Brandline right={brief ? timecode(brief.date) : "Standby"} />
      <div className="mt-8">
        <PageHeader
          kicker="Entertainment · your industry"
          title="Production-Stack AI"
          meta={brief ? `Updated ${longLabel(brief.date)}` : undefined}
        />

        <MapLink />

        {!brief ? (
          <div className="mt-7">
            <EmptyTopic
              title="No entertainment items yet"
              body="AI moving across the production stack — camera, audio, switching, post, crewing — and where your opening is, lands here with each briefing. The map above is always current."
            />
          </div>
        ) : sections.length === 0 ? (
          <div className="mt-7">
            <EmptyTopic title="Nothing new in the latest briefing" body="No entertainment item this cycle. Check the Disruption Map above, or run /entertainment in Claude Code for a deep scan." />
          </div>
        ) : (
          <>
            {sections.map((s, i) => (
              <Section key={i} index={String(i + 1).padStart(2, "0")} heading={s.heading} content={s.content} />
            ))}
            <FullBriefLink date={brief.date} />
          </>
        )}
      </div>
    </main>
  );
}
