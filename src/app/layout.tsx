import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StudioGuard from "@/components/StudioGuard";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { SiteSettingsQueryResult } from "@/../sanity.types";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jk-silherovice.cz"),
  title: {
    default: "JK Šilheřovice",
    template: "%s | JK Šilheřovice",
  },
  description:
    "Jezdecký klub Šilheřovice – výuka jezdectví pro děti i dospělé v příjemném prostředí u Opavy.",
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://jk-silherovice.cz",
    siteName: "Jezdecký klub Šilheřovice",
    title: "Jezdecký klub Šilheřovice",
    description:
      "Výuka jezdectví pro děti i dospělé v příjemném prostředí u Opavy.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await sanityFetch<SiteSettingsQueryResult>(siteSettingsQuery);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsClub",
    name: "Jezdecký klub Šilheřovice",
    url: "https://jk-silherovice.cz",
    ...(settings?.email && { email: settings.email }),
    ...(settings?.phone && { telephone: settings.phone }),
    address: {
      "@type": "PostalAddress",
      addressLocality: settings?.city ?? "Šilheřovice",
      streetAddress: settings?.address ?? undefined,
      addressCountry: "CZ",
    },
  };

  return (
    <html lang="cs">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-cream text-ink flex flex-col min-h-dvh`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <StudioGuard><Footer /></StudioGuard>
      </body>
    </html>
  );
}
