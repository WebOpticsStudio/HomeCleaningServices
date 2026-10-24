import { CalendarCheck } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { TIME_SLOT_LABELS } from '@/constants/booking';
import { BOOKING_ID_PATTERN } from '@/constants/booking';
import { ROUTES } from '@/constants/routes';
import { siteConfig } from '@/config/site';
import { getBookingService } from '@/features/booking/server';
import type { BookingSummary } from '@/features/booking/types';
import { getServiceBySlug } from '@/features/services/lib/get-services';
import { formatIsoDate } from '@/lib/format';
import { logger } from '@/lib/logger';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Booking request received',
  description: 'Your cleaning booking request has been received.',
  path: ROUTES.bookingSuccess,
  noIndex: true,
});

type Props = { searchParams: Promise<{ id?: string | string[] }> };

async function loadSummary(id: string): Promise<BookingSummary | null> {
  try {
    return await getBookingService().getSummary(id);
  } catch (error) {
    // The confirmation still works without the summary, so degrade gracefully.
    logger.warn('Could not load booking summary', {
      reason: error instanceof Error ? error.name : 'unknown',
    });
    return null;
  }
}

export default async function BookingSuccessPage({ searchParams }: Props) {
  const { id } = await searchParams;
  const bookingId = typeof id === 'string' && BOOKING_ID_PATTERN.test(id) ? id : null;

  if (!bookingId) {
    return (
      <Container className="max-w-xl py-20 text-center">
        <h1 className="text-3xl font-bold">We could not find that booking</h1>
        <p className="mt-3 text-ink-soft">
          The booking reference is missing or invalid. If you just submitted a request, please call
          us.
        </p>
        <ButtonLink href={ROUTES.booking} className="mt-8">
          Make a booking
        </ButtonLink>
      </Container>
    );
  }

  const summary = await loadSummary(bookingId);
  const service = summary ? getServiceBySlug(summary.serviceSlug) : undefined;

  return (
    <Container className="max-w-2xl py-16">
      <div className="rounded-card border border-success/40 bg-success-soft p-8 text-center">
        <CalendarCheck className="mx-auto size-10 text-success" aria-hidden="true" />
        <h1 className="mt-4 text-3xl font-bold">Request received</h1>
        <p className="mt-2 text-ink-soft">We will call you shortly to confirm your booking.</p>
        <p className="mt-6 text-sm text-ink-soft">Your booking reference</p>
        <p className="font-display text-3xl font-bold tracking-wide">{bookingId}</p>
        {summary && (
          <dl className="mx-auto mt-6 max-w-sm space-y-1 text-left">
            {service && (
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">Service</dt>
                <dd className="font-semibold">{service.name}</dd>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <dt className="text-ink-soft">Date</dt>
              <dd className="font-semibold">{formatIsoDate(summary.date)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-soft">Time</dt>
              <dd className="font-semibold">{TIME_SLOT_LABELS[summary.timeSlot]}</dd>
            </div>
          </dl>
        )}
      </div>
      <p className="mt-6 text-center text-ink-soft">
        Keep your reference handy. Need to change something? Call{' '}
        <a className="font-semibold underline" href={siteConfig.contact.phoneHref}>
          {siteConfig.contact.phone}
        </a>
        .
      </p>
      <div className="mt-6 flex justify-center">
        <ButtonLink href={ROUTES.home} variant="outline">
          Back to home
        </ButtonLink>
      </div>
    </Container>
  );
}
