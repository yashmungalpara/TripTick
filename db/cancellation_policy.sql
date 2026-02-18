-- Create Policy: Allow users to UPDATE (Cancel) their own booking
-- Only if the trip is MORE THAN 48 HOURS away.

create policy "Allow cancellation before 48 hours"
on bookings
for update
using (
  auth.uid() = user_id 
  AND 
  travel_date > (now() + interval '2 days')
)
with check (
  status = 'cancelled' -- Only allow changing status to 'cancelled'
);
