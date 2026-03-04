import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { galleryQuery } from "@/sanity/lib/queries";
import { GalleryQueryResult } from "@/../sanity.types";
import { urlFor } from "@/sanity/lib/image";
import GalleryMasonry from "@/components/GalleryMasonry";
import Breadcrumb from "@/components/Breadcrumb";

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
      <Breadcrumb crumbs={[{ label: "Domů", href: "/" }, { label: "Galerie" }]} />

      {/* ── FOTKY ─────────────────────────────────────────── */}
      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 lg:py-24">
          {allPhotos.length === 0 ? (
            <p className="text-ink/40 text-sm">Galerie zatím neobsahuje žádné fotografie.</p>
          ) : (
            <GalleryMasonry
              photos={allPhotos.map((photo) => ({
                key: photo._key,
                thumbUrl: urlFor(photo).width(600).auto("format").url(),
                fullUrl: urlFor(photo).width(1600).auto("format").url(),
                alt: photo.alt ?? photo.horseName ?? "",
                horseName: photo.horseName,
                horseSlug: photo.horseSlug,
              }))}
            />
          )}
        </div>
      </section>
    </>
  );
}
