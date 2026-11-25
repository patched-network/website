// Posts before this date get the "archived" note. Move it forward if the line should shift.
export const HISTORICAL_BEFORE = '2026-01-01';

export function fmtDate(iso: string): string {
  if (!iso) return 'undated';
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
