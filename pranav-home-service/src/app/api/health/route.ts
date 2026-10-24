import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/** Liveness probe for uptime monitors. Reveals nothing about configuration. */
export function GET() {
  return NextResponse.json(
    { status: 'ok', timestamp: new Date().toISOString() },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
