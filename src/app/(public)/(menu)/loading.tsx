import MenuSkeleton from "@/feature/menu/ui/MenuSkeleton";
import CategoryTabSkeleton from "@/feature/category/ui/CategorySkeleton";

const CATEGORY_TAB_LENGTH = 11;
const MENU_LENGTH = 8;

const MenuLoading = () => {
  return (
    <div className="flex flex-col gap-4 m-2">
      <CategoryTabSkeleton length={CATEGORY_TAB_LENGTH} />
      <MenuSkeleton length={MENU_LENGTH} />
    </div>
  );
};

export default MenuLoading;
