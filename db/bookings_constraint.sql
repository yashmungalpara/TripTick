-- Add a constraint to ensure travel_date is not in the past
-- Note: 'CURRENT_DATE' returns the date based on the server's timezone (usually UTC)

ALTER TABLE bookings
ADD CONSTRAINT check_future_date 
CHECK (travel_date >= CURRENT_DATE);

-- If you want to check against specific timezone (e.g. IST), you can use:
-- CHECK (travel_date >= (now() at time zone 'Asia/Kolkata')::date);
