-- Enable UPDATE and DELETE for trips table
-- Currently, only SELECT and INSERT were enabled.

-- Allow valid users to update trips
create policy "Allow update for trips"
  on trips for update
  using ( true )  -- For now, allow everyone (or restrict to admin if prefer)
  with check ( true );

-- Allow valid users to delete trips
create policy "Allow delete for trips"
  on trips for delete
  using ( true ); -- For now, allow everyone

-- Ideally, you should restrict this to admins only:
-- using ( auth.uid() in (select id from profiles where role = 'admin') )
