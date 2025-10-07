import MenuContainer from "@/feature/menu/ui/MenuContainer";

interface MenuPageProps {
  searchParams: Promise<{ categoryId?: string }>;
}

const MenuPage = async ({ searchParams }: MenuPageProps) => {
  const { categoryId } = await searchParams;

  return <MenuContainer categoryId={categoryId} />;
};

export default MenuPage;
