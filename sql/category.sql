insert into public.categories(name, value, sort_order)
values 
  ('커피', 'coffee', 1),
  ('더치커피', 'dutchcoffee', 2),
  ('음료', 'beverage', 3),
  ('주스', 'juice', 4),
  ('스무디', 'smoothie', 5),
  ('에이드', 'ade', 6),
  ('티', 'tea', 7),
  ('프라페', 'frappe', 8),
  ('밀크쉐이크', 'milkshake', 9),
  ('기타', 'etc', 99)
on conflict (value) do update
set name = excluded.name,
    sort_order = excluded.sort_order,
    is_active = true;