# Environment Variables Check

## Your Current Configuration

Based on your provided environment variables, here's what you have:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SMTP_HOST=smtp.gmail.com
SMTP_USER=opfreslogistics@gmail.com
SMTP_PASS=mataywlufzophcug
SMTP_FROM=opfreslogistics@gmail.com
NEXT_PUBLIC_CONTACT_EMAIL=opfreslogistics@gmail.com
```

## ✅ What's Correct

1. **SMTP_HOST** - ✅ Correct (Gmail SMTP)
2. **SMTP_USER** - ✅ Correct format
3. **SMTP_PASS** - ✅ Correct (Gmail App Password)
4. **SMTP_FROM** - ✅ Correct
5. **NEXT_PUBLIC_CONTACT_EMAIL** - ✅ Correct

## ⚠️ What Needs to be Added

1. **NEXT_PUBLIC_SUPABASE_URL** - ❌ **MISSING**
   - Get this from your Supabase project settings
   - Format: `https://xxxxx.supabase.co`

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY** - ❌ **MISSING**
   - Get this from your Supabase project settings → API
   - This is the `anon` or `public` key

3. **SMTP_PORT** - ⚠️ **OPTIONAL** (defaults to 587)
   - Add if you want to specify: `SMTP_PORT=587`

4. **SMTP_SECURE** - ⚠️ **OPTIONAL** (defaults to false)
   - For Gmail, use: `SMTP_SECURE=false`

## Complete .env.local File

Create a `.env.local` file in your project root with:

```env
# Supabase (REQUIRED - Get from Supabase Dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Email Configuration (Your current settings are correct)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=opfreslogistics@gmail.com
SMTP_PASS=mataywlufzophcug
SMTP_FROM=opfreslogistics@gmail.com
NEXT_PUBLIC_CONTACT_EMAIL=opfreslogistics@gmail.com

# Optional: Admin Email (defaults to SMTP_USER)
ADMIN_EMAIL=opfreslogistics@gmail.com
```

## How to Get Supabase Credentials

1. Go to https://supabase.com
2. Sign in to your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Testing Your Configuration

After setting up your `.env.local` file:

1. Restart your dev server (`npm run dev`)
2. Test the contact form at `/contact`
3. Check if emails are sent
4. Test the chat widget (bottom right corner)
5. Login to admin at `/admin/login`

## Notes

- The code supports both `SMTP_PASS` and `SMTP_PASSWORD` (your current `SMTP_PASS` will work)
- Gmail requires App Passwords (not your regular password)
- Make sure your Gmail account has 2-Step Verification enabled
- The Supabase URL and key are **required** for the app to work


