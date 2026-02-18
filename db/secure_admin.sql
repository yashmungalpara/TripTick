-- ==========================================
-- Secure Admin Panel & Database Access
-- ==========================================

-- 1. SECURE TRIPS (Public Read, Admin Write)
-- Drop existing policies if they conflict (safest to start clean for this table's write access)
DROP POLICY IF EXISTS "Allow public insert for migration" ON trips;

-- Create Admin-Only Write Policies
CREATE POLICY "Admins can insert trips"
ON trips FOR INSERT
WITH CHECK (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

CREATE POLICY "Admins can update trips"
ON trips FOR UPDATE
USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

CREATE POLICY "Admins can delete trips"
ON trips FOR DELETE
USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);


-- 2. SECURE FEEDBACK (Public Read/Insert, Admin Delete)
-- Existing policies allow public read and insert. We just need to ensure Delete is admin only.
CREATE POLICY "Admins can delete feedback"
ON feedback FOR DELETE
USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);


-- 3. SECURE BOOKINGS (User View Own, Admin View All)
-- Drop the temporary "read all" policy if it exists
DROP POLICY IF EXISTS "Enable read access for all users" ON bookings;
DROP POLICY IF EXISTS "Users can view own bookings." ON bookings;

-- Re-create Read Policy: Own bookings OR Admin
CREATE POLICY "Users and Admins view bookings"
ON bookings FOR SELECT
USING (
  auth.uid() = user_id OR 
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);


-- 4. SECURE PROFILES (Prevent Role Escalation)
-- Create a function to check role updates
CREATE OR REPLACE FUNCTION public.check_role_update()
RETURNS TRIGGER AS $$
BEGIN
  -- If the role is being changed
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    -- Allow if it's the service_role (superuser) or potentially an admin (optional)
    -- For now, strictly block users from changing their own role via client API
    -- Supabase client uses auth.role() = 'authenticated' usually.
    IF auth.role() = 'authenticated' THEN
      RAISE EXCEPTION 'You are not allowed to change your role.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger before update
DROP TRIGGER IF EXISTS protect_role_update ON profiles;
CREATE TRIGGER protect_role_update
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION public.check_role_update();

-- ==========================================
-- End of Security Update
-- ==========================================
