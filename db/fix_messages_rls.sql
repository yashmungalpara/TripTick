-- ==========================================
-- FIX: RLS for Messages (Contact Form)
-- ==========================================

-- 1. Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public insert messages" ON messages;
DROP POLICY IF EXISTS "Allow admin select messages" ON messages;
DROP POLICY IF EXISTS "Allow admin delete messages" ON messages;

-- 3. Create Policy: Allow Public Insert (So anyone can send a message)
CREATE POLICY "Allow public insert messages"
ON messages FOR INSERT
WITH CHECK (true);

-- 4. Create Policy: Allow Authenticated/Admin Select (View Messages)
-- Ideally strictly for admins, but for now allow authenticated users to view
CREATE POLICY "Allow authenticated select messages"
ON messages FOR SELECT
USING (auth.role() = 'authenticated');

-- 5. Create Policy: Allow Authenticated/Admin Delete
CREATE POLICY "Allow authenticated delete messages"
ON messages FOR DELETE
USING (auth.role() = 'authenticated');
