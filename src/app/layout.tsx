import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./(landingPage)/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-[rgb(15,7,21)] bg-gradient-to-r from-[rgb(15,7,21)] to-[rgb(26,22,66)] 
      
      ">
        <div className="">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
