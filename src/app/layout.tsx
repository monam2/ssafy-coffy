import "@/app/globals.css";
import localFont from "next/font/local";

import Providers from "@/app/_providers";
import AuthHydrator from "@/entities/user/model/AuthHydrator";
import Header from "@/widget/ui/Header";
import { getUserSnapshot } from "@/shared/lib/auth/session";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  preload: true,
  variable: "--font-pretendard",
});
const moyamoya = localFont({
  src: [
    {
      path: "../../public/fonts/Cafe24Moyamoya-Regular-v1.0.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  preload: true,
  variable: "--font-moyamoya",
});
const bitbit = localFont({
  src: [
    {
      path: "../../public/fonts/DNFBitBitv2.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  preload: true,
  variable: "--font-bitbit",
});

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const initialUser = (await getUserSnapshot("auth_user")) ?? null;

  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${pretendard.variable} ${moyamoya.variable} ${bitbit.variable}`}
    >
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
