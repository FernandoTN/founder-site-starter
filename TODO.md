# TODO — Sprout

> The **ledger**. Every piece of work lives here and moves through the sections
> below until it reaches **Done**. This is the spine of the whole method: you
> never lose track of what's in flight, and the repo is always an honest picture
> of the work.
>
> Sections: **Now** (claimed, active) · **In Progress** (being executed) ·
> **Next** (queued, dependencies noted) · **Done** (shipped).

---

## Now

- **T-0001-SPROUT-LAUNCH** — Take Sprout from a one-line idea to a live waitlist.
  *(Complex — spans research, brand, copy, build, and ship.)*
  - **Input:** [`core/idea.md`](core/idea.md)
  - **Definition of done:** a brand canon in `brand/`, ship-ready landing copy,
    a deployed page at a public URL, and at least one real signup persisted in a
    cloud database — with every public claim traceable to `brand/proof-points.md`.

## In Progress

_(empty — the demo moves T-0001 here when work starts)_

## Next

_(empty — running `/orchestrate` decomposes T-0001 into the queue below)_

## Done

_(empty — every phase lands here by the end of the hour)_

---

## What `/orchestrate` will do to this ledger (live)

Running `/orchestrate T-0001-SPROUT-LAUNCH` classifies the task as **Complex**
and decomposes it into a plan. As each phase runs, its item appears here and then
moves to **Done**:

1. **`T-0002` Research** *(parallel)* — market scan, competitor teardown,
   audience persona → `docs/research/`.
2. **`T-0003` Brand canon** *(sequential — depends on T-0002)* — positioning,
   voice, vocabulary, proof-points → `brand/` + a BDR in `DECISIONS/`.
3. **`T-0004` Landing copy** *(sequential — depends on T-0003)* → `brand/landing-copy.md`.
4. **`T-0005` Build the page** *(parallel via worktrees)* → `web/`.
5. **`T-0006` Verify + ship** *(sequential)* — review, second-model check,
   deploy to Vercel + connect the database.

> **Parallel vs sequential is the lesson.** T-0002 fans out (independent breadth).
> T-0003 waits for all of T-0002 (you can't write the canon until the research is
> in). Calling out *why* each step is one or the other is the point — not an accident.
