-- Run in Supabase SQL Editor if you do not have a `products` table yet.

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  features text[] default '{}',
  icon text,
  featured boolean not null default false,
  sort_order integer default 0,
  created_at timestamptz default now()
);

alter table public.products enable row level security;

create policy "Allow public read products"
  on public.products
  for select
  using (true);
