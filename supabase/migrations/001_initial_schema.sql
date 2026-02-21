-- profiles: extends auth.users
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  created_at timestamptz default now()
);

-- plan_days: one row per user per date
create table public.plan_days (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  date date not null,
  plan_type text not null,
  gym_type text check (gym_type in ('A', 'B', 'C')),
  created_at timestamptz default now(),
  unique (user_id, date)
);

create index plan_days_user_date_idx on public.plan_days (user_id, date);

-- day_tasks: checklist items for each plan_day
create table public.day_tasks (
  id uuid primary key default gen_random_uuid(),
  plan_day_id uuid not null references public.plan_days(id) on delete cascade,
  task_key text not null,
  task_label text not null,
  completed boolean default false,
  meta jsonb,
  created_at timestamptz default now()
);

create index day_tasks_plan_day_idx on public.day_tasks (plan_day_id);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.plan_days enable row level security;
alter table public.day_tasks enable row level security;

-- profiles policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- plan_days policies
create policy "Users can view own plan_days"
  on public.plan_days for select
  using (auth.uid() = user_id);

create policy "Users can insert own plan_days"
  on public.plan_days for insert
  with check (auth.uid() = user_id);

create policy "Users can update own plan_days"
  on public.plan_days for update
  using (auth.uid() = user_id);

create policy "Users can delete own plan_days"
  on public.plan_days for delete
  using (auth.uid() = user_id);

-- day_tasks policies (via plan_days ownership)
create policy "Users can view own day_tasks"
  on public.day_tasks for select
  using (
    exists (
      select 1 from public.plan_days pd
      where pd.id = day_tasks.plan_day_id
      and pd.user_id = auth.uid()
    )
  );

create policy "Users can insert own day_tasks"
  on public.day_tasks for insert
  with check (
    exists (
      select 1 from public.plan_days pd
      where pd.id = day_tasks.plan_day_id
      and pd.user_id = auth.uid()
    )
  );

create policy "Users can update own day_tasks"
  on public.day_tasks for update
  using (
    exists (
      select 1 from public.plan_days pd
      where pd.id = day_tasks.plan_day_id
      and pd.user_id = auth.uid()
    )
  );

create policy "Users can delete own day_tasks"
  on public.day_tasks for delete
  using (
    exists (
      select 1 from public.plan_days pd
      where pd.id = day_tasks.plan_day_id
      and pd.user_id = auth.uid()
    )
  );

-- Trigger: create profile on auth.users insert
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email)
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


