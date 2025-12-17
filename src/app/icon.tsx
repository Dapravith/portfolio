import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
const logoUrl = new URL('../../public/logo.svg', import.meta.url);

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
          borderRadius: '8px',
        }}
      >
        <img
          src={logoUrl.toString()}
          width="26"
          height="26"
          alt="RD logo"
          style={{
            borderRadius: '6px',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
