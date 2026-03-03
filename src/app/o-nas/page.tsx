import { sanityFetch } from "@/sanity/lib/fetch";
import { pageBySlugQuery } from "@/sanity/lib/queries";
import { PageBySlugQueryResult } from "@/../sanity.types";
import { PortableText } from "@portabletext/react";

export const metadata = {
  title: "O nás",
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
      <section className="bg-forest text-cream pt-32 pb-16 sm:pt-36 sm:pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="w-8 h-px bg-gold mb-4 sm:mb-6" />
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-4">
            Jezdecký klub Šilheřovice
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light leading-tight">
            O <em>nás</em>
          </h1>
        </div>
      </section>

      {/* ── OBSAH ZE SANITY ────────────────────────────── */}
      {page?.body && (
        <section className="bg-cream">
          <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 items-start">
            <div className="lg:pt-2">
              <div className="w-8 h-px bg-gold mb-4 sm:mb-6" />
              <p className="text-xs tracking-[0.25em] uppercase text-gold font-medium">
                O klubu
              </p>
            </div>
            <div className="prose prose-stone prose-base sm:prose-lg max-w-none [&_h2]:font-heading [&_h2]:font-normal [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:text-ink [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-ink/75 [&_p]:leading-relaxed">
              <PortableText value={page.body} />
            </div>
          </div>
        </section>
      )}

      {/* ── HODNOTY ────────────────────────────────────── */}
      <section className="bg-cream border-t border-ink/8">
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-16">
            {values.map((item) => (
              <div key={item.title}>
                <div className="w-8 h-px bg-gold mb-4 sm:mb-6" />
                <h3 className="font-heading text-xl sm:text-2xl font-light italic text-ink mb-3">
                  {item.title}
                </h3>
                <p className="text-ink/60 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="bg-forest text-cream">
        <div className="max-w-6xl mx-auto px-6 py-12 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="w-8 h-px bg-gold mb-4" />
            <p className="font-heading text-xl sm:text-2xl font-light">
              Přijďte nás <em>navštívit</em>
            </p>
          </div>
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
