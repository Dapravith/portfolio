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
      <svg width={size.width} height={size.height} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" rx="40" fill="#0b1224" />
        <circle cx="100" cy="100" r="80" fill="url(#grad1)" />
        <text x="58" y="135" fontFamily="Arial, sans-serif" fontSize="88" fontWeight="700" fill="white">
          RD
        </text>
      </svg>
    ),
    {
      ...size,
    }
  );
}
