create extension if not exists pgcrypto;

create type public.user_role as enum ('customer', 'staff', 'admin', 'owner');
create type public.payment_mode as enum ('cash', 'upi', 'card');
create type public.order_status as enum (
  'requested',
  'confirmed',
  'ready',
  'completed',
  'cancelled'
);
create type public.order_source as enum ('website', 'whatsapp', 'store');
create type public.coupon_discount_type as enum ('percent', 'amount', 'note');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  avatar_url text,
  role public.user_role not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  icon text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  sku text not null unique,
  barcode text unique,
  price numeric(12, 2) not null default 0 check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  low_stock integer not null default 5 check (low_stock >= 0),
  is_featured boolean not null default false,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.sales (
  id uuid primary key default gen_random_uuid(),
  receipt_no text not null unique,
  cashier_id uuid references public.profiles(id) on delete set null,
  payment_mode public.payment_mode not null default 'cash',
  subtotal numeric(12, 2) not null default 0 check (subtotal >= 0),
  total numeric(12, 2) not null default 0 check (total >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.sale_items (
  id uuid primary key default gen_random_uuid(),
  sale_id uuid not null references public.sales(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  sku text,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12, 2) not null default 0 check (unit_price >= 0),
  line_total numeric(12, 2) not null default 0 check (line_total >= 0),
  created_at timestamptz not null default now()
);

create table public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title text not null,
  description text,
  discount_type public.coupon_discount_type not null default 'note',
  discount_value numeric(12, 2) not null default 0 check (discount_value >= 0),
  starts_at timestamptz,
  ends_at timestamptz,
  is_active boolean not null default true,
  usage_limit integer check (usage_limit is null or usage_limit >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  customer_note text,
  status public.order_status not null default 'requested',
  source public.order_source not null default 'website',
  subtotal numeric(12, 2) not null default 0 check (subtotal >= 0),
  coupon_id uuid references public.coupons(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.ads (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  placement text not null,
  image_url text,
  link_url text,
  starts_at timestamptz,
  ends_at timestamptz,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.store_settings (
  id uuid primary key default gen_random_uuid(),
  store_name text not null,
  phone text,
  whatsapp text,
  address text,
  map_url text,
  online_ordering_enabled boolean not null default false,
  pickup_enabled boolean not null default false,
  delivery_enabled boolean not null default false,
  phonepe_upi_id text,
  phonepe_merchant_name text not null default 'Manasa Book Center',
  online_upi_payment_enabled boolean not null default false,
  pay_at_store_enabled boolean not null default true,
  pickup_payment_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_category_id_idx on public.products(category_id);
create index products_active_featured_idx on public.products(is_active, is_featured);
create index sale_items_sale_id_idx on public.sale_items(sale_id);
create index sales_created_at_idx on public.sales(created_at);
create index orders_status_created_at_idx on public.orders(status, created_at);
create index ads_placement_active_idx on public.ads(placement, is_active);

create trigger profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger categories_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

create trigger products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

create trigger sales_updated_at
before update on public.sales
for each row execute function public.set_updated_at();

create trigger coupons_updated_at
before update on public.coupons
for each row execute function public.set_updated_at();

create trigger orders_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

create trigger ads_updated_at
before update on public.ads
for each row execute function public.set_updated_at();

create trigger store_settings_updated_at
before update on public.store_settings
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'user_name'),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.sales enable row level security;
alter table public.sale_items enable row level security;
alter table public.orders enable row level security;
alter table public.coupons enable row level security;
alter table public.ads enable row level security;
alter table public.store_settings enable row level security;

create or replace function public.current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_store_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_user_role() in ('staff', 'admin', 'owner'), false)
$$;

create policy "Public can read active categories"
on public.categories for select
using (is_active = true);

create policy "Public can read active products"
on public.products for select
using (is_active = true);

create policy "Public can read active coupons"
on public.coupons for select
using (is_active = true);

create policy "Public can read active ads"
on public.ads for select
using (is_active = true);

create policy "Public can read store settings"
on public.store_settings for select
using (true);

create policy "Users can read own profile"
on public.profiles for select
using (id = auth.uid() or public.is_store_staff());

create policy "Users can update own profile"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid());

create policy "Staff can manage profiles"
on public.profiles for all
using (public.current_user_role() in ('admin', 'owner'))
with check (public.current_user_role() in ('admin', 'owner'));

create policy "Staff can manage categories"
on public.categories for all
using (public.is_store_staff())
with check (public.is_store_staff());

create policy "Staff can manage products"
on public.products for all
using (public.is_store_staff())
with check (public.is_store_staff());

create policy "Staff can manage sales"
on public.sales for all
using (public.is_store_staff())
with check (public.is_store_staff());

create policy "Staff can manage sale items"
on public.sale_items for all
using (public.is_store_staff())
with check (public.is_store_staff());

create policy "Anyone can create customer orders"
on public.orders for insert
with check (true);

create policy "Staff can manage orders"
on public.orders for all
using (public.is_store_staff())
with check (public.is_store_staff());

create policy "Staff can manage coupons"
on public.coupons for all
using (public.is_store_staff())
with check (public.is_store_staff());

create policy "Staff can manage ads"
on public.ads for all
using (public.is_store_staff())
with check (public.is_store_staff());

create policy "Staff can manage store settings"
on public.store_settings for all
using (public.is_store_staff())
with check (public.is_store_staff());

insert into public.store_settings (
  store_name,
  phone,
  whatsapp,
  address,
  map_url,
  online_ordering_enabled,
  pickup_enabled,
  delivery_enabled,
  phonepe_upi_id,
  phonepe_merchant_name,
  online_upi_payment_enabled,
  pay_at_store_enabled,
  pickup_payment_enabled
)
values (
  'Manasa Book Center',
  '+91 99480 30907',
  'https://wa.me/919948030907',
  'Kurnool Main Road, Chimakurthy, Andhra Pradesh 523226',
  'https://www.google.com/maps/search/?api=1&query=Manasa%20Book%20Center%2C%20Kurnool%20Main%20Road%2C%20Chimakurthy%2C%20Andhra%20Pradesh%20523226',
  false,
  false,
  false,
  null,
  'Manasa Book Center',
  false,
  true,
  false
);
