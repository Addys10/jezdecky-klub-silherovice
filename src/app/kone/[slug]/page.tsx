import { client } from "@/sanity/lib/client";
import { horseBySlugQuery, horsesSlugsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const statusLabel: Record<string, { label: string; color: string }> = {
  active: { label: "Aktivní", color: "bg-green-100 text-green-800" },
  retired: { label: "V důchodu", color: "bg-stone-100 text-stone-600" },
  forSale: { label: "Na prodej", color: "bg-amber-100 text-amber-800" },
};

export async function generateStaticParams() {
  const slugs = await client.fetch(horsesSlugsQuery);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const horse = await client.fetch(horseBySlugQuery, { slug });
  if (!horse) return {};
  return { title: `${horse.name} | JK Šilheřovice` };
}

export default async function HorseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const horse = await client.fetch(horseBySlugQuery, { slug });

  if (!horse) notFound();

  const status = statusLabel[horse.status ?? "active"];

  return (
    <div>
      <Link href="/kone" className="text-sm text-stone-500 hover:text-stone-900 transition-colors mb-6 inline-block">
        ← Zpět na seznam koní
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Hlavní fotka */}
        <div className="aspect-[4/3] bg-stone-100 rounded-xl overflow-hidden relative">
          {horse.mainImage ? (
            <Image
              src={urlFor(horse.mainImage).width(800).height(600).fit("crop").url()}
              alt={horse.mainImage.alt ?? horse.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-stone-300 text-8xl">
              🐴
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{horse.name}</h1>
            {status && (
              <span className={`text-sm px-3 py-1 rounded-full font-medium ${status.color}`}>
                {status.label}
              </span>
            )}
          </div>

          <dl className="mt-4 space-y-2 text-sm">
            {horse.breed && (
              <div className="flex gap-2">
                <dt className="text-stone-500 w-28 shrink-0">Plemeno</dt>
                <dd className="font-medium">{horse.breed}</dd>
              </div>
            )}
            {horse.birthYear && (
              <div className="flex gap-2">
                <dt className="text-stone-500 w-28 shrink-0">Rok narození</dt>
                <dd className="font-medium">{horse.birthYear}</dd>
              </div>
            )}
          </dl>

          {horse.description && (
            <div className="prose prose-stone prose-sm mt-6">
              <PortableText value={horse.description} />
            </div>
          )}
        </div>
      </div>

      {/* Fotogalerie */}
      {horse.photos && horse.photos.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Fotogalerie</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {horse.photos.map((photo) => (
              <div key={photo._key} className="aspect-square rounded-lg overflow-hidden relative bg-stone-100">
                <Image
                  src={urlFor(photo).width(400).height(400).fit("crop").url()}
                  alt={photo.alt ?? horse.name}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Videa */}
      {horse.videos && horse.videos.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Videa</h2>
          <ul className="space-y-2">
            {horse.videos.map((video) => (
              <li key={video._key}>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-700 underline hover:text-stone-900"
                >
                  {video.title ?? video.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}