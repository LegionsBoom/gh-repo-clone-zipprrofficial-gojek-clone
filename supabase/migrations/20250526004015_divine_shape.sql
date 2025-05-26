/*
  # Setup demo data
  
  1. Creates superadmin user
  2. Creates demo service categories
  3. Creates demo service providers
  4. Creates demo service locations
*/

-- Create superadmin user
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin
) VALUES (
  'c9c1c9c1-c9c1-c9c1-c9c1-c9c1c9c1c9c1',
  'admin@villageblocks.com',
  crypt('Admin123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  true
);

-- Create user profile for superadmin
INSERT INTO public.users (
  id,
  email,
  name,
  role,
  created_at
) VALUES (
  'c9c1c9c1-c9c1-c9c1-c9c1-c9c1c9c1c9c1',
  'admin@villageblocks.com',
  'System Administrator',
  'superadmin',
  now()
);

-- Insert demo service categories
INSERT INTO public.service_categories (name, description, icon, active) VALUES
('Home Services', 'Home maintenance and repairs', 'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg', true),
('Transportation', 'Reliable transportation services', 'https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg', true),
('Professional Services', 'Business and personal services', 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg', true);

-- Insert demo service providers
INSERT INTO public.service_providers (
  user_id,
  category_id,
  business_name,
  description,
  rating,
  active
) VALUES
(
  'c9c1c9c1-c9c1-c9c1-c9c1-c9c1c9c1c9c1',
  (SELECT id FROM public.service_categories WHERE name = 'Home Services' LIMIT 1),
  'HomeFixers Pro',
  'Professional home maintenance services',
  4.5,
  true
),
(
  'c9c1c9c1-c9c1-c9c1-c9c1-c9c1c9c1c9c1',
  (SELECT id FROM public.service_categories WHERE name = 'Transportation' LIMIT 1),
  'Swift Delivery',
  'Fast and reliable delivery service',
  4.8,
  true
);

-- Insert demo service locations
INSERT INTO public.service_locations (
  provider_id,
  latitude,
  longitude,
  address
) VALUES
(
  (SELECT id FROM public.service_providers WHERE business_name = 'HomeFixers Pro' LIMIT 1),
  6.5244,
  3.3792,
  'Lagos, Nigeria'
),
(
  (SELECT id FROM public.service_providers WHERE business_name = 'Swift Delivery' LIMIT 1),
  5.6037,
  -0.1870,
  'Accra, Ghana'
);