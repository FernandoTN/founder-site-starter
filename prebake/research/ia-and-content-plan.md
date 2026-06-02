# Information architecture + content plan

**Written by:** `ia-plan` agent · **Source:** `core/idea.md`
**Status:** working draft

## Sitemap

```
/            home — hero · about · work · footer
/book        public booking — pick a slot, leave details
/login       owner passcode
/admin       PRIVATE — booking inbox + CRM (behind /login)
```

## Per-section content plan

| Section | Job | Content |
|---|---|---|
| Hero | Say who you are + one belief + one action | Name, "Founder & CEO, Memori", a one-line belief, **Book time** button |
| About | Earn trust in 3–4 sentences | First person; what you build; Stanford GSB Sloan Fellow ('26); the mission; *(placeholder: prior roles)* |
| Work | Show, don't tell | 3 cards: Memori; Writing & talks; Previously *(placeholders)* |
| Footer | Quiet doors | Book link; a discreet Admin link to `/login` |
| /book | Convert intent to a booking | Slot picker, name, email, optional message → confirmation |
| /admin | Run your relationships | Booking inbox (newest first) + CRM table |

## Build order (maps to the parallel units)

5a public site · 5b booking · 5c CRM/admin · 5d auth + data layer. Independent
files → built in parallel worktrees, merged.

## Deferred (TODO Next)

Real calendar free/busy on `/book` (T-0007); multi-user accounts (T-0008); booking
confirmation emails (T-0009).
