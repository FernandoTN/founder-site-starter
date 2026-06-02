# Run-sheet — *The One-Hour Founder*

> **Thesis (say it twice — top and tail):** *"You don't manage AI by typing into
> one giant chat. You manage it like a team: a single source of truth, a ledger,
> one focused session per task, parallel where you can, sequential where you must
> — and one screen to watch it all."*
>
> **Format:** demo-led. You drive; the room watches. They get this repo to
> reproduce it later.
>
> **Two time-boxes — decide on the day by the clock:**
> - **~45 min** — stop at Beat 9 (closed ledger). *Finale dropped.*
> - **~52 min** — include Beat 8 (Vercel + Neon).

---

## Pre-flight (the night before + 10 min before)

- [ ] `claude --version` → **2.1.160** (agent view needs ≥ 2.1.139; it's a research preview — don't promise the key bindings are permanent).
- [ ] `git -C ~/Projects/sprout-starter reset --hard demo-start` to restore a clean stage. (Tag created at build time.)
- [ ] Terminal: huge high-contrast font, wide window (agent-view rows + status line must read from the back row). Secrets scrubbed.
- [ ] Confirm your global **status line** renders (model · context % · cost). Do **not** let the project override it.
- [ ] `claude daemon status` healthy. Know the recovery: `claude daemon stop --any --keep-workers`.
- [ ] **Finale only:** `vercel whoami` on the right team; the **first-ever** `vercel integration add neon` already done on the demo account (terms accepted); `vercel build` run once locally; `web/npm install` done.
- [ ] Stage the bloated **"kitchen-sink"** session for the context A/B (Beat 4) — one session that already ingested all of `prebake/` + a few junk questions, so `/context` reads near-full on demand.
- [ ] Have the **90-second screen recording** of the full happy path open in a hidden tab as the master fallback.
- [ ] Optional authenticity bookend: one of your own real working repos open read-only (your real ledger + decision records) + any site you've already shipped, ready in a second window.

---

## Beat 1 — Cold open: the thesis + the cockpit · `seq · 4 min`

**GOAL:** establish the ledger and the cockpit before anything moves.

- **DO:** open `sprout-starter/` in the IDE. Open `TODO.md` — one item in *Now*: `T-0001-SPROUT-LAUNCH`. Point at your **status line** (model · context-% fuel gauge · session).
- **SAY:** *"One idea. One founder. A team of agents. A single source of truth. That bar at the bottom — the context gauge — watch it all hour; it's half the lesson."*
- **SHOW:** the empty ledger; the idea file; the status line.
- *(Optional ~30s authenticity bookend here or at the close — see Appendix A.)*

## Beat 2 — Seed the idea, run /orchestrate, watch the ledger fill · `seq · 4 min`

**GOAL:** one complex task becomes a tracked, ordered plan.

- **DO:** type the one line into `core/idea.md` live. Run `/orchestrate T-0001-SPROUT-LAUNCH`.
- **SAY:** *"I'm not asking it to 'build a startup.' I'm asking it to plan — decompose one big task into units, and tell me which can run at once and which have to wait."*
- **SHOW:** `TODO.md` filling: T-0002 research (parallel) → T-0003 canon → T-0004 copy → T-0005 build → T-0006 ship; `depends on` notes visible.
- **FALLBACK:** if the plan wanders, narrate the table in `TODO.md` ("What `/orchestrate` will do") — it's already written.

## Beat 3 — Parallel research fan-out + the live monitor 🔥 · `parallel · 9 min`

**GOAL:** the money shot — a team of agents working at once, watched on one screen.

- **DO:** dispatch three background sessions (copy from `COMMANDS.md` §1):
  ```bash
  claude --bg --name market-scan        "Read core/idea.md. Research the plant-care market… write docs/research/market-scan.md"
  claude --bg --name competitor-teardown "Read core/idea.md. Tear down Planta and Greg… write docs/research/competitor-teardown.md"
  claude --bg --name audience-persona   "Read core/idea.md. Define the target user… write docs/research/audience-persona.md"
  ```
  Then switch to a clean full-screen terminal: `claude agents`.
