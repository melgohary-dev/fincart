import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@mui/material/styles';
import i18n from '@/i18n';
import fincartTheme from '@/theme/fincartTheme';
import CourierCard from '@/components/courier/CourierCard';
import type { CourierWithMeta } from '@/types';

const mockCourier: CourierWithMeta = {
  id: 'dhl',
  name: 'DHL Express',
  logoUrl: 'https://logo.clearbit.com/dhl.com',
  basePrice: 45.0,
  taxRate: 0.08,
  deliveryDays: [3, 5],
  totalPrice: 48.6,
  tax: 3.6,
  isCheapest: false,
  isFastest: false,
};

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={fincartTheme}>{ui}</ThemeProvider>
    </I18nextProvider>,
  );
}

describe('CourierCard', () => {
  it('renders courier name and pricing information', () => {
    renderWithProviders(<CourierCard courier={mockCourier} />);
    expect(screen.getByText('DHL Express')).toBeInTheDocument();
    expect(screen.getByText('$45.00')).toBeInTheDocument();
    expect(screen.getByText('$48.60')).toBeInTheDocument();
  });

  it('displays cheapest chip when isCheapest prop is true', () => {
    const cheapestCourier = { ...mockCourier, isCheapest: true, isFastest: false };
    renderWithProviders(<CourierCard courier={cheapestCourier} />);
    expect(screen.getByText('Cheapest')).toBeInTheDocument();
    expect(screen.queryByText('Fastest')).not.toBeInTheDocument();
  });

  it('displays fastest chip when isFastest prop is true', () => {
    const fastestCourier = { ...mockCourier, isCheapest: false, isFastest: true };
    renderWithProviders(<CourierCard courier={fastestCourier} />);
    expect(screen.getByText('Fastest')).toBeInTheDocument();
    expect(screen.queryByText('Cheapest')).not.toBeInTheDocument();
  });

  it('displays both chips when both props are true', () => {
    const bothCourier = { ...mockCourier, isCheapest: true, isFastest: true };
    renderWithProviders(<CourierCard courier={bothCourier} />);
    expect(screen.getByText('Cheapest')).toBeInTheDocument();
    expect(screen.getByText('Fastest')).toBeInTheDocument();
  });

  it('displays delivery days range', () => {
    renderWithProviders(<CourierCard courier={mockCourier} />);
    expect(screen.getByText('3-5 business days')).toBeInTheDocument();
  });

  it('calculates and displays total price correctly', () => {
    const courier: CourierWithMeta = {
      ...mockCourier,
      basePrice: 100,
      taxRate: 0.1,
      totalPrice: 110,
      tax: 10,
    };
    renderWithProviders(<CourierCard courier={courier} />);
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('$110.00')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
  });
});
