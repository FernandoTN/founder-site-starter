# Boilerplate — orchestrate-ready starting scaffold

A clean **start state**: the files and folders the `/orchestrate` skill chain
expects, in the right format, with no work done yet. Point it at your own task and run.

## What's here

| Path | What it is |
|---|---|
| [`TODO.md`](TODO.md) | The **ledger** — Now / In Progress / Next / Backlog / Parked / Done / Archived Phases, with example items in the `### T-ID` format. |
| [`CLAUDE.md`](CLAUDE.md) · [`Agents.md`](Agents.md) | How agents behave here (the method, encoded). |
| `core/` | The seed input — [`core/idea.md`](core/idea.md). |
| `docs/plans/` · `docs/research/` · `docs/reference/` | Plans, research briefs, and canonical reference (with archive + `schemas/` subfolders). |
| `docs/FutureEnhancements.md` · `docs/DOC_CHANGELOG.md` | The deferred-work and code→doc drift ledgers the pipeline appends to. |
| `DECISIONS/` | Decision-record template. |

## Start

1. Write your one-line idea in [`core/idea.md`](core/idea.md).
2. Write your first task in [`TODO.md`](TODO.md) under **Now** (keep the `### T-ID` format).
3. Run `/orchestrate T-0001-EXAMPLE` — or bare `/orchestrate` to claim the first ready item.
