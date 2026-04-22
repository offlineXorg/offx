-- OffX initial schema
-- Apply with: supabase db push

create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  x_user_id text unique not null,
  x_handle text not null,
  x_access_token text not null,
  x_refresh_token text not null,
  x_token_expires_at timestamptz not null,
  phone_e164 text unique,
  phone_verified_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists users_phone_idx on public.users (phone_e164) where phone_e164 is not null;

create table if not exists public.tweets_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  tweet_id text,
  body text not null,
  status text not null check (status in ('posted', 'failed', 'rate_limited', 'blocked')),
  error text,
  created_at timestamptz not null default now()
);

create index if not exists tweets_log_user_created_idx on public.tweets_log (user_id, created_at desc);

-- Trigger to keep updated_at fresh
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists users_touch_updated_at on public.users;
create trigger users_touch_updated_at
  before update on public.users
  for each row execute function public.touch_updated_at();

-- Row level security: deny by default. Service role bypasses RLS.
alter table public.users enable row level security;
alter table public.tweets_log enable row level security;

-- Intentionally no anon/authenticated policies: all access goes through
-- server routes using the service-role key. Add narrow policies later
-- if we ever expose a client-side Supabase SDK.

-- Tables created via raw SQL (psql, MCP, dashboard editor) inherit the
-- creator's grants, NOT Supabase's default ALTER DEFAULT PRIVILEGES set
-- on supabase_admin. Without this block, PostgREST hits the tables as
-- service_role / anon and returns 42501 "permission denied". Re-grant
-- explicitly so the standard Supabase roles can hit the tables.
grant all on table public.users to anon, authenticated, service_role;
grant all on table public.tweets_log to anon, authenticated, service_role;
grant all on function public.touch_updated_at() to anon, authenticated, service_role;
