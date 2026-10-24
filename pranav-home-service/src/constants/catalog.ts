/**
 * Identifiers shared between the catalog data (services, packages, gallery)
 * and the booking validation schema, so the form, the server-side validation
 * and the data files can never drift apart.
 */
export const SERVICE_SLUGS = [
  'home-cleaning',
  'deep-cleaning',
  'move-in-out-cleaning',
  'bathroom-kitchen-cleaning',
  'kitchen-deep-cleaning',
  'bathroom-cleaning',
] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const PACKAGE_IDS = [
  'basic',
  'standard',
  'deep-cleaning',
  'kitchen-deep-cleaning',
  'bathroom-cleaning',
  'move-in-out',
  'premium',
] as const;
export type PackageId = (typeof PACKAGE_IDS)[number];

export const BHK_OPTIONS = ['1bhk', '2bhk', '3bhk'] as const;
export type BhkOption = (typeof BHK_OPTIONS)[number];

export const BHK_LABELS: Record<BhkOption, string> = {
  '1bhk': '1 BHK',
  '2bhk': '2 BHK',
  '3bhk': '3 BHK',
};

export function isBhkOption(value: unknown): value is BhkOption {
  return typeof value === 'string' && (BHK_OPTIONS as readonly string[]).includes(value);
}

export const GALLERY_CATEGORIES = ['kitchen', 'bathroom', 'living-room'] as const;
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export const GALLERY_CATEGORY_LABELS: Record<GalleryCategory, string> = {
  kitchen: 'Kitchen',
  bathroom: 'Bathroom',
  'living-room': 'Hall & Living room',
};

export function isServiceSlug(value: unknown): value is ServiceSlug {
  return typeof value === 'string' && (SERVICE_SLUGS as readonly string[]).includes(value);
}

export function isPackageId(value: unknown): value is PackageId {
  return typeof value === 'string' && (PACKAGE_IDS as readonly string[]).includes(value);
}

export function isGalleryCategory(value: unknown): value is GalleryCategory {
  return typeof value === 'string' && (GALLERY_CATEGORIES as readonly string[]).includes(value);
}
