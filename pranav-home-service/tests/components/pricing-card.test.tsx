import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PricingCard } from '@/features/pricing/components/pricing-card';
import { pricingPackages } from '@/features/pricing/data/packages';

describe('PricingCard', () => {
  const fullHouse = pricingPackages.find((pkg) => pkg.id === 'standard')!;

  it('shows the package name, starting price and features', () => {
    render(<PricingCard pkg={fullHouse} />);
    expect(screen.getByRole('heading', { name: 'Full House Cleaning' })).toBeInTheDocument();
    expect(screen.getByText(/2,500/)).toBeInTheDocument();
    expect(screen.getByText(/Starting at/i)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(fullHouse.features.length);
  });

  it('links to the booking form with the package preselected', () => {
    render(<PricingCard pkg={fullHouse} />);
    expect(screen.getByRole('link', { name: fullHouse.ctaLabel })).toHaveAttribute(
      'href',
      '/booking?package=standard',
    );
  });

  it('marks the highlighted package as Most Popular / Recommended', () => {
    render(<PricingCard pkg={fullHouse} />);
    expect(screen.getByText('Most Popular')).toBeInTheDocument();
  });

  it('renders Kitchen Deep Cleaning card with a Book This Package button linking to booking form', () => {
    const kitchen = pricingPackages.find((pkg) => pkg.id === 'kitchen-deep-cleaning')!;
    render(<PricingCard pkg={kitchen} />);
    expect(screen.getByRole('heading', { name: 'Kitchen Deep Cleaning' })).toBeInTheDocument();
    expect(screen.getByText(/2,500/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Book This Package' })).toHaveAttribute(
      'href',
      '/booking?package=kitchen-deep-cleaning',
    );
  });

  it('renders Bathroom Deep Cleaning card with ₹1,500 onwards and booking button', () => {
    const bathroom = pricingPackages.find((pkg) => pkg.id === 'bathroom-cleaning')!;
    render(<PricingCard pkg={bathroom} />);
    expect(screen.getByRole('heading', { name: 'Bathroom Deep Cleaning' })).toBeInTheDocument();
    expect(screen.getByText(/1,500/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Book This Package' })).toHaveAttribute(
      'href',
      '/booking?package=bathroom-cleaning',
    );
  });

  it('allows selecting different BHK tiers and updates the price and booking link dynamically', () => {
    render(<PricingCard pkg={fullHouse} />);

    // Initially 1 BHK is selected
    expect(screen.getByText(/2,500/)).toBeInTheDocument();

    // Select 2 BHK
    const twoBhkTab = screen.getByRole('tab', { name: '2 BHK' });
    fireEvent.click(twoBhkTab);
    expect(screen.getByText(/3,500/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: fullHouse.ctaLabel })).toHaveAttribute(
      'href',
      '/booking?package=standard&bhk=2bhk',
    );

    // Select 3 BHK
    const threeBhkTab = screen.getByRole('tab', { name: '3 BHK' });
    fireEvent.click(threeBhkTab);
    expect(screen.getByText(/4,500/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: fullHouse.ctaLabel })).toHaveAttribute(
      'href',
      '/booking?package=standard&bhk=3bhk',
    );
  });

  it('opens and closes the price factors info tooltip when clicked', () => {
    render(<PricingCard pkg={fullHouse} />);

    const infoBtn = screen.getByRole('button', { name: /factors affecting quote/i });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Open info dialog
    fireEvent.click(infoBtn);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/What affects the final price\?/i)).toBeInTheDocument();

    // Close button
    const closeBtn = screen.getByRole('button', { name: /close pricing information/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
