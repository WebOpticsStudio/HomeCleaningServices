import { describe, expect, it } from 'vitest';
import { siteConfig } from '@/config/site';
import { addDaysIso, todayInTimeZone } from '@/lib/date';
import {
  bookingSubmissionSchema,
  getBookingDateError,
} from '@/features/booking/schemas/booking.schema';
import { isValidPhone, normalizePhone } from '@/features/booking/lib/normalize';

const today = todayInTimeZone(siteConfig.timezone);

const valid = {
  name: 'Asha Rao',
  phone: '98765 43210',
  email: '',
  serviceSlug: 'deep-cleaning',
  preferredDate: addDaysIso(today, 3),
  timeSlot: '10:00-12:00',
  propertyType: 'apartment',
  address: '12 Lake View Apartments, Indiranagar, Bengaluru',
  instructions: '',
  consent: true,
  idempotencyKey: '6f1c2d6e-8d7a-4f0b-9a55-0d6a1d0f4c11',
};

describe('bookingSubmissionSchema', () => {
  it('accepts a valid booking', () => {
    expect(bookingSubmissionSchema.safeParse(valid).success).toBe(true);
  });

  it.each([
    ['unknown service', { serviceSlug: 'window-washing' }],
    ['past date', { preferredDate: addDaysIso(today, -1) }],
    ['date too far ahead', { preferredDate: addDaysIso(today, 400) }],
    ['invalid date', { preferredDate: '2026-02-31' }],
    ['bad phone', { phone: '12345' }],
    ['bad email', { email: 'not-an-email' }],
    ['short address', { address: 'Home' }],
    ['missing consent', { consent: false }],
    ['bad idempotency key', { idempotencyKey: 'abc' }],
    ['unknown time slot', { timeSlot: '23:00-24:00' }],
  ])('rejects %s', (_label, override) => {
    expect(bookingSubmissionSchema.safeParse({ ...valid, ...override }).success).toBe(false);
  });

  it('allows an optional email when valid', () => {
    expect(bookingSubmissionSchema.safeParse({ ...valid, email: 'asha@example.com' }).success).toBe(
      true,
    );
  });
});

describe('getBookingDateError', () => {
  it('allows today in the business time zone', () => {
    expect(getBookingDateError(today)).toBeNull();
  });
});

describe('phone helpers', () => {
  it('normalizes Indian numbers to E.164', () => {
    expect(normalizePhone('98765 43210')).toBe('+919876543210');
    expect(normalizePhone('+91-98765-43210')).toBe('+919876543210');
    expect(normalizePhone('0919876543210'.replace(/^0/, '+'))).toBe('+919876543210');
  });
  it('rejects Indian numbers that cannot exist', () => {
    expect(isValidPhone('1234567890')).toBe(false);
    expect(isValidPhone('9876543210')).toBe(true);
  });
});
