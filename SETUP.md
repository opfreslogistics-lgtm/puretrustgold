# Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email Configuration (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=your_email@gmail.com
NEXT_PUBLIC_CONTACT_EMAIL=your_email@gmail.com

# Admin Email (optional, defaults to SMTP_USER)
ADMIN_EMAIL=admin@puretrustgold.com

# Gemini API (optional, for AI features)
GEMINI_API_KEY=your_gemini_api_key
```

## Quick Setup Steps

### 1. Run SQL Files in Supabase

Go to your Supabase project → SQL Editor and run these files in order:

1. **`supabase/schema.sql`** - Creates all database tables
2. **`supabase/storage.sql`** - Creates storage buckets
3. **`supabase/create-admin.sql`** - Creates default admin user

### 2. Enable Real-time in Supabase

1. Go to Database → Replication
2. Enable replication for:
   - `appointments`
   - `messages`
   - `chat_messages`
   - `chat_sessions`

### 3. Configure Environment Variables

Copy your Supabase credentials and email settings to `.env.local`

### 4. Install and Run

```bash
npm install
npm run dev
```

## Database Tables

All tables are created by running `supabase/schema.sql`. The main tables are:

- **appointments** - Appointment bookings
- **messages** - Contact form submissions
- **chat_sessions** - Live chat sessions
- **chat_messages** - Live chat messages
- **admin_users** - Admin authentication

## Storage Buckets

Created by `supabase/storage.sql`:

- **appointment-photos** - For appointment photo uploads
- **chat-files** - For chat file attachments

## Admin Access

- **Login URL**: `/admin/login`
- **Default Credentials** (change immediately!):
  - Email: `admin@puretrustgold.com`
  - Password: `admin123`
- **Chat Management**: `/admin/chat`
- **Main Dashboard**: `/admin`

### Creating New Admin Users

To create a new admin user, generate a password hash:

```javascript
const crypto = require('crypto');
const hash = crypto.createHash('sha256').update('your-password').digest('hex');
console.log(hash);
```

Then insert into `admin_users` table:

```sql
INSERT INTO admin_users (email, password_hash, name, role)
VALUES ('newadmin@example.com', 'generated-hash-here', 'Admin Name', 'admin');
```

## Email Setup (Gmail)

1. Enable 2-Step Verification on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use this app password as `SMTP_PASS`

## Features

- ✅ Supabase integration for appointments and messages
- ✅ Real-time updates in admin dashboard
- ✅ Email notifications via Nodemailer
- ✅ Photo uploads to Supabase storage
- ✅ Admin dashboard with analytics
- ✅ Contact form with email notifications
- ✅ **Live Chat System** with real-time messaging
- ✅ **File uploads** in chat (images, PDFs, etc.)
- ✅ **Admin login** and authentication
- ✅ **Admin chat management** interface

## Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at http://localhost:3000

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── send-email/    # Email sending
│   │   ├── send-contact-email/  # Contact form emails
│   │   ├── send-reply/    # Admin reply emails
│   │   └── admin/login/   # Admin authentication
│   ├── admin/             # Admin pages
│   │   ├── page.tsx       # Main dashboard
│   │   ├── login/         # Admin login
│   │   └── chat/          # Chat management
│   ├── book/              # Appointment booking
│   ├── contact/           # Contact page
│   └── ...
├── components/            # React components
│   ├── ChatWidget.tsx     # Live chat widget
│   └── ...
├── lib/                   # Utilities
│   ├── supabase.ts        # Supabase client
│   ├── supabaseService.ts # Supabase services
│   └── chatService.ts     # Chat services
└── supabase/             # SQL files
    ├── schema.sql         # Database schema
    ├── storage.sql        # Storage buckets
    └── create-admin.sql   # Admin user creation
```

## Troubleshooting

### Chat not working?
- Check if real-time is enabled in Supabase
- Verify `chat_sessions` and `chat_messages` tables exist
- Check browser console for errors

### Email not sending?
- Verify SMTP credentials are correct
- Check if Gmail App Password is valid
- Look at server logs for SMTP errors

### Admin login not working?
- Run `supabase/create-admin.sql` to create admin user
- Check if `admin_users` table exists
- Verify password hash is correct
