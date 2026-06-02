# Run-sheet — *The One-Hour Personal Site*

> The presenter's script. 45–60 min, **demo-led** (you drive; the room watches and
> gets the repo to try later). Every beat lists what to **DO**, what to **SAY**, and
> a **FALLBACK** so nothing can stall you. Pre-bake everything in §Pre-flight.

**The spine:** one idea → a ledger → research (parallel) → identity (sequential) →
build four surfaces (parallel, worktrees) → ship → and an honest backlog of what
you *chose not to build live*.

---

## Pre-flight (do the night before)

- [ ] `git -C ~/Projects/founder-site-starter reset --hard demo-start` to get a clean start state. (Re-tag with `git tag -f demo-start` after any prep commits.)
- [ ] Vercel pre-authed: `vercel login`, and the project linked once (`vercel link`).
- [ ] **Neon already provisioned once** (`vercel integration add neon`) and `ADMIN_PASSCODE` + `ADMIN_SESSION_SECRET` set (`vercel env add …`), then `vercel env pull` into `web/.env.local`. Provisioning is the slow part — never do it cold on stage.
- [ ] `cd web && npm install && npm run build` once — confirm green. (Verified: builds clean with no DB.)
- [ ] A **screen recording** of the full happy path as the ultimate fallback.
- [ ] Status line on (model · context % · session · cost). Font size up. `claude agents` tested.
- [ ] Seed a couple of **fictional** CRM contacts (`prebake/seed-data.md`) so `/admin` isn't empty on first open.
- [ ] Optional authenticity bookend: one of your own real working repos open read-only (your real ledger + decision records) + any site you've already shipped, ready in a second window.

**Reset between rehearsals:** `git reset --hard demo-start` · drop demo rows: `TRUNCATE bookings, contacts;` (then re-seed) · `claude stop --all` (clear the agents board).

---

## Beat 1 — The cockpit + the thesis · ~3 min
- **DO:** Show the IDE. Point at the **status line** — model, the context **fuel gauge**, cost.
- **SAY:** *"I'm not going to type clever prompts into one giant chat. I'm going to run a small team of AI agents the way you'd run people — off one source of truth, with a ledger, monitored from one screen. This works for a memo or a market model just as well; today it happens to build a website."*
- **SAY (inclusive):** *"App, Cowork, Codex, terminal — same method, different cockpit. The terminal just gives me the most dials: that status line, custom commands, parallel agents, worktrees."*
- **FALLBACK:** none needed — this is talking.

## Beat 2 — The ledger + one idea → `/orchestrate` · ~4 min
- **DO:** Open `TODO.md`. Show *Now* = `T-0001`. **Point at *Next*** — `T-0007 Google Calendar`, `T-0008 multi-user`. Type the one-line idea into `core/idea.md`. Run `/orchestrate T-0001-SITE-LAUNCH`.
- **SAY:** *"One idea. Notice what's already in 'Next' — connecting my real calendar, real multi-user logins. I'm deciding up front NOT to build those live, and writing that down. The ledger is honest about what we're skipping."*
- **DO:** Watch `/orchestrate` classify it **Complex**, write a plan, and populate the ledger with `T-0002…T-0006`.
- **FALLBACK:** if the command wanders, `cp` the plan from `prebake/` and read the decomposition off `TODO.md`.

## Beat 3 — Parallel research (the fan-out) · ~6 min
- **DO:** Fire the three research dispatches (`claude --bg --name site-scan …`, `ia-plan`, `audience` — see `COMMANDS.md §1`). Switch to **`claude agents`**. Watch three sessions run **at once**. `Space` to peek one.
- **SAY:** *"Three independent jobs, three separate sessions — each with its own clean context window. This is parallel-because-independent. None of them needs the others."*
- **FALLBACK:** `cp prebake/research/*.md docs/research/` and talk over it. Or show the recording of the board.

