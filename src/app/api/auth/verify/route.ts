import { NextResponse } from 'next/server';
import crypto from 'crypto';

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export async function POST(request: Request) {
  try {
    const { secret } = await request.json();
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminSecret) {
      return NextResponse.json(
        { error: 'Authentication unavailable' },
        { status: 500 }
      );
    }

    if (typeof secret === 'string' && timingSafeEqual(secret, adminSecret)) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Invalid secret' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
