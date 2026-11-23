import React, { useEffect, useState } from 'react';
import { Calendar, ExternalLink, X } from 'lucide-react';
import { buildCalendlyEmbedUrl, KIRALYTE_CONTACT } from '../data/kiralyteData';
import { useLanguage } from '../i18n/translations';

interface CalendlyModalProps {
  open: boolean;
  onClose: () => void;
  prefill?: {
    name?: string;
    email?: string;
  };
  contextLabel?: string;
}

export const CalendlyModal: React.FC<CalendlyModalProps> = ({
  open,
  onClose,
  prefill,
  contextLabel,
}) => {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!open) {
      setLoaded(false);
      return;
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const embedUrl = buildCalendlyEmbedUrl(prefill);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="calendly-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-[#181C20]/70 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl sm:rounded-2xl max-w-3xl w-full h-[92dvh] sm:h-[85vh] max-h-[780px] flex flex-col overflow-hidden border-t sm:border border-[#181C20]/12 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sm:hidden pt-2.5 flex justify-center bg-white shrink-0">
          <span className="w-10 h-1 rounded-full bg-[#181C20]/15" aria-hidden="true" />
        </div>
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-[#181C20]/8 flex items-center justify-between gap-3 bg-white shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#EA580C] shrink-0" />
              <h2
                id="calendly-modal-title"
                className="text-base sm:text-lg font-bold text-[#181C20] truncate"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t.modal.title}
              </h2>
            </div>
            <p className="text-xs text-[#6B7280] mt-0.5 truncate">
              {contextLabel || t.modal.defaultSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={KIRALYTE_CONTACT.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#4B5563] hover:text-[#181C20] border border-[#181C20]/10 rounded-lg transition-colors whitespace-nowrap"
            >
              <span>{t.modal.openInCalendly}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label={t.modal.closeScheduler}
              className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#181C20]/10 text-[#181C20] hover:bg-[#F6F7F9] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Embedded Calendly Scheduler */}
        <div className="relative flex-1 bg-white overflow-hidden">
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center bg-white z-10">
              <div className="w-8 h-8 rounded-full border-2 border-[#181C20]/15 border-t-[#EA580C] animate-spin" />
              <p className="text-sm font-medium text-[#181C20]">{t.modal.loadingAvailability}</p>
              <a
                href={KIRALYTE_CONTACT.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#C2410C] underline underline-offset-2"
              >
                {t.modal.openDirectPrompt}
              </a>
            </div>
          )}

          <iframe
            title={t.modal.title}
            src={embedUrl}
            onLoad={() => setLoaded(true)}
            className="w-full h-full border-0"
          />
        </div>

        {/* Mobile Direct Link Footer */}
        <div className="sm:hidden px-4 pt-2.5 pb-safe border-t border-[#181C20]/8 bg-[#F6F7F9] flex items-center justify-between gap-3 text-xs shrink-0">
          <span className="text-[#4B5563]">{t.modal.instantConfirm}</span>
          <a
            href={KIRALYTE_CONTACT.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[36px] inline-flex items-center gap-1 font-semibold text-[#C2410C] whitespace-nowrap"
          >
            <span>{t.modal.openFullPage}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
