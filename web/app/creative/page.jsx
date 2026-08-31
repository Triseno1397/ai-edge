import Link from "next/link";
import { getLatestBrief } from "../../lib/content";
import { parseBrief, topicSections } from "../../lib/brief-parse";
import { timecode, longLabel } from "../../lib/format";
import { Brandline, PageHeader } from "../components/ui";
import CreativeTabs from "../components/CreativeTabs";
import { FullBriefLink, EmptyTopic } from "../components/topic";

export const dynamic = "force-static";

function LibraryLink({ href, kicker, title, body }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl border border-line bg-ink-800/55 px-4 py-3.5 transition-colors hover:border-line/90 hover:bg-ink-700/55"
    >
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal">{kicker}</div>
        <div className="mt-0.5 text-[15px] font-medium text-fg">{title}</div>
        <div className="text-[12px] text-muted">{body}</div>
      </div>
      <span className="text-faint" aria-hidden>→</span>
    </Link>
  );
}

export default function Creative() {
  const brief = getLatestBrief();
  const sections = brief ? topicSections(parseBrief(brief.body), "creative") : [];

  // one Creative section per briefing, but merge defensively in case of drift
  const subs = sections.flatMap((s) => s.subs || []);
  const intro = sections.map((s) => s.intro).filter(Boolean).join("\n\n");

  return (
    <main>
      <Brandline right={brief ? timecode(brief.date) : "Standby"} />
      <div className="mt-8">
        <PageHeader
          kicker="Creative · gen media for ads & film"
          title="Creative AI"
          meta={brief ? `Updated ${longLabel(brief.date)}` : undefined}
        />

        <div className="grid gap-2.5 sm:grid-cols-2">
          <LibraryLink
            href="/vault"
            kicker="Library"
            title="Prompt Vault"
            body="Every prompt worth keeping, by job"
          />
          <LibraryLink
            href="/playbook"
            kicker="Library"
            title="Creative Playbook"
            body="Craft fixes: consistency, camera, grade"
          />
        </div>

        {!brief ? (
          <div className="mt-7">
            <EmptyTopic
              title="No creative intel yet"
              body="Model releases, what's going viral, prompts you can lift, and craft tricks land here with each briefing. The two libraries above are always current."
              hint="/creative"
            />
          </div>
        ) : subs.length === 0 && !intro ? (
          <div className="mt-7">
            <EmptyTopic
              title="Nothing creative in the latest briefing"
              body="No gen-media item this cycle. Check the libraries above, or run /creative in Claude Code for a deep scan of releases, viral formats, and prompts."
              hint="/creative"
            />
          </div>
        ) : (
          <>
            <CreativeTabs subs={subs} intro={intro} />
            <FullBriefLink date={brief.date} />
          </>
        )}
      </div>
    </main>
  );
}
