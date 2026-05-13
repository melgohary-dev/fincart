import { useQuery } from '@tanstack/react-query';
import { fetchCouriers } from '@/services/courierApi';
import { useQuoteStore } from '@/store/quoteStore';
import { COUNTRY_CODES } from '@/utils/countryCodes';
import type { Courier, CountryCode } from '@/types';

interface SearchParams {
  origin: CountryCode;
  destination: CountryCode;
  weight: number;
}

function isValidCode(code: string): code is CountryCode {
  return COUNTRY_CODES.includes(code as CountryCode);
}

export function useCourierSearch() {
  const origin = useQuoteStore((s) => s.origin);
  const destination = useQuoteStore((s) => s.destination);
  const weight = useQuoteStore((s) => s.weight);

  const canSearch = isValidCode(origin) && isValidCode(destination) && weight !== '' && weight > 0;

  const params: SearchParams | null = canSearch
    ? { origin, destination: destination as CountryCode, weight: weight as number }
    : null;

  const query = useQuery<Courier[]>({
    queryKey: ['couriers', params],
    queryFn: fetchCouriers,
    enabled: false,
    retry: 2,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    ...query,
    canSearch,
    searchParams: params,
  };
}
