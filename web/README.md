# web/ — the personal site (Next.js + Neon)

> A public personal site with a private, passcode-locked back office. The finale
> of the workshop: deploy it to a real URL, connect a real database, and watch a
> booking from the public page appear live in your CRM.

## Stack

- **Next.js** (App Router) on **Vercel**
- **Neon Postgres** via `@neondatabase/serverless` — lazy-initialized so a missing
  `DATABASE_URL` can never crash the build
- **Single-owner passcode auth** — a cookie set after one correct passcode;
  `middleware.ts` guards `/admin`. No OAuth, no user table. (Multi-user is `T-0008`.)

## Routes

| Route | Who | What |
|---|---|---|
| `/` | public | home / about / work |
| `/book` | public | pick a slot → saves a booking + adds the person to the CRM |
| `/login` | public | owner passcode entry |
| `/admin` | owner only | booking inbox + CRM (gated by `middleware.ts`) |
| `/api/book` | public | POST a booking |
| `/api/login` · `/api/logout` | — | set / clear the session cookie |

## Data model (created on first use — no migration step)

- **`contacts`** — the CRM / Rolodex (`name, email⟂unique, company, note, source, created_at`)
- **`bookings`** — requests from `/book` (`name, email, slot, message, created_at`)

A booking inserts a row in `bookings` *and* upserts the person into `contacts`.

## Local dev

```bash
cd web
npm install
cp .env.local.example .env.local   # set ADMIN_PASSCODE; DATABASE_URL optional locally
npm run dev                         # http://localhost:3000
```

Without `DATABASE_URL`, the site runs and `/admin` shows a friendly "connect the
database" state — nothing crashes.

## Ship it (the finale)

Run **in this order** — provision the DB *before* the first prod build so env vars exist:

```bash
cd web
vercel login                 # pre-baked before class
vercel link                  # link this folder to a Vercel project
vercel integration add neon  # provision Neon + auto-inject DATABASE_URL
vercel env add ADMIN_PASSCODE          # your private passcode
vercel env add ADMIN_SESSION_SECRET    # any long random string
vercel env pull                        # pull them into .env.local
vercel build                 # catch errors locally first
vercel deploy --prod         # prints the live https URL
```

Then submit a booking on the live `/book`, open `/login` → `/admin`, and watch it appear.

## What's deliberately NOT here (see ../TODO.md)

- **`T-0007` real Google Calendar sync.** The booking page uses configured slots
  (`lib/slots.ts`). Live calendar OAuth (consent-screen verification, redirect
  URIs, sensitive scopes) is **not** something to wire up on stage — it's the next
  ledger item, shown as the honest backlog.
- **`T-0008` multi-user accounts** (Clerk) and **`T-0009` booking emails.**

> The Vercel plugin's `/vercel:*` skills (`vercel:marketplace`, `vercel:env`,
> `vercel:deploy`) can drive all of the above from inside Claude — *"watch Claude
> ship it."* The raw CLI is the legible version for the stage.
