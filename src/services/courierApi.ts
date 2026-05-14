import type { Courier } from '@/types';
import { CourierId, CourierServiceError, TAX_RATES, COURIER_API_CONFIG } from '@/types';

/**
 * Mock courier API service.
 *
 * Simulates a real rate-fetching endpoint with a configurable failure
 * rate and artificial delay.  Route filtering is applied based on
 * each courier's primary market (e.g. Aramex only for UAE).
 *
 * In production this would be replaced with a real fetch() call.
 */

/** Couriers whose service is restricted to specific origin / destination markets. */
const COURIER_PRIMARY_MARKETS: Partial<Record<string, Array<string>>> = {
  [CourierId.Aramex]: ['AE'],
  [CourierId.USPS]: ['US'],
  [CourierId.TNT]: ['GB', 'DE', 'FR'],
};

const MOCK_COURIERS: Array<Courier> = [
  {
    id: CourierId.DHL,
    name: 'DHL Express',
    logoUrl: 'https://logo.clearbit.com/dhl.com',
    basePrice: 45.0,
    taxRate: TAX_RATES.standard,
    deliveryDays: [3, 5],
  },
  {
    id: CourierId.FedEx,
    name: 'FedEx International',
    logoUrl: 'https://logo.clearbit.com/fedex.com',
    basePrice: 52.0,
    taxRate: TAX_RATES.standard,
    deliveryDays: [2, 4],
  },
  {
    id: CourierId.UPS,
    name: 'UPS Worldwide',
    logoUrl: 'https://logo.clearbit.com/ups.com',
    basePrice: 48.5,
    taxRate: TAX_RATES.standard,
    deliveryDays: [3, 6],
  },
  {
    id: CourierId.Aramex,
    name: 'Aramex',
    logoUrl: 'https://logo.clearbit.com/aramex.com',
    basePrice: 38.0,
    taxRate: TAX_RATES.reduced,
    deliveryDays: [5, 8],
  },
  {
    id: CourierId.USPS,
    name: 'USPS Priority',
    logoUrl: 'https://logo.clearbit.com/usps.com',
    basePrice: 32.5,
    taxRate: TAX_RATES.reduced,
    deliveryDays: [6, 10],
  },
  {
    id: CourierId.TNT,
    name: 'TNT Express',
    logoUrl: 'https://logo.clearbit.com/tnt.com',
    basePrice: 41.0,
    taxRate: TAX_RATES.standard,
    deliveryDays: [4, 7],
  },
];

/**
 * Filters couriers by origin / destination route.
 *
 * Couriers without a defined primary market (DHL, FedEx, UPS) are
 * considered global and always returned.
 */
function filterByRoute(
  couriers: Array<Courier>,
  origin: string,
  destination: string,
): Array<Courier> {
  return couriers.filter((c) => {
    const markets = COURIER_PRIMARY_MARKETS[c.id];
    if (!markets || markets.length === 0) return true;
    return markets.includes(origin) || markets.includes(destination);
  });
}

function shouldFail(): boolean {
  return Math.random() < COURIER_API_CONFIG.failureRate;
}

/**
 * Fetches courier rates for a given route.
 *
 * @throws {CourierServiceError} When the simulated failure triggers.
 */
export async function fetchCouriers(origin: string, destination: string): Promise<Array<Courier>> {
  await new Promise((resolve) => setTimeout(resolve, COURIER_API_CONFIG.simulatedDelay));

  if (shouldFail()) {
    throw new CourierServiceError('Courier rate service temporarily unavailable');
  }

  return filterByRoute(MOCK_COURIERS, origin, destination).map((c) => ({ ...c }));
}
