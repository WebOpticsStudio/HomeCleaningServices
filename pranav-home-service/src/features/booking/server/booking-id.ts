import 'server-only';
import { randomBytes } from 'node:crypto';
import { BOOKING_ID_LENGTH, BOOKING_ID_PREFIX } from '@/constants/booking';

// Crockford base32: no I, L, O or U, so IDs are easy to read out over the phone.
const ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

/** Cryptographically random booking ID, e.g. `PHS-7K3M9QX2TA`. */
export function generateBookingId(): string {
  const bytes = randomBytes(BOOKING_ID_LENGTH);
  // 256 is divisible by 32, so `& 31` introduces no modulo bias.
  const id = Array.from(bytes, (byte) => ALPHABET[byte & 31]).join('');
  return `${BOOKING_ID_PREFIX}-${id}`;
}
