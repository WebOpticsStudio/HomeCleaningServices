import { bookingSubmissionSchema } from '../schemas/booking.schema';
import { collapseWhitespace, normalizePhone } from '../lib/normalize';
import type { BookingSummary, CreateBookingResult, NewBooking } from '../types';
import type { BookingRepository } from './booking.repository';

export interface BookingServiceDeps {
  repository: BookingRepository;
  /** Keyed hash function (HMAC). Injected so tests need no secrets. */
  hash: (value: string) => string;
  generateId: () => string;
}

export interface SubmitContext {
  ipHash: string | null;
}

export interface BookingService {
  /**
   * Validates raw input, normalizes it and stores it. Throws ZodError on invalid input.
   * Validation lives here (not only in the action) so every caller is protected.
   */
  submit(input: unknown, context: SubmitContext): Promise<CreateBookingResult>;
  getSummary(bookingId: string): Promise<BookingSummary | null>;
}

export function createBookingService({
  repository,
  hash,
  generateId,
}: BookingServiceDeps): BookingService {
  return {
    async submit(input, context) {
      const data = bookingSubmissionSchema.parse(input);

      // Honeypot tripped: pretend success so bots learn nothing, store nothing.
      if (data.website && data.website.trim() !== '') {
        return { bookingId: generateId(), duplicate: false };
      }

      const phone = normalizePhone(data.phone);
      const booking: NewBooking = {
        bookingId: generateId(),
        customer: {
          name: collapseWhitespace(data.name),
          phone,
          email: data.email ? data.email.toLowerCase() : null,
        },
        serviceSlug: data.serviceSlug,
        packageId: data.packageId ?? null,
        bhk: data.bhk ?? null,
        schedule: { date: data.preferredDate, timeSlot: data.timeSlot },
        property: { type: data.propertyType, address: collapseWhitespace(data.address) },
        instructions: data.instructions ? data.instructions : null,
        ipHash: context.ipHash,
      };

      return repository.create(booking, {
        idempotencyKey: hash(`idem:${data.idempotencyKey}`),
        fingerprint: hash(`fp:${phone}|${data.serviceSlug}|${data.preferredDate}|${data.timeSlot}`),
      });
    },

    getSummary(bookingId) {
      return repository.findSummaryById(bookingId);
    },
  };
}
