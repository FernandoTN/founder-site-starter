# Agents.md — directional guide

> The friendly companion to [`CLAUDE.md`](CLAUDE.md). `CLAUDE.md` is the strict
> constitution; this is the same method for a newcomer who just landed in the repo.
> If the two ever disagree, `CLAUDE.md` wins.

## You're here to drive one task to Done

This repo is run like a team, not a chat:

1. **Read the ledger.** Open [`TODO.md`](TODO.md). Take the item in *Now*.
2. **Plan before you build.** Decompose it; mark which sub-tasks are independent
   (run them in parallel) and which depend on others (run them in order).
3. **Give each worker the right context — and only that.** Independent jobs run as
   their own focused sessions/sub-agents.
4. **Write it down.** Move ledger items toward Done; record big choices in `DECISIONS/`.
   Park things you're deferring in *Next* with a reason — don't pretend they're done.
5. **Trace every public claim about the owner** to a row in `brand/proof-points.md`.
   A personal site is a trust document. No invented titles or metrics.

## The shape of the work (T-0001)

```
research (parallel ×3) ─▶ identity canon (sequential) ─▶ copy ─▶ build (parallel ×4 worktrees) ─▶ ship
                                                                   │
                            5a public site · 5b booking · 5c CRM admin · 5d auth + data layer
```

Parallel where independent, sequential where one step needs the last one's output.
That distinction is the lesson — say it out loud.

**Deferred on purpose** (in *Next*): real Google Calendar OAuth, multi-user
accounts, booking emails. Knowing what *not* to wire up live is a skill too.

## Quick checklist before you commit

- [ ] Ledger updated (the item moved toward Done)
- [ ] Conventional Commit with the TODO ID, e.g. `feat(web): /admin CRM table [T-0005]`
- [ ] No AI tool credited as author/co-author
- [ ] Every new public claim about the owner traces to `brand/proof-points.md`
- [ ] No real secrets committed; CRM seeded with fictional contacts for demos

## This is not just for code

Research, positioning, voice, a competitive read, a decision record — all run
through the same loop. Code only shows up when you build `web/`. Use the cockpit
that fits you: the Claude app / Cowork (a fresh chat per task), Claude Code in the
terminal, or another agent CLI. The method travels. See [`COMMANDS.md`](COMMANDS.md).
