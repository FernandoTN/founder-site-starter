import { NextResponse } from "next/server";
import { getDb, ensureSchema } from "@/lib/db";

/**
 * Public booking endpoint. Persists the booking AND upserts the person into the
 * CRM (contacts) — so a booking from a stranger immediately shows up in /admin.
 */
export async function POST(req: Request) {
  const sql = getDb();
  if (!sql) {
    return NextResponse.json(
      { ok: false, error: "Database not connected yet. Add Neon, then `vercel env pull`." },
      { status: 503 },
    );
  }

  const body = (await req.json().catch(() => null)) as
    | { name?: string; email?: string; slot?: string; message?: string }
    | null;

  const name = (body?.name ?? "").trim();
  const email = (body?.email ?? "").trim();
  const slot = (body?.slot ?? "").trim();
  const message = (body?.message ?? "").trim();

  if (!name || !/.+@.+\..+/.test(email) || !slot) {
    return NextResponse.json(
      { ok: false, error: "Name, a valid email, and a slot are required." },
      { status: 400 },
    );
  }

  await ensureSchema(sql);
  await sql`INSERT INTO bookings (name, email, slot, message)
            VALUES (${name}, ${email}, ${slot}, ${message})`;
  await sql`INSERT INTO contacts (name, email, company, note, source)
            VALUES (${name}, ${email}, ${""}, ${"Requested: " + slot}, ${"booking"})
            ON CONFLICT (email) DO UPDATE SET note = ${"Requested: " + slot}`;

  const rows = (await sql`SELECT count(*)::int AS count FROM bookings`) as { count: number }[];
  return NextResponse.json({ ok: true, slot, count: rows[0].count });
}
