import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="bg-forest text-cream min-h-screen flex flex-col justify-center relative overflow-hidden">

      {/* Dekorativní velké číslo */}
      <p
        aria-hidden
        className="absolute inset-0 flex items-center justify-center font-heading font-light italic text-cream/[0.04] select-none leading-none pointer-events-none"
        style={{ fontSize: 'clamp(12rem, 40vw, 36rem)' }}
      >
        404
      </p>

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="w-8 h-px bg-gold mb-6" />
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-4">
          Chyba 404
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-6">
          Stránka<br /><em>nenalezena</em>
        </h1>
        <p className="text-cream/50 text-sm leading-relaxed mb-10 max-w-sm">
          Tato stránka neexistuje nebo byla přesunuta.
          Vraťte se na úvodní stránku.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-gold text-forest text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 hover:bg-gold-light transition-colors duration-300"
          >
            Zpět domů →
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex items-center border border-cream/20 text-cream/60 text-xs tracking-[0.2em] uppercase px-8 py-4 hover:border-cream/50 hover:text-cream transition-colors duration-300"
          >
            Kontakt
          </Link>
        </div>
      </div>

    </section>
  )
}
