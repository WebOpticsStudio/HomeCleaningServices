import type { ImageAsset } from '@/types';

export interface Testimonial {
  id: string;
  name: string;
  location?: string;
  role?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  review: string;
  image?: ImageAsset;
}
