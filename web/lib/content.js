// Read-only content layer. Reads the markdown synced into web/content/ at build
// time (see scripts/sync-content.mjs). All functions are build-time / server
// safe and degrade gracefully when a folder or file is missing.
import fs from "node:fs";
import path from "node:path";

const CONTENT = path.join(process.cwd(), "content");

function read(rel) {
  const p = path.join(CONTENT, rel);
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return null;
  }
}

// Pull the first level-1 heading off the top of a doc and return it separately
// from the remaining body, so pages can render their own header chrome.
export function splitTitle(raw) {
  if (!raw) return { title: null, body: "" };
  const lines = raw.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^#\s+(.+?)\s*$/);
    if (m) {
      const rest = [...lines.slice(0, i), ...lines.slice(i + 1)].join("\n");
      return { title: m[1].trim(), body: rest.trim() };
    }
    if (lines[i].trim() !== "") break; // heading must be near the top
  }
  return { title: null, body: raw.trim() };
}

function firstExcerpt(body) {
  const lines = body.split(/\r?\n/);
  for (const raw of lines) {
    const l = raw.trim();
    if (!l || l.startsWith("#") || l.startsWith("```")) continue;
    return l.replace(/^[-*]\s+/, "").replace(/[*_`>]/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  }
  return "";
}

const DATE_RE = /^(\d{4}-\d{2}-\d{2}).*\.md$/i;

export function getBriefings() {
  const dir = path.join(CONTENT, "briefings");
  let files = [];
  try {
    files = fs.readdirSync(dir).filter((f) => DATE_RE.test(f));
  } catch {
    return [];
  }
  const items = files.map((f) => {
    const raw = fs.readFileSync(path.join(dir, f), "utf8");
    const date = f.match(DATE_RE)[1];
    const { title, body } = splitTitle(raw);
    return {
      date,
      slug: date,
      file: f,
      title: title || `Briefing ${date}`,
      excerpt: firstExcerpt(body),
      body,
    };
  });
  items.sort((a, b) => (a.date < b.date ? 1 : -1));
  return items;
}

export function getBrief(date) {
  return getBriefings().find((b) => b.slug === date) || null;
}

export function getLatestBrief() {
  return getBriefings()[0] || null;
}

export function getDoc(rel) {
  const raw = read(rel);
  if (raw == null) return null;
  return splitTitle(raw);
}

// Answers to ad-hoc questions, written by the "ask" runs to answers/<id>.md.
// Filename is a millisecond timestamp; newest first.
export function getAnswers() {
  const dir = path.join(CONTENT, "answers");
  let files = [];
  try {
    files = fs.readdirSync(dir).filter((f) => /^\d+.*\.md$/.test(f));
  } catch {
    return [];
  }
  const items = files.map((f) => {
    const raw = fs.readFileSync(path.join(dir, f), "utf8");
    const id = f.replace(/\.md$/, "");
    const { title, body } = splitTitle(raw);
    return { id, slug: id, title: title || "Answer", body };
  });
  items.sort((a, b) => (Number(a.id) < Number(b.id) ? 1 : -1));
  return items;
}

export const docs = {
  map: () => getDoc("strategy/disruption-map.md"),
  curriculum: () => getDoc("learning/curriculum.md"),
  progress: () => getDoc("learning/progress.md"),
  profile: () => getDoc("profile/big-boy-profile.md"),
};
