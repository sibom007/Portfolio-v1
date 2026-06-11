import type { Metadata } from "next";
import { Providers } from "@/lib/n-providers";
import "./globals.css";

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
