"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { timecode, shortLabel } from "../../lib/format";

export default function ArchiveList({ briefs }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return briefs;
    return briefs.filter((b) =>
      [b.title, b.excerpt, b.date].filter(Boolean).join(" ").toLowerCase().includes(needle)
    );
  }, [q, briefs]);

  return (
    <div>
      <div className="relative mb-5">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-faint">
          ⌕
        </span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search briefings…"
          className="w-full rounded-xl border border-line bg-ink-800/60 py-2.5 pl-8 pr-3 text-sm text-fg placeholder:text-faint focus:border-signal/40 focus:outline-none focus:ring-1 focus:ring-signal/20"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="px-1 py-8 text-center text-sm text-muted">No briefings match “{q}”.</p>
      ) : (
        <ul className="space-y-2.5">
          {filtered.map((b, i) => (
            <li key={b.slug} className="animate-rise" style={{ animationDelay: `${Math.min(i, 8) * 35}ms` }}>
              <Link
                href={`/brief/${b.slug}`}
                className="group block rounded-xl border border-line bg-ink-800/50 p-4 transition-colors hover:border-line/90 hover:bg-ink-700/55"
              >
                <div className="mb-1.5 flex items-center gap-2.5">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-signal">{timecode(b.date)}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{shortLabel(b.date)}</span>
                  <span className="ml-auto text-faint transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                </div>
                <div className="text-[15px] font-medium leading-snug text-fg">
                  {b.title.replace(/^AI Edge Briefing\s*[—-]\s*/i, "")}
                </div>
                {b.excerpt ? (
                  <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-muted">{b.excerpt}</p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
