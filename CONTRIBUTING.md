# Contributing

This is a teaching repo, but it follows real conventions — they're part of the lesson.

## Workflow

1. Every change starts as an item in [`TODO.md`](TODO.md) (the ledger).
2. Branch per item: `feat/T-####`, `fix/T-####`, `docs/T-####`, `chore/T-####`.
3. Make a small, focused change. Keep the diff readable.
4. Move the ledger item toward *Done* in the same change.

## Commits

- [Conventional Commits](https://www.conventionalcommits.org/): `feat | fix | docs | chore | refactor` with a scope.
- Reference the TODO ID: `feat(brand): lock Sprout positioning [T-0003]`.
- **Never** credit an AI tool as author or co-author. No `Co-Authored-By` bot lines, no "Generated with…" footers. Commits read as human work.

## Content rules

- Information flows `core/ → brand/ → web/`. Upstream wins.
- Every public-facing claim must trace to a row in `brand/proof-points.md`. No invented stats.
- Lock strategic choices (name, category, pricing) with a Decision Record in `DECISIONS/`.

## Code (the `web/` app)

- TypeScript strict; small components.
- Don't commit secrets. `DATABASE_URL` comes from `vercel env pull`, never hand-edited into a committed file.
