import type { ServiceSlug } from '@/constants/catalog';
import type { ImageAsset } from '@/types';

export type ServiceIconName = 'home' | 'sparkles' | 'truck' | 'bath';

export interface Service {
  slug: ServiceSlug;
  name: string;
  shortDescription: string;
  description: string;
  icon: ServiceIconName;
  image: ImageAsset;
  /** Starting price in INR. */
  startingPrice: number;
  priceNote: string;
  duration: string;
  includes: readonly string[];
  idealFor: readonly string[];
}
