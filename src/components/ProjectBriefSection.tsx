import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calendar, Check, Copy, ExternalLink, MessageCircle, Phone } from 'lucide-react';
import { buildCalendlyEmbedUrl, KIRALYTE_CONTACT } from '../data/kiralyteData';
import { useLanguage } from '../i18n/translations';

interface ProjectBriefSectionProps {
  selectedTierId: string;
  selectedAddonIds: string[];
  referenceStudyName: string | null;
  onSelectTier: (tierId: string) => void;
  onBookCall: (prefill?: { name?: string; email?: string }) => void;
  onBriefSubmitted: (summary: { name: string; packageName: string; total: number }) => void;
}

interface FormValues {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  projectType: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

export const ProjectBriefSection: React.FC<ProjectBriefSectionProps> = ({
  selectedTierId,
  selectedAddonIds,
  referenceStudyName,
  onSelectTier,
  onBookCall,
  onBriefSubmitted,
}) => {
  const { t, language } = useLanguage();
  const [conversionTab, setConversionTab] = useState<'calendly' | 'brief'>('calendly');
  const [inlineCalendarLoaded, setInlineCalendarLoaded] = useState(false);
  const [shouldLoadCalendar, setShouldLoadCalendar] = useState(false);
  const calendarContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldLoadCalendar || conversionTab !== 'calendly') return;
    const node = calendarContainerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setShouldLoadCalendar(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadCalendar(true);
          observer.disconnect();
        }
      },
      { rootMargin: '280px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoadCalendar, conversionTab]);
  const [values, setValues] = useState<FormValues>({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    projectType: 'Business Website',
    notes: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const activeTier = t.pricing.tiers.find((tier) => tier.id === selectedTierId) ?? t.pricing.tiers[0];
  const selectedAddons = t.pricing.addons.filter((addon) => selectedAddonIds.includes(addon.id));
  const estimatedTotal =
    activeTier.price + selectedAddons.reduce((sum, item) => sum + item.price, 0);

  const selectedProjectTypeLabel =
    t.brief.typeOptions.find((opt) => opt.value === values.projectType)?.label ?? values.projectType;

  const buildWhatsAppLink = () => {
    const isFrench = language === 'fr';
    const addonLine =
      selectedAddons.length > 0
        ? `${isFrench ? 'Options' : 'Add-ons'}: ${selectedAddons.map((a) => a.label).join(', ')}`
        : isFrench
          ? 'Options : Aucune'
          : 'Add-ons: None';
    const refLine = referenceStudyName
      ? `${isFrench ? 'Inspiration' : 'Style Reference'}: ${referenceStudyName}`
      : null;
    const msg = [
      isFrench
        ? 'Bonjour Kiralyte Technology Solutions, je souhaite démarrer un projet de site web.'
        : 'Hello Kiralyte Technology Solutions, I would like to claim the website offer.',
      `${isFrench ? 'Nom' : 'Name'}: ${values.name || (isFrench ? 'Nouveau client' : 'Prospective Client')}`,
      values.businessName ? `${isFrench ? 'Entreprise' : 'Business'}: ${values.businessName}` : null,
      `${isFrench ? 'Formule' : 'Package'}: ${activeTier.name} (Est. $${estimatedTotal})`,
      `${isFrench ? 'Type de site' : 'Website Type'}: ${selectedProjectTypeLabel}`,
      addonLine,
      refLine,
      values.notes ? `${isFrench ? 'Objectif' : 'Goal'}: ${values.notes}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    return `${KIRALYTE_CONTACT.whatsappBaseUrl}?text=${encodeURIComponent(msg)}`;
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(KIRALYTE_CONTACT.phoneDisplay);
      setCopiedPhone(true);
      window.setTimeout(() => setCopiedPhone(false), 2200);
    } catch {
      setCopiedPhone(false);
    }
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!values.name.trim() || values.name.trim().length < 2) {
      nextErrors.name = t.brief.errName;
    }
    const digitsOnly = values.phone.replace(/\D/g, '');
    if (digitsOnly.length < 7) {
      nextErrors.phone = t.brief.errPhone;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(values.email.trim())) {
      nextErrors.email = t.brief.errEmail;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    onBriefSubmitted({
      name: values.name.trim(),
      packageName: activeTier.name,
      total: estimatedTotal,
    });
  };

  return (
    <section id="process" className="cv-auto py-14 sm:py-20 lg:py-28 bg-[#F6F7F9]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <div className="pb-12 sm:pb-16 lg:pb-20 border-b border-[#181C20]/10">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-medium text-[#C2410C] mb-3">{t.brief.processKicker}</p>
            <h2 className="text-3xl sm:text-[2.35rem] font-bold tracking-tight text-[#181C20] leading-[1.12]">
              {t.brief.processTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.brief.steps.map((step) => (
              <div
                key={step.number}
                className="bg-white border border-[#181C20]/8 rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-4">
                    <span className="font-mono tabular-nums font-semibold text-[#C2410C]">
                      {step.number}
                    </span>
                    <span className="font-mono tabular-nums text-[#6B7280]">{step.duration}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#181C20] mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-[#4B5563]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          id="start-project"
          className="pt-16 lg:pt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
        >
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs font-medium text-[#C2410C] mb-3">{t.brief.conversionKicker}</p>
              <h2 className="text-3xl sm:text-[2.45rem] font-bold tracking-tight text-[#181C20] leading-[1.1]">
                {t.brief.conversionTitle}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#4B5563]">
                {t.brief.conversionBody}
              </p>
            </div>

            <div className="bg-[#181C20] text-white rounded-2xl p-6 space-y-5">
              <div>
                <p className="text-xs text-[#94A3B8] mb-1.5">{t.brief.callOrWhatsapp}</p>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={KIRALYTE_CONTACT.phoneHref}
                    className="text-2xl sm:text-[1.7rem] font-bold font-mono tabular-nums text-white hover:text-[#FB923C] transition-colors"
                  >
                    {KIRALYTE_CONTACT.phoneDisplay}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-md bg-white/10 hover:bg-white/18 text-white transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#FB923C]" />
                        <span>{t.brief.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.brief.copyNumber}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => onBookCall()}
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#EA580C] hover:bg-[#F97316] text-white text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.brief.bookFreeCall}</span>
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[46px] inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white/10 hover:bg-white/18 text-white text-sm font-semibold transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 text-[#FB923C]" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={KIRALYTE_CONTACT.phoneHref}
                    className="min-h-[46px] inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white/10 hover:bg-white/18 text-white text-sm font-semibold transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{t.brief.callNow}</span>
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-white/12 space-y-2.5 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#94A3B8]">{t.brief.appointmentsLabel}</span>
                  <a
                    href={KIRALYTE_CONTACT.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-[#FB923C] hover:text-white transition-colors"
                  >
                    <span>{t.brief.calendlySlotLabel}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#94A3B8]">{t.brief.websiteLabel}</span>
                  <a
                    href={KIRALYTE_CONTACT.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-white hover:text-[#FB923C] transition-colors"
                  >
                    <span>{KIRALYTE_CONTACT.websiteDisplay}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#94A3B8]">Instagram</span>
                  <a
                    href={KIRALYTE_CONTACT.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-white hover:text-[#FB923C] transition-colors truncate"
                  >
                    <span className="truncate">{KIRALYTE_CONTACT.instagramHandle}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-[#181C20]/10 rounded-2xl p-5 sm:p-8">
            {/* Dual Conversion Mode Switcher: Live Calendly Scheduler | Written Brief */}
            <div className="pb-5 mb-5 border-b border-[#181C20]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div
                role="tablist"
                aria-label={t.brief.conversionKicker}
                className="grid grid-cols-2 sm:inline-flex items-center gap-1 bg-[#F6F7F9] p-1 rounded-lg w-full sm:w-auto"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={conversionTab === 'calendly'}
                  onClick={() => setConversionTab('calendly')}
                  className={`min-h-[42px] sm:min-h-0 px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer inline-flex items-center justify-center gap-1.5 ${
                    conversionTab === 'calendly'
                      ? 'bg-[#181C20] text-white'
                      : 'text-[#4B5563] hover:text-[#181C20]'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t.brief.tabCalendly}</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={conversionTab === 'brief'}
                  onClick={() => setConversionTab('brief')}
                  className={`min-h-[42px] sm:min-h-0 px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    conversionTab === 'brief'
                      ? 'bg-[#181C20] text-white'
                      : 'text-[#4B5563] hover:text-[#181C20]'
                  }`}
                >
                  {t.brief.tabBrief}
                </button>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
                <span className="text-[#4B5563]">
                  <span className="font-semibold text-[#181C20]">{activeTier.name}</span>
                  {selectedAddons.length > 0 && ` · +${selectedAddons.length}`}
                </span>
                <span className="font-mono tabular-nums font-bold text-base text-[#C2410C]">
                  ${estimatedTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {conversionTab === 'calendly' ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#181C20]">
                      {t.brief.pickTimeTitle}
                    </h3>
                    <p className="text-xs text-[#4B5563] mt-0.5">
                      {t.brief.pickTimeSubtitle(activeTier.name)}
                    </p>
                  </div>
                  <a
                    href={KIRALYTE_CONTACT.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#C2410C] hover:text-[#181C20] transition-colors whitespace-nowrap"
                  >
                    <span>{t.brief.openFullCalendar}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div
                  ref={calendarContainerRef}
                  className="relative rounded-xl overflow-hidden border border-[#181C20]/8 bg-[#F6F7F9] h-[540px] sm:h-[660px]"
                >
                  {(!shouldLoadCalendar || !inlineCalendarLoaded) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center bg-white z-10">
                      <div className="w-8 h-8 rounded-full border-2 border-[#181C20]/15 border-t-[#EA580C] animate-spin" />
                      <p className="text-sm font-medium text-[#181C20]">
                        {t.brief.loadingCalendar}
                      </p>
                      <a
                        href={KIRALYTE_CONTACT.calendlyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[40px] inline-flex items-center text-xs font-semibold text-[#C2410C] underline underline-offset-2"
                      >
                        {t.brief.openCalendlyDirect}
                      </a>
                    </div>
                  )}
                  {shouldLoadCalendar && (
                    <iframe
                      title={t.brief.pickTimeTitle}
                      src={buildCalendlyEmbedUrl()}
                      loading="lazy"
                      onLoad={() => setInlineCalendarLoaded(true)}
                      className="w-full h-full border-0 bg-white"
                    />
                  )}
                </div>
              </div>
            ) : submitted ? (
              <div className="py-6 space-y-6">
                <div className="w-12 h-12 rounded-xl bg-[#EA580C]/10 text-[#C2410C] flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#C2410C] mb-2">
                    {t.brief.receivedKicker}
                  </p>
                  <h3 className="text-2xl font-bold text-[#181C20]">
                    {t.brief.receivedTitle(values.name, activeTier.name)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
                    {t.brief.receivedBody(
                      `$${estimatedTotal.toLocaleString()}`,
                      values.businessName || selectedProjectTypeLabel,
                      values.phone,
                    )}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => onBookCall({ name: values.name, email: values.email })}
                    className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t.brief.bookKickoffCall}</span>
                  </button>
                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#181C20] hover:bg-[#374151] text-white text-sm font-semibold transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.brief.sendBriefWhatsapp}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setValues({
                        name: '',
                        businessName: '',
                        phone: '',
                        email: '',
                        projectType: 'Business Website',
                        notes: '',
                      });
                    }}
                    className="min-h-[44px] px-4 py-2.5 rounded-lg border border-[#181C20]/12 text-sm font-semibold text-[#181C20] hover:bg-[#F6F7F9] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {t.brief.editBrief}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="pb-5 border-b border-[#181C20]/8 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-[#181C20]">{t.brief.formTitle}</h3>
                    <p className="text-xs text-[#4B5563] mt-1">
                      {t.brief.selectedLabel}{' '}
                      <span className="font-semibold text-[#181C20]">{activeTier.name}</span>
                      {selectedAddons.length > 0 && ` · +${selectedAddons.length}`}
                      {referenceStudyName && ` · ${t.brief.inspiredBy} ${referenceStudyName}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#6B7280] block">{t.brief.estimatedTotal}</span>
                    <span className="text-xl font-bold font-mono tabular-nums text-[#C2410C]">
                      ${estimatedTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="brief-name"
                      className="block text-xs font-semibold text-[#181C20] mb-1.5"
                    >
                      {t.brief.fieldName}
                    </label>
                    <input
                      id="brief-name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, name: e.target.value }));
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="Adaeze Okafor"
                      className={`w-full min-h-[46px] px-3.5 py-2.5 text-base sm:text-sm rounded-lg border bg-white text-[#181C20] placeholder:text-[#9CA3AF] transition-colors ${
                        errors.name
                          ? 'border-[#DC2626]'
                          : 'border-[#181C20]/15 focus:border-[#EA580C]'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-[#DC2626]" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="brief-business"
                      className="block text-xs font-semibold text-[#181C20] mb-1.5"
                    >
                      {t.brief.fieldBusiness}
                    </label>
                    <input
                      id="brief-business"
                      type="text"
                      autoComplete="organization"
                      value={values.businessName}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, businessName: e.target.value }))
                      }
                      placeholder="OlaFashion Atelier"
                      className="w-full min-h-[46px] px-3.5 py-2.5 text-base sm:text-sm rounded-lg border border-[#181C20]/15 focus:border-[#EA580C] bg-white text-[#181C20] placeholder:text-[#9CA3AF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="brief-phone"
                      className="block text-xs font-semibold text-[#181C20] mb-1.5"
                    >
                      {t.brief.fieldPhone}
                    </label>
                    <input
                      id="brief-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, phone: e.target.value }));
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      placeholder="0802 541 8932"
                      className={`w-full min-h-[46px] px-3.5 py-2.5 text-base sm:text-sm rounded-lg border bg-white text-[#181C20] placeholder:text-[#9CA3AF] ${
                        errors.phone
                          ? 'border-[#DC2626]'
                          : 'border-[#181C20]/15 focus:border-[#EA580C]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-[#DC2626]" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="brief-email"
                      className="block text-xs font-semibold text-[#181C20] mb-1.5"
                    >
                      {t.brief.fieldEmail}
                    </label>
                    <input
                      id="brief-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, email: e.target.value }));
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="you@yourbusiness.com"
                      className={`w-full min-h-[46px] px-3.5 py-2.5 text-base sm:text-sm rounded-lg border bg-white text-[#181C20] placeholder:text-[#9CA3AF] ${
                        errors.email
                          ? 'border-[#DC2626]'
                          : 'border-[#181C20]/15 focus:border-[#EA580C]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-[#DC2626]" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="brief-package"
                      className="block text-xs font-semibold text-[#181C20] mb-1.5"
                    >
                      {t.brief.fieldPackage}
                    </label>
                    <select
                      id="brief-package"
                      value={selectedTierId}
                      onChange={(e) => onSelectTier(e.target.value)}
                      className="w-full min-h-[46px] px-3.5 py-2.5 text-base sm:text-sm rounded-lg border border-[#181C20]/15 focus:border-[#EA580C] bg-white text-[#181C20]"
                    >
                      {t.pricing.tiers.map((tier) => (
                        <option key={tier.id} value={tier.id}>
                          {tier.name} — {tier.priceDisplay}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="brief-type"
                      className="block text-xs font-semibold text-[#181C20] mb-1.5"
                    >
                      {t.brief.fieldType}
                    </label>
                    <select
                      id="brief-type"
                      value={values.projectType}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, projectType: e.target.value }))
                      }
                      className="w-full min-h-[46px] px-3.5 py-2.5 text-base sm:text-sm rounded-lg border border-[#181C20]/15 focus:border-[#EA580C] bg-white text-[#181C20]"
                    >
                      {t.brief.typeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="brief-notes"
                    className="block text-xs font-semibold text-[#181C20] mb-1.5"
                  >
                    {t.brief.fieldNotes}
                  </label>
                  <textarea
                    id="brief-notes"
                    rows={3}
                    value={values.notes}
                    onChange={(e) => setValues((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder={t.brief.notesPlaceholder}
                    className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-lg border border-[#181C20]/15 focus:border-[#EA580C] bg-white text-[#181C20] placeholder:text-[#9CA3AF]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#EA580C] hover:bg-[#C2410C] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>{t.brief.submitCta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-[#6B7280] text-center sm:text-left">
                    {t.brief.noObligation}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
