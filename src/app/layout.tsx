import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/lib/Providers";

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
