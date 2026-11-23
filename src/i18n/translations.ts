import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  CASE_STUDIES,
  CaseStudy,
  PRICING_TIERS,
  PricingTier,
  PROCESS_STEPS,
  SCOPE_ADDONS,
  ScopeAddon,
  TESTIMONIALS,
  Testimonial,
} from '../data/kiralyteData';

export type Language = 'en' | 'fr';

export interface TechStackCopy {
  id: 'react' | 'tailwind' | 'vite' | 'firebase';
  name: string;
  role: string;
  benefit: string;
  metric: string;
}

export interface SiteCopy {
  langName: string;
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    bookingTitle: string;
    bookingDescription: string;
    caseStudySuffix: string;
    resultPrefix: string;
  };
  nav: {
    capabilities: string;
    work: string;
    pricing: string;
    process: string;
    bookCall: string;
    bookFreeCall: string;
    claimOffer: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    offerTag: string;
    headlinePrefix: string;
    headlineAccent: string;
    subcopy: string;
    whyBenefits: Array<{ title: string; detail: string }>;
    startingFrom: string;
    offerMeta: string;
    countdownLabel: string;
    countdownUnits: { days: string; hours: string; minutes: string; seconds: string };
    primaryCta: string;
    ctaSubnote: string;
    secondaryCta: string;
    guaranteeNote: string;
    whatsappDirect: string;
    pillars: [string, string, string, string];
    metrics: Array<{ value: string; label: string }>;
    trustIndicatorsLabel: string;
  };
  problemFit: {
    kicker: string;
    title: string;
    subtitle: string;
    items: Array<{ number: string; title: string; body: string }>;
  };
  showcase: {
    mobile: string;
    tablet: string;
    desktop: string;
    inspectCaseStudy: string;
  };
  trust: {
    heading: string;
    subheading: string;
    hint: string;
    items: TechStackCopy[];
  };
  capabilities: {
    kicker: string;
    title: string;
    subtitle: string;
    modernKicker: string;
    modernTitle: string;
    modernBody: string;
    toggleCustom: string;
    toggleTemplate: string;
    compareHeaders: [string, string, string];
    compareCustom: [string, string, string];
    compareTemplate: [string, string, string];
    fastKicker: string;
    fastTitle: string;
    fastBody: string;
    fastMetric1Label: string;
    fastMetric2Label: string;
    mobileKicker: string;
    mobileTitle: string;
    mobileBody: string;
    mobileFooterLeft: string;
    mobileFooterRight: string;
    seoKicker: string;
    seoTitle: string;
    seoBody: string;
    seoTags: [string, string, string];
    seoCta: string;
    timeline: {
      kicker: string;
      title: string;
      clientTimeLabel: string;
      clientTimeValue: string;
      deliverableLabel: string;
      cta: string;
      steps: Array<{
        day: string;
        title: string;
        summary: string;
        deliverable: string;
        checkpoint: string;
      }>;
    };
  };
  portfolio: {
    kicker: string;
    title: string;
    allWork: string;
    categoryLabels: Record<CaseStudy['category'], string>;
    breakdown: string;
    bottleneck: string;
    solution: string;
    deliverables: string;
    measuredLoad: string;
    buildSimilar: string;
    closeModal: string;
    studies: CaseStudy[];
  };
  testimonials: {
    kicker: string;
    title: string;
    prevLabel: string;
    nextLabel: string;
    measuredImpact: string;
    cta: string;
    items: Testimonial[];
  };
  pricing: {
    kicker: string;
    title: string;
    subtitle: string;
    oneTimeBuild: string;
    startingFixedQuote: string;
    customizeTitle: string;
    customizeSubtitlePrefix: string;
    customizeSubtitleSuffix: string;
    estimatedInvestment: string;
    includesPrefix: string;
    zeroRetainers: string;
    optionalAddons: (count: number, total: number) => string;
    lockQuote: string;
    orBookCall: string;
    guaranteeTitle: string;
    guaranteeBody: string;
    shortNames: Record<string, string>;
    tiers: PricingTier[];
    addons: ScopeAddon[];
  };
  faq: {
    kicker: string;
    title: string;
    subtitle: string;
    ctaPrompt: string;
    ctaButton: string;
    items: Array<{ question: string; answer: string }>;
  };
  brief: {
    processKicker: string;
    processTitle: string;
    steps: typeof PROCESS_STEPS;
    conversionKicker: string;
    conversionTitle: string;
    conversionBody: string;
    callOrWhatsapp: string;
    copyNumber: string;
    copied: string;
    bookFreeCall: string;
    callNow: string;
    appointmentsLabel: string;
    calendlySlotLabel: string;
    websiteLabel: string;
    tabCalendly: string;
    tabBrief: string;
    pickTimeTitle: string;
    pickTimeSubtitle: (tierName: string) => string;
    openFullCalendar: string;
    loadingCalendar: string;
    openCalendlyDirect: string;
    receivedKicker: string;
    receivedTitle: (name: string, tierName: string) => string;
    receivedBody: (total: string, target: string, phone: string) => string;
    bookKickoffCall: string;
    sendBriefWhatsapp: string;
    editBrief: string;
    formTitle: string;
    selectedLabel: string;
    inspiredBy: string;
    estimatedTotal: string;
    fieldName: string;
    fieldBusiness: string;
    fieldPhone: string;
    fieldEmail: string;
    fieldPackage: string;
    fieldType: string;
    fieldNotes: string;
    notesPlaceholder: string;
    typeOptions: Array<{ value: string; label: string }>;
    submitCta: string;
    noObligation: string;
    errName: string;
    errPhone: string;
    errEmail: string;
  };
  trustBadges: {
    items: Array<{ id: 'ssl' | 'gdpr' | 'guarantee'; title: string; description: string }>;
  };
  footer: {
    description: string;
    navigation: string;
    pricingLink: string;
    startLink: string;
    directContact: string;
    bookCallLink: string;
    callWhatsappPrefix: string;
    rights: string;
    pillars: string;
  };
  modal: {
    title: string;
    defaultSubtitle: string;
    openInCalendly: string;
    closeScheduler: string;
    loadingAvailability: string;
    openDirectPrompt: string;
    instantConfirm: string;
    openFullPage: string;
    contextLabel: (tierName: string, price: string) => string;
  };
  toast: {
    calendlyTitle: string;
    calendlyDescription: string;
    briefTitle: string;
    briefDescription: (name: string, pkg: string, total: string) => string;
    dismiss: string;
  };
  scrollTopLabel: string;
}

