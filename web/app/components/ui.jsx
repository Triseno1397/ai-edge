// Presentational primitives shared across views. Server-safe (no hooks).
import Link from "next/link";

export function Brandline({ right }) {
  return (
    <div className="flex items-center justify-between pt-2">
      <Link href="/" className="flex items-center gap-2.5">
        <Logo />
        <span className="font-mono text-[13px] font-semibold uppercase tracking-[0.32em] text-fg">
          AI&nbsp;Edge
        </span>
      </Link>
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">{right}</div>
    </div>
  );
}

export function Logo({ size = 22 }) {
  // safe-area crop marks framing a signal dot — a broadcast monitor in miniature
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="0.6" y="0.6" width="22.8" height="22.8" rx="6" fill="#0F0F11" stroke="rgba(255,255,255,0.10)" />
      <g stroke="#ECECEE" strokeWidth="1.3" strokeLinecap="round">
        <path d="M6 4.6H4.6V6M18 4.6h1.4V6M6 19.4H4.6V18M18 19.4h1.4V18" />
      </g>
      <circle cx="12" cy="12" r="2.5" fill="#F5A524" />
    </svg>
  );
}

export function PageHeader({ kicker, title, meta, children }) {
  return (
    <header className="mb-6 animate-rise">
      {kicker ? <div className="kicker mb-2">{kicker}</div> : null}
      <h1 className="text-balance text-[26px] font-semibold leading-[1.12] tracking-[-0.01em] text-fg sm:text-[30px]">
        {title}
      </h1>
      {meta ? <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{meta}</div> : null}
      {children}
    </header>
  );
}

export function SectionLabel({ index, children }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      {index ? <span className="font-mono text-[11px] tracking-[0.2em] text-signal">{index}</span> : null}
      <span className="kicker text-muted">{children}</span>
      <span className="rule flex-1" />
    </div>
  );
}

export function EmptyState({ title, body, hint }) {
  return (
    <div className="panel mt-2 flex flex-col items-center gap-3 px-6 py-12 text-center animate-rise">
      <Logo size={30} />
      <div className="text-[15px] font-medium text-fg">{title}</div>
      <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted">{body}</p>
      {hint ? (
        <code className="mt-1 rounded-md border border-line bg-ink-700/70 px-2.5 py-1 font-mono text-xs text-signal">
          {hint}
        </code>
      ) : null}
    </div>
  );
}
