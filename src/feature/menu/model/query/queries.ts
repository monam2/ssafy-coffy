import { queryOptions } from "@tanstack/react-query";

import { getMenuList } from "@/feature/menu/api/service";
import { menuKeys } from "@/feature/menu/model/query/keys";
import { arrDtoToArrType } from "@/feature/menu/model/mapper";
import { GetMenuListReqDto, GetMenuListResDto } from "@/feature/menu/api/dto";
import {
  MENU_LIST_GC_TIME,
  MENU_LIST_STALE_TIME,
} from "@/feature/menu/model/query/policy";

export const menuQueries = {
  /** 메뉴 리스트 조회 */
  getList: (params?: GetMenuListReqDto) =>
    queryOptions({
      queryKey: menuKeys.listWithParams(params ?? {}),
      queryFn: () => getMenuList(params ?? {}),
      staleTime: MENU_LIST_STALE_TIME,
      gcTime: MENU_LIST_GC_TIME,
      select: (data: GetMenuListResDto[]) => arrDtoToArrType(data),
    }),
};