- **SAY:** *"Three independent jobs, so three sessions at once — each with its own context window. This board is every agent I have running, anywhere."*
- **SHOW:** the agent-view board (Working / Needs input / Completed) updating live. **Peek-and-reply:** arrow to the pre-arranged yellow *Needs input* row → `Space` to peek the question → type one line → `Enter`. It resumes without you leaving the monitor.
- **PROVE IT'S REAL:** drop to a pane → `claude agents --json | python3 -m json.tool` (pid/cwd/name/status).
- **SAY (cost caveat, out loud):** *"Each of these burns quota independently — three agents, ~3× the spend. Parallelism is power; it isn't free."*
- **FALLBACK:** if the TUI misbehaves on the projector, use the `--json` view + `claude logs <id>`. If an agent stalls: `cp prebake/research/*.md docs/research/` and move on.

## Beat 4 — The context lesson (A/B money shot) · `seq · 5 min`

**GOAL:** make "right context at the right step" visceral — and prove it's cheaper.

- **DO:** in the main session, `/context` — it barely moved (the agents returned ~1–2K-token summaries; their heavy reading stayed in their own windows). Then the **A/B**: flip to the pre-staged **kitchen-sink** session (`/context` near full) and ask it the financials/positioning question → muddy answer. Flip to a focused session that saw one file → `/clear` + a tight prompt → crisp answer. Run `/usage` on both.
- **SAY:** *"More context is not better. A clean session with the right context beats a bloated one almost every time — and it's cheaper, because you stop re-billing the junk on every turn."*
- **SHOW:** the three look-alikes so nobody conflates them: `claude agents` (background sessions) vs `/agents` (in-session sub-agents) vs `/tasks` (this session's background work).
- **FALLBACK:** the kitchen-sink session is pre-staged precisely so the "bad" answer is reproducible.

## Beat 5 — Synthesize the brand canon (no code yet) · `seq · 7 min`

**GOAL:** prove this is *not just coding* — pure strategy, on screen.

- **DO:** a fresh, focused session reads the three briefs and writes `brand/positioning.md`, `voice-and-tone.md`, `product-vocabulary.md`, `proof-points.md`, then records `DECISIONS/BDR-0001` locking the name **Sprout** and the category **plant-care sidekick**. Research TODOs → *Done*.
- **SAY:** *"Not one line of code yet. This is positioning, voice, a competitive call, a decision record — the work a strategist, a marketer, a PM does. Same method."*
- **SHOW:** the canon files appear; `proof-points.md` — *"this table is now the source of truth for every public claim."*
- **FALLBACK:** `cp prebake/brand/*.md brand/ && cp prebake/DECISIONS/*.md DECISIONS/`.

## Beat 6 — Parallel build via git worktrees · `parallel · 8 min`

**GOAL:** parallelism for code — and the honest generalization.

- **DO:** from the locked canon, fan the build across isolated worktrees: one session writes `brand/landing-copy.md` from the canon; another scaffolds `web/` in a worktree (`claude -w build-page`). Status line shows the worktree branch.
- **SAY:** *"Worktrees are a git feature, so this exact tool is code-only — I'll say that plainly. But the principle — isolate each parallel stream so they can't clobber each other — is exactly what the three research agents did on plain documents."*
- **SHOW:** `.claude/worktrees/` exists; two streams writing without collision.
- **FALLBACK:** show a single pre-scaffolded worktree instead of a live three-way fan if behind. (The `web/` app already exists in the repo as the safety net.)

## Beat 7 — Verify + second model + "different cockpit" · `seq · 5 min`

**GOAL:** the source-of-truth payoff (planted-trap catch) + the inclusive message.

- **DO:** run a verification pass: *"does every claim in the copy trace to a row in `proof-points.md`?"* The **planted trap** (see Appendix B): one draft slipped in an unsourced stat ("X% of plants die from overwatering"). The pass **catches it** — no proof-point row → cut it. Optionally kick the same check to **Codex** as an independent second model (`codex` is installed).
- **SAY:** *"This is why the repo exists. The agent wanted to sound impressive; the canon wouldn't let it. A single source of truth turns 'trust me' into 'prove it.'"*
- **SHOW:** the 3-column **"Same methodology, different cockpit"** slide (Appendix C): native app / Cowork · Claude Code (IDE) · OpenAI Codex.
- **SAY (inclusive):** *"The method is tool- and model-agnostic. If you live in the Claude app or Cowork, you get 90% of this with zero setup. The terminal adds a status line, custom commands, worktrees. Use the cockpit that fits you."*

## Beat 8 — OPTIONAL FINALE: ship to Vercel + a real database · `seq · 7 min`

**GOAL:** idea → live, with persistence. The closing wow.

- **DO (in `web/`, this exact order):**
  ```bash
  vercel link
  vercel integration add neon     # one command → cloud Postgres + secrets auto-wired
  vercel env pull
  vercel deploy --prod            # prints the live https URL
  ```
  Open the live `*.vercel.app`, submit a real signup, watch the page say *"you're #1"*, then `SELECT count(*) FROM waitlist;` in the Neon console.
- **SAY:** *"One command conjured a real cloud database and wired the secrets. The email I just typed is now a row in Postgres — not in memory, in production."*
- **FALLBACK:** if anything wobbles: narrate the 90-second recording, or open any site you've already shipped. The whole beat is droppable.

## Beat 9 — Close the ledger; hand out the take-home · `seq · 3 min`

**GOAL:** name the durable asset and send them home able to do it.

- **DO:** show `TODO.md` — everything in *Done*.
- **SAY:** *"The asset isn't the page. It's the repo. Sprout now has a constitution — every future ad, email, and deck traces back to it, the same way every Memori statement traces to our Core Statement. I built this in an hour, watching a team of agents, from one screen."*
- **HAND-OFF:** point to the public `sprout-starter` repo + `COMMANDS.md`. *"Non-coders: open the Claude app, a fresh chat per task, follow the cheat-sheet. Engineers: clone it and run."*

---

## If running long (cut in this order)

1. Drop Beat 8 (finale) → land at ~45.
2. Beat 6: one pre-scaffolded worktree instead of a live three-way fan.
3. Beat 4: skip `/usage`, keep the `/context` A/B.
4. Beat 3: skip the `--json` proof if the board clearly landed.

## Recurring risks → mitigations (keep in your pocket)

- **Agent view is a preview** → present on 2.1.160; `--json` + `claude logs/attach/stop` are the projector-safe fallback.
- **Quota ~N×** → keep the fan to 3; say it out loud as a teaching point.
- **Non-determinism** → the *Needs input* question, the kitchen-sink answer, and the planted trap are all pre-staged; `prebake/` covers stalls.
- **Mixed-technical room** → lead every beat with a visual; keep mechanism as optional "for the engineers" asides; restate the non-coder takeaway at the close.

---

## Appendix A — Authenticity bookend (~90s, optional, READ-ONLY)

Open one of your own real working repos read-only: your actual `TODO.md` ledger,
your decision records, your live status line; then a product you've already shipped.
*"This isn't a toy I built for class — it's how I actually work. Sprout is the same
machine, shrunk to fit an hour."* **Never** run a live mutating `/orchestrate`
against a real or private repo on stage; switch back to Sprout for edits.

## Appendix B — The planted trap (seed before Beat 7)

In the live copy draft (or a staged one), include a sentence with an **unsourced
statistic**, e.g. *"73% of houseplants die from overwatering."* It is deliberately
**absent** from `brand/proof-points.md`. The verification pass should flag it and
cut it. If live wording varies, point to the proof-points rule and make the catch
by hand — the lesson is the rule, not the exact number.

## Appendix C — "Same methodology, different cockpit" (one slide)

| Native Claude app / **Cowork** | **Claude Code** (IDE/terminal) | **OpenAI Codex** (CLI) |
|---|---|---|
| Zero setup, plain language | Configurable status line, Skills | A capable peer — TUI, MCP, review agent |
| New chat per task = context isolation | Custom slash commands, worktrees | Hooks, approval modes, cloud tasks |
| The right *first* tool for most of the room | Full filesystem, the `claude agents` monitor | (No configurable status line that I'm aware of) |

**One honest line:** don't claim hooks/MCP/sub-agents are Claude-Code-exclusive —
they aren't. The genuine edges are the **configurable status line**, **Skills**,
and in-product **worktree** surfacing.
