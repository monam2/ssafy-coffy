"use client";

import { Button } from "@/shared/ui";

const MenuError = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="p-6 text-center h-screen flex flex-col justify-center items-center">
      <p className="text-red-500 opacity-50 mb-3 font-[BitBit] text-2xl">
        메뉴를 불러오지 못했습니다.
      </p>
      <Button
        variant="ghost"
        className="mt-4 underline font-[BitBit] text-lg opacity-50"
        onClick={reset}
      >
        다시 시도
      </Button>
    </div>
  );
};

export default MenuError;
