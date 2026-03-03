import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { galleryQuery } from "@/sanity/lib/queries";
import { GalleryQueryResult } from "@/../sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Fotogalerie koní Jezdeckého klubu Šilheřovice.",
};

export default async function GaleriePage() {
  const horses = await sanityFetch<GalleryQueryResult>(galleryQuery);

  const allPhotos = horses.flatMap((horse) =>
    (horse.photos ?? []).map((photo) => ({ ...photo, horseName: horse.name, horseSlug: horse.slug }))
  );

  return (
    <>
      {/* ── SUBHERO ───────────────────────────────────────── */}
      <section className="bg-forest text-cream pt-32 pb-16 sm:pt-36 sm:pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="w-8 h-px bg-gold mb-4 sm:mb-6" />
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-3">
            Jezdecký klub Šilheřovice
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light">
            <em>Galerie</em>
          </h1>
        </div>
      </section>

      {/* ── FOTKY ─────────────────────────────────────────── */}
      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 lg:py-24">
          {allPhotos.length === 0 ? (
            <p className="text-ink/40 text-sm">Galerie zatím neobsahuje žádné fotografie.</p>
          ) : (
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
              {allPhotos.map((photo) => (
                <div key={photo._key} className="break-inside-avoid mb-3 group relative overflow-hidden bg-forest/5">
                  <Image
                    src={urlFor(photo).width(600).auto("format").url()}
                    alt={photo.alt ?? photo.horseName ?? ""}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {photo.horseName && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-forest/70 to-transparent px-3 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <Link
                        href={`/kone/${photo.horseSlug}`}
                        className="text-cream/90 text-xs tracking-wider font-heading italic hover:text-gold transition-colors"
                      >
                        {photo.horseName}
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
