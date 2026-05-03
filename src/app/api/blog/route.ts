import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { title, slug, content, date, excerpt, tags } = await request.json();

    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const fileName = `${slug}.md`;
    const filePath = path.join(process.cwd(), 'src/content/blog', fileName);

    // Create directory if it doesn't exist
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const fileContent = `---
title: "${title}"
date: "${date || new Date().toISOString().split('T')[0]}"
excerpt: "${excerpt || ''}"
tags: ${JSON.stringify(tags || [])}
---

${content}`;

    fs.writeFileSync(filePath, fileContent);

    return NextResponse.json({ success: true, message: 'Blog post created successfully' });
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const blogDir = path.join(process.cwd(), 'src/content/blog');
    if (!fs.existsSync(blogDir)) {
      return NextResponse.json({ posts: [] });
    }

    const files = fs.readdirSync(blogDir);
    const posts = files.filter(file => file.endsWith('.md')).map(file => {
      return {
        slug: file.replace('.md', ''),
        fileName: file
      };
    });

    return NextResponse.json({ posts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { slug } = await request.json();
    if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

    const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.md`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
