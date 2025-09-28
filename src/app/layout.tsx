import "./globals.css";
import { ReactNode } from "react";
import ThemeProvider from "@/app/_providers/ThemeProvider";
import ReactQueryProvider from "@/app/_providers/QueryProvider";
import buildMetadata from "@/shared/config/seo";

export const metadata = buildMetadata({
  title: {
    default: "싸피코피",
    template: "%s | 싸피코피",
  },
  description: "광주캠퍼스에서 커피가 마시고 십허요.",
  ogImage: "/img/logo/thumbnail.png",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {/* React Query Provider 설정 */}
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
