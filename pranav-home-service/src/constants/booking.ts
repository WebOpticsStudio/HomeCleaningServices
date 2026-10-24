export const PROPERTY_TYPE_VALUES = [
  'apartment',
  'independent-house',
  'villa',
  'studio',
  'office',
] as const;
export type PropertyType = (typeof PROPERTY_TYPE_VALUES)[number];

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  apartment: 'Apartment / flat',
  'independent-house': 'Independent house',
  villa: 'Villa',
  studio: 'Studio / PG',
  office: 'Small office',
};

export const TIME_SLOT_VALUES = [
  '08:00-10:00',
  '10:00-12:00',
  '12:00-14:00',
  '14:00-16:00',
  '16:00-18:00',
] as const;
export type TimeSlot = (typeof TIME_SLOT_VALUES)[number];

export const TIME_SLOT_LABELS: Record<TimeSlot, string> = {
  '08:00-10:00': '8:00 am – 10:00 am',
  '10:00-12:00': '10:00 am – 12:00 pm',
  '12:00-14:00': '12:00 pm – 2:00 pm',
  '14:00-16:00': '2:00 pm – 4:00 pm',
  '16:00-18:00': '4:00 pm – 6:00 pm',
};

export const BOOKING_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export const BOOKING_LIMITS = {
  nameMin: 2,
  nameMax: 80,
  addressMin: 10,
  addressMax: 300,
  instructionsMax: 1000,
  /** How far ahead a customer may book, in days. */
  maxDaysAhead: 90,
} as const;

/** Booking IDs look like `PHS-7K3M9QX2TA` (Crockford base32, 50 bits of randomness). */
export const BOOKING_ID_PREFIX = 'PHS';
export const BOOKING_ID_LENGTH = 10;
export const BOOKING_ID_PATTERN = /^PHS-[0-9A-HJKMNP-TV-Z]{10}$/;

/** Personal data is purged after this many days (Firestore TTL policy on `retainUntil`). */
export const BOOKING_RETENTION_DAYS = 730;

/** Window in which an identical request (same phone, service and slot) counts as a duplicate. */
export const DUPLICATE_WINDOW_MINUTES = 10;

export const BOOKING_RATE_LIMIT = {
  limit: 5,
  windowMs: 10 * 60 * 1000,
} as const;
