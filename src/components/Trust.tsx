import React, { useState } from 'react';
import { useLanguage } from '../i18n/translations';

interface TechItem {
  id: 'react' | 'tailwind' | 'vite' | 'firebase';
}

const TechLogoMark: React.FC<{ id: TechItem['id']; active: boolean }> = ({ id, active }) => {
  const strokeColor = active ? '#EA580C' : '#181C20';

  if (id === 'react') {
    return (
      <svg
        width="26"
        height="26"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0 transition-colors duration-150"
      >
        <circle cx="16" cy="16" r="2.6" fill={strokeColor} />
        <ellipse cx="16" cy="16" rx="12.5" ry="4.8" stroke={strokeColor} strokeWidth="1.7" />
        <ellipse
          cx="16"
          cy="16"
          rx="12.5"
          ry="4.8"
          transform="rotate(60 16 16)"
          stroke={strokeColor}
          strokeWidth="1.7"
        />
        <ellipse
          cx="16"
          cy="16"
          rx="12.5"
          ry="4.8"
          transform="rotate(120 16 16)"
          stroke={strokeColor}
          strokeWidth="1.7"
        />
      </svg>
    );
  }

  if (id === 'tailwind') {
    return (
      <svg
        width="26"
        height="26"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0 transition-colors duration-150"
      >
        <path
          d="M16 8.5C12 8.5 9.5 10.5 8.5 14.5C10 12.5 11.75 11.75 13.75 12.25C14.89 12.53 15.7 13.36 16.6 14.27C18.06 15.75 19.75 17.5 23.5 17.5C27.5 17.5 30 15.5 31 11.5C29.5 13.5 27.75 14.25 25.75 13.75C24.61 13.47 23.8 12.64 22.9 11.73C21.44 10.25 19.75 8.5 16 8.5ZM8.5 17.5C4.5 17.5 2 19.5 1 23.5C2.5 21.5 4.25 20.75 6.25 21.25C7.39 21.53 8.2 22.36 9.1 23.27C10.56 24.75 12.25 26.5 16 26.5C20 26.5 22.5 24.5 23.5 20.5C22 22.5 20.25 23.25 18.25 22.75C17.11 22.47 16.3 21.64 15.4 20.73C13.94 19.25 12.25 17.5 8.5 17.5Z"
          fill={strokeColor}
        />
      </svg>
    );
  }

  if (id === 'vite') {
    return (
      <svg
        width="26"
        height="26"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0 transition-colors duration-150"
      >
        <path
          d="M27.8 6.4L16.6 26.8C16.33 27.3 15.62 27.3 15.35 26.8L4.2 6.4C3.92 5.88 4.38 5.26 4.96 5.36L16 7.3L27.04 5.36C27.62 5.26 28.08 5.88 27.8 6.4Z"
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M19.8 4.6L13.1 6.1L12.1 15.2L15.4 14.4L14.5 20.4L20.9 11.7L17.4 12.5L19.8 4.6Z"
          fill={strokeColor}
        />
      </svg>
    );
  }

  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0 transition-colors duration-150"
    >
      <path
        d="M7.2 22.6L10.4 5.2C10.55 4.4 11.65 4.25 12.02 4.96L15.4 11.5L18.6 8.3C19.12 7.78 20.02 8.05 20.16 8.77L24.8 22.6L16.85 27.15C16.32 27.45 15.68 27.45 15.15 27.15L7.2 22.6Z"
        stroke={strokeColor}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M7.6 22.4L15.4 11.5L21.9 24.2"
        stroke={strokeColor}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Trust: React.FC = () => {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState<TechItem['id']>('react');
  const activeTech = t.trust.items.find((item) => item.id === selectedId) ?? t.trust.items[0];

  return (
    <section
      aria-label={t.trust.heading}
      className="bg-white border-t border-[#181C20]/8 py-10 lg:py-12"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5 pb-5 border-b border-[#181C20]/8">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#4B5563]">
            <span className="font-semibold text-[#181C20]">{t.trust.heading}</span>
            <span aria-hidden="true">·</span>
            <span>{t.trust.subheading}</span>
          </div>
          <p className="text-xs text-[#6B7280]">{t.trust.hint}</p>
        </div>

        {/* 4-Column Interactive Technology Mark Strip (clean 2x2 mobile grid) */}
        <div
          role="tablist"
          aria-label={t.trust.heading}
          className="grid grid-cols-2 lg:grid-cols-4 border-b border-[#181C20]/8"
        >
          {t.trust.items.map((tech, idx) => {
            const isActive = tech.id === selectedId;
            const mobileBorderClass = [
              idx < 2 ? 'border-b lg:border-b-0 border-[#181C20]/8' : '',
              idx % 2 === 0 ? 'border-r border-[#181C20]/8' : '',
              idx < 3 ? 'lg:border-r lg:border-[#181C20]/8' : '',
            ].join(' ');

            return (
              <button
                key={tech.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedId(tech.id)}
                className={`group text-left px-3.5 py-4 sm:px-6 sm:py-5 min-h-[64px] transition-colors duration-150 flex items-center gap-2.5 sm:gap-3.5 cursor-pointer relative ${mobileBorderClass} ${
                  isActive ? 'bg-[#F6F7F9]' : 'bg-white hover:bg-[#F6F7F9]/60'
                }`}
              >
                <TechLogoMark id={tech.id} active={isActive} />
                <div className="min-w-0">
                  <p
                    className={`text-sm sm:text-base font-bold tracking-tight whitespace-nowrap truncate transition-colors ${
                      isActive
                        ? 'text-[#181C20]'
                        : 'text-[#374151] group-hover:text-[#181C20]'
                    }`}
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {tech.name}
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#6B7280] truncate">{tech.role}</p>
                </div>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EA580C]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Technology Rationale Bar */}
        <div
          role="tabpanel"
          className="pt-4 sm:pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-sm"
        >
          <p className="text-[#4B5563] leading-relaxed max-w-[72ch]">
            <span className="font-semibold text-[#181C20]">{activeTech.name}:</span>{' '}
            {activeTech.benefit}
          </p>
          <span className="text-xs font-mono tabular-nums font-semibold text-[#C2410C] whitespace-nowrap shrink-0">
            {activeTech.metric}
          </span>
        </div>
      </div>
    </section>
  );
};
