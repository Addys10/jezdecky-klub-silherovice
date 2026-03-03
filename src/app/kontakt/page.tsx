import { sanityFetch } from "@/sanity/lib/fetch";
import { pageBySlugQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import { SiteSettingsQueryResult, PageBySlugQueryResult } from "@/../sanity.types";
import { PortableText } from "@portabletext/react";

export const metadata = {
  title: "Kontakt",
  description: "Kontaktujte Jezdecký klub Šilheřovice. Najdete nás v Šilheřovicích u Opavy – adresa, telefon a e-mail.",
};

export default async function KontaktPage() {
  const [page, settings] = await Promise.all([
    sanityFetch<PageBySlugQueryResult>(pageBySlugQuery, { slug: "kontakt" }),
    sanityFetch<SiteSettingsQueryResult>(siteSettingsQuery),
  ]);

  return (
    <>
      {/* ── SUBHERO ────────────────────────────────────── */}
      <section className="bg-cream pt-28 pb-10 sm:pt-32 sm:pb-12 border-b border-ink/8">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light leading-tight text-ink">
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

            {/* Obsah ze Sanity (doplňující text) */}
            {page?.body && (
              <div>
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

    </>
  );
}
