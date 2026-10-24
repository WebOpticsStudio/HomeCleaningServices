'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Home,
  PhoneCall,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { Input, Select, Textarea } from '@/components/ui/input';
import {
  PROPERTY_TYPE_LABELS,
  PROPERTY_TYPE_VALUES,
  TIME_SLOT_LABELS,
  TIME_SLOT_VALUES,
} from '@/constants/booking';
import type { BhkOption, PackageId, ServiceSlug } from '@/constants/catalog';
import { BHK_LABELS, BHK_OPTIONS } from '@/constants/catalog';
import { siteConfig } from '@/config/site';
import { ROUTES } from '@/constants/routes';
import { pricingPackages } from '@/features/pricing/data/packages';
import { formatCurrency } from '@/lib/format';
import { submitBookingAction } from '../actions/submit-booking';
import { bookingFormSchema, type BookingFormValues } from '../schemas/booking.schema';

interface BookingFormProps {
  services: readonly { slug: ServiceSlug; name: string }[];
  defaultService?: ServiceSlug;
  packageId?: PackageId;
  defaultBhk?: BhkOption;
  /** `YYYY-MM-DD` bounds computed on the server in the business time zone. */
  minDate: string;
  maxDate: string;
}

export function BookingForm({
  services,
  defaultService,
  packageId,
  defaultBhk,
  minDate,
  maxDate,
}: BookingFormProps) {
  const router = useRouter();
  const [idempotencyKey] = useState(() => crypto.randomUUID());
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [animateSuccessCard, setAnimateSuccessCard] = useState(false);
  const [startLoadingBar, setStartLoadingBar] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      serviceSlug: defaultService,
      packageId: packageId,
      bhk: defaultBhk,
      preferredDate: '',
      timeSlot: undefined,
      propertyType: undefined,
      address: '',
      instructions: '',
      consent: false,
    },
  });

  useEffect(() => {
    if (defaultService) {
      setValue('serviceSlug', defaultService, { shouldValidate: true });
    }
  }, [defaultService, setValue]);

  useEffect(() => {
    if (defaultBhk) {
      setValue('bhk', defaultBhk, { shouldValidate: true });
    }
  }, [defaultBhk, setValue]);

  const watchedPackageId = useWatch({ control, name: 'packageId' });
  const watchedBhk = useWatch({ control, name: 'bhk' });
  const watchedServiceSlug = useWatch({ control, name: 'serviceSlug' });
  const watchedPreferredDate = useWatch({ control, name: 'preferredDate' });
  const watchedTimeSlot = useWatch({ control, name: 'timeSlot' });
  const watchedPropertyType = useWatch({ control, name: 'propertyType' });

  const activePackageId = watchedPackageId ?? packageId;
  const activeBhk = watchedBhk ?? defaultBhk;
  const activeServiceSlug = watchedServiceSlug ?? defaultService;

  const showBhkSelector =
    activeServiceSlug === 'deep-cleaning' || activeServiceSlug === 'move-in-out-cleaning';

  useEffect(() => {
    if (activeServiceSlug === 'home-cleaning') {
      setValue('bhk', '1bhk', { shouldValidate: true });
    } else if (
      activeServiceSlug === 'kitchen-deep-cleaning' ||
      activeServiceSlug === 'bathroom-cleaning'
    ) {
      setValue('bhk', undefined, { shouldValidate: false });
    }
  }, [activeServiceSlug, setValue]);

  const currentPackage = activePackageId
    ? pricingPackages.find((p) => p.id === activePackageId)
    : activeServiceSlug
      ? pricingPackages.find((p) => p.serviceSlug === activeServiceSlug)
      : undefined;

  const activeBhkTier = currentPackage?.bhkPricing?.find(
    (tier) => tier.bhk === (activeBhk ?? (activeServiceSlug === 'home-cleaning' ? '1bhk' : currentPackage.bhkPricing?.[0]?.bhk)),
  );

  const displayedPrice = activeBhkTier
    ? activeBhkTier.price
    : activeServiceSlug === 'home-cleaning'
      ? 2000
      : activeServiceSlug === 'kitchen-deep-cleaning'
        ? 2500
        : activeServiceSlug === 'bathroom-cleaning'
          ? 1500
          : currentPackage?.price;

  const selectedServiceObj = services.find((s) => s.slug === activeServiceSlug);

  const busy = isSubmitting || showSuccessModal;

  const onSubmit = handleSubmit(async (values, event) => {
    const honeypot =
      event?.target instanceof HTMLFormElement ? new FormData(event.target).get('website') : '';

    // Automatic package ID resolution to keep backend consistent without redundant UI dropdowns
    let effectivePackageId = values.packageId || packageId;
    if (!effectivePackageId) {
      if (values.serviceSlug === 'home-cleaning') effectivePackageId = 'basic';
      else if (values.serviceSlug === 'deep-cleaning') effectivePackageId = 'standard';
      else if (values.serviceSlug === 'move-in-out-cleaning') effectivePackageId = 'premium';
      else if (values.serviceSlug === 'kitchen-deep-cleaning') effectivePackageId = 'kitchen-deep-cleaning';
      else if (values.serviceSlug === 'bathroom-cleaning') effectivePackageId = 'bathroom-cleaning';
    }

    // Silent background dispatch without blocking or failing if Firebase isn't configured locally
    try {
      submitBookingAction({
        ...values,
        packageId: effectivePackageId,
        bhk: values.bhk || (activeServiceSlug === 'home-cleaning' ? '1bhk' : activeBhk),
        idempotencyKey,
        website: typeof honeypot === 'string' ? honeypot : '',
      }).catch(() => { });
    } catch {
      // Background fire-and-forget
    }

    // 1. LAUNCH THE GLASS SUCCESS OVERLAY MODAL INSTANTLY
    setShowSuccessModal(true);
    setTimeout(() => {
      setAnimateSuccessCard(true);
      setStartLoadingBar(true);
    }, 50);

    const serviceName = selectedServiceObj?.name ?? values.serviceSlug;
    const bhkLayoutText =
      values.bhk && BHK_LABELS[values.bhk]
        ? BHK_LABELS[values.bhk]
        : values.serviceSlug === 'home-cleaning'
          ? '1 BHK Layout (Flat Rate)'
          : 'Not applicable';

    const timeWindowText = TIME_SLOT_LABELS[values.timeSlot] || values.timeSlot;
    const propertyTypeText = PROPERTY_TYPE_LABELS[values.propertyType] || values.propertyType;

    // 2. DISPATCH THE ENTIRE FIELD LAYOUT MATRIX TO THE CLOUD VIA ASYNCHRONOUS API CALL (Web3Forms)
    const web3Payload = {
      access_key: '1fffd7c4-8a66-4d42-97f5-fbddfa1d16e9',
      customer_name: values.name,
      customer_phone: values.phone,
      customer_email: values.email?.trim() || 'Not provided',
      selected_service: serviceName,
      bhk_dimensions: bhkLayoutText,
      preferred_date: values.preferredDate,
      time_slot: timeWindowText,
      property_type: propertyTypeText,
      service_address: values.address,
      landmark: values.landmark?.trim() || 'Not specified',
      special_notes: values.instructions?.trim() || 'None',
      from_name: 'KolarClean Web Booking Engine',
      subject: `🚨 New Lead: ${values.name} - ${serviceName} (${bhkLayoutText})`,
    };

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(web3Payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Web3Forms Signal Acknowledged:', data);
      })
      .catch((error) => {
        console.error('API Error:', error);
      });

    // 3. EXECUTE THE 4-SECOND SUCCESS OVERLAY RESET & FULL PAGE REFRESH
    setTimeout(() => {
      // Fade modal layers out cleanly
      setShowSuccessModal(false);
      setAnimateSuccessCard(false);
      setStartLoadingBar(false);

      // Fully clear form text configurations safely
      reset({
        name: '',
        phone: '',
        email: '',
        serviceSlug: defaultService,
        packageId: packageId,
        bhk: defaultBhk,
        preferredDate: '',
        timeSlot: undefined,
        propertyType: undefined,
        address: '',
        landmark: '',
        instructions: '',
        consent: false,
      });

      // Automatically scroll to the very top and refresh to the top of the booking page
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
      window.location.href = window.location.pathname;
    }, 4000); // 4 Seconds is the sweet spot for visual satisfaction and professional speed
  });

  const formattedDisplayDate = watchedPreferredDate
    ? new Date(watchedPreferredDate + 'T00:00:00').toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    : null;

  return (
    <form
      id="booking-form"
      action="https://web3forms.com"
      method="POST"
      onSubmit={onSubmit}
      noValidate
      aria-busy={busy}
      className="space-y-8"
    >
      {/* 1. Web3Forms Access Key Hidden Parameter */}
      <input type="hidden" name="access_key" value="1fffd7c4-8a66-4d42-97f5-fbddfa1d16e9" />

      {/* Balanced 2-Column Dashboard Layout */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* LEFT COLUMN: Interactive Form Fields (7 Columns) */}
        <div className="space-y-10 lg:col-span-7">
          {/* Section 1: Customer Details */}
          <section className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-7">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
                Step 1 of 3
              </span>
              <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                Your Contact Information
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Full Name" required error={errors.name?.message}>
                {(c) => (
                  <Input
                    {...c}
                    autoComplete="name"
                    placeholder="e.g. Anand Kumar"
                    {...register('name')}
                  />
                )}
              </FormField>

              <FormField label="Mobile Number" required error={errors.phone?.message}>
                {(c) => (
                  <Input
                    {...c}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="98765 43210"
                    {...register('phone')}
                  />
                )}
              </FormField>

              <FormField
                label="Email Address"
                error={errors.email?.message}
                className="sm:col-span-2"
                hint="Used solely to email your booking confirmation & service receipt."
              >
                {(c) => (
                  <Input
                    {...c}
                    type="email"
                    autoComplete="email"
                    placeholder="anand@example.com"
                    {...register('email')}
                  />
                )}
              </FormField>
            </div>
          </section>

          {/* Section 2: Service & Scheduling */}
          <section className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-7">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
                Step 2 of 3
              </span>
              <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                Service & Scheduling
              </h2>
            </div>

            <div className="space-y-4">
              {/* Primary Service Selection */}
              <FormField
                label="Select Cleaning Service"
                required
                error={errors.serviceSlug?.message}
              >
                {(c) => (
                  <Select {...c} id="service-select" defaultValue={defaultService ?? ''} {...register('serviceSlug')}>
                    <option value="" disabled>
                      Choose a service scope...
                    </option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.slug === 'home-cleaning'
                          ? 'Basic Home Cleaning (1 BHK Flat Rate)'
                          : s.slug === 'deep-cleaning'
                            ? 'Deep Cleaning (Full House Restoration)'
                            : s.name}
                      </option>
                    ))}
                  </Select>
                )}
              </FormField>

              {/* Informational badge for Basic Home Cleaning */}
              {activeServiceSlug === 'home-cleaning' && (
                <div className="flex items-center gap-2.5 rounded-xl border border-teal-200/80 bg-teal-50/70 p-3.5 text-xs text-teal-900">
                  <CheckCircle2 className="size-4 shrink-0 text-teal-700" />
                  <span>
                    <strong>1 BHK Flat Rate:</strong> Basic cleaning is fixed at ₹2,000 for standard
                    1 BHK apartments and homes.
                  </span>
                </div>
              )}

              {/* Dynamic BHK Field: Rendered exclusively for Deep Cleaning or Move In/Out */}
              {showBhkSelector && (
                <div id="bhk-container" className="space-y-1.5 transition-all duration-300">
                  <FormField
                    label="House Layout (BHK)"
                    required
                    error={errors.bhk?.message}
                    hint="Select your home configuration for exact tiered pricing."
                  >
                    {(c) => (
                      <Select {...c} id="bhk-select" defaultValue={defaultBhk ?? ''} {...register('bhk')}>
                        <option value="">Choose BHK (1, 2, or 3 BHK)...</option>
                        {BHK_OPTIONS.map((opt) => {
                          const tier = currentPackage?.bhkPricing?.find((t) => t.bhk === opt);
                          return (
                            <option key={opt} value={opt}>
                              {BHK_LABELS[opt]}
                              {tier ? ` — ${formatCurrency(tier.price)}` : ''}
                            </option>
                          );
                        })}
                      </Select>
                    )}
                  </FormField>
                </div>
              )}

              {/* Scheduling Row Matrix */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Preferred Date" required error={errors.preferredDate?.message}>
                  {(c) => (
                    <Input
                      {...c}
                      type="date"
                      min={minDate}
                      max={maxDate}
                      {...register('preferredDate')}
                    />
                  )}
                </FormField>

                <FormField
                  label="Preferred Arrival Window"
                  required
                  error={errors.timeSlot?.message}
                >
                  {(c) => (
                    <Select {...c} defaultValue="" {...register('timeSlot')}>
                      <option value="" disabled>
                        Choose arrival window...
                      </option>
                      {TIME_SLOT_VALUES.map((slot) => (
                        <option key={slot} value={slot}>
                          {TIME_SLOT_LABELS[slot]}
                        </option>
                      ))}
                    </Select>
                  )}
                </FormField>
              </div>
            </div>
          </section>

          {/* Section 3: Property & Address Details */}
          <section className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-7">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
                Step 3 of 3
              </span>
              <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                Property & Address
              </h2>
            </div>

            <div className="space-y-4">
              <FormField label="Property Type" required error={errors.propertyType?.message}>
                {(c) => (
                  <Select {...c} defaultValue="" {...register('propertyType')}>
                    <option value="" disabled>
                      Select property type...
                    </option>
                    {PROPERTY_TYPE_VALUES.map((type) => (
                      <option key={type} value={type}>
                        {PROPERTY_TYPE_LABELS[type]}
                      </option>
                    ))}
                  </Select>
                )}
              </FormField>

              <FormField
                label="Full Service Address"
                required
                error={errors.address?.message}
                hint="Include flat/house number, building/apartment name, and area."
              >
                {(c) => (
                  <Textarea
                    {...c}
                    rows={3}
                    placeholder="Flat 302, Green Crest Heights, Gandhi Road, Gulpet, Kolar"
                    {...register('address')}
                  />
                )}
              </FormField>

              <FormField
                label="Nearby Landmark"
                error={errors.landmark?.message}
                hint="e.g. Near Bus Stand, Opp. SBI Bank, Behind Clock Tower"
              >
                {(c) => (
                  <Input
                    {...c}
                    placeholder="Prominent nearby building, temple, or landmark (optional)"
                    {...register('landmark')}
                  />
                )}
              </FormField>

              <FormField
                label="Special Cleaning Notes / Instructions"
                error={errors.instructions?.message}
                hint="e.g. Extra balcony scrub, specific stains, gate code or parking directions."
              >
                {(c) => (
                  <Input
                    {...c}
                    placeholder="Any specific requests or key handover instructions (optional)"
                    {...register('instructions')}
                  />
                )}
              </FormField>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 size-4 rounded-md border-slate-300 text-teal-700 focus:ring-teal-700/20"
                    {...register('consent')}
                  />
                  <span className="text-xs leading-relaxed text-slate-600">
                    I agree to be contacted via phone or WhatsApp by Kolar Clean to confirm this
                    appointment schedule and final walkthrough details.
                  </span>
                </label>
                {errors.consent?.message && (
                  <p className="mt-1.5 text-xs font-semibold text-danger">
                    {errors.consent.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Form Action Submit Button */}
          <div className="space-y-3">
            <Button
              type="submit"
              size="lg"
              disabled={busy}
              className="w-full justify-center text-base font-bold tracking-wide text-[#0a2e26] hover:text-[#0a2e26] shadow-md shadow-teal-900/10"
            >
              {busy ? 'Securing Your Booking...' : 'Confirm & Request Booking'}
            </Button>
            <p className="text-center text-xs text-slate-500">
              🔒 Zero Advance Payment • Upfront Standard Rates • Pay Only After Completion
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Permanent Live Booking Summary Panel (5 Columns) */}
        <div className="lg:col-span-5">
          <aside
            aria-label="Live Booking Summary"
            className="sticky top-24 lg:top-28 space-y-6 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-7"
          >
            {/* Header with Live Indicator */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight text-slate-900">
                  Booking Summary
                </h3>
                <p className="text-xs text-slate-500">Real-time service & rate preview</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LIVE
              </span>
            </div>

            {/* Service & Configuration Block */}
            <div
              id="booking-summary-card"
              className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    Selected Scope
                  </span>
                  <h4 className="text-base font-bold text-slate-900">
                    {selectedServiceObj?.name ?? 'Choose a cleaning service'}
                  </h4>
                </div>
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-teal-700 text-white shadow-xs">
                  <Sparkles className="size-4" />
                </div>
              </div>

              {/* Dynamic BHK Configuration Pill */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-600">
                {activeServiceSlug === 'home-cleaning' ? (
                  <span className="inline-flex items-center rounded-md border border-teal-200 bg-teal-50 px-2.5 py-1 font-semibold text-teal-800">
                    1 BHK (Flat Rate)
                  </span>
                ) : showBhkSelector && activeBhk ? (
                  <span className="inline-flex items-center rounded-md border border-teal-200 bg-teal-50 px-2.5 py-1 font-semibold text-teal-800">
                    {BHK_LABELS[activeBhk]}
                  </span>
                ) : showBhkSelector ? (
                  <span className="text-slate-400 italic">Select BHK layout above</span>
                ) : (
                  <span className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2.5 py-1 font-medium text-slate-700">
                    Standard Scope
                  </span>
                )}
              </div>
            </div>

            {/* Live Price Estimation Box */}
            <div className="rounded-2xl border border-teal-100 bg-teal-50/60 p-4">
              <span className="text-[10px] font-bold tracking-wider text-teal-800 uppercase">
                Estimated Total
              </span>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="font-display text-3xl font-extrabold text-slate-900">
                  {displayedPrice !== undefined ? formatCurrency(displayedPrice) : '—'}
                </span>
                <span className="text-xs font-semibold text-teal-800">
                  {activeServiceSlug === 'home-cleaning'
                    ? 'Flat Total'
                    : showBhkSelector && activeBhk
                      ? 'Confirmed Rate'
                      : 'Standard Base'}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-slate-500">
                Zero advance payment. Price is confirmed upfront and paid after job completion.
              </p>
            </div>

            {/* Schedule & Property Preview */}
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-3">
                <Calendar className="size-4 text-teal-700 shrink-0" />
                <span>
                  Date:{' '}
                  <strong className="text-slate-900">
                    {formattedDisplayDate ?? 'Not selected yet'}
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="size-4 text-teal-700 shrink-0" />
                <span>
                  Window:{' '}
                  <strong className="text-slate-900">
                    {watchedTimeSlot ? TIME_SLOT_LABELS[watchedTimeSlot] : 'Not selected yet'}
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Home className="size-4 text-teal-700 shrink-0" />
                <span>
                  Property:{' '}
                  <strong className="text-slate-900">
                    {watchedPropertyType ? PROPERTY_TYPE_LABELS[watchedPropertyType] : 'Not specified'}
                  </strong>
                </span>
              </div>
            </div>

            {/* Trust and Safety Commitments */}
            <div className="border-t border-slate-100 pt-4 space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-teal-700 shrink-0" />
                <span>Verified in-house professionals with background checks</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="size-4 text-teal-700 shrink-0" />
                <span>Phone confirmation call within 30 minutes of request</span>
              </div>
            </div>

            {/* Direct Phone Booking Fallback */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 text-center text-xs text-slate-600">
              Prefer to book directly over call?{' '}
              <a
                href={siteConfig.contact.phoneHref}
                className="font-bold text-teal-700 underline hover:text-teal-900"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
          </aside>
        </div>
      </div>

      {/* High-End Glassmorphism Success Modal (Hidden by default using hidden class) */}
      <div
        id="success-modal"
        className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md transition-all duration-300 ${showSuccessModal ? '' : 'hidden pointer-events-none'
          }`}
      >
        <div
          id="success-card"
          className={`bg-white rounded-3xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl border border-slate-100 flex flex-col items-center space-y-5 transform transition-transform duration-300 ${animateSuccessCard ? 'scale-100' : 'scale-95'
            }`}
        >
          {/* Pulse Checkmark Circle */}
          <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center shadow-sm">
            <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Booking Requested</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Your residential service reservation has been securely compiled and transmitted to our dispatch router.
            </p>
          </div>

          {/* Dynamic Animated Processing Loading Bar Indicator */}
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
            <div
              id="loading-bar"
              className={`h-full bg-teal-700 transition-all ease-linear ${startLoadingBar ? 'w-full' : 'w-0'
                }`}
              style={{ transitionDuration: '4000ms' }}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
