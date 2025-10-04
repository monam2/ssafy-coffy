"use client";

import { LuUser } from "react-icons/lu";

import { Button } from "@/shared/ui";
import UserInfoPopover from "@/feature/auth/ui/UserInfoPopover";

const UserInfoButton = () => {
  return (
    <UserInfoPopover
      trigger={
        <Button
          variant="outline"
          className="w-10 h-10 p-2 dark:bg-gray-200 dark:text-gray-500 border-none"
          aria-label="내 정보"
        >
          <LuUser className="w-full h-full" />
        </Button>
      }
    />
  );
};

export default UserInfoButton;
