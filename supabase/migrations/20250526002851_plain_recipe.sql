/*
  # Initial Schema Setup for Multi-Service Platform

  1. New Tables
    - service_categories
      - id (uuid)
      - name (text)
      - description (text)
      - icon (text)
      - active (boolean)
      - created_at (timestamp)
    
    - service_providers
      - id (uuid)
      - user_id (uuid, references users)
      - category_id (uuid, references service_categories)
      - business_name (text)
      - description (text)
      - rating (numeric)
      - active (boolean)
      - created_at (timestamp)
    
    - service_locations
      - id (uuid)
      - provider_id (uuid, references service_providers)
      - latitude (numeric)
      - longitude (numeric)
      - address (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Service Categories
CREATE TABLE IF NOT EXISTS service_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Service Providers
CREATE TABLE IF NOT EXISTS service_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  category_id uuid REFERENCES service_categories(id) NOT NULL,
  business_name text NOT NULL,
  description text,
  rating numeric DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Service Locations
CREATE TABLE IF NOT EXISTS service_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES service_providers(id) NOT NULL,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  address text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_locations ENABLE ROW LEVEL SECURITY;

-- Everyone can read active service categories
CREATE POLICY "Anyone can read active categories" ON service_categories
  FOR SELECT
  TO authenticated
  USING (active = true);

-- Service providers can read and update their own data
CREATE POLICY "Providers can manage own data" ON service_providers
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Service locations are visible to authenticated users
CREATE POLICY "Authenticated users can view locations" ON service_locations
  FOR SELECT
  TO authenticated
  USING (true);

-- Providers can manage their locations
CREATE POLICY "Providers can manage locations" ON service_locations
  FOR ALL
  TO authenticated
  USING (
    provider_id IN (
      SELECT id FROM service_providers WHERE user_id = auth.uid()
    )
  );