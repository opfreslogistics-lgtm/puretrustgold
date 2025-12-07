import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD || process.env.SMTP_PASS,
    },
  });
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, text, html, replyTo } = body;

    if (!to || !subject || !text) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, text' },
        { status: 400 }
      );
    }

    if (!process.env.SMTP_USER || (!process.env.SMTP_PASSWORD && !process.env.SMTP_PASS)) {
      return NextResponse.json(
        { error: 'Email service not configured. Please set SMTP_USER and SMTP_PASSWORD environment variables.' },
        { status: 500 }
      );
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: `"PureTrust Gold" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html: html || text,
      replyTo: replyTo || process.env.SMTP_USER,
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { 
        success: true, 
        messageId: info.messageId,
        message: 'Email sent successfully' 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}

