import { Container } from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <Container className="py-12" aria-busy="true">
      <p className="sr-only" role="status">
        Loading gallery
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton key={i} className="h-60" />
        ))}
      </div>
    </Container>
  );
}
