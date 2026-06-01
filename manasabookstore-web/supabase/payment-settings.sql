alter table public.store_settings
  add column if not exists phonepe_upi_id text,
  add column if not exists phonepe_merchant_name text not null default 'Manasa Book Center',
  add column if not exists online_upi_payment_enabled boolean not null default false,
  add column if not exists pay_at_store_enabled boolean not null default true,
  add column if not exists pickup_payment_enabled boolean not null default true,
  add column if not exists homepage_notice text,
  add column if not exists homepage_notice_enabled boolean not null default false;

update public.store_settings
set
  phonepe_merchant_name = coalesce(phonepe_merchant_name, 'Manasa Book Center'),
  pay_at_store_enabled = coalesce(pay_at_store_enabled, true),
  pickup_payment_enabled = coalesce(pickup_payment_enabled, true)
where store_name = 'Manasa Book Center';
