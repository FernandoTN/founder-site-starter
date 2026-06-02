"use client";

import { useState, type FormEvent } from "react";

type State = "idle" | "loading" | "done" | "error";

export default function Home() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");
  const [count, setCount] = useState<number | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setState("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setState("done");
        setCount(typeof data.count === "number" ? data.count : null);
      } else {
        setState("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
      }
    } catch {
      setState("error");
      setMessage("Network error. Try again.");
    }
  }

  return (
    <main className="wrap">
      <div className="card">
        <div className="leaf" aria-hidden="true">🌿</div>
        <h1>Keep your plants alive without thinking about it.</h1>
        <p className="sub">
          Sprout is the plant-care sidekick that texts you the day before each
          plant needs care. One tap, done.
        </p>

        {state === "done" ? (
          <div className="success">
            <strong>You&rsquo;re on the list 🌿</strong>
            <span>
              We&rsquo;ll text you when Sprout is ready
              {count !== null ? <> — you&rsquo;re <b>#{count}</b>.</> : "."}
            </span>
          </div>
        ) : (
          <form onSubmit={submit} className="form">
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <button type="submit" disabled={state === "loading"}>
              {state === "loading" ? "Joining…" : "Join the waitlist"}
            </button>
          </form>
        )}

        {state === "error" && <p className="error">{message}</p>}

        <ul className="how">
          <li><b>1.</b> Tell Sprout your plants.</li>
          <li><b>2.</b> Get a heads-up by text the day before a care day.</li>
          <li><b>3.</b> One tap to mark it done. No app to open.</li>
        </ul>

        <p className="foot">Free to join. We&rsquo;ll text you the moment it&rsquo;s ready.</p>
      </div>
    </main>
  );
}
