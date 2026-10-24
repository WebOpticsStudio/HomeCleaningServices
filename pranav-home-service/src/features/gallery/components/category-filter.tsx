import Link from 'next/link';
import {
  GALLERY_CATEGORIES,
  GALLERY_CATEGORY_LABELS,
  type GalleryCategory,
} from '@/constants/catalog';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';

/** Server-rendered filter: plain links to `?category=`, so it works without client JS. */
export function CategoryFilter({ active }: { active?: GalleryCategory }) {
  const options = [
    { label: 'All', href: ROUTES.gallery, isActive: !active },
    ...GALLERY_CATEGORIES.map((category) => ({
      label: GALLERY_CATEGORY_LABELS[category],
      href: `${ROUTES.gallery}?category=${category}`,
      isActive: active === category,
    })),
  ];
  return (
    <nav aria-label="Filter photos by category" className="mb-8">
      <ul className="flex flex-wrap gap-2">
        {options.map((option) => (
          <li key={option.label}>
            <Link
              href={option.href}
              aria-current={option.isActive ? 'true' : undefined}
              className={cn(
                'inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-semibold',
                option.isActive
                  ? 'border-primary bg-primary text-white'
                  : 'border-grout bg-white hover:bg-rinse',
              )}
            >
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
