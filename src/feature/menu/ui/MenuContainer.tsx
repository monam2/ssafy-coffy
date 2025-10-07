import MenuList from "@/feature/menu/ui/MenuList";
import CategoryTab from "@/feature/category/ui/CategoryTab";
interface MenuContainerProps {
  categoryId?: string;
}

const MenuContainer = ({ categoryId }: MenuContainerProps) => {
  return (
    <div className="flex flex-col gap-4 m-2">
      <CategoryTab
        selectedCategoryId={categoryId ? Number(categoryId) : null}
      />
      <MenuList categoryId={categoryId} />
    </div>
  );
};

export default MenuContainer;
