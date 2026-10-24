import type { BookingSummary, CreateBookingResult, DedupeKeys, NewBooking } from '../types';

/**
 * Data-access contract for bookings. The service depends on this interface, not on
 * Firestore, so storage can be swapped or faked in tests.
 */
export interface BookingRepository {
  /** Atomically stores the booking unless the same request was already stored. */
  create(booking: NewBooking, dedupe: DedupeKeys): Promise<CreateBookingResult>;
  /** Returns a non-sensitive summary, or null if no such booking exists. */
  findSummaryById(bookingId: string): Promise<BookingSummary | null>;
}
