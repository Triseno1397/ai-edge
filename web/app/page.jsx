import { getLatestBrief } from "../lib/content";
import { parseBrief, topicSections } from "../lib/brief-parse";
import { timecode, longLabel } from "../lib/format";
import { Brandline, PageHeader } from "./components/ui";
import Section from "./components/Section";
import { TldrCard, FullBriefLink, EmptyTopic } from "./components/topic";

export const dynamic = "force-static";

export default function WhatsNew() {
  const brief = getLatestBrief();

  return (
    <main>
      <Brandline right={brief ? timecode(brief.date) : "Standby"} />

      <div className="mb-1 mt-7 flex items-center gap-2.5 animate-rise">
        <span className="tally-dot" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-tally">Live · The AI World</span>
      </div>
      <PageHeader
        kicker="Ranked · what's important, what's not"
        title="What's New"
        meta={brief ? `Updated ${longLabel(brief.date)}` : undefined}
      />

      {!brief ? (
        <EmptyTopic title="No briefing yet" />
      ) : (
        <>
          <TldrCard content={parseBrief(brief.body).tldr} />
          {topicSections(parseBrief(brief.body), "new").map((s, i) => (
            <Section key={i} index={String(i + 1).padStart(2, "0")} heading={s.heading} content={s.content} />
          ))}
          <FullBriefLink date={brief.date} />
        </>
      )}
    </main>
  );
}
