# TODO — the ledger

> Single source of truth for all work. Every item is a `### T-ID — title` heading
> under exactly one section below. `/orchestrate` reads this file, claims an item
> (**Now**, or a ready **Next** item → **In Progress**), and moves it to **Done**
> when it ships. Keep the section headings exactly as written — the skills parse them.
>
> **Sections (in order):**
> **Now** (claimed / ready to start) · **In Progress** (executing) ·
> **Next** (queued; dependencies noted) · **Backlog** (unscheduled) ·
> **Parked** (blocked — say why) · **Done** (shipped) ·
> **Archived Phases** (swept history).
>
> **Item fields** — optional `- **Field:** value` bullets under each `### T-ID`:
> `Owner` · `Branch` (target git branch; if omitted the orchestrator derives
> `feat|fix/T-{ID}`) · `Kind` (`feat|fix|chore|docs|refactor|test`) · `Files` ·
> `Depends on` · `Parallelizable with`.

---

## Now

### T-0001-EXAMPLE — Replace this with your first real task
- **Kind:** feat
- **Owner:** TBD
- **Input:** [`core/idea.md`](core/idea.md)
- **Scope:** One sentence describing what this delivers.
- **Acceptance:**
  - [ ] Criterion 1
  - [ ] Criterion 2

## In Progress

_(empty — `/orchestrate` moves the claimed item here, then back out to Done)_

## Next

> Deliberately deferred work. Note each item's dependency and a one-line reason.

### T-0002-EXAMPLE — A follow-up that depends on the first
- **Depends on:** T-0001-EXAMPLE
- **Why deferred:** one-line reason it isn't being done now.

## Backlog

_(unclaimed, not yet scheduled)_

## Parked

_(blocked or intentionally paused — note why)_

## Done

> Shipped items land here, newest first. Each Done entry carries:
> `- **Completed:** YYYY-MM-DD` · `- **Plan:** [archived](docs/plans/archivedPlans/T-{ID}.md)` · `- **Result:** one-line summary`.

_(empty)_

## Archived Phases

_(older Done items are swept here over time)_
