import { GetMenuListReqDto, GetMenuListResDto } from "@/feature/menu/api/dto";

import { getBrowserClient } from "@/shared/config/supabase/client";

export const getMenuList = async (
  params?: GetMenuListReqDto
): Promise<GetMenuListResDto[]> => {
  const { name } = params || {};

  const supabase = getBrowserClient();

  let query = supabase
    .from("menus")
    .select(
      "id, name, price, img, only_ice, category_id, is_active, is_sold_out"
    )
    .order("id", { ascending: true });

  // Like 검색 조건 -> 메뉴명(name)
  if (name && name.trim()) {
    const pattern = `%${name.trim().replace(/[%_]/g, "\\$&")}%`;
    query = query.ilike("name", pattern);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
};
