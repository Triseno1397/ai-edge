"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Today", match: (p) => p === "/" },
  { href: "/archive", label: "Archive", match: (p) => p.startsWith("/archive") || p.startsWith("/brief") },
  { href: "/map", label: "Map", match: (p) => p.startsWith("/map") },
  { href: "/learn", label: "Learn", match: (p) => p.startsWith("/learn") },
];

function Icon({ name, active }) {
  const stroke = active ? "#F5A524" : "currentColor";
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "Today":
      // broadcast signal / live
      return (
        <svg {...common}><circle cx="12" cy="12" r="2.4" fill={active ? "#F5A524" : "none"} /><path d="M6.5 6.5a7.8 7.8 0 0 0 0 11M17.5 6.5a7.8 7.8 0 0 1 0 11M3.7 3.7a11.8 11.8 0 0 0 0 16.6M20.3 3.7a11.8 11.8 0 0 1 0 16.6" /></svg>
      );
    case "Archive":
      return (
        <svg {...common}><rect x="3.5" y="4.5" width="17" height="4" rx="1.2" /><path d="M5.5 8.5v9.2a1.8 1.8 0 0 0 1.8 1.8h9.4a1.8 1.8 0 0 0 1.8-1.8V8.5M10 12.5h4" /></svg>
      );
    case "Map":
      return (
        <svg {...common}><path d="M4 5.5 9.2 4l5.6 1.8L20 4v14l-5.2 1.6L9.2 18 4 19.5zM9.2 4v14M14.8 5.8v13.8" /></svg>
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
                <Icon name={t.label} active={active} />
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
                    active ? "text-signal" : ""
                  }`}
                >
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
