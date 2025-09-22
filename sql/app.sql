-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.cart_items (
  id bigint NOT NULL DEFAULT nextval('cart_items_id_seq'::regclass),
  cart_id uuid NOT NULL,
  menu_id bigint NOT NULL,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price integer NOT NULL CHECK (unit_price >= 0),
  is_hot boolean NOT NULL DEFAULT false,
  is_shot boolean NOT NULL DEFAULT false,
  is_whip boolean NOT NULL DEFAULT false,
  is_syrup boolean NOT NULL DEFAULT false,
  is_milk boolean NOT NULL DEFAULT false,
  is_peorl boolean NOT NULL DEFAULT false,
  only_ice boolean NOT NULL DEFAULT false,
  CONSTRAINT cart_items_pkey PRIMARY KEY (id),
  CONSTRAINT cart_items_menu_id_fkey FOREIGN KEY (menu_id) REFERENCES public.menus(id),
  CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id)
);
CREATE TABLE public.carts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  status text NOT NULL CHECK (status = ANY (ARRAY['active'::text, 'ordered'::text, 'abandoned'::text])),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT carts_pkey PRIMARY KEY (id),
  CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.categories (
  id smallint NOT NULL DEFAULT nextval('categories_id_seq'::regclass),
  name text NOT NULL,
  value text NOT NULL UNIQUE,
  sort_order smallint NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.event_logs (
  id bigint NOT NULL DEFAULT nextval('event_logs_id_seq'::regclass),
  user_id uuid,
  event_type text NOT NULL,
  entity_type text,
  entity_id text,
  level text NOT NULL DEFAULT 'info'::text,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  request_id text,
  ip text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT event_logs_pkey PRIMARY KEY (id),
  CONSTRAINT event_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.menu_price_history (
  id bigint NOT NULL DEFAULT nextval('menu_price_history_id_seq'::regclass),
  menu_id bigint NOT NULL,
  old_price integer NOT NULL,
  new_price integer NOT NULL,
  changed_by uuid,
  changed_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT menu_price_history_pkey PRIMARY KEY (id),
  CONSTRAINT menu_price_history_menu_id_fkey FOREIGN KEY (menu_id) REFERENCES public.menus(id),
  CONSTRAINT menu_price_history_changed_by_fkey FOREIGN KEY (changed_by) REFERENCES public.users(id)
);
CREATE TABLE public.menus (
  id bigint NOT NULL DEFAULT nextval('menus_id_seq'::regclass),
  category_id smallint NOT NULL,
  name text NOT NULL,
  description text,
  price integer NOT NULL CHECK (price >= 0),
  img text,
  only_ice boolean NOT NULL DEFAULT false,
  is_sold_out boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  tags jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT menus_pkey PRIMARY KEY (id),
  CONSTRAINT menus_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id)
);
CREATE TABLE public.notifications (
  id bigint NOT NULL DEFAULT nextval('notifications_id_seq'::regclass),
  endpoint_id bigint NOT NULL,
  event_type text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'queued'::text,
  response_code integer,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  sent_at timestamp with time zone,
  CONSTRAINT notifications_pkey PRIMARY KEY (id),
  CONSTRAINT notifications_endpoint_id_fkey FOREIGN KEY (endpoint_id) REFERENCES public.webhook_endpoints(id)
);
CREATE TABLE public.order_items (
  id bigint NOT NULL DEFAULT nextval('order_items_id_seq'::regclass),
  order_id uuid NOT NULL,
  menu_id bigint,
  name_snapshot text NOT NULL,
  price_snapshot integer NOT NULL CHECK (price_snapshot >= 0),
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  is_hot boolean NOT NULL DEFAULT false,
  is_shot boolean NOT NULL DEFAULT false,
  is_whip boolean NOT NULL DEFAULT false,
  is_syrup boolean NOT NULL DEFAULT false,
  is_milk boolean NOT NULL DEFAULT false,
  is_peorl boolean NOT NULL DEFAULT false,
  only_ice boolean NOT NULL DEFAULT false,
  CONSTRAINT order_items_pkey PRIMARY KEY (id),
  CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id),
  CONSTRAINT order_items_menu_id_fkey FOREIGN KEY (menu_id) REFERENCES public.menus(id)
);
CREATE TABLE public.orders (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  total_price integer NOT NULL CHECK (total_price >= 0),
  status USER-DEFINED NOT NULL DEFAULT 'pending'::order_status,
  payment_method text,
  external_id text,
  admin_note text,
  cancelled_reason text,
  assigned_to uuid,
  paid_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT orders_pkey PRIMARY KEY (id),
  CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT orders_assigned_to_fkey FOREIGN KEY (assigned_to) REFERENCES public.users(id)
);
CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  name text NOT NULL,
  role text NOT NULL DEFAULT 'user'::text,
  discord_webhook_url text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  password text NOT NULL DEFAULT '''''::text'::text,
  CONSTRAINT users_pkey PRIMARY KEY (id)
);
CREATE TABLE public.webhook_endpoints (
  id bigint NOT NULL DEFAULT nextval('webhook_endpoints_id_seq'::regclass),
  name text NOT NULL,
  channel text NOT NULL DEFAULT 'discord'::text,
  url text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT webhook_endpoints_pkey PRIMARY KEY (id)
);