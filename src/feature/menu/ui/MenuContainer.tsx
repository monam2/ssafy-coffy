"use client";

import useMenuList from "../model/hooks/useMenuList";

const MenuContainer = () => {
  const { menuList } = useMenuList();

  return <div>{JSON.stringify(menuList)}</div>;
};

export default MenuContainer;
