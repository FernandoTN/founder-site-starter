/**
 * Configured availability for the public booking page.
 *
 * For the demo these are a simple static list — deterministic and timezone-free,
 * so nothing wobbles on stage. In production this is replaced by real calendar
 * free/busy (see ../../TODO.md, item T-0007 "connect Google Calendar").
 */
export function availableSlots(): string[] {
  return [
    "Mon 10:00",
    "Mon 14:30",
    "Tue 09:30",
    "Tue 16:00",
    "Wed 11:00",
    "Wed 15:30",
    "Thu 13:00",
    "Fri 10:30",
  ];
}
