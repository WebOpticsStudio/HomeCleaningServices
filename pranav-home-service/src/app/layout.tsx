import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/json-ld';
import { FloatingContactButtons } from '@/components/ui/floating-contact-buttons';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { SkipLink } from '@/components/layout/skip-link';
import { siteConfig } from '@/config/site';
import '@/styles/globals.css';

// Self-hosted variable fonts (SIL OFL). No third-party font requests at runtime.
const display = localFont({
  src: '../assets/fonts/bricolage-grotesque-latin-wght-normal.woff2',
  variable: '--font-bricolage',
  weight: '200 800',
  display: 'swap',
});
const body = localFont({
  src: '../assets/fonts/figtree-latin-wght-normal.woff2',
  variable: '--font-figtree',
  weight: '300 900',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f6e7d',
};

const businessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HouseCleaningService',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  areaServed: siteConfig.contact.serviceArea,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${display.variable} ${body.variable}`}>
      <body className="m-0 my-0 flex min-h-dvh flex-col p-0">
        <SkipLink />
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <FloatingContactButtons />
        <JsonLd data={businessJsonLd} />
      </body>
    </html>
  );
}
