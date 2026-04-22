-- Record how many photos were attached to each posted tweet so we can
-- track MMS usage, bill properly, and detect abuse patterns.
alter table public.tweets_log
  add column if not exists media_count int not null default 0;
