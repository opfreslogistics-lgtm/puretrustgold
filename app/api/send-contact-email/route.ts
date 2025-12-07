import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD || process.env.SMTP_PASS,
    },
  });
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!process.env.SMTP_USER || (!process.env.SMTP_PASSWORD && !process.env.SMTP_PASS)) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const transporter = createTransporter();

    // Email to admin
    const adminEmail = {
      from: `"PureTrust Gold Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #0a0a0a; color: #ffffff;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #121212; border: 1px solid #D4AF37;">
                    <tr>
                      <td align="center" style="padding: 40px 20px; border-bottom: 1px solid #D4AF37;">
                        <img src="https://bznwydxnqyumngwscbfy.supabase.co/storage/v1/object/public/My%20Images/logo.png" alt="PureTrust Gold" style="max-width: 200px; height: auto;">
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 40px;">
                        <h2 style="color: #D4AF37; font-family: serif; margin-top: 0;">New Contact Form Submission</h2>
                        <div style="background-color: #1a1a1a; border-left: 3px solid #D4AF37; padding: 20px; margin: 20px 0;">
                          <p style="color: #ffffff; margin: 5px 0;"><strong style="color: #D4AF37;">Name:</strong> ${name}</p>
                          <p style="color: #ffffff; margin: 5px 0;"><strong style="color: #D4AF37;">Email:</strong> ${email}</p>
                          <p style="color: #ffffff; margin: 5px 0;"><strong style="color: #D4AF37;">Subject:</strong> ${subject}</p>
                          <p style="color: #ffffff; margin: 15px 0 5px 0;"><strong style="color: #D4AF37;">Message:</strong></p>
                          <p style="color: #cccccc; white-space: pre-wrap; line-height: 1.8; margin: 10px 0 0 0;">${message}</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 20px; text-align: center; border-top: 1px solid #333333;">
                        <p style="color: #666666; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} PureTrust Gold. All rights reserved.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      replyTo: email,
    };

    // Confirmation email to user
    const userEmail = {
      from: `"PureTrust Gold" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Thank you for contacting PureTrust Gold',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #0a0a0a; color: #ffffff;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #121212; border: 1px solid #D4AF37;">
                    <tr>
                      <td align="center" style="padding: 40px 20px; border-bottom: 1px solid #D4AF37;">
                        <img src="https://bznwydxnqyumngwscbfy.supabase.co/storage/v1/object/public/My%20Images/logo.png" alt="PureTrust Gold" style="max-width: 200px; height: auto;">
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 40px;">
                        <h2 style="color: #D4AF37; font-family: serif; margin-top: 0;">Thank You, ${name}</h2>
                        <p style="color: #cccccc; line-height: 1.6;">We have received your message regarding "${subject}".</p>
                        <p style="color: #cccccc; line-height: 1.6;">Our concierge team will review your inquiry and respond within 24 hours.</p>
                        <p style="color: #cccccc; line-height: 1.6; margin-top: 30px;">
                          Best regards,<br>
                          <strong style="color: #D4AF37;">The PureTrust Gold Team</strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 20px; text-align: center; border-top: 1px solid #333333;">
                        <p style="color: #666666; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} PureTrust Gold. All rights reserved.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
      text: `
Thank You, ${name}

We have received your message regarding "${subject}".

Our concierge team will review your inquiry and respond within 24 hours.

Best regards,
The PureTrust Gold Team
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminEmail),
      transporter.sendMail(userEmail),
    ]);

    return NextResponse.json(
      { success: true, message: 'Emails sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Contact email error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}

