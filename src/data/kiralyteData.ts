export interface CaseStudy {
  id: string;
  client: string;
  category: 'Business Sites' | 'Portfolios' | 'Landing Pages';
  location: string;
  turnaround: string;
  image: string;
  imageAlt: string;
  headline: string;
  subheadline: string;
  metricValue: string;
  metricLabel: string;
  loadTime: string;
  summary: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  previewNav: string[];
  previewCta: string;
  previewSecondaryMeta: string;
  accentHex: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  subtitle: string;
  turnaround: string;
  featured?: boolean;
  idealFor: string;
  features: string[];
  ctaLabel: string;
}

export interface ScopeAddon {
  id: string;
  label: string;
  description: string;
  price: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  projectType: string;
  turnaround: string;
  outcome: string;
  initials: string;
}

export const KIRALYTE_CONTACT = {
  brandName: 'Kiralyte',
  legalName: 'Kiralyte Technology Solutions',
  phoneDisplay: '08025418932',
  phoneHref: 'tel:08025418932',
  whatsappNumberIntl: '2348025418932',
  whatsappBaseUrl: 'https://wa.me/2348025418932',
  calendlyUrl: 'https://calendly.com/kiralytetechnology/30min',
  websiteDisplay: 'www.kiralyte.com',
  websiteUrl: 'https://www.kiralyte.com',
  instagramHandle: '@kiralytetechnologysolutions',
  instagramDisplay: 'instagram.com/kiralytetechnologysolutions',
  instagramUrl: 'https://instagram.com/kiralytetechnologysolutions',
};

