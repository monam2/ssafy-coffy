import "server-only";

import MenuItem from "@/feature/menu/ui/MenuItem";
import type { Menu } from "@/feature/menu/model/types";
import { arrDtoToArrType } from "@/feature/menu/model/mapper";
import MenuBuyButtons from "@/feature/menu/ui/MenuBuyButtons";
import { getMenuListAtServer } from "@/feature/menu/api/service.server";

const MenuList = async () => {
  const dto = await getMenuListAtServer();
  const menus: Menu[] = dto ? arrDtoToArrType(dto) : [];

  if (!menus.length) {
    return (
      <main className="flex flex-col justify-center items-center h-full">
        <section className="w-full h-32 justify-center flex items-center text-4xl text-gray-400 opacity-70 font-[BitBit]">
          텅..
        </section>
      </main>
    );
  }

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-2 gap-y-10">
      {menus.map((menu, index) => (
        <MenuItem
          key={menu.id}
          menu={menu}
          isPriority={index < 8} // 초기 이미지(8개)를 우선 로딩
          footer={<MenuBuyButtons menu={menu} />}
        />
      ))}
    </main>
  );
};

export default MenuList;
