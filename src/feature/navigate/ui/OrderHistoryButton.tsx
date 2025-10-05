import Link from "next/link";

import { Button } from "@/shared/ui";
import { LuClipboardList } from "react-icons/lu";

const OrderHistoryButton = () => {
  return (
    <Button
      asChild
      variant="outline"
      className="w-10 h-10 p-2 dark:bg-gray-200 dark:text-gray-500 border-none"
    >
      <Link href="/order-history" aria-label="주문 내역">
        <LuClipboardList className="w-full h-full" aria-hidden="true" />
      </Link>
    </Button>
  );
};

export default OrderHistoryButton;
