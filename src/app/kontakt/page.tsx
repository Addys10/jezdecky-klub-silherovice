import { sanityFetch } from "@/sanity/lib/fetch";
import { pageBySlugQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import { SiteSettingsQueryResult, PageBySlugQueryResult } from "@/../sanity.types";
import { PortableText } from "@portabletext/react";

export const metadata = {
  title: "Kontakt",
};

export default async function KontaktPage() {
  const [page, settings] = await Promise.all([
    sanityFetch<PageBySlugQueryResult>(pageBySlugQuery, { slug: "kontakt" }),
    sanityFetch<SiteSettingsQueryResult>(siteSettingsQuery),
  ]);

  return (
    <>
      {/* ── SUBHERO ────────────────────────────────────── */}
      <section className="bg-forest text-cream pt-32 pb-16 sm:pt-36 sm:pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="w-8 h-px bg-gold mb-4 sm:mb-6" />
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-4">
            JK Šilheřovice
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light leading-tight">
            <em>Kontakt</em>
          </h1>
        </div>
      </section>

      {/* ── KONTAKT GRID ───────────────────────────────── */}
      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

          {/* Levý sloupec */}
          <div className="space-y-12">

            {/* Adresa */}
            {(settings?.address || settings?.city) && (
              <div>
                <div className="w-8 h-px bg-gold mb-4" />
                <p className="text-[10px] tracking-[0.25em] uppercase text-gold font-medium mb-4">Adresa</p>
                <address className="not-italic text-ink/70 text-base leading-relaxed">
                  {settings.address && <span className="block">{settings.address}</span>}
                  {settings.city && <span className="block">{settings.city}</span>}
                </address>
              </div>
            )}

            {/* Telefon + email */}
            {(settings?.phone || settings?.email) && (
              <div>
                <div className="w-8 h-px bg-gold mb-4" />
                <p className="text-[10px] tracking-[0.25em] uppercase text-gold font-medium mb-4">Spojení</p>
                <ul className="space-y-2">
                  {settings?.phone && (
                    <li>
                      <a
                        href={`tel:${settings.phone.replace(/\s/g, "")}`}
                        className="text-ink/70 hover:text-ink transition-colors text-base"
                      >
                        {settings.phone}
                      </a>
                    </li>
                  )}
                  {settings?.email && (
                    <li>
                      <a
                        href={`mailto:${settings.email}`}
                        className="text-ink/70 hover:text-ink transition-colors text-base"
                      >
                        {settings.email}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Provozní doba */}
            {settings?.openingHours && settings.openingHours.length > 0 && (
              <div>
                <div className="w-8 h-px bg-gold mb-4" />
                <p className="text-[10px] tracking-[0.25em] uppercase text-gold font-medium mb-4">Provozní doba</p>
                <ul className="space-y-1">
                  {settings.openingHours.map((oh: { _key?: string; days?: string; hours?: string }, i: number) => (
                    <li key={oh._key ?? i} className="text-ink/70 text-sm">
                      <span className="text-ink/40 w-20 inline-block">{oh.days}</span>
                      {oh.hours}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Obsah ze Sanity (doplňující text) */}
            {page?.body && (
              <div>
                <div className="w-8 h-px bg-gold mb-4" />
                <div className="prose prose-stone prose-sm max-w-none [&_p]:text-ink/70 [&_p]:leading-relaxed [&_h2]:font-heading [&_h2]:font-normal [&_h2]:text-lg [&_h2]:text-ink [&_h2]:mb-2 [&_h2]:mt-0">
                  <PortableText value={page.body} />
                </div>
              </div>
            )}

            {/* CTA */}
            {settings?.email && (
              <a
                href={`mailto:${settings.email}`}
                className="inline-flex items-center gap-3 bg-gold text-forest text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 hover:bg-gold-light transition-colors duration-300"
              >
                Napište nám →
              </a>
            )}
          </div>

          {/* Pravý sloupec: dekorativní typografie */}
          <div className="hidden lg:flex flex-col items-end justify-center">
            <p className="font-heading text-[9rem] xl:text-[11rem] leading-none font-light italic text-forest/8 select-none tracking-tight">
              JK
            </p>
            <p className="font-heading text-2xl xl:text-3xl font-light text-forest/20 tracking-[0.15em] uppercase -mt-4">
              Šilheřovice
            </p>
          </div>

        </div>
      </section>

      {/* ── DOPLŇUJÍCÍ INFO ─────────────────────────────── */}
      <section className="bg-forest text-cream">
        <div className="max-w-6xl mx-auto px-6 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="w-6 h-px bg-gold mb-4" />
            <p className="text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">Jezdecký klub</p>
            <p className="text-cream/60 text-sm leading-relaxed">Fungujeme od roku 2005</p>
          </div>
          {settings?.facebook && (
            <div>
              <div className="w-6 h-px bg-gold mb-4" />
              <p className="text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">Facebook</p>
              <a href={settings.facebook} target="_blank" rel="noopener noreferrer"
                className="text-cream/60 text-sm hover:text-cream/90 transition-colors">
                Navštívit stránku →
              </a>
            </div>
          )}
          {settings?.instagram && (
            <div>
              <div className="w-6 h-px bg-gold mb-4" />
              <p className="text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">Instagram</p>
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer"
                className="text-cream/60 text-sm hover:text-cream/90 transition-colors">
                Sledovat →
              </a>
            </div>
          )}
          {!settings?.facebook && !settings?.instagram && (
            <div className="sm:col-span-2">
              <div className="w-6 h-px bg-gold mb-4" />
              <p className="text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-2">Sociální sítě</p>
              <p className="text-cream/40 text-sm">Odkazy lze přidat v Nastavení webu ve Studiu.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
