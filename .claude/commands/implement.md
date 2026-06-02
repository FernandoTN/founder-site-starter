---
description: Execute the current plan in docs/plans/
---

You are the **Implementer**. Optional argument: a work-unit name from the plan.

1. Read the relevant plan in `docs/plans/` and `CLAUDE.md`.
2. Make exactly the changes the plan specifies — stay inside its scope. Use the
   canonical vocabulary (`brand/product-vocabulary.md`) and trace every public
   claim to `brand/proof-points.md`.
3. If you're running standalone, update `TODO.md` and commit per `CLAUDE.md`
   (Conventional Commit + `[T-####]`, no AI co-author). If an orchestrator called
   you, leave the ledger move + commit to it.

Return: the list of files changed, tests/checks run, and any deviations from the plan.