## Beat 4 — Context discipline (the money shot) · ~4 min
- **DO:** On the orchestrator session run `/context` (lean). Contrast: *"if I'd done all of this in one chat, this bar would be jammed — slower, dumber, and I'd re-pay for the clutter every turn."* Show `claude agents --json | python3 -m json.tool` to prove the board is real data.
- **SAY:** *"The whole game is giving each step exactly the context it needs — no more. That's cheaper AND it produces better work. In the app, the move is the same: a fresh chat per task."*
- **FALLBACK:** `/context` always works; skip the json if offline.

## Beat 5 — Sequential synthesis (the canon) · ~3 min
- **DO:** Now run the identity step — it **waits** for all three briefs, then writes `brand/positioning.md`, `voice-and-tone.md`, `proof-points.md` + a decision record.
- **SAY:** *"This one is sequential — it literally can't start until the research lands. Parallel where independent, sequential where dependent. Knowing which is which is the skill."*
- **FALLBACK:** `cp prebake/brand/*.md brand/ && cp prebake/DECISIONS/*.md DECISIONS/`.

## Beat 6 — The four-way parallel build (HEADLINE) · ~8 min
- **DO:** Fire the four build dispatches (public site / booking / CRM / auth+data — `COMMANDS.md §1`). Switch to `claude agents`: **four agents building four features at once**, each in its own worktree.
- **SAY:** *"Four features, four agents, four isolated git worktrees — so they can't overwrite each other. They merge into one site. This is the thing people think you can't do with AI. You can — if you give each one a clean lane and the right context."*
- **DO:** When they finish, merge; run the site locally (`npm run dev`) to show it real.
- **FALLBACK:** the finished `web/` is already in the repo — just `npm run dev` and narrate what the agents did.

## Beat 7 — Verify + the planted trap · ~4 min
- **DO:** Run `/checkImplement claims`. It catches a line in the draft copy that claims something about you with **no proof-point to back it** (see the trap in `prebake/brand/proof-points.md`). Cut it.
- **SAY:** *"A personal site is a trust document. Every claim about me has to trace to a source. The verifier just caught an inflated line — exactly the kind of thing that erodes credibility. Same discipline Memori runs on every public word."* (Mention a second-model/Codex pass as the "independent reviewer.")
- **FALLBACK:** show the trap line and the proof-points table side by side; explain the catch.

## Beat 8 — Ship + the wow · ~6 min
- **DO:** `vercel deploy --prod` (env + Neon pre-baked). Open the live URL. Have **an audience member book a slot** on `/book`. Then `/login` (passcode) → `/admin` — **their booking is sitting in your CRM** on the projector.
- **SAY:** *"Real URL, real database. Someone in this room just created a row that showed up in my private back office. Public face, private back office, one hour."*
- **FALLBACK:** if deploy wobbles, open the pre-deployed URL you shipped last night; book on that. Or play the recording.

## Beat 9 — The deferred backlog + close · ~3 min
- **DO:** Back to `TODO.md` *Next*. Point at `T-0007 Google Calendar`.
- **SAY:** *"Here's the judgment call. Real calendar sync needs OAuth consent screens, sensitive scopes, redirect URIs that break on every URL — fragile and slow to verify. So it lives here, in the backlog, not in my live demo. Deciding what NOT to automate on stage is as important as the automation. The ledger remembers it for me."*
- **SAY (close):** *"One idea, a ledger, a team of agents on one screen, the right context at each step — a live site with a private CRM in under an hour. The repo's public; go point it at yourself."*

---

## Appendix A — Authenticity bookend (~90s, optional, READ-ONLY)

Open one of your own real working repos read-only: your actual `TODO.md` ledger,
your decision records, your live status line; then a product you've already shipped.
*"This isn't a toy I built for class — it's how I actually work. This site is the
same machine, shrunk to fit an hour."* **Never** run a live mutating `/orchestrate`
against a real or private repo on stage; switch back to this repo for edits.

## Appendix B — Fallback drops (when a live agent stalls)

```bash
cp prebake/research/*.md docs/research/          # research stalled
cp prebake/brand/*.md brand/                     # canon wandered
cp prebake/DECISIONS/*.md DECISIONS/
cp prebake/site-copy.md brand/site-copy.md       # copy wandered
# the finished web/ is already in the repo — `cd web && npm run dev` always works
```
