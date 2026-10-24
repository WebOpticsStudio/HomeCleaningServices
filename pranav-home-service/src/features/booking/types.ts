import type { BookingStatus, PropertyType, TimeSlot } from '@/constants/booking';
import type { BhkOption, PackageId, ServiceSlug } from '@/constants/catalog';

/** A validated, normalized booking request ready to be persisted. */
export interface NewBooking {
  bookingId: string;
  customer: { name: string; phone: string; email: string | null };
  serviceSlug: ServiceSlug;
  packageId: PackageId | null;
  bhk?: BhkOption | null;
  schedule: { date: string; timeSlot: TimeSlot };
  property: { type: PropertyType; address: string };
  instructions: string | null;
  ipHash: string | null;
}

/** Keys used to detect repeated submissions (both are keyed hashes, not raw values). */
export interface DedupeKeys {
  idempotencyKey: string;
  fingerprint: string;
}

export interface CreateBookingResult {
  bookingId: string;
  /** True when an existing booking was returned instead of creating a new one. */
  duplicate: boolean;
}

/** Non-sensitive view of a booking, safe to show on the public confirmation page. */
export interface BookingSummary {
  bookingId: string;
  status: BookingStatus;
  serviceSlug: ServiceSlug;
  date: string;
  timeSlot: TimeSlot;
}
