import { CtaBanner } from '@/components/ui/cta-banner';
import { ROUTES } from '@/constants/routes';
import { ServiceGrid } from '@/features/services/components/service-grid';
import { getServices } from '@/features/services/lib/get-services';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Cleaning Services | Kolar Clean',
  description:
    'Home cleaning, deep cleaning, move-in and move-out cleaning, and bathroom and kitchen cleaning with clear starting prices.',
  path: ROUTES.services,
});

export default function ServicesPage() {
  const services = getServices();

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Premium Muted Header for Sub-Pages with compact bottom padding */}
      <section className="w-full border-b border-slate-100 bg-slate-50 pt-12 pb-7 sm:pt-14 sm:pb-8">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <span className="mb-2 block text-xs font-bold tracking-widest text-teal-700 uppercase">
            Our Expertise
          </span>
          <h1 className="mb-3 font-serif text-3xl font-bold tracking-tight text-slate-900 lg:text-5xl">
            Complete Cleaning Solutions
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-slate-500">
            Pick the clean that fits your home perfectly. Every specialized tier lists transparent
            upfront pricing, expected durations, and exactly what is included.
          </p>
        </div>
      </section>

      {/* The Services Grid Section (Sits right beneath the banner with tight, clean spacing) */}
      <section className="mx-auto w-full max-w-7xl px-6 pt-6 pb-16 sm:px-8 sm:pt-8 sm:pb-20">
        <ServiceGrid services={services} />
      </section>

      <CtaBanner />
    </div>
  );
}
