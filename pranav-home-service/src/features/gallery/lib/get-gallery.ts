import type { GalleryCategory } from '@/constants/catalog';
import { galleryItems } from '../data/gallery';
import type { GalleryItem } from '../types';

export function getGalleryItems(category?: GalleryCategory): readonly GalleryItem[] {
  return category ? galleryItems.filter((item) => item.category === category) : galleryItems;
}

export function getFeaturedGalleryItems(count = 3): readonly GalleryItem[] {
  return galleryItems.slice(0, count);
}
