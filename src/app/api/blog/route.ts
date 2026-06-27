import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { BlogPost } from '@/lib/models/BlogPost';
import { requireAuth } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rate-limit';

export async function GET(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const rateCheck = checkRateLimit(`blog:${ip}`, 30, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
    await connectDB();
    const posts = await BlogPost.find({ published: true })
      .select('title slug excerpt tags createdAt')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ posts });
  } catch (error: any) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const { title, slug, content, excerpt, tags } = await request.json();

    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Missing required fields: title, slug, content' }, { status: 400 });
    }

    await connectDB();

    const existing = await BlogPost.findOne({ slug });
    if (existing) {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 });
    }

    const post = await BlogPost.create({
      title,
      slug,
      content,
      excerpt: excerpt || '',
      tags: tags || [],
      published: true,
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const { slug } = await request.json();
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    await connectDB();
    const result = await BlogPost.findOneAndDelete({ slug });

    if (!result) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
