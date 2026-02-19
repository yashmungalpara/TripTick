-- ==========================================
-- FIX ADMIN LOGIN (RLS RECURSION)
-- ==========================================

-- The previous policy caused an infinite loop because checking if you are an admin 
-- required reading the profiles table, which triggered the policy again.

-- 1. Create a Secure Function to Check Admin Status
--    SECURITY DEFINER means it runs with system privileges, bypassing RLS to safely check the role.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Update Profiles Policy
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Allow individual read access" ON profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON profiles; -- Cleanup old ones

CREATE POLICY "Profiles Policy"
ON public.profiles FOR SELECT
USING (
  auth.uid() = id      -- Users can see themselves
  OR
  public.is_admin()    -- Admins can see everyone (via secure function)
);

-- 3. Update Other Admin Tables to use the secure function too (Safer)
--    (Optional but recommended for consistency)

-- Trips
DROP POLICY IF EXISTS "Admins can insert trips" ON trips;
CREATE POLICY "Admins can insert trips" ON trips FOR INSERT WITH CHECK ( public.is_admin() );

DROP POLICY IF EXISTS "Admins can update trips" ON trips;
CREATE POLICY "Admins can update trips" ON trips FOR UPDATE USING ( public.is_admin() );

DROP POLICY IF EXISTS "Admins can delete trips" ON trips;
CREATE POLICY "Admins can delete trips" ON trips FOR DELETE USING ( public.is_admin() );

-- Bookings
DROP POLICY IF EXISTS "Users and Admins view bookings" ON bookings;
CREATE POLICY "Users and Admins view bookings" ON bookings FOR SELECT
USING ( auth.uid() = user_id OR public.is_admin() );