export function buildCalendlyEmbedUrl(prefill?: { name?: string; email?: string }): string {
  const params = new URLSearchParams({
    hide_gdpr_banner: '1',
    primary_color: 'ea580c',
    text_color: '181c20',
    background_color: 'ffffff',
  });

  if (prefill?.name?.trim()) {
    params.set('name', prefill.name.trim());
  }
  if (prefill?.email?.trim()) {
    params.set('email', prefill.email.trim());
  }

  return `${KIRALYTE_CONTACT.calendlyUrl}?${params.toString()}`;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'olafashion',
    client: 'OlaFashion',
    category: 'Business Sites',
    location: 'Lagos',
    turnaround: '8-Day Launch',
    image: '/src/assets/images/olafashion_editorial_1795377403138.jpg',
    imageAlt: 'OlaFashion champagne silk dress, structured leather handbag, and layered gold jewelry lookbook',
    headline: 'Elegant Style for Every Moment',
    subheadline: 'Bespoke evening silhouettes, structured leather goods, and heirloom jewelry curated for private clientele.',
    metricValue: '+165%',
    metricLabel: 'WhatsApp & catalog inquiries in 60 days',
    loadTime: '0.7s',
    summary:
      'Replaced a slow social-only catalog with a fast, editorial retail showcase engineered for instant mobile browsing and direct WhatsApp ordering.',
    challenge:
      'Shoppers abandoned Instagram DMs when asking for sizes and prices, and previous mobile pages took over 5 seconds to load on local 4G networks.',
    solution:
      'Built a lightweight responsive storefront with crisp lookbook photography, instant tap-to-order WhatsApp routing, and structured product schema for Google Search.',
    deliverables: [
      'Responsive desktop, tablet, and mobile storefront',
      'Direct WhatsApp order pre-fill per collection',
      'Compressed editorial image pipeline (0.7s mobile load)',
      'Structured product & local business JSON-LD schema',
    ],
    previewNav: ['Collections', 'Atelier', 'Accessories', 'Contact'],
    previewCta: 'Explore Collection',
    previewSecondaryMeta: 'New Season · Private Fitting Available',
    accentHex: '#8C6239',
  },
  {
    id: 'kora-studio',
    client: 'Kora Spatial Studio',
    category: 'Portfolios',
    location: 'Abuja & London',
    turnaround: '9-Day Launch',
    image: '/src/assets/images/kora_architecture_studio_1795377402714.jpg',
    imageAlt: 'Kora Spatial Studio architectural concrete and oak timber residential pavilion interior',
    headline: 'Spaces Shaped by Light and Restraint',
    subheadline: 'Residential architecture and bespoke interior planning for private residences and boutique hospitality.',
    metricValue: '11 Briefs',
    metricLabel: 'Qualified residential commissions in Q1',
    loadTime: '0.8s',
    summary:
      'Transformed a static PDF brochure into a disciplined architectural portfolio built to convert property developers and private homeowners.',
    challenge:
      'Prospective clients had to download 40MB PDF decks over email, creating friction and zero search visibility when searching for regional architects.',
    solution:
      'Designed an editorial project archive with full-bleed photography, structured project briefs, and clean technical SEO targeting residential architecture queries.',
    deliverables: [
      'Editorial portfolio grid & project breakdown views',
      'Interactive consultation & site-brief intake form',
      'AI-readable studio credentials & FAQ markup',
      'Sub-second gallery delivery across all screen sizes',
    ],
    previewNav: ['Projects', 'Practice', 'Journal', 'Inquire'],
    previewCta: 'View Residences',
    previewSecondaryMeta: 'Residential · Hospitality · Interiors',
    accentHex: '#334155',
  },
  {
    id: 'verve-roastery',
    client: 'Verve Artisanal Coffee',
    category: 'Landing Pages',
    location: 'Lagos',
    turnaround: '6-Day Launch',
    image: '/src/assets/images/verve_coffee_roastery_1795377402391.jpg',
    imageAlt: 'Verve Artisanal Coffee matte terracotta ceramic carafe and charcoal tin on dark basalt stone',
    headline: 'Small-Batch Roasts for Modern Hospitality',
    subheadline: 'Traceable East African single-origin beans roasted weekly for boutique hotels, cafes, and offices.',
    metricValue: '+88%',
    metricLabel: 'Wholesale tasting requests in 90 days',
    loadTime: '0.6s',
    summary:
      'Engineered a focused wholesale conversion landing page pairing dark editorial product imagery with a 30-second sample kit request flow.',
    challenge:
      'Paid social ads were sending hospitality buyers to a cluttered generic page with unclear pricing and broken mobile forms.',
    solution:
      'Created a single-focus landing page with clear roast specs, immediate mobile tap targets, and automated WhatsApp & email lead routing.',
    deliverables: [
      'High-converting wholesale & tasting landing page',
      'Validated sample-kit booking & WhatsApp handoff',
      'Search & AI entity optimization for local hospitality',
      'Analytics event tracking on every inquiry path',
    ],
    previewNav: ['Origins', 'Wholesale', 'Brew Guide', 'Sample Kit'],
    previewCta: 'Request Tasting Box',
    previewSecondaryMeta: 'Roasted Weekly · Direct Trade',
    accentHex: '#B45309',
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'launchpad',
    name: 'Launchpad',
    price: 299,
    priceDisplay: '$299',
    subtitle: '4 Slots / Month',
    turnaround: '7-Day Turnaround',
    featured: true,
    idealFor: 'Ideal for basic business websites, personal portfolios, and high-converting landing pages.',
    features: [
      'Custom responsive design (Mobile, Tablet & Desktop)',
      'Up to 3 tailored pages or comprehensive landing page',
      'Direct WhatsApp, Click-to-Call & validated inquiry form',
      'Foundational SEO metadata & AI-ready structured schema',
      'Sub-second performance tuning & SSL security setup',
      '1 round of structured design refinements before launch',
    ],
    ctaLabel: 'Select Launchpad ($299)',
  },
  {
    id: 'business-growth',
    name: 'Business Growth',
    price: 680,
    priceDisplay: '$680',
    subtitle: 'Most Chosen by Teams',
    turnaround: '10–14 Day Turnaround',
    idealFor: 'Ideal for growing companies, agencies, and multi-service businesses scaling inbound leads.',
    features: [
      'Up to 6 custom-architected pages with bespoke visual system',
      'Interactive service catalog, portfolio, or case study library',
      'Advanced local SEO, Google Analytics 4 & AI search optimization',
      'Custom conversion funnels with automated lead routing',
      '2 rounds of design refinements + handover documentation',
      '30 days of complimentary post-launch technical support',
    ],
    ctaLabel: 'Select Business Growth ($680)',
  },
  {
    id: 'commerce-custom',
    name: 'Commerce & Custom',
    price: 1150,
    priceDisplay: '$1,150',
    subtitle: 'Tailored Digital Flagship',
    turnaround: '2–3 Week Turnaround',
    idealFor: 'Ideal for retail storefronts, booking platforms, and brands needing custom interactive workflows.',
    features: [
      'Full e-commerce storefront or custom client booking portal',
      'Interactive product lookbooks, filtering & payment integration',
      'CRM, email automation & WhatsApp Business API workflows',
      'Technical SEO audit, schema graph & speed guarantee',
      'Dedicated design & engineering sprints with weekly demos',
      '60 days of priority support and performance monitoring',
    ],
    ctaLabel: 'Select Commerce ($1,150)',
  },
];

