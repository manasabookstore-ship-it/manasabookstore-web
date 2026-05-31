-- After signing in once with GitHub, Supabase creates a profile with role 'customer'.
-- Replace the email below with your GitHub account email, then run this once.

update public.profiles
set role = 'owner'
where email = 'your-email@example.com';

select id, email, full_name, role
from public.profiles
order by created_at desc;
