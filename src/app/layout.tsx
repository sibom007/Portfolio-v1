import type { Metadata } from "next";

import "./globals.css";
import { Providers } from "@/lib/providers";

export const metadata: Metadata = {
  title: "Sibom",
  description: "Be Cool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
