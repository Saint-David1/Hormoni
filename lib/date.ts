// Formats a Date as YYYY-MM-DD using local calendar fields, not UTC —
// `date.toISOString().split('T')[0]` shifts the date by a day for anyone
// whose local time has already crossed midnight relative to UTC (or hasn't yet).
export function toLocalDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
