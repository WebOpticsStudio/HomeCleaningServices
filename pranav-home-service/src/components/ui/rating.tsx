import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Read-only star rating with a text alternative for screen readers. */
export function Rating({
  value,
  max = 5,
  className,
}: {
  value: number;
  max?: number;
  className?: string;
}) {
  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      role="img"
      aria-label={`Rated ${value} out of ${max}`}
    >
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn('size-4', i < value ? 'fill-lemon-strong text-lemon-strong' : 'text-grout')}
        />
      ))}
    </div>
  );
}
