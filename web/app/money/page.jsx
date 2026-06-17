import { getLatestBrief } from "../../lib/content";
import { parseBrief, topicSections } from "../../lib/brief-parse";
import { timecode, longLabel } from "../../lib/format";
import { Brandline, PageHeader } from "../components/ui";
import Section from "../components/Section";
import { FullBriefLink, EmptyTopic } from "../components/topic";

export const dynamic = "force-static";

export default function Money() {
  const brief = getLatestBrief();
  const parsed = brief ? parseBrief(brief.body) : null;
  const sections = parsed ? topicSections(parsed, "money") : [];

  return (
    <main>
      <Brandline right={brief ? timecode(brief.date) : "Standby"} />
      <div className="mt-8">
        <PageHeader
          kicker="Money · who's making it & how"
          title="Opportunities"
          meta={brief ? `Updated ${longLabel(brief.date)}` : undefined}
        />

        {!brief ? (
          <EmptyTopic
            title="No opportunities logged yet"
            body="Money plays — AI services people are paying for, AI-native companies, and plays you could ship through Triseno — land here with each briefing. Run one in Claude Code to start."
          />
        ) : sections.length === 0 ? (
          <EmptyTopic title="No money items in the latest briefing" body="The most recent briefing didn't surface a money play. The next one will — or run /opps in Claude Code for a focused scan." />
        ) : (
          <>
            {sections.map((s, i) => (
              <Section
                key={i}
                index={String(i + 1).padStart(2, "0")}
                heading={s.heading}
                content={s.content}
                asCards={s.key !== "dothisweek"}
                label={s.key === "dothisweek" ? "Do this week" : undefined}
              />
            ))}
            <FullBriefLink date={brief.date} />
          </>
        )}
      </div>
    </main>
  );
}
