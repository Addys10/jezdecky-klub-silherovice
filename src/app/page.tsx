import { client } from "@/sanity/lib/client";
import { pageBySlugQuery } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

export default async function HomePage() {
  const page = await client.fetch(pageBySlugQuery, { slug: "uvod" });

  return (
    <div>
      {page?.body ? (
        <div className="prose prose-stone max-w-none mb-12">
          <PortableText value={page.body} />
        </div>
      ) : (
        <h1 className="text-3xl font-bold mb-4">Vítejte v Jezdeckém klubu Šilheřovice</h1>
      )}

      <Link
        href="/kone"
        className="inline-block bg-stone-900 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-stone-700 transition-colors"
      >
        Naši koně →
      </Link>
    </div>
  );
}