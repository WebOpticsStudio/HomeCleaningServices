'use server';

import { AppError, toActionError } from '@/lib/errors';
import { bookingRateLimiter } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/request/get-client-ip';
import { hmac } from '@/lib/security/hash';
import type { ActionResult } from '@/types';
import { getBookingService } from '../server';

/**
 * Public booking endpoint (Server Action).
 * Next.js verifies the request Origin, which protects against CSRF.
 * Order of defences: rate limit -> server-side validation -> honeypot -> dedupe -> store.
 */
export async function submitBookingAction(
  input: unknown,
): Promise<ActionResult<{ bookingId: string }>> {
  try {
    const ip = await getClientIp();
    const ipHash = ip ? hmac(`ip:${ip}`) : null;

    const limit = await bookingRateLimiter.check(`booking:${ipHash ?? 'unknown'}`);
    if (!limit.allowed) {
      const minutes = Math.max(1, Math.ceil(limit.retryAfterSeconds / 60));
      throw new AppError(
        'RATE_LIMITED',
        `Too many booking attempts. Please try again in about ${minutes} minute${minutes === 1 ? '' : 's'}, or call us.`,
      );
    }

    const result = await getBookingService().submit(input, { ipHash });
    return { ok: true, data: { bookingId: result.bookingId } };
  } catch (error) {
    return toActionError(error);
  }
}
