import 'server-only';
import { createHmac } from 'node:crypto';
import { getServerEnv } from '@/lib/firebase/server-env';

/**
 * Keyed hash (HMAC-SHA256). Used so IP addresses and duplicate-detection fingerprints
 * can be compared without storing the raw values. Without HASH_SECRET the hashes cannot
 * be reversed by brute-forcing small input spaces such as phone numbers.
 */
export function hmac(value: string): string {
  return createHmac('sha256', getServerEnv().hashSecret).update(value).digest('hex');
}
