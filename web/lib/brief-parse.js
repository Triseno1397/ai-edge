// Splits a briefing's markdown body into structured sections so the app can
// present topic-first views (What's New / Money / Entertainment / Creative /
// Learn) instead of one long document. Tolerant of header drift: routes by lane
// first, then by section-heading keywords. Sections also carry their `###`
// sub-sections, which is how the Creative tab gets its own sub-tabs.

function classify(heading) {
  const h = heading.toLowerCase();
  if (h.includes("tl;dr") || h.includes("tldr")) return "tldr";
  if (h.includes("do this week")) return "dothisweek";
  if (h.includes("money") || h.includes("opportunit")) return "money";
  if (h.includes("entertainment")) return "entertainment";
  // before the tool check — a heading like "Creative Tools" belongs here
  if (h.includes("creative")) return "creative";
  if (h.includes("learn")) return "learn";
  if (h.includes("breaking") || h.includes("biggest")) return "breaking";
  if (h.includes("tool") || h.includes("capabilit")) return "tools";
  if (h.includes("power") || h.includes("policy")) return "policy";
  return "other";
}

// Sub-headings inside a section. "prompt" is tested before "viral" because the
// Creative section's prompt sub-header is literally "Viral Prompts".
function classifySub(heading) {
  const h = heading.toLowerCase();
  if (h.includes("prompt")) return "prompts";
  if (h.includes("viral") || h.includes("trending")) return "viral";
  if (h.includes("release") || h.includes("update") || h.includes("news")) return "releases";
  if (h.includes("craft") || h.includes("tip") || h.includes("trick") || h.includes("technique") || h.includes("workflow"))
    return "craft";
  return "other";
}

// Pulls `### ...` blocks out of a section's body. Returns the text before the
// first sub-heading as `intro` (empty when the section starts with one).
function splitSubs(content) {
  const lines = (content || "").split(/\r?\n/);
  const subs = [];
  const introBuf = [];
  let cur = null;

  const flush = () => {
    if (cur) {
      cur.content = cur.buf.join("\n").trim();
      delete cur.buf;
      if (cur.content) subs.push(cur);
      cur = null;
    }
  };

  for (const line of lines) {
    const h3 = line.match(/^###\s+(.+)/);
    if (h3) {
      flush();
      const heading = h3[1].trim();
      cur = { heading, key: classifySub(heading), buf: [] };
      continue;
    }
    if (cur) cur.buf.push(line);
    else introBuf.push(line);
  }
  flush();

  return { intro: introBuf.join("\n").trim(), subs };
}

// returns { tldr, doThisWeek, sections: [{ lane, heading, key, content, intro, subs }] }
export function parseBrief(body) {
  const lines = (body || "").split(/\r?\n/);
  const sections = [];
  let lane = null; // 'world' | 'edge' | null
  let cur = null;

  const flush = () => {
    if (cur) {
      const content = cur.buf.join("\n").trim();
      delete cur.buf;
      const { intro, subs } = splitSubs(content);
      sections.push({ ...cur, content, intro, subs });
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
          !["tldr", "dothisweek", "money", "entertainment", "creative", "learn"].includes(x.key)
      );
    case "money":
      return s.filter((x) => x.key === "money" || x.key === "dothisweek");
    case "entertainment":
      return s.filter((x) => x.key === "entertainment");
    case "creative":
      return s.filter((x) => x.key === "creative");
    case "learn":
      return s.filter((x) => x.key === "learn");
    default:
      return [];
  }
}
