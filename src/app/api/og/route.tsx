import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

// Social preview card. Uses the same palette as the site; Latin text only,
// because the default OG font has no Khmer glyphs.
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#f6f4ef',
          color: '#1b1a17',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 2, color: '#4f4c45', fontFamily: 'monospace' }}>
          FULL-STACK DEVELOPER · PHNOM PENH
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>Rotha Dapravith</div>
          <div style={{ marginTop: 28, fontSize: 36, color: '#4f4c45', maxWidth: 940, lineHeight: 1.35 }}>
            Spring Boot APIs, Keycloak single sign-on and CI/CD pipelines.
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 26, fontFamily: 'monospace' }}>
          <div style={{ width: 48, height: 4, background: '#9c3812', marginRight: 20 }} />
          dapravith.vercel.app
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
