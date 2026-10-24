import 'server-only';
import { BOOKING_RATE_LIMIT } from '@/constants/booking';
import { MemoryRateLimiter } from './memory-rate-limiter';
import type { RateLimiter } from './types';

// Keep one instance across hot reloads in development.
const globalForLimiter = globalThis as unknown as { bookingRateLimiter?: RateLimiter };

export const bookingRateLimiter: RateLimiter = (globalForLimiter.bookingRateLimiter ??=
  new MemoryRateLimiter(BOOKING_RATE_LIMIT));

export type { RateLimiter, RateLimitResult } from './types';
