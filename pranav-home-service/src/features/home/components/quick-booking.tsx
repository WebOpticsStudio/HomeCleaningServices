'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, Calendar, CheckCircle2, ShieldCheck, ShoppingCart } from 'lucide-react';
import { Alert } from '@/components/ui/alert';
import { Container } from '@/components/ui/container';
import { BOOKING_LIMITS } from '@/constants/booking';
import { SERVICE_SLUGS } from '@/constants/catalog';
import { ROUTES } from '@/constants/routes';
import { submitBookingAction } from '@/features/booking/actions/submit-booking';
import { isValidPhone } from '@/features/booking/lib/normalize';
import { getBookingDateError } from '@/features/booking/schemas/booking.schema';
import { getServices } from '@/features/services/lib/get-services';

const quickBookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(BOOKING_LIMITS.nameMin, 'Enter your full name.')
    .max(BOOKING_LIMITS.nameMax, `Use ${BOOKING_LIMITS.nameMax} characters or fewer.`),
  phone: z.string().trim().refine(isValidPhone, 'Enter a valid 10-digit mobile number.'),
  serviceSlug: z.enum(SERVICE_SLUGS, { error: 'Choose a service.' }),
  preferredDate: z.string().superRefine((value, ctx) => {
    const message = getBookingDateError(value);
    if (message) ctx.addIssue({ code: 'custom', message });
  }),
});

type QuickBookingValues = z.infer<typeof quickBookingSchema>;

export function QuickBookingSection() {
  const router = useRouter();
  const [idempotencyKey] = useState(() => crypto.randomUUID());
  const [formError, setFormError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const services = getServices();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuickBookingValues>({
    resolver: zodResolver(quickBookingSchema),
    defaultValues: {
      name: '',
      phone: '',
      serviceSlug: 'deep-cleaning',
      preferredDate: '',
    },
  });

  const busy = isSubmitting || isRedirecting;

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    try {
      const result = await submitBookingAction({
        name: values.name,
        phone: values.phone,
        email: '',
        serviceSlug: values.serviceSlug,
        preferredDate: values.preferredDate,
        timeSlot: '10:00-12:00',
        propertyType: 'apartment',
        address: 'Kolar, Karnataka (Confirmed on callback)',
        instructions: 'Requested via Cleanora quick-booking strip.',
        consent: true,
        idempotencyKey,
      });

      if (result.ok) {
        setIsRedirecting(true);
        router.push(`${ROUTES.bookingSuccess}?id=${encodeURIComponent(result.data.bookingId)}`);
        return;
      }

      setFormError(result.error.message);
    } catch {
      setFormError('Could not connect to the server. Please check your connection or call us.');
    }
  });

  return (
    <section
      id="quick-booking"
      aria-labelledby="quick-booking-heading"
      className="bg-white py-16 sm:py-20"
    >
      <Container>
        <div className="shadow-soft relative overflow-hidden rounded-3xl border border-grout/80 bg-gradient-to-br from-rinse/70 via-white to-rinse/50 p-6 sm:p-10 lg:p-12">
          {formError && (
            <Alert variant="error" title="Could not submit request" className="mb-6">
              {formError}
            </Alert>
          )}

          <div className="grid items-center gap-8 lg:grid-cols-12">
            {/* Left Column: Heading matching Cleanora */}
            <div className="lg:col-span-5">
              <p className="text-xs font-bold tracking-widest text-primary uppercase">
                Ready for a Cleaner Space?
              </p>
              <h2
                id="quick-booking-heading"
                className="mt-2 font-display text-3xl leading-tight font-extrabold text-ink sm:text-4xl"
              >
                Book Your Cleaning Service Today
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Get a free quote and experience the Kolar Clean difference. No advance payment
                required — our local team calls to confirm.
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-ink">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-primary" /> Zero advance charge
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-primary" /> Supplies included
                </span>
              </div>
            </div>

            {/* Right Column: Cleanora Horizontal Inline Booking Form */}
            <div className="lg:col-span-7">
              <form onSubmit={onSubmit} noValidate aria-busy={busy} className="space-y-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Select Service */}
                  <div className="transition-focus-within rounded-xl border border-grout bg-white p-2.5 shadow-xs focus-within:border-primary">
                    <label className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-ink-soft uppercase">
                      <ShoppingCart className="size-3 text-primary" />
                      <span>Select Service</span>
                    </label>
                    <select
                      {...register('serviceSlug')}
                      className="mt-1 w-full cursor-pointer bg-transparent text-xs font-bold text-ink focus:outline-none"
                    >
                      {SERVICE_SLUGS.map((slug) => {
                        const match = services.find((s) => s.slug === slug);
                        return (
                          <option key={slug} value={slug}>
                            {match ? match.name : slug}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* Choose Date */}
                  <div className="transition-focus-within rounded-xl border border-grout bg-white p-2.5 shadow-xs focus-within:border-primary">
                    <label className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-ink-soft uppercase">
                      <Calendar className="size-3 text-primary" />
                      <span>Choose Date</span>
                    </label>
                    <input
                      type="date"
                      {...register('preferredDate')}
                      className="mt-1 w-full cursor-pointer bg-transparent text-xs font-bold text-ink focus:outline-none"
                    />
                  </div>
                </div>

                {/* Customer Details Row */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-grout bg-white p-2.5 shadow-xs">
                    <label className="block text-[11px] font-bold tracking-wider text-ink-soft uppercase">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      {...register('name')}
                      className="mt-1 w-full bg-transparent text-xs text-ink placeholder-ink-soft/50 focus:outline-none"
                    />
                  </div>

                  <div className="rounded-xl border border-grout bg-white p-2.5 shadow-xs">
                    <label className="block text-[11px] font-bold tracking-wider text-ink-soft uppercase">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      placeholder="98765 43210"
                      {...register('phone')}
                      className="mt-1 w-full bg-transparent text-xs text-ink placeholder-ink-soft/50 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Validation Errors */}
                {(errors.name || errors.phone || errors.preferredDate) && (
                  <p className="text-xs font-medium text-danger">
                    {errors.name?.message ?? errors.phone?.message ?? errors.preferredDate?.message}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-display text-sm font-bold text-white shadow-md transition-all hover:bg-primary-strong active:scale-[0.99] disabled:opacity-70"
                >
                  <span>{busy ? 'Reserving your slot...' : 'Book Now'}</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
