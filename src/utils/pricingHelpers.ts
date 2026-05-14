import type { Courier, CourierWithMeta } from '@/types';

/**
 * Computes the weight-based charge (rate × weight).
 */
export function calculateWeightCharge(ratePerKg: number, weightKg: number): number {
  return Number((ratePerKg * weightKg).toFixed(2));
}

/**
 * Computes the tax amount for a given subtotal and tax rate.
 */
export function calculateTax(amount: number, taxRate: number): number {
  return Number((amount * taxRate).toFixed(2));
}

/**
 * Computes the total price including tax.
 */
export function calculateTotalPrice(amount: number, taxRate: number): number {
  const tax = calculateTax(amount, taxRate);
  return Number((amount + tax).toFixed(2));
}

/**
 * Enriches a raw courier list with computed pricing, tax, and ranking flags.
 *
 * Determines `isCheapest` and `isFastest` by comparing all couriers
 * in the batch — first in the list wins ties.
 */
export function enrichCouriersWithMeta(
  couriers: Array<Courier>,
  weightKg: number,
): Array<CourierWithMeta> {
  if (couriers.length === 0) return [];

  const withPrices = couriers.map((c) => {
    const weightCharge = calculateWeightCharge(c.basePrice, weightKg);
    const tax = calculateTax(weightCharge, c.taxRate);
    const totalPrice = calculateTotalPrice(weightCharge, c.taxRate);
    return { ...c, totalPrice, tax, weightCharge, isCheapest: false, isFastest: false };
  });

  const cheapestPrice = Math.min(...withPrices.map((c) => c.totalPrice));
  const fastestDays = Math.min(...withPrices.map((c) => c.deliveryDays[0]));

  return withPrices.map((c) => ({
    ...c,
    isCheapest: c.totalPrice === cheapestPrice,
    isFastest: c.deliveryDays[0] === fastestDays,
  }));
}
