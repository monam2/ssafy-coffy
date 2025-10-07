import { z } from "zod";

/** 카테고리 리스트 요청 스키마 */
export const getCategoryListReqDtoSchema = z.object({});

export type GetCategoryListReqDto = z.infer<typeof getCategoryListReqDtoSchema>;

/** 카테고리 리스트 응답 스키마 */
export const getCategoryListResDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  value: z.string(),
  sort_order: z.number(),
  is_active: z.boolean(),
});

export type GetCategoryListResDto = z.infer<typeof getCategoryListResDtoSchema>;
