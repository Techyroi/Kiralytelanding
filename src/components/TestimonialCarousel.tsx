import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { useLanguage } from '../i18n/translations';

interface TestimonialCarouselProps {
  onBookCall: () => void;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ onBookCall }) => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const touchStartX = useRef<number | null>(null);

  const items = t.testimonials.items;
  const total = items.length;
  const active = items[activeIndex] ?? items[0];

  const goTo = (nextIndex: number, dir: 1 | -1) => {
    setDirection(dir);
    setActiveIndex((nextIndex + total) % total);
  };

  const handlePrev = () => goTo(activeIndex - 1, -1);
  const handleNext = () => goTo(activeIndex + 1, 1);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = touchStartX.current - endX;
    if (Math.abs(delta) > 42) {
      if (delta > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section
      aria-label={t.testimonials.kicker}
      className="cv-auto py-14 sm:py-20 lg:py-24 bg-white border-t border-[#181C20]/8"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#C2410C] mb-3">{t.testimonials.kicker}</p>
            <h2 className="text-3xl sm:text-[2.35rem] font-bold tracking-tight text-[#181C20] leading-[1.1] text-balance">
              {t.testimonials.title}
            </h2>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            <span className="text-xs font-mono tabular-nums font-semibold text-[#6B7280]">
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label={t.testimonials.prevLabel}
                className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#181C20]/12 bg-white hover:border-[#181C20] text-[#181C20] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label={t.testimonials.nextLabel}
                className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#181C20]/12 bg-white hover:border-[#181C20] text-[#181C20] transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="bg-[#F6F7F9] border border-[#181C20]/8 rounded-2xl p-5 sm:p-8 lg:p-10 overflow-hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={`${active.id}-${t.langName}`}
              initial={{ opacity: 0, x: direction * 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -20 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
            >
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#6B7280] mb-4">
                  <span className="font-semibold text-[#181C20]">{active.company}</span>
                  <span aria-hidden="true">·</span>
                  <span>{active.projectType}</span>
                  <span aria-hidden="true">·</span>
                  <span>{active.location}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{active.turnaround}</span>
                </div>

                <blockquote
                  className="text-xl sm:text-2xl lg:text-[1.65rem] font-semibold tracking-[-0.015em] leading-[1.35] text-[#181C20]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  “{active.quote}”
                </blockquote>
              </div>

              <figcaption className="lg:col-span-4 lg:border-l lg:border-[#181C20]/10 lg:pl-8 pt-5 lg:pt-0 border-t lg:border-t-0 border-[#181C20]/10 flex flex-col justify-between gap-5">
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">{t.testimonials.measuredImpact}</p>
                  <p className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-[#C2410C]">
                    {active.outcome}
                  </p>
                </div>

                <div className="flex items-center gap-3.5">
                  <div
                    aria-hidden="true"
                    className="w-11 h-11 rounded-xl bg-[#181C20] text-white text-xs font-mono font-semibold flex items-center justify-center shrink-0"
                  >
                    {active.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#181C20] truncate">{active.author}</p>
                    <p className="text-xs text-[#4B5563] truncate">
                      {active.role}, {active.company}
                    </p>
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Select a client review"
            className="flex flex-nowrap overflow-x-auto no-scrollbar items-center gap-1.5 max-w-full pb-0.5"
          >
            {items.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => goTo(idx, idx > activeIndex ? 1 : -1)}
                  className={`min-h-[44px] sm:min-h-[40px] px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#181C20] text-white border-[#181C20]'
                      : 'bg-white text-[#4B5563] border-[#181C20]/10 hover:border-[#181C20]/30 hover:text-[#181C20]'
                  }`}
                >
                  {item.company}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onBookCall}
            className="min-h-[44px] inline-flex items-center gap-2 text-sm font-semibold text-[#C2410C] hover:text-[#181C20] transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start md:self-auto py-1"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.testimonials.cta}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
