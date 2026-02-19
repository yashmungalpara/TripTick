-- ==========================================
-- FORCE RESTORE ADMIN ACCESS
-- ==========================================

-- 1. Insert/Update Profile for your user manually
--    REPLACE 'your_email@example.com' with your actual email address!
--    (If you don't know your email, you can run: select email from auth.users;)

DO $$
DECLARE
  target_email TEXT := 'your_email@example.com'; -- <<< CHANGE THIS
  target_user_id UUID;
BEGIN
  -- Find the user's ID from auth.users
  SELECT id INTO target_user_id FROM auth.users WHERE email = target_email;

  IF target_user_id IS NOT NULL THEN
    -- Upsert into profiles
    INSERT INTO public.profiles (id, email, role, full_name)
    VALUES (target_user_id, target_email, 'admin', 'Admin User')
    ON CONFLICT (id) DO UPDATE
    SET role = 'admin';
    
    RAISE NOTICE 'Admin access restored for %', target_email;
  ELSE
    RAISE NOTICE 'User not found with email %', target_email;
  END IF;
END $$;

-- 2. EMERGENCY: Allow checking admin status
--    Ensure you can at least read your own profile to check the role
DROP POLICY IF EXISTS "Allow individual read access" ON profiles;
CREATE POLICY "Allow individual read access"
ON public.profiles FOR SELECT
USING ( auth.uid() = id );

-- 3. Verify
--    After running, you should be able to log in.
