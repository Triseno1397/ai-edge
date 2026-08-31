"use client";

import { Children, isValidElement, useState } from "react";
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
// discipline tags on creative items — medium and which side of the business
const DISCIPLINE = {
  ADS: "tag-ads",
  FILM: "tag-film",
  IMAGE: "tag-image",
  VIDEO: "tag-video",
  AUDIO: "tag-audio",
};

// ---------------------------------------------------------------- media utils

// YouTube and Vimeo can be played inline. Everything else (TikTok, X, Instagram)
// blocks embedding, so those become a card that opens the post.
function videoOf(href = "") {
  const yt = href.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{6,})/i
  );
  if (yt) return { kind: "youtube", id: yt[1] };
  const vm = href.match(/vimeo\.com\/(?:video\/)?(\d{6,})/i);
  if (vm) return { kind: "vimeo", id: vm[1] };
  return null;
}

const PLATFORMS = [
  [/tiktok\.com/i, "TikTok"],
  [/instagram\.com/i, "Instagram"],
  [/(?:^|\/\/|\.)(?:x|twitter)\.com/i, "X"],
  [/reddit\.com/i, "Reddit"],
  [/threads\.(?:net|com)/i, "Threads"],
];

function platformOf(href = "") {
  for (const [re, name] of PLATFORMS) if (re.test(href)) return name;
  return null;
}

function PlayGlyph() {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/55 backdrop-blur-sm transition-colors group-hover:border-signal/70 group-hover:bg-black/70">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 text-fg">
        <path d="M8 5.2v13.6L19 12z" />
      </svg>
    </span>
  );
}

// Poster first, iframe only after a tap — keeps the page light and gives the
// grid of creative items a consistent look.
function VideoEmbed({ href, kind, id, label }) {
  const [playing, setPlaying] = useState(false);
  const poster = kind === "youtube" ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
  const src =
    kind === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
      : `https://player.vimeo.com/video/${id}?autoplay=1`;

  return (
    <figure className="my-4">
      <div className="relative aspect-video overflow-hidden rounded-lg border border-line bg-ink-900">
        {playing ? (
          <iframe
            src={src}
            title={label || "Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${label || "video"}`}
            className="group absolute inset-0 flex items-center justify-center"
          >
            {poster ? (
              <img
                src={poster}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
              />
            ) : null}
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="relative">
              <PlayGlyph />
            </span>
            <span className="absolute bottom-2.5 left-3 font-mono text-[10px] uppercase tracking-[0.16em] text-fg/80">
              {kind === "youtube" ? "YouTube" : "Vimeo"}
            </span>
          </button>
        )}
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-faint transition-colors hover:text-muted"
      >
        Open on {kind === "youtube" ? "YouTube" : "Vimeo"} →
      </a>
    </figure>
  );
}

// TikTok / X / Instagram — embedding is blocked, so link out cleanly.
function SourceCard({ href, platform, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="my-4 flex items-center justify-between gap-3 rounded-lg border border-line bg-ink-800/55 px-4 py-3 transition-colors hover:border-signal/40"
    >
      <span className="min-w-0">
        <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-signal">{platform}</span>
        <span className="block truncate text-[13.5px] text-fg">
          {label && label !== href ? label : "Watch the post"}
        </span>
      </span>
      <span className="shrink-0 text-faint" aria-hidden>
        ↗
      </span>
    </a>
  );
}

function Figure({ src, alt }) {
  return (
    <figure className="my-4">
      <img
        src={src}
        alt={alt || ""}
        loading="lazy"
        className="w-full rounded-lg border border-line bg-ink-900 object-cover"
      />
      {alt ? (
        <figcaption className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">{alt}</figcaption>
      ) : null}
    </figure>
  );
}

// Prompts live in fenced blocks so they can be lifted straight into a tool.
function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the text is selectable anyway */
    }
  }

  return (
    <div className="group relative my-4">
      <pre className="overflow-x-auto rounded-lg border border-line bg-ink-900/80 p-4 pr-16">
        <code className="font-mono text-[12.5px] leading-relaxed text-[#d6d6da]">{code}</code>
      </pre>
      <button
        type="button"
        onClick={copy}
        className="absolute right-2 top-2 rounded-md border border-line bg-ink-800/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-signal/40 hover:text-fg"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

// ------------------------------------------------------------------ renderers

// significant children of a paragraph, ignoring whitespace-only text nodes
function meaningful(children) {
  return Children.toArray(children).filter((c) => !(typeof c === "string" && c.trim() === ""));
}

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
    const kids = meaningful(children);
    const lone = kids.length === 1 && isValidElement(kids[0]) ? kids[0] : null;

    // a lone image — render the figure, not a <p> wrapping a <figure>
    if (lone?.props?.src) return <Figure src={lone.props.src} alt={lone.props.alt} />;

    // a lone link to a video or a social post
    if (lone?.props?.href) {
      const href = lone.props.href;
      const label = text(lone.props.children).trim();
      const vid = videoOf(href);
      if (vid) return <VideoEmbed href={href} kind={vid.kind} id={vid.id} label={label} />;
      const platform = platformOf(href);
      if (platform) return <SourceCard href={href} platform={platform} label={label} />;
    }

    const t = text(children).trim();

    // a line of nothing but tag tokens (`ADS` `VIDEO`) — render as a chip row
    const tokens = t.split(/\s+/).filter(Boolean);
    if (
      tokens.length > 0 &&
      tokens.every((k) => MATURITY[k.toUpperCase()] || DISCIPLINE[k.toUpperCase()])
    ) {
      return <div className="my-2 flex flex-wrap items-center gap-1.5">{children}</div>;
    }

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
  // a lone image is upgraded to a <figure> by `p` above; this handles the rarer
  // inline case, where a <figure> inside a <p> would be invalid nesting
  img({ src, alt }) {
    return (
      <img
        src={src}
        alt={alt || ""}
        loading="lazy"
        className="my-3 w-full rounded-lg border border-line bg-ink-900 object-cover"
      />
    );
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
  // fenced blocks are rendered by `pre` (below) so a prompt in a bare ``` fence
  // still gets block treatment; this only styles inline code and tag chips.
  code({ children }) {
    const t = text(children).trim().toUpperCase();
    const tag = MATURITY[t] || DISCIPLINE[t];
    if (tag) return <span className={tag}>{t}</span>;
    return (
      <code className="rounded border border-line bg-ink-700/80 px-1.5 py-0.5 font-mono text-[12.5px] text-signal">
        {children}
      </code>
    );
  },
  pre({ children }) {
    return <CodeBlock code={text(children).replace(/\n+$/, "")} />;
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
