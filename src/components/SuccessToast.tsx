import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';
import { useLanguage } from '../i18n/translations';

export interface ToastMessage {
  id: number;
  title: string;
  description: string;
}

interface SuccessToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const SuccessToast: React.FC<SuccessToastProps> = ({ toast, onDismiss }) => {
  const { t } = useLanguage();

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(onDismiss, 5000);
    return () => window.clearTimeout(timer);
  }, [toast, onDismiss]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-[76px] left-4 right-16 md:bottom-7 md:left-7 md:right-auto md:w-full md:max-w-[390px] z-50 pointer-events-none"
    >
      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            key={toast.id}
            role="status"
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto bg-[#181C20] text-white border border-white/14 rounded-xl p-3.5 sm:p-4 shadow-[0_18px_40px_-14px_rgba(24,28,32,0.5)] flex items-start gap-3"
          >
            <CheckCircle2
              aria-hidden="true"
              className="w-5 h-5 text-[#FB923C] shrink-0 mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white leading-snug">{toast.title}</p>
              <p className="mt-0.5 text-xs text-[#CBD5E1] leading-relaxed">
                {toast.description}
              </p>
            </div>
            <button
              type="button"
              onClick={onDismiss}
              aria-label={t.toast.dismiss}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer -mr-1 -mt-1"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
