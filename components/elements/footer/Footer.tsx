"use client";
import React, { useEffect, useState, useCallback } from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { SiMattermost } from "react-icons/si";
import { getTotalOrderAmount, getTotalOrderCount } from "@/api/firebase";

const Footer = () => {
  const [footerText, setFooterText] = useState(false);
  const [totalCnt, setTotalCnt] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchTotalOrderCnt = useCallback(async () => {
    try {
      const totalOrderCnt = await getTotalOrderCount();
      setTotalCnt((prev) => (prev !== totalOrderCnt ? totalOrderCnt : prev)); // 중복 업데이트 방지
    } catch (error) {
      console.error("Failed to fetch total order count:", error);
    }
  }, []);

  const fetchTotalOrderPrice = useCallback(async () => {
    try {
      const totalOrderPrice = await getTotalOrderAmount();
      setTotalAmount((prev) => (prev !== totalOrderPrice ? totalOrderPrice : prev)); // 중복 업데이트 방지
    } catch (error) {
      console.error("Failed to fetch total order price:", error);
    }
  }, []);

  const intervalChangeText = useCallback(() => {
    const intervalFunc = setInterval(() => {
      setFooterText((prevState) => !prevState);
    }, 3000);

    return intervalFunc;
  }, []);

  const moveTo = (path: string) => {
    switch (path) {
      case "github":
        window.open("https://github.com/monam2", "_blank");
        break;
      case "instagram":
        window.open("https://instagram.com/wxooo_kk", "_blank");
        break;
      case "mattermost":
        window.open("https://meeting.ssafy.com/s11public/messages/@kangcw0107", "_blank");
        break;
    }
  };

  useEffect(() => {
    fetchTotalOrderCnt();
    fetchTotalOrderPrice();

    const intervalFunc = intervalChangeText();
    return () => clearInterval(intervalFunc);
  }, [fetchTotalOrderCnt, fetchTotalOrderPrice, intervalChangeText]);

  return (
    <div className="w-full h-16 flex justify-between bg-slate-200 dark:bg-slate-600">
      <div className="flex h-full text-lg pl-10 items-center opacity-50 font-[Pretendard] font-bold">
        {(totalCnt > 0 || totalAmount > 0) &&
          (footerText ? (
            <span className="font-bold">누적 주문 수 {totalCnt} 건</span>
          ) : (
            <span className="font-bold">총 {totalAmount.toLocaleString()} 원</span>
          ))}
      </div>
      <div className="h-16 flex justify-end pr-10 items-center gap-6">
        <FaGithub onClick={() => moveTo("github")} className="w-7 h-7 opacity-50 cursor-pointer" />
        <FaInstagram
          onClick={() => moveTo("instagram")}
          className="w-7 h-7 opacity-50 cursor-pointer"
        />
        <SiMattermost
          onClick={() => moveTo("mattermost")}
          className="w-6 h-6 opacity-50 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Footer;
