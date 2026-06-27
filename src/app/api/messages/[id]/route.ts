import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ContactMessage } from '@/lib/models/ContactMessage';
import { requireAuth } from '@/lib/auth';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const { read } = await request.json();
    await connectDB();
    const msg = await ContactMessage.findByIdAndUpdate(params.id, { read }, { new: true });
    if (!msg) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    await connectDB();
    const msg = await ContactMessage.findByIdAndDelete(params.id);
    if (!msg) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
