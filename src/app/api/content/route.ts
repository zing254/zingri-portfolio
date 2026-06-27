import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { SiteContent } from '@/lib/models/SiteContent';
import { requireAuth } from '@/lib/auth';
import config from '@/lib/config';

export async function GET() {
  try {
    await connectDB();
    const stored = await SiteContent.find().lean();
    const sections = stored.map(s => ({ key: s.key, data: s.data }));

    if (sections.length === 0) {
      const defaults = [
        { key: 'personal', data: config.personalInfo as unknown as Record<string, unknown> },
        { key: 'skills', data: config.skillCategories as unknown as Record<string, unknown> },
        { key: 'projects', data: config.projects as unknown as Record<string, unknown> },
        { key: 'experience', data: config.experiences as unknown as Record<string, unknown> },
        { key: 'education', data: config.education as unknown as Record<string, unknown> },
        { key: 'social', data: config.socialLinks as unknown as Record<string, unknown> },
      ];
      return NextResponse.json({ sections: defaults });
    }

    return NextResponse.json({ sections });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const { key, data } = await request.json();
    if (!key || !data) {
      return NextResponse.json({ error: 'Missing key or data' }, { status: 400 });
    }

    await connectDB();
    await SiteContent.findOneAndUpdate(
      { key },
      { key, data },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
