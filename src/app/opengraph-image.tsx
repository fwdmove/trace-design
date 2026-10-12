import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export const alt = 'Trace Design: websites that don’t blend in'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#0f0f0e',
          color: '#efede8',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, letterSpacing: 4, textTransform: 'uppercase', color: '#8f8b84' }}>
          Trace Design — Independent web studio
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 120, fontWeight: 700, lineHeight: 0.95, letterSpacing: -5 }}>
          <span>Websites that</span>
          <span style={{ display: 'flex' }}>
            don’t blend in<span style={{ color: '#ff4a1c' }}>.</span>
          </span>
        </div>
      </div>
    ),
    size,
  )
}
