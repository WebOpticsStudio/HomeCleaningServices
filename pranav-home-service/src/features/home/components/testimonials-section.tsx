'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { TestimonialCard } from '@/features/testimonials/components/testimonial-card';
import { testimonials } from '@/features/testimonials/data/testimonials';

const ITEMS_PER_PAGE = 3;

export function TestimonialsSection() {
  const [pageIndex, setPageIndex] = useState(0);
  const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE);

  const handlePrev = () => {
    setPageIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setPageIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const visibleTestimonials = testimonials.slice(
    pageIndex * ITEMS_PER_PAGE,
    pageIndex * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="w-full bg-white py-16 font-sans text-slate-900"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        {/* Headline Layout Block: Straightly aligned with KolarClean logo */}
        <div className="mb-10 flex items-end justify-between">
          <div className="space-y-2">
            <span className="block text-xs font-bold tracking-widest text-teal-700 uppercase">
              Client Stories
            </span>
            <h2
              id="reviews-heading"
              className="font-serif text-2xl font-bold tracking-tight text-slate-900 lg:text-4xl"
            >
              Real People. Cleaner Spaces.
            </h2>
          </div>

          {/* Minimalist Premium Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous reviews"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next reviews"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white shadow-md transition-colors hover:bg-teal-700"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Level, Compact Grid Container */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Centered Slider Dots */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPageIndex(idx)}
                aria-label={`Go to reviews page ${idx + 1}`}
                className={cn(
                  'cursor-pointer rounded-full transition-all duration-300',
                  pageIndex === idx
                    ? 'h-1.5 w-5 bg-teal-700'
                    : 'h-1.5 w-1.5 bg-slate-200 hover:bg-slate-300',
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
