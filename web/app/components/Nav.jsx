"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "New", icon: "New", match: (p) => p === "/" },
  { href: "/money", label: "Money", icon: "Money", match: (p) => p.startsWith("/money") },
  { href: "/entertainment", label: "Ent", icon: "Ent", match: (p) => p.startsWith("/entertainment") || p.startsWith("/map") },
  { href: "/learn", label: "Learn", icon: "Learn", match: (p) => p.startsWith("/learn") },
];

function Icon({ name, active }) {
  const stroke = active ? "#F5A524" : "currentColor";
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
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
    case "Learn":
      return (
        <svg {...common}><path d="M12 6.5c-1.7-1.3-3.8-1.6-6-1.2v11.6c2.2-.4 4.3-.1 6 1.2 1.7-1.3 3.8-1.6 6-1.2V5.3c-2.2-.4-4.3-.1-6 1.2zM12 6.5v11.8" /></svg>
      );
    default:
      return null;
  }
}

export default function Nav() {
  const pathname = usePathname() || "/";

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(env(safe-area-inset-bottom),0.6rem)] pt-2 sm:bottom-5"
    >
      <ul className="mx-auto flex max-w-desk items-stretch gap-1 rounded-2xl border border-line bg-ink-800/80 p-1.5 backdrop-blur-xl sm:max-w-md sm:shadow-[0_10px_40px_-12px_rgba(0,0,0,0.8)]">
        {TABS.map((t) => {
          const active = t.match(pathname);
          return (
            <li key={t.href} className="flex-1">
              <Link
                href={t.href}
                aria-current={active ? "page" : undefined}
                className={`group flex flex-col items-center gap-1 rounded-xl px-1 py-2 transition-colors ${
                  active ? "bg-ink-600/70 text-fg" : "text-faint hover:text-muted"
                }`}
              >
                <Icon name={t.icon} active={active} />
                <span className={`font-mono text-[10px] uppercase tracking-[0.16em] ${active ? "text-signal" : ""}`}>
                  {t.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
