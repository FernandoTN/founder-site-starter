# Project Guide — Sprout

> This file teaches an AI agent how to behave in this repo. It is also a
> teaching artifact: it shows attendees that you *steer* an agent with a written
> constitution, not with cleverness in the moment.

## What this repo is

The single source of truth for **Sprout** — a (fictional) plant-care app. Every
public-facing artifact (landing copy, the page, future ads/emails) must trace
back to a document here. If the website says something this repo doesn't, one of
them is wrong — reconcile, don't drift.

## The method (follow it)

1. **The ledger is law.** Read [`TODO.md`](TODO.md) first. Work the item in
   *Now*. Move it: Now → In Progress → Done. Add follow-ups to *Next* with a
   `depends on` note when they're blocked.
2. **One source of truth, one direction.** Information flows
   `core/ → brand/ → web/`. Upstream wins; downstream never overrides upstream.
3. **Right context at the right step.** When a job is independent, run it as its
   own focused session/sub-agent with *only* the files it needs. Don't pour the
   whole repo into one chat.
4. **Parallel where independent, sequential where dependent.** The three research
   briefs can be written at once. The brand canon must wait for all three. The
   landing copy must wait for the canon.
5. **Every public claim traces to a row in `brand/proof-points.md`.** No invented
   stats. No naming a real third-party product unless a proof-point row backs it.
   This rule is load-bearing — a verification pass enforces it before anything ships.
6. **Record the "why" as a BDR.** When you lock the name, the category, the
   positioning, or pricing, write a Brand Decision Record in `DECISIONS/` from
   [`DECISIONS/BDR-TEMPLATE.md`](DECISIONS/BDR-TEMPLATE.md).

## Folder map

- `core/idea.md` — the seed. The raw input.
- `brand/` — `positioning.md`, `voice-and-tone.md`, `product-vocabulary.md`,
  `proof-points.md`, `landing-copy.md`. The canon. **Filled during the run.**
- `docs/research/` — market / competitor / audience briefs. **Filled during the run.**
- `DECISIONS/` — BDRs.
- `web/` — the Next.js + Neon landing page. See `web/README.md`.
- `prebake/` — deterministic fallback versions of everything above. Reference
  only; not the live truth. (Used if a live agent stalls during the demo.)

## This works for anything, not just code

Steps 1–3 of the launch (research, canon, copy) are **pure knowledge work** —
zero code. The same ledger-and-focused-sessions method runs a market-entry memo,
a board deck, a campaign, or a research report. Code only enters when we build
the page.

## Commit conventions

- [Conventional Commits](https://www.conventionalcommits.org/): `feat|fix|docs|chore|refactor` with a scope, e.g. `feat(brand): lock Sprout positioning`.
- Reference the TODO ID in the commit, e.g. `[T-0003]`.
- **Never** credit an AI tool as author or co-author. No `Co-Authored-By` bot lines.
- Small commits. Keep the diff readable.

## When driving the launch

Run `/orchestrate T-0001-SPROUT-LAUNCH` (see `.claude/commands/orchestrate.md`),
or just say: *"Read TODO.md and drive T-0001 to Done — plan first, run the
research in parallel, then the canon, then build and ship."* Announce the plan
before doing the work, and update the ledger as you go.
