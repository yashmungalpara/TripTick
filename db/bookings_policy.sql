-- 1. Enable RLS on bookings (if not already enabled)
alter table bookings enable row level security;

-- 2. Create Policy for INSERT
-- This ensures that NEW bookings must have a future date.
-- It ignores existing rows (so you keep your history!)
create policy "Prevent past bookings"
on bookings
for insert
with check ( travel_date >= CURRENT_DATE );

-- 3. (Optional) Create Policy for UPDATE
-- Prevents updating a booking to a past date
create policy "Prevent moving booking to past"
on bookings
for update
using ( true )
with check ( travel_date >= CURRENT_DATE );
