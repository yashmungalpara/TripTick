-- ==========================================
-- FIX: RLS for Feedback (Admin Delete)
-- ==========================================

-- 1. Enable RLS (Ensure it's enabled)
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- 2. Allow Authenticated users (Admins) to DELETE feedback
-- The existing 'public insert' and 'public select' policies might be sufficient for those actions,
-- but DELETE is often restricted by default if no policy matches.

DROP POLICY IF EXISTS "Allow authenticated delete feedback" ON feedback;

CREATE POLICY "Allow authenticated delete feedback"
ON feedback FOR DELETE
USING (auth.role() = 'authenticated');
