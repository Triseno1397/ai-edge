import { getBriefings } from "../../lib/content";
import { Brandline, PageHeader, EmptyState } from "../components/ui";
import ArchiveList from "./ArchiveList";

export const dynamic = "force-static";

export default function Archive() {
  const briefs = getBriefings().map(({ body, ...rest }) => rest); // drop body for client payload

  return (
    <main>
      <Brandline right={`${briefs.length} Total`} />
      <div className="mt-8">
        <PageHeader kicker="Archive" title="Every briefing, by date." />
        {briefs.length === 0 ? (
          <EmptyState
            title="Nothing archived yet"
            body="Run a briefing in Claude Code and it lands here as a searchable, dated record."
            hint="/brief"
          />
        ) : (
          <ArchiveList briefs={briefs} />
        )}
      </div>
    </main>
  );
}
