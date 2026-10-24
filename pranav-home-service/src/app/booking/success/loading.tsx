import { Container } from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <Container className="max-w-2xl py-16" aria-busy="true">
      <p className="sr-only" role="status">
        Loading your booking
      </p>
      <Skeleton className="h-64" />
    </Container>
  );
}
