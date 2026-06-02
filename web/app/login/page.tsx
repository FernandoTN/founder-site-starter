"use client";

import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      window.location.href = "/admin";
    } else {
      const d = await res.json().catch(() => ({ error: "Wrong passcode." }));
      setError(d.error || "Wrong passcode.");
      setBusy(false);
    }
  }

  return (
    <div className="center-narrow">
      <h2>Owner sign-in</h2>
      <p className="note">This unlocks your private CRM and booking inbox.</p>
      <form className="form" onSubmit={submit}>
        <div>
          <label htmlFor="p">Passcode</label>
          <input id="p" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
        </div>
        {error && <div className="err">{error}</div>}
        <button className="btn" disabled={busy}>{busy ? "Checking…" : "Unlock"}</button>
        <p className="note"><Link href="/">← back to site</Link></p>
      </form>
    </div>
  );
}
