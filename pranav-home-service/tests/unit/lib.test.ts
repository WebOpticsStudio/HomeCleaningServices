import { describe, expect, it } from 'vitest';
import { BOOKING_ID_PATTERN } from '@/constants/booking';
import { generateBookingId } from '@/features/booking/server/booking-id';
import { addDaysIso, isValidIsoDate, todayInTimeZone } from '@/lib/date';
import { formatCurrency, formatIsoDate } from '@/lib/format';
import { cn, safeJsonForScript } from '@/lib/utils';

describe('booking ids', () => {
  it('match the public pattern and are unique', () => {
    const ids = new Set(Array.from({ length: 500 }, generateBookingId));
    expect(ids.size).toBe(500);
    for (const id of ids) expect(id).toMatch(BOOKING_ID_PATTERN);
  });
});

describe('date helpers', () => {
  it('validates calendar dates', () => {
    expect(isValidIsoDate('2026-02-28')).toBe(true);
    expect(isValidIsoDate('2026-02-30')).toBe(false);
    expect(isValidIsoDate('02/28/2026')).toBe(false);
  });
  it('adds days across month boundaries', () => {
    expect(addDaysIso('2026-01-30', 3)).toBe('2026-02-02');
  });
  it('uses the requested time zone for "today"', () => {
    const instant = new Date('2026-03-01T20:00:00Z'); // already 2 March in India
    expect(todayInTimeZone('Asia/Kolkata', instant)).toBe('2026-03-02');
    expect(todayInTimeZone('UTC', instant)).toBe('2026-03-01');
  });
});

describe('formatting and utils', () => {
  it('formats rupees without decimals', () => {
    expect(formatCurrency(1499)).toContain('1,499');
  });
  it('formats ISO dates without timezone drift', () => {
    expect(formatIsoDate('2026-11-03')).toMatch(/3 Nov,? 2026/);
  });
  it('joins class names and skips falsy values', () => {
    expect(cn('a', false, undefined, 'b')).toBe('a b');
  });
  it('escapes "<" when embedding JSON in a script tag', () => {
    expect(safeJsonForScript({ x: '</script>' })).not.toContain('</script>');
  });
});
