import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  // Development fallback without API keys
  if (!resend) {
    console.log('Email service not configured - using dev mode');
    return NextResponse.json(
      { success: true, messageId: 'dev_mode' },
      { status: 200 }
    );
  }

  try {
    const { name, email, subject, message } = await request.json();

    // Input validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
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
          <p style="margin-top: 30px; font-size: 12px; color: #666;">
            Received from: ${request.headers.get('origin') || 'zingri.dev'}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to send message' },
        { status: 500 }
      );
    }

    // Send auto-reply to visitor
    await resend.emails.send({
      from: 'Zingri Master <onboarding@resend.dev>',
      to: email,
      subject: 'Thanks for reaching out! ⚡',
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px 0;">
            <h1 style="color: #00ffff; font-size: 28px;">BAZENGA SYSTEMS</h1>
            <p style="color: #39ff14;">⚡ MESSAGE RECEIVED ⚡</p>
          </div>
          <div style="background: #111; padding: 20px; border-radius: 8px;">
            <p>Hi ${name},</p>
            <p>Thanks for reaching out! I've received your message and will get back to you within 24 hours.</p>
            <p style="margin-top: 20px;">Best regards,<br><strong>Zingri Master</strong><br>CTO & Senior Full-Stack Lead</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background: #0a0a0a; border-radius: 8px; font-size: 12px; color: #666;">
            <p><strong>Original message:</strong></p>
            <p style="white-space: pre-wrap;">${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}