export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/** Swap the implementation (e.g. Upstash Redis) without touching callers. */
export interface RateLimiter {
  check(key: string): Promise<RateLimitResult>;
}
