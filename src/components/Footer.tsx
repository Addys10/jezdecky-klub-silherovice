import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { SiteSettingsQueryResult } from "@/../sanity.types";

const navLinks = [
  { href: "/kone", label: "Naši koně" },
  { href: "/galerie", label: "Galerie" },
  { href: "/o-nas", label: "O nás" },
  { href: "/kontakt", label: "Kontakt" },
];

export default async function Footer() {
  const settings = await sanityFetch<SiteSettingsQueryResult>(siteSettingsQuery);

  return (
    <footer className="bg-forest text-cream">

      {/* ── HLAVNÍ OBSAH ─────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pt-10 sm:pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-16 items-start">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-heading text-base sm:text-lg font-light tracking-[0.2em] uppercase text-cream/90 hover:text-cream transition-colors"
            >
              JK Šilheřovice
            </Link>
            <p className="text-[9px] tracking-[0.25em] uppercase text-cream/25 mt-2">
              Jezdecký klub · od roku 2005
            </p>
            {(settings?.address || settings?.city) && (
              <address className="not-italic text-cream/45 text-xs leading-relaxed mt-4">
                {settings?.address && <span className="block">{settings.address}</span>}
                {settings?.city && <span className="block">{settings.city}</span>}
              </address>
            )}
          </div>

          {/* Navigace */}
          <nav className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] tracking-[0.2em] uppercase text-cream/45 hover:text-cream/80 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Kontakt */}
          <div className="sm:text-right space-y-1.5">
            {settings?.phone && (
              <div>
                <a
                  href={`tel:${settings.phone.replace(/\s/g, "")}`}
                  className="text-sm text-cream/60 hover:text-cream/90 transition-colors"
                >
                  {settings.phone}
                </a>
              </div>
            )}
            {settings?.email && (
              <div>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-sm text-cream/60 hover:text-cream/90 transition-colors"
                >
                  {settings.email}
                </a>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── COPYRIGHT ────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-4 border-t border-cream/8">
        <span className="text-[9px] tracking-[0.2em] uppercase text-cream/20">
          © {new Date().getFullYear()} JK Šilheřovice
        </span>
      </div>

    </footer>
  );
}
