import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { SiteSettingsQueryResult } from "@/../sanity.types";

export default async function Footer() {
  const settings = await sanityFetch<SiteSettingsQueryResult>(siteSettingsQuery);

  return (
    <footer className="bg-forest text-cream">

      {/* ── INFO + MAPA ──────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_320px] gap-5 lg:gap-8">

        <div>
          <p className="text-[9px] tracking-[0.25em] uppercase text-gold mb-2">Adresa</p>
          <address className="not-italic text-cream/60 text-sm leading-snug">
            {settings?.address ?? "Šilheřovice 123"}<br />
            {settings?.city ?? "747 15 Šilheřovice"}
          </address>
        </div>

        <div>
          <p className="text-[9px] tracking-[0.25em] uppercase text-gold mb-2">Kontakt</p>
          <ul className="text-sm leading-snug space-y-0.5">
            {settings?.phone && (
              <li>
                <a
                  href={`tel:${settings.phone.replace(/\s/g, "")}`}
                  className="text-cream/60 hover:text-cream/90 transition-colors"
                >
                  {settings.phone}
                </a>
              </li>
            )}
            {settings?.email && (
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-cream/60 hover:text-cream/90 transition-colors"
                >
                  {settings.email}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <span className="text-[9px] tracking-[0.2em] uppercase text-cream/25">
            © {new Date().getFullYear()} JK Šilheřovice
          </span>
        </div>

        {/* Mapa */}
        <div className="h-40 sm:h-48 lg:h-full lg:min-h-[9rem] relative overflow-hidden ring-1 ring-cream/10">
          <div className="absolute inset-0 grayscale opacity-75 z-0">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=18.255%2C49.930%2C18.315%2C49.960&layer=mapnik&marker=49.9427%2C18.2809"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              title="Mapa – JK Šilheřovice"
            />
          </div>
          <div className="absolute inset-0 bg-forest/20 z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 z-20 px-3 py-1.5 bg-gradient-to-t from-forest/80 to-transparent pointer-events-none">
            <p className="text-[9px] tracking-[0.2em] uppercase text-cream/50">Šilheřovice</p>
          </div>
        </div>

      </div>


    </footer>
  );
}