import { z } from 'zod';
import { BOOKING_LIMITS, PROPERTY_TYPE_VALUES, TIME_SLOT_VALUES } from '@/constants/booking';
import { BHK_OPTIONS, PACKAGE_IDS, SERVICE_SLUGS } from '@/constants/catalog';
import { siteConfig } from '@/config/site';
import { addDaysIso, isValidIsoDate, todayInTimeZone } from '@/lib/date';
import { isValidPhone } from '../lib/normalize';

/** Returns an error message if `date` is not bookable, otherwise `null`. */
export function getBookingDateError(date: string, now: Date = new Date()): string | null {
  if (!isValidIsoDate(date)) return 'Choose a valid date.';
  const today = todayInTimeZone(siteConfig.timezone, now);
  if (date < today) return 'Choose today or a future date.';
  if (date > addDaysIso(today, BOOKING_LIMITS.maxDaysAhead)) {
    return `Bookings open up to ${BOOKING_LIMITS.maxDaysAhead} days ahead.`;
  }
  return null;
}

/**
 * Fields the customer fills in. Shared by the browser form (React Hook Form) and the
 * server, so both sides enforce exactly the same rules.
 */
export const bookingFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(BOOKING_LIMITS.nameMin, 'Enter your full name.')
    .max(BOOKING_LIMITS.nameMax, `Use ${BOOKING_LIMITS.nameMax} characters or fewer.`),
  phone: z
    .string()
    .trim()
    .refine(isValidPhone, 'Enter a valid mobile number, for example 98765 43210.'),
  email: z.union([
    z.literal(''),
    z.string().trim().max(254).pipe(z.email('Enter a valid email address.')),
  ]),
  serviceSlug: z.enum(SERVICE_SLUGS, { error: 'Choose a service.' }),
  packageId: z.enum(PACKAGE_IDS).or(z.literal('')).optional(),
  bhk: z.enum(BHK_OPTIONS).or(z.literal('')).optional(),
  preferredDate: z.string().superRefine((value, ctx) => {
    const message = getBookingDateError(value);
    if (message) ctx.addIssue({ code: 'custom', message });
  }),
  timeSlot: z.enum(TIME_SLOT_VALUES, { error: 'Choose a time slot.' }),
  propertyType: z.enum(PROPERTY_TYPE_VALUES, { error: 'Choose a property type.' }),
  address: z
    .string()
    .trim()
    .min(BOOKING_LIMITS.addressMin, 'Enter the full address, including area and street.')
    .max(BOOKING_LIMITS.addressMax, `Use ${BOOKING_LIMITS.addressMax} characters or fewer.`),
  landmark: z
    .string()
    .trim()
    .max(120, 'Use 120 characters or fewer.')
    .optional(),
  instructions: z
    .string()
    .trim()
    .max(
      BOOKING_LIMITS.instructionsMax,
      `Use ${BOOKING_LIMITS.instructionsMax} characters or fewer.`,
    ),
  consent: z
    .boolean()
    .refine((value) => value, 'Please agree so we can contact you about this booking.'),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

/** What the server accepts: form fields plus anti-abuse and idempotency metadata. */
export const bookingSubmissionSchema = bookingFormSchema.extend({
  packageId: z
    .enum(PACKAGE_IDS)
    .optional()
    .or(z.literal('').transform(() => undefined)),
  bhk: z
    .enum(BHK_OPTIONS)
    .optional()
    .or(z.literal('').transform(() => undefined)),
  idempotencyKey: z.uuid('Invalid request. Refresh the page and try again.'),
  /** Honeypot: real users never see or fill this field. */
  website: z.string().max(200).optional(),
});

export type BookingSubmission = z.infer<typeof bookingSubmissionSchema>;
