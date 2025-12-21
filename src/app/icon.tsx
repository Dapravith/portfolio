import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
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
          borderRadius: '10px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Inter, Arial, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '3px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6 50%, #ec4899)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '7px',
            borderRadius: '6px',
            background: 'rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '-0.5px',
            textShadow: '0 2px 8px rgba(0,0,0,0.35)',
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
