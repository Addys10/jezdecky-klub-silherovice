import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/fetch";
import { horseBySlugQuery, horsesSlugsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { HorseBySlugQueryResult, HorsesSlugsQueryResult } from "@/../sanity.types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PhotoGallery from "@/components/PhotoGallery";

const statusLabel: Record<string, string> = {
  active: "Aktivní",
  retired: "V důchodu",
  forSale: "Na prodej",
};

export async function generateStaticParams() {
  const slugs = await client.fetch<HorsesSlugsQueryResult>(horsesSlugsQuery);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const horse = await client.fetch<HorseBySlugQueryResult>(horseBySlugQuery, { slug });
  if (!horse) return {};
  return { title: horse.name ?? "Kůň" };
}

export default async function HorseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const horse = await sanityFetch<HorseBySlugQueryResult>(horseBySlugQuery, { slug });

  if (!horse) notFound();

  const hasPedigree = horse.sire || horse.dam;
  const hasMilestones = horse.milestones && horse.milestones.length > 0;

  return (
    <>
      {/* ── SUBHERO ────────────────────────────────────── */}
      <section className="bg-cream pt-28 pb-10 sm:pt-32 sm:pb-12 border-b border-ink/8">
        <div className="max-w-6xl mx-auto px-6">
          <Link
            href="/kone"
            className="inline-block text-[10px] tracking-[0.25em] uppercase text-ink/40 hover:text-ink/70 transition-colors mb-6"
          >
            ← Všichni koně
          </Link>
          <div className="flex items-end flex-wrap gap-4">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light text-ink">
              <em>{horse.name}</em>
            </h1>
            {horse.status && (
              <span className="mb-1 text-[9px] tracking-[0.2em] uppercase border border-gold/40 text-gold px-3 py-1.5">
                {statusLabel[horse.status] ?? horse.status}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── HLAVNÍ OBSAH ───────────────────────────────── */}
      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16 items-start">

            {/* Levý sloupec: foto + rodokmen + timeline */}
            <div className="space-y-12">

              {/* Foto */}
              <div className="aspect-[4/3] relative overflow-hidden bg-forest/5">
                {horse.mainImage ? (
                  <Image
                    src={urlFor(horse.mainImage).width(900).height(675).fit("crop").url()}
                    alt={horse.mainImage.alt ?? horse.name ?? ""}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl opacity-10">🐴</span>
                  </div>
                )}
              </div>

              {/* Rodokmen */}
              {hasPedigree && (
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-light text-ink mb-10">
                    <em>Rodokmen</em>
                  </h2>
                  <div className="relative">
                    <div className="grid grid-cols-2 gap-4">
                      {horse.sire && (
                        <div className="border border-ink/10 p-4 bg-forest/3">
                          <p className="text-[9px] tracking-[0.2em] uppercase text-gold mb-1">Otec</p>
                          <p className="font-heading text-lg font-light italic text-ink">{horse.sire}</p>
                        </div>
                      )}
                      {horse.dam && (
                        <div className="border border-ink/10 p-4 bg-forest/3">
                          <p className="text-[9px] tracking-[0.2em] uppercase text-gold mb-1">Matka</p>
                          <p className="font-heading text-lg font-light italic text-ink">{horse.dam}</p>
                        </div>
                      )}
                    </div>
                    <div className="relative w-full h-10">
                      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gold/30" />
                      <div className="absolute top-0 left-1/2 w-px h-full bg-gold/30 -translate-x-1/2" />
                    </div>
                    <div className="border border-gold/40 p-5 bg-forest text-cream text-center">
                      <p className="text-[9px] tracking-[0.2em] uppercase text-gold/70 mb-2">Kůň</p>
                      <p className="font-heading text-2xl font-light italic">{horse.name}</p>
                      {horse.breed && (
                        <p className="text-cream/50 text-xs tracking-wider mt-1">{horse.breed} · {horse.birthYear}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Životopis */}
              {hasMilestones && (
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-light text-ink mb-10">
                    <em>Životopis</em>
                  </h2>
                  <ol className="relative space-y-0">
                    <div className="absolute left-[3.25rem] top-2 bottom-2 w-px bg-gold/20" />
                    {horse.milestones!.map((m, i) => (
                      <li key={m._key ?? i} className="relative flex gap-6 pb-8 last:pb-0">
                        <div className="w-10 shrink-0 text-right">
                          <span className="font-heading text-sm font-light italic text-gold/80 leading-none">
                            {m.year}
                          </span>
                        </div>
                        <div className="relative flex flex-col items-center shrink-0 mt-[3px]">
                          <div className="w-2 h-2 rounded-full bg-gold" />
                        </div>
                        <div>
                          <p className="text-ink/70 text-sm leading-relaxed">{m.event}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

            </div>

            {/* Pravý sloupec: info */}
            <div className="lg:pt-4 space-y-8">
              <dl className="space-y-5">
                {horse.breed && (
                  <div>
                    <dt className="text-[10px] tracking-[0.25em] uppercase text-gold mb-1">Plemeno</dt>
                    <dd className="text-ink font-medium">{horse.breed}</dd>
                  </div>
                )}
                {horse.birthYear && (
                  <div>
                    <dt className="text-[10px] tracking-[0.25em] uppercase text-gold mb-1">Narozena</dt>
                    <dd className="text-ink font-medium">
                      {horse.birthYear}{' '}
                      <span className="text-ink/40 font-normal">({new Date().getFullYear() - horse.birthYear} let)</span>
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-[10px] tracking-[0.25em] uppercase text-gold mb-1">Status</dt>
                  <dd className="text-ink font-medium">
                    {statusLabel[horse.status ?? "active"] ?? "—"}
                  </dd>
                </div>
              </dl>

              {horse.description && (
                <div className="pt-4 border-t border-ink/8">
                  <div className="prose prose-stone prose-sm sm:prose-base max-w-none [&_h2]:font-heading [&_h2]:font-light [&_h2]:text-xl [&_h2]:text-ink [&_h2]:mt-6 [&_h2]:mb-2 [&_p]:text-ink/70 [&_p]:leading-relaxed">
                    <PortableText value={horse.description} />
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── FOTOGALERIE + VIDEA ────────────────────────── */}
      {((horse.photos && horse.photos.length > 0) || (horse.videos && horse.videos.length > 0)) && (
        <section className="bg-cream border-t border-ink/8">
          <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 space-y-16">

            {horse.photos && horse.photos.length > 0 && (
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-light text-ink mb-8 sm:mb-12">
                  Fotogalerie
                </h2>
                <PhotoGallery
                  photos={horse.photos.map((photo) => ({
                    key: photo._key,
                    thumbUrl: urlFor(photo).width(500).height(500).fit("crop").url(),
                    fullUrl: urlFor(photo).width(1600).height(1200).fit("max").url(),
                    alt: photo.alt ?? horse.name ?? "",
                  }))}
                />
              </div>
            )}

            {horse.videos && horse.videos.length > 0 && (
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-light text-ink mb-8 sm:mb-12">
                  <em>Videa</em>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {horse.videos.map((video) => {
                    const id = video.url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)?.[1];
                    return id ? (
                      <div key={video._key} className="aspect-video">
                        <iframe
                          src={`https://www.youtube.com/embed/${id}`}
                          title={video.title ?? "Video"}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

          </div>
        </section>
      )}
    </>
  );
}
