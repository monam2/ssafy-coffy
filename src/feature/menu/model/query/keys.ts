import { GetMenuListReqDto } from "@/feature/menu/api/dto";

export const menuKeys = {
  all: ["menu"] as const,
  list: () => [...menuKeys.all, "list"] as const,
  listWithParams: (params: GetMenuListReqDto) =>
    [...menuKeys.list(), params] as const,
};
