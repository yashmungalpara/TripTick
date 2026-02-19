-- ==========================================
-- GRANT ADMIN ACCESS TO public.users
-- ==========================================

-- 1. Enable RLS on public.users (if not already enabled)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policy if it exists to avoid conflicts
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;

-- 3. Create Policy: Admins can view ALL rows in public.users
-- We verify admin status by checking the 'profiles' table which contains the role.
CREATE POLICY "Admins can view all users"
ON public.users
FOR SELECT
USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

-- 4. Create Policy: Admins can delete users (Optional, but good for management)
DROP POLICY IF EXISTS "Admins can delete users" ON public.users;
CREATE POLICY "Admins can delete users"
ON public.users
FOR DELETE
USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

-- Note: Inserting into public.users is handled by the trigger on auth.users, 
-- or by the user themselves updating their profile. Admins usually don't insert users manually here.
