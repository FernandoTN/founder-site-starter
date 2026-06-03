Verify that the implementation of the current "Now" or "In Progress" TODO item matches the plan and is correct. This skill is a **single-agent verifier** — it does NOT spawn subagents. When used inside the orchestrator pipeline, the orchestrator may spawn multiple checkers (one per dimension) in parallel.

## Inputs (required)

- The implemented plan in docs/plans/ (current plan)
- `TODO.md`
- Codebase, documentation

## Arguments

`$ARGUMENTS`:
- If a **verification dimension** is specified, verify ONLY that dimension:
  - `plan-diff` — compare plan checklist vs actual repo changes
  - `docs` — verify documentation reflects the new state
  - `edge-cases` — check for regression risks, missing error handling, boundary conditions
  - `code-reuse` — find newly written code that duplicates existing utilities or helpers
  - `code-quality` — detect hacky patterns: redundant state, copy-paste, leaky abstractions, stringly-typed code
  - `efficiency` — catch unnecessary work, missed concurrency, hot-path bloat, unbounded data structures
- If a **TODO ID** is specified, verify that plan's implementation
- If empty, verify ALL dimensions

## Process

### Single-Dimension Mode (orchestrator invocation)

When verifying a specific dimension:
1. Read the plan file and `TODO.md`
2. Perform the focused verification:

   **plan-diff**: Compare every checklist item in the plan against actual repo changes. Use git diff and file reads to confirm each item was implemented. Flag any items that were skipped, partially done, or deviate from the plan.

   **docs**: Actively detect stale documentation — do NOT rely solely on what the plan lists.
   1. Get changed source files: `git diff --name-only $(git merge-base HEAD main) HEAD`
   2. Extract high-specificity entities from the diff: new/modified table names, endpoint paths (`@router.get/post/...`), model class names, env var names (`MEMORI_*`), config keys, Celery task names. Skip generic function names — focus on entities that docs reference.
   3. Grep `docs/` for each extracted entity. For each match in a doc file:
      a. Read the surrounding context (5-10 lines)
      b. Check if the doc's claim is still accurate post-change
      c. Classify by doc location:
         - Reference docs (`docs/reference/`), per-module READMEs → **CRITICAL** (must fix before finalize)
         - Project-context series (`docs/project-context/`), `README.md` metrics, `TECHNICAL_SPEC.md` → **NOTE** (log for batch update)
   4. Check for new entities that SHOULD be documented but aren't found in any doc (new tables, new endpoints, new env vars almost always should be). Classify as NOTE with the most relevant target doc.
   5. Also verify any docs the plan explicitly listed for updating were actually modified in the diff.
   6. Compile all NOTE-level findings into a structured "Doc Changelog Entries" section in your response — the finalizer will record these. Format per entry: `- {entity}: {what changed} → {target doc} ({section})`

   **edge-cases**: Review the implemented code for regression risks. Check boundary conditions, error handling, null/empty cases, and concurrency issues. Look for common failure modes the plan might not have anticipated.

   **code-reuse**: For each changed file (use `git diff --name-only` to identify them), search the codebase for existing utilities and helpers that could replace newly written code. Use Grep to find similar function names, patterns, and logic elsewhere — focus on utility directories, shared modules, and files adjacent to the changed ones. Flag: (1) any new function that duplicates existing functionality — name the existing function to use instead, (2) any inline logic that could use an existing utility — hand-rolled string manipulation, manual path handling, custom environment checks, ad-hoc type guards, and similar patterns are common candidates. Severity: minor if the duplication is small (< 5 lines), critical if it's a substantial function (> 10 lines) or creates a maintenance burden.

   **code-quality**: Review all changed files for hacky patterns: (1) **Redundant state** — state that duplicates existing state, cached values that could be derived, observers/effects that could be direct calls; (2) **Parameter sprawl** — adding new parameters to a function instead of generalizing or restructuring existing ones; (3) **Copy-paste with slight variation** — near-duplicate code blocks that should be unified with a shared abstraction; (4) **Leaky abstractions** — exposing internal details that should be encapsulated, or breaking existing abstraction boundaries; (5) **Stringly-typed code** — using raw strings where constants, enums (string unions), or branded types already exist in the codebase. Severity: minor for cosmetic issues, critical for patterns that will cause maintenance problems or bugs.

   **efficiency**: Review all changed files for: (1) **Unnecessary work** — redundant computations, repeated file reads, duplicate network/API calls, N+1 query patterns; (2) **Missed concurrency** — independent operations run sequentially when they could run in parallel (e.g., multiple independent API calls, file reads, or database queries); (3) **Hot-path bloat** — new blocking work added to startup or per-request/per-render hot paths; (4) **Unnecessary existence checks** — pre-checking file/resource existence before operating (TOCTOU anti-pattern) — the correct pattern is to operate directly and handle the error; (5) **Memory** — unbounded data structures, missing cleanup, event listener leaks; (6) **Overly broad operations** — reading entire files when only a portion is needed, loading all items when filtering for one. Severity: minor for cold-path inefficiencies, critical for hot-path or memory issues.

