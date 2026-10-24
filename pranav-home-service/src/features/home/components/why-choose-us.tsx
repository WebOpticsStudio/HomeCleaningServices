import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Leaf, ShieldCheck } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export function WhyChooseUs() {
  return (
    <section
      id="about-preview"
      aria-labelledby="about-heading"
      className="w-full bg-white py-20 lg:py-24"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-12 px-6 sm:px-8 lg:grid-cols-12 lg:gap-16">
        {/* Left Side: Clean, Restored Image Frame (Takes 5 columns) */}
        <div className="relative w-full lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/80">
            <Image
              src="/images/about-dog.webp"
              alt="Premium Interior Care and happy family living in a clean home"
              width={800}
              height={1000}
              loading="lazy"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Right Side: Narrative & Trust Indicators (Takes 7 columns) */}
        <div className="flex flex-col justify-start lg:col-span-7">
          <span className="mb-3 block text-xs font-bold tracking-widest text-teal-700 uppercase">
            About Kolar Clean
          </span>
          <h2
            id="about-heading"
            className="mb-6 font-serif text-3xl leading-tight font-bold text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Your Trusted <br className="hidden sm:inline" />
            Cleaning Partner
          </h2>

          <p className="mb-6 text-base leading-relaxed text-slate-500">
            At Kolar Clean, we believe an impeccably maintained space creates a happier, healthier
            life. Our professional local teams deliver tailored residential cleaning solutions with
            precision, consistency, and uncompromising attention to detail. We treat every residence
            across Kolar with the care and integrity it deserves.
          </p>

          {/* Value propositions */}
          <ul className="mb-8 space-y-3.5">
            <li className="flex items-center gap-3 text-sm font-semibold text-slate-800">
              <ShieldCheck className="size-5 shrink-0 text-teal-700" aria-hidden="true" />
              <span>Background Checked, Uniformed & Verified Staff</span>
            </li>
            <li className="flex items-center gap-3 text-sm font-semibold text-slate-800">
              <Leaf className="size-5 shrink-0 text-teal-700" aria-hidden="true" />
              <span>Safe, Non-Toxic & Eco-Friendly Formulations</span>
            </li>
            <li className="flex items-center gap-3 text-sm font-semibold text-slate-800">
              <CheckCircle2 className="size-5 shrink-0 text-teal-700" aria-hidden="true" />
              <span>100% Satisfaction Walkthrough & Rework Guarantee</span>
            </li>
          </ul>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-5 pt-1">
            <Link
              href={ROUTES.about}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-6 py-3.5 text-sm font-medium text-white shadow-md shadow-teal-700/20 transition-all duration-200 hover:bg-teal-800 hover:shadow-lg active:scale-95"
            >
              <span>Learn More</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          {/* 4 Stat Counters */}
          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-slate-100 pt-6 sm:grid-cols-4">
            <div>
              <p className="font-serif text-3xl font-bold text-slate-900">5+</p>
              <p className="mt-0.5 text-xs font-medium text-slate-500">Years of Experience</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-slate-900">2,500+</p>
              <p className="mt-0.5 text-xs font-medium text-slate-500">Happy Clients</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-slate-900">3,000+</p>
              <p className="mt-0.5 text-xs font-medium text-slate-500">Spaces Restored</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-slate-900">99%</p>
              <p className="mt-0.5 text-xs font-medium text-slate-500">Satisfaction Score</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
