import type { Category } from "@/entities/category/model/types";
import { GetCategoryListResDto } from "@/feature/category/api/dto";

export const categoryDtoToType = (data: GetCategoryListResDto): Category =>
  ({
    id: data.id,
    name: data.name,
    value: data.value,
    sortOrder: data.sort_order,
    isActive: data.is_active,
  } satisfies Category);

export const arrDtoToArrType = (data: GetCategoryListResDto[]): Category[] =>
  data.map(categoryDtoToType);
