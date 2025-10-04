"use client";

import { useState } from "react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { LoginUser, loginUserAtom } from "@/entities/user/model/atom";

import { Button } from "@/shared/ui";
import LogoutButton from "./LogoutButton";
import { LuLogIn } from "react-icons/lu";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

const UserInfoPopover = ({ trigger }: { trigger: React.ReactNode }) => {
  const user = useAtomValue(loginUserAtom);
  const [open, setOpen] = useState(false);

  const closePopover = () => {
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="w-64 mt-2.5">
        <UserInfoPanel user={user} onClose={closePopover} />
      </PopoverContent>
    </Popover>
  );
};

export default UserInfoPopover;

const UserInfoPanel = ({
  user,
  onClose,
}: {
  user: LoginUser | null;
  onClose?: () => void;
}) => {
  const router = useRouter();

  if (!user) {
    return (
      <div className="flex items-center gap-2 justify-between px-2">
        <div className="text-sm text-gray-500">로그인이 필요합니다.</div>
        <Button
          size="sm"
          onClick={() => {
            onClose?.();
            router.replace("/login");
          }}
        >
          <LuLogIn className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="text-sm space-y-2">
      <div className="flex justify-between items-center">
        <div className="font-semibold">내 정보</div>
        {/* 로그아웃 버튼 */}
        <LogoutButton onSuccess={onClose} />
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500">이름</span>
        <span>{user.name ?? "-"}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500">Email</span>
        <span>{user.email ?? "-"}</span>
      </div>
    </div>
  );
};
