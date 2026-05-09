alter table public.leads
add column if not exists ip_hash text;

alter table public.leads
add column if not exists request_id text;

create index if not exists leads_created_at_idx
on public.leads (created_at desc);

create index if not exists leads_request_id_idx
on public.leads (request_id);

drop policy if exists "allow_insert_leads" on public.leads;

revoke insert on public.leads from anon, authenticated;
