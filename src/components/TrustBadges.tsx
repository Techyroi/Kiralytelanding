import React from 'react';
import { Award, Lock, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n/translations';

const ICON_MAP = {
  ssl: Lock,
  gdpr: ShieldCheck,
  guarantee: Award,
};

export const TrustBadges: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div
      aria-label="Security and satisfaction guarantees"
      className="mb-10 sm:mb-12 bg-[#F6F7F9] border border-[#181C20]/8 rounded-2xl grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#181C20]/8 overflow-hidden"
    >
      {t.trustBadges.items.map(({ id, title, description }) => {
        const Icon = ICON_MAP[id];
        return (
          <div key={id} className="p-5 sm:p-6 flex items-start gap-4">
            <div
              aria-hidden="true"
              className="w-10 h-10 rounded-xl bg-white border border-[#181C20]/10 text-[#EA580C] flex items-center justify-center shrink-0 mt-0.5"
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3
                className="text-sm font-bold tracking-tight text-[#181C20]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#4B5563]">{description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
