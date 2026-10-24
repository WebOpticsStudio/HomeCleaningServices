import { EmptyState } from '@/components/ui/empty-state';
import type { Testimonial } from '../types';
import { TestimonialCard } from './testimonial-card';

export function TestimonialList({ testimonials }: { testimonials: readonly Testimonial[] }) {
  if (testimonials.length === 0) {
    return (
      <EmptyState
        title="No reviews yet"
        description="Reviews from our customers will appear here."
      />
    );
  }
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {testimonials.map((testimonial) => (
        <li key={testimonial.id}>
          <TestimonialCard testimonial={testimonial} />
        </li>
      ))}
    </ul>
  );
}
