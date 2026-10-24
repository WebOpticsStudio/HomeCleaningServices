import type { RateLimiter, RateLimitResult } from './types';

interface Options {
  limit: number;
  windowMs: number;
  /** Upper bound on tracked keys so memory use stays bounded under attack. */
  maxKeys?: number;
  now?: () => number;
}

/**
 * Sliding-window limiter held in process memory.
 *
 * LIMITATION: on serverless platforms each instance has its own memory, so this is
 * best-effort protection against casual abuse. For strict global limits implement
 * `RateLimiter` with a shared store (Upstash Redis / Vercel KV) and swap it in
 * `src/lib/rate-limit/index.ts`.
 */
export class MemoryRateLimiter implements RateLimiter {
  private readonly hits = new Map<string, number[]>();
  private readonly limit: number;
  private readonly windowMs: number;
  private readonly maxKeys: number;
  private readonly now: () => number;

  constructor({ limit, windowMs, maxKeys = 10_000, now = Date.now }: Options) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.maxKeys = maxKeys;
    this.now = now;
  }

  async check(key: string): Promise<RateLimitResult> {
    const now = this.now();
    const recent = (this.hits.get(key) ?? []).filter((t) => now - t < this.windowMs);

    if (recent.length >= this.limit) {
      const oldest = recent[0] ?? now;
      this.hits.set(key, recent);
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds: Math.max(1, Math.ceil((oldest + this.windowMs - now) / 1000)),
      };
    }

    recent.push(now);
    this.hits.delete(key); // re-insert so Map order reflects recency
    this.hits.set(key, recent);
    this.prune();
    return { allowed: true, remaining: this.limit - recent.length, retryAfterSeconds: 0 };
  }

  private prune() {
    while (this.hits.size > this.maxKeys) {
      const oldestKey = this.hits.keys().next().value;
      if (oldestKey === undefined) break;
      this.hits.delete(oldestKey);
    }
  }
}
