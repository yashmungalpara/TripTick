-- ==========================================
-- FIX: Relax Trip Permissions (Allow All Logged-in Users)
-- ==========================================

-- 1. Drop the strict Admin-Only policies
DROP POLICY IF EXISTS "Admins can insert trips" ON trips;
DROP POLICY IF EXISTS "Admins can update trips" ON trips;
DROP POLICY IF EXISTS "Admins can delete trips" ON trips;

-- 2. Create new policies allowing ANY authenticated user to manage trips
CREATE POLICY "Allow authenticated insert trips"
ON trips FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update trips"
ON trips FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete trips"
ON trips FOR DELETE
USING (auth.role() = 'authenticated');
