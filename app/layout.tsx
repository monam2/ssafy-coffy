import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "싸피코피",
    template: "%s | 싸피코피",
  },
  description: "광주캠퍼스에서 커피가 마시고 십허요.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "싸피코피 SSAFY-COFFY",
    description: "광주캠퍼스에서 커피가 마시고 십허요.",
    images: [
      {
        url: "https://ssafy-cofy.vercel.app/img/logo/thumbnail.png",
        width: 800,
        height: 600,
        alt: "thumbnail",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
