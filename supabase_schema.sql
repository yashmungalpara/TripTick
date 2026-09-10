-- Create the trips table
create table trips (
  id bigint primary key, -- Keeping existing IDs
  category text,
  country text,
  flag text,
  title text,
  location text,
  days text,
  price text,
  rating text,
  reviews text,
  image text,
  description text,
  best_time text,
  difficulty text,
  group_size text,
  accommodation text,
  itinerary text,
  highlights text[] -- Array of strings
);

-- Enable Row Level Security (RLS)
alter table trips enable row level security;

-- Create Policy: Allow Public Read Access
create policy "Allow public read access"
  on trips for select
  using ( true );

-- Create Policy: Allow Authenticated Users (or specific roles) to Insert/Update
-- For now, allow public insert just for migration (DISABLE after migration for security)
create policy "Allow public insert for migration"
  on trips for insert
  with check ( true );
