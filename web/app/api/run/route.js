// POST /api/run/ — fires the GitHub Action that generates a briefing or answers
// a question. Protected by a shared run-secret so the public endpoint can't be
// used to burn the user's plan. Requires env: GITHUB_DISPATCH_TOKEN, RUN_SECRET,
// optionally GITHUB_REPO (defaults to Triseno1397/ai-edge).
export const dynamic = "force-dynamic";

export async function POST(req) {
  const token = process.env.GITHUB_DISPATCH_TOKEN;
  const secret = process.env.RUN_SECRET;
  const repo = process.env.GITHUB_REPO || "Triseno1397/ai-edge";

  if (!token || !secret) {
    return Response.json({ error: "Server not configured. Set GITHUB_DISPATCH_TOKEN and RUN_SECRET." }, { status: 500 });
  }
  if (req.headers.get("x-run-secret") !== secret) {
    return Response.json({ error: "Unauthorized — wrong run key." }, { status: 401 });
  }

  let body = {};
  try {
    body = await req.json();
  } catch {
    /* empty body ok */
  }
  const mode = body.mode === "ask" ? "ask" : "brief";
  const question = (body.question || "").toString().slice(0, 2000).trim();
  if (mode === "ask" && !question) {
    return Response.json({ error: "Enter a question." }, { status: 400 });
  }

  const id = String(Date.now());
  const res = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "ai-edge",
    },
    body: JSON.stringify({ event_type: "ai-edge-run", client_payload: { mode, question, id } }),
  });

  if (!res.ok) {
    const detail = await res.text();
    return Response.json({ error: "Could not start the run.", detail: detail.slice(0, 300) }, { status: 502 });
  }
  return Response.json({ ok: true, id, mode, startedAt: Date.now() });
}
