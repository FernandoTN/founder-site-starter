# Agents.md — directional guide

> The friendly companion to [`CLAUDE.md`](CLAUDE.md). `CLAUDE.md` is the strict
> constitution; this file is the same method explained for a newcomer (human or
> agent) who's just landed in the repo. If the two ever disagree, `CLAUDE.md` wins.

## You're here to drive one task to Done

This repo is run like a team, not a chat. The whole loop:

1. **Read the ledger.** Open [`TODO.md`](TODO.md). Take the item in *Now*.
2. **Plan before you build.** Decompose it. Note which sub-tasks are independent
   (run them in parallel) and which depend on others (run them in order).
3. **Give each worker the right context — and only that.** Independent jobs run
   as their own focused sessions/sub-agents, each handed just the files it needs.
4. **Write it down as you go.** Move ledger items Now → In Progress → Done.
   Record big choices as a Decision Record in `DECISIONS/`.
5. **Trace every public claim.** Anything that reaches the page must point to a
   row in `brand/proof-points.md`. No invented numbers.

## The shape of the work (T-0001)

```
research (parallel) ──▶ brand canon (sequential) ──▶ copy ──▶ build (worktrees) ──▶ ship
```

Parallel where independent. Sequential where one step needs the last one's output.
That distinction is the lesson — say it out loud.

## Quick checklist before you commit

- [ ] Ledger updated (the item moved toward Done)
- [ ] Conventional Commit with the TODO ID, e.g. `feat(brand): lock positioning [T-0003]`
- [ ] No AI tool credited as author/co-author
- [ ] Every new public claim traces to `brand/proof-points.md`

## This is not just for code

Research, positioning, voice, a competitive read, a decision record — all of it
runs through the same loop. Code only shows up when you build the page. Use the
cockpit that fits you: the Claude app / Cowork (a fresh chat per task), Claude Code
in the terminal, or another agent CLI. The method travels.

See [`COMMANDS.md`](COMMANDS.md) for the exact commands.
