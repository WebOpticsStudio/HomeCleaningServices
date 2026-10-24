import type { Timestamp } from 'firebase-admin/firestore';
import type { BhkOption, PackageId, ServiceSlug } from '@/constants/catalog';
import type { BookingStatus, PropertyType, TimeSlot } from '@/constants/booking';

/** Firestore collection names. */
export const COLLECTIONS = {
  bookings: 'bookings',
  /** Idempotency + duplicate-detection markers. Short-lived, deleted by a TTL policy. */
  bookingDedupe: 'bookingDedupe',
} as const;

/** Shape of a document in `bookings/{bookingId}`. Contains personal data (PII). */
export interface BookingDocument {
  bookingId: string;
  status: BookingStatus;
  customer: {
    name: string;
    /** E.164 formatted, e.g. +919876543210 */
    phone: string;
    email: string | null;
  };
  serviceSlug: ServiceSlug;
  packageId: PackageId | null;
  bhk?: BhkOption | null;
  schedule: {
    /** YYYY-MM-DD in the business time zone */
    date: string;
    timeSlot: TimeSlot;
  };
  property: {
    type: PropertyType;
    address: string;
  };
  instructions: string | null;
  meta: {
    source: 'website';
    /** HMAC of the client IP. The raw IP is never stored. */
    ipHash: string | null;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  /** Firestore TTL field: the document is deleted automatically after this time. */
  retainUntil: Timestamp;
}

/** Shape of a document in `bookingDedupe/{key}`. Holds no personal data, only hashes. */
export interface BookingDedupeDocument {
  bookingId: string;
  createdAt: Timestamp;
  /** Firestore TTL field. */
  expireAt: Timestamp;
}
