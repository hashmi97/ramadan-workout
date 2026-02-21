-- =============================================================================
-- Sample seed data for Ramadan Cut Tracker
-- =============================================================================
-- HOW TO USE:
-- 1. Create a test user: Supabase Dashboard → Authentication → Users → Add user
--    (or sign up via the app with magic link)
-- 2. Copy the user's UUID from the Users table
-- 3. Replace 'YOUR_USER_ID_HERE' below with that UUID
-- 4. Run this script in Supabase SQL Editor
-- =============================================================================

do $$
declare
  test_user_id uuid := 'YOUR_USER_ID_HERE';
  pd_id uuid;
  d date;
  dow int;
  plan_type_val text;
  gym_type_val text;
  i int;
begin
  -- Verify user exists in profiles (created by auth trigger)
  if not exists (select 1 from public.profiles where id = test_user_id) then
    raise exception 'User % not found in profiles. Create the user in Auth first.', test_user_id;
  end if;

  for i in 0..27 loop
    d := '2026-02-22'::date + i;
    dow := extract(dow from d)::int;  -- 0=Sun, 1=Mon, ..., 6=Sat

    -- Skip if plan_day already exists (idempotent)
    if exists (select 1 from public.plan_days where user_id = test_user_id and date = d) then
      continue;
    end if;

    -- plan_type and gym_type from day of week
    case dow
      when 0 then plan_type_val := 'rest'; gym_type_val := null;
      when 1 then plan_type_val := 'pre_iftar_gym'; gym_type_val := 'A';
      when 2 then plan_type_val := 'pre_iftar'; gym_type_val := null;
      when 3 then plan_type_val := 'pre_iftar_gym'; gym_type_val := 'B';
      when 4 then plan_type_val := 'pre_iftar'; gym_type_val := null;
      when 5 then plan_type_val := 'pre_iftar_gym'; gym_type_val := 'C';
      when 6 then plan_type_val := 'walk'; gym_type_val := null;
      else plan_type_val := 'rest'; gym_type_val := null;
    end case;

    insert into public.plan_days (user_id, date, plan_type, gym_type)
    values (test_user_id, d, plan_type_val, gym_type_val)
    returning id into pd_id;

    -- Pre-Iftar tasks
    if plan_type_val in ('pre_iftar_gym', 'pre_iftar') then
      insert into public.day_tasks (plan_day_id, task_key, task_label, completed) values
        (pd_id, 'warmup', 'Warm-up 5 min', false),
        (pd_id, 'round_1', 'Round 1', false),
        (pd_id, 'round_2', 'Round 2', false),
        (pd_id, 'round_3', 'Round 3', false),
        (pd_id, 'round_4', 'Round 4', false),
        (pd_id, 'round_5', 'Round 5', false),
        (pd_id, 'core_finisher', 'Core Finisher', false);
    end if;

    -- Gym tasks (for pre_iftar_gym days)
    if plan_type_val = 'pre_iftar_gym' then
      insert into public.day_tasks (plan_day_id, task_key, task_label, completed) values
        (pd_id, 'main_lifts', 'Main lifts completed', false),
        (pd_id, 'accessories', 'Accessories completed', false),
        (pd_id, 'abs', 'Abs completed', false);
    end if;

    -- Walk tasks
    if plan_type_val = 'walk' then
      insert into public.day_tasks (plan_day_id, task_key, task_label, completed) values
        (pd_id, 'walk_45', 'Walk 45 min', false);
    end if;

    -- Rest tasks
    if plan_type_val = 'rest' then
      insert into public.day_tasks (plan_day_id, task_key, task_label, completed) values
        (pd_id, 'rest', 'Rest', false),
        (pd_id, 'optional_walk', 'Optional Light Walk 20–30 min', false);
    end if;

  end loop;

  -- Add sample "completed" tasks for first few days (for visual testing)
  -- Day 1 (2026-02-23 Mon): complete warmup and round 1
  update public.day_tasks dt
  set completed = true
  from public.plan_days pd
  where dt.plan_day_id = pd.id
    and pd.user_id = test_user_id
    and pd.date = '2026-02-23'
    and dt.task_key in ('warmup', 'round_1');

  -- Day 2 (2026-02-24 Tue): complete all pre-iftar
  update public.day_tasks dt
  set completed = true
  from public.plan_days pd
  where dt.plan_day_id = pd.id
    and pd.user_id = test_user_id
    and pd.date = '2026-02-24';

  -- Day 3 (2026-02-25 Wed): partial gym day
  update public.day_tasks dt
  set completed = true
  from public.plan_days pd
  where dt.plan_day_id = pd.id
    and pd.user_id = test_user_id
    and pd.date = '2026-02-25'
    and dt.task_key in ('warmup', 'round_1', 'round_2', 'core_finisher', 'main_lifts');

  raise notice 'Seed complete: 28 plan_days + day_tasks for user %', test_user_id;
end $$;
