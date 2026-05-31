insert into public.categories (name, slug, description, icon, sort_order)
values
  ('Books', 'books', 'School, college, reference and competitive exam books.', 'book', 10),
  ('Stationery', 'stationery', 'Notebooks, pens, files, art sheets and daily supplies.', 'pen', 20),
  ('School Essentials', 'school-essentials', 'Bags, bottles, lunch boxes and ready school kits.', 'backpack', 30),
  ('Project Materials', 'project-materials', 'Charts, craft boards, thermocol, wiring and model supplies.', 'wrench', 40),
  ('Engineering Tools', 'engineering-tools', 'Calculators, drafter tools, drawing sheets and lab records.', 'calculator', 50),
  ('Hostel Essentials', 'hostel-essentials', 'Storage, bedding helpers and compact room essentials.', 'bed', 60),
  ('Personal Care', 'personal-care', 'Everyday grooming, care and hygiene basics for students.', 'heart', 70),
  ('Gifts & Chocolates', 'gifts-chocolates', 'Greeting cards, gift wrap, chocolates and small surprises.', 'gift', 80),
  ('Daily Essentials', 'daily-essentials', 'Convenience items for campus, hostel and home routines.', 'shopping', 90)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  icon = excluded.icon,
  sort_order = excluded.sort_order;

insert into public.products (
  category_id,
  name,
  slug,
  description,
  sku,
  barcode,
  price,
  stock,
  low_stock,
  is_featured,
  is_active
)
select categories.id, seed.name, seed.slug, seed.description, seed.sku, seed.barcode,
  seed.price, seed.stock, seed.low_stock, seed.is_featured, true
from (
  values
    ('stationery', 'Premium Notebook Pack', 'premium-notebook-pack', 'Ruled, unruled and long notebooks for class and college work.', 'STA-NB-001', '890100000001', 120, 46, 12, true),
    ('engineering-tools', 'Scientific Calculator', 'scientific-calculator', 'College-ready calculators for engineering and science courses.', 'ENG-CAL-002', '890100000002', 799, 8, 6, true),
    ('school-essentials', 'School Bag Selection', 'school-bag-selection', 'Durable school bags in practical sizes for younger and senior students.', 'SCH-BAG-003', '890100000003', 399, 15, 8, true),
    ('project-materials', 'Science Project Board Kit', 'science-project-board-kit', 'Charts, color sheets, foam board and craft basics for displays.', 'PRJ-KIT-004', '890100000004', 99, 28, 10, false),
    ('stationery', 'Pen & Pencil Writing Kit', 'pen-pencil-writing-kit', 'Daily writing kit with pens, pencils, eraser, sharpener and scale.', 'STA-WRT-005', '890100000005', 49, 64, 20, false),
    ('engineering-tools', 'Engineering Drawing Kit', 'engineering-drawing-kit', 'Drafter, set squares, scales and sheets for drawing classes.', 'ENG-DRW-006', '890100000006', 249, 11, 8, false)
) as seed(category_slug, name, slug, description, sku, barcode, price, stock, low_stock, is_featured)
join public.categories on categories.slug = seed.category_slug
on conflict (sku) do update set
  category_id = excluded.category_id,
  name = excluded.name,
  slug = excluded.slug,
  description = excluded.description,
  barcode = excluded.barcode,
  price = excluded.price,
  stock = excluded.stock,
  low_stock = excluded.low_stock,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active;
