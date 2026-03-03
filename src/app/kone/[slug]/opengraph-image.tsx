import { ImageResponse } from 'next/og'
import { client } from '@/sanity/lib/client'
import { horseBySlugQuery } from '@/sanity/lib/queries'
import { HorseBySlugQueryResult } from '@/../sanity.types'
import { urlFor } from '@/sanity/lib/image'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const horse = await client.fetch<HorseBySlugQueryResult>(horseBySlugQuery, { slug })

  const imageUrl = horse?.mainImage
    ? urlFor(horse.mainImage).width(1200).height(630).fit('crop').url()
    : null

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: '#243323',
          position: 'relative',
        }}
      >
        {/* Horse photo */}
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt=""
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: '55%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: imageUrl
              ? 'linear-gradient(to right, rgba(36,51,35,1) 40%, rgba(36,51,35,0.4) 100%)'
              : 'none',
          }}
        />

        {/* Text content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '64px',
            width: imageUrl ? '60%' : '100%',
          }}
        >
          <div style={{ display: 'flex', marginBottom: 28 }}>
            <div style={{ width: 40, height: 2, background: '#B07D3A' }} />
          </div>

          <div
            style={{
              fontSize: 13,
              color: '#B07D3A',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: 16,
              fontFamily: 'serif',
            }}
          >
            JK Šilheřovice
          </div>

          <div
            style={{
              fontSize: 72,
              color: '#F6F1E7',
              fontWeight: 300,
              lineHeight: 1,
              fontFamily: 'serif',
              marginBottom: 16,
            }}
          >
            {horse?.name ?? 'Kůň'}
          </div>

          {horse?.breed && (
            <div
              style={{
                fontSize: 22,
                color: 'rgba(246,241,231,0.5)',
                fontFamily: 'serif',
                letterSpacing: '0.05em',
              }}
            >
              {horse.breed}
              {horse.birthYear ? ` · ${horse.birthYear}` : ''}
            </div>
          )}
        </div>
      </div>
    ),
    { ...size }
  )
}