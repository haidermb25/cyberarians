-- Run in Supabase SQL Editor. Enables CRUD from the app using the anon key (open policies — lock down for production).

create table if not exists public.engineers (
  id text primary key,
  name text not null,
  role text not null,
  image text default '',
  location text default '',
  experience text default '',
  focus text default '',
  summary text default '',
  skills text[] default '{}',
  linkedin text,
  github text,
  email text,
  website text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.service_offerings (
  id text primary key,
  title text not null,
  description text default '',
  highlights text[] default '{}',
  featured boolean not null default false,
  sort_order integer default 0,
  created_at timestamptz default now()
);

alter table public.engineers enable row level security;
alter table public.service_offerings enable row level security;

-- Public read (site)
create policy "engineers_select" on public.engineers for select using (true);
create policy "service_offerings_select" on public.service_offerings for select using (true);

-- Required for admin CRUD with anon key (tighten in production, e.g. service role only)
create policy "engineers_all" on public.engineers for all using (true) with check (true);
create policy "service_offerings_all" on public.service_offerings for all using (true) with check (true);
