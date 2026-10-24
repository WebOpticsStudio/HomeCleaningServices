import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * FAQ accordion built on native <details>/<summary>: keyboard accessible, works without
 * JavaScript and needs no client component.
 */
export function Accordion({ items }: { items: readonly AccordionItem[] }) {
  return (
    <div className="divide-y divide-grout border-y border-grout">
      {items.map((item) => (
        <details key={item.id} className="group py-1">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-left text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown
              className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="max-w-3xl pb-4 text-ink-soft">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
