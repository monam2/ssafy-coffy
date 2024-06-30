import { cartState } from "@/recoil/cart/atoms";
import React from "react";
import { useRecoilState } from "recoil";

interface cartDto {
  id: number;
  category: string;
  menu: string;
  onlyIce: boolean;
  price: number;
  img: string;
  isShot: boolean;
  isWhip: boolean;
  isSyrup: boolean;
  isMilk: boolean;
  isPeorl: boolean;
  isHot: boolean;
  cartId: number;
}

const CartItem = ({ item }: { item: cartDto }) => {
  const [cartMenus, setCartMenus] = useRecoilState(cartState);
  const removeItemFromCart = (id: number) => {
    const index = cartMenus.findIndex((cartItem) => cartItem.cartId === id);
    if (index !== -1) {
      const newCartMenus = [...cartMenus];
      newCartMenus.splice(index, 1);
      setCartMenus(newCartMenus);
    }
  };

  return (
    <div className="flex justify-between px-3 items-center w-full h-12">
      <div className="flex gap-1 items-center">
        {item.isHot ? (
          <span className="text-center font-semibold font-[Pretendard] text-red-400 dark:text-red-500">
            핫
          </span>
        ) : (
          <span className="text-center font-semibold font-[Pretendard] text-blue-400 dark:text-blue-300">
            아이스
          </span>
        )}
        <span className="min-w-[100px] font-[Pretendard] text-lg">
          {item.menu}
        </span>
      </div>

      <div className="flex gap-1">
        {item.isShot ? (
          <span className="font-[Pretendard] text-gray-400 dark:text-gray-200">
            샷
          </span>
        ) : null}
        {item.isWhip ? (
          <span className="font-[Pretendard] text-gray-400 dark:text-gray-200">
            휘핑
          </span>
        ) : null}
        {item.isSyrup ? (
          <span className="font-[Pretendard] text-gray-400 dark:text-gray-200">
            시럽
          </span>
        ) : null}
        {item.isMilk ? (
          <span className="font-[Pretendard] text-gray-400 dark:text-gray-200">
            우유
          </span>
        ) : null}
        {item.isPeorl ? (
          <span className="font-[Pretendard] text-gray-400 dark:text-gray-200">
            펄
          </span>
        ) : null}
      </div>

      <div className="w-[120px] flex justify-end items-center gap-3">
        <span className="font-[Pretendard] text-lg font-medium">
          {item.price.toLocaleString()}원
        </span>
        <button
          onClick={() => removeItemFromCart(item.cartId)}
          className="font-[Pretendard] w-6 h-6 bg-red-300 text-white rounded-full"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default CartItem;

// {item.menu} {count} 개 {item.price * count}원
