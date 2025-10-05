"use client";

import { Button } from "@/shared/ui";
import type { Menu } from "@/feature/menu/model/types";

const MenuBuyButtons = ({ menu }: { menu: Menu }) => {
  const disabledAll = menu.isSoldOut;
  const hotDisabled = disabledAll || menu.onlyIce;

  return (
    <div className="flex justify-between mt-3">
      <Button
        type="button"
        disabled={hotDisabled}
        aria-label={`${menu.name} 핫 음료 선택`}
        className="bg-red-400 dark:bg-red-400 text-white dark:text-white"
      >
        핫
      </Button>
      <Button
        type="button"
        disabled={disabledAll}
        aria-label={`${menu.name} 아이스 음료 선택`}
        className="bg-blue-400 dark:bg-blue-400 text-white dark:text-white"
      >
        아이스
      </Button>
    </div>
  );
};

export default MenuBuyButtons;
