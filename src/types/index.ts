/**
 * Application-wide type definitions and constants.
 *
 * All enums are expressed as `as const` objects (with a matching type)
 * to benefit from both runtime access and precise TypeScript narrowing
 * without a separate enum compilation overhead.
 */

/**
 * Supported destination / origin country codes.
 *
 * `as const` objects replace enums because `erasableSyntaxOnly` in
 * tsconfig forbids runtime-emitted syntax. Each const object doubles
 * as both a value namespace and its own type via the companion type
 * alias.
 */
export const CountryCode = {
  US: 'US',
  GB: 'GB',
  DE: 'DE',
  FR: 'FR',
  IN: 'IN',
  AE: 'AE',
  SG: 'SG',
  BR: 'BR',
  JP: 'JP',
  AU: 'AU',
  CA: 'CA',
  CN: 'CN',
} as const;
export type CountryCode = (typeof CountryCode)[keyof typeof CountryCode];

/** Courier identifiers used for routing logic and display. */
export const CourierId = {
  DHL: 'dhl',
  FedEx: 'fedex',
  UPS: 'ups',
  Aramex: 'aramex',
  USPS: 'usps',
  TNT: 'tnt',
} as const;
export type CourierId = (typeof CourierId)[keyof typeof CourierId];

/** Supported theme modes. */
export const ThemeMode = {
  Light: 'light',
  Dark: 'dark',
} as const;
export type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode];

/** Supported interface languages. */
export const LanguageCode = {
  English: 'en',
  Arabic: 'ar',
} as const;
export type LanguageCode = (typeof LanguageCode)[keyof typeof LanguageCode];

/** Supported currencies (extensible for multi-currency quotes). */
export const Currency = {
  USD: 'USD',
} as const;
export type Currency = (typeof Currency)[keyof typeof Currency];

/** Multi-step wizard steps (0-indexed). */
export const FormStep = {
  Origin: 0,
  Destination: 1,
  Package: 2,
} as const;
export type FormStep = (typeof FormStep)[keyof typeof FormStep];

/** Raw courier data returned by the (mock) API. */
export interface Courier {
  id: string;
  name: string;
  logoUrl: string;
  basePrice: number;
  taxRate: number;
  deliveryDays: [number, number];
}

/**
 * Enriched courier data with computed pricing and ranking flags.
 *
 * The `enrichCouriersWithMeta` utility transforms a `Array<Courier>` into
 * this shape before rendering.
 */
export interface CourierWithMeta extends Courier {
  totalPrice: number;
  tax: number;
  weightCharge: number;
  isCheapest: boolean;
  isFastest: boolean;
}

/** Shape of the multi-step quote form (react-hook-form). */
export interface QuoteFormData {
  origin: string;
  destination: string;
  weight: number | null;
  volume: number | null;
}

/** Zustand state for the quote builder (persisted selections across steps). */
export interface QuoteState {
  origin: string;
  destination: string;
  weight: number | null;
  volume: number | null;
  setOrigin: (code: string) => void;
  setDestination: (code: string) => void;
  setWeight: (kg: number | null) => void;
  setVolume: (m3: number | null) => void;
  reset: () => void;
}

/** Number of skeleton cards shown during loading. */
export const DEFAULT_SKELETON_COUNT = 4;

/** Simulated network and cache configuration for the mock courier API. */
export const COURIER_API_CONFIG = {
  failureRate: 0.2,
  simulatedDelay: 800,
  retryCount: 2,
  retryDelay: 1000,
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
} as const;

/** Tax rate presets used by the pricing helpers. */
export const TAX_RATES = {
  standard: 0.08,
  reduced: 0.05,
} as const;

/** Responsive MUI Grid breakpoint presets. */
export const BREAKPOINTS = {
  sidebar: { xs: 12, md: 3 } as const,
  content: { xs: 12, md: 9 } as const,
  cardGrid: { xs: 12, sm: 6, md: 4 } as const,
} as const;

/** Typed error for courier API failures (caught by react-query / ErrorState). */
export class CourierServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CourierServiceError';
  }
}
