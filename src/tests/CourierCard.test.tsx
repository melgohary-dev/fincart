import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@mui/material/styles';
import i18n from '@/i18n';
import { getTheme } from '@/theme/fincartTheme';
const fincartTheme = getTheme({ mode: ThemeMode.Light, lang: LanguageCode.English });
import CourierCard from '@/components/courier/CourierCard';
import { LanguageCode, ThemeMode, type CourierWithMeta } from '@/types';

/**
 * Test suite for the CourierCard component.
 *
 * Verifies that pricing data, ranking chips ("Cheapest", "Fastest"),
 * delivery days, and the total price line render correctly under a
 * variety of input combinations.
 */

const mockCourier: CourierWithMeta = {
  id: 'dhl',
  name: 'DHL Express',
  logoUrl: 'https://logo.clearbit.com/dhl.com',
  basePrice: 45.0,
  taxRate: 0.08,
  deliveryDays: [3, 5],
  totalPrice: 48.6,
  tax: 3.6,
  weightCharge: 45.0,
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
    renderWithProviders(<CourierCard courier={mockCourier} weightKg={1} />);
    expect(screen.getByText('DHL Express')).toBeInTheDocument();
    expect(screen.getAllByText('$45.00')).toHaveLength(2);
    expect(screen.getByText('$48.60')).toBeInTheDocument();
  });

  it('displays cheapest chip when isCheapest prop is true', () => {
    const cheapestCourier = { ...mockCourier, isCheapest: true, isFastest: false };
    renderWithProviders(<CourierCard courier={cheapestCourier} weightKg={1} />);
    expect(screen.getByText('Cheapest')).toBeInTheDocument();
    expect(screen.queryByText('Fastest')).not.toBeInTheDocument();
  });

  it('displays fastest chip when isFastest prop is true', () => {
    const fastestCourier = { ...mockCourier, isCheapest: false, isFastest: true };
    renderWithProviders(<CourierCard courier={fastestCourier} weightKg={1} />);
    expect(screen.getByText('Fastest')).toBeInTheDocument();
    expect(screen.queryByText('Cheapest')).not.toBeInTheDocument();
  });

  it('displays both chips when both props are true', () => {
    const bothCourier = { ...mockCourier, isCheapest: true, isFastest: true };
    renderWithProviders(<CourierCard courier={bothCourier} weightKg={1} />);
    expect(screen.getByText('Cheapest')).toBeInTheDocument();
    expect(screen.getByText('Fastest')).toBeInTheDocument();
  });

  it('displays delivery days range', () => {
    renderWithProviders(<CourierCard courier={mockCourier} weightKg={1} />);
    expect(screen.getByText('3-5 business days')).toBeInTheDocument();
  });

  it('calculates and displays total price correctly', () => {
    const courier: CourierWithMeta = {
      ...mockCourier,
      basePrice: 100,
      taxRate: 0.1,
      weightCharge: 200,
      totalPrice: 220,
      tax: 20,
    };
    renderWithProviders(<CourierCard courier={courier} weightKg={2} />);
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('$200.00')).toBeInTheDocument();
    expect(screen.getByText('$220.00')).toBeInTheDocument();
    expect(screen.getByText('$20.00')).toBeInTheDocument();
  });
});
