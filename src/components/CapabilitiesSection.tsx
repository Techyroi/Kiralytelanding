import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n/translations';
import { DeliveryTimelineInfographic } from './DeliveryTimelineInfographic';

interface CapabilitiesSectionProps {
  onStartProject: () => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ onStartProject }) => {
  const { t } = useLanguage();
  const [comparisonMode, setComparisonMode] = useState<'kiralyte' | 'template'>('kiralyte');
  const c = t.capabilities;
  const activeComparison = comparisonMode === 'kiralyte' ? c.compareCustom : c.compareTemplate;

  return (
    <section
      id="capabilities"
      className="cv-auto py-14 sm:py-20 lg:py-28 border-t border-[#181C20]/8 bg-white"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-end mb-10 lg:mb-16">
          <div className="lg:col-span-7">
            <p className="text-xs font-medium text-[#C2410C] mb-3">{c.kicker}</p>
            <h2 className="text-3xl sm:text-[2.5rem] font-bold tracking-tight text-[#181C20] leading-[1.1]">
              {c.title}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <p className="text-[15px] leading-relaxed text-[#4B5563] max-w-md lg:ml-auto">
              {c.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Pillar 1 (col-span-7): Modern Design */}
          <article className="lg:col-span-7 bg-[#F6F7F9] border border-[#181C20]/8 rounded-2xl p-5 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <p className="text-xs font-medium text-[#6B7280]">{c.modernKicker}</p>
                <div
                  role="group"
                  aria-label="Compare generic templates with Kiralyte custom builds"
                  className="grid grid-cols-2 sm:inline-flex items-center gap-1 bg-white p-1 rounded-lg border border-[#181C20]/8 w-full sm:w-auto"
                >
                  <button
                    type="button"
                    onClick={() => setComparisonMode('kiralyte')}
                    aria-pressed={comparisonMode === 'kiralyte'}
                    className={`min-h-[44px] sm:min-h-0 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      comparisonMode === 'kiralyte'
                        ? 'bg-[#181C20] text-white'
                        : 'text-[#4B5563] hover:text-[#181C20]'
                    }`}
                  >
                    {c.toggleCustom}
                  </button>
                  <button
                    type="button"
                    onClick={() => setComparisonMode('template')}
                    aria-pressed={comparisonMode === 'template'}
                    className={`min-h-[44px] sm:min-h-0 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      comparisonMode === 'template'
                        ? 'bg-[#181C20] text-white'
                        : 'text-[#4B5563] hover:text-[#181C20]'
                    }`}
                  >
                    {c.toggleTemplate}
                  </button>
                </div>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-[#181C20] mb-3">
                {c.modernTitle}
              </h3>
              <p className="text-[15px] leading-relaxed text-[#4B5563] max-w-[60ch]">
                {c.modernBody}
              </p>
            </div>

            <div className="bg-white border border-[#181C20]/8 rounded-xl p-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 divide-y sm:divide-y-0 sm:divide-x divide-[#181C20]/8">
                <div className="pt-0">
                  <p className="text-xs text-[#6B7280] mb-1">{c.compareHeaders[0]}</p>
                  <p className="text-sm font-semibold text-[#181C20]">{activeComparison[0]}</p>
                </div>
                <div className="pt-4 sm:pt-0 sm:pl-5">
                  <p className="text-xs text-[#6B7280] mb-1">{c.compareHeaders[1]}</p>
                  <p className="text-sm font-semibold text-[#181C20] font-mono tabular-nums">
                    {activeComparison[1]}
                  </p>
                </div>
                <div className="pt-4 sm:pt-0 sm:pl-5">
                  <p className="text-xs text-[#6B7280] mb-1">{c.compareHeaders[2]}</p>
                  <p className="text-sm font-semibold text-[#181C20]">{activeComparison[2]}</p>
                </div>
              </div>
            </div>
          </article>

          {/* Pillar 2 (col-span-5): Fast Performance */}
          <article className="lg:col-span-5 bg-[#181C20] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              <p className="text-xs font-medium text-[#FB923C] mb-4 tracking-[0.01em]">
                {c.fastKicker}
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-white mb-3">
                {c.fastTitle}
              </h3>
              <p className="text-[15px] leading-relaxed text-[#CBD5E1] tracking-[0.01em]">
                {c.fastBody}
              </p>
            </div>

            <div className="border-t border-white/12 pt-5 grid grid-cols-2 gap-4">
              <div>
                <p className="text-3xl font-bold font-mono tabular-nums text-white">0.8s</p>
                <p className="text-xs text-[#94A3B8] mt-1">{c.fastMetric1Label}</p>
              </div>
              <div>
                <p className="text-3xl font-bold font-mono tabular-nums text-[#FB923C]">95+</p>
                <p className="text-xs text-[#94A3B8] mt-1">{c.fastMetric2Label}</p>
              </div>
            </div>
          </article>

          {/* Pillar 3 (col-span-5): Mobile Friendly */}
          <article className="lg:col-span-5 bg-[#F6F7F9] border border-[#181C20]/8 rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              <p className="text-xs font-medium text-[#6B7280] mb-4">{c.mobileKicker}</p>
              <h3 className="text-2xl font-bold tracking-tight text-[#181C20] mb-3">
                {c.mobileTitle}
              </h3>
              <p className="text-[15px] leading-relaxed text-[#4B5563]">{c.mobileBody}</p>
            </div>

            <div className="border-t border-[#181C20]/8 pt-5 flex items-center justify-between gap-3 text-xs text-[#4B5563]">
              <span>{c.mobileFooterLeft}</span>
              <span className="font-mono tabular-nums font-semibold text-[#181C20] whitespace-nowrap">
                {c.mobileFooterRight}
              </span>
            </div>
          </article>

          {/* Pillar 4 (col-span-7): SEO & AI Ready */}
          <article className="lg:col-span-7 bg-[#F6F7F9] border border-[#181C20]/8 rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-7">
                <p className="text-xs font-medium text-[#6B7280] mb-4">{c.seoKicker}</p>
                <h3 className="text-2xl font-bold tracking-tight text-[#181C20] mb-3">
                  {c.seoTitle}
                </h3>
                <p className="text-[15px] leading-relaxed text-[#4B5563]">{c.seoBody}</p>
              </div>

              <div className="md:col-span-5 bg-white border border-[#181C20]/8 rounded-xl p-4 font-mono text-[11px] leading-relaxed text-[#374151] overflow-x-auto">
                <p className="text-[#C2410C] font-semibold mb-2">application/ld+json</p>
                <pre className="whitespace-pre-wrap break-words text-[11px] text-[#181C20]">
{`{
  "@type": "LocalBusiness",
  "name": "Your Brand",
  "offers": "Verified Services",
  "sameAs": ["Instagram", "Maps"]
}`}
                </pre>
              </div>
            </div>

            <div className="border-t border-[#181C20]/8 pt-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#4B5563]">
                <span>{c.seoTags[0]}</span>
                <span aria-hidden="true">·</span>
                <span>{c.seoTags[1]}</span>
                <span aria-hidden="true">·</span>
                <span>{c.seoTags[2]}</span>
              </div>
              <button
                type="button"
                onClick={onStartProject}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-semibold text-[#C2410C] hover:text-[#181C20] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>{c.seoCta}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        </div>

        {/* Visual Step-by-Step 7-Day Delivery Timeline Infographic */}
        <DeliveryTimelineInfographic onStartProject={onStartProject} />
      </div>
    </section>
  );
};
