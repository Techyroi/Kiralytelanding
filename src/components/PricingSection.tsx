import React from 'react';
import { ArrowRight, Calendar, Check, Plus } from 'lucide-react';
import { useLanguage } from '../i18n/translations';

interface PricingSectionProps {
  selectedTierId: string;
  selectedAddonIds: string[];
  onSelectTier: (tierId: string) => void;
  onToggleAddon: (addonId: string) => void;
  onLockQuote: () => void;
  onBookCall: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  selectedTierId,
  selectedAddonIds,
  onSelectTier,
  onToggleAddon,
  onLockQuote,
  onBookCall,
}) => {
  const { t } = useLanguage();
  const tiers = t.pricing.tiers;
  const addons = t.pricing.addons;

  const activeTier = tiers.find((tier) => tier.id === selectedTierId) ?? tiers[0];
  const addonsTotal = addons
    .filter((a) => selectedAddonIds.includes(a.id))
    .reduce((sum, item) => sum + item.price, 0);
  const grandTotal = activeTier.price + addonsTotal;

  return (
    <section
      id="pricing"
      className="cv-auto py-14 sm:py-20 lg:py-28 bg-[#14171A] text-white architectural-grid-dark relative overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-end mb-10 lg:mb-16">
          <div className="lg:col-span-7">
            <p className="text-xs font-medium text-[#FB923C] tracking-[0.01em] mb-3">
              {t.pricing.kicker}
            </p>
            <h2 className="text-3xl sm:text-[2.6rem] font-bold tracking-tight text-white leading-[1.08]">
              {t.pricing.title}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <p className="text-[15px] leading-relaxed text-[#CBD5E1] tracking-[0.01em] max-w-md lg:ml-auto">
              {t.pricing.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {tiers.map((tier) => {
            const isSelected = tier.id === selectedTierId;
            return (
              <div
                key={tier.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-colors duration-200 border ${
                  isSelected
                    ? 'bg-[#1D2227] border-[#EA580C]'
                    : 'bg-[#191D21] border-white/10 hover:border-white/22'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs mb-4">
                    <span
                      className={
                        tier.featured ? 'text-[#FB923C] font-semibold' : 'text-[#94A3B8]'
                      }
                    >
                      {tier.subtitle}
                    </span>
                    <span className="font-mono tabular-nums text-[#94A3B8]">
                      {tier.turnaround}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white tracking-tight">{tier.name}</h3>

                  <div className="mt-4 pb-5 border-b border-white/10 flex items-baseline gap-2">
                    <span className="text-4xl sm:text-[2.75rem] font-bold font-mono tabular-nums text-white">
                      {tier.priceDisplay}
                    </span>
                    <span className="text-xs text-[#94A3B8]">
                      {tier.id === 'commerce-custom'
                        ? t.pricing.startingFixedQuote
                        : t.pricing.oneTimeBuild}
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-[#CBD5E1] tracking-[0.01em]">
                    {tier.idealFor}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-[#E2E8F0] tracking-[0.01em]"
                      >
                        <Check className="w-4 h-4 text-[#FB923C] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 sm:mt-8 pt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTier(tier.id);
                      onLockQuote();
                    }}
                    className={`w-full min-h-[48px] py-3 px-4 rounded-lg text-sm font-semibold transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                      tier.featured || isSelected
                        ? 'bg-[#EA580C] hover:bg-[#F97316] text-white'
                        : 'bg-white/10 hover:bg-white/16 text-white'
                    }`}
                  >
                    {tier.ctaLabel}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 sm:mt-8 bg-[#191D21] border border-white/10 rounded-2xl p-5 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{t.pricing.customizeTitle}</h3>
                  <p className="text-xs text-[#94A3B8] mt-1">
                    {t.pricing.customizeSubtitlePrefix}{' '}
                    <span className="text-white font-medium">{activeTier.name}</span>{' '}
                    {t.pricing.customizeSubtitleSuffix}
                  </p>
                </div>
                <div className="grid grid-cols-3 sm:flex items-center gap-1 bg-[#14171A] p-1 rounded-lg border border-white/10 w-full sm:w-auto">
                  {tiers.map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => onSelectTier(tier.id)}
                      className={`min-h-[44px] sm:min-h-0 px-2 sm:px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 truncate cursor-pointer ${
                        selectedTierId === tier.id
                          ? 'bg-white text-[#14171A] font-semibold'
                          : 'text-[#CBD5E1] hover:text-white'
                      }`}
                    >
                      <span className="sm:hidden">{t.pricing.shortNames[tier.id] ?? tier.name}</span>
                      <span className="hidden sm:inline">{tier.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addons.map((addon) => {
                  const active = selectedAddonIds.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => onToggleAddon(addon.id)}
                      aria-pressed={active}
                      className={`text-left p-4 rounded-xl border transition-colors duration-150 flex items-start justify-between gap-3 cursor-pointer ${
                        active
                          ? 'bg-[#EA580C]/14 border-[#EA580C] text-white'
                          : 'bg-[#14171A] border-white/10 text-[#CBD5E1] hover:border-white/25'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold text-white">{addon.label}</p>
                        <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                          {addon.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end shrink-0 gap-1.5">
                        <span className="text-xs font-mono tabular-nums font-semibold text-[#FB923C]">
                          +${addon.price}
                        </span>
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                            active
                              ? 'bg-[#EA580C] border-[#EA580C] text-white'
                              : 'border-white/25 text-[#94A3B8]'
                          }`}
                          aria-hidden="true"
                        >
                          {active ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <Plus className="w-3.5 h-3.5" />
                          )}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-8 flex flex-col justify-between gap-5">
              <div>
                <p className="text-xs text-[#94A3B8]">{t.pricing.estimatedInvestment}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-bold font-mono tabular-nums text-white">
                    ${grandTotal.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#94A3B8]">USD</span>
                </div>
                <p className="text-xs text-[#CBD5E1] mt-2 leading-relaxed">
                  {t.pricing.includesPrefix} {activeTier.name} (${activeTier.price}){' '}
                  {selectedAddonIds.length > 0
                    ? t.pricing.optionalAddons(selectedAddonIds.length, addonsTotal)
                    : t.pricing.zeroRetainers}
                </p>
              </div>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={onLockQuote}
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-lg text-sm font-semibold text-white bg-[#EA580C] hover:bg-[#F97316] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>{t.pricing.lockQuote}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onBookCall}
                  className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold text-[#E2E8F0] hover:text-white bg-white/8 hover:bg-white/14 border border-white/10 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#FB923C]" />
                  <span>{t.pricing.orBookCall}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Inline Risk Reversal Directly Next to Pricing */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-[#FB923C] whitespace-nowrap">
              {t.pricing.guaranteeTitle}
            </span>
            <p className="text-[#CBD5E1] leading-relaxed">{t.pricing.guaranteeBody}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
