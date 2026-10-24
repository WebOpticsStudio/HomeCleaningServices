import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Check, Clock } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SERVICE_SLUGS } from '@/constants/catalog';
import { ROUTES, bookingUrl } from '@/constants/routes';
import { ServiceGrid } from '@/features/services/components/service-grid';
import { pricingPackages } from '@/features/pricing/data/packages';
import { getRelatedServices, getServiceBySlug } from '@/features/services/lib/get-services';
import { formatCurrency } from '@/lib/format';
import { createMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

// Only slugs from the catalog exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const priceDescription =
    service.slug === 'home-cleaning'
      ? `${formatCurrency(service.startingPrice)} / Flat Rate (Ideal for 1 BHK)`
      : service.slug === 'kitchen-deep-cleaning' || service.slug === 'bathroom-cleaning'
        ? `${formatCurrency(service.startingPrice)} ${service.priceNote}`
        : `From ${formatCurrency(service.startingPrice)}`;
  return createMetadata({
    title: service.name,
    description: `${service.shortDescription} ${priceDescription}.`,
    path: ROUTES.service(service.slug),
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const pkg = pricingPackages.find((p) => p.serviceSlug === service.slug);

  return (
    <>
      <div className="border-b border-grout bg-rinse">
        <Container className="grid items-center gap-10 py-12 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold sm:text-5xl">{service.name}</h1>
            <p className="mt-4 text-lg text-ink-soft">{service.description}</p>
            {service.slug === 'home-cleaning' ? (
              <p className="mt-6 flex flex-wrap items-baseline gap-2">
                <span className="font-display text-3xl font-bold">
                  {formatCurrency(service.startingPrice)}
                </span>
                <span className="text-xl font-medium text-ink-soft">
                  / Flat Rate (Ideal for 1 BHK)
                </span>
              </p>
            ) : service.slug === 'kitchen-deep-cleaning' || service.slug === 'bathroom-cleaning' ? (
              <p className="mt-6 flex flex-wrap items-baseline gap-2">
                <span className="font-display text-3xl font-bold">
                  {formatCurrency(service.startingPrice)}
                </span>
                <span className="text-xl font-medium text-ink-soft">
                  {service.priceNote}
                </span>
              </p>
            ) : pkg?.bhkPricing && pkg.bhkPricing.length > 1 ? (
              <div className="mt-6 space-y-3">
                <div>
                  <span className="font-display text-3xl font-bold text-slate-900">
                    From {formatCurrency(service.startingPrice)}
                  </span>
                </div>
                {/* Soft-tinted rectangular capsules / rounded pills with sharp typography */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {pkg.bhkPricing.map((tier) => (
                    <div
                      key={tier.bhk}
                      className="inline-flex items-center gap-2.5 rounded-xl border border-teal-200/80 bg-white/90 px-3.5 py-1.5 shadow-2xs backdrop-blur-xs transition-all hover:border-teal-400 hover:shadow-xs"
                    >
                      <span className="text-xs font-bold tracking-wider text-teal-800 uppercase">
                        {tier.label}
                      </span>
                      <span className="h-3.5 w-px bg-slate-200" />
                      <span className="font-display text-sm font-bold text-slate-900">
                        {formatCurrency(tier.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="mt-6 flex flex-wrap items-baseline gap-2">
                <span className="font-display text-3xl font-bold">
                  From {formatCurrency(service.startingPrice)}
                </span>
                <span className="text-ink-soft">{service.priceNote}</span>
              </p>
            )}

            {/* Fully Refined Premium Duration & Service Metrics */}
            <div className="pt-4">
              {/* Duration Badge with Clean Styling Borders */}
              <div className="inline-flex items-center gap-2 rounded-lg border border-slate-900/10 bg-slate-900/5 px-3 py-1.5 text-xs font-semibold text-slate-600 backdrop-blur-xs">
                <Clock className="size-3.5 shrink-0 text-teal-700" aria-hidden="true" />
                <span>
                  Estimated Clean Duration:{' '}
                  <span className="font-bold text-slate-900">{service.duration}</span>
                </span>
              </div>
            </div>
            <ButtonLink href={bookingUrl({ service: service.slug })} size="lg" className="mt-8">
              Book {service.name.toLowerCase()}
            </ButtonLink>
          </div>
          <Image
            src={service.image.src}
            alt={service.image.alt}
            width={service.image.width}
            height={service.image.height}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="w-full rounded-card border border-grout"
          />
        </Container>
      </div>

      {/* Fully Constrained & Centered Details Row Grid */}
      <section id="included" className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 lg:py-20 font-sans">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Zone: "The Service Checklist & Inclusions" Detailed Checklist Grid (Takes 7 Columns) */}
          <div className="space-y-6 lg:col-span-7 lg:space-y-8">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 lg:text-2xl leading-snug">
              The Service Checklist & Inclusions
            </h2>

            {/* Spaced, Two-Column Inclusions Grid Checklist */}
            <ul className="grid grid-cols-1 gap-x-6 gap-y-4 text-xs font-medium text-slate-600 sm:grid-cols-2 md:text-sm">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-teal-600"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Zone: Premium Isolated Target Demographic Card Box (Takes 5 Columns) with structural vertical border line */}
          <div className="lg:col-span-5 lg:border-l lg:border-slate-200 lg:pl-10 lg:pt-0.5">
            <div className="space-y-5 rounded-2xl border border-slate-100 bg-slate-50/70 p-6 sm:p-8">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-teal-900 sm:text-sm">
                IDEAL FOR
              </h3>

              {/* Refined custom micro-indicators list */}
              <ul className="space-y-3.5 text-xs font-medium text-slate-600 md:text-sm">
                {service.idealFor.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span
                      className="size-1.5 shrink-0 rounded-full bg-teal-500"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Section id="related" title="Other services" tone="tint">
        <ServiceGrid services={getRelatedServices(service.slug, 2)} />
      </Section>
    </>
  );
}
