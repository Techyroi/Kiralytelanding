import React from 'react';

interface KiralyteLogoProps {
  className?: string;
  size?: number;
}

export const KiralyteLogo: React.FC<KiralyteLogoProps> = ({ className = '', size = 30 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Angled shield outer stroke echoing the Kiralyte brand emblem */}
      <path
        d="M8.5 7.5C8.5 5.84315 9.84315 4.5 11.5 4.5H24.5L32.5 12.5V27.2C32.5 29.4 31.3 31.4 29.4 32.5L21.5 36.8C20.6 37.3 19.4 37.3 18.5 36.8L10.6 32.5C9.3 31.8 8.5 30.4 8.5 28.9V7.5Z"
        stroke="#EA580C"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      {/* Stylized upward-right rocket silhouette */}
      <path
        d="M27.6 10.6C24.4 10.7 20.8 12.3 18.2 14.9L14.8 18.3L12.1 18.1L10.6 19.6L14.2 21.8L16.4 25.4L17.9 23.9L17.7 21.2L21.1 17.8C23.7 15.2 25.3 11.6 25.4 8.4L27.6 10.6Z"
        fill="#EA580C"
      />
      <path
        d="M26.9 9.1C23.8 9.2 20.1 11.0 17.4 13.7L15.1 16.0L22.0 22.9L24.3 20.6C27.0 17.9 28.8 14.2 28.9 11.1C28.9 9.9 28.1 9.1 26.9 9.1Z"
        fill="#EA580C"
      />
      {/* Rocket window */}
      <circle cx="22.8" cy="15.2" r="2.1" fill="#FFFFFF" />
      {/* Thrust flame */}
      <path
        d="M11.6 25.3C10.4 26.5 9.9 28.4 10.4 29.6C11.6 30.1 13.5 29.6 14.7 28.4L15.4 27.7L12.3 24.6L11.6 25.3Z"
        fill="#EA580C"
      />
    </svg>
  );
};
