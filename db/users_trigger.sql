-- 1. Create the public.users table (if not exists)
create table if not exists public.users (
  id uuid not null references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now()
);

-- 2. Enable Row Level Security (RLS)
alter table public.users enable row level security;

-- 3. Create RLS Policies
-- Policy: Allow users to view their own profile
create policy "Users can view their own profile" 
on public.users for select 
using ( auth.uid() = id );

-- Policy: Allow users to update their own profile
create policy "Users can update their own profile" 
on public.users for update 
using ( auth.uid() = id );

-- 4. Create the Trigger Function
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, email, full_name, avatar_url, role)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    coalesce(new.raw_user_meta_data->>'role', 'user') -- Default to 'user' if not provided
  );
  return new;
end;
$$ language plpgsql security definer;

-- 5. Create the Trigger
-- Trigger calls the function after a new row is inserted into auth.users
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Verification Query (Run this after signup to check)
-- select * from public.users;
