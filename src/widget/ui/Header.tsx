import HomeLogo from "@/feature/navigate/ui/HomeLogo";
import CartButton from "@/feature/navigate/ui/CartButton";
import UserInfoButton from "@/feature/auth/ui/UserInfoButton";
import DarkModeToggle from "@/feature/theme/ui/DarkModeToggle";
import OrderHistoryButton from "@/feature/navigate/ui/OrderHistoryButton";

// Header - 여러 요소를 조립
const Header = () => {
  return (
    <div className="w-full h-16 flex justify-center bg-slate-200 dark:bg-slate-600">
      <div className="flex justify-around w-full gap-8">
        <HomeLogo />
        <div className="flex items-center gap-2">
          <UserInfoButton />
          <OrderHistoryButton />
          <CartButton />
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
