import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ContactMessage } from '@/lib/models/ContactMessage';
import { checkRateLimit } from '@/lib/rate-limit';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

function sanitize(str: string): string {
  return str.replace(/[<>"'&]/g, (c) => ({
    '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '&': '&amp;',
  })[c] || c);
}

export async function POST(request: Request) {
  try {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    if (origin && host && !origin.includes(host) && !origin.includes('localhost')) {
      return NextResponse.json({ error: 'Invalid request origin' }, { status: 403 });
    }

    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const rateCheck = checkRateLimit(`contact:${ip}`, 3, 60 * 60 * 1000);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateCheck.resetAt - Date.now()) / 1000)),
          },
        }
      );
    }

    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    await connectDB();

    await ContactMessage.create({
      name: sanitize(name.trim()),
      email: sanitize(email.trim()),
      subject: sanitize(subject.trim()),
      message: sanitize(message.trim()),
    });

    if (resend) {
      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL || 'zingri@fleektech.co.ke',
        subject: `Portfolio: ${subject}`,
        html: `
          <div style="font-family: monospace; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00ffff;">New Contact from Portfolio</h2>
            <div style="background: #111; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong style="color: #39ff14;">Name:</strong> ${name}</p>
              <p><strong style="color: #39ff14;">Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong style="color: #39ff14;">Subject:</strong> ${subject}</p>
            </div>
            <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; border-left: 4px solid #a855f7;">
              <p><strong style="color: #a855f7;">Message:</strong></p>
              <p style="white-space: pre-wrap; color: #888;">${message}</p>
            </div>
          </div>
        `,
      });

      await resend.emails.send({
        from: 'Zingri Master <onboarding@resend.dev>',
        to: email,
        subject: 'Thanks for reaching out!',
        html: `
          <div style="font-family: monospace; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; padding: 20px 0;">
              <h1 style="color: #00ffff; font-size: 28px;">BAZENGA SYSTEMS</h1>
              <p style="color: #39ff14;">MESSAGE RECEIVED</p>
            </div>
            <div style="background: #111; padding: 20px; border-radius: 8px;">
              <p>Hi ${name},</p>
              <p>Thanks for reaching out! I've received your message and will get back to you within 24 hours.</p>
              <p style="margin-top: 20px;">Best regards,<br><strong>Zingri Master</strong><br>CTO & Senior Full-Stack Lead</p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
