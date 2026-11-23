import React from 'react';
import { Globe } from 'lucide-react';
import { Language, useLanguage } from '../i18n/translations';

interface LanguageSwitcherProps {
  compact?: boolean;
}

const OPTIONS: Array<{ code: Language; label: string; ariaLabel: string }> = [
  { code: 'en', label: 'EN', ariaLabel: 'Switch language to English' },
  { code: 'fr', label: 'FR', ariaLabel: 'Passer la langue en français' },
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language selector"
      className="inline-flex items-center gap-1.5 text-xs text-[#6B7280] shrink-0"
    >
      <Globe className="w-3.5 h-3.5 text-[#6B7280]" aria-hidden="true" />
      {OPTIONS.map((option, idx) => {
        const active = language === option.code;
        return (
          <React.Fragment key={option.code}>
            {idx > 0 && (
              <span aria-hidden="true" className="text-[#181C20]/20">
                /
              </span>
            )}
            <button
              type="button"
              onClick={() => setLanguage(option.code)}
              aria-pressed={active}
              aria-label={option.ariaLabel}
              className={`min-h-[36px] px-1.5 py-1 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                active
                  ? 'font-semibold text-[#181C20] underline underline-offset-4 decoration-[#EA580C]'
                  : 'font-medium text-[#6B7280] hover:text-[#181C20]'
              }`}
            >
              {option.label}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
};
