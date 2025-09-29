"use client";

import QueryProvider from "./QueryProvider";
import ThemeProvider from "./ThemeProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryProvider>
  );
};

export default Providers;
