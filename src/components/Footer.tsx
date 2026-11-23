import React from 'react';
import { KiralyteLogo } from './KiralyteLogo';
import { TrustBadges } from './TrustBadges';
import { LanguageSwitcher } from './LanguageSwitcher';
import { KIRALYTE_CONTACT } from '../data/kiralyteData';
import { useLanguage } from '../i18n/translations';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="cv-auto bg-white border-t border-[#181C20]/8 pt-12 pb-24 md:py-14">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <TrustBadges />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#181C20]/8">
          <div className="md:col-span-5">
            <div className="inline-flex items-center gap-2.5">
              <KiralyteLogo size={26} />
              <span
                className="text-lg font-bold tracking-tight text-[#181C20]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {KIRALYTE_CONTACT.legalName}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#4B5563] max-w-sm">
              {t.footer.description}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-semibold text-[#181C20] mb-3">{t.footer.navigation}</p>
            <ul className="space-y-2.5 text-sm text-[#4B5563]">
              <li>
                <a href="#capabilities" className="hover:text-[#181C20] transition-colors">
                  {t.nav.capabilities}
                </a>
              </li>
              <li>
                <a href="#work" className="hover:text-[#181C20] transition-colors">
                  {t.nav.work}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#181C20] transition-colors">
                  {t.footer.pricingLink}
                </a>
              </li>
              <li>
                <a href="#start-project" className="hover:text-[#181C20] transition-colors">
                  {t.footer.startLink}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-semibold text-[#181C20] mb-3">{t.footer.directContact}</p>
            <ul className="space-y-2.5 text-sm text-[#4B5563]">
              <li>
                <a
                  href={KIRALYTE_CONTACT.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#C2410C] hover:text-[#181C20] transition-colors"
                >
                  {t.footer.bookCallLink}
                </a>
              </li>
              <li>
                <a
                  href={KIRALYTE_CONTACT.phoneHref}
                  className="font-mono tabular-nums font-semibold text-[#181C20] hover:text-[#EA580C] transition-colors"
                >
                  {t.footer.callWhatsappPrefix} {KIRALYTE_CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={KIRALYTE_CONTACT.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#181C20] transition-colors"
                >
                  {KIRALYTE_CONTACT.websiteDisplay}
                </a>
              </li>
              <li>
                <a
                  href={KIRALYTE_CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#181C20] transition-colors"
                >
                  {KIRALYTE_CONTACT.instagramDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#6B7280]">
          <p>
            © {new Date().getFullYear()} {KIRALYTE_CONTACT.legalName}. {t.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <p>{t.footer.pillars}</p>
            <LanguageSwitcher compact />
          </div>
        </div>
      </div>
    </footer>
  );
};