3. If a workspace directory exists (`docs/plans/.workspace/T-{TODO_ID}/phase4/`), write detailed findings to `check-{dimension}.md` there. If no workspace exists (Standard tier), skip the file write — include the full findings in your response instead.
   Findings must include:
   - Dimension reviewed
   - Verdict: pass or fail
   - Evidence: specific files, lines, and entities examined
   - Issues found (if any) with severity and suggested fix
4. Include a brief summary in your response: dimension, verdict, key findings

### All-Dimensions Mode (standalone invocation)

When verifying all dimensions:
1. Read the plan file and `TODO.md`
2. Verify all 6 dimensions (plan-diff, docs, edge-cases, code-reuse, code-quality, efficiency)
3. If issues are found:
   - Record them in the plan under "Final Review Findings"
   - Fix them directly (small fixes) or escalate (large issues)
   - Re-verify until clean
4. When clean — completion requirements:
   1. Add "Final Review: Approved" to the plan with evidence (dimensions verified, findings, results)
   2. Archive the plan to `docs/plans/archivedPlans/`
   3. Commit and push final fixes

   > **Shared files deferred:** Do NOT update `TODO.md`, `docs/plans/CURRENT_PLAN.md`, or `docs/FutureEnhancements.md` when running in a worktree. These updates happen during the Merge Finalize phase on `main` (see `orchestrate.md`). The only exception is Phase 0's Now→In Progress move, which happens on `main` before entering the worktree. If running standalone on `main` (no worktree), update them as before.

## Non-Critical Enhancements

For any future enhancements detected but not implemented, include them in your response so the orchestrator can add them to the merge manifest. If running standalone on `main`, add them directly to `docs/FutureEnhancements.md`.

## Constraints

- Stay within the plan and single TODO item scope
- Do NOT accept "looks good" — actually inspect the code, docs, and diff for each dimension
- Do NOT spawn subagents — do all verification work yourself
- If issues are too large to fix yourself, escalate to orchestrator or user

---

## Phase Complete — checkImplement

Control returns to `/orchestrate`. DO NOT STOP — the calling orchestrator still has any remaining checker dimensions, fix iterations, and the Branch/Merge Finalize phase ahead. Do not touch the orchestrator's TaskList or `pipeline-state.md` workspace file; the caller owns those.

**Standalone-mode archive/commit suppression.** The "Final Review" completion steps above (archive the plan, commit and push final fixes) apply ONLY when this skill is invoked directly by the user on `main` — NOT when invoked from an orchestrator. Orchestrator-invoked runs defer plan archival and the final commit to Branch Finalize / Merge Finalize; if an orchestrator prompt is present in your context, treat those steps as disabled and simply return findings to the caller.
