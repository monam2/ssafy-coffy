import MenuSkeleton from "@/feature/menu/ui/MenuSkeleton";
import CategoryTabSkeleton from "@/feature/category/ui/CategorySkeleton";

const MenuLoading = () => {
  return (
    <div className="flex flex-col gap-4 m-2">
      <CategoryTabSkeleton />
      <MenuSkeleton />
    </div>
  );
};

export default MenuLoading;
