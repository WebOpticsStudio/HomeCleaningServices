import Image from 'next/image';
import Link from 'next/link';
import { Calendar, CheckCircle2, Leaf, ShieldCheck, Star } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full bg-white pt-12 pb-14 text-slate-900 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20"
    >
      {/* Asymmetric Hero Body Container: Sits 48px to 64px below navigation */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 sm:px-8 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Sophisticated Typography (Takes 7 Cols for room) */}
        <div className="flex max-w-xl flex-col justify-center space-y-6 lg:col-span-7">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase">
            <span className="size-1.5 animate-pulse rounded-full bg-teal-500" />
            Premium Residential Care • Kolar
          </div>

          <h1
            id="hero-heading"
            className="font-serif text-4xl leading-[1.15] font-bold text-slate-900 sm:text-5xl lg:text-6xl"
          >
            A Cleaner Home, <br />
            <span className="font-sans font-medium text-teal-700 italic">A Happier You.</span>
          </h1>

          <p className="text-base leading-relaxed text-slate-500">
            Experience meticulously tailored, eco-friendly cleaning solutions for premium estates
            across Kolar. Automated pricing, trusted local professionals, and an absolute
            satisfaction guarantee.
          </p>

          {/* Premium Micro-Hierarchical Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href={ROUTES.booking}
              className="flex items-center gap-2 rounded-xl bg-teal-700 px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-teal-700/20 transition-all duration-200 hover:bg-teal-800"
            >
              <span>Schedule a Cleaning</span>
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>

          {/* Micro Trust Indicators */}
          <div className="grid grid-cols-2 gap-3.5 border-t border-slate-100 pt-5 sm:grid-cols-4">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <ShieldCheck className="size-4 shrink-0 text-teal-700" aria-hidden="true" />
              <span>Verified Staff</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Leaf className="size-4 shrink-0 text-teal-700" aria-hidden="true" />
              <span>Eco Supplies</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <CheckCircle2 className="size-4 shrink-0 text-teal-700" aria-hidden="true" />
              <span>100% Guaranteed</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Calendar className="size-4 shrink-0 text-teal-700" aria-hidden="true" />
              <span>Prompt Window</span>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Dynamic Visual Frame (Takes 5 Cols) */}
        <div className="relative mx-auto flex h-[320px] w-full max-w-[440px] items-center justify-center sm:h-[350px] lg:col-span-5 lg:h-[380px] lg:max-w-none xl:h-[400px]">
          {/* Rounded Organic Frame: Fits cleanly without overflowing the viewport */}
          <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] border-4 border-white shadow-2xl shadow-slate-300/80">
            <Image
              src="/images/hero-cleaner.webp"
              alt="Luxury Housekeeping and residential cleaning specialist"
              width={1200}
              height={896}
              priority
              fetchPriority="high"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-full w-full object-cover object-center"
            />

            {/* Refined Floating Proof Pill anchored neatly inside the frame */}
            <div className="absolute right-3.5 bottom-3.5 z-20 flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-white/95 px-3.5 py-1.5 shadow-lg backdrop-blur-md sm:right-4 sm:bottom-4">
              <div className="flex -space-x-1.5 overflow-hidden">
                <Image
                  src="/images/avatars/sarah.webp"
                  alt="Sarah M."
                  width={28}
                  height={28}
                  className="inline-block size-6 rounded-full object-cover ring-2 ring-white"
                />
                <Image
                  src="/images/avatars/james.webp"
                  alt="James T."
                  width={28}
                  height={28}
                  className="inline-block size-6 rounded-full object-cover ring-2 ring-white"
                />
                <Image
                  src="/images/avatars/emily.webp"
                  alt="Emily R."
                  width={28}
                  height={28}
                  className="inline-block size-6 rounded-full object-cover ring-2 ring-white"
                />
              </div>
              <div>
                <p className="text-[10px] leading-tight font-bold text-slate-900">
                  1,000+ Homes Cleaned
                </p>
                <div className="mt-0.5 flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="size-2 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
