'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type GalleryPhoto = {
  key: string
  thumbUrl: string
  fullUrl: string
  alt: string
  horseName?: string | null
  horseSlug?: string | null
}

export default function GalleryMasonry({ photos }: { photos: GalleryPhoto[] }) {
  const [current, setCurrent] = useState<number | null>(null)

  const close = useCallback(() => setCurrent(null), [])
  const prev = useCallback(() => setCurrent(i => i !== null ? (i - 1 + photos.length) % photos.length : null), [photos.length])
  const next = useCallback(() => setCurrent(i => i !== null ? (i + 1) % photos.length : null), [photos.length])

  useEffect(() => {
    if (current === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [current, close, prev, next])

  useEffect(() => {
    document.body.style.overflow = current !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [current])

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {photos.map((photo, i) => (
          <div key={photo.key} className="aspect-square group relative overflow-hidden bg-forest/5 cursor-zoom-in" onClick={() => setCurrent(i)}>
            <Image
              src={photo.thumbUrl}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {photo.horseName && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-forest/70 to-transparent px-3 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <Link
                  href={`/kone/${photo.horseSlug}`}
                  className="text-cream/90 text-xs tracking-wider font-heading italic hover:text-gold transition-colors"
                  onClick={e => e.stopPropagation()}
                >
                  {photo.horseName}
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {current !== null && (
        <div
          className="fixed inset-0 z-50 bg-ink/96 flex items-center justify-center"
          onClick={close}
        >
          {/* Zavřít */}
          <button
            className="absolute top-5 right-5 text-cream/50 hover:text-cream transition-colors w-10 h-10 flex items-center justify-center text-2xl leading-none"
            onClick={close}
            aria-label="Zavřít"
          >
            ×
          </button>

          {/* Předchozí */}
          {photos.length > 1 && (
            <button
              className="absolute left-4 sm:left-6 text-cream/50 hover:text-cream transition-colors text-2xl w-10 h-10 flex items-center justify-center"
              onClick={e => { e.stopPropagation(); prev() }}
              aria-label="Předchozí"
            >
              ←
            </button>
          )}

          {/* Obrázek */}
          <div
            className="relative w-full h-full mx-16 sm:mx-20"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={photos[current].fullUrl}
              alt={photos[current].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {/* Další */}
          {photos.length > 1 && (
            <button
              className="absolute right-4 sm:right-6 text-cream/50 hover:text-cream transition-colors text-2xl w-10 h-10 flex items-center justify-center"
              onClick={e => { e.stopPropagation(); next() }}
              aria-label="Další"
            >
              →
            </button>
          )}

          {/* Jméno koně + counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
            {photos[current].horseName && (
              <span className="text-cream/60 text-xs font-heading italic">{photos[current].horseName}</span>
            )}
            <span className="text-cream/30 text-[10px] tracking-[0.3em] uppercase">
              {current + 1} / {photos.length}
            </span>
          </div>
        </div>
      )}
    </>
  )
}
