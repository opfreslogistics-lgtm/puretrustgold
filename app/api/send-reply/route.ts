import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabase } from '@/lib/supabase';
import { MessageStatus } from '@/types';

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
    const { messageId, replyText, originalMessage } = body;

    if (!messageId || !replyText || !originalMessage) {
      return NextResponse.json(
        { error: 'Missing required fields: messageId, replyText, originalMessage' },
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

    // Send reply email
    const emailOptions = {
      from: `"PureTrust Gold" <${process.env.SMTP_USER}>`,
      to: originalMessage.email,
      subject: `Re: ${originalMessage.subject}`,
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
                        <h2 style="color: #D4AF37; font-family: serif; margin-top: 0;">Response from PureTrust Gold</h2>
                        <p style="color: #cccccc; line-height: 1.6;">Dear ${originalMessage.name},</p>
                        <div style="background-color: #1a1a1a; border-left: 3px solid #D4AF37; padding: 20px; margin: 20px 0;">
                          <p style="color: #ffffff; white-space: pre-wrap; line-height: 1.8; margin: 0;">${replyText}</p>
                        </div>
                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #333333;">
                        <div style="background-color: #1a1a1a; padding: 15px; margin: 20px 0;">
                          <p style="color: #999999; font-size: 12px; margin: 5px 0;"><strong style="color: #D4AF37;">Original Message:</strong></p>
                          <p style="color: #cccccc; font-size: 13px; margin: 5px 0;"><strong>Subject:</strong> ${originalMessage.subject}</p>
                          <p style="color: #cccccc; font-size: 13px; white-space: pre-wrap; margin: 10px 0 0 0;">${originalMessage.message}</p>
                        </div>
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
Response from PureTrust Gold

${replyText}

---
Original Message:
Subject: ${originalMessage.subject}
${originalMessage.message}

Best regards,
The PureTrust Gold Team
      `,
      replyTo: process.env.SMTP_USER,
    };

    await transporter.sendMail(emailOptions);

    // Update message status in Supabase
    const { error: updateError } = await supabase
      .from('messages')
      .update({ status: MessageStatus.REPLIED })
      .eq('id', messageId);

    if (updateError) {
      console.error('Error updating message status:', updateError);
      // Don't fail the request if status update fails
    }

    return NextResponse.json(
      { success: true, message: 'Reply sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Reply email error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send reply' },
      { status: 500 }
    );
  }
}

