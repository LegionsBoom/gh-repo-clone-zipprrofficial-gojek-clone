/*
  # Create initial superadmin user

  1. Changes
    - Insert initial superadmin user into users table
    - Set up RLS policies for superadmin access

  2. Security
    - Enable RLS on users table
    - Add policy for superadmin access
*/

-- First, ensure the user doesn't already exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE email = 'admin@villageblocks.com'
  ) THEN
    -- Insert the user into auth.users
    INSERT INTO auth.users (
      email,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_user_meta_data
    )
    VALUES (
      'admin@villageblocks.com',
      now(),
      now(),
      now(),
      '{"role": "superadmin"}'::jsonb
    );
  END IF;
END $$;

-- Then create the user profile
INSERT INTO public.users (
  id,
  email,
  name,
  role,
  created_at
)
SELECT 
  id,
  email,
  'System Administrator',
  'superadmin',
  created_at
FROM auth.users
WHERE email = 'admin@villageblocks.com'
ON CONFLICT (id) DO NOTHING;

-- Ensure RLS is enabled
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Add policy for superadmin access
CREATE POLICY "Superadmins have full access"
  ON public.users
  FOR ALL
  TO authenticated
  USING (
    (role = 'superadmin' AND auth.uid() = id) OR
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'superadmin'
    )
  );