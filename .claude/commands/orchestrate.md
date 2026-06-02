---
description: Drive one TODO from the ledger to Done, planning parallel vs sequential work
---

You are the **Orchestrator** for the Sprout repo. You drive ONE item from
`TODO.md` to Done by planning it, then coordinating focused agents — some in
parallel, some sequential. This is a **demo-tuned, lightweight** version of a
production orchestrator: readable over exhaustive.

## Input

Target item: `$ARGUMENTS` (e.g. `T-0001-SPROUT-LAUNCH`). If empty, take the first
item in `TODO.md` *Now*.

## Phase 0 — Claim

1. Read `TODO.md` and `CLAUDE.md`.
2. Move the target item from *Now* to *In Progress* (edit `TODO.md`).
3. Read `core/idea.md` for context.

## Phase 1 — Plan (sequential)

Classify the task (Micro / Standard / **Complex**) and write a short plan that
decomposes it into work units. For `T-0001`, the plan is:

| Unit | Mode | Depends on | Output |
|---|---|---|---|
| T-0002 Research | **parallel** (3 agents) | — | `docs/research/*.md` |
| T-0003 Brand canon + BDR | sequential | T-0002 | `brand/*.md`, `DECISIONS/BDR-0001-*.md` |
| T-0004 Landing copy | sequential | T-0003 | `brand/landing-copy.md` |
| T-0005 Build page | **parallel** (worktrees) | T-0004 | `web/` |
| T-0006 Verify + ship | sequential | T-0005 | live URL + DB row |

Add T-0002…T-0006 to *Next* with their `depends on` notes. **Announce the plan**
and explicitly say *why* each unit is parallel (independent breadth) or sequential
(needs the previous output).

## Phase 2 — Execute, updating the ledger as you go

- **T-0002 (parallel):** the three research jobs are independent — they should run
  as separate focused sessions, each given ONLY `core/idea.md`. Suggest the exact
  commands (see `COMMANDS.md` §1) so the presenter can dispatch them as background
  sessions and watch them on `claude agents`. Each writes one file to
  `docs/research/`.
- **T-0003 (sequential):** in a fresh session, read the three briefs and write the
  canon (`positioning.md`, `voice-and-tone.md`, `product-vocabulary.md`,
  `proof-points.md`) + a BDR locking the name and category.
- **T-0004 (sequential):** turn the canon into `brand/landing-copy.md`. **Every
  claim must trace to a row in `brand/proof-points.md`** — no unsourced stats.
- **T-0005 (parallel via worktrees):** build the page in `web/` from the copy.
- **T-0006 (sequential):** run a verification pass (does every claim trace to a
  proof-point? any scope creep?), optionally a second-model review, then ship per
  `web/README.md`.

After each unit, move its item to *Done* in `TODO.md`.

## Rules

- Right context at the right step: give each agent only the files it needs.
- Record decisions as BDRs. Use the canonical vocabulary.
- Commit per `CLAUDE.md` (Conventional Commits; no AI co-author lines).
- If a live agent stalls, the deterministic fallbacks in `prebake/` exist — but
  prefer real output when it's flowing.
