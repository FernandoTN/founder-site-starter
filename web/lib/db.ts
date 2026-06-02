import { neon } from "@neondatabase/serverless";

/**
 * Lazy, build-safe database handle.
 *
 * Returns null when DATABASE_URL isn't set, so `next build` (which runs with no
 * env) never crashes. In production the URL is injected by the Neon integration
 * and pulled locally with `vercel env pull`.
 */
export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

export type Sql = NonNullable<ReturnType<typeof getDb>>;

/**
 * Create the two tables on first use, so the demo needs no migration step.
 * `contacts` = the CRM / Rolodex. `bookings` = requests from the public /book page.
 */
export async function ensureSchema(sql: Sql) {
  await sql`CREATE TABLE IF NOT EXISTS contacts (
    id serial PRIMARY KEY,
    name text,
    email text UNIQUE NOT NULL,
    company text,
    note text,
    source text,
    created_at timestamptz DEFAULT now()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS bookings (
    id serial PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    slot text NOT NULL,
    message text,
    created_at timestamptz DEFAULT now()
  )`;
}
