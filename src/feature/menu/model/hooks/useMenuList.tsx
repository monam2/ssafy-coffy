import { useQuery } from "@tanstack/react-query";

import { menuQueries } from "@/feature/menu/model/query/queries";
import { GetMenuListReqDto } from "@/feature/menu/api/dto";

const useMenuList = (params?: GetMenuListReqDto) => {
  const { data, isLoading, error } = useQuery(
    menuQueries.getList(params ?? {})
  );

  return { menuList: data ?? [], isLoading, error };
};

export default useMenuList;
