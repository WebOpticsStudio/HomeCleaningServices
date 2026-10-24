import { describe, expect, it } from 'vitest';
import { MemoryRateLimiter } from '@/lib/rate-limit/memory-rate-limiter';

describe('MemoryRateLimiter', () => {
  it('allows up to the limit, then blocks, then recovers after the window', async () => {
    let now = 1_000;
    const limiter = new MemoryRateLimiter({ limit: 2, windowMs: 60_000, now: () => now });

    expect((await limiter.check('a')).allowed).toBe(true);
    expect((await limiter.check('a')).remaining).toBe(0);
    const blocked = await limiter.check('a');
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);

    now += 61_000;
    expect((await limiter.check('a')).allowed).toBe(true);
  });

  it('tracks keys independently', async () => {
    const limiter = new MemoryRateLimiter({ limit: 1, windowMs: 60_000 });
    expect((await limiter.check('a')).allowed).toBe(true);
    expect((await limiter.check('b')).allowed).toBe(true);
    expect((await limiter.check('a')).allowed).toBe(false);
  });

  it('bounds memory by evicting the oldest keys', async () => {
    const limiter = new MemoryRateLimiter({ limit: 1, windowMs: 60_000, maxKeys: 2 });
    await limiter.check('a');
    await limiter.check('b');
    await limiter.check('c'); // evicts "a"
    expect((await limiter.check('a')).allowed).toBe(true);
  });
});
