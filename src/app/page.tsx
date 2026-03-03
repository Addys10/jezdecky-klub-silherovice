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
        <section className="bg-cream">
          <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 items-start">
            <div className="lg:pt-2">
              <div className="w-8 h-px bg-gold mb-4 sm:mb-6" />
              <p className="text-xs tracking-[0.25em] uppercase text-gold font-medium">
                O klubu
              </p>
            </div>
            <div className="prose prose-stone prose-base sm:prose-lg max-w-none [&_h2]:font-heading [&_h2]:font-normal [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:text-ink">
              <PortableText value={page.body} />
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
                <div className="w-8 h-px bg-gold mb-4 sm:mb-6" />
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
                  <div className="aspect-[4/3] sm:aspect-[3/4] relative overflow-hidden bg-stone-100">
                    {horse.mainImage ? (
                      <Image
                        src={urlFor(horse.mainImage).width(600).height(800).fit("crop").url()}
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

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="bg-forest text-cream">
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <div className="w-8 h-px bg-gold mb-4 sm:mb-6" />
            <h2 className="font-heading text-3xl sm:text-4xl font-light leading-tight">
              Začněte svou<br />
              <em>jezdeckou cestu</em>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center bg-gold text-forest text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 hover:bg-gold-light transition-colors duration-300"
            >
              Kontaktujte nás
            </Link>
            <Link
              href="/o-nas"
              className="inline-flex items-center justify-center border border-cream/20 text-cream/70 text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 hover:border-cream/50 hover:text-cream transition-colors duration-300"
            >
              O klubu
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}