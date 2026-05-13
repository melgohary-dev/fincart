import type { Courier } from '@/types';
import { CourierServiceError } from '@/types';

const MOCK_COURIERS: Courier[] = [
  {
    id: 'dhl',
    name: 'DHL Express',
    logoUrl: 'https://logo.clearbit.com/dhl.com',
    basePrice: 45.0,
    taxRate: 0.08,
    deliveryDays: [3, 5],
  },
  {
    id: 'fedex',
    name: 'FedEx International',
    logoUrl: 'https://logo.clearbit.com/fedex.com',
    basePrice: 52.0,
    taxRate: 0.08,
    deliveryDays: [2, 4],
  },
  {
    id: 'ups',
    name: 'UPS Worldwide',
    logoUrl: 'https://logo.clearbit.com/ups.com',
    basePrice: 48.5,
    taxRate: 0.08,
    deliveryDays: [3, 6],
  },
  {
    id: 'aramex',
    name: 'Aramex',
    logoUrl: 'https://logo.clearbit.com/aramex.com',
    basePrice: 38.0,
    taxRate: 0.05,
    deliveryDays: [5, 8],
  },
  {
    id: 'usps',
    name: 'USPS Priority',
    logoUrl: 'https://logo.clearbit.com/usps.com',
    basePrice: 32.5,
    taxRate: 0.05,
    deliveryDays: [6, 10],
  },
  {
    id: 'tnt',
    name: 'TNT Express',
    logoUrl: 'https://logo.clearbit.com/tnt.com',
    basePrice: 41.0,
    taxRate: 0.08,
    deliveryDays: [4, 7],
  },
];

const FAILURE_RATE = 0.2;
const SIMULATED_DELAY = 800;

function shouldFail(): boolean {
  return Math.random() < FAILURE_RATE;
}

export async function fetchCouriers(): Promise<Courier[]> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));

  if (shouldFail()) {
    throw new CourierServiceError('Courier rate service temporarily unavailable');
  }

  return MOCK_COURIERS.map((c) => ({ ...c }));
}
