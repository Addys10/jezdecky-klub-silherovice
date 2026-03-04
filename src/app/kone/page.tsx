import { sanityFetch } from "@/sanity/lib/fetch";
import { horsesQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { HorsesQueryResult } from "@/../sanity.types";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = {
  title: "Naši koně",
  description: "Poznejte koně Jezdeckého klubu Šilheřovice – česká warmblood i další plemena. Výuka jezdectví pro děti i dospělé.",
};

const statusConfig: Record<string, { label: string; className: string }> = {
  active:  { label: "Aktivní",    className: "border-gold/50 text-gold" },
  retired: { label: "V důchodu",  className: "border-cream/30 text-cream/50" },
  forSale: { label: "Na prodej",  className: "border-gold text-gold" },
};

export default async function KonePage() {
  const horses = await sanityFetch<HorsesQueryResult>(horsesQuery);

  return (
    <>
      <Breadcrumb crumbs={[{ label: "Domů", href: "/" }, { label: "Naši koně" }]} />

      {/* ── GRID ───────────────────────────────────────── */}
      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 lg:py-24">
          {horses.length === 0 ? (
            <p className="text-ink/40 text-sm tracking-wide">Zatím žádní koně.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-px sm:bg-ink/8">
              {horses.map((horse) => {
                const sc = statusConfig[horse.status ?? "active"] ?? statusConfig.active;
                return (
                  <Link
                    key={horse._id}
                    href={`/kone/${horse.slug?.current}`}
                    className="group bg-cream block overflow-hidden"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-forest/5">
                      {horse.mainImage ? (
                        <Image
                          src={urlFor(horse.mainImage).width(600).height(450).fit("crop").url()}
                          alt={horse.mainImage.alt ?? horse.name ?? ""}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-6xl opacity-10">🐴</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-forest/75 via-forest/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                        <div className="flex items-end justify-between gap-2">
                          <div>
                            <p className="font-heading text-cream text-xl sm:text-2xl font-light italic leading-tight">
                              {horse.name}
                            </p>
                            {horse.breed && (
                              <p className="text-cream/55 text-[10px] tracking-wider uppercase mt-0.5">
                                {horse.breed}
                              </p>
                            )}
                          </div>
                          {/* Status chip — vždy viditelný */}
                          <span className={`shrink-0 text-[9px] tracking-[0.18em] uppercase border px-2.5 py-1 ${sc.className}`}>
                            {sc.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

    </>
  );
}