const EN_COPY: SiteCopy = {
  langName: 'English',
  seo: {
    defaultTitle: 'Kiralyte – Websites That Turn Mobile Visitors Into Clients ($299)',
    defaultDescription:
      'Why a professional website? Build instant buyer trust, lift mobile conversion rates, and lower customer acquisition costs with a fast Kiralyte site from $299 in 7 days.',
    bookingTitle: 'Book a Free 30-Min Website Strategy Call – Kiralyte',
    bookingDescription:
      'Map out a fast, conversion-focused website that increases trust, lifts conversion rates, and lowers acquisition costs. Free 30-minute strategy call with Kiralyte.',
    caseStudySuffix: 'Case Study – Kiralyte Web Design',
    resultPrefix: 'Result:',
  },
  nav: {
    capabilities: 'Capabilities',
    work: 'Selected Work',
    pricing: 'Pricing',
    process: 'Process',
    bookCall: 'Free Launch Plan',
    bookFreeCall: 'Get Your Free Launch Plan',
    claimOffer: 'See $299 Launch Scope',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
  },
  hero: {
    offerTag: '4 launch slots open this month',
    headlinePrefix: 'Turn mobile visitors into',
    headlineAccent: 'paying clients.',
    subcopy:
      'Why a professional website? Buyers judge credibility in 3 seconds—a fast Kiralyte site builds instant trust, lifts mobile conversion rates, and lowers customer acquisition costs.',
    whyBenefits: [
      {
        title: 'Increased Trust',
        detail: 'Look credible in 3 seconds so buyers trust your pricing.',
      },
      {
        title: 'Higher Conversion Rates',
        detail: 'Sub-second mobile pages with one-tap WhatsApp & Calendly booking.',
      },
      {
        title: 'Lower Acquisition Costs',
        detail: 'Capture organic Google & AI leads instead of paying for every click.',
      },
    ],
    startingFrom: 'From',
    offerMeta: '· Fixed price · Live in 7 days',
    countdownLabel: 'This month’s $299 window closes in',
    countdownUnits: { days: 'd', hours: 'h', minutes: 'm', seconds: 's' },
    primaryCta: 'Get Your Free Launch Plan',
    ctaSubnote: 'Free 20-min plan · Approve design on Day 3',
    secondaryCta: 'See $299 Scope',
    guaranteeNote: 'Design-First Guarantee: Approve your homepage on Day 3 before we build.',
    whatsappDirect: 'Or WhatsApp',
    pillars: ['Increased Trust', 'Higher Conversions', 'Lower CAC', 'Google & AI Ready'],
    metrics: [
      { value: '$299', label: 'Fixed launch price, zero monthly agency retainers' },
      { value: '7 Days', label: 'Live and capturing client inquiries in one week' },
      { value: '0.8s', label: 'Loads before impatient mobile shoppers bounce' },
      { value: '100%', label: 'Full code & domain ownership handed over at launch' },
    ],
    trustIndicatorsLabel: 'Powered by & integrated with',
  },
  problemFit: {
    kicker: 'Who Kiralyte Is Built For',
    title: 'Built for founders losing ready buyers to slow links and DM friction.',
    subtitle:
      'If your business already delivers great work but your online presence forces you to over-explain or discount, this build fixes the leak in 7 days.',
    items: [
      {
        number: '01',
        title: 'Paying for ads that leak clicks',
        body: 'Instagram and Google traffic hits a slow page or messy bio link, raising your cost per lead every single week.',
      },
      {
        number: '02',
        title: 'Looking smaller than your work',
        body: 'Buyers check your website before paying. An outdated or missing site makes serious clients hesitate on your pricing.',
      },
      {
        number: '03',
        title: 'Repeating prices in DMs all day',
        body: 'Without a clear offer page and instant booking path, high-intent leads wait for replies—or book a faster competitor.',
      },
    ],
  },
  showcase: {
    mobile: 'Mobile',
    tablet: 'Tablet',
    desktop: 'Desktop',
    inspectCaseStudy: 'Inspect case study',
  },
  trust: {
    heading: 'Production Technology Stack',
    subheading: 'Modern engineering foundations powering every Kiralyte launch',
    hint: 'Tap a technology to inspect its role in your build',
    items: [
      {
        id: 'react',
        name: 'React',
        role: 'Component Architecture',
        benefit:
          'Powers fluid interactive layouts, instant filtering, and modular UI components that scale cleanly as your business grows.',
        metric: 'Reusable UI architecture',
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        role: 'Responsive Design System',
        benefit:
          'Delivers disciplined typography, mobile-first grids, and minimal compiled CSS payloads without bloated stylesheet overhead.',
        metric: '< 12 KB gzipped styles',
      },
      {
        id: 'vite',
        name: 'Vite',
        role: 'High-Speed Build Pipeline',
        benefit:
          'Compiles lean, tree-shaken production bundles and optimized media assets so client websites reach sub-second mobile paint.',
        metric: '0.8s target mobile load',
      },
      {
        id: 'firebase',
        name: 'Firebase',
        role: 'Cloud Hosting & Security',
        benefit:
          'Provides global CDN edge delivery, automatic SSL certificates, and reliable backend routing for forms and client data.',
        metric: '99.95% global edge uptime',
      },
    ],
  },
  capabilities: {
    kicker: '01. Why Your Website Matters',
    title: 'Why growing businesses replace slow links with a Kiralyte site.',
    subtitle:
      'Sending prospects to a messy DM thread or slow template quietly costs you deals. Every Kiralyte build—starting at $299—removes buyer doubt and makes taking action effortless.',
    modernKicker: '01 · Instant Authority',
    modernTitle: 'Look like the obvious choice within three seconds.',
    modernBody:
      'Buyers equate how your website looks with the quality of your work. We structure your offer, proof, and calls to action so serious clients immediately trust your pricing—without asking "are you legit?"',
    toggleCustom: 'Kiralyte Custom',
    toggleTemplate: 'Generic Template',
    compareHeaders: ['First Impression', 'Code Footprint', 'Conversion Path'],
    compareCustom: [
      'Clear offer & direct booking CTA above the fold',
      '~140 KB lean bundle',
      'One-tap WhatsApp & Calendly booking',
    ],
    compareTemplate: [
      'Stock sliders & buried contact links',
      '3.8 MB bloated plugins',
      'Broken forms & lost mobile leads',
    ],
    fastKicker: '02 · Stop Ad Drop-Offs',
    fastTitle: 'Load before impatient mobile shoppers leave.',
    fastBody:
      'Over half of mobile visitors abandon pages that take more than 3 seconds—burning your Instagram and Google ad spend. We compress every asset so your offer appears in under a second on 4G.',
    fastMetric1Label: 'Target first paint on 4G',
    fastMetric2Label: 'Core Web Vitals score target',
    mobileKicker: '03 · Built for Mobile Buyers',
    mobileTitle: 'Effortless on the phones where 80% of your leads arrive.',
    mobileBody:
      'Your prospects tap your link from Instagram, WhatsApp, or mobile search while on the move. Every button is thumb-sized, pricing is clear without pinching, and inquiries take one tap.',
    mobileFooterLeft: 'Tested on iOS Safari & Android Chrome',
    mobileFooterRight: '44px+ tap targets',
    seoKicker: '04 · Google & AI Discovery',
    seoTitle: 'Get found when buyers ask Google, ChatGPT, or Gemini.',
    seoBody:
      'A social profile alone is invisible to search intent. We build clean semantic HTML and Schema.org service data so search engines and AI assistants understand your expertise and recommend your business.',
    seoTags: ['OpenGraph social cards', 'Clean sitemap & robots', 'Semantic heading hierarchy'],
    seoCta: 'Build a site that converts',
    timeline: {
      kicker: '7-Day Delivery Roadmap',
      title: 'From kickoff brief to live, revenue-ready website in one week.',
      clientTimeLabel: 'Total client time needed',
      clientTimeValue: '~30 min across 7 days',
      deliverableLabel: 'Milestone deliverable',
      cta: 'Start Day 1 This Week',
      steps: [
        {
          day: 'Day 1',
          title: 'Kickoff & Offer Map',
          summary: '15-minute scope call to lock your offer, target buyers, and direct booking links.',
          deliverable: 'Written launch roadmap',
          checkpoint: 'Your time: 15 min',
        },
        {
          day: 'Days 2–3',
          title: 'Design-First Sign-Off',
          summary: 'We craft your bespoke mobile & desktop homepage layout for approval before coding.',
          deliverable: 'Day-3 visual sign-off',
          checkpoint: 'Protected by Design-First Guarantee',
        },
        {
          day: 'Days 4–5',
          title: 'Mobile-First Build',
          summary: 'Clean engineering, thumb-friendly navigation, WhatsApp routing & Calendly setup.',
          deliverable: 'Interactive staging URL',
          checkpoint: 'Tested on iOS & Android',
        },
        {
          day: 'Day 6',
          title: 'Speed, SEO & AI Schema',
          summary: 'Asset compression for 0.8s 4G load, OpenGraph cards & Schema.org service markup.',
          deliverable: 'Speed & SEO QA check',
          checkpoint: '95+ Core Web Vitals target',
        },
        {
          day: 'Day 7',
          title: 'Live Launch & Handover',
          summary: 'Domain DNS, automatic HTTPS SSL, analytics verification & full code ownership.',
          deliverable: 'Live site + 100% ownership',
          checkpoint: 'Zero monthly agency retainers',
        },
      ],
    },
  },
  portfolio: {
    kicker: '02. Proven Client Outcomes',
    title: 'Real websites turning mobile clicks into booked revenue.',
    allWork: 'All Work',
    categoryLabels: {
      'Business Sites': 'Business Sites',
      Portfolios: 'Portfolios',
      'Landing Pages': 'Landing Pages',
    },
    breakdown: 'Breakdown',
    bottleneck: 'The Bottleneck',
    solution: 'What Kiralyte Built',
    deliverables: 'Shipped Deliverables',
    measuredLoad: 'Measured mobile load:',
    buildSimilar: 'Build a Website Like This',
    closeModal: 'Close case study breakdown',
    studies: CASE_STUDIES,
  },
  testimonials: {
    kicker: 'Client Outcomes & Reviews',
    title: 'What happens when your website finally sells as hard as you do.',
    prevLabel: 'Previous client review',
    nextLabel: 'Next client review',
    measuredImpact: 'Measured Impact',
    cta: 'Get your free 7-day launch plan',
    items: TESTIMONIALS,
  },
  pricing: {
    kicker: '03. Transparent Pricing · 4 Monthly Launch Slots',
    title: 'One fixed investment from $299. Built to pay for itself fast.',
    subtitle:
      'We cap new launches at 4 per month to protect our 7-day delivery guarantee. One new client often covers the entire build.',
    oneTimeBuild: 'one-time build',
    startingFixedQuote: 'starting fixed quote',
    customizeTitle: 'Customize Your Launch Scope',
    customizeSubtitlePrefix: 'Optional add-ons for your selected',
    customizeSubtitleSuffix: 'package.',
    estimatedInvestment: 'Estimated Project Investment',
    includesPrefix: 'Includes',
    zeroRetainers: 'with zero recurring agency retainers.',
    optionalAddons: (count, total) =>
      `+ ${count} optional add-on${count > 1 ? 's' : ''} ($${total}).`,
    lockQuote: 'Reserve My Build Slot',
    orBookCall: 'Get Your Free Launch Plan First',
    guaranteeTitle: 'Design-First Satisfaction Guarantee',
    guaranteeBody:
      'You approve the visual homepage direction on Day 3 before full development begins. Zero monthly agency retainers and 100% ownership on handover.',
    shortNames: {
      launchpad: 'Launchpad',
      'business-growth': 'Growth',
      'commerce-custom': 'Commerce',
    },
    tiers: PRICING_TIERS,
    addons: SCOPE_ADDONS,
  },
  faq: {
    kicker: 'Common Questions Before Starting',
    title: 'Straight answers before you spend a dollar.',
    subtitle:
      'Every detail on ownership, timelines, copywriting, and ongoing costs—clearly spelled out upfront.',
    ctaPrompt: 'Want a fixed scope for your exact business?',
    ctaButton: 'Get Your Free Launch Plan',
    items: [
      {
        question: 'Are there any hidden monthly agency fees after the $299 build?',
        answer:
          'No. Your $299 Launchpad fee is a one-time fixed build cost. You never pay Kiralyte a mandatory monthly retainer—only standard domain registration if you need a new .com (typically ~$12–$15/year paid directly to your registrar).',
      },
      {
        question: 'What if I don’t love the design once we start?',
        answer:
          'Every project includes our Design-First Guarantee. On Day 3 you review the live homepage layout before full development proceeds, backed by structured revision rounds and our satisfaction guarantee before final sign-off.',
      },
      {
        question: 'Do I own 100% of my website, code, and domain?',
        answer:
          'Yes. On Day 7 we hand over full ownership of your codebase, domain DNS settings, and analytics accounts. You are never locked into a proprietary builder or trapped with an agency.',
      },
      {
        question: 'What if I don’t have finished copy or professional photos yet?',
        answer:
          'You don’t need everything polished before starting. We map your core offer and headline structure during kickoff, optimize any photos you already have, and offer an optional $90 Conversion Copywriting add-on if you want us to write every section.',
      },
      {
        question: 'How fast can we actually go live, and what do you need from me?',
        answer:
          'Launchpad builds go live in 7 days (or 4 days with the Express Sprint). All we need on Day 1 is a 15-minute scope call or written brief, your business name/logo, pricing or service details, and your WhatsApp/booking links.',
      },
    ],
  },
  brief: {
    processKicker: '04. Launch Process',
    processTitle: 'From a 15-minute brief to a live, lead-ready website in 7 days.',
    steps: PROCESS_STEPS,
    conversionKicker: 'Start Capturing More Clients',
    conversionTitle: 'Stop losing ready buyers to a slow or missing website.',
    conversionBody:
      'Book a free 30-minute strategy call on Calendly to map your launch, send your brief for a written plan within 2 business hours, or message Kiralyte directly on WhatsApp.',
    callOrWhatsapp: 'Call or WhatsApp Direct',
    copyNumber: 'Copy number',
    copied: 'Copied',
    bookFreeCall: 'Get Your Free Launch Plan',
    callNow: 'Call Now',
    appointmentsLabel: 'Appointments',
    calendlySlotLabel: 'Free Launch Plan Call',
    websiteLabel: 'Website',
    tabCalendly: 'Free Launch Plan',
    tabBrief: 'Send Project Brief',
    pickTimeTitle: 'Pick a Time for Your 30-Min Strategy Call',
    pickTimeSubtitle: (tierName) =>
      `Live availability via Calendly · Free scope review for your ${tierName} website`,
    openFullCalendar: 'Open full calendar',
    loadingCalendar: 'Loading Kiralyte booking calendar...',
    openCalendlyDirect: 'Open Calendly directly',
    receivedKicker: 'Project Brief Received',
    receivedTitle: (name, tierName) => `Thank you, ${name}. Your ${tierName} quote is reserved.`,
    receivedBody: (total, target, phone) =>
      `We have recorded your estimated scope of ${total} for ${target}. Expect a direct message on ${phone} within 2 business hours.`,
    bookKickoffCall: 'Book Your 30-Min Kickoff Call',
    sendBriefWhatsapp: 'Send Brief on WhatsApp',
    editBrief: 'Edit Brief',
    formTitle: 'Start Your Website Brief',
    selectedLabel: 'Selected:',
    inspiredBy: 'Inspired by',
    estimatedTotal: 'Estimated total',
    fieldName: 'Full Name *',
    fieldBusiness: 'Business or Brand Name',
    fieldPhone: 'WhatsApp / Phone Number *',
    fieldEmail: 'Email Address *',
    fieldPackage: 'Selected Package',
    fieldType: 'What Are You Building?',
    fieldNotes: 'Project Goals or Timeline (Optional)',
    notesPlaceholder:
      'Tell us what your business sells, any reference websites you admire, and your ideal launch date.',
    typeOptions: [
      { value: 'Business Website', label: 'Basic Business Website' },
      { value: 'Portfolio Website', label: 'Executive / Creative Portfolio' },
      { value: 'Landing Page', label: 'High-Converting Landing Page' },
      { value: 'Online Storefront', label: 'Product Showcase / Storefront' },
    ],
    submitCta: 'Reserve My Website Slot',
    noObligation: 'No upfront obligation · Written scope sent in 2 hours',
    errName: 'Please enter your full name.',
    errPhone: 'Enter a valid phone or WhatsApp number.',
    errEmail: 'Enter a valid email address so we can send your scope.',
  },
  trustBadges: {
    items: [
      {
        id: 'ssl',
        title: 'SSL Secured',
        description:
          'End-to-end HTTPS encryption configured on every launch to protect visitors and inquiry data.',
      },
      {
        id: 'gdpr',
        title: 'GDPR Compliant',
        description:
          'Privacy-first data handling, clean consent controls, and strict client confidentiality.',
      },
      {
        id: 'guarantee',
        title: 'Money-Back Satisfaction Guarantee',
        description:
          'Clear design sign-off milestones backed by our satisfaction guarantee before final launch.',
      },
    ],
  },
  footer: {
    description:
      'Modern, fast, mobile-first business websites, portfolios, and conversion landing pages engineered for Google search and AI discovery.',
    navigation: 'Navigation',
    pricingLink: 'Pricing ($299 Offer)',
    startLink: 'Start Your Website',
    directContact: 'Direct Contact',
    bookCallLink: 'Book Free 30-Min Strategy Call →',
    callWhatsappPrefix: 'Call / WhatsApp:',
    rights: 'All rights reserved.',
    pillars: 'Modern · Fast · Mobile Friendly · SEO & AI Ready',
  },
  modal: {
    title: 'Book Your Free 30-Min Strategy Call',
    defaultSubtitle: 'Kiralyte Technology Solutions · Pick a time that works for you',
    openInCalendly: 'Open in Calendly',
    closeScheduler: 'Close booking scheduler',
    loadingAvailability: 'Loading live availability...',
    openDirectPrompt: 'Prefer to open Calendly directly?',
    instantConfirm: 'Instant calendar confirmation',
    openFullPage: 'Open full page',
    contextLabel: (tierName, price) =>
      `Selected package: ${tierName} (${price}) · Free 30-min website strategy call`,
  },
  toast: {
    calendlyTitle: 'Booking scheduler closed',
    calendlyDescription:
      'If you booked a 30-min slot, Calendly has emailed your confirmation. You can also reach us on WhatsApp anytime.',
    briefTitle: 'Project brief received',
    briefDescription: (name, pkg, total) =>
      `Thanks, ${name}. Your ${pkg} estimate (${total}) is reserved—expect a reply within 2 hours.`,
    dismiss: 'Dismiss notification',
  },
  scrollTopLabel: 'Scroll back to top',
};

