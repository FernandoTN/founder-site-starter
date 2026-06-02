# Sprout — web

The landing page + waitlist. **Next.js (App Router) + Neon Postgres.** Designed to
deploy on Vercel with zero config and to **never crash the build** if the database
isn't wired yet.

## Run it locally

```bash
cd web
npm install
npm run dev          # http://localhost:3000
```

Without a `DATABASE_URL`, the page renders fine and the form returns a friendly
"database not connected yet" message — by design.

## Connect a database + deploy (the finale)

Run these **in order** (DB before the first prod build, so a missing env var
can't crash it):

```bash
vercel login                 # (pre-bake this before class)
vercel whoami                # confirm the right team
vercel link                  # link ./web to a Vercel project
vercel integration add neon  # provision Neon Postgres + auto-set DATABASE_URL
vercel env pull              # pull DATABASE_URL into .env.local
vercel build                 # catch any TS/ESLint errors locally first
vercel deploy --prod         # prints the live https URL
```

Submit a signup on the live page, then prove it persisted:

```sql
SELECT count(*) FROM waitlist;   -- in the Neon SQL console
```

## How it works

- `lib/db.ts` — **lazy** Neon client. Returns `null` if `DATABASE_URL` is unset,
  so importing it never throws at build time.
- `app/api/waitlist/route.ts` — POST handler. Validates the email, **creates the
  `waitlist` table on first write** (no migration step), inserts, and returns the
  running count so the page can say "you're #N".
- `app/page.tsx` — the form; shows the count on success.

## Notes

- `next-env.d.ts` is generated automatically on first `dev`/`build`.
- The only secret is `DATABASE_URL`; the Neon integration sets it on Vercel for you.
