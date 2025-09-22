import Link from "next/link";

import { Button } from "@/shared/ui";
import { IoCartOutline } from "react-icons/io5";

const CartButton = () => {
  return (
    <Button asChild variant="outline" className="w-10 h-10 p-2">
      <Link href="/cart">
        <IoCartOutline className="w-full h-full" />
      </Link>
    </Button>
  );
};

export default CartButton;