const FR_COPY: SiteCopy = {
  langName: 'Français',
  seo: {
    defaultTitle: 'Kiralyte – Sites Web Qui Convertissent Vos Visites Mobiles ($299)',
    defaultDescription:
      'Pourquoi un site web professionnel ? Renforcez la confiance, augmentez vos taux de conversion et réduisez votre coût d’acquisition client dès 299 $ en 7 jours.',
    bookingTitle: 'Réserver un Appel Stratégique de 30 Min – Kiralyte',
    bookingDescription:
      'Planifiez un appel gratuit de 30 minutes avec Kiralyte Technology Solutions pour bâtir un site qui inspire confiance, convertit mieux et réduit votre coût d’acquisition.',
    caseStudySuffix: 'Étude de Cas – Kiralyte Web Design',
    resultPrefix: 'Résultat :',
  },
  nav: {
    capabilities: 'Expertise',
    work: 'Réalisations',
    pricing: 'Tarifs',
    process: 'Méthode',
    bookCall: 'Plan Gratuit',
    bookFreeCall: 'Obtenir Mon Plan de Lancement',
    claimOffer: 'Voir le Forfait à 299 $',
    openMenu: 'Ouvrir le menu de navigation',
    closeMenu: 'Fermer le menu de navigation',
  },
  hero: {
    offerTag: '4 créneaux ouverts ce mois-ci',
    headlinePrefix: 'Transformez vos visites mobiles en',
    headlineAccent: 'clients payants.',
    subcopy:
      'Pourquoi un site web professionnel ? Vos clients jugent votre sérieux en 3 secondes—un site Kiralyte renforce la confiance, augmente vos conversions et réduit votre coût d’acquisition.',
    whyBenefits: [
      {
        title: 'Confiance Renforcée',
        detail: 'Prouvez votre sérieux en 3 secondes pour justifier vos tarifs.',
      },
      {
        title: 'Conversions Plus Élevées',
        detail: 'Pages mobiles sous la seconde et accès WhatsApp & Calendly en un clic.',
      },
      {
        title: 'Coût d’Acquisition Réduit',
        detail: 'Captez du trafic Google & IA au lieu de payer chaque clic publicitaire.',
      },
    ],
    startingFrom: 'Dès',
    offerMeta: '· Prix fixe · En ligne en 7 jours',
    countdownLabel: 'Fin des créneaux à 299 $ ce mois dans',
    countdownUnits: { days: 'j', hours: 'h', minutes: 'm', seconds: 's' },
    primaryCta: 'Obtenir Mon Plan de Lancement',
    ctaSubnote: 'Plan offert en 20 min · Maquette validée au Jour 3',
    secondaryCta: 'Voir l’Offre 299 $',
    guaranteeNote: 'Garantie Design d’Abord : Validez la maquette au Jour 3 avant le code.',
    whatsappDirect: 'Ou WhatsApp',
    pillars: ['Confiance Renforcée', 'Conversions Élevées', 'CAC Réduit', 'Google & Prêt IA'],
    metrics: [
      { value: '$299', label: 'Prix fixe de lancement, sans abonnement caché' },
      { value: '7 Jours', label: 'En ligne et prêt à recevoir vos clients en une semaine' },
      { value: '0.8s', label: 'S’affiche avant que vos visiteurs mobiles ne partent' },
      { value: '100%', label: 'Propriété totale du code et du domaine dès la livraison' },
    ],
    trustIndicatorsLabel: 'Propulsé et intégré avec',
  },
  problemFit: {
    kicker: 'Pour Qui Nous Construisons',
    title: 'Pensé pour les fondateurs qui perdent des clients à cause de liens lents.',
    subtitle:
      'Si vous offrez déjà un excellent service mais que votre image en ligne vous oblige à vous justifier, nous réglons ce frein en 7 jours.',
    items: [
      {
        number: '01',
        title: 'Des publicités qui fuient',
        body: 'Vos clics Instagram et Google arrivent sur une page lente ou un lien bio confus, faisant grimper votre coût par prospect.',
      },
      {
        number: '02',
        title: 'Paraître plus petit que votre niveau',
        body: 'Les clients vérifient votre site avant de payer. Un site daté ou absent crée le doute sur vos tarifs.',
      },
      {
        number: '03',
        title: 'Répéter vos prix en DM toute la journée',
        body: 'Sans offre claire ni réservation directe, vos meilleurs prospects attendent une réponse—ou choisissent un concurrent plus rapide.',
      },
    ],
  },
  showcase: {
    mobile: 'Mobile',
    tablet: 'Tablette',
    desktop: 'Bureau',
    inspectCaseStudy: 'Voir l’étude de cas',
  },
  trust: {
    heading: 'Architecture Technique de Production',
    subheading: 'Des technologies modernes et éprouvées derrière chaque lancement Kiralyte',
    hint: 'Touchez une technologie pour voir son rôle dans votre site',
    items: [
      {
        id: 'react',
        name: 'React',
        role: 'Architecture Modulaire',
        benefit:
          'Assure des interfaces fluides, des filtres instantanés et des composants évolutifs qui accompagnent la croissance de votre activité.',
        metric: 'Interface évolutive',
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        role: 'Système Design Responsive',
        benefit:
          'Garantit une typographie rigoureuse, des grilles mobile-first et des feuilles de style ultra-légères sans code superflu.',
        metric: '< 12 Ko CSS compressé',
      },
      {
        id: 'vite',
        name: 'Vite',
        role: 'Compilation Haute Vitesse',
        benefit:
          'Produit des bundles optimisés et des médias compressés afin que votre site s’affiche en moins d’une seconde sur mobile.',
        metric: '0,8 s visé sur mobile',
      },
      {
        id: 'firebase',
        name: 'Firebase',
        role: 'Hébergement Cloud & SSL',
        benefit:
          'Offre une diffusion CDN mondiale, des certificats HTTPS automatiques et un routage fiable pour vos formulaires clients.',
        metric: '99,95 % de disponibilité',
      },
    ],
  },
  capabilities: {
    kicker: '01. Pourquoi Un Vrai Site Change Tout',
    title: 'Pourquoi les entreprises ambitieuses remplacent leurs liens lents par Kiralyte.',
    subtitle:
      'Un lien lent ou des échanges confus en messages privés vous coûtent des ventes chaque jour. Chaque site Kiralyte—dès 299 $—lève les doutes et accélère la prise de contact.',
    modernKicker: '01 · Crédibilité Immédiate',
    modernTitle: 'Apparaissez comme le choix évident en trois secondes.',
    modernBody:
      'Vos clients jugent la qualité de vos services à travers votre site. Nous mettons en valeur votre offre et vos preuves pour justifier vos tarifs sans friction.',
    toggleCustom: 'Sur Mesure Kiralyte',
    toggleTemplate: 'Modèle Générique',
    compareHeaders: ['Première Impression', 'Poids du Code', 'Parcours de Conversion'],
    compareCustom: [
      'Offre claire & prise de rendez-vous immédiate',
      '~140 Ko bundle optimisé',
      'WhatsApp en un clic & réservation Calendly',
    ],
    compareTemplate: [
      'Carrousels génériques & contacts cachés',
      '3,8 Mo de plugins lourds',
      'Formulaires lents & prospects perdus',
    ],
    fastKicker: '02 · Stop Aux Abandons',
    fastTitle: 'Affichez votre offre avant que vos prospects mobiles ne partent.',
    fastBody:
      'Plus de la moitié des visiteurs mobiles quittent une page qui dépasse 3 secondes—gaspillant votre budget pub. Nous optimisons chaque média pour un affichage sous la seconde en 4G.',
    fastMetric1Label: 'Premier affichage visé en 4G',
    fastMetric2Label: 'Score Core Web Vitals visé',
    mobileKicker: '03 · Conçu Pour Le Mobile',
    mobileTitle: 'Fluide sur les smartphones d’où viennent 80 % de vos prospects.',
    mobileBody:
      'Vos clients cliquent depuis Instagram, WhatsApp ou Google en déplacement. Chaque bouton est pensé pour le pouce, les tarifs restent lisibles et la prise de contact se fait en un geste.',
    mobileFooterLeft: 'Testé sur iOS Safari & Android Chrome',
    mobileFooterRight: 'Zones tactiles 44px+',
    seoKicker: '04 · Visibilité Google & IA',
    seoTitle: 'Soyez recommandé par Google, ChatGPT et Gemini.',
    seoBody:
      'Un simple profil social reste invisible aux recherches d’achat. Nous structurons votre HTML et vos données Schema.org pour que Google et les moteurs IA recommandent votre entreprise.',
    seoTags: ['Cartes sociales OpenGraph', 'Sitemap & robots propres', 'Hiérarchie sémantique'],
    seoCta: 'Créer un site qui convertit',
    timeline: {
      kicker: 'Feuille de Route 7 Jours',
      title: 'Du brief initial à un site en ligne et prêt à vendre en une semaine.',
      clientTimeLabel: 'Temps client total requis',
      clientTimeValue: '~30 min sur 7 jours',
      deliverableLabel: 'Livrable d’étape',
      cta: 'Lancer le Jour 1 Cette Semaine',
      steps: [
        {
          day: 'Jour 1',
          title: 'Cadrage & Offre',
          summary: 'Appel de 15 min pour valider votre offre, vos clients cibles et vos liens directs.',
          deliverable: 'Plan écrit de lancement',
          checkpoint: 'Votre temps : 15 min',
        },
        {
          day: 'Jours 2–3',
          title: 'Validation Design',
          summary: 'Création de la maquette mobile et bureau soumise à votre accord avant le code.',
          deliverable: 'Accord visuel Jour 3',
          checkpoint: 'Couvert par la Garantie Design',
        },
        {
          day: 'Jours 4–5',
          title: 'Développement Mobile',
          summary: 'Intégration rapide, navigation tactile, routage WhatsApp et agenda Calendly.',
          deliverable: 'Lien de prévisualisation',
          checkpoint: 'Testé sur iOS & Android',
        },
        {
          day: 'Jour 6',
          title: 'Vitesse, SEO & IA',
          summary: 'Compression 4G sous la seconde, cartes OpenGraph et balisage Schema.org.',
          deliverable: 'Contrôle vitesse & SEO',
          checkpoint: 'Objectif 95+ Core Web Vitals',
        },
        {
          day: 'Jour 7',
          title: 'Mise en Ligne & Remise',
          summary: 'Domaine, certificat SSL HTTPS, analytics vérifiés et propriété totale du site.',
          deliverable: 'Site en ligne + 100 % propriété',
          checkpoint: 'Sans abonnement mensuel',
        },
      ],
    },
  },
  portfolio: {
    kicker: '02. Résultats Clients Mesurés',
    title: 'Des sites réels qui transforment le trafic mobile en revenus.',
    allWork: 'Tous les Projets',
    categoryLabels: {
      'Business Sites': 'Sites Vitrines',
      Portfolios: 'Portfolios',
      'Landing Pages': 'Pages de Conversion',
    },
    breakdown: 'Détails',
    bottleneck: 'Le Frein Initial',
    solution: 'La Solution Kiralyte',
    deliverables: 'Livrables Inclus',
    measuredLoad: 'Temps mobile mesuré :',
    buildSimilar: 'Créer un Site Similaire',
    closeModal: 'Fermer l’étude de cas',
    studies: [
      {
        ...CASE_STUDIES[0],
        turnaround: 'Livré en 8 jours',
        headline: 'L’Élégance à Chaque Instant',
        subheadline:
          'Silhouettes de soirée sur mesure, maroquinerie structurée et bijoux choisis pour une clientèle privée.',
        metricLabel: 'demandes WhatsApp et catalogue en 60 jours',
        summary:
          'Remplacement d’un catalogue social lent par une vitrine éditoriale rapide conçue pour la navigation mobile et la commande directe sur WhatsApp.',
        challenge:
          'Les clientes abandonnaient dans les messages Instagram faute de prix clairs et à cause de pages mobiles dépassant 5 secondes de chargement.',
        solution:
          'Conception d’une boutique éditoriale légère avec routage WhatsApp pré-rempli par collection et données structurées pour Google.',
        deliverables: [
          'Vitrine responsive bureau, tablette et mobile',
          'Commande WhatsApp pré-remplie en un clic',
          'Images éditoriales optimisées (0,7 s sur mobile)',
          'Balisage Schema.org produit et entreprise locale',
        ],
        previewNav: ['Collections', 'Atelier', 'Accessoires', 'Contact'],
        previewCta: 'Voir la Collection',
        previewSecondaryMeta: 'Nouvelle Saison · Essayage Privé',
      },
      {
        ...CASE_STUDIES[1],
        turnaround: 'Livré en 9 jours',
        headline: 'Des Espaces Façonnés par la Lumière',
        subheadline:
          'Architecture résidentielle et aménagement intérieur sur mesure pour résidences privées et hôtels-boutiques.',
        metricValue: '11 Projets',
        metricLabel: 'mandats résidentiels qualifiés au T1',
        summary:
          'Transformation d’une brochure PDF lourde en portfolio architectural sobre, conçu pour convaincre promoteurs et propriétaires.',
        challenge:
          'Les prospects devaient télécharger des fichiers PDF de 40 Mo par e-mail, sans aucune visibilité sur les recherches Google.',
        solution:
          'Création d’une archive éditoriale plein écran avec formulaire de brief architectural et référencement local ciblé.',
        deliverables: [
          'Portfolio éditorial & vues détaillées des résidences',
          'Formulaire interactif de consultation et cahier des charges',
          'Données structurées lisibles par les moteurs IA',
          'Chargement galerie sous la seconde sur mobile',
        ],
        previewNav: ['Projets', 'Studio', 'Journal', 'Contact'],
        previewCta: 'Voir les Résidences',
        previewSecondaryMeta: 'Résidentiel · Hôtellerie · Intérieurs',
      },
      {
        ...CASE_STUDIES[2],
        turnaround: 'Livré en 6 jours',
        headline: 'Torréfaction Artisanale pour l’Hôtellerie',
        subheadline:
          'Grains d’origine unique d’Afrique de l’Est torréfiés chaque semaine pour hôtels, cafés et bureaux.',
        metricLabel: 'demandes de coffrets dégustation en 90 jours',
        summary:
          'Création d’une page de conversion B2B alliant photographie studio sombre et demande d’échantillons en 30 secondes.',
        challenge:
          'Les campagnes sociales envoyaient les acheteurs vers une page confuse aux formulaires mobiles défaillants.',
        solution:
          'Déploiement d’une page de conversion dédiée avec fiches de torréfaction claires et transmission directe WhatsApp & e-mail.',
        deliverables: [
          'Page de conversion B2B dédiée aux coffrets dégustation',
          'Formulaire validé et relais WhatsApp instantané',
          'Optimisation SEO local et entités IA',
          'Suivi analytique sur chaque point de contact',
        ],
        previewNav: ['Origines', 'Grossiste', 'Guide', 'Dégustation'],
        previewCta: 'Demander un Coffret',
        previewSecondaryMeta: 'Torréfié Chaque Semaine · Commerce Direct',
      },
    ],
  },
  testimonials: {
    kicker: 'Retours Clients & Résultats',
    title: 'Ce qui arrive quand votre site vend enfin aussi bien que vous.',
    prevLabel: 'Avis client précédent',
    nextLabel: 'Avis client suivant',
    measuredImpact: 'Impact Mesuré',
    cta: 'Obtenir votre plan de lancement offert',
    items: [
      {
        ...TESTIMONIALS[0],
        projectType: 'Site Vitrine',
        turnaround: 'Livré en 8 jours',
        outcome: '+165 % de demandes mobiles en 60 jours',
        quote:
          'Avant la refonte par Kiralyte, nos clientes peinaient à parcourir nos robes sur mobile. Deux mois après le lancement, nos demandes d’essayage sur WhatsApp ont plus que doublé.',
      },
      {
        ...TESTIMONIALS[1],
        projectType: 'Portfolio Architectural',
        turnaround: 'Livré en 9 jours',
        outcome: '11 projets qualifiés au 1er trimestre',
        quote:
          'Nous envoyions auparavant des dossiers PDF trop lourds sur téléphone. Kiralyte a livré un portfolio net et rapide en neuf jours qui génère désormais des demandes via Google.',
      },
      {
        ...TESTIMONIALS[2],
        projectType: 'Page de Conversion',
        turnaround: 'Livré en 6 jours',
        outcome: '+88 % de devis grossistes',
        quote:
          'Nos publicités Instagram redirigeaient vers une page encombrée. Kiralyte a lancé une page claire en six jours et nos demandes de coffrets dégustation ont bondi immédiatement.',
      },
      {
        ...TESTIMONIALS[3],
        projectType: 'Site Corporate',
        turnaround: 'Livré en 7 jours',
        outcome: '2 contrats signés en 30 jours',
        quote:
          'Nous avions besoin d’une présence web crédible avant une présentation majeure sans attendre deux mois. Kiralyte a tout livré en une semaine avec prise de rendez-vous intégrée.',
      },
    ],
  },
  pricing: {
    kicker: '03. Tarifs Transparents · 4 Créneaux Mensuels',
    title: 'Un tarif fixe dès 299 $. Pensé pour être rentabilisé très vite.',
    subtitle:
      'Nous limitons nos lancements à 4 projets par mois pour garantir la livraison en 7 jours. Un seul client couvre souvent tout le projet.',
    oneTimeBuild: 'paiement unique',
    startingFixedQuote: 'devis fixe de départ',
    customizeTitle: 'Personnalisez Votre Périmètre',
    customizeSubtitlePrefix: 'Options facultatives pour votre formule',
    customizeSubtitleSuffix: '.',
    estimatedInvestment: 'Investissement Estimé',
    includesPrefix: 'Inclut',
    zeroRetainers: 'sans abonnement mensuel obligatoire.',
    optionalAddons: (count, total) =>
      `+ ${count} option${count > 1 ? 's' : ''} choisie${count > 1 ? 's' : ''} (${total} $).`,
    lockQuote: 'Réserver Mon Créneau',
    orBookCall: 'Obtenir Mon Plan Gratuit d’Abord',
    guaranteeTitle: 'Garantie Design d’Abord & Satisfaction',
    guaranteeBody:
      'Vous validez la direction visuelle de votre page d’accueil au Jour 3 avant le développement complet. Aucun abonnement caché et 100 % de propriété.',
    shortNames: {
      launchpad: 'Lancement',
      'business-growth': 'Croissance',
      'commerce-custom': 'Sur Mesure',
    },
    tiers: [
      {
        ...PRICING_TIERS[0],
        name: 'Lancement',
        subtitle: '4 Créneaux / Mois',
        turnaround: 'Livraison 7 jours',
        idealFor:
          'Idéal pour les sites vitrines essentiels, portfolios personnels et pages de conversion efficaces.',
        features: [
          'Design responsive sur mesure (Mobile, Tablette & Bureau)',
          'Jusqu’à 3 pages dédiées ou page de conversion complète',
          'Bouton WhatsApp direct, appel en un clic & formulaire validé',
          'SEO fondamental & balisage structuré prêt pour l’IA',
          'Optimisation vitesse sous la seconde & certificat SSL',
          '1 cycle de révisions structurées avant la mise en ligne',
        ],
        ctaLabel: 'Choisir Lancement ($299)',
      },
      {
        ...PRICING_TIERS[1],
        name: 'Croissance',
        subtitle: 'Le Plus Choisi',
        turnaround: 'Livraison 10–14 jours',
        idealFor:
          'Idéal pour les PME, agences et entreprises de services cherchant un flux continu de prospects.',
        features: [
          'Jusqu’à 6 pages sur mesure avec système graphique complet',
          'Catalogue de services, portfolio ou bibliothèque d’études de cas',
          'SEO local avancé, Google Analytics 4 & visibilité IA',
          'Parcours de conversion avec routage automatisé des prospects',
          '2 cycles de révisions + documentation de prise en main',
          '30 jours de support technique offert après le lancement',
        ],
        ctaLabel: 'Choisir Croissance ($680)',
      },
      {
        ...PRICING_TIERS[2],
        name: 'Commerce & Sur Mesure',
        subtitle: 'Vitrine Digitale Complète',
        turnaround: 'Livraison 2–3 semaines',
        idealFor:
          'Idéal pour les boutiques en ligne, plateformes de réservation et marques à besoins spécifiques.',
        features: [
          'Boutique e-commerce ou portail de réservation client complet',
          'Lookbooks interactifs, filtres & intégration des paiements',
          'Automatisations CRM, e-mail et WhatsApp Business',
          'Audit SEO technique complet, graphe Schema & garantie vitesse',
          'Sprints dédiés avec démonstrations hebdomadaires',
          '60 jours de support prioritaire et suivi de performance',
        ],
        ctaLabel: 'Choisir Sur Mesure ($1,150)',
      },
    ],
    addons: [
      {
        ...SCOPE_ADDONS[0],
        label: 'Domaine & E-mail Pro',
        description: 'Configuration .com, sécurité DNS et boîte professionnelle dédiée',
      },
      {
        ...SCOPE_ADDONS[1],
        label: 'Rédaction Orientée Vente',
        description: 'Titres clairs et textes de services rédigés pour convaincre',
      },
      {
        ...SCOPE_ADDONS[2],
        label: 'Mini Identité Visuelle',
        description: 'Typographie, palette affinée et kit visuel de lancement social',
      },
      {
        ...SCOPE_ADDONS[3],
        label: 'Sprint Express 4 Jours',
        description: 'Priorité d’ingénierie pour vos lancements de campagnes urgents',
      },
    ],
  },
  faq: {
    kicker: 'Questions Fréquentes Avant de Démarrer',
    title: 'Des réponses claires avant de dépenser un dollar.',
    subtitle:
      'Propriété du site, délais réels, textes et frais récurrents—tout est posé noir sur blanc.',
    ctaPrompt: 'Besoin d’un plan précis pour votre activité ?',
    ctaButton: 'Obtenir Mon Plan de Lancement',
    items: [
      {
        question: 'Y a-t-il des frais mensuels cachés après le forfait à 299 $ ?',
        answer:
          'Non. Le forfait Lancement à 299 $ est un paiement unique. Aucun abonnement agence obligatoire—uniquement le renouvellement classique de votre nom de domaine .com si vous n’en avez pas encore (~12–15 $/an).',
      },
      {
        question: 'Et si le design ne me convient pas en cours de route ?',
        answer:
          'Vous êtes couvert par notre Garantie Design d’Abord : vous validez la maquette visuelle au Jour 3 avant le développement complet, avec révisions encadrées et garantie satisfaction avant la mise en ligne.',
      },
      {
        question: 'Suis-je propriétaire à 100 % de mon site, de mon code et de mon domaine ?',
        answer:
          'Oui. Au Jour 7, vous recevez l’intégralité du code, le contrôle complet de votre domaine et vos accès analytics—aucun verrouillage.',
      },
      {
        question: 'Que faire si je n’ai pas encore tous mes textes ou photos ?',
        answer:
          'Pas de souci. Nous structurons votre offre dès l’appel de cadrage, optimisons vos visuels existants et proposons une option Rédaction Orientée Vente (90 $) si vous souhaitez tout déléguer.',
      },
      {
        question: 'En combien de temps pouvons-nous vraiment être en ligne ?',
        answer:
          'La formule Lancement est livrée en 7 jours (4 jours en Sprint Express). Il nous suffit le Jour 1 d’un appel de 15 minutes ou d’un brief avec votre logo, vos offres et vos liens de contact.',
      },
    ],
  },
  brief: {
    processKicker: '04. Processus de Lancement',
    processTitle: 'D’un appel de 15 minutes à un site qui génère des clients en 7 jours.',
    steps: [
      {
        number: '01',
        title: 'Brief & Cadrage',
        duration: 'Jour 1',
        description:
          'Un échange ciblé de 15 minutes sur WhatsApp ou appel pour valider vos objectifs et livrables.',
      },
      {
        number: '02',
        title: 'Direction Visuelle',
        duration: 'Jours 2–3',
        description:
          'Création d’une interface moderne fidèle à votre marque—jamais un modèle surchargé.',
      },
      {
        number: '03',
        title: 'Développement & SEO IA',
        duration: 'Jours 4–6',
        description:
          'Intégration mobile-first, optimisation vitesse, balisage Schema et tests complets.',
      },
      {
        number: '04',
        title: 'Mise en Ligne & Remise',
        duration: 'Jour 7',
        description:
          'Déploiement sécurisé HTTPS sur votre domaine avec propriété totale de votre site.',
      },
    ],
    conversionKicker: 'Gagnez Plus De Clients Dès Cette Semaine',
    conversionTitle: 'Ne perdez plus de clients prêts à acheter faute d’un site rapide.',
    conversionBody:
      'Réservez un appel stratégique gratuit de 30 minutes sur Calendly, envoyez votre brief pour un plan écrit sous 2 heures ouvrées, ou écrivez directement sur WhatsApp.',
    callOrWhatsapp: 'Appel ou WhatsApp Direct',
    copyNumber: 'Copier le numéro',
    copied: 'Copié',
    bookFreeCall: 'Obtenir Mon Plan de Lancement',
    callNow: 'Appeler',
    appointmentsLabel: 'Rendez-vous',
    calendlySlotLabel: 'Appel Plan de Lancement',
    websiteLabel: 'Site Web',
    tabCalendly: 'Plan de Lancement',
    tabBrief: 'Envoyer un Brief',
    pickTimeTitle: 'Choisissez Votre Créneau de 30 Minutes',
    pickTimeSubtitle: (tierName) =>
      `Disponibilités en direct via Calendly · Étude gratuite pour votre formule ${tierName}`,
    openFullCalendar: 'Ouvrir en plein écran',
    loadingCalendar: 'Chargement du calendrier Kiralyte...',
    openCalendlyDirect: 'Ouvrir Calendly directement',
    receivedKicker: 'Brief Projet Reçu',
    receivedTitle: (name, tierName) => `Merci ${name}. Votre formule ${tierName} est réservée.`,
    receivedBody: (total, target, phone) =>
      `Nous avons enregistré votre estimation de ${total} pour ${target}. Attendez un message sur ${phone} sous 2 heures ouvrées.`,
    bookKickoffCall: 'Réserver Votre Appel de Lancement',
    sendBriefWhatsapp: 'Envoyer le Brief sur WhatsApp',
    editBrief: 'Modifier le Brief',
    formTitle: 'Démarrer Votre Brief Web',
    selectedLabel: 'Formule :',
    inspiredBy: 'Inspiré par',
    estimatedTotal: 'Estimation',
    fieldName: 'Nom Complet *',
    fieldBusiness: 'Entreprise ou Marque',
    fieldPhone: 'Numéro WhatsApp / Téléphone *',
    fieldEmail: 'Adresse E-mail *',
    fieldPackage: 'Formule Sélectionnée',
    fieldType: 'Type de Projet',
    fieldNotes: 'Objectifs ou Délai Souhaité (Optionnel)',
    notesPlaceholder:
      'Décrivez votre activité, les sites qui vous inspirent et votre date de lancement idéale.',
    typeOptions: [
      { value: 'Business Website', label: 'Site Vitrine Entreprise' },
      { value: 'Portfolio Website', label: 'Portfolio Dirigeant / Créatif' },
      { value: 'Landing Page', label: 'Page de Conversion Publicitaire' },
      { value: 'Online Storefront', label: 'Catalogue Produits / Boutique' },
    ],
    submitCta: 'Réserver Mon Créneau Web',
    noObligation: 'Sans engagement · Plan écrit envoyé sous 2 heures',
    errName: 'Veuillez saisir votre nom complet.',
    errPhone: 'Saisissez un numéro de téléphone ou WhatsApp valide.',
    errEmail: 'Saisissez une adresse e-mail valide pour recevoir votre devis.',
  },
  trustBadges: {
    items: [
      {
        id: 'ssl',
        title: 'Sécurisé SSL',
        description:
          'Chiffrement HTTPS configuré sur chaque mise en ligne pour protéger visiteurs et formulaires.',
      },
      {
        id: 'gdpr',
        title: 'Conforme RGPD',
        description:
          'Gestion respectueuse des données, consentement clair et confidentialité client stricte.',
      },
      {
        id: 'guarantee',
        title: 'Garantie Satisfaction Remboursée',
        description:
          'Validation claire du design avant développement, appuyée par notre engagement satisfaction.',
      },
    ],
  },
  footer: {
    description:
      'Sites vitrines, portfolios et pages de conversion modernes, rapides et pensés pour Google et les moteurs de recherche IA.',
    navigation: 'Navigation',
    pricingLink: 'Tarifs (Offre 299 $)',
    startLink: 'Démarrer un Projet',
    directContact: 'Contact Direct',
    bookCallLink: 'Réserver un Appel Gratuit de 30 Min →',
    callWhatsappPrefix: 'Appel / WhatsApp :',
    rights: 'Tous droits réservés.',
    pillars: 'Moderne · Rapide · Adapté Mobile · SEO & Prêt IA',
  },
  modal: {
    title: 'Réserver Votre Appel Stratégique de 30 Min',
    defaultSubtitle: 'Kiralyte Technology Solutions · Choisissez le créneau qui vous convient',
    openInCalendly: 'Ouvrir dans Calendly',
    closeScheduler: 'Fermer le calendrier de réservation',
    loadingAvailability: 'Chargement des disponibilités en direct...',
    openDirectPrompt: 'Préférez-vous ouvrir Calendly directement ?',
    instantConfirm: 'Confirmation instantanée par e-mail',
    openFullPage: 'Ouvrir en pleine page',
    contextLabel: (tierName, price) =>
      `Formule choisie : ${tierName} (${price}) · Appel stratégique gratuit de 30 min`,
  },
  toast: {
    calendlyTitle: 'Calendrier fermé',
    calendlyDescription:
      'Si vous avez réservé un créneau de 30 min, Calendly vous a envoyé la confirmation par e-mail. Vous pouvez aussi nous écrire sur WhatsApp.',
    briefTitle: 'Brief projet enregistré',
    briefDescription: (name, pkg, total) =>
      `Merci ${name}. Votre estimation ${pkg} (${total}) est réservée—réponse sous 2 heures ouvrées.`,
    dismiss: 'Fermer la notification',
  },
  scrollTopLabel: 'Revenir en haut de la page',
};

const DICTIONARY: Record<Language, SiteCopy> = {
  en: EN_COPY,
  fr: FR_COPY,
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: SiteCopy;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  setLanguage: () => {},
  t: EN_COPY,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = window.localStorage.getItem('kiralyte_lang');
      return saved === 'fr' ? 'fr' : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem('kiralyte_lang', lang);
    } catch {
      // Ignore storage restrictions in private browsing
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return React.createElement(
    LanguageContext.Provider,
    { value: { language, setLanguage, t: DICTIONARY[language] } },
    children,
  );
};

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
