import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import { SiteChrome } from "@/components/site/SiteChrome";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Manasa Book Center | Books, Stationery and Student Essentials",
  description:
    "Manasa Book Center in Chimakurthy for books, stationery, school essentials, project materials, engineering tools and gifts.",
  icons: {
    icon: "/manasa-logo-concept-mark.svg",
    apple: "/manasa-logo-concept-mark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-[#fbf7ef] text-[#071f33]">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
