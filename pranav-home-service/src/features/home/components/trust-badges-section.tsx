import type { ComponentType, SVGProps } from 'react';
import { Clock, Leaf, ShieldCheck, Sparkles, ThumbsUp } from 'lucide-react';

export interface TrustBadge {
  id: string;
  title: string;
  subtitle: string;
  highlight: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

/**
 * Configurable trust badges for Kolar Cleaning Services.
 * Balanced 5-column equal-height framework in deep luxury forest green.
 */
export const TRUST_BADGES: readonly TrustBadge[] = [
  {
    id: 'trusted-service',
    title: 'Trusted Service',
    subtitle: 'Vetted local experts with background check clearing.',
    highlight: 'Zero Advance Payment',
    icon: ShieldCheck,
  },
  {
    id: 'eco-friendly',
    title: 'Eco-Friendly Options',
    subtitle: 'Safe, non-toxic formulations for family & pets.',
    highlight: 'Gentle on Family & Pets',
    icon: Leaf,
  },
  {
    id: 'on-time-arrival',
    title: 'On-Time Arrival',
    subtitle: 'Confirmed arrival window with prompt local dispatch.',
    highlight: 'Punctual Service Across Kolar',
    icon: Clock,
  },
  {
    id: 'professional-cleaning',
    title: 'Professional Cleaning',
    subtitle: 'Trained crew equipped with dedicated equipment.',
    highlight: 'Checklist-Guided Thoroughness',
    icon: Sparkles,
  },
  {
    id: 'customer-satisfaction',
    title: 'Customer Satisfaction',
    subtitle: 'Complete on-site inspection before any payment.',
    highlight: 'Pay Only When Satisfied',
    icon: ThumbsUp,
  },
];

interface TrustBadgesSectionProps {
  badges?: readonly TrustBadge[];
  variant?: 'dark' | 'light';
  className?: string;
}

export function TrustBadgesSection({
  badges = TRUST_BADGES,
  className = '',
}: TrustBadgesSectionProps) {
  return (
    <section
      aria-labelledby="trust-badges-heading"
      className={`w-full bg-[#0a2e26] py-16 text-white sm:py-20 ${className}`}
    >
      <h2 id="trust-badges-heading" className="sr-only">
        Our Service Commitments and Trust Standards
      </h2>

      <div className="mx-auto flex w-full max-w-7xl flex-col space-y-12 px-6 sm:px-8">
        {/* Unified 5-Column Equal Height Grid Framework */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 lg:grid-cols-5">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.id}
                className="flex h-full min-h-[220px] flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:bg-white/10"
              >
                <div className="space-y-4">
                  {/* Clean Icon Hub */}
                  <div
                    className="flex size-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400"
                    aria-hidden="true"
                  >
                    <Icon className="size-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-bold tracking-tight text-white">{badge.title}</h3>
                    <p className="text-xs leading-relaxed text-white/70">{badge.subtitle}</p>
                  </div>
                </div>

                {/* Muted Premium Metric Accent Line */}
                <span className="mt-4 block border-t border-white/5 pt-3 text-[11px] font-semibold text-teal-300">
                  {badge.highlight}
                </span>
              </div>
            );
          })}
        </div>

        {/* Muted Fine Print Layout Base */}
        <p className="mx-auto max-w-3xl text-center text-[11px] leading-relaxed font-normal text-white/40">
          * Service guarantees and inspection walkthroughs are confirmed on-site before payment. All
          claims reflect standard operating procedures for Kolar Cleaning Services.
        </p>
      </div>
    </section>
  );
}
