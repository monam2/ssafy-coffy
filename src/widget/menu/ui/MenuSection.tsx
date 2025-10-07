import MenuList from "@/feature/menu/ui/MenuList";
import CategoryTab from "@/feature/category/ui/CategoryTab";

interface MenuSectionProps {
  categoryId?: number;
}

const MenuSection = ({ categoryId }: MenuSectionProps) => {
  return (
    <div className="flex flex-col gap-4 m-2">
      <CategoryTab selectedCategoryId={categoryId} />
      <MenuList categoryId={categoryId} />
    </div>
  );
};

export default MenuSection;
