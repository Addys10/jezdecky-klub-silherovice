import { sanityFetch } from "@/sanity/lib/fetch";
import { pageBySlugQuery } from "@/sanity/lib/queries";
import { PageBySlugQueryResult } from "@/../sanity.types";
import { PortableText } from "@portabletext/react";

export const metadata = {
  title: "O nás",
  description: "Jezdecký klub Šilheřovice funguje od roku 2005. Výuka jezdectví pro děti i dospělé v příjemném prostředí u Opavy.",
};

const values = [
  {
    title: "Tradice",
    text: "Fungujeme od roku 2005. Dvě dekády zkušeností v jezdectví nás formovaly v klub, kde se propojuje respekt k tradicím s moderním přístupem k tréninku.",
  },
  {
    title: "Příroda",
    text: "Naše stáje leží u lesa v srdci Šilheřovic. Koně žijí v přirozených podmínkách a vyjížďky do přírody jsou součástí každodenního programu.",
  },
  {
    title: "Komunita",
    text: "Jezdectví nás spojuje. Vytváříme přátelskou komunitu, kde jsou vítáni začátečníci i zkušení jezdci, děti i dospělí.",
  },
];

export default async function ONasPage() {
  const page = await sanityFetch<PageBySlugQueryResult>(pageBySlugQuery, { slug: "o-nas" });

  return (
    <>
      {/* ── SUBHERO ────────────────────────────────────── */}
      <section className="bg-cream pt-28 pb-10 sm:pt-32 sm:pb-12 border-b border-ink/8">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light leading-tight text-ink">
            O <em>nás</em>
          </h1>
        </div>
      </section>

      {/* ── OBSAH ZE SANITY ────────────────────────────── */}
      {page?.body && (
        <section className="bg-cream">
          <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-20 items-start">
              <div className="lg:sticky lg:top-28 select-none" aria-hidden>
                <span className="font-heading font-light text-ink/[0.05] leading-[0.85] text-[clamp(6rem,14vw,11rem)]">
                  2005
                </span>
              </div>
              <div className="prose prose-stone prose-base sm:prose-lg max-w-none [&_p]:text-ink/65 [&_p]:leading-relaxed [&_h2]:font-heading [&_h2]:font-light [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:text-ink [&_h2]:mt-10 [&_h2]:mb-3 [&>p:first-child]:text-lg sm:[&>p:first-child]:text-xl [&>p:first-child]:text-ink/80">
                <PortableText value={page.body} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── HODNOTY ────────────────────────────────────── */}
      <section className="bg-cream border-t border-ink/8">
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-12">
            {values.map((item, i) => (
              <div key={item.title}>
                <span className="font-heading text-6xl sm:text-7xl font-light text-ink/[0.06] leading-none block mb-5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-light italic text-ink mb-3">
                  {item.title}
                </h3>
                <p className="text-ink/55 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="bg-forest text-cream">
        <div className="max-w-6xl mx-auto px-6 py-12 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="font-heading text-xl sm:text-2xl font-light">
            Přijďte nás <em>navštívit</em>
          </p>
          <a
            href="/kontakt"
            className="shrink-0 inline-flex items-center gap-3 bg-gold text-forest text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 hover:bg-gold-light transition-colors duration-300"
          >
            Kontakt
            <span>→</span>
          </a>
        </div>
      </section>
    </>
  );
}
