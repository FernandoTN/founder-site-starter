# Project Guide (CLAUDE.md)

> How an AI agent should behave in this repo. These instructions steer the
> `/orchestrate` skill chain and every sub-skill it nests
> (`makePlan` → `reviewPlan` → `implement` → `checkImplement`), plus `/deepResearch`.

## The method (follow it)

1. **The ledger is law.** Read [`TODO.md`](TODO.md) first. Work the item in **Now**,
   or claim a ready item from **Next**. The orchestrator moves it
   **Now/Next → In Progress → Done**. Work you defer waits in **Next** with a reason.
2. **One source of truth, one direction.** Information flows from inputs (`core/`)
   through derived docs to the build. Upstream wins; downstream never overrides it.
3. **Right context at the right step.** Each phase runs as its own focused
   session / sub-agent, handed only the files it needs.
4. **Parallel where independent, sequential where dependent.** Independent work
   fans out (parallel sub-agents / git worktrees); dependent work runs in order.
5. **Verify before you ship.** `checkImplement` gates every change against its plan.

## Where things live (the docs map)

| Path | Role |
|---|---|
| [`TODO.md`](TODO.md) | The **ledger** — every work item as a `### T-ID` block under Now / In Progress / Next / Backlog / Parked / Done / Archived Phases. |
| `core/` | The seed input(s) — the one-line idea everything derives from ([`core/idea.md`](core/idea.md)). |
| `docs/plans/` | Implementation plans (`T-{ID}.md`); `CURRENT_PLAN.md` points at the active one; `archivedPlans/` holds shipped plans. |
| `docs/research/` | Research briefs (no code); `archived-research/` holds aged-out briefs. |
| `docs/reference/` | Canonical reference docs; `schemas/` holds the type definitions the planner reads. |
| `docs/FutureEnhancements.md` | Non-blocking improvements deferred out of a TODO. |
| `docs/DOC_CHANGELOG.md` | Code→doc drift log; the `## Pending` queue is drained by doc-sync TODOs. |
| `DECISIONS/` | Decision records — the "why" behind locked choices (template inside). |

## Commit conventions

- [Conventional Commits](https://www.conventionalcommits.org/) with a scope and the
  TODO ID: `feat(scope): summary [T-0001-EXAMPLE]`.
- **Never** credit an AI tool as author or co-author. Keep commits small and readable.

## Driving the work

Run `/orchestrate T-0001-EXAMPLE` (or bare `/orchestrate` to claim the first ready
item). It classifies the task (Micro / Standard / Complex), plans it, implements,
verifies, and ships — updating this ledger as it goes. Announce the plan before
doing the work.
