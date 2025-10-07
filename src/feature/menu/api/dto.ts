import { z } from "zod";

/** 메뉴 리스트 요청 스키마 */
export const getMenuListReqDtoSchema = z.object({
  name: z.string().optional(),
  categoryId: z.number().optional(),
});

export type GetMenuListReqDto = z.infer<typeof getMenuListReqDtoSchema>;

/** 메뉴 리스트 응답 스키마 */
export const getMenuListResDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  only_ice: z.boolean(),
  category_id: z.number(),
  img: z.string(),
  is_active: z.boolean(),
  is_sold_out: z.boolean(),
});

export type GetMenuListResDto = z.infer<typeof getMenuListResDtoSchema>;
