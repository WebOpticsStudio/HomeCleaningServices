import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

interface PageMetadataInput {
  title: string;
  description: string;
  /** Path beginning with "/", used for canonical and Open Graph URLs. */
  path: string;
  /** Use the title as-is instead of the "%s | Site name" template. */
  absoluteTitle?: boolean;
  noIndex?: boolean;
}

/**
 * Builds consistent page metadata (title, description, canonical, Open Graph, Twitter).
 * Every page calls this so SEO tags cannot be forgotten or drift apart.
 */
export function createMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const image = {
    url: '/opengraph-image',
    width: 1200,
    height: 630,
    alt: `${siteConfig.name}: ${siteConfig.tagline}`,
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title: fullTitle,
      description,
      url: path,
      images: [image],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [image.url] },
  };
}
