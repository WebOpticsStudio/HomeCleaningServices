'use client';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { siteConfig } from '@/config/site';

export default function BookingError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="max-w-xl py-24 text-center">
      <h1 className="text-3xl font-bold">We could not load the booking form</h1>
      <p className="mt-3 text-ink-soft">
        Please try again, or call {siteConfig.contact.phone} and we will book you in over the phone.
      </p>
      <Button onClick={reset} className="mt-8">
        Try again
      </Button>
    </Container>
  );
}
