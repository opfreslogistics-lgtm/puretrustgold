-- Create Admin User
-- Run this in your Supabase SQL Editor after setting up the admin_users table
-- Replace the email and password_hash with your desired credentials

-- Password: admin123 (change this!)
-- To generate a new password hash, you can use Node.js:
-- const crypto = require('crypto');
-- const hash = crypto.createHash('sha256').update('your-password').digest('hex');
-- console.log(hash);

INSERT INTO admin_users (email, password_hash, name, role)
VALUES (
  'admin@puretrustgold.com',
  '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', -- This is 'admin123'
  'Admin User',
  'admin'
)
ON CONFLICT (email) DO NOTHING;

-- You can create additional admin users by running similar INSERT statements
-- Remember to generate a new password hash for each password


