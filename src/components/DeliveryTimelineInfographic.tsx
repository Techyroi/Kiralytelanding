import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '../i18n/translations';

interface DeliveryTimelineInfographicProps {
  onStartProject: () => void;
}

export const DeliveryTimelineInfographic: React.FC<DeliveryTimelineInfographicProps> = ({
  onStartProject,
}) => {
  const { t } = useLanguage();
  const timeline = t.capabilities.timeline;
  const steps = timeline.steps;
  const [activeIndex, setActiveIndex] = useState<number>(1); // Highlight Day 2–3 Design-First Sign-Off by default

  const activeStep = steps[activeIndex] ?? steps[0];
  const progressRatio = steps.length > 1 ? activeIndex / (steps.length - 1) : 1;

  return (
    <div className="mt-5 bg-[#181C20] text-white rounded-2xl p-5 sm:p-8 lg:p-10 architectural-grid-dark overflow-hidden">
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 sm:pb-8 border-b border-white/10">
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-[#FB923C] tracking-[0.01em] mb-2">
            {timeline.kicker}
          </p>
          <h3 className="text-2xl sm:text-[1.85rem] font-bold tracking-tight text-white leading-[1.15] text-balance">
            {timeline.title}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#CBD5E1] shrink-0">
          <span>{timeline.clientTimeLabel}</span>
          <span aria-hidden="true" className="text-white/25">
            ·
          </span>
          <span className="font-mono tabular-nums font-semibold text-[#FB923C]">
            {timeline.clientTimeValue}
          </span>
        </div>
      </div>

      {/* Desktop Visual Horizontal Timeline Infographic */}
      <div className="hidden lg:block pt-9 pb-7">
        {/* Connected 7-Day Track */}
        <div className="relative px-4">
          {/* Base Track Rail */}
          <div
            aria-hidden="true"
            className="absolute top-[19px] left-[10%] right-[10%] h-[2px] bg-white/14"
          />
          {/* Active Progress Fill Rail (Compositor-only scaleX) */}
          <div
            aria-hidden="true"
            className="absolute top-[19px] left-[10%] right-[10%] h-[2px] bg-[#EA580C] origin-left transition-transform duration-300 ease-out"
            style={{ transform: `scaleX(${progressRatio})` }}
          />

          <div
            role="tablist"
            aria-label={timeline.kicker}
            className="relative grid grid-cols-5 gap-4"
          >
            {steps.map((step, idx) => {
              const isSelected = idx === activeIndex;
              const isCompleted = idx < activeIndex;
              return (
                <button
                  key={step.day}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveIndex(idx)}
                  className="group text-left flex flex-col items-start cursor-pointer focus-visible:outline-none"
                >
                  {/* Node Circle Centered Above Column */}
                  <div className="w-full flex items-center justify-center mb-5">
                    <span
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono tabular-nums text-xs font-bold transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#EA580C] border-[#EA580C] text-white scale-110 shadow-[0_0_0_6px_rgba(234,88,12,0.18)]'
                          : isCompleted
                            ? 'bg-[#181C20] border-[#EA580C] text-[#FB923C]'
                            : 'bg-[#181C20] border-white/25 text-[#94A3B8] group-hover:border-white/60 group-hover:text-white'
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Step Card Content */}
                  <div
                    className={`w-full rounded-xl p-4 border transition-colors duration-200 ${
                      isSelected
                        ? 'bg-white/[0.08] border-[#EA580C]/70'
                        : 'bg-white/[0.025] border-white/8 group-hover:border-white/22'
                    }`}
                  >
                    <p
                      className={`text-[11px] font-mono tabular-nums font-semibold mb-1.5 ${
                        isSelected ? 'text-[#FB923C]' : 'text-[#94A3B8]'
                      }`}
                    >
                      {step.day}
                    </p>
                    <p className="text-sm font-bold text-white leading-snug mb-1.5">
                      {step.title}
                    </p>
                    <p className="text-xs leading-relaxed text-[#CBD5E1]">{step.summary}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Visual Vertical Connected Stepper Infographic */}
      <div className="lg:hidden py-6">
        <ol className="relative space-y-3">
          {steps.map((step, idx) => {
            const isSelected = idx === activeIndex;
            const isCompleted = idx < activeIndex;
            const isLast = idx === steps.length - 1;

            return (
              <li key={step.day} className="relative pl-11">
                {/* Vertical Connector Line */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className={`absolute left-[15px] top-9 bottom-[-14px] w-[2px] transition-colors ${
                      isCompleted ? 'bg-[#EA580C]' : 'bg-white/14'
                    }`}
                  />
                )}

                {/* Stepper Node */}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-2.5 w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono tabular-nums text-[11px] font-bold transition-colors ${
                    isSelected
                      ? 'bg-[#EA580C] border-[#EA580C] text-white'
                      : isCompleted
                        ? 'bg-[#181C20] border-[#EA580C] text-[#FB923C]'
                        : 'bg-[#181C20] border-white/25 text-[#94A3B8]'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : String(idx + 1).padStart(2, '0')}
                </span>

                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-pressed={isSelected}
                  className={`w-full text-left rounded-xl p-3.5 border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-white/[0.08] border-[#EA580C]/70'
                      : 'bg-white/[0.025] border-white/8 active:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-mono tabular-nums font-semibold text-[#FB923C]">
                      {step.day}
                    </span>
                    <span className="text-[11px] font-mono tabular-nums text-[#94A3B8]">
                      {step.deliverable}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-white leading-snug">{step.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[#CBD5E1]">{step.summary}</p>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Active Milestone Checkpoint Bar + Action */}
      <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="font-mono tabular-nums font-semibold text-[#FB923C]">
            {activeStep.day}
          </span>
          <span aria-hidden="true" className="text-white/25">
            ·
          </span>
          <span className="text-[#94A3B8]">{timeline.deliverableLabel}:</span>
          <span className="font-semibold text-white">{activeStep.deliverable}</span>
          <span aria-hidden="true" className="text-white/25 hidden sm:inline">
            ·
          </span>
          <span className="text-[#CBD5E1] hidden sm:inline">{activeStep.checkpoint}</span>
        </div>

        <button
          type="button"
          onClick={onStartProject}
          className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#EA580C] hover:bg-[#F97316] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>{timeline.cta}</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>
      </div>
    </div>
  );
};
