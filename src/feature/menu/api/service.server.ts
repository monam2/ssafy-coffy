// prefetch를 위한 server 서비스 레이어(supabase client/server 구분으로 인해)
import "server-only";

import { getServerClient } from "@/shared/config/supabase/server";
import type {
  GetMenuListReqDto,
  GetMenuListResDto,
} from "@/feature/menu/api/dto";

export async function getMenuListAtServer(
  params?: GetMenuListReqDto
): Promise<GetMenuListResDto[]> {
  const supabase = await getServerClient();
  const name = params?.name?.trim();
  let query = supabase
    .from("menus")
    .select(
      "id, name, price, img, only_ice, category_id, is_active, is_sold_out"
    )
    .order("id", { ascending: true });

  if (name) {
    const pattern = `%${name.replace(/[%_]/g, "\\$&")}%`;
    query = query.ilike("name", pattern);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}
