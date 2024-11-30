import React, { memo } from "react";

interface StatsProps {
  footerText: boolean;
  totalCnt: number;
  totalAmount: number;
}

const Stats = ({ footerText, totalCnt, totalAmount }: StatsProps) => {
  return (
    <div className="flex h-full text-lg pl-10 items-center opacity-50 font-[Pretendard] font-bold">
      {(totalCnt > 0 || totalAmount > 0) &&
        (footerText ? (
          <span className="font-bold">누적 주문 수 {totalCnt} 건</span>
        ) : (
          <span className="font-bold">총 {totalAmount.toLocaleString()} 원</span>
        ))}
    </div>
  );
};

export default memo(Stats);
