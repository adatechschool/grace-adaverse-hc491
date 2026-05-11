import type { Metadata } from "next";
/* import { Geist, Geist_Mono } from "next/font/google"; */
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adaverse 2 - Par Chau, Emilie, Hugo et Océane",
  description: "Un projet Ada Tech School",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
