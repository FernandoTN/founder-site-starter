# Commands cheat-sheet

> Every command used in the workshop, verified against Claude Code **v2.1.160**
> (June 2026). Where it matters, the **native Claude app / Cowork** equivalent is
> given so non-terminal users aren't left out — *same method, different cockpit.*

> ⚠️ **Agent view (`claude agents`) is a research preview** (needs ≥ v2.1.139).
> Its on-screen keys may change between versions. The `--json` form and the
> `attach/logs/stop` shell commands are the stable, projector-safe fallback.

---

## 1. Launch work in the background

| Command | What it does |
|---|---|
| `claude --bg "<task>"` | Start a session **straight in the background** and print its short ID + management commands. |
| `claude --bg --name market-scan "<task>"` | Same, with a readable label (shows up in the monitor). |
| `claude --bg --agent <name> "<task>"` | Run a specific sub-agent as the session's main agent. |
| `/bg` *(inside a session)* | Move the **current** conversation to the background. Can take a trailing instruction: `/bg run the tests and fix failures`. |

> **Native app:** open a new chat (or a Cowork task) per job. You won't see one
> unified board, but the *principle* — one job, one fresh context — is identical.

The three parallel research dispatches used in the demo:

```bash
claude --bg --name market-scan        "Read core/idea.md. Research the plant-care app market: size, trends, why people buy. Write docs/research/market-scan.md. Cite sources or mark as estimate."
claude --bg --name competitor-teardown "Read core/idea.md. Tear down Planta and Greg: positioning, pricing, gaps. Write docs/research/competitor-teardown.md."
claude --bg --name audience-persona   "Read core/idea.md. Define the target user (the busy professional who keeps killing plants). Write docs/research/audience-persona.md."
```

---

## 2. Monitor everything — `claude agents`

| Command | What it does |
|---|---|
| `claude agents` | Open **agent view**: a full-screen board of every background session, grouped *Working / Needs input / Ready for review / Completed*, updating live. |
| `claude agents --json` | Print the same as a JSON array and exit (fields: `pid`, `cwd`, `kind`, `name`, `status`, `sessionId`). **Projector-safe.** Pipe it: `claude agents --json \| python3 -m json.tool`. |
| `claude agents --cwd <path>` | Filter to one project. |
| `claude attach <id>` | Open a background session in this terminal (take it over). |
| `claude logs <id>` | Print a session's recent output. |
| `claude stop <id>` | Stop a session (`claude kill <id>` also works). |
| `claude respawn <id>` / `--all` | Restart a session with its conversation intact. |
| `claude rm <id>` | Remove a finished session from the list. |
| `claude daemon status` | Health of the supervisor that hosts background sessions. |
| `claude daemon stop --any --keep-workers` | Restart a stalled supervisor **without** killing running sessions. |

**Agent-view keys (current preview):** `↑/↓` move · `Space` peek (see the last
output or the question it's blocked on; reply inline) · `Enter`/`→` attach ·
`←` detach · `Ctrl+S` group by directory · `Ctrl+T` pin · `Ctrl+R` rename ·
`Ctrl+X` stop (twice = delete) · `?` all shortcuts · `Esc` back to shell.

> **Heads-up:** each background session burns subscription quota **independently**
> — N agents ≈ N× the spend. Keep live fan-outs small (3 is plenty for a demo).

### Don't confuse the three look-alikes

| Command | Scope |
|---|---|
| `claude agents` *(shell)* | **Background sessions** across all projects. |
| `/agents` *(in-session)* | The **sub-agent** panel (Running + Library). A *different* thing. |
| `/tasks` *(in-session)* | Background work of **this** session (sub-agents, background bash, workflows). |
| `/workflows` *(in-session)* | Dynamic multi-agent **workflow** runs. |

---

## 3. Context — make the invisible visible

| Command | What it does |
|---|---|
| `/context` | Show how full the current context window is (the "fuel gauge"). |
| `/usage` | Show token usage / cost. Use it to prove the cheaper claim. |
| `/clear` | Wipe the conversation and start fresh in the same session. |
| `/statusline` | Set up a custom status line in plain language (e.g. "show model, a context % bar, and cost"). |

> **The lesson:** a focused session with the *right* context beats a bloated one
> almost every time — and it's cheaper, because you stop re-billing the junk on
> every turn. **Native app:** start a *new chat* instead of letting one balloon.

---

## 4. Worktrees — isolate parallel code streams

| Command | What it does |
|---|---|
| `claude -w <name>` (`--worktree`) | Start a session in an **isolated git worktree** under `.claude/worktrees/`. |
| `claude -w <name> --tmux` | Same, in a split tmux pane. |

> Background sessions auto-isolate into a worktree before editing files, so
> parallel writers never clobber each other. **Worktrees are a git feature — so
> this exact tool is code-only.** The *principle* (isolate each parallel stream so
> they can't corrupt each other) is what the research fan-out did for non-code work.
>
> ⚠️ Deleting a Claude-created worktree also deletes its **uncommitted** work —
> commit or push first.

---

## 5. The finale — ship to Vercel + a real database

Run **in this order** (provisioning the DB *before* the first prod build avoids a
crash on a missing `DATABASE_URL`):

```bash
cd web
vercel login                 # pre-baked before class
vercel whoami                # confirm the right team
vercel link                  # link this folder to a Vercel project
vercel integration add neon  # provision Neon Postgres + auto-inject env vars
vercel env pull              # pull DATABASE_URL into .env.local
vercel build                 # catch TS/ESLint errors locally first
vercel deploy --prod         # prints the live https URL
```

Then submit a signup on the live page and prove persistence:

```bash
# in the Neon SQL console, or via the app's own count:
SELECT count(*) FROM waitlist;
```

> You can also let Claude drive this with the **Vercel plugin** (the `/vercel:*`
> skills: `vercel:marketplace`, `vercel:env`, `vercel:deploy`) — *"look, Claude
> ships it for me."* Install with `npx plugins add vercel/vercel-plugin` (or via
> `/plugin`). The raw CLI above is the legible version for the stage.
