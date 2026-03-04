import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="bg-cream pt-24 sm:pt-28 pb-6 sm:pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <ol className="flex items-center gap-2.5">
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={i} className="flex items-center gap-2.5">
                {i > 0 && (
                  <span className="text-ink/20 text-xs">/</span>
                )}
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="text-xs tracking-[0.15em] uppercase text-ink/35 hover:text-ink/60 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-xs tracking-[0.15em] uppercase text-ink/75">
                    {crumb.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
