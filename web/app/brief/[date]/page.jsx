import Link from "next/link";
import { notFound } from "next/navigation";
import { getBriefings, getBrief } from "../../../lib/content";
import { timecode, longLabel } from "../../../lib/format";
import { Brandline, PageHeader } from "../../components/ui";
import Markdown from "../../components/Markdown";

// Only the briefings present at build time exist as routes; nothing is resolved
// at runtime. Valid even when the list is empty (no briefings yet).
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getBriefings().map((b) => ({ date: b.slug }));
}

export default function BriefPage({ params }) {
  const brief = getBrief(params.date);
  if (!brief) notFound();

  return (
    <main>
      <Brandline right={timecode(brief.date)} />

      <Link
        href="/archive"
        className="mt-6 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-faint transition-colors hover:text-muted"
      >
        <span aria-hidden>←</span> Archive
      </Link>

      <div className="mt-3">
        <PageHeader
          kicker="Briefing"
          title={brief.title.replace(/^AI Edge Briefing\s*[—-]\s*/i, "")}
          meta={longLabel(brief.date)}
        />
      </div>

      <article className="border-t border-line pt-2">
        <Markdown>{brief.body}</Markdown>
      </article>
    </main>
  );
}
