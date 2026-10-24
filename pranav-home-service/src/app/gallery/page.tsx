import { CtaBanner } from '@/components/ui/cta-banner';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { isGalleryCategory } from '@/constants/catalog';
import { ROUTES } from '@/constants/routes';
import { CategoryFilter } from '@/features/gallery/components/category-filter';
import { GalleryGrid } from '@/features/gallery/components/gallery-grid';
import { getGalleryItems } from '@/features/gallery/lib/get-gallery';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Before and after gallery',
  description: 'See the difference our cleaning makes, room by room, with before-and-after photos.',
  path: ROUTES.gallery,
});

type Props = { searchParams: Promise<{ category?: string | string[] }> };

export default async function GalleryPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const active = isGalleryCategory(category) ? category : undefined;

  return (
    <>
      <PageHeader
        title="Before and after"
        description="The same room, before and after our visit."
      />
      <Section>
        <CategoryFilter active={active} />
        <GalleryGrid items={getGalleryItems(active)} />
      </Section>
      <CtaBanner />
    </>
  );
}
