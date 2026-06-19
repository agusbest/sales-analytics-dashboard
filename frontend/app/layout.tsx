import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sales Analytics Dashboard",
  description: "Full Stack Dashboard with Next.js + Node.js + MySQL",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >

      <body
        className="
          min-h-screen
          bg-gradient-to-br
          from-slate-50
          via-blue-50
          to-indigo-100
          text-slate-800
        "
      >

        <Navbar />

        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>

      </body>

    </html>
  );
}