import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: '#243323',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '64px',
        }}
      >
        {/* Gold top accent line */}
        <div style={{ display: 'flex', marginBottom: '40px' }}>
          <div style={{ width: 48, height: 2, background: '#B07D3A' }} />
        </div>

        {/* Label */}
        <div
          style={{
            fontSize: 14,
            color: '#B07D3A',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: 20,
            fontFamily: 'serif',
          }}
        >
          Šilheřovice — od roku 2005
        </div>

        {/* Main heading */}
        <div
          style={{
            fontSize: 80,
            color: '#F6F1E7',
            fontWeight: 300,
            lineHeight: 1,
            fontFamily: 'serif',
            marginBottom: 20,
          }}
        >
          Jezdecký klub
        </div>
        <div
          style={{
            fontSize: 48,
            color: 'rgba(246,241,231,0.5)',
            fontWeight: 300,
            letterSpacing: '0.1em',
            fontFamily: 'serif',
          }}
        >
          Šilheřovice
        </div>

        {/* Right decorative element */}
        <div
          style={{
            position: 'absolute',
            right: 64,
            top: 64,
            bottom: 64,
            width: 1,
            background: 'rgba(176,125,58,0.3)',
          }}
        />
      </div>
    ),
    { ...size }
  )
}