import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { secret } = await request.json();
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminSecret) {
      return NextResponse.json(
        { error: 'Admin secret not configured on server' },
        { status: 500 }
      );
    }

    if (secret === adminSecret) {
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
