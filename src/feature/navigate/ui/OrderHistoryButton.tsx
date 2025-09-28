import Link from "next/link";

import { Button } from "@/shared/ui";
import { LuClipboardList } from "react-icons/lu";

const OrderHistoryButton = () => {
  return (
    <Button
      asChild
      variant="outline"
      className="w-10 h-10 p-2"
      aria-label="주문 내역 페이지 열기"
    >
      <Link href="/order-history">
        <LuClipboardList className="w-full h-full" />
      </Link>
    </Button>
  );
};

export default OrderHistoryButton;
