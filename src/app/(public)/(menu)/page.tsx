import MenuSection from "@/widget/menu/ui/MenuSection";
import { parseCategoryIdParams } from "@/shared/lib/category/validation";

interface MenuPageProps {
  searchParams: Promise<{ categoryId?: string }>;
}

const MenuPage = async ({ searchParams }: MenuPageProps) => {
  const { categoryId } = await searchParams;
  const parsedCateId = parseCategoryIdParams(categoryId);

  return <MenuSection categoryId={parsedCateId} />;
};

export default MenuPage;
