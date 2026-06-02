# BDR-0001 — Personal site = public front door + private back office

**Status:** accepted
**Date:** 2026-06-03
**Decision owner:** Fernando

## Context

A founder needs a credible front door. A static resume or LinkedIn page is a
brochure — it doesn't capture the relationship after a visit. We have one idea
(`core/idea.md`) and three research briefs (inspiration, IA, audience). The
recurring conclusion: the win is turning a warm visitor into a booked conversation
*and* keeping them.

## Decision

Ship a **one-page public site** (home / about / work) + a public **`/book`** page,
plus a passcode-locked **`/admin`** with a **CRM** and a **booking inbox**. A booking
auto-creates a contact. Lead with the belief; the primary CTA everywhere is
*book time with me*.

## Alternatives considered

- **Static brochure site** — simpler, but the relationship evaporates after a visit.
- **Calendly + a separate CRM** — works, but the demo's whole point is to build the
  loop ourselves and own the data.

## Consequences

- **Auth:** single-owner passcode for now; multi-user (Clerk) is `T-0008`.
- **Booking:** uses configured slots; real Google Calendar sync is `T-0007` —
  deliberately not built live (OAuth consent + redirect-URI fragility).
- Every public claim about the owner must trace to `proof-points.md`.

## Supersedes / superseded by

- Supersedes: none
- Superseded by: none — current
