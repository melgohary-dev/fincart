import type { Courier, CourierWithMeta } from '@/types';

export function calculateTax(basePrice: number, taxRate: number): number {
  return Number((basePrice * taxRate).toFixed(2));
}

export function calculateTotalPrice(basePrice: number, taxRate: number): number {
  const tax = calculateTax(basePrice, taxRate);
  return Number((basePrice + tax).toFixed(2));
}

export function enrichCouriersWithMeta(couriers: Courier[]): CourierWithMeta[] {
  if (couriers.length === 0) return [];

  const withPrices = couriers.map((c) => {
    const tax = calculateTax(c.basePrice, c.taxRate);
    const totalPrice = calculateTotalPrice(c.basePrice, c.taxRate);
    return { ...c, totalPrice, tax, isCheapest: false, isFastest: false };
  });

  const cheapestPrice = Math.min(...withPrices.map((c) => c.totalPrice));
  const fastestDays = Math.min(...withPrices.map((c) => c.deliveryDays[0]));

  return withPrices.map((c) => ({
    ...c,
    isCheapest: c.totalPrice === cheapestPrice,
    isFastest: c.deliveryDays[0] === fastestDays,
  }));
}
