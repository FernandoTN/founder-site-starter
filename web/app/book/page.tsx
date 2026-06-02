"use client";

import { useState } from "react";
import Link from "next/link";
import { availableSlots } from "@/lib/slots";

export default function Book() {
  const slots = availableSlots();
  const [slot, setSlot] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState<{ slot: string; count: number } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, slot, message }),
    });
    const data = await res.json().catch(() => ({ ok: false, error: "Something went wrong." }));
    if (res.ok && data.ok) {
      setConfirmed({ slot: data.slot, count: data.count });
    } else {
      setError(data.error || "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <div className="wrap">
      <nav className="nav">
        <Link className="brand" href="/">← Fernando Torres</Link>
        <span className="links"><Link href="/">Home</Link></span>
      </nav>

      <section className="block" style={{ borderTop: "none" }}>
        <h2>Book time with me</h2>
        <p className="sub">Pick a slot and tell me a little about what you&apos;d like to talk through.</p>

        {confirmed ? (
          <div className="ok-card">
            <h3>You&apos;re booked for {confirmed.slot} ✓</h3>
            <p className="note">
              That&apos;s booking #{confirmed.count}. It just landed in my inbox — I&apos;ll be in touch to confirm.
            </p>
          </div>
        ) : (
          <form className="form" onSubmit={submit}>
            <div>
              <label>Pick a slot</label>
              <div className="slots">
                {slots.map((s) => (
                  <button
                    type="button"
                    key={s}
                    className={"slot" + (slot === s ? " sel" : "")}
                    onClick={() => setSlot(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="n">Name</label>
              <input id="n" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="e">Email</label>
              <input id="e" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="m">What&apos;s on your mind? (optional)</label>
              <textarea id="m" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            {error && <div className="err">{error}</div>}
            <button className="btn" disabled={status === "sending" || !slot}>
              {status === "sending" ? "Booking…" : "Request this time"}
            </button>
            <p className="note">
              Real calendar sync is on the roadmap — for now this saves your request and notifies me.
            </p>
          </form>
        )}
      </section>
    </div>
  );
}
