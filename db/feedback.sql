-- Create feedback table
create table if not exists feedback (
  id bigint primary key generated always as identity,
  name text not null,
  location text not null,
  text text not null,
  image text not null,
  rotation text not null,
  position integer,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table feedback enable row level security;

-- Policy: Allow public read access
create policy "Allow public read access"
  on feedback for select
  using ( true );

-- Policy: Allow public insert access (for the demo/feedback feature)
create policy "Allow public insert access"
  on feedback for insert
  with check ( true );
