'use client';

import store from "@/store/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
}
