create table if not exists public.edge_rate_limits (
  key text primary key,
  count integer not null default 0,
  window_started_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.check_rate_limit(
  p_key text,
  p_window_seconds integer,
  p_max_requests integer
)
returns json
language plpgsql
security definer
as $$
declare
  v_now timestamptz := now();
  v_row public.edge_rate_limits%rowtype;
  v_retry_after integer := 0;
begin
  insert into public.edge_rate_limits as rl (key, count, window_started_at, updated_at)
  values (p_key, 1, v_now, v_now)
  on conflict (key) do update
    set
      count = case
        when rl.window_started_at <= (v_now - make_interval(secs => p_window_seconds)) then 1
        else rl.count + 1
      end,
      window_started_at = case
        when rl.window_started_at <= (v_now - make_interval(secs => p_window_seconds)) then v_now
        else rl.window_started_at
      end,
      updated_at = v_now
  returning * into v_row;

  if v_row.count > p_max_requests then
    v_retry_after := greatest(
      1,
      p_window_seconds - extract(epoch from (v_now - v_row.window_started_at))::int
    );

    return json_build_object(
      'allowed', false,
      'retry_after', v_retry_after
    );
  end if;

  return json_build_object(
    'allowed', true,
    'retry_after', 0
  );
end;
$$;

revoke all on function public.check_rate_limit(text, integer, integer) from public;
grant execute on function public.check_rate_limit(text, integer, integer) to service_role;
