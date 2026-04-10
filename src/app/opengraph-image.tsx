import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'HacKit 2026 | 繋がる、創る、超えていく。';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #FF6B35 0%, #FF6B6B 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Main title */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: 'white',
            letterSpacing: '-2px',
          }}
        >
          HacKit 2026
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            color: 'rgba(255,255,255,0.9)',
            marginTop: 16,
            letterSpacing: '8px',
          }}
        >
          繋がる、創る、超えていく。
        </div>

        {/* Event info */}
        <div
          style={{
            fontSize: 28,
            color: 'rgba(255,255,255,0.75)',
            marginTop: 40,
          }}
        >
          2026.08.01 - 03 ｜ 金沢工業大学
        </div>

        {/* Organization */}
        <div
          style={{
            fontSize: 22,
            color: 'rgba(255,255,255,0.6)',
            marginTop: 24,
            position: 'absolute',
            bottom: 40,
          }}
        >
          KIT Developers Hub
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
