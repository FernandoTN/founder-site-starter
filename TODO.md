# TODO — Founder Site

> The **ledger**. Every piece of work lives here and moves through the sections
> below until it reaches **Done**. The ledger is the spine of the method: you
> never lose track of what's in flight, and the repo is always an honest picture
> of the work — including the things you've *chosen not to do yet*.
>
> Sections: **Now** (claimed, active) · **In Progress** (executing) ·
> **Next** (queued, dependencies noted) · **Done** (shipped).

---

## Now

- **T-0001-SITE-LAUNCH** — Take my personal site from a one-line idea to a live,
  deployed site with a private back office. *(Complex — research, identity, copy,
  a multi-surface build, and ship.)*
  - **Input:** [`core/idea.md`](core/idea.md)
  - **Definition of done:** a public site (home / about / work) + a **booking
    page**; a passcode-locked **`/admin`** with a **CRM** and a **booking inbox**;
    deployed to a public URL; a real booking persisted to a cloud database and
    visible in the admin — with every public claim about me traceable to
    `brand/proof-points.md`.

## In Progress

_(empty — the demo moves T-0001 here when work starts)_

## Next

> These are **deliberately deferred**. Showing them in the ledger is the point:
> a good operator decides what *not* to build live, and writes it down.

- **T-0007-GCAL-SYNC** — Connect a real Google Calendar so the booking page shows
  true free/busy and writes events back. *Depends on: T-0001.*
  *Why it's here and not done live:* needs a Google Cloud project, an OAuth
  consent screen (in "testing" until verified — only allow-listed accounts can
  connect), sensitive calendar scopes, and redirect URIs that change with every
  deploy URL. **Not safe to wire up on stage.** The booking flow we ship uses
  configured slots; this item upgrades it to live calendar truth.
- **T-0008-MULTI-USER** — Real sign-up / sign-in for many users (Clerk via the
  Vercel Marketplace), replacing the single-owner passcode. *Depends on: T-0001.*
- **T-0009-BOOKING-EMAIL** — Email confirmation to the visitor + a notification to
  me when a booking lands. *Depends on: T-0001.*

## Done

_(empty — every phase lands here by the end of the hour)_

---

## What `/orchestrate` does to this ledger (live)

Running `/orchestrate T-0001-SITE-LAUNCH` classifies the task as **Complex** and
decomposes it. Each phase appears here, then moves to **Done**:

1. **`T-0002` Research** *(parallel)* — 3 agents at once: a scan of great founder
   sites, an information-architecture + content plan, and an audience-&-goals
   read (who visits, what they want) → `docs/research/`.
2. **`T-0003` Identity canon** *(sequential — needs all of T-0002)* — positioning,
   voice, section vocabulary, and **proof-points** (the true, sourced claims about
   me) → `brand/` + a decision record in `DECISIONS/`.
3. **`T-0004` Site copy** *(sequential — needs T-0003)* → `brand/site-copy.md`.
4. **`T-0005` Build** *(parallel — 4 worktrees, the headline beat)* →
   - `5a` public site + design system
   - `5b` booking flow (`/book` → database)
   - `5c` CRM + booking inbox (`/admin`)
   - `5d` passcode auth gate + data layer (two tables: `contacts`, `bookings`)
5. **`T-0006` Verify + ship** *(sequential)* — review (incl. the proof-points
   claims check), a second-model pass, deploy to Vercel + connect Neon.

> **Parallel vs. sequential is the lesson.** T-0002 fans out (independent breadth).
> T-0003 waits for all of it. T-0005's four sub-units each own different files, so
> they run **in parallel in separate worktrees** and merge — the cleanest possible
> demonstration of "watch four agents build four features at once."
