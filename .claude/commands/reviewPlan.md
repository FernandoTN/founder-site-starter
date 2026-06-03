Review and verify the current plan in docs/plans/ against the "Now" or "In Progress" TODO item. This skill is a **single-agent reviewer** — it does NOT spawn subagents. When used inside the parallel orchestrator pipeline, the orchestrator spawns multiple reviewers (one per dimension) in parallel.

## Inputs (required)

- The current plan file (from `docs/plans/CURRENT_PLAN.md` pointer or newest plan in `docs/plans/`)
- `TODO.md` (to compare scope)
- Relevant architecture/schema/code files for feasibility validation

## Arguments

`$ARGUMENTS`:
- If a **review dimension** is specified, review ONLY that dimension:
  - `correctness` — plan aligns with architecture/schema and current codebase state
  - `completeness` — each acceptance criterion has an implementation task, the plan states how the change will be verified, and docs/migrations/review-gates are covered
  - `scoping` — no bloat, leverages existing infra, no reimplementation of existing functionality
- If a **TODO ID** is specified, review the plan for that item
- If empty, review ALL dimensions of the current plan

## Process

### Single-Dimension Mode (orchestrator invocation)

When reviewing a specific dimension:
1. Read the plan file and `TODO.md`
2. Read relevant codebase files to validate that specific dimension
3. Perform the focused review:

   **correctness**: Verify the plan's approach matches the current architecture, schema, and codebase state. Check that proposed file changes are compatible with existing code patterns. Verify imports, interfaces, and data flows are correct.

   **completeness**: Verify each acceptance criterion has a corresponding implementation task. Verify the plan states how the change will be verified — either commands to run or manual steps to check. Verify documentation updates and review gates are covered.

   **scoping**: Check for unnecessary new functionality that already exists in the codebase. Verify the plan doesn't introduce bloat or speculative refactors. Confirm it leverages existing infrastructure where possible.

4. Write detailed findings to `docs/plans/.workspace/T-{TODO_ID}/phase2/review-{dimension}.md`
5. Send brief summary to orchestrator with: dimension reviewed, verdict (pass/issues), key findings

### All-Dimensions Mode (standalone invocation)

When reviewing all dimensions:
1. Read the plan file and `TODO.md`
2. Read relevant codebase files
3. Validate all 3 dimensions (correctness, completeness, scoping)
4. If the plan is sufficient:
   - Add a `## Plan Review: Approved` section with a checklist confirming scope, verification approach, docs, review gates, and parallelization map validity
5. If changes are needed:
   - Apply changes directly to the plan
   - Add a `## Plan Review: Changes Applied` section describing what was changed and why

## Constraints

- All edits must remain strictly within the scope of the "Now" or "In Progress" TODO — only add items if they fill identified gaps.
- Prefer minimal, high-impact improvements; avoid speculative refactors.
- Do NOT spawn subagents — do all review work yourself.
- **Escalation threshold:** escalate only if fixing the flaw would require rewriting the plan's core approach — wrong storage backend, wrong service boundary, wrong data model, or wrong architectural layer. For anything scoped to one or two sections of the plan, edit the plan directly and add a "Plan Review: Changes Applied" section listing what was changed and why. This is the reviewer's job; do not kick localized fixes back to the user.

---

## Phase Complete — reviewPlan

Control returns to `/orchestrate`. DO NOT STOP — the calling orchestrator still has implement, verify, and finalize phases ahead. Do not touch the orchestrator's TaskList or `pipeline-state.md` workspace file; the caller owns those. This skill's job ends once the plan is approved (or changes applied) and you return to the orchestrator.
