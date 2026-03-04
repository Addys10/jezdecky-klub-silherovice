import { sanityFetch } from "@/sanity/lib/fetch";
import { pageBySlugQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import { SiteSettingsQueryResult, PageBySlugQueryResult } from "@/../sanity.types";
import { PortableText } from "@portabletext/react";
import Breadcrumb from "@/components/Breadcrumb";

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
      <Breadcrumb crumbs={[{ label: "Domů", href: "/" }, { label: "Kontakt" }]} />

      {/* ── KONTAKT ────────────────────────────────────── */}
      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] lg:min-h-[600px] gap-0">

            {/* Levý sloupec: info */}
            <div className="py-16 sm:py-20 lg:py-24 lg:pr-16 lg:border-r lg:border-ink/8 space-y-10">

              {(settings?.address || settings?.city) && (
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-ink/30 mb-3">Adresa</p>
                  <address className="not-italic font-heading text-2xl sm:text-3xl font-light text-ink leading-snug">
                    {settings.address && <span className="block">{settings.address}</span>}
                    {settings.city && <span className="block text-ink/45">{settings.city}</span>}
                  </address>
                </div>
              )}

              {settings?.phone && (
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-ink/30 mb-3">Telefon</p>
                  <a
                    href={`tel:${settings.phone.replace(/\s/g, "")}`}
                    className="font-heading text-3xl sm:text-4xl font-light text-ink hover:text-gold transition-colors"
                  >
                    {settings.phone}
                  </a>
                </div>
              )}

              {settings?.email && (
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-ink/30 mb-3">E-mail</p>
                  <a
                    href={`mailto:${settings.email}`}
                    className="font-heading text-2xl sm:text-3xl font-light text-ink hover:text-gold transition-colors break-all"
                  >
                    {settings.email}
                  </a>
                </div>
              )}

              {page?.body && (
                <div className="pt-6 border-t border-ink/8 prose prose-stone prose-sm max-w-none [&_p]:text-ink/55 [&_p]:leading-relaxed">
                  <PortableText value={page.body} />
                </div>
              )}

              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="inline-flex items-center gap-3 bg-gold text-forest text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 hover:bg-gold-light transition-colors duration-300"
                >
                  Napište nám →
                </a>
              )}
            </div>

            {/* Pravý sloupec: mapa */}
            <div className="h-72 sm:h-96 lg:h-auto relative overflow-hidden lg:pl-0">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=18.255%2C49.930%2C18.315%2C49.960&layer=mapnik&marker=49.9427%2C18.2809"
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full grayscale opacity-80"
                style={{ border: 0 }}
                loading="lazy"
                title="Mapa – JK Šilheřovice"
              />
            </div>

          </div>
        </div>
      </section>

    </>
  );
}
