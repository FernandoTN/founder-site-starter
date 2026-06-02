# Seed data — fictional CRM contacts

> **Use fictional contacts only. Never real attendee PII on stage.** This makes
> `/admin` look alive on first open, before any live booking lands.

Load into Neon (SQL console, or `psql "$DATABASE_URL" -f`…):

```sql
INSERT INTO contacts (name, email, company, note, source) VALUES
  ('Dana Lim',     'dana@example.com',   'Northwind Ventures', 'Met at the AI dinner; wants a Memori demo', 'manual'),
  ('Marcus Reed',  'marcus@example.com', 'Reed & Co',          'Intro from GSB; exploring a pilot',          'manual'),
  ('Priya Nair',   'priya@example.com',  'Independent',        'Writing a piece on AI memory',               'manual')
ON CONFLICT (email) DO NOTHING;
```

## Reset for a fresh rehearsal

```sql
TRUNCATE bookings, contacts;
-- then re-run the INSERT above
```

## Slots

The slots shown on `/book` are configured in `web/lib/slots.ts` — static and
timezone-free, so nothing wobbles on stage. Real calendar free/busy is `T-0007`.
