create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null check (role in ('student', 'admissions', 'developer')),
  created_at timestamptz not null default now()
);

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  code text not null unique,
  min_grade integer not null,
  required_subjects jsonb not null default '[]'::jsonb,
  capacity integer not null default 0,
  fee numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  full_name text not null,
  email text not null,
  kcse_index text not null,
  mean_grade text not null,
  mean_points integer not null,
  subjects jsonb not null default '[]'::jsonb,
  selected_course text not null,
  ai_recommended_course text,
  ai_reasoning text,
  status text not null check (status in ('pending', 'auto_approved', 'auto_rejected', 'approved', 'rejected')),
  remarks text default '',
  registration_number text unique,
  created_at timestamptz not null default now()
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  kcse_cert_url text,
  id_copy_url text,
  passport_url text,
  created_at timestamptz not null default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  amount numeric(12,2) not null,
  receipt_url text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table applications enable row level security;
alter table documents enable row level security;
alter table payments enable row level security;

create policy "students can view own profile" on profiles for select using (auth.uid() = id);
create policy "students can view own applications" on applications for select using (auth.uid() = user_id);
create policy "students can insert own applications" on applications for insert with check (auth.uid() = user_id);
create policy "students can view own documents" on documents for select using (auth.uid() = user_id);
create policy "students can insert own documents" on documents for insert with check (auth.uid() = user_id);
create policy "students can view own payments" on payments for select using (auth.uid() = user_id);
