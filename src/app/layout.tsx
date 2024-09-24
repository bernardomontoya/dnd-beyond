import { Roboto_Mono } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TitanStar Legends",
  description: "Rune Mastery Loadout Talent Calculator 9000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={robotoMono.className}>
      <body>{children}</body>
    </html>
  );
}
