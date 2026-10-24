import type { GalleryCategory } from '@/constants/catalog';
import type { ImageAsset } from '@/types';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  caption: string;
  before: ImageAsset;
  after: ImageAsset;
}
