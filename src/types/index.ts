export interface Courier {
  id: string;
  name: string;
  logoUrl: string;
  basePrice: number;
  taxRate: number;
  deliveryDays: [number, number];
}

export interface CourierWithMeta extends Courier {
  totalPrice: number;
  tax: number;
  isCheapest: boolean;
  isFastest: boolean;
}

export type CountryCode =
  | 'US'
  | 'GB'
  | 'DE'
  | 'FR'
  | 'IN'
  | 'AE'
  | 'SG'
  | 'BR'
  | 'JP'
  | 'AU'
  | 'CA'
  | 'CN';

export interface QuoteFormData {
  origin: string;
  destination: string;
  weight: number | '';
  volume: number | '';
}

export interface QuoteState {
  origin: string;
  destination: string;
  weight: number | '';
  volume: number | '';
  setOrigin: (code: string) => void;
  setDestination: (code: string) => void;
  setWeight: (kg: number | '') => void;
  setVolume: (m3: number | '') => void;
  reset: () => void;
}

export class CourierServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CourierServiceError';
  }
}
