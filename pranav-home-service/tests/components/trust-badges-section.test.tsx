import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TRUST_BADGES, TrustBadgesSection } from '@/features/home/components/trust-badges-section';

describe('TrustBadgesSection', () => {
  it('renders all 5 configurable trust badges', () => {
    render(<TrustBadgesSection />);

    expect(screen.getByText('Trusted Service')).toBeInTheDocument();
    expect(screen.getByText('Eco-Friendly Options')).toBeInTheDocument();
    expect(screen.getByText('On-Time Arrival')).toBeInTheDocument();
    expect(screen.getByText('Professional Cleaning')).toBeInTheDocument();
    expect(screen.getByText('Customer Satisfaction')).toBeInTheDocument();
  });

  it('renders verification subtitle and highlight for each badge', () => {
    render(<TrustBadgesSection />);

    for (const badge of TRUST_BADGES) {
      expect(screen.getByText(badge.title)).toBeInTheDocument();
      expect(screen.getByText(badge.subtitle)).toBeInTheDocument();
      expect(screen.getByText(badge.highlight)).toBeInTheDocument();
    }
  });

  it('includes clear disclaimer regarding service guarantees and walkthrough', () => {
    render(<TrustBadgesSection />);
    expect(
      screen.getByText(/Service guarantees and inspection walkthroughs are confirmed on-site/i),
    ).toBeInTheDocument();
  });
});
