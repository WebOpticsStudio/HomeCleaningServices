import type { PricingPackage } from '../types';
import { PricingCard } from './pricing-card';

export function PricingGrid({ packages }: { packages: readonly PricingPackage[] }) {
  return (
    <ul className="grid items-stretch gap-6 pt-3 sm:grid-cols-2 lg:grid-cols-4">
      {packages.map((pkg) => (
        <li key={pkg.id}>
          <PricingCard pkg={pkg} />
        </li>
      ))}
    </ul>
  );
}
