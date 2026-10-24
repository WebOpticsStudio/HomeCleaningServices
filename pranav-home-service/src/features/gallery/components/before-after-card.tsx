import { GALLERY_CATEGORY_LABELS } from '@/constants/catalog';
import type { GalleryItem } from '../types';
import { BeforeAfterSlider } from './before-after-slider';

export function BeforeAfterCard({ item }: { item: GalleryItem }) {
  return (
    <BeforeAfterSlider
      before={item.before}
      after={item.after}
      title={item.title}
      categoryLabel={GALLERY_CATEGORY_LABELS[item.category]}
      caption={item.caption}
    />
  );
}
