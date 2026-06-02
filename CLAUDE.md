# Project Guide — Founder Site

> This file teaches an AI agent how to behave in this repo. It's also a teaching
> artifact: it shows that you *steer* an agent with a written constitution, not
> with cleverness in the moment.

## What this repo is

The single source of truth for **my personal site** — a public professional home
plus a private back office (a CRM and a booking inbox). Every public-facing word
about me traces back to a document here. If the site says something this repo
doesn't, one of them is wrong — reconcile, don't drift.

## The method (follow it)

1. **The ledger is law.** Read [`TODO.md`](TODO.md) first. Work the item in *Now*.
   Move it Now → In Progress → Done. Things you decide *not* to do yet go in
   *Next* with a one-line reason — that honesty is part of the method.
2. **One source of truth, one direction.** Information flows
   `core/ → brand/ → web/`. Upstream wins; downstream never overrides upstream.
3. **Right context at the right step.** Independent jobs run as their own focused
   sessions/sub-agents, each handed *only* the files it needs.
4. **Parallel where independent, sequential where dependent.** The three research
   briefs run at once. The identity canon waits for all three. The four build
   units (public site, booking, CRM, auth+data) each own different files, so they
   run **in parallel git worktrees** and merge.
5. **Every public claim about me traces to a row in `brand/proof-points.md`.** A
   personal site is a trust document — no inflated titles, no invented metrics, no
   "advised X" you can't stand behind. A verification pass enforces this before ship.
6. **Record the "why" as a decision record** in `DECISIONS/` (template provided)
   when you lock the positioning, the structure, or the tech choices.

## What we build (and what we defer)

- **Public:** `/` (home / about / work) and `/book` (pick a slot → saved to the DB).
- **Owner-only:** `/admin`, behind a **single passcode** — the CRM (`contacts`) and
  the booking inbox (`bookings`). One owner, one secret; no multi-user OAuth.
- **Deferred (in `TODO.md` *Next*, shown not built live):** real Google Calendar
  sync (`T-0007`), multi-user accounts via Clerk (`T-0008`), booking emails (`T-0009`).
  Connecting a live calendar on stage is a known landmine — that's why it's *Next*.

## Data + secrets

- Two tables in Neon Postgres: `contacts` and `bookings`. A booking also upserts a
  contact (the person who wants to meet you).
- Secrets are env vars pulled from Vercel (`DATABASE_URL`, `ADMIN_PASSCODE`,
  `ADMIN_SESSION_SECRET`) — never hand-edited into a committed file.
- Seed the CRM with **fictional** contacts for any demo. Don't collect real
  attendee PII on stage.

## This works for anything, not just code

Steps 1–3 (research, identity, copy) are pure knowledge work — zero code. The same
ledger-and-focused-sessions method runs a memo, a deck, a campaign, or a report.
Code only enters when you build `web/`.

## Commit conventions

- [Conventional Commits](https://www.conventionalcommits.org/): `feat|fix|docs|chore|refactor` with a scope, e.g. `feat(web): add /book slot picker [T-0005]`.
- Reference the TODO ID. **Never** credit an AI tool as author or co-author.
- Small commits. Keep the diff readable.

## When driving the launch

Run `/orchestrate T-0001-SITE-LAUNCH`, or say: *"Read TODO.md and drive T-0001 to
Done — research in parallel, then the identity canon, then build the four surfaces
in worktrees, then ship."* Announce the plan before doing the work; update the
ledger as you go.
