# Supabase Setup

This folder contains the initial database schema for the Manasa Book Center customer site and admin MVP.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
WHATSAPP_CLOUD_ACCESS_TOKEN=
WHATSAPP_CLOUD_PHONE_NUMBER_ID=
OWNER_WHATSAPP_PHONE=
```

Only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are safe for browser use. Keep `SUPABASE_SERVICE_ROLE_KEY` server-only.

## Tables

The schema creates:

- `products`
- `categories`
- `sales`
- `sale_items`
- `orders`
- `coupons`
- `ads`
- `profiles`
- `store_settings`

## GitHub OAuth

In Supabase Auth, enable GitHub as a provider and add:

```text
http://localhost:3000/auth/callback
https://your-production-domain.com/auth/callback
```

The app includes `/auth/github` to start the OAuth flow and `/auth/callback` to exchange the code for a Supabase session.

After your first GitHub sign-in, run `supabase/promote-admin.sql` with your email to promote your profile to `owner`.

## Roles

Profiles use the `user_role` enum:

- `customer`
- `staff`
- `admin`
- `owner`

Admin access helpers already treat `staff`, `admin`, and `owner` as store roles.

## Owner WhatsApp Notifications

Customer requests are always saved to the `orders` table. To also send the owner an automatic WhatsApp message, configure the WhatsApp Business Cloud API variables:

- `WHATSAPP_CLOUD_ACCESS_TOKEN`
- `WHATSAPP_CLOUD_PHONE_NUMBER_ID`
- `OWNER_WHATSAPP_PHONE`

`OWNER_WHATSAPP_PHONE` should include the country code, for example `919948030907`.

Without these variables, the request still saves to Supabase and the customer still gets a prefilled WhatsApp button.

## PhonePe / UPI Payments

Checkout is structured for PhonePe / UPI, pay at store, and pay during pickup.
No live payment is processed yet. Before enabling these controls in production,
run `supabase/payment-settings.sql` once so `store_settings` has the PhonePe
and payment toggle fields.

Future PhonePe Payment Gateway work should replace the current UPI intent helper
with official merchant order creation, callback handling, and server-side payment
verification.
