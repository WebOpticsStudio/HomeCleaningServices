import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BookingForm } from '@/features/booking/components/booking-form';
import { getServices } from '@/features/services/lib/get-services';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe('BookingForm preselection', () => {
  const services = getServices().map(({ slug, name }) => ({ slug, name }));

  it('preselects Kitchen Deep Cleaning when passed as defaultService and packageId', () => {
    render(
      <BookingForm
        services={services}
        defaultService="kitchen-deep-cleaning"
        packageId="kitchen-deep-cleaning"
        minDate="2026-10-16"
        maxDate="2026-11-16"
      />,
    );

    const serviceSelect = screen.getByRole('combobox', { name: /Cleaning service/i });
    expect(serviceSelect).toHaveValue('kitchen-deep-cleaning');

    const packageSelect = screen.getByRole('combobox', { name: /Package/i });
    expect(packageSelect).toHaveValue('kitchen-deep-cleaning');

    expect(screen.getByText('Pre-selected package')).toBeInTheDocument();
    expect(screen.getByText('Kitchen Deep Cleaning', { selector: 'p' })).toBeInTheDocument();
  });
});
