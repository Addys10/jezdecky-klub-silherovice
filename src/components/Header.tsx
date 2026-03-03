'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const links = [
  { href: '/kone', label: 'Koně' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/o-nas', label: 'O nás' },
  { href: '/kontakt', label: 'Kontakt' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="absolute top-0 left-0 right-0 z-20">

      {/* ── HLAVNÍ LIŠTA ─────────────────────────────── */}
      <nav className="max-w-6xl mx-auto px-6 py-5 sm:py-6 flex items-center justify-between gap-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 shrink-0 group"
        >
          <Image
            src="/logo-jks.png"
            alt="Logo JK Šilheřovice"
            width={20}
            height={30}
            className="object-contain invert mix-blend-screen opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <span className="font-heading text-xs sm:text-sm tracking-[0.2em] uppercase text-cream/90 group-hover:text-cream transition-colors">
            JK Šilheřovice
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden sm:flex gap-4 sm:gap-8 text-[10px] sm:text-xs tracking-[0.15em] uppercase text-cream/70">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-cream transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger — pouze mobil */}
        <button
          className="sm:hidden flex flex-col justify-center gap-[5px] w-6 h-6 shrink-0 text-cream/80 hover:text-cream transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Zavřít menu' : 'Otevřít menu'}
          aria-expanded={open}
        >
          <span className={`block h-px bg-current transition-all duration-300 origin-center ${open ? 'translate-y-[7px] rotate-45' : 'w-full'}`} />
          <span className={`block h-px bg-current transition-all duration-200 ${open ? 'opacity-0 w-0' : 'w-full'}`} />
          <span className={`block h-px bg-current transition-all duration-300 origin-center ${open ? '-translate-y-[7px] -rotate-45' : 'w-4'}`} />
        </button>
      </nav>

      {/* ── MOBILNÍ MENU ─────────────────────────────── */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="bg-forest/96 backdrop-blur-md border-t border-cream/10 px-6 py-7 flex flex-col gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-cream/70 hover:text-cream transition-colors"
              >
                <span className="w-4 h-px bg-gold/50" />
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </header>
  )
}
