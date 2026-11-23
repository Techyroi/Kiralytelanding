import React, { useEffect } from 'react';

export interface SeoMetaProps {
  title: string;
  description: string;
  siteName?: string;
  type?: 'website' | 'article' | 'product';
  image?: string;
  imageAlt?: string;
  canonicalUrl?: string;
  keywords?: string[];
  robots?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterHandle?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertLink(rel: string, href: string): void {
  let link = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function resolveAbsoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }
  const normalized = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${window.location.origin}${normalized}`;
}

export const SeoMeta: React.FC<SeoMetaProps> = ({
  title,
  description,
  siteName = 'Kiralyte Technology Solutions',
  type = 'website',
  image,
  imageAlt,
  canonicalUrl,
  keywords,
  robots = 'index, follow',
  twitterCard = 'summary_large_image',
  twitterHandle,
  structuredData,
}) => {
  const keywordsKey = keywords?.join(', ') ?? '';
  const structuredDataJson = structuredData ? JSON.stringify(structuredData) : '';

  useEffect(() => {
    const resolvedCanonical =
      canonicalUrl ?? `${window.location.origin}${window.location.pathname}`;
    const resolvedImage = image ? resolveAbsoluteUrl(image) : undefined;

    // Document title
    document.title = title;

    // Standard SEO tags
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', robots);
    if (keywordsKey) {
      upsertMeta('name', 'keywords', keywordsKey);
    }

    // Canonical URL
    upsertLink('canonical', resolvedCanonical);

    // Open Graph tags
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:site_name', siteName);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', resolvedCanonical);
    if (resolvedImage) {
      upsertMeta('property', 'og:image', resolvedImage);
      if (imageAlt) {
        upsertMeta('property', 'og:image:alt', imageAlt);
      }
    }

    // Twitter / X Card tags
    upsertMeta('name', 'twitter:card', twitterCard);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    if (twitterHandle) {
      upsertMeta('name', 'twitter:site', twitterHandle);
    }
    if (resolvedImage) {
      upsertMeta('name', 'twitter:image', resolvedImage);
      if (imageAlt) {
        upsertMeta('name', 'twitter:image:alt', imageAlt);
      }
    }

    // Schema.org JSON-LD structured data
    const existingJsonLd = document.head.querySelector<HTMLScriptElement>(
      'script[type="application/ld+json"][data-seo-meta="true"]',
    );

    if (structuredDataJson) {
      const script = existingJsonLd ?? document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-meta', 'true');
      script.textContent = structuredDataJson;
      if (!existingJsonLd) {
        document.head.appendChild(script);
      }
    } else if (existingJsonLd) {
      existingJsonLd.remove();
    }
  }, [
    title,
    description,
    siteName,
    type,
    image,
    imageAlt,
    canonicalUrl,
    keywordsKey,
    robots,
    twitterCard,
    twitterHandle,
    structuredDataJson,
  ]);

  return null;
};
