import React, { useRef, useState } from 'react';
import { ArrowRight, Monitor, Smartphone, Tablet } from 'lucide-react';
import { CaseStudy } from '../data/kiralyteData';
import { useLanguage } from '../i18n/translations';

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

interface DeviceShowcaseProps {
  onSelectStudy: (study: CaseStudy) => void;
}

const SHORT_CLIENT_LABELS: Record<string, string> = {
  olafashion: 'OlaFashion',
  'kora-studio': 'Kora Studio',
  'verve-roastery': 'Verve Coffee',
};

export const DeviceShowcase: React.FC<DeviceShowcaseProps> = ({ onSelectStudy }) => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewport, setViewport] = useState<ViewportMode>(() =>
    typeof window !== 'undefined' && window.innerWidth < 640 ? 'mobile' : 'desktop',
  );
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const touchStartX = useRef<number | null>(null);

  const studies = t.portfolio.studies;
  const study = studies[activeIndex] ?? studies[0];
  const isImageBroken = Boolean(failedImages[study.id]);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = touchStartX.current - endX;
    if (Math.abs(delta) > 44) {
      setActiveIndex((prev) =>
        delta > 0 ? (prev + 1) % studies.length : (prev - 1 + studies.length) % studies.length,
      );
    }
    touchStartX.current = null;
  };

  return (
    <div className="relative flex flex-col justify-between h-full">
      {/* Subtle sweeping architectural trajectory arc echoing the campaign visual DNA */}
      <svg
        aria-hidden="true"
        viewBox="0 0 560 440"
        fill="none"
        className="hidden sm:block pointer-events-none select-none absolute -top-10 -right-8 w-[112%] h-[112%] -z-0 opacity-90"
      >
        <path
          d="M 48 390 C 160 440, 440 365, 535 125"
          stroke="#EA580C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.45"
        />
        <path
          d="M 110 420 C 260 445, 485 330, 548 72"
          stroke="#181C20"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeOpacity="0.18"
        />
        <circle cx="520" cy="142" r="4" fill="#EA580C" fillOpacity="0.6" />
      </svg>

      {/* Main Showcase Stage */}
      <div className="relative z-10 bg-white border border-[#181C20]/10 rounded-2xl p-3.5 sm:p-5 shadow-[0_20px_50px_-24px_rgba(24,28,32,0.16)] flex flex-col h-full">
        {/* Top Interactive Control Strip: Client Switcher + Viewport Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 sm:pb-4 border-b border-[#181C20]/8">
          <div
            role="tablist"
            aria-label="Preview client builds"
            className="grid grid-cols-3 sm:flex items-center gap-1 bg-[#F6F7F9] p-1 rounded-lg w-full sm:w-auto"
          >
            {studies.map((item, idx) => (
              <button
                key={item.id}
                role="tab"
                type="button"
                aria-selected={activeIndex === idx}
                onClick={() => setActiveIndex(idx)}
                className={`min-h-[42px] sm:min-h-0 px-2 sm:px-3 py-1.5 text-xs font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 truncate cursor-pointer ${
                  activeIndex === idx
                    ? 'bg-white text-[#181C20] shadow-[0_1px_2px_rgba(24,28,32,0.08)]'
                    : 'text-[#4B5563] hover:text-[#181C20]'
                }`}
              >
                <span className="sm:hidden">{SHORT_CLIENT_LABELS[item.id] ?? item.client}</span>
                <span className="hidden sm:inline">{item.client}</span>
              </button>
            ))}
          </div>

          <div
            role="group"
            aria-label="Test responsive screen size"
            className="hidden sm:flex items-center gap-1 bg-[#F6F7F9] p-1 rounded-lg w-auto"
          >
            {(
              [
                { mode: 'mobile', label: t.showcase.mobile, Icon: Smartphone },
                { mode: 'tablet', label: t.showcase.tablet, Icon: Tablet },
                { mode: 'desktop', label: t.showcase.desktop, Icon: Monitor },
              ] as const
            ).map(({ mode, label, Icon }) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewport(mode)}
                aria-pressed={viewport === mode}
                aria-label={`${label} preview`}
                className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  viewport === mode
                    ? 'bg-[#181C20] text-white'
                    : 'text-[#4B5563] hover:text-[#181C20]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Responsive Device Frame Area (swipeable on mobile) */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative mt-3 sm:mt-4 flex-1 flex items-center justify-center bg-[#F6F7F9] rounded-xl p-3 sm:p-5 overflow-hidden min-h-[300px] sm:min-h-[370px]"
        >
          {viewport === 'desktop' && (
            <div className="w-full h-full flex items-center justify-center relative">
              {/* Laptop / Desktop Browser Mockup */}
              <div className="w-full bg-white rounded-xl border border-[#181C20]/12 overflow-hidden shadow-[0_14px_34px_-16px_rgba(24,28,32,0.2)]">
                {/* Browser Top Chrome */}
                <div className="h-8 bg-[#181C20] px-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="w-2 h-2 rounded-full bg-white/25" />
                    <span className="w-2 h-2 rounded-full bg-white/25" />
                    <span className="w-2 h-2 rounded-full bg-white/25" />
                  </div>
                  <div className="text-[11px] font-mono text-white/75 tracking-tight truncate max-w-[200px]">
                    {study.id}.com
                  </div>
                  <div className="text-[10px] font-mono text-white/60 tabular-nums">
                    {study.loadTime}
                  </div>
                </div>

                {/* Live Mini-Website Content */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between pb-3.5 border-b border-[#181C20]/8">
                    <span
                      className="text-sm font-bold text-[#181C20] tracking-tight"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {study.client}
                    </span>
                    <div className="hidden sm:flex items-center gap-4 text-[11px] font-medium text-[#4B5563]">
                      {study.previewNav.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-4 items-center pt-4">
                    <div className="col-span-12 sm:col-span-6 space-y-2.5">
                      <p className="text-[11px] font-medium text-[#6B7280]">
                        {study.previewSecondaryMeta}
                      </p>
                      <h3
                        className="text-lg sm:text-[1.3rem] font-bold leading-[1.15] text-[#181C20]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {study.headline}
                      </h3>
                      <p className="text-xs leading-relaxed text-[#4B5563]">
                        {study.subheadline}
                      </p>
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => onSelectStudy(study)}
                          className="min-h-[38px] sm:min-h-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-white bg-[#181C20] hover:bg-[#EA580C] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <span>{study.previewCta}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                      <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-[#E5E7EB]">
                        {!isImageBroken ? (
                          <img
                            src={study.image}
                            alt={study.imageAlt}
                            width={800}
                            height={600}
                            decoding="async"
                            fetchPriority={activeIndex === 0 ? 'high' : 'auto'}
                            referrerPolicy="no-referrer"
                            onError={() => handleImageError(study.id)}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#181C20] to-[#374151] text-white text-xs font-semibold p-4 text-center">
                            {study.client}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlapping Companion Mobile Preview Card on Desktop (echoing ad multi-device motif) */}
              <div className="hidden xl:block absolute -bottom-2 -right-2 w-[142px] bg-[#181C20] rounded-2xl p-1.5 shadow-[0_18px_34px_-10px_rgba(24,28,32,0.35)] border border-white/10">
                <div className="bg-white rounded-[11px] overflow-hidden">
                  <div className="px-2.5 pt-2 pb-1.5 flex items-center justify-between border-b border-[#181C20]/6">
                    <span className="text-[9px] font-bold text-[#181C20] truncate">
                      {study.client}
                    </span>
                    <span className="text-[8px] font-mono text-[#6B7280]">4G</span>
                  </div>
                  <div className="p-2 space-y-1.5">
                    <div className="aspect-[4/3] rounded-md overflow-hidden bg-[#E5E7EB]">
                      {!isImageBroken ? (
                        <img
                          src={study.image}
                          alt=""
                          aria-hidden="true"
                          width={320}
                          height={240}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#181C20]" />
                      )}
                    </div>
                    <p className="text-[9.5px] font-bold leading-tight text-[#181C20] line-clamp-2">
                      {study.headline}
                    </p>
                    <div className="h-5 rounded bg-[#EA580C] text-white text-[8px] font-semibold flex items-center justify-center">
                      {study.previewCta}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {viewport === 'tablet' && (
            <div className="w-full max-w-[430px] bg-[#181C20] rounded-[20px] p-2.5 shadow-[0_20px_40px_-18px_rgba(24,28,32,0.28)]">
              <div className="bg-white rounded-xl overflow-hidden">
                <div className="px-4 py-3 flex items-center justify-between border-b border-[#181C20]/8">
                  <span
                    className="text-sm font-bold text-[#181C20]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {study.client}
                  </span>
                  <div className="flex items-center gap-3 text-[10px] font-medium text-[#4B5563]">
                    {study.previewNav.slice(0, 3).map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
                <div className="p-4 grid grid-cols-12 gap-3.5 items-center">
                  <div className="col-span-6 space-y-2">
                    <h3
                      className="text-base font-bold leading-tight text-[#181C20]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {study.headline}
                    </h3>
                    <p className="text-[11px] text-[#4B5563] leading-relaxed line-clamp-3">
                      {study.subheadline}
                    </p>
                    <button
                      type="button"
                      onClick={() => onSelectStudy(study)}
                      className="min-h-[36px] sm:min-h-0 inline-flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-semibold text-white bg-[#181C20] rounded-md cursor-pointer"
                    >
                      <span>{study.previewCta}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="col-span-6 aspect-[4/3] rounded-lg overflow-hidden bg-[#E5E7EB]">
                    {!isImageBroken ? (
                      <img
                        src={study.image}
                        alt={study.imageAlt}
                        width={640}
                        height={480}
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(study.id)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#181C20]" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {viewport === 'mobile' && (
            <div className="w-full max-w-[260px] bg-[#181C20] rounded-[28px] p-2.5 shadow-[0_22px_42px_-16px_rgba(24,28,32,0.34)]">
              <div className="bg-white rounded-[20px] overflow-hidden">
                <div className="pt-2 pb-2 px-3.5 flex items-center justify-between border-b border-[#181C20]/8">
                  <span
                    className="text-xs font-bold text-[#181C20] truncate"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {study.client}
                  </span>
                  <span className="text-[10px] font-mono text-[#6B7280] tabular-nums shrink-0">
                    {study.loadTime}
                  </span>
                </div>
                <div className="p-3 space-y-2.5">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#E5E7EB]">
                    {!isImageBroken ? (
                      <img
                        src={study.image}
                        alt={study.imageAlt}
                        width={640}
                        height={480}
                        decoding="async"
                        fetchPriority={activeIndex === 0 ? 'high' : 'auto'}
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(study.id)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#181C20]" />
                    )}
                  </div>
                  <p className="text-[10px] text-[#6B7280]">{study.previewSecondaryMeta}</p>
                  <h3
                    className="text-sm font-bold leading-snug text-[#181C20]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {study.headline}
                  </h3>
                  <button
                    type="button"
                    onClick={() => onSelectStudy(study)}
                    className="w-full min-h-[40px] py-2 px-3 text-xs font-semibold text-white bg-[#EA580C] active:bg-[#C2410C] rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{study.previewCta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Caption Bar (Clean unboxed metadata with typographic separators) */}
        <div className="pt-3 mt-1 flex flex-wrap items-center justify-between gap-2 text-xs text-[#4B5563]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-[#181C20]">{study.client}</span>
            <span aria-hidden="true">·</span>
            <span>{t.portfolio.categoryLabels[study.category]}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums text-[#C2410C] font-medium">
              {study.metricValue}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onSelectStudy(study)}
            className="min-h-[40px] sm:min-h-0 inline-flex items-center gap-1 font-semibold text-[#181C20] hover:text-[#EA580C] transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>{t.showcase.inspectCaseStudy}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
