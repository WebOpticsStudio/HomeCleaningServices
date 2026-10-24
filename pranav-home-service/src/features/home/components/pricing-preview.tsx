import { ButtonLink } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { ROUTES } from '@/constants/routes';
import { PricingGrid } from '@/features/pricing/components/pricing-grid';
import { pricingPackages } from '@/features/pricing/data/packages';

export function PricingPreview() {
  return (
    <Section
      id="pricing"
      title="Simple packages"
      description="Starting prices for a 1 BHK. We confirm your exact total before the visit."
    >
      <PricingGrid packages={pricingPackages} />
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <ButtonLink href={ROUTES.pricing} variant="outline">
          Compare all packages & features
        </ButtonLink>
        <p className="text-xs text-ink-soft">
          * Transparent sample rates for standard 1 BHK layouts in Kolar. Final price confirmed
          prior to start.
        </p>
      </div>
    </Section>
  );
}
