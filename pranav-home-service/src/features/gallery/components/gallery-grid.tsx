import { EmptyState } from '@/components/ui/empty-state';
import type { GalleryItem } from '../types';
import { BeforeAfterCard } from './before-after-card';

export function GalleryGrid({ items }: { items: readonly GalleryItem[] }) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="No photos in this category yet"
        description="We add new before-and-after photos regularly. Try another category."
      />
    );
  }
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id}>
          <BeforeAfterCard item={item} />
        </li>
      ))}
    </ul>
  );
}
