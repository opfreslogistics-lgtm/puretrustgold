# Vercel Deployment Checklist

## ✅ Project Ready for Deployment

### Environment Variables Required in Vercel:

1. **Supabase Configuration:**
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

2. **Email Configuration (SMTP):**
   - `SMTP_HOST` - SMTP server host (e.g., smtp.gmail.com)
   - `SMTP_PORT` - SMTP port (e.g., 587)
   - `SMTP_SECURE` - true/false (true for port 465, false for others)
   - `SMTP_USER` - Your SMTP email address
   - `SMTP_PASSWORD` or `SMTP_PASS` - Your SMTP password
   - `ADMIN_EMAIL` - Admin email for notifications (optional, defaults to SMTP_USER)

3. **Optional:**
   - `GEMINI_API_KEY` - For AI features (if using)

### Deployment Steps:

1. **Connect Repository to Vercel:**
   - Go to https://vercel.com
   - Import the repository: `https://github.com/opfreslogistics-lgtm/puretrustgold.git`
   - Vercel will auto-detect Next.js

2. **Configure Environment Variables:**
   - Add all required environment variables in Vercel dashboard
   - Settings → Environment Variables

3. **Build Settings:**
   - Framework Preset: Next.js (auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Database Setup:**
   - Run the SQL scripts in `supabase/schema.sql` in your Supabase SQL Editor
   - This creates all necessary tables (appointments, messages, blog_posts, transport_requests, etc.)

5. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy automatically

### Post-Deployment:

1. **Verify Database Tables:**
   - Ensure all tables are created in Supabase
   - Check RLS policies are set correctly

2. **Test Key Features:**
   - Contact form submissions
   - Appointment bookings
   - Blog post creation (admin)
   - Transport request form
   - Email notifications

3. **Domain Configuration:**
   - Add custom domain in Vercel if needed
   - Update any hardcoded URLs if necessary

### Notes:

- The project uses Next.js 15 with App Router
- All images are hosted on Supabase Storage
- Email templates include the PureTrust Gold logo
- Blog system is fully functional with admin management
- All hero sections have proper dark overlays for text readability

