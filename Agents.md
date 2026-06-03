# Agents.md

> Friendly companion to [`CLAUDE.md`](CLAUDE.md) — same method, newcomer framing.
> If the two ever disagree, `CLAUDE.md` wins.

## Drive one task to Done

1. **Read the ledger** — [`TODO.md`](TODO.md). Take the item in **Now**.
2. **Plan before you build** — decompose it; mark which sub-tasks are independent
   (run in parallel) and which depend on others (run in order).
3. **Give each worker only the context it needs** — one focused session per task.
4. **Write it down** — move ledger items toward Done; record big choices in `DECISIONS/`.
   Park deferred work in **Next** with a reason; don't pretend it's done.
5. **Verify** — every change is checked against its plan before it ships.

## The skill chain

`/orchestrate` nests: `makePlan` → `reviewPlan` → `implement` → `checkImplement`.
Use `/deepResearch` for read-only investigation. Commit with Conventional Commits
and the TODO ID (e.g. `feat(core): seed idea [T-0001-EXAMPLE]`); never credit an AI
tool as author or co-author.
