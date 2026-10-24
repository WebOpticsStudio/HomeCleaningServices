import type { BhkOption, PackageId, ServiceSlug } from '@/constants/catalog';

export interface BhkPriceTier {
  bhk: BhkOption;
  label: string;
  price: number;
  priceNote?: string;
  description?: string;
}

export interface PricingPackage {
  id: PackageId;
  name: string;
  tagline: string;
  badge?: string;
  /** Base starting price in INR. */
  price: number;
  priceNote: string;
  features: readonly string[];
  highlighted?: boolean;
  ctaLabel: string;
  serviceSlug?: ServiceSlug;
  /** Interactive BHK pricing options for full-house packages */
  bhkPricing?: readonly BhkPriceTier[];
  /** Factors explaining starting price variations */
  startingPriceFactors?: readonly string[];
}
