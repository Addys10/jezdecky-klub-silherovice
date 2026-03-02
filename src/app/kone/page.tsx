import { client } from "@/sanity/lib/client";
import { horsesQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

const statusLabel: Record<string, { label: string; color: string }> = {
  active: { label: "Aktivní", color: "bg-green-100 text-green-800" },
  retired: { label: "V důchodu", color: "bg-stone-100 text-stone-600" },
  forSale: { label: "Na prodej", color: "bg-amber-100 text-amber-800" },
};

export const metadata = {
  title: "Naši koně | JK Šilheřovice",
};

export default async function KonePage() {
  const horses = await client.fetch(horsesQuery);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Naši koně</h1>

      {horses.length === 0 ? (
        <p className="text-stone-500">Zatím žádní koně.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {horses.map((horse) => {
            const status = statusLabel[horse.status ?? "active"];
            return (
              <Link
                key={horse._id}
                href={`/kone/${horse.slug?.current}`}
                className="group block bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/3] bg-stone-100 relative">
                  {horse.mainImage ? (
                    <Image
                      src={urlFor(horse.mainImage).width(400).height(300).fit("crop").url()}
                      alt={horse.mainImage.alt ?? horse.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-stone-300 text-5xl">
                      🐴
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h2 className="font-semibold text-lg">{horse.name}</h2>
                    {status && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${status.color}`}>
                        {status.label}
                      </span>
                    )}
                  </div>
                  {horse.breed && (
                    <p className="text-sm text-stone-500">{horse.breed}</p>
                  )}
                  {horse.birthYear && (
                    <p className="text-sm text-stone-400 mt-0.5">
                      nar. {horse.birthYear}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}