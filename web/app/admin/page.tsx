import Link from "next/link";
import { getDb, ensureSchema } from "@/lib/db";
import LogoutButton from "./logout-button";

// Always render fresh so a new booking shows on refresh (never statically cached).
export const dynamic = "force-dynamic";

type Contact = {
  name: string | null;
  email: string;
  company: string | null;
  note: string | null;
  source: string | null;
  created_at: string;
};
type Booking = {
  name: string;
  email: string;
  slot: string;
  message: string | null;
  created_at: string;
};

function fmt(ts: string) {
  return ts ? String(ts).slice(0, 16).replace("T", " ") : "";
}

export default async function Admin() {
  const sql = getDb();
  let contacts: Contact[] = [];
  let bookings: Booking[] = [];
  let dbReady = false;

  if (sql) {
    await ensureSchema(sql);
    bookings = (await sql`SELECT name, email, slot, message, created_at
                          FROM bookings ORDER BY created_at DESC`) as Booking[];
    contacts = (await sql`SELECT name, email, company, note, source, created_at
                          FROM contacts ORDER BY created_at DESC`) as Contact[];
    dbReady = true;
  }

  return (
    <div className="wrap">
      <nav className="nav">
        <Link className="brand" href="/">Fernando Torres</Link>
        <span className="links">
          <span className="badge">Private</span>
          <LogoutButton />
        </span>
      </nav>

      <section className="block" style={{ borderTop: "none" }}>
        <div className="admin-head">
          <h2>Booking inbox</h2>
          <span className="note">{bookings.length} total</span>
        </div>
        {!dbReady ? (
          <div className="empty">
            Database not connected yet. Add Neon and run <code>vercel env pull</code>, then refresh.
          </div>
        ) : bookings.length === 0 ? (
          <div className="empty">
            No bookings yet. Share your <Link href="/book">/book</Link> link.
          </div>
        ) : (
          <table>
            <thead>
              <tr><th>When booked</th><th>Name</th><th>Email</th><th>Slot</th><th>Message</th></tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={i}>
                  <td>{fmt(b.created_at)}</td>
                  <td>{b.name}</td>
                  <td>{b.email}</td>
                  <td>{b.slot}</td>
                  <td>{b.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="block">
        <div className="admin-head">
          <h2>CRM · Rolodex</h2>
          <span className="note">{contacts.length} contacts</span>
        </div>
        {dbReady && contacts.length > 0 ? (
          <table>
            <thead>
              <tr><th>Added</th><th>Name</th><th>Email</th><th>Company</th><th>Note</th><th>Source</th></tr>
            </thead>
            <tbody>
              {contacts.map((c, i) => (
                <tr key={i}>
                  <td>{fmt(c.created_at)}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.company}</td>
                  <td>{c.note}</td>
                  <td>{c.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : dbReady ? (
          <div className="empty">No contacts yet. A booking adds one automatically.</div>
        ) : null}
      </section>
    </div>
  );
}
