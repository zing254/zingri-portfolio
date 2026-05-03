import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const messagesDir = path.join(process.cwd(), 'src/content/messages');
    if (!fs.existsSync(messagesDir)) {
      fs.mkdirSync(messagesDir, { recursive: true });
    }

    const timestamp = new Date().getTime();
    const fileName = `msg_${timestamp}.json`;
    const filePath = path.join(messagesDir, fileName);

    const messageData = {
      id: timestamp,
      ...data,
      date: new Date().toISOString(),
      status: 'unread'
    };

    fs.writeFileSync(filePath, JSON.stringify(messageData, null, 2));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving message:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const messagesDir = path.join(process.cwd(), 'src/content/messages');
    if (!fs.existsSync(messagesDir)) {
      return NextResponse.json({ messages: [] });
    }

    const files = fs.readdirSync(messagesDir);
    const messages = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const filePath = path.join(messagesDir, file);
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
      })
      .sort((a, b) => b.id - a.id);

    return NextResponse.json({ messages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
