import { cookies } from "next/headers";
import Providers from "@/app/_providers";
import { LoginUser } from "@/entities/user/model/atom";
import AuthHydrator from "@/entities/user/model/AuthHydrator";

import Header from "@/widget/ui/Header";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  let initialUser: LoginUser = null;

  const cookieStore = await cookies();
  const snapShot = cookieStore.get("auth_user")?.value;

  if (snapShot) initialUser = JSON.parse(snapShot);

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
