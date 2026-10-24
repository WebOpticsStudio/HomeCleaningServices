import dynamic from 'next/dynamic';
import { GALLERY_CATEGORY_LABELS } from '@/constants/catalog';
import type { GalleryItem } from '../types';

const BeforeAfterSlider = dynamic(
  () => import('./before-after-slider'),
  {
    ssr: false,
    loading: () => (
      <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-100 bg-slate-100 shadow-sm animate-pulse" />
    ),
  }
);

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
