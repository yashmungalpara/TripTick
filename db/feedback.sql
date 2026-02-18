-- Create feedback table (to match the code in Moments.js and Feedback.js)
create table if not exists feedback (
  id bigint primary key generated always as identity,
  name text not null,
  location text not null,
  text text not null,
  image text not null,
  rotation text,
  position integer,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table feedback enable row level security;

-- Policy: Allow public insert access (for anyone to post a story)
create policy "Allow public insert access"
  on feedback for insert
  with check ( true );

-- Policy: Allow public read access (so they can be displayed on the site)
create policy "Allow public read access"
  on feedback for select
  using ( true );

-- Policy: Allow delete (for admins)
create policy "Allow delete"
  on feedback for delete
  using ( true );
