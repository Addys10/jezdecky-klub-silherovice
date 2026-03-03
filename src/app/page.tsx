import { sanityFetch } from "@/sanity/lib/fetch";
import { featuredHorsesQuery, pageBySlugQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { HorsesQueryResult, SiteSettingsQueryResult, PageBySlugQueryResult } from "@/../sanity.types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const [page, horses, settings] = await Promise.all([
    sanityFetch<PageBySlugQueryResult>(pageBySlugQuery, { slug: "uvod" }),
    sanityFetch<HorsesQueryResult>(featuredHorsesQuery),
    sanityFetch<SiteSettingsQueryResult>(siteSettingsQuery),
  ]);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">

        {settings?.heroImage ? (
          <Image
            src={urlFor(settings.heroImage).width(1920).height(1080).fit("crop").auto("format").url()}
            alt={settings.heroImage.alt ?? "Kůň jezdeckého klubu Šilheřovice"}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        ) : (
          <Image
            src="/hero-horse2.jpg"
            alt="Kůň jezdeckého klubu Šilheřovice"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        )}

        {/* Tmavý overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Zlatá linka vlevo — skrytá na mobilu */}
        <div className="absolute left-6 top-32 bottom-20 w-px bg-gold/40" />

        {/* Tagline + nadpis — nahoře vlevo vždy */}
        <div className="relative pl-12 pr-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 lg:pt-32 max-w-3xl">
          <p className="text-gold text-[10px] sm:text-xs font-semibold sm:font-normal tracking-[0.3em] uppercase mb-4 sm:mb-6 sm:ml-1">
            Šilheřovice — od roku 2005
          </p>

          <h1 className="font-heading text-cream leading-[0.92]">
            <span className="block text-[clamp(2.5rem,9vw,9rem)] font-light italic">
              Jezdecký
            </span>
            <span className="block text-[clamp(2.5rem,9vw,9rem)] font-bold sm:pl-[clamp(1.5rem,6vw,7rem)]">
              klub
            </span>
            <span className="block text-[clamp(1.4rem,4vw,4.5rem)] font-light tracking-wide text-cream/60 sm:pl-[clamp(0.75rem,2.5vw,2.5rem)] mt-1 sm:mt-2">
              Šilheřovice
            </span>
          </h1>
        </div>

        {/* CTA — dole vždy */}
        <div className="relative mt-auto pl-12 pr-6 sm:px-10 lg:px-16 pt-8 pb-16 sm:pb-10 lg:pb-14 sm:max-w-3xl">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
            <Link
              href="/kone"
              className="group inline-flex items-center gap-3 bg-gold text-forest text-xs font-semibold tracking-[0.2em] uppercase px-10 py-5 hover:bg-gold-light transition-colors duration-300"
            >
              Naši koně
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
            <Link
              href="/kontakt"
              className="text-cream/50 text-xs tracking-[0.2em] uppercase hover:text-cream/90 transition-colors duration-300"
            >
              Kontakt
            </Link>
          </div>
        </div>

      </section>

      {/* ── INTRO ─────────────────────────────────────────── */}
      {page?.body && (
        <section className="bg-cream border-t border-ink/8">
          <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] lg:items-start">
              {/* Levý sloupec — nadpis */}
              <div className="lg:sticky lg:top-28 lg:border-r lg:border-ink/8 lg:pr-16 pb-10 lg:pb-0">
                <h2 className="font-heading font-light text-ink text-[clamp(3rem,5.5vw,5rem)] leading-[0.92]">
                  O <em>klubu</em>
                </h2>
              </div>
              {/* Pravý sloupec — obsah */}
              <div className="lg:pl-16 prose prose-stone prose-base sm:prose-lg max-w-none [&_h2]:font-heading [&_h2]:font-normal [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:text-ink [&_p]:text-ink/65 [&>p:first-child]:text-lg [&>p:first-child]:text-ink/80">
                <PortableText value={page.body} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── KONĚ ──────────────────────────────────────────── */}
      {horses.length > 0 && (
        <section className="bg-cream border-t border-ink/8">
          <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 lg:py-24">

            <div className="flex items-end justify-between mb-10 sm:mb-14">
              <div>
                <h2 className="font-heading text-3xl sm:text-4xl font-light text-ink">
                  Naši <em>koně</em>
                </h2>
              </div>
              <Link
                href="/kone"
                className="text-xs tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors hidden sm:block"
              >
                Všichni koně →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-px sm:bg-ink/8">
              {horses.map((horse) => (
                <Link
                  key={horse._id}
                  href={`/kone/${horse.slug?.current}`}
                  className="group bg-cream block overflow-hidden"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-stone-100">
                    {horse.mainImage ? (
                      <Image
                        src={urlFor(horse.mainImage).width(600).height(450).fit("crop").url()}
                        alt={horse.name ?? ""}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-forest/5 flex items-center justify-center">
                        <span className="text-6xl opacity-20">🐴</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                      <p className="font-heading text-cream text-lg sm:text-xl font-light italic">
                        {horse.name}
                      </p>
                      {horse.breed && (
                        <p className="text-cream/60 text-xs tracking-wider mt-0.5">
                          {horse.breed}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 sm:hidden">
              <Link
                href="/kone"
                className="text-xs tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors"
              >
                Všichni koně →
              </Link>
            </div>
          </div>
        </section>
      )}

    </>
  );
}