import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Manasa Book Center | Books, Stationery and Student Essentials",
  description:
    "Manasa Book Center in Chimakurthy for books, stationery, school essentials, project materials, engineering tools and gifts.",
  icons: {
    icon: "/manasa-logo-mark.svg",
    apple: "/manasa-logo-mark.svg",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#fbf7ef] text-[#071f33]">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
