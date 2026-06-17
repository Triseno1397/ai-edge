import Link from "next/link";
import { Brandline, EmptyState } from "./components/ui";

export default function NotFound() {
  return (
    <main>
      <Brandline right="404" />
      <div className="mt-10">
        <EmptyState
          title="Off the air"
          body="That page isn't on the desk. Head back to today's briefing."
        />
        <Link
          href="/"
          className="mt-4 flex items-center justify-center rounded-xl border border-line bg-ink-800/55 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-fg"
        >
          ← Back to Today
        </Link>
      </div>
    </main>
  );
}
