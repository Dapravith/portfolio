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
      <svg width={size.width} height={size.height} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" rx="36" fill="#0b1224" />
        <circle cx="100" cy="100" r="82" fill="url(#grad1)" />
        <text x="50" y="135" fontFamily="Arial, sans-serif" fontSize="96" fontWeight="700" fill="white">
          RD
        </text>
      </svg>
    ),
    {
      ...size,
    }
  );
}
