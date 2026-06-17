import { docs } from "../../lib/content";
import { Brandline, PageHeader, EmptyState } from "../components/ui";
import Markdown from "../components/Markdown";

export const dynamic = "force-static";

export default function MapPage() {
  const doc = docs.map();

  return (
    <main>
      <Brandline right="Strategy" />
      <div className="mt-8">
        <PageHeader
          kicker="Entertainment Disruption"
          title={doc?.title || "Disruption Map"}
        >
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="tag-now">NOW</span>
            <span className="text-[11px] text-faint">deployable today</span>
            <span className="mx-1 text-faint">·</span>
            <span className="tag-near">NEAR</span>
            <span className="text-[11px] text-faint">6–18 mo</span>
            <span className="mx-1 text-faint">·</span>
            <span className="tag-horizon">HORIZON</span>
            <span className="text-[11px] text-faint">further out</span>
          </div>
        </PageHeader>

        {doc ? (
          <article className="border-t border-line pt-2">
            <Markdown>{doc.body}</Markdown>
          </article>
        ) : (
          <EmptyState
            title="No map yet"
            body="The disruption map lives at strategy/disruption-map.md. Run /disrupt in Claude Code to build and update it."
            hint="/disrupt"
          />
        )}
      </div>
    </main>
  );
}
