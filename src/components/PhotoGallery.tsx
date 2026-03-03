'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

type Photo = {
  key: string
  thumbUrl: string
  fullUrl: string
  alt: string
}

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
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

  // Zamknout scroll při otevřeném lightboxu
  useEffect(() => {
    document.body.style.overflow = current !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [current])

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-px sm:bg-ink/8">
        {photos.map((photo, i) => (
          <button
            key={photo.key}
            onClick={() => setCurrent(i)}
            className="aspect-square relative overflow-hidden bg-forest/5 sm:bg-cream group cursor-zoom-in"
          >
            <Image
              src={photo.thumbUrl}
              alt={photo.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </button>
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

          {/* Počítadlo */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-cream/30 text-[10px] tracking-[0.3em] uppercase">
            {current + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  )
}
