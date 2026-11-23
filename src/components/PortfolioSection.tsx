import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { CaseStudy } from '../data/kiralyteData';
import { useLanguage } from '../i18n/translations';

type CategoryFilter = 'All Work' | CaseStudy['category'];

interface PortfolioSectionProps {
  activeModalStudyId: string | null;
  onOpenStudy: (study: CaseStudy) => void;
  onCloseStudy: () => void;
  onBuildSimilar: (study: CaseStudy) => void;
}

const FILTERS: CategoryFilter[] = ['All Work', 'Business Sites', 'Portfolios', 'Landing Pages'];

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  activeModalStudyId,
  onOpenStudy,
  onCloseStudy,
  onBuildSimilar,
}) => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<CategoryFilter>('All Work');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const studies = t.portfolio.studies;
  const activeModalStudy = activeModalStudyId
    ? studies.find((s) => s.id === activeModalStudyId) ?? null
    : null;

  useEffect(() => {
    if (!activeModalStudy) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseStudy();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalStudy, onCloseStudy]);

  const visibleStudies =
    filter === 'All Work' ? studies : studies.filter((study) => study.category === filter);

  return (
    <section
      id="work"
      className="cv-auto py-14 sm:py-20 lg:py-28 border-t border-[#181C20]/8 bg-[#F6F7F9]"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6 mb-9 sm:mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#C2410C] mb-3">{t.portfolio.kicker}</p>
            <h2 className="text-3xl sm:text-[2.5rem] font-bold tracking-tight text-[#181C20] leading-[1.1]">
              {t.portfolio.title}
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects by type"
            className="flex flex-nowrap overflow-x-auto no-scrollbar max-w-full items-center gap-1 bg-white p-1 rounded-lg border border-[#181C20]/8 self-start lg:self-auto"
          >
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={filter === item}
                onClick={() => setFilter(item)}
                className={`min-h-[42px] sm:min-h-0 px-3.5 py-2 text-xs font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  filter === item
                    ? 'bg-[#181C20] text-white'
                    : 'text-[#4B5563] hover:text-[#181C20]'
                }`}
              >
                {item === 'All Work' ? t.portfolio.allWork : t.portfolio.categoryLabels[item]}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`grid grid-cols-1 gap-6 ${
            visibleStudies.length === 1
              ? 'lg:grid-cols-1 max-w-3xl'
              : visibleStudies.length === 2
                ? 'lg:grid-cols-2'
                : 'lg:grid-cols-3'
          }`}
        >
          {visibleStudies.map((study) => {
            const isBroken = Boolean(failedImages[study.id]);
            return (
              <article
                key={study.id}
                className="group bg-white border border-[#181C20]/8 rounded-2xl overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div>
                  <div className="aspect-[4/3] w-full bg-[#E5E7EB] overflow-hidden relative">
                    {!isBroken ? (
                      <img
                        src={study.image}
                        alt={study.imageAlt}
                        width={800}
                        height={600}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [study.id]: true }))
                        }
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-[#181C20] text-white p-6 text-center">
                        <span className="text-lg font-bold">{study.client}</span>
                        <span className="text-xs text-white/70 mt-1">
                          {t.portfolio.categoryLabels[study.category]}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B7280] mb-3">
                      <span>{t.portfolio.categoryLabels[study.category]}</span>
                      <span aria-hidden="true">·</span>
                      <span>{study.location}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{study.turnaround}</span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-[#181C20] mb-2">
                      {study.client}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#4B5563]">{study.summary}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-[#181C20]/8 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-2xl font-bold font-mono tabular-nums text-[#C2410C]">
                      {study.metricValue}
                    </p>
                    <p className="text-xs text-[#4B5563] mt-0.5">{study.metricLabel}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenStudy(study)}
                    className="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-semibold text-[#181C20] hover:text-[#EA580C] transition-colors whitespace-nowrap shrink-0 cursor-pointer px-2 -mr-2"
                  >
                    <span>{t.portfolio.breakdown}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {activeModalStudy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-modal-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-[#181C20]/65 backdrop-blur-xs"
          onClick={onCloseStudy}
        >
          <div
            className="bg-white rounded-t-3xl sm:rounded-2xl max-w-2xl w-full max-h-[92dvh] overflow-y-auto border-t sm:border border-[#181C20]/12 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sm:hidden pt-2.5 flex justify-center bg-white">
              <span className="w-10 h-1 rounded-full bg-[#181C20]/15" aria-hidden="true" />
            </div>
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm px-5 sm:px-6 py-3.5 sm:py-4 border-b border-[#181C20]/8 flex items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#6B7280] min-w-0">
                <span className="font-semibold text-[#181C20]">{activeModalStudy.client}</span>
                <span aria-hidden="true">·</span>
                <span>{t.portfolio.categoryLabels[activeModalStudy.category]}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{activeModalStudy.turnaround}</span>
              </div>
              <button
                type="button"
                onClick={onCloseStudy}
                aria-label={t.portfolio.closeModal}
                className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#181C20]/10 text-[#181C20] hover:bg-[#F6F7F9] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 sm:p-6 pb-8 sm:pb-6 space-y-5 sm:space-y-6">
              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#E5E7EB]">
                <img
                  src={activeModalStudy.image}
                  alt={activeModalStudy.imageAlt}
                  width={960}
                  height={540}
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-wrap items-baseline justify-between gap-4 pb-5 border-b border-[#181C20]/8">
                <h3
                  id="case-study-modal-title"
                  className="text-xl sm:text-2xl font-bold text-[#181C20]"
                >
                  {activeModalStudy.client} — {activeModalStudy.headline}
                </h3>
                <div className="text-left sm:text-right">
                  <p className="text-2xl font-bold font-mono tabular-nums text-[#C2410C]">
                    {activeModalStudy.metricValue}
                  </p>
                  <p className="text-xs text-[#4B5563]">{activeModalStudy.metricLabel}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <p className="text-xs font-semibold text-[#6B7280] mb-1.5">
                    {t.portfolio.bottleneck}
                  </p>
                  <p className="text-sm leading-relaxed text-[#4B5563]">
                    {activeModalStudy.challenge}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#6B7280] mb-1.5">
                    {t.portfolio.solution}
                  </p>
                  <p className="text-sm leading-relaxed text-[#4B5563]">
                    {activeModalStudy.solution}
                  </p>
                </div>
              </div>

              <div className="bg-[#F6F7F9] rounded-xl p-4 sm:p-5">
                <p className="text-xs font-semibold text-[#181C20] mb-3">
                  {t.portfolio.deliverables}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalStudy.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#374151]">
                      <Check className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <span className="text-xs font-mono tabular-nums text-[#6B7280]">
                  {t.portfolio.measuredLoad} {activeModalStudy.loadTime}
                </span>
                <button
                  type="button"
                  onClick={() => onBuildSimilar(activeModalStudy)}
                  className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>{t.portfolio.buildSimilar}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
