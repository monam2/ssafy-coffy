"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { SiMattermost } from "react-icons/si";
import { getTotalOrderAmount, getTotalOrderCount } from "@/api/firebase";
import Stats from "./Stats";

const Footer = () => {
  const { data: totalCnt = 0, isLoading: isLoadingCnt } = useQuery({
    queryKey: ["totalOrderCount"],
    queryFn: getTotalOrderCount,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const { data: totalAmount = 0, isLoading: isLoadingAmount } = useQuery({
    queryKey: ["totalOrderAmount"],
    queryFn: getTotalOrderAmount,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // 외부 링크 이동
  const moveTo = (path: string) => {
    const urls: Record<string, string> = {
      github: "https://github.com/monam2",
      instagram: "https://instagram.com/wxooo_kk",
      mattermost: "https://meeting.ssafy.com/s11public/messages/@kangcw0107",
    };
    window.open(urls[path], "_blank");
  };

  return (
    <div className="w-full h-16 flex justify-between bg-slate-200 dark:bg-slate-600">
      {isLoadingCnt || isLoadingAmount ? (
        <div className="flex h-full text-lg pl-10 items-center opacity-50 font-[Pretendard] font-bold">
          Loading...
        </div>
      ) : (
        <Stats totalCnt={totalCnt} totalAmount={totalAmount} />
      )}
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
