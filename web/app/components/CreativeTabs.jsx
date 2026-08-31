"use client";

import { useState } from "react";
import Markdown from "./Markdown";

// Order the Creative section's sub-sections into fixed tabs so the tab bar never
// reshuffles between briefings. Anything the parser couldn't classify lands in
// "More" rather than getting dropped.
const ORDER = [
  { key: "releases", label: "Releases" },
  { key: "viral", label: "Viral" },
  { key: "prompts", label: "Prompts" },
  { key: "craft", label: "Craft" },
  { key: "other", label: "More" },
];

export default function CreativeTabs({ subs = [], intro = "" }) {
  const groups = ORDER.map((t) => ({
    ...t,
    // a briefing can carry more than one sub-header per bucket
    items: subs.filter((s) => s.key === t.key),
  })).filter((g) => g.items.length > 0);

  const [active, setActive] = useState(groups[0]?.key || null);

  // no sub-headers in this briefing — render the section straight through
  if (groups.length === 0) {
    return intro ? <Markdown>{intro}</Markdown> : null;
  }

  const current = groups.find((g) => g.key === active) || groups[0];

  return (
    <div className="mt-6">
      {intro ? <Markdown>{intro}</Markdown> : null}

      <div
        role="tablist"
        aria-label="Creative sections"
        className="-mx-1 flex gap-1 overflow-x-auto rounded-xl border border-line bg-ink-800/60 p-1"
      >
        {groups.map((g) => {
          const on = g.key === current.key;
          return (
            <button
              key={g.key}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(g.key)}
              className={`flex-1 whitespace-nowrap rounded-lg px-2 py-2 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors ${
                on ? "bg-ink-600/80 text-signal" : "text-faint hover:text-muted"
              }`}
            >
              {g.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" key={current.key}>
        {current.items.map((s, i) => (
          <section key={i} className="mt-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.2em] text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="kicker text-muted">{s.heading}</span>
              <span className="rule flex-1" />
            </div>
            <Markdown>{s.content}</Markdown>
          </section>
        ))}
      </div>
    </div>
  );
}
