import Link from "next/link";

import { cn } from "@/shared/lib/cn";

interface CategoryTabItemProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
}
const CategoryTabItem = ({ href, active, children }: CategoryTabItemProps) => {
  return (
    <Link
      href={href}
      prefetch
      aria-pressed={active}
      className={cn(
        "px-2 py-1 cursor-pointer text-center font-semibold text-base pt-1",
        active ? "bg-sky-300 rounded-2xl dark:bg-sky-500" : "bg-none"
      )}
    >
      {children}
    </Link>
  );
};

export default CategoryTabItem;
