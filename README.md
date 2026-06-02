# Sprout Starter — *The One-Hour Founder*

> A teaching repo for the Stanford workshop: **take a product from a one-line
> idea to a live, signup-capturing waitlist in under an hour — driven by a team
> of Claude Code agents working off a single source of truth and a `TODO.md`
> ledger.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

This repo is two things at once:

1. **The demo stage** — the repo Fernando drives live on screen.
2. **The take-home** — clone it (or just read it) and reproduce the whole arc
   yourself, with any AI tool you like.

The product is invented and harmless: **Sprout**, the plant-care sidekick that
texts you before your plants die. Nobody is precious about it, so it's a safe
place to learn a serious method.

---

## The one idea behind the whole workshop

You don't manage AI by typing better prompts into one giant chat. You manage it
the way you'd run a team:

- **A single source of truth.** Everything the "company" believes lives in
  versioned docs. Every public artifact traces back to one.
- **A ledger.** [`TODO.md`](TODO.md) tracks every piece of work through
  **Now → In Progress → Next → Done**. You iterate against it until the task is Done.
- **One focused session per task.** Each agent gets *exactly* the context it
  needs and nothing more — which is cheaper *and* produces better work.
- **Parallel where independent, sequential where dependent.** Three research
  agents at once; then one synthesis step that waits for all three.
- **Monitor everything from one screen** with `claude agents`.

This is exactly how the **Memori** brand canon is run — see the real thing in the
workshop. This repo is a miniature of it.

---

## Repo map

| Path | What it is |
|---|---|
| [`TODO.md`](TODO.md) | The **ledger**. One Complex task sits in *Now* at the start. |
| [`CLAUDE.md`](CLAUDE.md) | How an AI agent should behave in this repo (the method, encoded). |
| [`Agents.md`](Agents.md) | The same method, explained for a newcomer (directional mirror of CLAUDE.md). |
| [`COMMANDS.md`](COMMANDS.md) | The **cheat-sheet** — every command used in the demo, verified, with native-app equivalents. |
| [`RUNSHEET.md`](RUNSHEET.md) | The presenter's minute-by-minute script for the 9 beats. |
| `core/` | The seed idea ([`core/idea.md`](core/idea.md)). |
| `brand/` | The brand canon — filled *live* during the demo (positioning, voice, vocabulary, proof-points). |
| `docs/research/` | Market / competitor / audience briefs — written *live* by parallel agents. |
| `DECISIONS/` | Brand Decision Records (BDRs). The "why" behind each locked choice. Template in [`DECISIONS/BDR-TEMPLATE.md`](DECISIONS/BDR-TEMPLATE.md). |
| `web/` | The deployable **Next.js + Neon** landing page + waitlist. The finale. |
| `prebake/` | **Deterministic fallbacks.** Ready-made versions of everything the agents produce, so a live beat can never stall. *(See [`prebake/README.md`](prebake/README.md).)* |
| `.claude/` | The demo skill chain — `/orchestrate`, `/makePlan`, `/implement`, `/checkImplement`, `/deepResearch` — plus a sample status-line script (not wired, so it won't override your global one). |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) · [`LICENSE`](LICENSE) | Contribution conventions; MIT license. |

---

## Two ways to reproduce this (pick your cockpit)

**You don't need a terminal to use this method.** The method is tool-agnostic.

- **No terminal? Use the native Claude app (or Cowork).** Open a *fresh chat per
  task*, paste each prompt from [`COMMANDS.md`](COMMANDS.md), and keep your own
  `TODO.md` as a plain doc. You get 90% of the value with zero setup.
- **Comfortable in an IDE/terminal? Use Claude Code.** You additionally get a
  live status-line context gauge, custom slash commands, git worktrees, and the
  `claude agents` monitor. Start with [`RUNSHEET.md`](RUNSHEET.md).

---

## Quick start (engineers)

```bash
git clone <this-repo> sprout-starter && cd sprout-starter
claude            # open Claude Code in the repo root
# then, in the session:
#   read TODO.md and drive T-0001-SPROUT-LAUNCH to Done
```

To ship the finale, see [`web/README.md`](web/README.md).

> **Convention:** commits use [Conventional Commits](https://www.conventionalcommits.org/);
> no AI tool is credited as author or co-author (see [`CLAUDE.md`](CLAUDE.md)).

---

*Prepared for a Stanford workshop by Fernando Torres.*
