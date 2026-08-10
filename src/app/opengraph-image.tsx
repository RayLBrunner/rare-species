import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'ORBIC - Oregon Rare Species Field Guide';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  try {
    // Load a real bold weight so fontWeight: 'bold' actually renders bold.
    // Swap this URL for a self-hosted font file if you'd rather not fetch
    // from Google Fonts at build/request time.
    const interBold = await fetch(
      new URL('https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff')
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 64,
            background: 'linear-gradient(to bottom right, #064e3b, #14532d)', // INR-themed green
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontFamily: 'Inter',
          }}
        >
          <div style={{ display: 'flex', marginBottom: 20 }}>
            {/* Fallback to text branding if logo asset isn't ready */}
            <span style={{ fontWeight: 700 }}>ORBIC</span>
          </div>
          <div style={{ fontSize: 48, textAlign: 'center', padding: '0 80px' }}>
            Oregon Rare Species Field Guide
          </div>
          <div style={{ fontSize: 24, marginTop: 40, opacity: 0.8 }}>
            Institute for Natural Resources | Portland State University
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: 'Inter',
            data: interBold,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  } catch (error) {
    console.error('Failed to generate OG image:', error);

    // Minimal fallback so a font-fetch failure doesn't 500 the route
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 64,
            background: '#14532d',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          ORBIC Field Guide
        </div>
      ),
      { ...size }
    );
  }
}
