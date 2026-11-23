import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../i18n/translations';

export const ScrollToTop: React.FC = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 420);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label={t.scrollTopLabel}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-[76px] right-4 md:bottom-7 md:right-7 z-40 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#181C20] hover:bg-[#EA580C] text-white border border-white/15 shadow-[0_12px_28px_-8px_rgba(24,28,32,0.4)] transition-[opacity,transform,background-color] duration-200 ease-out cursor-pointer ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
};
