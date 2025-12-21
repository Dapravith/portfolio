import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0b1224',
          borderRadius: '36px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Inter, Arial, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '12px',
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6 50%, #ec4899)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '24px',
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '72px',
            fontWeight: 700,
            letterSpacing: '-2px',
            textShadow: '0 6px 28px rgba(0,0,0,0.45)',
          }}
        >
          RD
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
