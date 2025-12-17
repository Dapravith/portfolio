import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

// Image generation
const logoUrl = new URL('../../public/logo.svg', import.meta.url);

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
          borderRadius: '40px',
        }}
      >
        <img
          src={logoUrl.toString()}
          width="120"
          height="120"
          alt="RD logo"
          style={{
            borderRadius: '30px',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
