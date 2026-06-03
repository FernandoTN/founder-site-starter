# Orchestrated Project Boilerplate

> A reusable starting point for driving **any** project — software or not — with a
> team of Claude Code agents working off a single source of truth. Clone it, point it
> at your project, and let the orchestration skills plan, build, and verify the work
> across parallel lanes of sub-agents.

This repo ships **no product**. It ships a **method** and the **skills** that run it.
Everything here is generic scaffolding — you bring the project.

## The idea

You don't manage AI by typing longer prompts into one giant chat. You run it like a team:

- **One source of truth.** Project facts live in versioned docs; every agent grounds on the same context.
- **A ledger.** [`TODO.md`](TODO.md) tracks work through **Now → In Progress → Next → Done** — including what you deliberately defer.
- **One focused session per task.** Each sub-agent gets exactly the context it needs — cheaper *and* better than one sprawling chat.
- **Parallel where independent, sequential where dependent.** Independent work fans out across git worktrees; dependent work runs in order.

## The workflow (what the skills automate)

1. **Set up core context.** Put your project's grounding facts in [`core/`](core/idea.md) and
   **reference them** from [`CLAUDE.md`](CLAUDE.md) and this `README.md`, so every agent shares
   one source of truth.
2. **Write an initial spec.** Describe what you're building — scope, constraints, and what "done" means.
3. **Derive the ledger.** Break the spec into discrete work items in [`TODO.md`](TODO.md), each a
   `### T-ID` block under **Now** / **Next**.
4. **Orchestrate.** Run [`/orchestrate`](.claude/commands/orchestrate.md) — it classifies each item
   (Micro / Standard / Complex), then fires off **parallel lanes of sub-agents** that
   **plan → review → implement → verify → merge**, finalizing each task in an isolated git
   worktree and updating the ledger as it goes.

```
core context  ──▶  initial spec  ──▶  TODO.md ledger  ──▶  /orchestrate  ──▶  done
   (core/,                              (### T-ID items)       │
   CLAUDE.md,                                                  ├─ lane A ─ plan→review→implement→verify ─┐
   README.md)                                                  ├─ lane B ─ … (parallel worktrees) ───────┼─▶ merge
                                                               └─ lane C ─ … ───────────────────────────┘
```

## The skills

| Skill | What it does |
|---|---|
| [`/orchestrate`](.claude/commands/orchestrate.md) | Drives one TODO item end-to-end across parallel sub-agent lanes. |
| [`/orchestrate-codex`](.claude/commands/orchestrate-codex.md) | The same pipeline, executed via the OpenAI Codex CLI. |
| [`/makePlan`](.claude/commands/makePlan.md) · [`/reviewPlan`](.claude/commands/reviewPlan.md) | Write and vet the implementation plan (with a parallelization map). |
| [`/implement`](.claude/commands/implement.md) · [`/checkImplement`](.claude/commands/checkImplement.md) | Build the change, then verify it against the plan. |
| [`/deepResearch`](.claude/commands/deepResearch.md) | Read-only investigation, written to `docs/research/`. |

## Repo map

| Path | What it is |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) · [`Agents.md`](Agents.md) | How agents behave here — the method, encoded. **Reference your core context from here.** |
| [`TODO.md`](TODO.md) | The **ledger** — every work item as a `### T-ID` block (Now / In Progress / Next / Backlog / Parked / Done / Archived Phases). |
| [`core/`](core/idea.md) | Your project's **core context** / seed idea — the source of truth everything derives from. |
| `docs/plans/` | Implementation plans + `CURRENT_PLAN.md` pointer + `archivedPlans/`. |
| `docs/research/` | Research briefs (no code). |
| `docs/reference/` | Canonical reference + `schemas/`. |
| `docs/FutureEnhancements.md` · `docs/DOC_CHANGELOG.md` | Deferred-work and code→doc drift ledgers the pipeline appends to. |
| [`DECISIONS/`](DECISIONS/0000-TEMPLATE.md) | Decision-record template. |
| `.claude/commands/` | The orchestration skill chain. |

## Get started

```bash
git clone https://github.com/FernandoTN/founder-site-starter && cd founder-site-starter
claude            # open Claude Code in the repo root
```

1. Fill [`core/idea.md`](core/idea.md) with your project's context, and reference it from [`CLAUDE.md`](CLAUDE.md).
2. Write your spec, then break it into items in [`TODO.md`](TODO.md) under **Now** (keep the `### T-ID` format).
3. Run `/orchestrate T-0001-EXAMPLE` — or bare `/orchestrate` to claim the first ready item — and watch the lanes fire.

> **Tool-agnostic, code-optional.** The same loop runs a memo, a deck, a research report,
> or a codebase. Code only enters when your tasks call for it.

---

*Prepared as a workshop take-home. Conventional Commits; no AI tool is credited as author or co-author.*
