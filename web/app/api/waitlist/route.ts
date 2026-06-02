import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const sql = getDb();
  if (!sql) {
    // No DB yet — build stays green; the page shows a friendly message.
    return NextResponse.json(
      { ok: false, error: "Database not connected yet. Run `vercel integration add neon`." },
      { status: 503 },
    );
  }

  let email = "";
  try {
    const body = await req.json();
    email = String(body?.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }

  // Self-provisioning: create the table on first write so the demo needs no
  // separate migration step. Idempotent.
  await sql`CREATE TABLE IF NOT EXISTS waitlist (
    id serial PRIMARY KEY,
    email text UNIQUE NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
  )`;
  await sql`INSERT INTO waitlist (email) VALUES (${email}) ON CONFLICT (email) DO NOTHING`;
  const rows = await sql`SELECT count(*)::int AS count FROM waitlist`;

  return NextResponse.json({ ok: true, count: rows[0]?.count ?? null });
}
