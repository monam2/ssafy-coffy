-- Seed menus from data/menu.json (upsert)
-- Mapping: category_value -> app.categories.value
-- Upsert key: (category_id, name)

with v as (
  select * from (
    values
      -- coffee
      ('coffee','아메리카노',1500,'https://composecoffee.com/files/thumbnails/451/038/1515x2083.crop.jpg?t=1733792262',false),
      ('coffee','아메리카노(연하게)',1500,'https://composecoffee.com/files/thumbnails/451/038/1515x2083.crop.jpg?t=1733792262',false),
      ('coffee','카페라떼',2900,'https://composecoffee.com/files/thumbnails/459/038/1515x2083.crop.jpg?t=1733792331',false),
      ('coffee','카푸치노',2900,'https://composecoffee.com/files/thumbnails/214/1515x2083.crop.jpg?t=1733792372',false),
      ('coffee','바닐라라떼',3300,'https://composecoffee.com/files/thumbnails/593/038/1515x2083.crop.jpg?t=1733792426',false),
      ('coffee','헤이즐넛라떼',3300,'https://composecoffee.com/files/thumbnails/602/038/1515x2083.crop.jpg?t=1733792488',false),
      ('coffee','카라멜마끼아또',3300,'https://composecoffee.com/files/thumbnails/619/038/1515x2083.crop.jpg?t=1733792540',false),
      ('coffee','카페모카',3500,'https://composecoffee.com/files/thumbnails/609/038/1515x2083.crop.jpg?t=1733792584',false),
      ('coffee','돌체라떼',3800,'https://composecoffee.com/files/thumbnails/623/038/1515x2083.crop.jpg?t=1733792620',false),
      ('coffee','흑당카페라떼',3800,'https://composecoffee.com/files/thumbnails/227/1515x2083.crop.jpg?t=1733792641',true),
      ('coffee','달고나라떼',4000,'https://composecoffee.com/files/thumbnails/665/034/1515x2083.crop.jpg?t=1733792660',true),
      ('coffee','아인슈페너라떼',4200,'https://composecoffee.com/files/thumbnails/229/1515x2083.crop.jpg?t=1733792686',true),
      ('coffee','에스프레소',1500,'https://composecoffee.com/files/thumbnails/208/1515x2083.crop.jpg?t=1733792158',false),

      -- dutchcoffee
      ('dutchcoffee','더치커피',3300,'https://composecoffee.com/files/thumbnails/627/038/1515x2083.crop.jpg?t=1733792753',false),
      ('dutchcoffee','더치라떼',3800,'https://composecoffee.com/files/thumbnails/633/038/1515x2083.crop.jpg?t=1733792865',false),
      ('dutchcoffee','아인슈페너',4200,'https://composecoffee.com/files/thumbnails/241/1515x2083.crop.jpg?t=1733792903',true),

      -- beverage
      ('beverage','곡물라떼',3300,'https://composecoffee.com/files/thumbnails/750/038/1515x2083.crop.jpg?t=1733793290',false),
      ('beverage','고구마라떼',3500,'https://composecoffee.com/files/thumbnails/734/038/1515x2083.crop.jpg?t=1733793438',false),
      ('beverage','더블초코라떼',3500,'https://composecoffee.com/files/thumbnails/724/038/1515x2083.crop.jpg?t=1733793477',false),
      ('beverage','쿠키초코라떼',3500,'https://composecoffee.com/files/thumbnails/730/038/1515x2083.crop.jpg?t=1733793514',false),
      ('beverage','그린티라떼',3500,'https://composecoffee.com/files/thumbnails/742/038/1515x2083.crop.jpg?t=1733793569',false),
      ('beverage','민트초코오레오라떼',3500,'https://composecoffee.com/files/thumbnails/746/038/1515x2083.crop.jpg?t=1733793601',false),
      ('beverage','흑당밀크티',3500,'https://composecoffee.com/files/thumbnails/255/1515x2083.crop.jpg?t=1733793634',true),
      ('beverage','딸기라떼',3800,'https://composecoffee.com/files/thumbnails/755/012/1515x2083.crop.jpg?t=1733793651',true),
      ('beverage','망고라떼',3800,'https://composecoffee.com/files/thumbnails/887/064/1515x2083.crop.jpg?t=1733793683',true),
      ('beverage','블루베리라떼',3800,'https://composecoffee.com/files/thumbnails/891/064/1515x2083.crop.jpg?t=1733793666',true),
      ('beverage','밀크티',3800,'https://composecoffee.com/files/thumbnails/738/038/1515x2083.crop.jpg?t=1733793716',false),

      -- juice
      ('juice','키위주스',3800,'https://composecoffee.com/files/thumbnails/485/018/1515x2083.crop.jpg?t=1733794330',true),
      ('juice','복숭아주스',3800,'https://composecoffee.com/files/thumbnails/487/018/1515x2083.crop.jpg?t=1733794313',true),
      ('juice','오렌지당근주스',3800,'https://composecoffee.com/files/thumbnails/491/018/1515x2083.crop.jpg?t=1733794348',true),
      ('juice','샤인머스켓웨일주스',3800,'https://composecoffee.com/files/thumbnails/489/018/1515x2083.crop.jpg?t=1733794365',true),

      -- smoothie (note: category value in JSON had a trailing space; we trim in join)
      ('smoothie','딸기 스무디',3800,'https://composecoffee.com/files/thumbnails/267/1515x2083.crop.jpg?t=1733793856',true),
      ('smoothie','망고 스무디',3800,'https://composecoffee.com/files/thumbnails/269/1515x2083.crop.jpg?t=1733794106',true),
      ('smoothie','블루베리 스무디',3800,'https://composecoffee.com/files/thumbnails/271/1515x2083.crop.jpg?t=1733793886',true),
      ('smoothie','유자 스무디',3800,'https://composecoffee.com/files/thumbnails/480/018/1515x2083.crop.jpg?t=1733793904',true),
      ('smoothie','딸기 요거트스무디',4000,'https://composecoffee.com/files/thumbnails/273/1515x2083.crop.jpg?t=1733793950',true),
      ('smoothie','플레인 요거트스무디',4000,'https://composecoffee.com/files/thumbnails/279/1515x2083.crop.jpg?t=1733793918',true),
      ('smoothie','블루베리 요거트스무디',4000,'https://composecoffee.com/files/thumbnails/079/072/1515x2083.crop.jpg?t=1733793934',true),
      ('smoothie','망고 요거트스무디',4000,'https://composecoffee.com/files/thumbnails/275/1515x2083.crop.jpg?t=1733793967',true),

      -- ade
      ('ade','자몽 에이드',3500,'https://composecoffee.com/files/thumbnails/281/1515x2083.crop.jpg?t=1733794421',true),
      ('ade','레몬 에이드',3500,'https://composecoffee.com/files/thumbnails/283/1515x2083.crop.jpg?t=1733794435',true),
      ('ade','유자 에이드',3500,'https://composecoffee.com/files/thumbnails/287/1515x2083.crop.jpg?t=1733794470',true),
      ('ade','블루레몬 스페셜에이드',3500,'https://composecoffee.com/files/thumbnails/289/1515x2083.crop.jpg?t=1733794379',true),
      ('ade','청포도 스페셜에이드',3500,'https://composecoffee.com/files/thumbnails/291/1515x2083.crop.jpg?t=1733794394',true),
      ('ade','패션후르츠 스페셜에이드',3500,'https://composecoffee.com/files/thumbnails/293/1515x2083.crop.jpg?t=1733794407',true),

      -- tea
      ('tea','페퍼민트',2500,'https://composecoffee.com/files/thumbnails/797/038/1515x2083.crop.jpg?t=1733794710',false),
      ('tea','캐모마일',2500,'https://composecoffee.com/files/thumbnails/795/038/1515x2083.crop.jpg?t=1733794748',false),
      ('tea','로즈마리',2500,'https://composecoffee.com/files/thumbnails/793/038/1515x2083.crop.jpg?t=1733794791',false),
      ('tea','얼그레이',2500,'https://composecoffee.com/files/thumbnails/791/038/1515x2083.crop.jpg?t=1733794825',false),
      ('tea','블랙퍼스트',2500,'https://composecoffee.com/files/thumbnails/789/038/1515x2083.crop.jpg?t=1733794858',false),
      ('tea','자몽 과일티',3500,'https://composecoffee.com/files/thumbnails/678/038/1515x2083.crop.jpg?t=1733794908',false),
      ('tea','레몬 과일티',3500,'https://composecoffee.com/files/thumbnails/680/038/1515x2083.crop.jpg?t=1733794944',false),
      ('tea','유자 과일티',3500,'https://composecoffee.com/files/thumbnails/682/038/1515x2083.crop.jpg?t=1733794981',false),
      ('tea','복숭아티',3000,'https://composecoffee.com/files/thumbnails/672/038/1515x2083.crop.jpg?t=1733794602',true),
      ('tea','자몽허니블랙티',3800,'https://composecoffee.com/files/thumbnails/676/038/1515x2083.crop.jpg?t=1733794667',true),

      -- frappe
      ('frappe','리얼초코자바칩 프라페',4000,'https://composecoffee.com/files/thumbnails/315/1515x2083.crop.jpg?t=1733793757',true),
      ('frappe','쿠키초코 프라페',4000,'https://composecoffee.com/files/thumbnails/317/1515x2083.crop.jpg?t=1733793778',true),
      ('frappe','민트초코오레오 프라페',4000,'https://composecoffee.com/files/thumbnails/319/1515x2083.crop.jpg?t=1733793799',true),
      ('frappe','그린티 프라페',4000,'https://composecoffee.com/files/thumbnails/321/1515x2083.crop.jpg?t=1733793817',true),
      ('frappe','모카자바칩 프라페',4500,'https://composecoffee.com/files/thumbnails/235/1515x2083.crop.jpg?t=1733793839',true),

      -- milkshake
      ('milkshake','플레인밀크쉐이크',4200,'https://composecoffee.com/files/thumbnails/323/1515x2083.crop.jpg?t=1733794135',true),
      ('milkshake','캔디소다 밀크쉐이크',4200,'https://composecoffee.com/files/thumbnails/896/064/1515x2083.crop.jpg?t=1733794185',true),
      ('milkshake','쿠키 밀크쉐이크',4500,'https://composecoffee.com/files/thumbnails/327/1515x2083.crop.jpg?t=1733794237',true),
      ('milkshake','커피 밀크쉐이크',4500,'https://composecoffee.com/files/thumbnails/231/1515x2083.crop.jpg?t=1733794252',true),
      ('milkshake','팥절미 밀크쉐이크',4500,'https://composecoffee.com/files/thumbnails/325/1515x2083.crop.jpg?t=1733794266',true),

      -- coffee (extra)
      ('coffee','빅포즈 아메리카노(946ml, 4샷)',3000,'https://composecoffee.com/files/thumbnails/253/097/1515x2083.crop.jpg?t=1733793587',false)
  ) as t(category_value, name, price, img, only_ice)
)
insert into app.menus (category_id, name, price, img, only_ice)
select c.id, v.name, v.price, v.img, v.only_ice
from v
join app.categories c
  on c.value = trim(v.category_value)
on conflict (category_id, name) do update
set price = excluded.price,
    img = excluded.img,
    only_ice = excluded.only_ice,
    is_active = true,
    updated_at = now();


