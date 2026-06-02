import { neon } from "@neondatabase/serverless";

/**
 * Lazy database accessor.
 *
 * Why a function instead of a top-level `const sql = neon(...)`?
 * Because a top-level client throws the instant `DATABASE_URL` is missing — which
 * happens during the FIRST Vercel build, before the Neon integration is wired.
 * Returning `null` here keeps the build green and lets the API route respond with
 * a friendly 503 until the database is connected. (This mirrors the real Memori
 * website's build-crash-safe pattern.)
 */
export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}
