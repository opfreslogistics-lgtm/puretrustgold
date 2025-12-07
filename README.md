# PureTrust Gold - Next.js Application

A premium gold and diamond exchange platform built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Modern Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion
- **Supabase Integration**: Real-time database and file storage for appointments and messages
- **File Upload**: Upload appointment photos to Supabase Storage
- **Admin Dashboard**: Manage appointments, messages, and view analytics
- **Responsive Design**: Beautiful, modern UI that works on all devices

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env.local`
   - Add your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

3. **Set up Supabase Database**

   Create the following tables in your Supabase project:

   **appointments table:**
   ```sql
   CREATE TABLE appointments (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     phone TEXT NOT NULL,
     location TEXT NOT NULL,
     item_type TEXT NOT NULL,
     date_time TIMESTAMPTZ NOT NULL,
     notes TEXT,
     photo_url TEXT,
     status TEXT NOT NULL DEFAULT 'PENDING',
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

   **messages table:**
   ```sql
   CREATE TABLE messages (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     subject TEXT NOT NULL,
     message TEXT NOT NULL,
     status TEXT NOT NULL DEFAULT 'UNREAD',
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

4. **Set up Supabase Storage**

   - Create a storage bucket named `appointment-photos`
   - Set it to public or configure proper RLS policies

5. **Run Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/              # Next.js app directory
│   ├── page.tsx      # Home page
│   ├── book/         # Appointment booking
│   ├── admin/        # Admin dashboard
│   ├── about/        # About page
│   ├── locations/    # Locations page
│   ├── process/      # Process page
│   └── contact/      # Contact page
├── components/       # React components
├── lib/              # Utility functions and services
│   ├── supabase.ts   # Supabase client
│   └── supabaseService.ts  # Supabase service functions
└── types.ts          # TypeScript type definitions
```

## Admin Dashboard

Access the admin dashboard at `/admin` to:
- View appointment analytics
- Manage appointments (update status, view details)
- View and respond to customer messages
- Generate AI-powered reply drafts

## File Upload

The booking form supports uploading photos of items. Files are stored in Supabase Storage and linked to appointments.

## Technologies

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Supabase**: Backend as a service (database + storage)

