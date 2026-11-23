import React, { useEffect, useState } from 'react';
import { Calendar, MessageCircle } from 'lucide-react';
import { KIRALYTE_CONTACT } from '../data/kiralyteData';
import { useLanguage } from '../i18n/translations';

interface MobileActionBarProps {
  hidden?: boolean;
  onBookCall: () => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({
  hidden = false,
  onBookCall,
}) => {
  const { t, language } = useLanguage();
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolledPastHero(window.scrollY > 360);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const visible = scrolledPastHero && !hidden;

  const whatsappText =
    language === 'fr'
      ? 'Bonjour Kiralyte Technology Solutions, je souhaite réserver l’offre de site web à 299 $.'
      : 'Hello Kiralyte Technology Solutions, I would like to claim the $299 website offer.';

  return (
    <div
      aria-label="Mobile quick actions"
      aria-hidden={!visible}
      className={`md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#181C20]/10 px-3 pt-2 pb-safe shadow-[0_-8px_24px_-12px_rgba(24,28,32,0.16)] transition-[transform,opacity] duration-200 ease-out ${
        visible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="grid grid-cols-12 gap-2 max-w-md mx-auto">
        <a
          href={`${KIRALYTE_CONTACT.whatsappBaseUrl}?text=${encodeURIComponent(whatsappText)}`}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className="col-span-5 min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 rounded-lg border border-[#181C20]/14 bg-[#F6F7F9] text-xs font-semibold text-[#181C20] active:scale-[0.98] transition-transform whitespace-nowrap"
        >
          <MessageCircle className="w-4 h-4 text-[#EA580C] shrink-0" />
          <span>WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={onBookCall}
          tabIndex={visible ? 0 : -1}
          className="col-span-7 min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 rounded-lg bg-[#EA580C] active:bg-[#C2410C] text-xs font-semibold text-white active:scale-[0.98] transition-transform cursor-pointer whitespace-nowrap"
        >
          <Calendar className="w-4 h-4 shrink-0" />
          <span>{t.brief.tabCalendly}</span>
        </button>
      </div>
    </div>
  );
};
