import "server-only";

import { queryOptions, type QueryClient } from "@tanstack/react-query";

import { menuKeys } from "@/feature/menu/model/query/keys";
import { arrDtoToArrType } from "@/feature/menu/model/mapper";
import { getMenuListAtServer } from "@/feature/menu/api/service.server";
import type {
  GetMenuListReqDto,
  GetMenuListResDto,
} from "@/feature/menu/api/dto";
import {
  MENU_LIST_GC_TIME,
  MENU_LIST_STALE_TIME,
} from "@/feature/menu/model/query/policy";

export const prefetchMenuListAtServer = (
  qc: QueryClient,
  params: GetMenuListReqDto = {}
) =>
  qc.prefetchQuery(
    queryOptions({
      queryKey: menuKeys.listWithParams(params),
      queryFn: () => getMenuListAtServer(params),
      staleTime: MENU_LIST_STALE_TIME,
      gcTime: MENU_LIST_GC_TIME,
      select: (d: GetMenuListResDto[]) => arrDtoToArrType(d),
    })
  );
