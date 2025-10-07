import MenuContainer from "@/feature/menu/ui/MenuContainer";
import { parseCategoryIdParams } from "@/shared/lib/category/validation";

interface MenuPageProps {
  searchParams: Promise<{ categoryId?: string }>;
}

const MenuPage = async ({ searchParams }: MenuPageProps) => {
  const { categoryId } = await searchParams;
  const parsedCateId = parseCategoryIdParams(categoryId);

  return <MenuContainer categoryId={parsedCateId} />;
};

export default MenuPage;
