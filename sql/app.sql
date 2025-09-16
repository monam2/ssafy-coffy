-- Extensions
create extension if not exists pgcrypto;
create extension if not exists citext;

-- Schema
create schema if not exists app;

-- Enums
create type app.order_status as enum ('pending', 'paid', 'cancelled');

-- Tables
create table if not exists app.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email citext unique not null,
  display_name text,
  role text not null default 'user',
  discord_webhook_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists app.categories (
  id smallserial primary key,
  name text not null,
  value text not null unique,
  sort_order smallint not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists app.menus (
  id bigserial primary key,
  category_id smallint not null references app.categories(id),
  name text not null,
  description text,
  price integer not null check (price >= 0),
  img text,
  only_ice boolean not null default false,
  is_sold_out boolean not null default false,
  is_active boolean not null default true,
  tags jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (category_id, name)
);

create table if not exists app.menu_price_history (
  id bigserial primary key,
  menu_id bigint not null references app.menus(id) on delete cascade,
  old_price integer not null,
  new_price integer not null,
  changed_by uuid null references app.users(id),
  changed_at timestamptz not null default now()
);

create table if not exists app.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app.users(id) on delete cascade,
  status text not null check (status in ('active','ordered','abandoned')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists carts_user_active_unique
  on app.carts(user_id) where status = 'active';

create table if not exists app.cart_items (
  id bigserial primary key,
  cart_id uuid not null references app.carts(id) on delete cascade,
  menu_id bigint not null references app.menus(id),
  quantity integer not null default 1 check (quantity > 0),
  unit_price integer not null check (unit_price >= 0),
  is_hot boolean not null default false,
  is_shot boolean not null default false,
  is_whip boolean not null default false,
  is_syrup boolean not null default false,
  is_milk boolean not null default false,
  is_peorl boolean not null default false,
  only_ice boolean not null default false
);
create index if not exists cart_items_cart_id_idx on app.cart_items(cart_id);

create table if not exists app.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app.users(id) on delete cascade,
  total_price integer not null check (total_price >= 0),
  status app.order_status not null default 'pending',
  payment_method text null,
  external_id text null,
  admin_note text null,
  cancelled_reason text null,
  assigned_to uuid null references app.users(id),
  paid_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists orders_created_at_idx on app.orders(created_at desc);
create index if not exists orders_user_created_idx on app.orders(user_id, created_at desc);
create index if not exists orders_status_idx on app.orders(status);
create index if not exists orders_assigned_idx on app.orders(assigned_to);

create table if not exists app.order_items (
  id bigserial primary key,
  order_id uuid not null references app.orders(id) on delete cascade,
  menu_id bigint null references app.menus(id),
  name_snapshot text not null,
  price_snapshot integer not null check (price_snapshot >= 0),
  quantity integer not null default 1 check (quantity > 0),
  is_hot boolean not null default false,
  is_shot boolean not null default false,
  is_whip boolean not null default false,
  is_syrup boolean not null default false,
  is_milk boolean not null default false,
  is_peorl boolean not null default false,
  only_ice boolean not null default false
);
create index if not exists order_items_order_id_idx on app.order_items(order_id);

create table if not exists app.event_logs (
  id bigserial primary key,
  user_id uuid null references app.users(id),
  event_type text not null,
  entity_type text null,
  entity_id text null,
  level text not null default 'info',
  payload jsonb not null default '{}'::jsonb,
  request_id text null,
  ip text null,
  created_at timestamptz not null default now()
);
create index if not exists event_logs_created_idx on app.event_logs(created_at desc);
create index if not exists event_logs_event_type_idx on app.event_logs(event_type);
create index if not exists event_logs_level_idx on app.event_logs(level);

create table if not exists app.webhook_endpoints (
  id bigserial primary key,
  name text not null,
  channel text not null default 'discord',
  url text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists app.notifications (
  id bigserial primary key,
  endpoint_id bigint not null references app.webhook_endpoints(id) on delete cascade,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'queued',
  response_code integer null,
  created_at timestamptz not null default now(),
  sent_at timestamptz null
);
create index if not exists notifications_created_idx on app.notifications(created_at desc);
create index if not exists notifications_status_idx on app.notifications(status);

-- updated_at triggers
create or replace function app.set_updated_at() returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end$$;

drop trigger if exists set_updated_at_users on app.users;
create trigger set_updated_at_users before update on app.users
for each row execute function app.set_updated_at();

drop trigger if exists set_updated_at_menus on app.menus;
create trigger set_updated_at_menus before update on app.menus
for each row execute function app.set_updated_at();

drop trigger if exists set_updated_at_carts on app.carts;
create trigger set_updated_at_carts before update on app.carts
for each row execute function app.set_updated_at();

drop trigger if exists set_updated_at_orders on app.orders;
create trigger set_updated_at_orders before update on app.orders
for each row execute function app.set_updated_at();

-- menu price history trigger
create or replace function app.log_menu_price_change() returns trigger language plpgsql as $$
declare
  jwt jsonb;
  uid uuid;
begin
  if (old.price is distinct from new.price) then
    begin
      jwt := nullif(current_setting('request.jwt.claims', true), '')::jsonb;
      uid := (jwt->>'sub')::uuid;
    exception when others then
      uid := null;
    end;
    insert into app.menu_price_history(menu_id, old_price, new_price, changed_by)
    values (old.id, old.price, new.price, uid);
  end if;
  return new;
end$$;

drop trigger if exists log_menu_price_change on app.menus;
create trigger log_menu_price_change
after update of price on app.menus
for each row execute function app.log_menu_price_change();

-- order status change trigger
create or replace function app.log_and_queue_on_order_status_change() returns trigger language plpgsql as $$
begin
  if (old.status is distinct from new.status) then
    insert into app.event_logs(user_id, event_type, entity_type, entity_id, level, payload)
    values (
      new.user_id,
      'order.status_changed',
      'order',
      new.id::text,
      'info',
      jsonb_build_object('from', old.status, 'to', new.status)
    );

    insert into app.notifications(endpoint_id, event_type, payload, status)
    select id,
           'order.status_changed',
           jsonb_build_object('order_id', new.id, 'from', old.status, 'to', new.status),
           'queued'
    from app.webhook_endpoints
    where is_active = true;
  end if;
  return new;
end$$;

drop trigger if exists log_and_queue_on_order_status_change on app.orders;
create trigger log_and_queue_on_order_status_change
after update of status on app.orders
for each row execute function app.log_and_queue_on_order_status_change();