Implement the current plan in docs/plans/. This skill is a **single-agent implementer** — it does NOT spawn subagents. When used inside the orchestrator pipeline, the orchestrator may spawn multiple implementers (one per work unit) in parallel with exclusive file ownership.

## Inputs (required)

- The current plan file (source of truth)
- Repo codebase and tests
- `TODO.md`

## Arguments

`$ARGUMENTS`:
- If a **work unit name** is specified (from the plan's Parallelization Map), implement ONLY that work unit's tasks and ONLY touch its owned files
- If a **TODO ID** is specified, implement that plan
- If empty, implement the entire plan sequentially

## Mode selection

This skill behaves differently depending on how it is invoked. The invoker's explicit instructions always win over these defaults.

- **Work-Unit Mode** (orchestrator invocation with a work-unit name as argument): implement only that work unit's tasks and only touch its owned files. Do NOT commit. Verification and commit happen downstream in the orchestrator pipeline.
- **Full Mode** (standalone invocation with no argument or a bare TODO ID): implement the entire plan sequentially. Run verification per plan. Commit only if verification gates pass.

## Process

### Work-Unit Mode (orchestrator invocation)

When assigned a specific work unit:
1. Read the plan file — locate the assigned work unit in the Parallelization Map.
2. Implement ONLY the tasks listed for that work unit.
3. File ownership:
   - Modify the files listed as owned by that work unit.
   - **Courtesy edits** to files outside your unit are allowed for: (a) ≤3-line import/export adjustments in shared barrel/index files, (b) single type-annotation or enum-member additions in shared types files. Flag any courtesy edits separately in your response so the orchestrator can detect overlap with sibling implementers.
   - For anything larger — a new function, logic change, or non-trivial edit to a file outside your unit — stop and return with an explanation rather than silently editing.
4. Verify your changes parse/compile (no syntax errors). Full verification happens downstream in the orchestrator pipeline.
5. If a workspace directory exists (`docs/plans/.workspace/T-{TODO_ID}/phase3/`), write implementation progress to `impl-{work_unit_name}.md` there. If no workspace exists (Standard tier), skip this step — include the progress summary in your response instead.
6. Include a completion summary in your response: files modified (courtesy edits flagged separately), tests added/updated, issues encountered, deviations from plan.

### Full Mode (standalone invocation)

When implementing the entire plan:
1. Read the plan file — this is your source of truth.
2. Execute the implementation checklist in order.
3. After all implementation tasks, run ALL verification steps from the plan.
4. Keep the plan updated as the canonical log:
   - Mark checklist progress.
   - Record decisions/changes.
   - Add any deviations with rationale.
5. Completion requirements:
   - Ensure all tests/verification steps pass.
   - Update documentation per plan.
   - Mark plan status as "Implemented" and ready for final review.
   - Commit all changes only if verification gates pass.

Note: Do NOT update TODO.md or archive the plan — that happens during verification (checkImplement).

## Constraints

- Implement exactly what the plan specifies.
- In work-unit mode: touch only your assigned files, with the narrow courtesy-edit exceptions described in Process §3. Flag every courtesy edit in your response so the orchestrator can detect overlap with sibling implementers.
- Do NOT spawn subagents — do all implementation work yourself.
- If blockers arise or significant deviation is needed, escalate to orchestrator or user before proceeding.
- Follow CLAUDE.md conventions: Conventional Commits with `[{TODO_ID}]` suffix, no bot/agent mentions.

## Phase Complete — implement

Control returns to `/orchestrate`. DO NOT STOP — the calling orchestrator still has verify and finalize phases ahead. Do not touch the orchestrator's TaskList or `pipeline-state.md` workspace file; the caller owns those. This skill's job ends when the planned changes are committed on the feature branch and you return to the orchestrator.
