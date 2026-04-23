-- Allow insert/update/delete on products & sessions using the anon key (same pattern as admin CRUD in-app).
-- Run after products_table.sql and sessions_table.sql. Tighten for production (e.g. service role only).

drop policy if exists "products_admin_mutations" on public.products;
create policy "products_admin_mutations"
  on public.products
  for all
  using (true)
  with check (true);

drop policy if exists "sessions_admin_mutations" on public.sessions;
create policy "sessions_admin_mutations"
  on public.sessions
  for all
  using (true)
  with check (true);
