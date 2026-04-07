-- Run in Supabase SQL Editor if you do not have a `sessions` table yet.
-- Adjust types or RLS to match your security model.

create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  starts_at timestamptz,
  ends_at timestamptz,
  working boolean not null default false,
  location text,
  format text default 'online',
  facilitator text,
  max_participants integer,
  session_type text,
  created_at timestamptz default now()
);

create index if not exists sessions_starts_at_idx on public.sessions (starts_at);

alter table public.sessions enable row level security;

create policy "Allow public read sessions"
  on public.sessions
  for select
  using (true);
