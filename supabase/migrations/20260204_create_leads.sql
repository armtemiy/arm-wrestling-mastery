create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  message text not null,
  page_url text,
  referrer text,
  user_agent text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  ip text,
  source text default 'terminal',
  created_at timestamp with time zone default now()
);

alter table public.leads enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'leads'
      and policyname = 'allow_insert_leads'
  ) then
    create policy "allow_insert_leads"
    on public.leads
    for insert
    to anon
    with check (true);
  end if;
end $$;
