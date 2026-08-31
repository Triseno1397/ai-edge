"use client";

import { useEffect, useRef, useState } from "react";

const KEY = "aiedge_run_key";

export default function Console() {
  const [open, setOpen] = useState(false);
  const [secret, setSecret] = useState("");
  const [mode, setMode] = useState("menu"); // menu | ask
  const [question, setQuestion] = useState("");
  const [phase, setPhase] = useState("idle"); // idle | starting | working | done | failed | error
  const [msg, setMsg] = useState("");
  const [runUrl, setRunUrl] = useState("");
  const [lastMode, setLastMode] = useState("brief");
  const poll = useRef(null);

  useEffect(() => {
    try {
      setSecret(localStorage.getItem(KEY) || "");
    } catch {}
    return () => clearInterval(poll.current);
  }, []);

  function saveSecret(v) {
    setSecret(v);
    try {
      localStorage.setItem(KEY, v);
    } catch {}
  }

  async function getStatus() {
    const r = await fetch("/api/status/", { cache: "no-store" });
    if (!r.ok) return null;
    return r.json();
  }

  async function start(runMode) {
    if (!secret.trim()) {
      setPhase("error");
      setMsg("Enter your run key first.");
      return;
    }
    if (runMode === "ask" && !question.trim()) return;
    setLastMode(runMode);
    setPhase("starting");
    setMsg(runMode === "ask" ? "Sending your question…" : "Starting the briefing…");
    setRunUrl("");

    // baseline: the most recent run BEFORE we fire, so we can detect ours
    let baseline = null;
    try {
      baseline = (await getStatus())?.startedAt || null;
    } catch {}

    let res;
    try {
      res = await fetch("/api/run/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-run-secret": secret.trim() },
        body: JSON.stringify({ mode: runMode, question: question.trim() }),
      });
    } catch {
      setPhase("error");
      setMsg("Network error — couldn't reach the desk.");
      return;
    }
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      setPhase("error");
      setMsg(e.error || "Couldn't start the run.");
      return;
    }

    setPhase("working");
    setMsg(runMode === "ask" ? "Researching your question…" : "Pulling today's briefing…");

    const startedAtClient = Date.now();
    clearInterval(poll.current);
    poll.current = setInterval(async () => {
      // give up gracefully after ~6 minutes
      if (Date.now() - startedAtClient > 6 * 60 * 1000) {
        clearInterval(poll.current);
        setPhase("done");
        setMsg("Still working — it'll appear shortly. You can close this and refresh in a minute.");
        return;
      }
      let s;
      try {
        s = await getStatus();
      } catch {
        return;
      }
      if (!s || !s.startedAt) return;
      const isOurs = s.startedAt !== baseline; // a new run appeared
      if (!isOurs) return; // still queued behind a previous run
      setRunUrl(s.url || "");
      if (s.state === "completed") {
        clearInterval(poll.current);
        if (s.conclusion === "success") {
          setPhase("done");
          setMsg("Published. The new content goes live after a short deploy (~1 min).");
          setTimeout(() => location.reload(), 60000);
        } else {
          setPhase("failed");
          setMsg("The run didn't finish cleanly.");
        }
      } else {
        setMsg(lastMode === "ask" ? "Researching your question…" : "Writing today's briefing…");
      }
    }, 6000);
  }

  function reset() {
    clearInterval(poll.current);
    setPhase("idle");
    setMode("menu");
    setQuestion("");
    setMsg("");
  }

  const busy = phase === "starting" || phase === "working";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Run the desk"
        className="fixed right-4 bottom-[max(env(safe-area-inset-bottom),1rem)] z-50 flex items-center gap-2 rounded-full border border-signal/40 bg-signal/15 px-4 py-2.5 text-signal backdrop-blur-xl transition-colors hover:bg-signal/25 sm:bottom-7"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12z" />
        </svg>
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em]">Run</span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-3 backdrop-blur-sm sm:items-center"
          onClick={() => (busy ? null : setOpen(false))}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-line bg-ink-800/95 p-5 shadow-[0_-10px_60px_-12px_rgba(0,0,0,0.9)] animate-rise"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-signal">Desk Console</span>
              <button onClick={() => setOpen(false)} className="text-faint hover:text-fg" aria-label="Close">✕</button>
            </div>

            {/* run key */}
            <label className="mb-4 block">
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Run key</span>
              <input
                type="password"
                value={secret}
                onChange={(e) => saveSecret(e.target.value)}
                placeholder="your run password"
                className="w-full rounded-lg border border-line bg-ink-900/70 px-3 py-2 text-sm text-fg placeholder:text-faint focus:border-signal/40 focus:outline-none"
              />
            </label>

            {phase === "idle" || phase === "error" ? (
              <div className="space-y-2.5">
                {phase === "error" ? <p className="text-[13px] text-tally">{msg}</p> : null}
                <button
                  onClick={() => start("brief")}
                  className="flex w-full items-center justify-between rounded-xl border border-line bg-ink-700/60 px-4 py-3.5 text-left transition-colors hover:border-signal/40"
                >
                  <span>
                    <span className="block text-[15px] font-medium text-fg">Run today's briefing</span>
                    <span className="block text-[12px] text-muted">Fresh two-lane brief, live search</span>
                  </span>
                  <span className="text-signal" aria-hidden>▶</span>
                </button>

                {mode === "ask" ? (
                  <div className="rounded-xl border border-line bg-ink-700/60 p-3">
                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      rows={3}
                      placeholder="Ask anything — e.g. how are agencies making money with AI this week?"
                      className="w-full resize-none rounded-lg border border-line bg-ink-900/70 px-3 py-2 text-sm text-fg placeholder:text-faint focus:border-signal/40 focus:outline-none"
                    />
                    <button
                      onClick={() => start("ask")}
                      disabled={!question.trim()}
                      className="mt-2 w-full rounded-lg bg-signal/90 px-4 py-2.5 text-[13px] font-semibold text-ink-900 transition-opacity disabled:opacity-40"
                    >
                      Ask the desk
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setMode("ask")}
                    className="flex w-full items-center justify-between rounded-xl border border-line bg-ink-700/60 px-4 py-3.5 text-left transition-colors hover:border-signal/40"
                  >
                    <span>
                      <span className="block text-[15px] font-medium text-fg">Ask the desk a question</span>
                      <span className="block text-[12px] text-muted">Any topic — researched live, answered</span>
                    </span>
                    <span className="text-signal" aria-hidden>＋</span>
                  </button>
                )}

                <a href="/ask" className="mt-1 block text-center font-mono text-[10px] uppercase tracking-[0.16em] text-faint hover:text-muted">
                  View past answers →
                </a>
              </div>
            ) : null}

            {busy ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-line border-t-signal" />
                <p className="text-[14px] text-fg">{msg}</p>
                <p className="text-[12px] text-muted">This takes ~1–2 minutes. You can close this — it keeps running.</p>
              </div>
            ) : null}

            {phase === "done" ? (
              <div className="flex flex-col items-center gap-3 py-5 text-center">
                <span className="text-2xl text-now">✓</span>
                <p className="text-[14px] text-fg">{msg}</p>
                <div className="flex gap-2">
                  <button onClick={() => location.reload()} className="rounded-lg bg-signal/90 px-4 py-2 text-[13px] font-semibold text-ink-900">Reload now</button>
                  {lastMode === "ask" ? <a href="/ask" className="rounded-lg border border-line px-4 py-2 text-[13px] text-fg">Go to Answers</a> : null}
                </div>
                <button onClick={reset} className="text-[11px] text-faint hover:text-muted">Run something else</button>
              </div>
            ) : null}

            {phase === "failed" ? (
              <div className="flex flex-col items-center gap-3 py-5 text-center">
                <span className="text-xl text-tally">!</span>
                <p className="text-[14px] text-fg">{msg}</p>
                {runUrl ? <a href={runUrl} target="_blank" rel="noreferrer" className="text-[12px] text-signal underline">View the run log</a> : null}
                <button onClick={reset} className="text-[11px] text-faint hover:text-muted">Try again</button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
