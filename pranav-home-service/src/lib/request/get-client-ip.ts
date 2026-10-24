import 'server-only';
import { headers } from 'next/headers';

/**
 * Best-effort client IP. On Vercel, `x-forwarded-for` is set by the platform and cannot be
 * spoofed by the client. If you deploy behind a different proxy, review this function.
 */
export async function getClientIp(): Promise<string | null> {
  const h = await headers();
  const forwarded = h.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || h.get('x-real-ip') || null;
}
