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
| `claude --bg --name site-scan "<task>"` | Same, with a readable label (shows up in the monitor). |
| `claude --bg --agent <name> "<task>"` | Run a specific sub-agent as the session's main agent. |
| `/bg` *(inside a session)* | Move the **current** conversation to the background. Can take a trailing instruction: `/bg run the build and fix errors`. |

> **Native app:** open a new chat (or a Cowork task) per job. You won't see one
> unified board, but the principle — one job, one fresh context — is identical.

The three parallel **research** dispatches (Phase 2):

```bash
claude --bg --name site-scan "Read core/idea.md. Scan 5 great founder sites; what they do well. Write docs/research/site-inspiration-scan.md."
claude --bg --name ia-plan   "Read core/idea.md. Propose the site IA + per-section content plan. Write docs/research/ia-and-content-plan.md."
claude --bg --name audience  "Read core/idea.md. Who visits a founder's site and what they want. Write docs/research/audience-and-goals.md."
```

The four parallel **build** dispatches (Phase 5) — each owns different files, so
they run safely at once in worktrees:

```bash
claude --bg --name build-site    "Build the public site: web/app/page.tsx, layout.tsx, globals.css, from brand/site-copy.md."
claude --bg --name build-booking "Build the booking flow: web/app/book + web/app/api/book + web/lib/slots.ts."
claude --bg --name build-crm     "Build the owner CRM + booking inbox at web/app/admin."
claude --bg --name build-auth    "Build the passcode gate + data layer: web/middleware.ts, web/lib/db.ts, web/app/api/login|logout."
```

---

## 2. Monitor everything — `claude agents`

| Command | What it does |
|---|---|
| `claude agents` | Open **agent view**: a full-screen board of every background session, grouped *Working / Needs input / Ready for review / Completed*, updating live. |
| `claude agents --json` | Print the same as JSON and exit (`pid`, `cwd`, `kind`, `name`, `status`, `sessionId`). **Projector-safe.** Pipe it: `claude agents --json \| python3 -m json.tool`. |
| `claude agents --cwd <path>` | Filter to one project. |
| `claude attach <id>` | Open a background session in this terminal. |
| `claude logs <id>` | Print a session's recent output. |
| `claude stop <id>` | Stop a session (`claude kill <id>` also works). |
| `claude respawn <id>` / `--all` | Restart a session with its conversation intact. |
| `claude rm <id>` | Remove a finished session from the list. |
| `claude daemon status` | Health of the supervisor that hosts background sessions. |

**Agent-view keys (current preview):** `↑/↓` move · `Space` peek (see the last
output or the question it's blocked on; reply inline) · `Enter`/`→` attach ·
`←` detach · `Ctrl+S` group by directory · `Ctrl+T` pin · `Ctrl+R` rename ·
`Ctrl+X` stop (twice = delete) · `?` all shortcuts · `Esc` back to shell.

> **Heads-up:** each background session burns subscription quota **independently** —
> N agents ≈ N× the spend. Keep live fan-outs small (3–4 is plenty for a demo).

### Don't confuse the three look-alikes

| Command | Scope |
|---|---|
| `claude agents` *(shell)* | **Background sessions** across all projects. |
| `/agents` *(in-session)* | The **sub-agent** panel (Running + Library). A *different* thing. |
| `/tasks` *(in-session)* | Background work of **this** session. |

---

## 3. Context — make the invisible visible

| Command | What it does |
|---|---|
| `/context` | Show how full the current context window is (the "fuel gauge"). |
| `/usage` | Show token usage / cost. Use it to prove the cheaper claim. |
| `/clear` | Wipe the conversation and start fresh in the same session. |
| `/statusline` | Set up a custom status line in plain language ("show model, a context % bar, and cost"). |

> **The lesson:** a focused session with the *right* context beats a bloated one —
> and it's cheaper, because you stop re-billing the junk every turn. **Native app:**
> start a *new chat* instead of letting one balloon.

---

## 4. Worktrees — isolate parallel code streams

| Command | What it does |
|---|---|
| `claude -w <name>` (`--worktree`) | Start a session in an **isolated git worktree** under `.claude/worktrees/`. |
| `claude -w <name> --tmux` | Same, in a split tmux pane. |

> Background sessions auto-isolate into a worktree before editing files, so the
> four parallel build agents never clobber each other. **Worktrees are a git
> feature — so this exact tool is code-only.** The *principle* (isolate each
> parallel stream) is what the research fan-out did for non-code work.
>
> ⚠️ Deleting a Claude-created worktree also deletes its **uncommitted** work.

---

## 5. The finale — ship to Vercel + a real database

Run **in this order** (provision the DB and set secrets *before* the first prod
build, so env vars exist):

```bash
cd web
vercel login                 # pre-baked before class
vercel link                  # link this folder to a Vercel project
vercel integration add neon  # provision Neon Postgres + auto-inject DATABASE_URL
vercel env add ADMIN_PASSCODE          # the single owner passcode for /admin
vercel env add ADMIN_SESSION_SECRET    # any long random string
vercel env pull              # pull them into .env.local
vercel build                 # catch errors locally first
vercel deploy --prod         # prints the live https URL
```

Prove the loop: book a slot on the live `/book`, then `/login` → `/admin` and watch
it appear. Or check the DB directly:

```bash
# in the Neon SQL console:
SELECT * FROM bookings ORDER BY created_at DESC;
```

> The Vercel plugin's `/vercel:*` skills (`vercel:marketplace`, `vercel:env`,
> `vercel:deploy`) can drive this from inside Claude — *"watch Claude ship it."*

---

## 6. ⚠️ The calendar caveat (why it's a *ledger item*, not a live beat)

Connecting a real Google/Microsoft calendar means a cloud project, an **OAuth
consent screen** (in "testing" mode until verified — only allow-listed accounts can
connect), **sensitive calendar scopes**, and **redirect URIs** that must match your
deploy URL exactly (and break on every new preview URL). None of that is safe to
wire up live for a room of strangers. So the booking page ships with configured
slots (`web/lib/slots.ts`), and **real calendar sync sits in `TODO.md` as `T-0007`**
— shown as honest backlog, not attempted on stage. Knowing what *not* to demo live
is part of the method.

> **Auth, same spirit:** the demo uses a **single-owner passcode** (`ADMIN_PASSCODE`).
> Real multi-user sign-in (Clerk via the Vercel Marketplace) is `T-0008`.
