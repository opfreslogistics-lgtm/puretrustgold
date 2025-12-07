import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, pickupAddress, estimatedValue, itemDescription, preferredDate, notes } = body;

    if (!name || !email || !phone || !pickupAddress || !estimatedValue) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert into database
    const { data, error } = await supabase
      .from('transport_requests')
      .insert([
        {
          name,
          email,
          phone,
          pickup_address: pickupAddress,
          estimated_value: estimatedValue,
          item_description: itemDescription || null,
          preferred_date: preferredDate || null,
          notes: notes || null,
          status: 'PENDING'
        }
      ])
      .select();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to save request' },
        { status: 500 }
      );
    }

    // Send email to customer
    const customerEmailHtml = `
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
                      <h2 style="color: #D4AF37; font-family: serif; margin-top: 0;">Transport Request Received</h2>
                      <p style="color: #cccccc; line-height: 1.6;">Dear ${name},</p>
                      <p style="color: #cccccc; line-height: 1.6;">Thank you for requesting secure armored transport services. We have received your request and will review it immediately.</p>
                      <div style="background-color: #1a1a1a; border-left: 3px solid #D4AF37; padding: 20px; margin: 20px 0;">
                        <p style="color: #ffffff; margin: 5px 0;"><strong>Pickup Address:</strong> ${pickupAddress}</p>
                        <p style="color: #ffffff; margin: 5px 0;"><strong>Estimated Value:</strong> ${estimatedValue}</p>
                        ${preferredDate ? `<p style="color: #ffffff; margin: 5px 0;"><strong>Preferred Date:</strong> ${preferredDate}</p>` : ''}
                      </div>
                      <p style="color: #cccccc; line-height: 1.6;">Our team will contact you within 24 hours to arrange the details of your secure transport via Brinks or Dunbar Armored.</p>
                      <p style="color: #cccccc; line-height: 1.6;">If you have any questions, please contact us at +1 (800) 555-GOLD or vip@puretrustgold.com.</p>
                      <p style="color: #cccccc; line-height: 1.6; margin-top: 30px;">Best regards,<br><strong style="color: #D4AF37;">The PureTrust Gold Team</strong></p>
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
    `;

    // Send email to admin
    const adminEmailHtml = `
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
                      <h2 style="color: #D4AF37; font-family: serif; margin-top: 0;">New Transport Request</h2>
                      <p style="color: #cccccc; line-height: 1.6;">A new secure transport request has been submitted:</p>
                      <div style="background-color: #1a1a1a; border-left: 3px solid #D4AF37; padding: 20px; margin: 20px 0;">
                        <p style="color: #ffffff; margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                        <p style="color: #ffffff; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                        <p style="color: #ffffff; margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
                        <p style="color: #ffffff; margin: 5px 0;"><strong>Pickup Address:</strong> ${pickupAddress}</p>
                        <p style="color: #ffffff; margin: 5px 0;"><strong>Estimated Value:</strong> ${estimatedValue}</p>
                        ${itemDescription ? `<p style="color: #ffffff; margin: 5px 0;"><strong>Item Description:</strong> ${itemDescription}</p>` : ''}
                        ${preferredDate ? `<p style="color: #ffffff; margin: 5px 0;"><strong>Preferred Date:</strong> ${preferredDate}</p>` : ''}
                        ${notes ? `<p style="color: #ffffff; margin: 5px 0;"><strong>Notes:</strong> ${notes}</p>` : ''}
                      </div>
                      <p style="color: #cccccc; line-height: 1.6;">Please review and contact the client to arrange transport.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    // Send emails
    const emailPromises = [
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          subject: 'Transport Request Received - PureTrust Gold',
          text: `Dear ${name},\n\nThank you for requesting secure armored transport services. We have received your request and will contact you within 24 hours.\n\nBest regards,\nThe PureTrust Gold Team`,
          html: customerEmailHtml
        })
      }),
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: process.env.ADMIN_EMAIL || 'vip@puretrustgold.com',
          subject: `New Transport Request from ${name}`,
          text: `New transport request:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPickup: ${pickupAddress}\nValue: ${estimatedValue}`,
          html: adminEmailHtml
        })
      })
    ];

    await Promise.all(emailPromises);

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error processing transport request:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}

