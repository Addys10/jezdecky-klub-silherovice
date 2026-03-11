'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Lightbox from './Lightbox'

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

  const lightboxPhotos = photos.map(p => ({
    fullUrl: p.fullUrl,
    alt: p.alt,
    label: p.horseName,
  }))

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

      <Lightbox photos={lightboxPhotos} current={current} onClose={close} onPrev={prev} onNext={next} />
    </>
  )
}