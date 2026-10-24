import 'server-only';
import { hmac } from '@/lib/security/hash';
import { generateBookingId } from './booking-id';
import { createBookingService, type BookingService } from './booking.service';
import { FirestoreBookingRepository } from './firestore-booking.repository';

let instance: BookingService | undefined;

/** Composition root: wires the service to the Firestore repository (created lazily). */
export function getBookingService(): BookingService {
  instance ??= createBookingService({
    repository: new FirestoreBookingRepository(),
    hash: hmac,
    generateId: generateBookingId,
  });
  return instance;
}
