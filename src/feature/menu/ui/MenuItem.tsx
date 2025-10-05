import Image from "next/image";

import type { Menu } from "@/feature/menu/model/types";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/shared/ui";

type MenuItemProps = {
  menu: Menu;
  isPriority?: boolean;
  footer: React.ReactNode;
};

const MenuItem = ({ menu, isPriority = false, footer }: MenuItemProps) => {
  return (
    <Card className="w-[300px] m-auto px-4 dark:bg-gray-200 dark:border-gray-200 rounded-xl shadow-xl">
      {/* 메뉴 이미지 */}
      <CardHeader className="items-center m-auto p-2 pt-6">
        <div className="relative w-[180px] h-[250px]">
          <Image
            src={menu.img}
            alt={menu.name}
            fill
            priority={isPriority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-2xl object-cover"
          />
          {/* Ice & SoldOut 뱃지 */}
          <div className="absolute top-2 left-2 flex gap-1">
            {menu.onlyIce && (
              <Badge
                aria-label="아이스만 가능"
                className="bg-blue-500 text-white"
              >
                ICE ONLY
              </Badge>
            )}
            {menu.isSoldOut && (
              <Badge
                aria-label="품절된 메뉴"
                className="bg-gray-500 text-white"
              >
                SOLD OUT
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      {/* 메뉴 정보(이름, 가격) */}
      <CardContent className="flex flex-col gap-3">
        <CardTitle className="flex flex-col justify-between text-base">
          <span className="text-lg dark:text-gray-800">{menu.name}</span>
          <span className="text-lg text-right text-gray-500 dark:text-gray-600">
            {menu.price.toLocaleString()}원
          </span>
        </CardTitle>

        {/* 구매 버튼 영역(footer) */}
        {footer}
      </CardContent>
    </Card>
  );
};

export default MenuItem;
