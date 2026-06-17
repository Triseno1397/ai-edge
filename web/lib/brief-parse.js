// Splits a briefing's markdown body into structured sections so the app can
// present topic-first views (What's New / Money / Entertainment / Learn) instead
// of one long document. Tolerant of header drift: routes by lane first, then by
// section-heading keywords.

function classify(heading) {
  const h = heading.toLowerCase();
  if (h.includes("tl;dr") || h.includes("tldr")) return "tldr";
  if (h.includes("do this week")) return "dothisweek";
  if (h.includes("money") || h.includes("opportunit")) return "money";
  if (h.includes("entertainment")) return "entertainment";
  if (h.includes("learn")) return "learn";
  if (h.includes("breaking") || h.includes("biggest")) return "breaking";
  if (h.includes("tool") || h.includes("capabilit")) return "tools";
  if (h.includes("power") || h.includes("policy")) return "policy";
  return "other";
}

// returns { tldr, doThisWeek, sections: [{ lane, heading, key, content }] }
export function parseBrief(body) {
  const lines = (body || "").split(/\r?\n/);
  const sections = [];
  let lane = null; // 'world' | 'edge' | null
  let cur = null;

  const flush = () => {
    if (cur) {
      cur.content = cur.buf.join("\n").trim();
      delete cur.buf;
      sections.push(cur);
      cur = null;
    }
  };

  for (const line of lines) {
    const h1 = line.match(/^#\s+(.+)/);
    const h2 = line.match(/^##\s+(.+)/);
    if (h1) {
      flush();
      const t = h1[1].toLowerCase();
      if (t.includes("lane 1") || t.includes("the ai world")) lane = "world";
      else if (t.includes("lane 2") || t.includes("your edge")) lane = "edge";
      continue;
    }
    if (h2) {
      flush();
      const heading = h2[1].trim();
      cur = { lane, heading, key: classify(heading), buf: [] };
      continue;
    }
    if (cur) cur.buf.push(line);
  }
  flush();

  const tldr = sections.find((s) => s.key === "tldr")?.content || null;
  const doThisWeek = sections.find((s) => s.key === "dothisweek")?.content || null;
  return { tldr, doThisWeek, sections };
}

// Which sections belong to each topic tab.
export function topicSections(parsed, topic) {
  const s = parsed.sections;
  switch (topic) {
    case "new":
      // Lane 1 (the field at large), excluding the digest/action blocks
      return s.filter(
        (x) => (x.lane === "world" || ["breaking", "tools", "policy"].includes(x.key)) &&
          !["tldr", "dothisweek", "money", "entertainment", "learn"].includes(x.key)
      );
    case "money":
      return s.filter((x) => x.key === "money" || x.key === "dothisweek");
    case "entertainment":
      return s.filter((x) => x.key === "entertainment");
    case "learn":
      return s.filter((x) => x.key === "learn");
    default:
      return [];
  }
}
