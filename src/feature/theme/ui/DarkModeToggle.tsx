"use client";

import { useTheme } from "next-themes";

import { Button } from "@/shared/ui";
import { Moon, Sun } from "lucide-react";

const DarkModeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button
      className="my-auto dark:bg-gray-200 dark:text-gray-500 border-none"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="다크모드 테마 변경"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
};

export default DarkModeToggle;
