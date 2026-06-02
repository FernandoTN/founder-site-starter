# Founder Site Starter — *The One-Hour Personal Site*

> A teaching repo for the Stanford workshop: **take your professional home on the
> web from a one-line idea to a live, deployed site — with a public booking page
> and a private, passcode-locked CRM — driven by a team of Claude Code agents
> working off a single source of truth and a `TODO.md` ledger.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

This repo is two things at once:

1. **The demo stage** — the repo Fernando drives live on screen.
2. **The take-home** — clone it (or just read it), point it at *yourself*, and
   reproduce the whole arc, with any AI tool you like.

## What gets built

A personal site with a public face and a private back office:

- **Public:** `/` (home / about / work) + **`/book`** — visitors pick a slot and
  request time with you.
- **Owner-only (one passcode):** **`/admin`** — your **CRM / Rolodex** of contacts
  and an **inbox of the bookings** that came in from `/book`.
- **In the ledger as *Next* (shown, not built live):** real Google Calendar sync,
  multi-user accounts, booking emails — see [`TODO.md`](TODO.md).

The **wow**: someone books a slot on the live URL, and it appears in your CRM on
the projector — a real, two-sided, authenticated loop.

## The one idea behind the workshop

You don't manage AI by typing better prompts into one giant chat. You run it like
a team:

- **A single source of truth.** Everything lives in versioned docs; every public
  artifact traces back to one.
- **A ledger.** [`TODO.md`](TODO.md) tracks work through **Now → In Progress →
  Next → Done** — *including what you deliberately defer*.
- **One focused session per task** — each agent gets exactly the context it needs.
  Cheaper *and* better.
- **Parallel where independent, sequential where dependent.** Three research
  agents at once; then a canon step that waits for them; then **four build agents
  in four git worktrees**.
- **Monitor everything from one screen** with `claude agents`.

This is how the **Memori** brand canon is actually run — this repo is a miniature of it.

## Repo map

| Path | What it is |
|---|---|
| [`TODO.md`](TODO.md) | The **ledger**. One Complex task in *Now*; the deferred items sit honestly in *Next*. |
| [`CLAUDE.md`](CLAUDE.md) | How an AI agent should behave here (the method, encoded). |
| [`Agents.md`](Agents.md) | The same method for a newcomer (directional mirror of CLAUDE.md). |
| [`COMMANDS.md`](COMMANDS.md) | The **cheat-sheet** — every command, verified, with native-app equivalents + the calendar-OAuth caveat. |
| [`RUNSHEET.md`](RUNSHEET.md) | The presenter's minute-by-minute script. |
| `core/` | The seed idea ([`core/idea.md`](core/idea.md)). |
| `brand/` | Identity canon — written *live* (positioning, voice, vocabulary, proof-points, site copy). |
| `docs/research/` | Site-inspiration / IA / audience briefs — written *live* by parallel agents. |
| `DECISIONS/` | Decision Records — the "why" behind locked choices. Template in [`DECISIONS/BDR-TEMPLATE.md`](DECISIONS/BDR-TEMPLATE.md). |
| `web/` | The deployable **Next.js + Neon** app: public site, `/book`, passcode-locked `/admin`. See [`web/README.md`](web/README.md). |
| `prebake/` | **Deterministic fallbacks** — ready-made versions of everything the agents produce, so a live beat can never stall. *(See [`prebake/README.md`](prebake/README.md).)* |
| `.claude/` | The demo skill chain (`/orchestrate`, `/makePlan`, `/implement`, `/checkImplement`, `/deepResearch`) + a sample status-line script (not wired). |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) · [`LICENSE`](LICENSE) | Contribution conventions; MIT license. |

## Two ways to reproduce this (pick your cockpit)

**You don't need a terminal to use this method.** It's tool-agnostic.

- **No terminal? Use the native Claude app (or Cowork).** A *fresh chat per task*,
  paste each prompt from [`COMMANDS.md`](COMMANDS.md), keep a plain `TODO.md`. 90%
  of the value, zero setup.
- **Comfortable in an IDE/terminal? Use Claude Code.** You also get the live
  status-line context gauge, custom commands, git worktrees, and the `claude
  agents` monitor. Start with [`RUNSHEET.md`](RUNSHEET.md).

## Quick start (engineers)

```bash
git clone <this-repo> founder-site-starter && cd founder-site-starter
claude            # open Claude Code in the repo root
# then:  read TODO.md and drive T-0001-SITE-LAUNCH to Done
```

To run and ship the app, see [`web/README.md`](web/README.md).

> **Convention:** [Conventional Commits](https://www.conventionalcommits.org/);
> no AI tool is credited as author or co-author (see [`CLAUDE.md`](CLAUDE.md)).

---

*Prepared for a Stanford workshop by Fernando Torres.*
