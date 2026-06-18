// GET /api/status/ — reports the state of the most recent AI Edge Run workflow
// so the Console can show progress. Read-only; uses the same GITHUB_DISPATCH_TOKEN.
export const dynamic = "force-dynamic";

export async function GET() {
  const token = process.env.GITHUB_DISPATCH_TOKEN?.trim();
  const repo = (process.env.GITHUB_REPO || "Triseno1397/ai-edge").trim();
  if (!token) {
    return Response.json({ error: "Server not configured." }, { status: 500 });
  }

  const res = await fetch(
    `https://api.github.com/repos/${repo}/actions/workflows/run.yml/runs?per_page=1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "ai-edge",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) {
    return Response.json({ error: "Could not read run status." }, { status: 502 });
  }
  const data = await res.json();
  const run = data.workflow_runs && data.workflow_runs[0];
  if (!run) return Response.json({ state: "idle" });

  return Response.json({
    state: run.status, // queued | in_progress | completed
    conclusion: run.conclusion, // success | failure | null
    startedAt: run.run_started_at || run.created_at,
    url: run.html_url,
  });
}
