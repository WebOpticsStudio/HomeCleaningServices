import { CtaBanner } from '@/components/ui/cta-banner';
import { siteConfig } from '@/config/site';
import { FaqSection } from '@/features/home/components/faq-section';
import { GalleryPreview } from '@/features/home/components/gallery-preview';
import { Hero } from '@/features/home/components/hero';
import { ServicesOverview } from '@/features/home/components/services-overview';
import { TestimonialsSection } from '@/features/home/components/testimonials-section';
import { TrustBadgesSection } from '@/features/home/components/trust-badges-section';
import { WhyChooseUs } from '@/features/home/components/why-choose-us';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  absoluteTitle: true,
  description: siteConfig.description,
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyChooseUs />
      <TrustBadgesSection />
      <TestimonialsSection />
      <GalleryPreview />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
