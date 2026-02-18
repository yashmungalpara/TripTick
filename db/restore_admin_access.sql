-- ==========================================
-- Restore Admin Access
-- ==========================================

-- Replace 'your_email@example.com' with your actual login email
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'your_email@example.com';

-- Verify the change (Output should show role as 'admin')
SELECT * FROM public.profiles WHERE email = 'your_email@example.com';
