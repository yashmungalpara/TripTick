-- Create testimonials table
create table if not exists testimonials (
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
alter table testimonials enable row level security;

-- Policy: Allow public read access
create policy "Allow public read access"
  on testimonials for select
  using ( true );

-- Policy: Allow public insert access (for the demo/feedback feature)
create policy "Allow public insert access"
  on testimonials for insert
  with check ( true );
