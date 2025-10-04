import "@/app/globals.css";

import Providers from "@/app/_providers";
import { getUserSnapshot } from "@/shared/lib/auth/session";
import AuthHydrator from "@/entities/user/model/AuthHydrator";

import Header from "@/widget/ui/Header";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const initialUser = (await getUserSnapshot("auth_user")) ?? null;

  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Providers>
          <AuthHydrator initialUser={initialUser}>
            <Header />
            {children}
          </AuthHydrator>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
