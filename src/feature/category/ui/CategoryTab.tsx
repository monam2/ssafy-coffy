import { Category } from "@/feature/category/model/types";
import { arrDtoToArrType } from "@/feature/category/model/mapper";
import CategoryTabItem from "@/feature/category/ui/CategoryTabItem";
import { getCategoryList } from "@/feature/category/api/service.server";

import { isEmpty } from "@/shared/utils";

interface CategoryTabProps {
  selectedCategoryId?: number;
}

const CategoryTab = async ({ selectedCategoryId }: CategoryTabProps) => {
  const categoryList = await getCategoryList();
  const categories: Category[] = arrDtoToArrType(categoryList);

  if (isEmpty(categories)) return null;

  // [전체] 탭 선택
  const isAllSelected = !selectedCategoryId;

  return (
    <div
      className="w-full px-3 md:justify-center justify-start flex gap-4 overflow-x-scroll whitespace-nowrap"
      style={{ scrollbarWidth: "none" }}
    >
      <CategoryTabItem href="?" active={isAllSelected}>
        전체
      </CategoryTabItem>
      {categories.map((c) => {
        const isSelected = c.id === selectedCategoryId;
        return (
          <CategoryTabItem
            key={c.id}
            href={`?categoryId=${c.id}`}
            active={isSelected}
          >
            {c.name}
          </CategoryTabItem>
        );
      })}
    </div>
  );
};

export default CategoryTab;
