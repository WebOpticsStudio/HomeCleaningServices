import { CtaBanner } from '@/components/ui/cta-banner';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { ROUTES } from '@/constants/routes';
import { FaqList } from '@/features/faq/components/faq-list';
import { faqs } from '@/features/faq/data/faqs';
import { PricingGrid } from '@/features/pricing/components/pricing-grid';
import { pricingPackages } from '@/features/pricing/data/packages';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Pricing and packages',
  description:
    'Compare our Basic, Standard and Premium cleaning packages. Clear starting prices, confirmed before every visit.',
  path: ROUTES.pricing,
});

export default function PricingPage() {
  return (
    <>
      <PageHeader
        title="Pricing and packages"
        description="Starting prices for a 1 BHK home. Bigger homes cost more, and we always confirm the total before we start."
      />
      <Section>
        <PricingGrid packages={pricingPackages} />
      </Section>
      <Section id="faq" title="Pricing questions" tone="tint">
        <FaqList items={faqs} />
      </Section>
      <CtaBanner />
    </>
  );
}
