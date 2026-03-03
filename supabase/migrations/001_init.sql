create extension if not exists "uuid-ossp";

create table if not exists profiles (
  id uuid primary key default uuid_generate_v4(),
  hero_title text not null,
  hero_subtitle text not null,
  bio text not null,
  profile_image_url text,
  socials jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  category text not null,
  tags text[] not null default '{}',
  year int not null,
  role text not null,
  tools text[] not null default '{}',
  description text not null,
  content text not null,
  featured boolean not null default false,
  cover_type text not null check (cover_type in ('image', 'video')),
  cover_url text not null,
  cover_thumb_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists project_media (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references projects(id) on delete cascade,
  type text not null check (type in ('image', 'video')),
  url text not null,
  thumb_url text,
  sort_order int not null default 0
);

create table if not exists contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table projects enable row level security;
alter table project_media enable row level security;
alter table contact_submissions enable row level security;

create policy "Public read projects" on projects for select using (true);
create policy "Public read project_media" on project_media for select using (true);
create policy "Public read profile" on profiles for select using (true);

create policy "Authenticated manage projects" on projects for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage project_media" on project_media for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated manage profile" on profiles for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Public insert contact" on contact_submissions for insert with check (true);
create policy "Authenticated read contact" on contact_submissions for select using (auth.role() = 'authenticated');

insert into profiles (hero_title, hero_subtitle, bio, socials)
values (
  'John Eric — Designer & Editor',
  'Ecommerce creatives, product design, motion UI, and scalable brand systems.',
  'John Eric is a multidisciplinary creative with 7+ years in ecommerce campaigns, UI systems, and motion storytelling.',
  '{"instagram":"https://instagram.com","behance":"https://behance.net","dribbble":"https://dribbble.com","tiktok":"https://tiktok.com","youtube":"https://youtube.com","linkedin":"https://linkedin.com"}'::jsonb
)
on conflict do nothing;
