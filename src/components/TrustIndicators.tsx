import React from 'react';
import { useLanguage } from '../i18n/translations';

interface BrandItem {
  id: 'google' | 'stripe' | 'shopify' | 'cloudflare' | 'meta' | 'calendly' | 'whatsapp';
  name: string;
}

const BRANDS: BrandItem[] = [
  { id: 'google', name: 'Google' },
  { id: 'stripe', name: 'Stripe' },
  { id: 'shopify', name: 'Shopify' },
  { id: 'cloudflare', name: 'Cloudflare' },
  { id: 'meta', name: 'Meta' },
  { id: 'calendly', name: 'Calendly' },
  { id: 'whatsapp', name: 'WhatsApp' },
];

const BrandLogoMark: React.FC<{ id: BrandItem['id'] }> = ({ id }) => {
  switch (id) {
    case 'google':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
          <path
            d="M21.35 12.23C21.35 11.49 21.29 10.95 21.15 10.39H12.2V13.73H17.46C17.35 14.56 16.78 15.81 15.51 16.65L15.49 16.77L18.32 18.92L18.51 18.94C20.31 17.31 21.35 14.99 21.35 12.23Z"
            fill="#4285F4"
          />
          <path
            d="M12.2 21.5C14.77 21.5 16.93 20.67 18.51 19.24L15.51 16.95C14.71 17.5 13.63 17.88 12.2 17.88C9.68 17.88 7.54 16.24 6.77 13.97L6.66 13.98L3.71 16.22L3.67 16.33C5.24 19.4 8.46 21.5 12.2 21.5Z"
            fill="#34A853"
          />
          <path
            d="M6.77 13.97C6.57 13.38 6.45 12.75 6.45 12.1C6.45 11.45 6.57 10.82 6.76 10.23L6.75 10.1L3.77 7.82L3.67 7.87C3.03 9.14 2.66 10.58 2.66 12.1C2.66 13.62 3.03 15.06 3.67 16.33L6.77 13.97Z"
            fill="#FBBC05"
          />
          <path
            d="M12.2 6.32C13.99 6.32 15.2 7.08 15.89 7.72L18.58 5.14C16.92 3.62 14.77 2.7 12.2 2.7C8.46 2.7 5.24 4.8 3.67 7.87L6.76 10.23C7.54 7.96 9.68 6.32 12.2 6.32Z"
            fill="#EA4335"
          />
        </svg>
      );

    case 'stripe':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#635BFF" />
          <path
            d="M14.9 9.2C14.9 8.1 13.8 7.4 12.1 7.4C10.3 7.4 9.1 8.3 9.1 9.6C9.1 12.1 15 11.3 15 14.3C15 15.8 13.6 16.7 11.6 16.7C10 16.7 8.8 16 8.3 15.2"
            stroke="#FFFFFF"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'shopify':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
          <path
            d="M15.2 6.3C15 4.5 13.7 3.2 12 3.2C10.3 3.2 9 4.5 8.8 6.3"
            stroke="#5E8E3E"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
          <path
            d="M18 6.8C17.95 6.45 17.65 6.2 17.3 6.2H6.7C6.35 6.2 6.05 6.45 6 6.8L4.3 19.3C4.25 19.9 4.7 20.4 5.3 20.4H18.7C19.3 20.4 19.75 19.9 19.7 19.3L18 6.8Z"
            fill="#95BF47"
          />
          <path
            d="M10.1 11.3C10.35 10.55 11.15 10.1 12.15 10.2C13.05 10.3 13.65 10.85 13.65 11.6C13.65 12.95 10.25 12.75 10.25 14.6C10.25 15.5 11.05 16.15 12.2 16.15C13.1 16.15 13.75 15.7 14.05 15.1"
            stroke="#FFFFFF"
            strokeWidth="1.95"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'cloudflare':
      return (
        <svg width="23" height="20" viewBox="0 0 26 24" fill="none" aria-hidden="true" className="shrink-0">
          <path
            d="M7.5 18H19.6C21.6 18 23.2 16.4 23.2 14.4C23.2 12.6 21.9 11.1 20.1 10.8C19.6 7.8 17 5.6 13.9 5.6C11.2 5.6 8.9 7.3 8 9.7C5.4 10 3.5 12.1 3.5 14.6C3.5 16.5 5.3 18 7.5 18Z"
            fill="#F38020"
          />
          <path
            d="M17.2 18H21.2C22.4 18 23.4 17 23.4 15.8C23.4 14.6 22.4 13.6 21.2 13.6H17.6"
            fill="#FAAE40"
          />
          <path d="M8.8 14.6H18.4" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );

    case 'meta':
      return (
        <svg width="22" height="20" viewBox="0 0 26 24" fill="none" aria-hidden="true" className="shrink-0">
          <path
            d="M3.8 15.8C3.8 12.2 5.8 7.2 8.5 7.2C10.4 7.2 11.9 9.4 13 11.6C14.1 9.4 15.6 7.2 17.5 7.2C20.2 7.2 22.2 12.2 22.2 15.8C22.2 17.5 21.1 18.6 19.6 18.6C17.9 18.6 16.6 16.9 14.9 14L13 10.7L11.1 14C9.4 16.9 8.1 18.6 6.4 18.6C4.9 18.6 3.8 17.5 3.8 15.8Z"
            stroke="#0081FB"
            strokeWidth="2.3"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'calendly':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
          <circle cx="12" cy="12" r="9.5" fill="#006BFF" />
          <path
            d="M15.4 9.2C14.6 8.3 13.4 7.7 12 7.7C9.6 7.7 7.7 9.6 7.7 12C7.7 14.4 9.6 16.3 12 16.3C13.4 16.3 14.6 15.7 15.4 14.8"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'whatsapp':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
          <path
            d="M20.5 11.7C20.5 16.4 16.7 20.2 12 20.2C10.5 20.2 9.1 19.8 7.9 19.1L3.5 20.3L4.8 16.1C3.9 14.8 3.5 13.3 3.5 11.7C3.5 7 7.3 3.2 12 3.2C16.7 3.2 20.5 7 20.5 11.7Z"
            fill="#25D366"
          />
          <path
            d="M9.3 9.2C9.5 11.8 11.7 14.1 14.4 14.5"
            stroke="#FFFFFF"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
        </svg>
      );
  }
};

