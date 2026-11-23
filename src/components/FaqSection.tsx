import React, { useState } from 'react';
import { Calendar, Minus, Plus } from 'lucide-react';
import { useLanguage } from '../i18n/translations';

interface FaqSectionProps {
  onBookCall: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onBookCall }) => {
  const { t } = useLanguage();
  const faq = t.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      aria-label={faq.kicker}
      className="cv-auto py-14 sm:py-20 lg:py-24 bg-white border-t border-[#181C20]/8"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Sticky Summary & Direct CTA */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <p className="text-xs font-medium text-[#C2410C] mb-3">{faq.kicker}</p>
            <h2 className="text-3xl sm:text-[2.25rem] font-bold tracking-tight text-[#181C20] leading-[1.1] text-balance">
              {faq.title}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#4B5563] max-w-[44ch]">
              {faq.subtitle}
            </p>

            <div className="mt-6 pt-6 border-t border-[#181C20]/10">
              <p className="text-xs font-medium text-[#4B5563] mb-3">{faq.ctaPrompt}</p>
              <button
                type="button"
                onClick={onBookCall}
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>{faq.ctaButton}</span>
              </button>
            </div>
          </div>

          {/* Right Accessible Accordion */}
          <div className="lg:col-span-7 border-t border-[#181C20]/10 divide-y divide-[#181C20]/10">
            {faq.items.map((item, idx) => {
              const isOpen = openIndex === idx;
              const panelId = `faq-panel-${idx}`;
              const triggerId = `faq-trigger-${idx}`;

              return (
                <div key={item.question} className="py-1">
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(idx)}
                    className="w-full min-h-[56px] py-4 text-left flex items-center justify-between gap-4 cursor-pointer group"
                  >
                    <span className="text-[15px] sm:text-base font-bold text-[#181C20] group-hover:text-[#C2410C] transition-colors leading-snug">
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-[#181C20] border-[#181C20] text-white'
                          : 'bg-[#F6F7F9] border-[#181C20]/10 text-[#181C20] group-hover:border-[#181C20]/30'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      className="pb-5 pr-4 sm:pr-10 text-sm sm:text-[15px] leading-relaxed text-[#4B5563]"
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
