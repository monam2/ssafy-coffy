"use client";
import React, { useEffect, useState, useCallback } from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { SiMattermost } from "react-icons/si";
import { getTotalOrderAmount, getTotalOrderCount } from "@/api/firebase";
import Stats from "./Stats";

const Footer = () => {
  const [footerText, setFooterText] = useState(false);
  const [totalCnt, setTotalCnt] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const intervalChangeText = useCallback(() => {
    const intervalFunc = setInterval(() => {
      setFooterText((prevState) => !prevState);
    }, 3000);

    return intervalFunc;
  }, []);

  const fetchTotalOrderCnt = useCallback(async () => {
    const totalOrderCnt = await getTotalOrderCount();
    setTotalCnt(totalOrderCnt);
  }, []);

  const fetchTotalOrderPrice = useCallback(async () => {
    const totalOrderPrice = await getTotalOrderAmount();
    setTotalAmount(totalOrderPrice);
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

    return () => {
      clearInterval(intervalFunc);
    };
  }, [fetchTotalOrderCnt, fetchTotalOrderPrice, intervalChangeText]);

  return (
    <div className="w-full h-16 flex justify-between bg-slate-200 dark:bg-slate-600">
      <Stats footerText={footerText} totalCnt={totalCnt} totalAmount={totalAmount} />
      <div className=" h-16 flex justify-end pr-10 items-center gap-6">
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
