import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { SiteSettingsQueryResult } from "@/../sanity.types";

export default async function Footer() {
  const settings = await sanityFetch<SiteSettingsQueryResult>(siteSettingsQuery);

  return (
    <footer className="bg-forest text-cream">

      {/* ── MAPA ─────────────────────────────────────── */}
      <div className="w-full h-52 sm:h-72 relative overflow-hidden opacity-60 grayscale">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=18.255%2C49.930%2C18.315%2C49.960&layer=mapnik&marker=49.9427%2C18.2809"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          loading="lazy"
          title="Mapa – JK Šilheřovice"
        />
      </div>

      {/* ── INFO ─────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-3 gap-8 border-b border-cream/10">

        <div>
          <p className="text-[9px] tracking-[0.25em] uppercase text-gold mb-3">Adresa</p>
          <address className="not-italic text-cream/60 text-sm leading-relaxed">
            {settings?.address ?? "Šilheřovice 123"}<br />
            {settings?.city ?? "747 15 Šilheřovice"}
          </address>
        </div>

        <div>
          <p className="text-[9px] tracking-[0.25em] uppercase text-gold mb-3">Kontakt</p>
          <ul className="text-sm leading-relaxed space-y-1">
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
          <p className="text-[9px] tracking-[0.25em] uppercase text-gold mb-3">Provozní doba</p>
          {settings?.openingHours && settings.openingHours.length > 0 ? (
            <ul className="text-cream/60 text-sm leading-relaxed space-y-1">
              {settings.openingHours.map((oh: { _key?: string; days?: string; hours?: string }, i: number) => (
                <li key={oh._key ?? i}>
                  <span className="text-cream/40">{oh.days}:</span> {oh.hours}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-cream/60 text-sm leading-relaxed">
              Po–Pá: 8:00–18:00<br />So–Ne: 8:00–16:00
            </p>
          )}
        </div>

      </div>

      {/* ── BOTTOM BAR ───────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4 text-[9px] tracking-[0.2em] uppercase text-cream/25">
        <span>© {new Date().getFullYear()} JK Šilheřovice</span>
        <Link href="/studio" className="hover:text-cream/50 transition-colors">
          Studio
        </Link>
      </div>

    </footer>
  );
}
