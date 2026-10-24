import { Accordion, type AccordionItem } from '@/components/ui/accordion';
import { JsonLd } from '@/components/seo/json-ld';

/** FAQ accordion plus schema.org FAQPage data for search engines. */
export function FaqList({ items }: { items: readonly AccordionItem[] }) {
  return (
    <>
      <Accordion items={items} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }}
      />
    </>
  );
}
