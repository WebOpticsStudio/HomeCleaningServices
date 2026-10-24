import 'server-only';
import { Timestamp } from 'firebase-admin/firestore';
import { BOOKING_RETENTION_DAYS, DUPLICATE_WINDOW_MINUTES } from '@/constants/booking';
import { bookingDedupeCollection, bookingsCollection, getDb } from '@/lib/firebase/firestore';
import type { BookingDedupeDocument, BookingDocument } from '@/lib/firebase/types';
import type { BookingSummary, CreateBookingResult, DedupeKeys, NewBooking } from '../types';
import type { BookingRepository } from './booking.repository';

const DAY_MS = 24 * 60 * 60 * 1000;

export class FirestoreBookingRepository implements BookingRepository {
  async create(booking: NewBooking, dedupe: DedupeKeys): Promise<CreateBookingResult> {
    const db = getDb();
    const bookings = bookingsCollection(db);
    const dedupeCol = bookingDedupeCollection(db);

    const idemRef = dedupeCol.doc(`idem_${dedupe.idempotencyKey}`);
    const fingerprintRef = dedupeCol.doc(`fp_${dedupe.fingerprint}`);
    const bookingRef = bookings.doc(booking.bookingId);

    return db.runTransaction(async (tx) => {
      // All reads must happen before any writes in a Firestore transaction.
      const [idemSnap, fpSnap] = await Promise.all([tx.get(idemRef), tx.get(fingerprintRef)]);

      // 1. Same form submitted twice (double click, retry): return the original booking.
      if (idemSnap.exists) {
        return { bookingId: idemSnap.data()!.bookingId, duplicate: true };
      }

      // 2. Same phone + service + slot submitted recently: treat as a duplicate.
      if (fpSnap.exists) {
        const existing = fpSnap.data()!;
        const ageMs = Date.now() - existing.createdAt.toMillis();
        if (ageMs < DUPLICATE_WINDOW_MINUTES * 60 * 1000) {
          return { bookingId: existing.bookingId, duplicate: true };
        }
      }

      const now = Timestamp.now();
      const document: BookingDocument = {
        bookingId: booking.bookingId,
        status: 'pending',
        customer: booking.customer,
        serviceSlug: booking.serviceSlug,
        packageId: booking.packageId,
        bhk: booking.bhk ?? null,
        schedule: booking.schedule,
        property: booking.property,
        instructions: booking.instructions,
        meta: { source: 'website', ipHash: booking.ipHash },
        createdAt: now,
        updatedAt: now,
        retainUntil: Timestamp.fromMillis(now.toMillis() + BOOKING_RETENTION_DAYS * DAY_MS),
      };
      const marker: BookingDedupeDocument = {
        bookingId: booking.bookingId,
        createdAt: now,
        expireAt: Timestamp.fromMillis(now.toMillis() + DAY_MS),
      };

      tx.create(bookingRef, document); // fails if the ID already exists
      tx.set(idemRef, marker);
      tx.set(fingerprintRef, marker);
      return { bookingId: booking.bookingId, duplicate: false };
    });
  }

  async findSummaryById(bookingId: string): Promise<BookingSummary | null> {
    const snap = await bookingsCollection().doc(bookingId).get();
    const data = snap.data();
    if (!data) return null;
    // Deliberately exclude all personal data (name, phone, email, address).
    return {
      bookingId: data.bookingId,
      status: data.status,
      serviceSlug: data.serviceSlug,
      date: data.schedule.date,
      timeSlot: data.schedule.timeSlot,
    };
  }
}
