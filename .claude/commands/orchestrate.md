---
description: Drive ONE TODO item through plan → research → canon → build → ship
---

You are the **Orchestrator** for this repo. Argument: `$ARGUMENTS` (a TODO ID;
defaults to the item in *Now*, i.e. `T-0001-SITE-LAUNCH`).

You coordinate; you don't do the deep work yourself. Announce the plan before each
phase, and update `TODO.md` as you go.

## Phase 0 — Claim
Read `TODO.md`, find the item, move it **Now → In Progress**. Read `CLAUDE.md` and
`core/idea.md` for context.

## Phase 1 — Classify + plan
Classify the work: **Micro** (≤2 files), **Standard** (3–10), **Complex** (10+ or
multi-surface). `T-0001` is **Complex**. Write `docs/plans/T-0001.md` with: scope,
the decomposition below, and a **parallelization map** (what's independent vs.
dependent). Add child items `T-0002…T-0006` to the ledger.

## Phase 2 — Research *(PARALLEL — independent)*
Three workers at once, each writing one file to `docs/research/`: a scan of great
founder sites, an information-architecture + content plan, and an audience-&-goals
read. Either spawn three sub-agents, or print these for the presenter to run live:
```
claude --bg --name site-scan   "Read core/idea.md. Scan 5 great founder/personal sites; what they do well; write docs/research/site-inspiration-scan.md."
claude --bg --name ia-plan      "Read core/idea.md. Propose the site's information architecture + per-section content plan; write docs/research/ia-and-content-plan.md."
claude --bg --name audience     "Read core/idea.md. Who visits a founder's site (recruiters, investors, press, collaborators) and what each wants; write docs/research/audience-and-goals.md."
```

## Phase 3 — Identity canon *(SEQUENTIAL — needs all of Phase 2)*
One worker synthesizes `brand/positioning.md`, `voice-and-tone.md`,
`product-vocabulary.md`, and `proof-points.md` (the **true, sourced** claims about
the owner), and writes a decision record in `DECISIONS/`.

## Phase 4 — Site copy *(SEQUENTIAL — needs Phase 3)*
One worker writes `brand/site-copy.md`. **Every claim about the owner must trace to
a row in `brand/proof-points.md`.**

## Phase 5 — Build *(PARALLEL — four worktrees, the headline)*
Four units, each owning different files, so they run in parallel git worktrees and
merge. Print these for the presenter, or spawn four sub-agents:
- **5a public site + design** → `web/app/page.tsx`, `layout.tsx`, `globals.css`
- **5b booking flow** → `web/app/book/`, `web/app/api/book/`, `web/lib/slots.ts`
- **5c CRM + inbox** → `web/app/admin/`
- **5d auth gate + data layer** → `web/middleware.ts`, `web/lib/db.ts`, `web/app/api/login|logout/`

## Phase 6 — Verify + ship *(SEQUENTIAL)*
Run `/checkImplement claims` — catch any public claim that doesn't trace to
`proof-points.md`. Optional second-model review. Then deploy per `web/README.md`.

## Never do live
Do **not** wire up the deferred items: `T-0007` Google Calendar OAuth or `T-0008`
multi-user auth. They stay in *Next* — that restraint is part of the lesson.
