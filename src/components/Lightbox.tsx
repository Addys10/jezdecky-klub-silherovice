'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'

type LightboxPhoto = {
  fullUrl: string
  alt: string
  label?: string | null
}

type Props = {
  photos: LightboxPhoto[]
  current: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({ photos, current, onClose, onPrev, onNext }: Props) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onPrev()
    if (e.key === 'ArrowRight') onNext()
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    if (current === null) return
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [current, handleKey])

  useEffect(() => {
    document.body.style.overflow = current !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [current])

  if (current === null) return null

  return (
    <div className="fixed inset-0 z-50 bg-ink/96 flex items-center justify-center" onClick={onClose}>
      <button
        className="absolute top-5 right-5 text-cream/50 hover:text-cream transition-colors w-10 h-10 flex items-center justify-center text-2xl leading-none"
        onClick={onClose}
        aria-label="Zavřít"
      >
        ×
      </button>

      {photos.length > 1 && (
        <button
          className="absolute left-4 sm:left-6 text-cream/50 hover:text-cream transition-colors text-2xl w-10 h-10 flex items-center justify-center"
          onClick={e => { e.stopPropagation(); onPrev() }}
          aria-label="Předchozí"
        >
          ←
        </button>
      )}

      <div className="relative w-full h-full mx-16 sm:mx-20" onClick={e => e.stopPropagation()}>
        <Image
          src={photos[current].fullUrl}
          alt={photos[current].alt}
          fill
          className="object-contain"
          sizes="90vw"
        />
      </div>

      {photos.length > 1 && (
        <button
          className="absolute right-4 sm:right-6 text-cream/50 hover:text-cream transition-colors text-2xl w-10 h-10 flex items-center justify-center"
          onClick={e => { e.stopPropagation(); onNext() }}
          aria-label="Další"
        >
          →
        </button>
      )}

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        {photos[current].label && (
          <span className="text-cream/60 text-xs font-heading italic">{photos[current].label}</span>
        )}
        <span className="text-cream/30 text-[10px] tracking-[0.3em] uppercase">
          {current + 1} / {photos.length}
        </span>
      </div>
    </div>
  )
}