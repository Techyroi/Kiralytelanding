import React from 'react';
import { useLanguage } from '../i18n/translations';

export const ProblemFitStrip: React.FC = () => {
  const { t } = useLanguage();
  const pf = t.problemFit;

  return (
    <section
      aria-label={pf.kicker}
      className="bg-white border-t border-[#181C20]/8 py-12 sm:py-16 lg:py-20"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-end pb-8 sm:pb-10 border-b border-[#181C20]/8">
          <div className="lg:col-span-7">
            <p className="text-xs font-medium text-[#C2410C] mb-2.5">{pf.kicker}</p>
            <h2 className="text-2xl sm:text-[2.1rem] font-bold tracking-tight text-[#181C20] leading-[1.12] text-balance">
              {pf.title}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <p className="text-sm sm:text-[15px] leading-relaxed text-[#4B5563] max-w-md lg:ml-auto">
              {pf.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#181C20]/8">
          {pf.items.map((item, idx) => (
            <div
              key={item.number}
              className={`py-6 md:py-8 ${
                idx === 0
                  ? 'md:pr-8'
                  : idx === 1
                    ? 'md:px-8'
                    : 'md:pl-8'
              }`}
            >
              <p className="text-xs font-mono tabular-nums font-semibold text-[#C2410C] mb-2.5">
                {item.number}
              </p>
              <h3 className="text-lg font-bold tracking-tight text-[#181C20] mb-2">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#4B5563]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
