
import * as React from "react";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/base/sonner/sonner";
import Header from "@/components/ui/layouts/header/header";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full h-full" suppressHydrationWarning>
      <body
        className="w-full h-full antialiased"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppLayout>
            {children}
          </AppLayout>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}

function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full grid grid-flow-col grid-rows-[auto_1fr]">
      <Header />
      <div className="flex justify-center overflow-y-auto">
        <div className="w-full max-w-4xl px-2 pt-4 pb-2">
          {children}
        </div>
      </div>
    </div>
  );
}
