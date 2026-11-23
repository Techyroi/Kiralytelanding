import { Suspense, lazy, useState } from 'react';
import { ArrowRight, Calendar, MessageCircle } from 'lucide-react';
import { MotionConfig, motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { DeviceShowcase } from './components/DeviceShowcase';
import { ProblemFitStrip } from './components/ProblemFitStrip';
import { Trust } from './components/Trust';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { SuccessToast, ToastMessage } from './components/SuccessToast';
import { SeoMeta } from './components/SeoMeta';
import { MobileActionBar } from './components/MobileActionBar';
import { ScrollReveal } from './components/ScrollReveal';
import { OfferCountdown } from './components/OfferCountdown';
import { TrustIndicators } from './components/TrustIndicators';
import { CaseStudy, KIRALYTE_CONTACT } from './data/kiralyteData';
import { useLanguage } from './i18n/translations';

const PortfolioSection = lazy(() =>
  import('./components/PortfolioSection').then((m) => ({ default: m.PortfolioSection })),
);
const TestimonialCarousel = lazy(() =>
  import('./components/TestimonialCarousel').then((m) => ({ default: m.TestimonialCarousel })),
);
const PricingSection = lazy(() =>
  import('./components/PricingSection').then((m) => ({ default: m.PricingSection })),
);
const FaqSection = lazy(() =>
  import('./components/FaqSection').then((m) => ({ default: m.FaqSection })),
);
const ProjectBriefSection = lazy(() =>
  import('./components/ProjectBriefSection').then((m) => ({ default: m.ProjectBriefSection })),
);
const CalendlyModal = lazy(() =>
  import('./components/CalendlyModal').then((m) => ({ default: m.CalendlyModal })),
);

export default function App() {
  const { t, language } = useLanguage();
  const [selectedTierId, setSelectedTierId] = useState<string>('launchpad');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [activeModalStudyId, setActiveModalStudyId] = useState<string | null>(null);
  const [referenceStudyName, setReferenceStudyName] = useState<string | null>(null);
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const [calendlyPrefill, setCalendlyPrefill] = useState<{ name?: string; email?: string }>({});
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeTier =
    t.pricing.tiers.find((tier) => tier.id === selectedTierId) ?? t.pricing.tiers[0];
  const activeModalStudy = activeModalStudyId
    ? t.portfolio.studies.find((study) => study.id === activeModalStudyId) ?? null
    : null;

  const showSuccessToast = (title: string, description: string) => {
    setToast({ id: Date.now(), title, description });
  };

  const openCalendly = (prefill?: { name?: string; email?: string }) => {
    setCalendlyPrefill(prefill ?? {});
    setCalendlyOpen(true);
  };

  const handleCloseCalendly = () => {
    setCalendlyOpen(false);
    showSuccessToast(t.toast.calendlyTitle, t.toast.calendlyDescription);
  };

  const handleBriefSubmitted = ({
    name,
    packageName,
    total,
  }: {
    name: string;
    packageName: string;
    total: number;
  }) => {
    showSuccessToast(
      t.toast.briefTitle,
      t.toast.briefDescription(name, packageName, `$${total.toLocaleString()}`),
    );
  };

  const scrollToBrief = () => {
    const target = document.getElementById('start-project');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId],
    );
  };

  const handleBuildSimilar = (study: CaseStudy) => {
    setReferenceStudyName(study.client);
    setActiveModalStudyId(null);
    if (study.category === 'Landing Pages') {
      setSelectedTierId('launchpad');
    } else if (study.category === 'Portfolios') {
      setSelectedTierId('launchpad');
    } else {
      setSelectedTierId('business-growth');
    }
    scrollToBrief();
  };

  const seoConfig = activeModalStudy
    ? {
        title: `${activeModalStudy.client} ${t.seo.caseStudySuffix}`,
        description: `${activeModalStudy.summary} ${t.seo.resultPrefix} ${activeModalStudy.metricValue} ${activeModalStudy.metricLabel}.`,
        type: 'article' as const,
        image: activeModalStudy.image,
        imageAlt: activeModalStudy.imageAlt,
      }
    : calendlyOpen
      ? {
          title: t.seo.bookingTitle,
          description: t.seo.bookingDescription,
          type: 'website' as const,
          image: '/src/assets/images/olafashion_editorial_1795377403138.jpg',
          imageAlt: 'Kiralyte Technology Solutions multi-device website design showcase',
        }
      : {
          title: t.seo.defaultTitle,
          description: t.seo.defaultDescription,
          type: 'website' as const,
          image: '/src/assets/images/olafashion_editorial_1795377403138.jpg',
          imageAlt: 'Kiralyte Technology Solutions multi-device website design showcase',
        };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: KIRALYTE_CONTACT.legalName,
    url: KIRALYTE_CONTACT.websiteUrl,
    telephone: KIRALYTE_CONTACT.phoneDisplay,
    inLanguage: language,
    sameAs: [KIRALYTE_CONTACT.instagramUrl, KIRALYTE_CONTACT.calendlyUrl],
    description: t.seo.defaultDescription,
    priceRange: '$299 - $1150+',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: language === 'fr' ? 'Forfaits Création de Site Web' : 'Website Design Packages',
      itemListElement: t.pricing.tiers.map((tier) => ({
        '@type': 'Offer',
        name: tier.name,
        description: tier.idealFor,
        price: String(tier.price),
        priceCurrency: 'USD',
      })),
    },
  };

  const whatsappHeroMessage =
    language === 'fr'
      ? 'Bonjour Kiralyte Technology Solutions, j’ai vu votre offre de site web à 299 $ et je souhaite démarrer.'
      : 'Hello Kiralyte Technology Solutions, I saw your $299 website offer and would like to get started.';

  return (
    <MotionConfig reducedMotion="user">
      <SeoMeta
        title={seoConfig.title}
        description={seoConfig.description}
        type={seoConfig.type}
        image={seoConfig.image}
        imageAlt={seoConfig.imageAlt}
        keywords={
          language === 'fr'
            ? [
                'Kiralyte Technology Solutions',
                'création site web professionnel',
                'site vitrine 299 dollars',
                'site web mobile friendly',
                'SEO et IA',
                'portfolio professionnel',
              ]
            : [
                'Kiralyte Technology Solutions',
                'business website design',
                'affordable landing page design',
                'mobile friendly website',
                'SEO and AI ready website',
                'portfolio website design',
              ]
        }
        structuredData={structuredData}
      />
      <div id="top" className="min-h-screen flex flex-col bg-[#F6F7F9] text-[#181C20]">
        <ScrollProgressBar />
        <Navbar
          onStartProject={scrollToBrief}
          onBookCall={() => openCalendly()}
          onMobileMenuChange={setMobileMenuOpen}
        />

        <main className="flex-1">
          {/* Hero Section — Proposition + Live Multi-Device Responsive Showcase */}
          <section className="relative overflow-hidden architectural-grid pt-5 pb-10 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-24">
            <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-12 items-stretch">
                {/* Left Column: Calm 4-Step Conversion Rhythm */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div>
                    {/* 1. Context */}
                    <p className="mb-3 sm:mb-4 text-xs font-medium text-[#4B5563] flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="font-semibold text-[#181C20]">
                        {KIRALYTE_CONTACT.brandName}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#C2410C] font-semibold">{t.hero.offerTag}</span>
                    </p>

                    {/* 2. Headline + Concise Benefit-Driven "Why?" Sub-Copy */}
                    <h1 className="text-[clamp(2rem,8vw,3.6rem)] font-bold tracking-[-0.03em] leading-[1.06] sm:leading-[1.04] text-[#181C20] text-balance">
                      {t.hero.headlinePrefix}{' '}
                      <span className="text-[#EA580C]">{t.hero.headlineAccent}</span>
                    </h1>

                    <p className="mt-3.5 sm:mt-5 text-[15px] sm:text-base leading-[1.6] sm:leading-[1.65] text-[#4B5563] max-w-[46ch]">
                      {t.hero.subcopy}
                    </p>

                    {/* Floating Platform Trust Marquee Directly Under First Paragraph */}
                    <TrustIndicators />

                    {/* 3. Offer Anchor + Subtle Monthly Window Countdown */}
                    <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#181C20]/10">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="text-sm font-medium text-[#4B5563]">
                          {t.hero.startingFrom}
                        </span>
                        <span className="text-3xl sm:text-4xl font-bold font-mono tabular-nums text-[#181C20]">
                          $299
                        </span>
                        <span className="text-xs text-[#6B7280]">{t.hero.offerMeta}</span>
                      </div>
                      <OfferCountdown />
                    </div>

                    {/* 4. Dominant Primary Action + Single-Line Safety Net & WhatsApp */}
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.42, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-5 sm:mt-6 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
                        <motion.button
                          type="button"
                          onClick={() => openCalendly()}
                          whileHover={{ y: -1.5, scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#EA580C] hover:bg-[#C2410C] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <Calendar className="w-4 h-4 shrink-0" />
                          <span>{t.hero.primaryCta}</span>
                        </motion.button>

                        <motion.a
                          href="#pricing"
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-lg border border-[#181C20]/15 bg-white hover:border-[#181C20] text-sm font-semibold text-[#181C20] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>{t.hero.secondaryCta}</span>
                          <ArrowRight className="w-4 h-4 shrink-0" />
                        </motion.a>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#4B5563] leading-relaxed">
                        <span>{t.hero.ctaSubnote}</span>
                        <span aria-hidden="true" className="text-[#181C20]/25">
                          ·
                        </span>
                        <a
                          href={`${KIRALYTE_CONTACT.whatsappBaseUrl}?text=${encodeURIComponent(
                            whatsappHeroMessage,
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-[#181C20] hover:text-[#EA580C] transition-colors py-1"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                          <span>
                            {t.hero.whatsappDirect} {KIRALYTE_CONTACT.phoneDisplay}
                          </span>
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Right Column: Interactive Multi-Device Responsive Showcase */}
                <div className="lg:col-span-7">
                  <DeviceShowcase onSelectStudy={(study) => setActiveModalStudyId(study.id)} />
                </div>
              </div>

              {/* Full-Width 4-Column Proof Strip Below Hero Split (Clean 2x2 mobile grid) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                className="mt-7 sm:mt-12 lg:mt-16 bg-white border border-[#181C20]/8 rounded-2xl grid grid-cols-2 lg:grid-cols-4 overflow-hidden"
              >
                {t.hero.metrics.map((metric, idx) => {
                  const cellBorders = [
                    idx < 2 ? 'border-b lg:border-b-0 border-[#181C20]/8' : '',
                    idx % 2 === 0 ? 'border-r border-[#181C20]/8' : '',
                    idx < 3 ? 'lg:border-r lg:border-[#181C20]/8' : '',
                  ].join(' ');
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.38,
                        delay: 0.18 + idx * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`p-4 sm:p-6 ${cellBorders}`}
                    >
                      <p className="text-xl sm:text-3xl font-bold font-mono tabular-nums text-[#181C20]">
                        {metric.value}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[#4B5563]">{metric.label}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </section>

          <ScrollReveal offsetY={16}>
            <ProblemFitStrip />
          </ScrollReveal>

          <ScrollReveal offsetY={20}>
            <CapabilitiesSection onStartProject={scrollToBrief} />
          </ScrollReveal>

          <Suspense fallback={<div className="min-h-[420px] bg-[#F6F7F9]" aria-hidden="true" />}>
            <ScrollReveal offsetY={20}>
              <PortfolioSection
                activeModalStudyId={activeModalStudyId}
                onOpenStudy={(study) => setActiveModalStudyId(study.id)}
                onCloseStudy={() => setActiveModalStudyId(null)}
                onBuildSimilar={handleBuildSimilar}
              />
            </ScrollReveal>

            <ScrollReveal offsetY={20}>
              <TestimonialCarousel onBookCall={() => openCalendly()} />
            </ScrollReveal>

            <ScrollReveal offsetY={20}>
              <PricingSection
                selectedTierId={selectedTierId}
                selectedAddonIds={selectedAddonIds}
                onSelectTier={setSelectedTierId}
                onToggleAddon={handleToggleAddon}
                onLockQuote={scrollToBrief}
                onBookCall={() => openCalendly()}
              />
            </ScrollReveal>

            <ScrollReveal offsetY={20}>
              <FaqSection onBookCall={() => openCalendly()} />
            </ScrollReveal>

            <ScrollReveal offsetY={16}>
              <Trust />
            </ScrollReveal>

            <ScrollReveal offsetY={20}>
              <ProjectBriefSection
                selectedTierId={selectedTierId}
                selectedAddonIds={selectedAddonIds}
                referenceStudyName={referenceStudyName}
                onSelectTier={setSelectedTierId}
                onBookCall={(prefill) => openCalendly(prefill)}
                onBriefSubmitted={handleBriefSubmitted}
              />
            </ScrollReveal>
          </Suspense>
        </main>

        <Footer />
        <MobileActionBar
          hidden={calendlyOpen || Boolean(activeModalStudyId) || mobileMenuOpen}
          onBookCall={() => openCalendly()}
        />
        <ScrollToTop />
        <SuccessToast toast={toast} onDismiss={() => setToast(null)} />
        {calendlyOpen && (
          <Suspense fallback={null}>
            <CalendlyModal
              open={calendlyOpen}
              onClose={handleCloseCalendly}
              prefill={calendlyPrefill}
              contextLabel={t.modal.contextLabel(activeTier.name, activeTier.priceDisplay)}
            />
          </Suspense>
        )}
      </div>
    </MotionConfig>
  );
}
