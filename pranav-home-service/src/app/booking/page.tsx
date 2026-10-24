import { Container } from '@/components/ui/container';
import { siteConfig } from '@/config/site';
import { BOOKING_LIMITS } from '@/constants/booking';
import {
  isBhkOption,
  isPackageId,
  isServiceSlug,
  type PackageId,
  type ServiceSlug,
} from '@/constants/catalog';
import { ROUTES } from '@/constants/routes';
import { BookingForm } from '@/features/booking/components/booking-form';
import { getServices } from '@/features/services/lib/get-services';
import { addDaysIso, todayInTimeZone } from '@/lib/date';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Book a cleaning',
  description:
    'Request a home cleaning booking online. Choose a service, date and time, and we will call to confirm.',
  path: ROUTES.booking,
});

type Props = {
  searchParams: Promise<{
    service?: string | string[];
    package?: string | string[];
    bhk?: string | string[];
  }>;
};

export default async function BookingPage({ searchParams }: Props) {
  const { service, package: pkg, bhk } = await searchParams;
  const today = todayInTimeZone(siteConfig.timezone);

  const rawService = Array.isArray(service) ? service[0] : service;
  const rawPkg = Array.isArray(pkg) ? pkg[0] : pkg;
  const rawBhk = Array.isArray(bhk) ? bhk[0] : bhk;

  let defaultService: ServiceSlug | undefined = undefined;
  if (isServiceSlug(rawService)) {
    defaultService = rawService;
  } else if (rawPkg === 'kitchen-deep-cleaning') {
    defaultService = 'kitchen-deep-cleaning';
  } else if (rawPkg === 'bathroom-cleaning') {
    defaultService = 'bathroom-cleaning';
  } else if (rawPkg === 'basic') {
    defaultService = 'home-cleaning';
  } else if (rawPkg === 'standard') {
    defaultService = 'deep-cleaning';
  } else if (rawPkg === 'premium' || rawPkg === 'move-in-out') {
    defaultService = 'move-in-out-cleaning';
  }

  const packageId: PackageId | undefined = isPackageId(rawPkg)
    ? rawPkg
    : rawService === 'kitchen-deep-cleaning'
      ? 'kitchen-deep-cleaning'
      : rawService === 'bathroom-cleaning'
        ? 'bathroom-cleaning'
        : undefined;

  const defaultBhk = isBhkOption(rawBhk) ? rawBhk : undefined;

  return (
    <>
      <div className="border-b border-slate-100 bg-[#F8FAFC]">
        <Container className="pt-8 pb-6 sm:pt-10 sm:pb-7">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Book a cleaning
          </h1>
        </Container>
      </div>
      <Container className="pt-6 pb-12 sm:pt-7 sm:pb-16">
        <BookingForm
          services={getServices().map(({ slug, name }) => ({ slug, name }))}
          defaultService={defaultService}
          packageId={packageId}
          defaultBhk={defaultBhk}
          minDate={today}
          maxDate={addDaysIso(today, BOOKING_LIMITS.maxDaysAhead)}
        />
      </Container>
    </>
  );
}
