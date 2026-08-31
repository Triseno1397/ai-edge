"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Every destination on the desk. The bottom bar is gone — this drawer is the
// navigation, so it carries the topic tabs, the standing libraries, and the
// utility pages.
const GROUPS = [
  {
    label: "Topics",
    items: [
      { href: "/", icon: "New", label: "What's New", note: "The AI world, ranked", match: (p) => p === "/" },
      { href: "/money", icon: "Money", label: "Money", note: "Opportunities & plays" },
      { href: "/entertainment", icon: "Ent", label: "Entertainment", note: "Production-stack AI" },
      { href: "/creative", icon: "Creative", label: "Creative", note: "Gen media for ads & film" },
      { href: "/learn", icon: "Learn", label: "Learn", note: "Skills & curriculum" },
    ],
  },
  {
    label: "Libraries",
    items: [
      { href: "/map", icon: "Map", label: "Disruption Map", note: "Where AI hits each role" },
      { href: "/vault", icon: "Vault", label: "Prompt Vault", note: "Prompts worth keeping" },
      { href: "/playbook", icon: "Book", label: "Creative Playbook", note: "Craft fixes" },
    ],
  },
  {
    label: "Desk",
    items: [
      { href: "/archive", icon: "Archive", label: "Archive", note: "Every briefing, by date" },
      { href: "/ask", icon: "Ask", label: "Answers", note: "Questions you've asked" },
    ],
  },
];

function Icon({ name, active }) {
  const stroke = active ? "#F5A524" : "currentColor";
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "New": // broadcast signal / live
      return (
        <svg {...common}><circle cx="12" cy="12" r="2.4" fill={active ? "#F5A524" : "none"} /><path d="M6.5 6.5a7.8 7.8 0 0 0 0 11M17.5 6.5a7.8 7.8 0 0 1 0 11M3.7 3.7a11.8 11.8 0 0 0 0 16.6M20.3 3.7a11.8 11.8 0 0 1 0 16.6" /></svg>
      );
    case "Money":
      return (
        <svg {...common}><path d="M12 3.5v17M15.5 7.2c-.7-1-2-1.6-3.5-1.6-2 0-3.6 1.1-3.6 2.7 0 1.7 1.5 2.4 3.6 2.9 2.1.5 3.7 1.2 3.7 3 0 1.7-1.7 2.8-3.8 2.8-1.7 0-3-.6-3.7-1.7" /></svg>
      );
    case "Ent": // clapperboard
      return (
        <svg {...common}><rect x="3.5" y="8.5" width="17" height="11" rx="1.6" /><path d="M3.9 8.5 6 4.7l3.4 1.4M9.4 6.1 12.8 4.6l2 3.6M15.6 8 19 6.5l1.2 2" /></svg>
      );
    case "Creative": // lens iris
      return (
        <svg {...common}><circle cx="12" cy="12" r="8.4" /><path d="M12 3.6 8.2 10.2M20.4 12l-7.6.1M16.2 19.3l-3.8-6.6M3.6 12l7.6-.1M7.8 4.7l3.8 6.6M16.2 4.7l-3.7 6.5" /></svg>
      );
    case "Learn":
      return (
        <svg {...common}><path d="M12 6.5c-1.7-1.3-3.8-1.6-6-1.2v11.6c2.2-.4 4.3-.1 6 1.2 1.7-1.3 3.8-1.6 6-1.2V5.3c-2.2-.4-4.3-.1-6 1.2zM12 6.5v11.8" /></svg>
      );
    case "Map":
      return (
        <svg {...common}><path d="m9 5-5 2.4v11.4L9 16.4l6 2.6 5-2.4V5.2L15 7.6z" /><path d="M9 5v11.4M15 7.6V19" /></svg>
      );
    case "Vault":
      return (
        <svg {...common}><rect x="4" y="4.5" width="16" height="15" rx="2" /><circle cx="12.5" cy="12" r="3.2" /><path d="M12.5 6.4V8.8M12.5 15.2v2.4M6.9 12h2.4M15.7 12h2.4" /></svg>
      );
    case "Book":
      return (
        <svg {...common}><path d="M5 4.6h10.5a2.5 2.5 0 0 1 2.5 2.5v12.3H7.5A2.5 2.5 0 0 1 5 16.9z" /><path d="M5 16.9a2.5 2.5 0 0 1 2.5-2.5H18" /></svg>
      );
    case "Archive":
      return (
        <svg {...common}><path d="M3 5.5h18M5 5.5v13a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-13M9.5 10h5" /></svg>
      );
    case "Ask":
      return (
        <svg {...common}><path d="M4 5.5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 3.2V16.5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" /></svg>
      );
    default:
      return null;
  }
}

export default function Menu() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  // close on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // close on Escape, and stop the page scrolling behind the drawer
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (item) =>
    item.match ? item.match(pathname) : pathname.startsWith(item.href);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="-ml-1.5 flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-ink-700/70 hover:text-fg"
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <nav
            aria-label="Primary"
            onClick={(e) => e.stopPropagation()}
            className="h-full w-[84%] max-w-xs overflow-y-auto border-r border-line bg-ink-800/95 px-3 pb-8 pt-[max(env(safe-area-inset-top),0.9rem)] shadow-[10px_0_50px_-20px_rgba(0,0,0,0.9)] animate-rise"
          >
            <div className="mb-5 flex items-center justify-between px-2">
              <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-fg">
                AI&nbsp;Edge
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-faint transition-colors hover:bg-ink-700/70 hover:text-fg"
              >
                ✕
              </button>
            </div>

            {GROUPS.map((g) => (
              <div key={g.label} className="mb-5">
                <div className="mb-1.5 px-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                  {g.label}
                </div>
                <ul className="space-y-0.5">
                  {g.items.map((item) => {
                    const active = isActive(item);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={`flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors ${
                            active ? "bg-ink-600/70" : "hover:bg-ink-700/60"
                          }`}
                        >
                          <span className={active ? "text-signal" : "text-faint"}>
                            <Icon name={item.icon} active={active} />
                          </span>
                          <span className="min-w-0">
                            <span className={`block text-[14.5px] font-medium ${active ? "text-fg" : "text-muted"}`}>
                              {item.label}
                            </span>
                            <span className="block truncate text-[11.5px] text-faint">{item.note}</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
}
