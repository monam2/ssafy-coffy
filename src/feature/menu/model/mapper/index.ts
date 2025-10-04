/* 
menu res dto를 도메인 타입으로 매핑
*/
import { GetMenuListResDto } from "@/feature/menu/api/dto";
import { Menu } from "@/feature/menu/model/types";

/** DTO -> 도메인 타입 매핑 */
export const menuDtoToType = (data: GetMenuListResDto): Menu =>
  ({
    id: data.id,
    categoryId: data.category_id,
    name: data.name,
    price: data.price,
    img: data.img,
    onlyIce: data.only_ice,
    isActive: data.is_active,
    isSoldOut: data.is_sold_out,
  } satisfies Menu);

/** 배열 DTO -> 도메인 타입 배열 매핑 */
export const arrDtoToArrType = (data: GetMenuListResDto[]): Menu[] =>
  data.map(menuDtoToType);
