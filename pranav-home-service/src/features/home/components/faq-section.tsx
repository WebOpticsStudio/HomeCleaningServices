import { Section } from '@/components/ui/section';
import { FaqList } from '@/features/faq/components/faq-list';
import { faqs } from '@/features/faq/data/faqs';

export function FaqSection() {
  return (
    <Section id="faq" title="Questions, answered">
      <FaqList items={faqs} />
    </Section>
  );
}
