-- Create admin user for the portfolio
-- Email: jibreelebornat@gmail.com
-- Password: JibreelAdmin2024!

INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  gen_random_uuid(),
  'jibreelebornat@gmail.com',
  crypt('JibreelAdmin2024!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "Jibreel Bornat"}',
  false,
  'authenticated'
);
