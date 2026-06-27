import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ContactMessage } from '@/lib/models/ContactMessage';
import { requireAuth } from '@/lib/auth';

export async function GET(request: Request) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    await connectDB();
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
