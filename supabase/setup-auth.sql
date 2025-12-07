-- Setup Supabase Auth for Admin and Chat Users
-- Run this in your Supabase SQL Editor

-- Enable email auth (should already be enabled by default)
-- Go to Authentication → Providers → Email and ensure it's enabled

-- Create a function to check if user is admin (optional)
-- You can add admin role to user metadata when creating admin users
CREATE OR REPLACE FUNCTION is_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if user email is in admin list
  -- You can modify this to check a table or user metadata
  RETURN user_email IN (
    SELECT email FROM auth.users WHERE email = user_email
    AND raw_user_meta_data->>'role' = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: To create an admin user:
-- 1. Go to Authentication → Users in Supabase Dashboard
-- 2. Click "Add user" → "Create new user"
-- 3. Enter admin email and password
-- 4. In user metadata, add: {"role": "admin", "name": "Admin Name"}
-- 
-- Or use the Supabase Auth API:
-- supabase.auth.admin.createUser({
--   email: 'admin@example.com',
--   password: 'secure-password',
--   user_metadata: { role: 'admin', name: 'Admin Name' }
-- })


