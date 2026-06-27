import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { BlogPost } from '@/lib/models/BlogPost';
import { requireAuth } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const updates = await request.json();
    await connectDB();

    const post = await BlogPost.findOneAndUpdate(
      { slug: params.slug },
      { $set: updates },
      { new: true }
    );

    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
