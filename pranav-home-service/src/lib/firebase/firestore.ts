import 'server-only';
import { getFirestore, type CollectionReference, type Firestore } from 'firebase-admin/firestore';
import { getAdminApp } from './admin';
import { COLLECTIONS, type BookingDedupeDocument, type BookingDocument } from './types';

/** Server-side Firestore instance (Admin SDK). */
export function getDb(): Firestore {
  return getFirestore(getAdminApp());
}

export function bookingsCollection(db: Firestore = getDb()) {
  return db.collection(COLLECTIONS.bookings) as CollectionReference<BookingDocument>;
}

export function bookingDedupeCollection(db: Firestore = getDb()) {
  return db.collection(COLLECTIONS.bookingDedupe) as CollectionReference<BookingDedupeDocument>;
}
