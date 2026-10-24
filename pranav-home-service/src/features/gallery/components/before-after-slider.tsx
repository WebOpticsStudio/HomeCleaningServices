'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Image from 'next/image';
import { ChevronsLeftRight } from 'lucide-react';
import type { ImageAsset } from '@/types';
import { cn } from '@/lib/utils';

interface BeforeAfterSliderProps {
  before: ImageAsset;
  after: ImageAsset;
  title: string;
  categoryLabel?: string;
  caption?: string;
  className?: string;
}

/**
 * Interactive drag-to-reveal slider comparing Before and After cleaning photos.
 * Accessible with touch, mouse drag, and keyboard arrow keys.
 */
export function BeforeAfterSlider({
  before,
  after,
  title,
  categoryLabel,
  caption,
  className,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const onMouseDown = () => setIsDragging(true);
  const onTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const onMouseMove = (e: globalThis.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const onMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };

    const onTouchMove = (e: globalThis.TouchEvent) => {
      if (!isDragging || !e.touches[0]) return;
      handleMove(e.touches[0].clientX);
    };

    const onTouchEnd = () => {
      if (isDragging) setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, handleMove]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  return (
    <figure
      className={cn(
        'group relative w-full overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md',
        className,
      )}
    >
      <div
        ref={containerRef}
        role="slider"
        aria-label={`Before and after comparison for ${title}`}
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative aspect-[4/3] w-full cursor-ew-resize overflow-hidden bg-slate-100 select-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2 focus:outline-none"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {/* AFTER Image (Full background layer) */}
        <div className="absolute inset-0">
          <Image
            src={after.src}
            alt={after.alt}
            width={after.width}
            height={after.height}
            loading="lazy"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover"
          />
          {/* Refined AFTER Floating Badge - Fades out when slider moves right towards 100% */}
          <span
            style={{ opacity: sliderPosition > 80 ? 0 : 1 }}
            className="pointer-events-none absolute top-3.5 right-3.5 z-10 rounded-full bg-teal-900/70 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-md transition-opacity duration-200"
          >
            After
          </span>
        </div>

        {/* BEFORE Image (Clipped overlay layer) */}
        <div
          className="absolute inset-0 z-10 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={before.src}
            alt={before.alt}
            width={before.width}
            height={before.height}
            loading="lazy"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover"
          />
          {/* Refined BEFORE Floating Badge - Fades out when slider moves left towards 0% */}
          <span
            style={{ opacity: sliderPosition < 20 ? 0 : 1 }}
            className="pointer-events-none absolute top-3.5 left-3.5 z-20 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-md transition-opacity duration-200"
          >
            Before
          </span>
        </div>

        {/* Draggable Divider Line & Custom Handle */}
        <div
          className="pointer-events-none absolute inset-y-0 z-30"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Vertical divider line */}
          <div className="h-full w-0.5 -translate-x-1/2 bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)]" />

          {/* Centered circular handle button */}
          <div className="absolute top-1/2 left-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-white shadow-lg transition-transform group-hover:scale-110">
            <ChevronsLeftRight className="size-3.5 text-white" aria-hidden="true" />
          </div>
        </div>
      </div>

      <figcaption className="space-y-1 bg-white p-5">
        <h4 className="font-bold text-base tracking-tight text-slate-900">{title}</h4>
        {(categoryLabel || caption) && (
          <p className="text-xs leading-relaxed text-slate-500">
            {categoryLabel ? (
              <span className="font-semibold text-teal-700">{categoryLabel}: </span>
            ) : null}
            {caption}
          </p>
        )}
      </figcaption>
    </figure>
  );
}
