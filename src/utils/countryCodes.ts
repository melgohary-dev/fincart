import { CountryCode, LanguageCode } from '@/types';

/**
 * Structured country entry with bilingual names.
 */
interface CountryInfo {
  code: CountryCode;
  nameEn: string;
  nameAr: string;
}

/** Master list of supported countries with English and Arabic names. */
const COUNTRY_ENTRIES: Array<CountryInfo> = [
  { code: CountryCode.US, nameEn: 'United States', nameAr: 'الولايات المتحدة' },
  { code: CountryCode.GB, nameEn: 'United Kingdom', nameAr: 'المملكة المتحدة' },
  { code: CountryCode.DE, nameEn: 'Germany', nameAr: 'ألمانيا' },
  { code: CountryCode.FR, nameEn: 'France', nameAr: 'فرنسا' },
  { code: CountryCode.IN, nameEn: 'India', nameAr: 'الهند' },
  { code: CountryCode.AE, nameEn: 'United Arab Emirates', nameAr: 'الإمارات العربية المتحدة' },
  { code: CountryCode.SG, nameEn: 'Singapore', nameAr: 'سنغافورة' },
  { code: CountryCode.BR, nameEn: 'Brazil', nameAr: 'البرازيل' },
  { code: CountryCode.JP, nameEn: 'Japan', nameAr: 'اليابان' },
  { code: CountryCode.AU, nameEn: 'Australia', nameAr: 'أستراليا' },
  { code: CountryCode.CA, nameEn: 'Canada', nameAr: 'كندا' },
  { code: CountryCode.CN, nameEn: 'China', nameAr: 'الصين' },
];

/** Public read-only reference to the country list. */
export const COUNTRIES: Array<CountryInfo> = COUNTRY_ENTRIES;

/** Flat list of country codes for quick validation / set lookups. */
export const COUNTRY_CODES: Array<string> = COUNTRY_ENTRIES.map((c) => c.code);

/**
 * Returns the country name in the requested language.
 *
 * Falls back to returning the raw code when the code is unknown.
 */
export function getCountryName(code: string, lang: string): string {
  const entry = COUNTRY_ENTRIES.find((c) => c.code === code);
  if (!entry) return code;
  return lang === LanguageCode.Arabic ? entry.nameAr : entry.nameEn;
}

/**
 * Type guard: checks whether a string is a known country code.
 */
export function isValidCountryCode(code: string): code is CountryCode {
  return COUNTRY_CODES.includes(code);
}
