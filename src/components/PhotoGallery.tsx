'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'

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

      <Lightbox photos={photos} current={current} onClose={close} onPrev={prev} onNext={next} />
    </>
  )
}