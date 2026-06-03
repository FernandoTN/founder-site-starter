Create a complete implementation plan for the current "Now" or "In Progress" TODO item in TODO.md. This skill is a **single-agent, self-contained planner** — it does NOT spawn subagents. When used inside the orchestrator pipeline, the orchestrator spawns this skill as a subagent (Standard tier) or teammate (Complex tier).

## Inputs (required)

- `TODO.md` — to identify and confirm the "Now" or "In Progress" item verbatim
- Relevant source files mentioned in the TODO
- `docs/research/` — discover and read relevant research docs (list the directory, don't assume filenames)
- `docs/reference/schemas/` — canonical type definitions for schema-touching TODOs

## Inputs (optional — available in Complex tier workspace)

- Pre-researched findings in `docs/plans/.workspace/T-{TODO_ID}/phase1/`
  - If these exist, use them as supplementary research
  - Still read source files directly to verify and fill gaps
  - If no workspace exists (Standard tier or standalone), do all research yourself

## Arguments

`$ARGUMENTS`:
- If a TODO ID is provided (e.g., `T-20260206-CDC-RETRY`), plan for that item
- If empty, plan for the first "In Progress" item in TODO.md (or first "Now" item if none are In Progress)

## Process

1. Read `TODO.md` and identify the target TODO item — extract the full block verbatim
2. **Check for workspace research** (`docs/plans/.workspace/T-{TODO_ID}/phase1/`):
   - If workspace files exist → read all research findings and synthesize them
   - If no workspace files → read all relevant source files, explore the codebase, and discover useful docs in `docs/research/` yourself
3. Analyze the TODO's scope, acceptance criteria, and file list
4. Design the implementation approach
5. Create the plan file at `docs/plans/T-{TODO_ID}.md`
6. Update `docs/plans/CURRENT_PLAN.md` with the new plan pointer

## Plan Content Requirements

The plan file MUST include ALL of the following sections:

### 1. Scope Definition
- Restate the TODO item verbatim
- Define what "done" means concretely (acceptance criteria)

### 2. Non-Goals
- Explicitly list what is OUT of scope.
- Prevents scope creep during implementation.
- **Integration work vs scope expansion:** If implementing the TODO's acceptance criteria correctly requires additional work for clean integration with the existing codebase (e.g., adding an index needed for acceptable performance, updating callers to pass a new required argument, extending a shared type to avoid an inconsistency, adding a migration the new code depends on, wiring a new module into the dependency injection / bootstrap layer the rest of the codebase uses), include that work in the plan as "Integration Tasks" with a one-line rationale each. These are NOT scope expansions — they are the work needed for the change to land well alongside existing code and follow the codebase's established practices.
- **When to escalate instead:**
  - The gap would introduce a NEW user-visible acceptance criterion not in the TODO.
  - The best-fit approach introduces a new architectural decision (new service, new dependency, new storage layer, new cross-module contract) that the user/team should weigh in on.

  In those cases, stop and ask the user. Everything else — including judgment calls about the best place for a helper, naming, and test placement — is resolved by the planner using the codebase's existing patterns and documented in the plan.

### 3. Implementation Checklist
Ordered, granular tasks including:
- Code changes (files impacted, what changes in each)
- Data/schema changes (if any) with migration approach
- Tests appropriate to the project's stack — prefer updating existing tests over creating new ones
- Documentation updates required by the change

### 4. Parallelization Map (REQUIRED — single-unit is valid)

This section is the interface with the parallel orchestrator. Decompose the implementation into independent work units with **exclusive file ownership**.

A **single work unit is acceptable and often correct** for focused bugfixes or small features touching one subsystem. Split into 2+ units only when the tasks have clear exclusive file ownership AND the extra coordination is worth the parallelism. Under-splitting beats over-splitting: a single-unit plan runs with one implementer, which is simpler and avoids spurious file-ownership conflicts.

```
## Parallelization Map

### Work Unit 1: {descriptive name}
- **Files owned** (exclusive): [list of files ONLY this unit touches]
- **Tasks**: [list of checklist items assigned to this unit]
- **Depends on**: [other work unit names, or "none"]

### Work Unit 2: {descriptive name}
- **Files owned** (exclusive): [list of files ONLY this unit touches]
- **Tasks**: [list of checklist items assigned to this unit]
- **Depends on**: [other work unit names, or "none"]

### Work Unit N: ...

### Sequential Tasks (after parallel work completes)
- [Tasks that touch files from multiple work units]
- [Tasks that must run after all parallel work is done]
- [Integration verification, final commits, etc.]
```

**Rules for the parallelization map:**
- Each source file appears in **AT MOST one** work unit (exclusive ownership — no overlaps)
- Work units with no mutual dependencies can run in parallel
- Tasks that touch files across multiple work units go in "Sequential Tasks"
- Test files can be grouped with their corresponding source files, OR in a separate test work unit if they don't overlap
- Aim for 2-5 work units depending on task complexity; don't over-fragment

### 5. Documentation Impact (REQUIRED)

For each source file in your Implementation Checklist, grep `docs/` for mentions of key entities you are changing (table names, endpoint paths, model class names, env var names, config keys). Use specific entity names, not generic terms.

Example: if adding a table `retrieval_config`, run:
  `grep -r "retrieval_config" docs/`

List findings as:
- **Same-PR updates**: Reference docs (`docs/reference/`), per-module READMEs that will be factually wrong after your changes. Add these as implementation tasks in a Work Unit.
- **Reference doc notes**: Project-context docs, `README.md`, `TECHNICAL_SPEC.md` that mention affected entities. List the doc, line, and what's changing. The checker will verify and log these.
- **New entities**: Tables, endpoints, env vars, models not yet in any doc. Note which reference docs should eventually include them.
- Write "None — internal refactor, no public entity changes" only if truly no externally-visible entities are added, removed, or renamed.

### 6. Verification

State concretely how to confirm the change works, using commands or steps appropriate to the project's stack:
- List the specific commands to run (build, lint, type-check, test) or the manual steps to take, with the expected result for each.
- Identify which checks directly exercise the changed code, and run those first.
- Name the review gates that must pass before the plan is considered "Implemented".

### 7. Rollback/Safety Notes
- What to do if implementation fails partway
- Any risky operations and their mitigation

## Constraints

- Plan for the **full scope** of the single "Now" or "In Progress" TODO item. That scope includes Integration Tasks needed for the change to land cleanly in the existing codebase and follow established practices (see §2 "Non-Goals"). Do NOT expand to a NEW user-visible acceptance criterion or a NEW architectural decision without user approval.
- Do NOT spawn subagents — do all research and planning yourself.
- **Ambiguity handling:** when a choice is not dictated by the TODO, apply the default that keeps the plan minimal AND consistent with existing patterns in the codebase (naming, file layout, error taxonomy, test layout, helper placement, error handling). Before picking, look at 2–3 nearby files or modules of the same kind and follow their conventions. Record every non-obvious choice in a "Decisions" section in the plan with a one-line rationale. Escalate only when no reasonable default exists because the options have materially different architectural consequences.
- Follow CLAUDE.md conventions for all planned changes.

---

## Phase Complete — makePlan

Control returns to `/orchestrate`. DO NOT STOP — the calling orchestrator still has review, implement, verify, and finalize phases ahead. Do not touch the orchestrator's TaskList or `pipeline-state.md` workspace file; the caller owns those. This skill's job ends when the plan file is written and you return to the orchestrator.
