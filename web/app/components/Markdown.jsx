"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// flatten React children down to their text content for marker detection
function text(node) {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(text).join("");
  if (node.props && node.props.children) return text(node.props.children);
  return "";
}

const MATURITY = { NOW: "tag-now", NEAR: "tag-near", HORIZON: "tag-horizon" };

const components = {
  h1({ children }) {
    const t = text(children);
    const lane = t.match(/LANE\s*(\d+)\s*[—\-:]*\s*(.*)$/i);
    if (lane) {
      const [, num, rest] = lane;
      return (
        <div className="mt-10 mb-5 border-t border-line pt-5 first:mt-0 first:border-t-0 first:pt-0">
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-signal">
            Lane {String(num).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[20px] font-semibold tracking-[-0.01em] text-fg">{rest.trim()}</div>
        </div>
      );
    }
    return <h2 className="mt-8 text-[22px] font-semibold tracking-[-0.01em] text-fg">{children}</h2>;
  },
  h2({ children }) {
    return (
      <div className="mt-7 mb-3 flex items-center gap-3">
        <h3 className="kicker text-muted">{children}</h3>
        <span className="h-px flex-1 bg-line" />
      </div>
    );
  },
  h3({ children }) {
    return <h4 className="mt-5 text-[15px] font-semibold text-fg">{children}</h4>;
  },
  p({ children }) {
    const t = text(children).trim();
    if (/^→\s*For you:/i.test(t)) {
      return (
        <p className="my-2 rounded-r-md border-l-2 border-signal/70 bg-signal/[0.06] py-1.5 pl-3 pr-2 text-[14px] leading-relaxed text-fg">
          {children}
        </p>
      );
    }
    if (/^Why it'?s big:/i.test(t)) {
      return (
        <p className="my-2 rounded-r-md border-l-2 border-horizon/60 bg-horizon/[0.05] py-1.5 pl-3 pr-2 text-[14px] leading-relaxed text-muted">
          {children}
        </p>
      );
    }
    return <p className="my-3 text-[15px] leading-[1.65] text-[#d6d6da]">{children}</p>;
  },
  ul({ children }) {
    return <ul className="my-3 space-y-1.5 pl-1">{children}</ul>;
  },
  ol({ children }) {
    return <ol className="my-3 list-decimal space-y-1.5 pl-5 marker:font-mono marker:text-faint">{children}</ol>;
  },
  li({ children, ordered }) {
    if (ordered) return <li className="text-[15px] leading-[1.6] text-[#d6d6da]">{children}</li>;
    return (
      <li className="relative pl-4 text-[15px] leading-[1.6] text-[#d6d6da] before:absolute before:left-0 before:top-[0.72em] before:h-1 before:w-1 before:rounded-full before:bg-signal/70">
        {children}
      </li>
    );
  },
  a({ children, href }) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-signal underline decoration-signal/30 underline-offset-2 transition-colors hover:decoration-signal"
      >
        {children}
      </a>
    );
  },
  strong({ children }) {
    return <strong className="font-semibold text-fg">{children}</strong>;
  },
  em({ children }) {
    return <em className="italic text-muted">{children}</em>;
  },
  code({ inline, children, className }) {
    const t = text(children).trim().toUpperCase();
    if (MATURITY[t]) return <span className={MATURITY[t]}>{t}</span>;
    if (inline ?? !className) {
      return (
        <code className="rounded border border-line bg-ink-700/80 px-1.5 py-0.5 font-mono text-[12.5px] text-signal">
          {children}
        </code>
      );
    }
    return (
      <code className="block overflow-x-auto rounded-lg border border-line bg-ink-900/80 p-4 font-mono text-[12.5px] leading-relaxed text-[#d6d6da]">
        {children}
      </code>
    );
  },
  blockquote({ children }) {
    return (
      <blockquote className="my-4 rounded-r-md border-l-2 border-line bg-ink-800/40 py-1 pl-4 pr-2 text-[14px] italic text-muted">
        {children}
      </blockquote>
    );
  },
  hr() {
    return <hr className="my-7 border-line" />;
  },
  table({ children }) {
    return (
      <div className="my-4 overflow-x-auto rounded-lg border border-line">
        <table className="w-full border-collapse text-left text-[13.5px]">{children}</table>
      </div>
    );
  },
  thead({ children }) {
    return <thead className="bg-ink-700/60">{children}</thead>;
  },
  th({ children }) {
    return <th className="border-b border-line px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{children}</th>;
  },
  td({ children }) {
    return <td className="border-b border-line/60 px-3 py-2 align-top text-[#d6d6da]">{children}</td>;
  },
};

export default function Markdown({ children }) {
  return (
    <div className="animate-rise">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children || ""}
      </ReactMarkdown>
    </div>
  );
}
