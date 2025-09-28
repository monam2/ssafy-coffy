### AI 운영 참고 문서 (v2)

이 문서는 AI/개발자가 프로젝트 맥락과 의사결정, 스키마, 시드/운영 절차를 빠르게 파악하도록 정리한 레퍼런스입니다.

### 개요

- 목적: Firebase 기반 v1을 Supabase 기반 v2로 전환. 이메일 가입, 디스코드 웹훅 알림, 어드민 기능 강화.
- 주요 변경:
  - 데이터 저장소: Firestore → Supabase(Postgres)
  - 주문/카트를 1:N 라인아이템 구조로 정규화(`orders/order_items`, `carts/cart_items`)
  - 알림/이력: `webhook_endpoints`, `notifications`, `event_logs` 도입
  - 사용자 키: `users.id = auth.users.id (uuid)` 고정, `email`은 unique 인덱스

### MCP 설정 요약

- 파일: `~/.cursor/mcp.json`
- 현재 상태: `--project-ref=vgufcviniwzyzsqadvof`, `--read-only` 활성화
- 보안 권고: read-only 유지. 참조: [supabase-community/supabase-mcp](https://github.com/supabase-community/supabase-mcp)

### 스키마 및 테이블 (schema: `app`)

- enums

  - `order_status`: `pending | paid | cancelled`

- users

  - `id uuid pk` (FK → `auth.users.id`), `email citext unique not null`, `display_name text`, `role text default 'user'`,
    `discord_webhook_url text`, `is_active boolean default true`, `created_at/updated_at timestamptz`

- categories

  - `id smallserial pk`, `name text`, `value text unique`, `sort_order smallint`, `is_active boolean`, `created_at`

- menus

  - `id bigserial pk`, `category_id smallint fk`, `name text`, `description text`, `price int`, `img text`,
    `only_ice boolean`, `is_sold_out boolean`, `is_active boolean`, `tags jsonb`,
    `created_at/updated_at`; unique(`category_id`, `name`)

- menu_price_history

  - `id bigserial pk`, `menu_id fk`, `old_price int`, `new_price int`, `changed_by uuid`, `changed_at`

- carts

  - `id uuid pk`, `user_id uuid fk`, `status text in ('active','ordered','abandoned')`, `created_at/updated_at`
  - unique(user_id) where status='active'

- cart_items

  - `id bigserial pk`, `cart_id uuid fk`, `menu_id bigint fk`, `quantity int`, `unit_price int`,
    `is_hot/is_shot/is_whip/is_syrup/is_milk/is_peorl/only_ice boolean`

- orders

  - `id uuid pk`, `user_id uuid fk`, `total_price int`, `status order_status`, `payment_method text`, `external_id text`,
    `admin_note text`, `cancelled_reason text`, `assigned_to uuid`, `paid_at timestamptz`, `created_at/updated_at`
  - index: `(created_at desc)`, `(user_id, created_at desc)`, `(status)`, `(assigned_to)`

- order_items

  - `id bigserial pk`, `order_id uuid fk`, `menu_id bigint`, `name_snapshot text`, `price_snapshot int`, `quantity int`,
    `is_hot/is_shot/is_whip/is_syrup/is_milk/is_peorl/only_ice boolean`

- event_logs

  - `id bigserial pk`, `user_id uuid`, `event_type text`, `entity_type text`, `entity_id text`, `level text`,
    `payload jsonb`, `request_id text`, `ip text`, `created_at`; index: `created_at desc`, `event_type`, `level`

- webhook_endpoints

  - `id bigserial pk`, `name text`, `channel text default 'discord'`, `url text`, `is_active boolean`, `created_at`

- notifications
  - `id bigserial pk`, `endpoint_id fk`, `event_type text`, `payload jsonb`, `status text`,
    `response_code int`, `created_at`, `sent_at`; index: `created_at desc`, `status`

### 트리거

- `app.set_updated_at()`: `users/menus/carts/orders`의 `updated_at` 자동 갱신
- `app.log_menu_price_change()`: `menus.price` 변경 시 `menu_price_history`에 이력 적재(+ JWT로 변경자 추정)
- `app.log_and_queue_on_order_status_change()`: `orders.status` 변경 시 `event_logs` 기록 및 `notifications` 큐잉

### 시드(Seed) 데이터

- 카테고리: `sql/category.sql`
  - `value` 기준 upsert, `all`(전체) 카테고리는 DB 미삽입 권장
- 메뉴: `sql/menu.sql`
  - `data/menu.json` 매핑 기반, `category.value`로 카테고리 조인
  - upsert 키: `(category_id, name)`
  - `smoothie` JSON 공백 가능성 대비 `trim()` 조인 적용

### 검증 쿼리(예시)

```sql
-- app 스키마 전체 테이블
select table_name from information_schema.tables where table_schema='app' order by table_name;

-- 주문 상태 enum 확인
select unnest(enum_range(null::app.order_status));

-- 카테고리/메뉴 샘플
select id, name, value from app.categories order by sort_order;
select m.id, c.value as category, m.name, m.price, m.only_ice
from app.menus m join app.categories c on c.id=m.category_id
order by c.sort_order, m.name limit 20;

-- 트리거/인덱스 샘플 확인
select trigger_name, event_object_table from information_schema.triggers where trigger_schema='app';
select indexname, indexdef from pg_indexes where schemaname='app' and tablename in ('orders','order_items','cart_items','notifications','event_logs');
```

### RLS(초안 가이드)

- 기본 원칙
  - 일반 사용자: 자신의 `carts/orders/order_items`만 접근
  - 어드민: 읽기/관리 전역 허용
  - `menus/categories`: 읽기 공개, 쓰기 어드민 전용
- 구현 포인트: `auth.uid()` 기반 정책 권장(이메일 기반 RLS는 비권장)

### 어드민 기능 고려사항

- 주문 관리: 상태변경(pending→paid/cancelled), 취소사유/메모, 담당자 지정(`assigned_to`), 기간/상태/사용자 필터, 합계 집계
- 메뉴 관리: 품절 토글(`is_sold_out`), 비활성화(`is_active`), 가격 변경 시 이력 자동 기록
- 알림: `webhook_endpoints`에 전역 디스코드 웹훅 등록 → `notifications` 큐 확인/재시도 전략
- 로그: `event_logs`로 행위 감사/디버깅(필터: `event_type`, `level`, 기간)

### 의사결정 로그(중요)

- 사용자 PK: `uuid(auth.users.id)` 채택, `email`은 `citext unique` (이메일 PK 비권장)
- 라인아이템: `orders/order_items`, `carts/cart_items`는 1:N 구조(속성/스냅샷/집계/RLS 유리)
- 메뉴 PK: `bigserial` 신규 발급(JSON의 `id`는 사용하지 않음)
- 옵션: 개별 불리언 컬럼 유지(쿼리/인덱싱/예측가능성 우수)
- 상태: `order_status` enum으로 표준화(`pending`, `paid`, `cancelled`)

### 파일/위치 요약

- MCP: `~/.cursor/mcp.json` (현재 read-only 활성)
- 스키마/DDL: 초기 적용은 대화 중 SQL 사용
- 시드: `sql/category.sql`, `sql/menu.sql`
- 원본 데이터: `data/category.json`, `data/menu.json`

### 실행 플로우(요약)

0. 절대 read-only를 해제하지 말 것. 모든 DB 작업은 사용자에게 DDL 또는 SQL을 전달해 사용자가 Supabase SQL Editor에서 작업하도록 할 것.
1. 스키마/DDL 적용(완료됨)
2. `sql/category.sql` → `sql/menu.sql` 순으로 시드 실행
3. 검증 쿼리 수행

### 프론트엔드 가이드라인 관련

- 본 문서는 백엔드/운영 레퍼런스로 프론트엔드 코드 편집은 포함하지 않습니다.
- 다만 “예측 가능성/표준화” 원칙에 따라 상태 enum 표준화, 스냅샷 분리 등 설계 결정을 반영했습니다. (사용자 가이드라인의 “Standardizing Return Types”, “Revealing Hidden Logic” 정신 참조)
