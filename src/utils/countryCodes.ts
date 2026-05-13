import type { CountryCode } from '@/types';

interface CountryInfo {
  code: CountryCode;
  name: string;
}

export const COUNTRIES: CountryInfo[] = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IN', name: 'India' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SG', name: 'Singapore' },
  { code: 'BR', name: 'Brazil' },
  { code: 'JP', name: 'Japan' },
  { code: 'AU', name: 'Australia' },
  { code: 'CA', name: 'Canada' },
  { code: 'CN', name: 'China' },
];

export const COUNTRY_CODES: CountryCode[] = COUNTRIES.map((c) => c.code);

export const COUNTRY_NAMES: Record<CountryCode, string> = COUNTRIES.reduce(
  (acc, c) => {
    acc[c.code] = c.name;
    return acc;
  },
  {} as Record<CountryCode, string>,
);

export function isValidCountryCode(code: string): code is CountryCode {
  return COUNTRY_CODES.includes(code as CountryCode);
}
