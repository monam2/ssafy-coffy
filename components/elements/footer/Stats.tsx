import React, { useState, useEffect } from "react";

interface StatsProps {
  totalCnt: number;
  totalAmount: number;
}

const Stats: React.FC<StatsProps> = ({ totalCnt, totalAmount }) => {
  const [footerText, setFooterText] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFooterText((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

export default Stats;
