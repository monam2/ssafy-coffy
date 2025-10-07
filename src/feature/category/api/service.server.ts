import { GetCategoryListResDto } from "@/feature/category/api/dto";

import { getServerClient } from "@/shared/config/supabase/server";

export const getCategoryList = async (): Promise<GetCategoryListResDto[]> => {
  const supabase = await getServerClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, value, sort_order, is_active")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
};
