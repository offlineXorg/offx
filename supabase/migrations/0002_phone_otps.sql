-- Local OTP store. We moved off Twilio Verify because its per-country
-- Geo-Permissions are separate from Messaging's and were blocking our
-- target countries. We now issue and verify OTPs ourselves, and the SMS
-- is delivered via plain Twilio Messaging (one geo-perm panel to manage).

create table if not exists public.phone_otps (
  id uuid primary key default gen_random_uuid(),
  phone_e164 text not null,
  code_hash text not null,
  attempts int not null default 0,
  expires_at timestamptz not null,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists phone_otps_phone_created_idx
  on public.phone_otps (phone_e164, created_at desc);

alter table public.phone_otps enable row level security;

grant all on table public.phone_otps to anon, authenticated, service_role;
