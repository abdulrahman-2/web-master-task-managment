import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import Header from "@/components/layout/Header";
import Notifications from "@/components/common/Notifications";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "This is a Todo App built with Next.js 14 and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` ${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            <Notifications />
            <Header />
            <div className="container mx-auto flex flex-col items-center justify-center h-full">
              {children}
            </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
