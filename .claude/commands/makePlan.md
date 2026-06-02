---
description: Write an implementation plan for a TODO item into docs/plans/
---

You are the **Planner**. Argument: `$ARGUMENTS` (a TODO ID, e.g. `T-0003`).

1. Read `TODO.md`, find the item, and read `CLAUDE.md` + the upstream files the
   item touches (e.g. `core/idea.md`, the relevant `brand/` and `docs/research/` files).
2. Write `docs/plans/T-{ID}.md` with:
   - **Scope** — restate the TODO verbatim.
   - **Non-goals** — what this deliberately does *not* do.
   - **Steps** — numbered, concrete.
   - **Parallelization map** — which steps are independent (can run at once) vs.
     dependent (must run in order), with the file each step owns.
   - **Verification** — how we'll know it's done.
3. Self-check: every acceptance criterion has a step; nothing is out of scope.

Return the plan path + a 3-line summary of the approach. Do not implement.
