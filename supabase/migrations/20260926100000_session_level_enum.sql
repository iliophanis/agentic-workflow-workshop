-- Issue #2: show each session's level. `level` is an enum so the allowed
-- values are part of the schema and `pnpm db:types` generates a union type
-- for them (same reasoning as `session_track`). The column is added nullable,
-- backfilled for the existing sessions, then made NOT NULL so every session
-- has a level.
-- No RLS change: the existing read policy applies per row.

do $$
begin
  if not exists (
    select 1
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where n.nspname = 'public'
      and t.typname = 'session_level'
  ) then
    create type public.session_level as enum (
      'beginner',
      'intermediate',
      'advanced'
    );
  end if;
end $$;

alter table public.sessions
  add column if not exists level public.session_level;

update public.sessions
set level = case id
  when 'opening-keynote'             then 'beginner'::public.session_level
  when 'closing-panel'               then 'beginner'::public.session_level
  when 'build-your-agentic-workflow' then 'intermediate'::public.session_level
  when 'agent-context-windows'       then 'intermediate'::public.session_level
  when 'testing-ai-generated-code'   then 'intermediate'::public.session_level
  when 'server-components-deep-dive' then 'advanced'::public.session_level
  when 'rsc-payload-budget'          then 'advanced'::public.session_level
  when 'micro-frontends-2026'        then 'advanced'::public.session_level
end
where id in (
  'opening-keynote',
  'closing-panel',
  'build-your-agentic-workflow',
  'agent-context-windows',
  'testing-ai-generated-code',
  'server-components-deep-dive',
  'rsc-payload-budget',
  'micro-frontends-2026'
);

alter table public.sessions
  alter column level set not null;