export const TrustIndicators: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div
      aria-label={t.hero.trustIndicatorsLabel}
      className="mt-4 sm:mt-5 bg-white border border-[#181C20]/10 rounded-xl px-3.5 py-3 shadow-[0_8px_22px_-12px_rgba(24,28,32,0.14)] max-w-full overflow-hidden"
    >
      <p className="text-[11px] font-semibold text-[#C2410C] mb-2">
        {t.hero.trustIndicatorsLabel}
      </p>

      {/* High-Contrast Full-Color Floating Brand Marquee */}
      <div
        className="relative overflow-hidden py-0.5"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 18px, black calc(100% - 18px), transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 18px, black calc(100% - 18px), transparent)',
        }}
      >
        <div className="animate-marquee-glide items-center">
          {[0, 1].map((dupIndex) => (
            <ul
              key={dupIndex}
              aria-hidden={dupIndex === 1}
              className="flex items-center gap-6 sm:gap-7 pr-6 sm:pr-7 shrink-0"
            >
              {BRANDS.map((brand) => (
                <li
                  key={`${dupIndex}-${brand.id}`}
                  className="inline-flex items-center gap-2 text-[#181C20] select-none whitespace-nowrap"
                >
                  <BrandLogoMark id={brand.id} />
                  <span
                    className="text-xs sm:text-[13px] font-bold tracking-tight text-[#181C20]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {brand.name}
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};
