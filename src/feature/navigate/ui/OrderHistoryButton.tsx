import Link from "next/link";

import { Button } from "@/shared/ui";
import { LuClipboardList } from "react-icons/lu";

const OrderHistoryButton = () => {
  return (
    <Button asChild variant="outline" className="w-10 h-10 p-2">
      <Link href="/order-history">
        <LuClipboardList className="w-full h-full" />
      </Link>
    </Button>
  );
};

export default OrderHistoryButton;
