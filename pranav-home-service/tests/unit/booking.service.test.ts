import { ZodError } from 'zod';
import { describe, expect, it, vi } from 'vitest';
import { siteConfig } from '@/config/site';
import { addDaysIso, todayInTimeZone } from '@/lib/date';
import type { BookingRepository } from '@/features/booking/server/booking.repository';
import { createBookingService } from '@/features/booking/server/booking.service';

const input = {
  name: '  Asha   Rao ',
  phone: '98765 43210',
  email: 'Asha@Example.com',
  serviceSlug: 'home-cleaning',
  preferredDate: addDaysIso(todayInTimeZone(siteConfig.timezone), 2),
  timeSlot: '08:00-10:00',
  propertyType: 'villa',
  address: '  7 Palm Grove,   Whitefield, Bengaluru ',
  instructions: '',
  consent: true,
  idempotencyKey: '6f1c2d6e-8d7a-4f0b-9a55-0d6a1d0f4c11',
  packageId: 'standard',
};

function setup() {
  const repository: BookingRepository = {
    create: vi.fn(async (booking) => ({ bookingId: booking.bookingId, duplicate: false })),
    findSummaryById: vi.fn(async () => null),
  };
  const service = createBookingService({
    repository,
    hash: (value) => `hash(${value})`,
    generateId: () => 'PHS-TESTTESTTE',
  });
  return { repository, service };
}

describe('booking service', () => {
  it('normalizes input and stores it with hashed dedupe keys', async () => {
    const { repository, service } = setup();
    const result = await service.submit(input, { ipHash: 'iphash' });

    expect(result).toEqual({ bookingId: 'PHS-TESTTESTTE', duplicate: false });
    const [booking, dedupe] = vi.mocked(repository.create).mock.calls[0]!;
    expect(booking.customer).toEqual({
      name: 'Asha Rao',
      phone: '+919876543210',
      email: 'asha@example.com',
    });
    expect(booking.property.address).toBe('7 Palm Grove, Whitefield, Bengaluru');
    expect(booking.instructions).toBeNull();
    expect(booking.packageId).toBe('standard');
    expect(booking.ipHash).toBe('iphash');
    expect(dedupe.idempotencyKey).toContain('hash(idem:');
    expect(dedupe.fingerprint).toContain('+919876543210|home-cleaning');
  });

  it('throws a ZodError for invalid input and stores nothing', async () => {
    const { repository, service } = setup();
    await expect(service.submit({ ...input, phone: '1' }, { ipHash: null })).rejects.toBeInstanceOf(
      ZodError,
    );
    expect(repository.create).not.toHaveBeenCalled();
  });

  it('silently drops submissions that fill the honeypot', async () => {
    const { repository, service } = setup();
    const result = await service.submit(
      { ...input, website: 'http://spam.example' },
      { ipHash: null },
    );
    expect(result.duplicate).toBe(false);
    expect(repository.create).not.toHaveBeenCalled();
  });

  it('passes through duplicate results from the repository', async () => {
    const { repository, service } = setup();
    vi.mocked(repository.create).mockResolvedValueOnce({
      bookingId: 'PHS-EXISTING00',
      duplicate: true,
    });
    await expect(service.submit(input, { ipHash: null })).resolves.toEqual({
      bookingId: 'PHS-EXISTING00',
      duplicate: true,
    });
  });
});
