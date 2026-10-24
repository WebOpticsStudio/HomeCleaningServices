import Link from 'next/link';
import { Phone } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { ROUTES } from '@/constants/routes';

/** Sleek, high-converting pre-footer CTA strip that merges visually into the footer. */
export function CtaBanner({ title = 'Ready for a Spotless Home?' }: { title?: string }) {
  return (
    <section
      aria-labelledby="cta-heading"
      className="w-full border-b border-white/10 bg-[#0a2e26] px-8 py-16 text-white"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 md:flex-row">
        {/* Left Side: Engaging copy aligned closely */}
        <div className="max-w-xl space-y-2 text-center md:text-left">
          <h2
            id="cta-heading"
            className="font-display text-2xl font-bold tracking-tight lg:text-3xl"
          >
            {title}
          </h2>
          <p className="text-xs leading-relaxed text-teal-200/70 md:text-sm">
            Experience premium, hotel-standard cleaning services tailored exclusively for
            residences in Kolar. Book in less than 60 seconds.
          </p>
        </div>

        {/* Right Side: High-End Minimalist Button Matrix */}
        <div className="flex w-full flex-shrink-0 flex-col items-center gap-4 sm:w-auto sm:flex-row">
          <Link
            href={ROUTES.booking}
            className="w-full rounded-xl bg-teal-500 px-7 py-3.5 text-center text-xs font-bold uppercase tracking-wider text-[#0a2e26] shadow-lg shadow-teal-500/10 transition-all duration-200 hover:bg-teal-400 sm:w-auto"
          >
            Book Cleaning Now
          </Link>
          <a
            href={siteConfig.contact.phoneHref}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-center text-xs font-medium text-white transition-colors hover:border-white/40 sm:w-auto"
          >
            <Phone className="size-3.5 text-teal-400" aria-hidden="true" />
            Call Concierge
          </a>
        </div>
      </div>
    </section>
  );
}
