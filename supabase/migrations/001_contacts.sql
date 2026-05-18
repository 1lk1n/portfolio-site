-- Run this in Supabase SQL Editor before deploying
create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  comment text not null,
  created_at timestamptz default now()
);

alter table contacts enable row level security;

-- Inserts are performed server-side with the service role key only.
