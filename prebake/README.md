# prebake/ — deterministic fallbacks

> **Why this exists:** the demo is live, but live model output varies run to run.
> These are ready-made, rehearsed versions of *everything* the agents produce, so
> a slow or wandering agent never stalls the talk.

## How to use it on stage

- **Happy path:** ignore this folder. Let the live agents write the real files
  into `docs/research/`, `brand/`, and `DECISIONS/`.
- **If an agent stalls or wanders:** drop the matching fallback into place and
  keep moving. Nobody can tell.

```bash
# research stalled?
cp prebake/research/*.md docs/research/

# canon synthesis wandered?
cp prebake/brand/*.md brand/
cp prebake/DECISIONS/BDR-0001-name-and-category.md DECISIONS/

# copy step wandered?
cp prebake/landing-copy.md brand/landing-copy.md
```

## It's also the answer key

Take-home users can read these to see *what good looks like* before driving their
own run. They mirror the real Memori canon's structure: research → positioning +
voice + vocabulary + proof-points → a decision record → copy.

> **The planted trap (see `RUNSHEET.md`, beat 7):** `proof-points.md` is the
> source of truth for every public claim. During the demo, one copy agent is
> nudged into writing an *unsourced* stat; a verification pass catches it because
> it doesn't trace to a row here. The clean `landing-copy.md` below is already
> trap-free.
