import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import React from "react";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jezdecký klub Šilheřovice",
  description: "Jezdecký klub Šilheřovice – výuka jezdectví pro děti i dospělé.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`${geist.variable} font-sans antialiased bg-stone-50 text-stone-900`}>
        <header className="border-b border-stone-200 bg-white">
          <nav className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              JK Šilheřovice
            </Link>
            <ul className="flex gap-6 text-sm text-stone-600">
              <li><Link href="/kone" className="hover:text-stone-900 transition-colors">Koně</Link></li>
            </ul>
          </nav>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-10">
          {children}
        </main>

        <footer className="border-t border-stone-200 mt-20">
          <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-stone-500 text-center">
            © {new Date().getFullYear()} Jezdecký klub Šilheřovice
          </div>
        </footer>
      </body>
    </html>
  );
}