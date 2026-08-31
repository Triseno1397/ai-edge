import Link from "next/link";
import { docs } from "../../lib/content";
import { Brandline, PageHeader, EmptyState } from "../components/ui";
import Markdown from "../components/Markdown";

export const dynamic = "force-static";

export default function VaultPage() {
  const doc = docs.vault();

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

        <PageHeader kicker="Creative Library" title={doc?.title || "Prompt Vault"}>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="tag-image">IMAGE</span>
            <span className="tag-video">VIDEO</span>
            <span className="mx-1 text-faint">·</span>
            <span className="tag-ads">ADS</span>
            <span className="tag-film">FILM</span>
            <span className="text-[11px] text-faint">tap Copy on any prompt</span>
          </div>
        </PageHeader>

        {doc ? (
          <article className="border-t border-line pt-2">
            <Markdown>{doc.body}</Markdown>
          </article>
        ) : (
          <EmptyState
            title="No prompts logged yet"
            body="The vault lives at creative/prompt-vault.md. Run /creative in Claude Code to hunt viral prompts and start filling it."
            hint="/creative"
          />
        )}
      </div>
    </main>
  );
}
