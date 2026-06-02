# prebake/ — deterministic fallbacks

> **Why this exists:** the demo is live, but live model output varies run to run.
> These are ready-made, rehearsed versions of *everything* the agents produce, so
> a slow or wandering agent never stalls the talk.

## How to use it on stage

- **Happy path:** ignore this folder. Let the live agents write into
  `docs/research/`, `brand/`, and `DECISIONS/`.
- **If an agent stalls:** drop the matching fallback in and keep moving.

```bash
cp prebake/research/*.md docs/research/                 # research stalled
cp prebake/brand/*.md brand/                            # canon wandered
cp prebake/DECISIONS/*.md DECISIONS/
cp prebake/site-copy.md brand/site-copy.md              # copy wandered
# the finished web/ app is already in the repo — `cd web && npm run dev` always works
```

## It's also the answer key

Take-home users can read these to see *what good looks like* before driving their
own run. They mirror the real Memori canon's structure: research → positioning +
voice + vocabulary + proof-points → a decision record → copy.

## The planted trap (RUNSHEET beat 7)

`brand/proof-points.md` is the source of truth for every public claim about the
owner. During the demo, a draft copy line sneaks in an **inflated, unsourced
claim**; the verification pass (`/checkImplement claims`) catches it because it
doesn't trace to a row. The clean `site-copy.md` here is already trap-free.

## Seed data

`seed-data.md` has fictional CRM contacts + the SQL to load them, so `/admin`
isn't empty when you first open it. **Use fictional contacts only — never real
attendee PII on stage.**
