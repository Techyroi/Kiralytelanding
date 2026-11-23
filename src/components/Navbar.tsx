import React, { useEffect, useState } from 'react';
import { Menu, MessageCircle, Phone, X } from 'lucide-react';
import { KiralyteLogo } from './KiralyteLogo';
import { KIRALYTE_CONTACT } from '../data/kiralyteData';
import { useLanguage } from '../i18n/translations';

interface NavbarProps {
  onStartProject: () => void;
  onBookCall: () => void;
  onMobileMenuChange?: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onStartProject,
  onBookCall,
  onMobileMenuChange,
}) => {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const setDrawerOpen = (next: boolean) => {
    setMobileOpen(next);
    onMobileMenuChange?.(next);
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  const navLinks = [
    { label: t.nav.capabilities, href: '#capabilities' },
    { label: t.nav.work, href: '#work' },
    { label: t.nav.pricing, href: '#pricing' },
    { label: t.nav.process, href: '#process' },
  ];

  const handleLinkClick = () => {
    setDrawerOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F6F7F9]/94 backdrop-blur-md border-b border-[#181C20]/8">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-8">
        {/* Zone 1: Single-line Brand Wordmark (strict Top Bar Contract) */}
        <a
          href="#top"
          className="inline-flex items-center gap-2 text-[1.0625rem] sm:text-[1.125rem] font-bold tracking-tight text-[#181C20] whitespace-nowrap shrink-0"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <KiralyteLogo size={26} />
          <span>Kiralyte</span>
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#4B5563] hover:text-[#181C20] transition-colors duration-150 whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-[#EA580C] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary CTA button + mobile drawer trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onBookCall}
            className="inline-flex items-center justify-center px-3 sm:px-4 h-10 text-xs sm:text-sm font-semibold text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.nav.bookCall}
          </button>

          <button
            type="button"
            onClick={() => setDrawerOpen(!mobileOpen)}
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#181C20]/12 text-[#181C20] hover:bg-white transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer + Dismissible Scrim */}
      {mobileOpen && (
        <>
          <div
            aria-hidden="true"
            onClick={() => setDrawerOpen(false)}
            className="md:hidden fixed inset-0 top-14 bg-[#181C20]/45 backdrop-blur-xs z-40"
          />
          <div className="md:hidden relative z-50 border-t border-[#181C20]/8 bg-white px-4 pt-2 pb-5 shadow-[0_20px_40px_-20px_rgba(24,28,32,0.24)] max-h-[calc(100dvh-3.5rem)] overflow-y-auto">
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="min-h-[48px] flex items-center text-base font-medium text-[#181C20] border-b border-[#181C20]/6 last:border-b-0"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-4 space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  onBookCall();
                }}
                className="w-full min-h-[48px] py-3 px-4 text-sm font-semibold text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                {t.nav.bookFreeCall}
              </button>
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  onStartProject();
                }}
                className="w-full min-h-[46px] py-2.5 px-4 text-sm font-semibold text-[#181C20] bg-[#F6F7F9] border border-[#181C20]/10 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                {t.nav.claimOffer}
              </button>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={KIRALYTE_CONTACT.whatsappBaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[46px] inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#181C20] bg-[#F6F7F9] border border-[#181C20]/10 rounded-lg whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 text-[#EA580C]" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={KIRALYTE_CONTACT.phoneHref}
                  className="min-h-[46px] inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#181C20] bg-[#F6F7F9] border border-[#181C20]/10 rounded-lg whitespace-nowrap font-mono tabular-nums"
                >
                  <Phone className="w-3.5 h-3.5 text-[#181C20]" />
                  <span>{KIRALYTE_CONTACT.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
