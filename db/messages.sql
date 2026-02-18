-- WARNING: This will delete all existing messages!
drop table if exists messages;

-- Create messages table
create table messages (
  id bigint primary key generated always as identity,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text default 'unread',
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table messages enable row level security;

-- Policy: Allow public insert access
create policy "Allow public insert access"
  on messages for insert
  with check ( true );

-- Policy: Allow public read access
create policy "Allow public read access"
  on messages for select
  using ( true );

-- Policy: Allow delete
create policy "Allow delete"
  on messages for delete
  using ( true );
