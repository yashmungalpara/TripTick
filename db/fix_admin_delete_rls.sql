-- Allow delete for bookings
create policy "Allow delete for bookings"
  on bookings for delete
  using ( true );

-- Allow delete for profiles
create policy "Allow delete for profiles"
  on profiles for delete
  using ( true );
