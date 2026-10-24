'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, HelpCircle, Info, Sparkles, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { type BhkOption } from '@/constants/catalog';
import { bookingUrl } from '@/constants/routes';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { PricingPackage } from '../types';

export function PricingCard({ pkg }: { pkg: PricingPackage }) {
  // If package has BHK tiers, track active BHK selection
  const hasBhkTiers = Boolean(pkg.bhkPricing && pkg.bhkPricing.length > 0);
  const [selectedBhk, setSelectedBhk] = useState<BhkOption | null>(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);

  // Active BHK tier (defaults to first tier if defined)
  const activeBhkTier = hasBhkTiers
    ? (pkg.bhkPricing?.find((t) => t.bhk === (selectedBhk ?? pkg.bhkPricing![0]?.bhk)) ??
      pkg.bhkPricing![0])
    : null;

  const currentPrice = activeBhkTier ? activeBhkTier.price : pkg.price;
  const currentPriceNote = activeBhkTier
    ? (activeBhkTier.priceNote ?? pkg.priceNote)
    : pkg.priceNote;

  // Close info tooltip on click outside or Escape key
  useEffect(() => {
    if (!isInfoOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (infoRef.current && !infoRef.current.contains(e.target as Node)) {
        setIsInfoOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsInfoOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isInfoOpen]);

  // Dynamic booking URL based on package and selected BHK
  const targetBookingUrl = bookingUrl({
    package: pkg.id,
    bhk: selectedBhk ? selectedBhk : undefined,
  });

  return (
    <article
      className={cn(
        'shadow-soft relative flex h-full flex-col rounded-card border bg-white p-6 transition-all duration-200 hover:shadow-lift',
        pkg.highlighted
          ? 'border-primary shadow-lift ring-2 ring-primary'
          : 'border-grout hover:border-primary/40',
      )}
    >
      {/* Recommended / Badge */}
      {pkg.highlighted && (
        <Badge className="absolute -top-3 left-6 shadow-sm">
          <Sparkles className="mr-1 inline-block size-3" />
          {pkg.badge ?? 'Recommended'}
        </Badge>
      )}

      {/* Package Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-2xl font-bold text-ink">{pkg.name}</h3>
      </div>
      <p className="mt-1 text-sm leading-relaxed text-ink-soft">{pkg.tagline}</p>

      {/* Interactive BHK Selector (Tabs) for Full-House / Tiered packages */}
      {hasBhkTiers && pkg.bhkPricing && (
        <div className="mt-4 pt-1">
          <label className="text-xs font-semibold tracking-wider text-ink-soft uppercase">
            Select House Layout:
          </label>
          <div
            role="tablist"
            aria-label={`House layout options for ${pkg.name}`}
            className="mt-1.5 grid grid-cols-3 gap-1 rounded-lg border border-grout bg-rinse p-1"
          >
            {pkg.bhkPricing.map((tier) => {
              const isSelected = (selectedBhk ?? pkg.bhkPricing![0]?.bhk) === tier.bhk;
              return (
                <button
                  key={tier.bhk}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedBhk(tier.bhk)}
                  className={cn(
                    'rounded-md py-1.5 text-xs font-bold transition-all focus:ring-2 focus:ring-primary focus:outline-none',
                    isSelected
                      ? 'bg-white text-primary shadow-sm ring-1 ring-grout/60'
                      : 'text-ink-soft hover:bg-white/50 hover:text-ink',
                  )}
                >
                  {tier.label}
                </button>
              );
            })}
          </div>
          {activeBhkTier?.description && (
            <p className="animate-fadeIn mt-1.5 text-xs font-medium text-primary">
              ✓ {activeBhkTier.description}
            </p>
          )}
        </div>
      )}

      {/* Price Header with "Starting at" and accessible Info popover */}
      <div className="relative mt-5 border-t border-grout/60 pt-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-ink-soft uppercase">
          <span>Starting at</span>
          <div className="relative inline-block" ref={infoRef}>
            <button
              type="button"
              aria-label={`Why is this a starting price for ${pkg.name}? Click for factors affecting quote`}
              aria-expanded={isInfoOpen}
              aria-haspopup="dialog"
              onClick={() => setIsInfoOpen(!isInfoOpen)}
              className="inline-flex items-center justify-center rounded-full p-0.5 text-primary transition-colors hover:bg-rinse hover:text-primary-strong focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <HelpCircle className="size-3.5" aria-hidden="true" />
            </button>

            {/* Accessible Info Tooltip / Popover */}
            {isInfoOpen && (
              <div
                role="dialog"
                aria-label="Price estimation factors"
                className="animate-fadeIn absolute bottom-full left-0 z-30 mb-2 w-72 rounded-lg border border-grout bg-white p-4 text-left text-xs text-ink shadow-lift"
              >
                <div className="flex items-center justify-between border-b border-grout pb-2 font-semibold text-primary">
                  <span className="flex items-center gap-1.5">
                    <Info className="size-3.5" /> What affects the final price?
                  </span>
                  <button
                    type="button"
                    aria-label="Close pricing information"
                    onClick={() => setIsInfoOpen(false)}
                    className="rounded p-0.5 text-ink-soft hover:text-ink focus:outline-none"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
                <ul className="mt-2 space-y-1.5 text-ink-soft">
                  {(
                    pkg.startingPriceFactors ?? [
                      'Property layout & overall square footage',
                      'Heavy grease, oil or hard-water mineral stains',
                      'Additional balconies, utility areas, or interior appliances',
                    ]
                  ).map((factor) => (
                    <li key={factor} className="flex items-start gap-1.5">
                      <span className="font-bold text-primary">•</span>
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 rounded bg-rinse p-2 text-[11px] font-medium text-ink-soft">
                  💡 Our team always confirms the exact, transparent price before starting work. No
                  surprise charges.
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="mt-1 flex items-baseline gap-2">
          <span className="font-display text-4xl font-bold text-ink">
            {formatCurrency(currentPrice)}
          </span>
          <span className="text-sm text-ink-soft">{currentPriceNote}</span>
        </p>
      </div>

      {/* Itemized Feature Checklist */}
      <ul className="my-6 flex-1 space-y-3 border-t border-grout/60 pt-4 text-sm text-ink-soft">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="leading-tight text-ink/90">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Booking CTA Button */}
      <ButtonLink
        href={targetBookingUrl}
        variant={pkg.highlighted ? 'primary' : 'outline'}
        size="lg"
        fullWidth
        className="mt-auto transition-transform active:scale-[0.98]"
      >
        {pkg.ctaLabel}
      </ButtonLink>
    </article>
  );
}
