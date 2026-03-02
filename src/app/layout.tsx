import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
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
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-cream text-ink`}>
        <header className="absolute top-0 left-0 right-0 z-10">
          <nav className="max-w-6xl mx-auto px-6 py-5 sm:py-6 flex items-center justify-between gap-4">
            <Link
              href="/"
              className="font-heading text-xs sm:text-sm tracking-[0.2em] uppercase text-cream/90 hover:text-cream transition-colors shrink-0"
            >
              JK Šilheřovice
            </Link>
            <ul className="flex gap-4 sm:gap-8 text-[10px] sm:text-xs tracking-[0.15em] uppercase text-cream/70">
              <li>
                <Link href="/kone" className="hover:text-cream transition-colors">
                  Koně
                </Link>
              </li>
              <li>
                <Link href="/o-nas" className="hover:text-cream transition-colors">
                  O nás
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-cream transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {children}

        <footer className="bg-forest text-cream/50 border-t border-cream/10">
          <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs tracking-widest uppercase">
            <span>© {new Date().getFullYear()} Jezdecký klub Šilheřovice</span>
            <Link href="/studio" className="hover:text-cream/80 transition-colors">
              Studio
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}