import type { Metadata } from 'next';
import Image from 'next/image';
import { CtaBanner } from '@/components/ui/cta-banner';
import { ROUTES } from '@/constants/routes';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'About Us | Kolar Clean',
  description:
    'Meet Kolar Clean: our mission, our standards of trust and why customers choose our professional cleaning teams.',
  path: ROUTES.about,
});

export default function AboutPage() {
  return (
    <>
      {/* Main Page Container (Properly spaced below the header) */}
      <div className="mx-auto w-full max-w-7xl px-6 pt-6 pb-16 font-sans space-y-16 sm:px-8 sm:pt-8 sm:pb-20 sm:space-y-20 lg:pt-10">
        {/* Row 1: The Narrative & Main Vision (Asymmetric Split Grid) */}
        <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Sophisticated Story Typography (Takes 7 columns) */}
          <div className="flex flex-col justify-center space-y-5 lg:col-span-7">
            <span className="block text-xs font-bold tracking-widest text-teal-700 uppercase">
              Our Story
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
              A cleaning company you can <br className="hidden sm:inline" />
              plan your week around.
            </h1>
            <p className="text-sm leading-relaxed text-slate-600 md:text-base">
              Kolar Cleaning Services was built on a simple, premium promise: an immaculate home should
              be completely effortless to book, explicitly transparent in pricing, and executed
              flawlessly the first time around.
            </p>
            {/* Sleek, High-End Mission Block Quote */}
            <div className="rounded-r-xl border-l-4 border-teal-700 bg-slate-50 py-3 pr-4 pl-4 shadow-2xs">
              <p className="text-xs font-semibold italic text-slate-800 md:text-sm">
                &ldquo;Our mission is to provide every household across Kolar a reliable, hotel-standard
                cleaning service, while ensuring our cleaning professionals receive steady work, proper
                safety training, and top-tier fair pay.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: Premium Integrated Visual Asset Frame (Takes 5 columns) */}
          <div className="w-full lg:col-span-5">
            <div className="relative aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/3.2] max-h-[420px] w-full overflow-hidden rounded-3xl lg:rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200">
              <Image
                src="/images/about-interior.webp"
                alt="Immaculate modern sunlit living room cleaned to hotel standards"
                width={1200}
                height={900}
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </section>

        {/* Row 2: Core Values & Operational Highlights (Dark Slate Premium Contrast Strip) */}
        <section className="rounded-[2.5rem] bg-[#0a2e26] p-8 text-white shadow-xl sm:p-10 lg:p-12">
          <div className="max-w-4xl space-y-10">
            <div className="space-y-2">
              <span className="block text-xs font-bold tracking-widest text-teal-400 uppercase">
                What We Stand For
              </span>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Our Standards of Trust
              </h2>
            </div>

            {/* Balanced 4-Column Feature Matrix Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <h4 className="text-sm font-bold tracking-tight text-white">Absolute Reliability</h4>
                <p className="text-xs leading-relaxed text-white/70">
                  We arrive exactly when scheduled. Zero guesswork, zero delays.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-bold tracking-tight text-white">Honest BHK Pricing</h4>
                <p className="text-xs leading-relaxed text-white/70">
                  Clear upfront rates confirmed before work starts. Never a single hidden fee.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-bold tracking-tight text-white">Complete Equipment</h4>
                <p className="text-xs leading-relaxed text-white/70">
                  Our vetted professionals arrive fully equipped with premium eco-certified supplies.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-bold tracking-tight text-white">Local Expertise</h4>
                <p className="text-xs leading-relaxed text-white/70">
                  Proudly serving Kolar Town and all its local neighborhoods with an elite in-house team.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <CtaBanner />
    </>
  );
}
