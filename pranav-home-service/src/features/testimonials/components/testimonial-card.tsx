import Image from 'next/image';
import type { Testimonial } from '../types';

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { name, role, location, rating, review, image } = testimonial;

  return (
    <figure className="flex min-h-[220px] flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/70 p-6 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50">
      {/* Content Zone (Reduced padding & smaller font sizing) */}
      <div className="relative space-y-3">
        <div
          className="flex items-center gap-0.5 text-amber-400"
          aria-label={`${rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`size-3.5 ${i < rating ? 'fill-current' : 'text-slate-200'}`}
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <blockquote className="text-xs leading-relaxed font-medium text-slate-600">
          &ldquo;{review}&rdquo;
        </blockquote>
      </div>

      {/* Compact Bottom Meta Bar */}
      <figcaption className="mt-4 flex items-center gap-3 border-t border-slate-200/50 pt-4">
        <div className="relative size-9 shrink-0 overflow-hidden rounded-full border border-white bg-slate-200 shadow-sm">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              width={36}
              height={36}
              loading="lazy"
              className="size-full object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="inline-flex size-full items-center justify-center text-[10px] font-bold text-teal-700"
            >
              {initials(name)}
            </span>
          )}
        </div>
        <div>
          <h4 className="text-xs font-bold tracking-tight text-slate-900">{name}</h4>
          <span className="block text-[10px] font-medium text-slate-400">
            {role ?? location ?? 'Home Cleaning Client'}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