export const SCOPE_ADDONS: ScopeAddon[] = [
  {
    id: 'domain-email',
    label: 'Domain & Business Email',
    description: 'Custom .com setup, DNS security, and branded inbox configuration',
    price: 65,
  },
  {
    id: 'copywriting',
    label: 'Conversion Copywriting',
    description: 'Clear, buyer-focused headlines and service copy written for you',
    price: 90,
  },
  {
    id: 'brand-kit',
    label: 'Mini Brand Refresh',
    description: 'Typography pairing, refined color palette, and social launch kit',
    price: 120,
  },
  {
    id: 'express-delivery',
    label: 'Express 4-Day Sprint',
    description: 'Priority engineering queue for urgent campaign launches',
    price: 100,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Before Kiralyte rebuilt our site, customers struggled to browse our dresses on mobile and constantly dropped off before messaging us. Within two months of launching the new lookbook, our daily WhatsApp fitting inquiries more than doubled.',
    author: 'Olamide Adeyemi',
    role: 'Creative Director',
    company: 'OlaFashion',
    location: 'Lagos',
    projectType: 'Business Website',
    turnaround: '8-Day Launch',
    outcome: '+165% mobile inquiries in 60 days',
    initials: 'OA',
  },
  {
    id: 't2',
    quote:
      'We used to send heavy PDF decks that rarely got opened on phones. Kiralyte delivered a sharp, fast architectural portfolio in nine days—and it immediately started bringing in qualified residential briefs from Google search.',
    author: 'Tunde Bakare',
    role: 'Principal Architect',
    company: 'Kora Spatial Studio',
    location: 'Abuja & London',
    projectType: 'Executive Portfolio',
    turnaround: '9-Day Launch',
    outcome: '11 qualified briefs in Q1',
    initials: 'TB',
  },
  {
    id: 't3',
    quote:
      'Our paid Instagram traffic was landing on a cluttered page where hospitality managers couldn’t find wholesale pricing. Kiralyte shipped a focused landing page in six days and our tasting kit requests jumped almost overnight.',
    author: 'Chidinma Nwosu',
    role: 'Head of Wholesale',
    company: 'Verve Artisanal Coffee',
    location: 'Lagos',
    projectType: 'Conversion Landing Page',
    turnaround: '6-Day Launch',
    outcome: '+88% wholesale quote requests',
    initials: 'CN',
  },
  {
    id: 't4',
    quote:
      'We needed a credible corporate web presence ahead of an enterprise pitch without waiting two months. Kiralyte handled the structure, mobile speed, and booking integration in one week—and we closed two retainers from inbound leads that month.',
    author: 'Ibrahim Musa',
    role: 'Managing Partner',
    company: 'Meridian Advisory Group',
    location: 'Lagos & Nairobi',
    projectType: 'Business Website',
    turnaround: '7-Day Launch',
    outcome: '2 enterprise retainers in 30 days',
    initials: 'IM',
  },
];

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Brief & Scope Alignment',
    duration: 'Day 1',
    description: 'A focused 15-minute WhatsApp or phone brief to confirm your goals, audience, and exact deliverables.',
  },
  {
    number: '02',
    title: 'Visual Direction & Layout',
    duration: 'Days 2–3',
    description: 'We craft a clean, modern interface tailored to your brand identity—never a bloated generic template.',
  },
  {
    number: '03',
    title: 'Engineering, Speed & AI SEO',
    duration: 'Days 4–6',
    description: 'Responsive mobile-first build, sub-second image optimization, structured schema, and lead capture testing.',
  },
  {
    number: '04',
    title: 'Launch & Clean Handover',
    duration: 'Day 7',
    description: 'Live deployment on your domain with SSL security, verified analytics, and full ownership in your hands.',
  },
];
