import { NextResponse } from 'next/server';

export function verifyAuth(request: Request): boolean {
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret) {
    console.error('ADMIN_SECRET not configured — denying auth for security');
    return false;
  }

  const providedSecret = request.headers.get('x-admin-secret');
  return providedSecret === adminSecret;
}

export function requireAuth(request: Request): NextResponse | null {
  if (!verifyAuth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized: invalid or missing admin secret' },
      { status: 401 }
    );
  }
  return null;
}
