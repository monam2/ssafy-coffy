import Image from "next/image";

import buildMetadata from "@/shared/config/seo";
import LoginForm from "@/feature/auth/ui/LoginForm";

export const metadata = buildMetadata({
  title: "싸피코피 - 로그인",
  description: "싸피코피 - 로그인 페이지",
  keywords: ["로그인"],
});

const LoginPage = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <LoginForm
        header={
          <Image src="/img/logo/logo.png" alt="logo" width={220} height={500} />
        }
      />
    </main>
  );
};

export default LoginPage;
