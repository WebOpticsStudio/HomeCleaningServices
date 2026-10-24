import { ButtonLink } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { ROUTES } from '@/constants/routes';
import { BeforeAfterCard } from '@/features/gallery/components/before-after-card';
import { getFeaturedGalleryItems } from '@/features/gallery/lib/get-gallery';

export function GalleryPreview() {
  return (
    <Section
      id="gallery"
      className="scroll-mt-24 sm:scroll-mt-28"
      title="Before & After Cleaning Results"
      description="Real transformations across Kolar homes. Drag the slider on any card to reveal the difference."
      tone="tint"
    >
      <ul className="grid gap-6 md:grid-cols-3">
        {getFeaturedGalleryItems(3).map((item) => (
          <li key={item.id}>
            <BeforeAfterCard item={item} />
          </li>
        ))}
      </ul>
      <div className="mt-10 flex justify-center">
        <ButtonLink href={ROUTES.gallery} variant="outline" size="lg">
          View the full gallery
        </ButtonLink>
      </div>
    </Section>
  );
}
