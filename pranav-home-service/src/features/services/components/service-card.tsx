import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { formatCurrency } from '@/lib/format';
import type { Service } from '../types';

/** The whole card is clickable via a stretched link on the heading. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-slate-100/80 bg-slate-50/50 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-200/60">
      {/* High-Quality Image Frame - Strict uniform height & aspect ratio */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-100">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          width={service.image.width}
          height={service.image.height}
          loading="lazy"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col justify-between space-y-6 p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-teal-700">
            <Link href={ROUTES.service(service.slug)} className="after:absolute after:inset-0">
              {service.name}
            </Link>
          </h3>
          <p className="text-sm leading-relaxed text-slate-500">{service.shortDescription}</p>
        </div>

        {/* Dynamic Action Base Footer */}
        <div className="flex items-center justify-between border-t border-slate-100/90 pt-4">
          <div>
            <span className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              {service.slug === 'home-cleaning' ? 'Flat Rate (1 BHK)' : 'Starting From'}
            </span>
            <span className="text-xl font-bold text-slate-900">
              {formatCurrency(service.startingPrice)}
            </span>
          </div>
          <Link
            href={ROUTES.service(service.slug)}
            aria-label={`View ${service.name} details`}
            className="relative z-10 flex size-10 items-center justify-center rounded-full border border-slate-200/60 bg-white text-slate-700 shadow-xs transition-all duration-300 hover:scale-110 hover:border-transparent hover:bg-teal-700 hover:text-white group-hover:scale-105 group-hover:border-transparent group-hover:bg-teal-700 group-hover:text-white"
          >
            <svg
              className="size-4 -rotate-45 transform transition-transform group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
