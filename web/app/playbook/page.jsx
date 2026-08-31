import Link from "next/link";
import { docs } from "../../lib/content";
import { Brandline, PageHeader, EmptyState } from "../components/ui";
import Markdown from "../components/Markdown";

export const dynamic = "force-static";

export default function PlaybookPage() {
  const doc = docs.playbook();

  return (
    <main>
      <Brandline right="Library" />
      <div className="mt-8">
        <Link
          href="/creative"
          className="mb-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-faint transition-colors hover:text-muted"
        >
          <span aria-hidden>←</span> Creative
        </Link>

        <PageHeader
          kicker="Creative Library"
          title={doc?.title || "Creative Playbook"}
          meta="Craft fixes, filed by the problem they solve"
        />

        {doc ? (
          <article className="border-t border-line pt-2">
            <Markdown>{doc.body}</Markdown>
          </article>
        ) : (
          <EmptyState
            title="No techniques logged yet"
            body="The playbook lives at creative/playbook.md. Run /creative in Claude Code to start filling it with the tricks that make generations client-ready."
            hint="/creative"
          />
        )}
      </div>
    </main>
  );
}
