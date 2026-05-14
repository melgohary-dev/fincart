import { useQuery } from '@tanstack/react-query';
import { fetchCouriers } from '@/services/courierApi';
import { useQuoteStore } from '@/store/quoteStore';
import { COUNTRY_CODES } from '@/utils/countryCodes';
import { COURIER_API_CONFIG } from '@/types';
import type { Courier } from '@/types';

/**
 * Courier rate search hook.
 *
 * Combines Zustand store selections into a react-query that can be
 * manually triggered (`refetch()`).  The query is disabled by default;
 * it only fires when the user explicitly clicks "Search Rates".
 */
interface SearchParams {
  origin: string;
  destination: string;
  weight: number;
}

function isValidCode(code: string): boolean {
  return COUNTRY_CODES.includes(code);
}

export function useCourierSearch() {
  const origin = useQuoteStore((s) => s.origin);
  const destination = useQuoteStore((s) => s.destination);
  const weight = useQuoteStore((s) => s.weight);

  const canSearch =
    isValidCode(origin) && isValidCode(destination) && weight !== null && weight > 0;

  const params: SearchParams | null = canSearch
    ? { origin, destination, weight: weight as number }
    : null;

  const query = useQuery<Array<Courier>>({
    queryKey: ['couriers', params],
    queryFn: () => fetchCouriers(params!.origin, params!.destination),
    enabled: false,
    retry: COURIER_API_CONFIG.retryCount,
    retryDelay: COURIER_API_CONFIG.retryDelay,
    staleTime: COURIER_API_CONFIG.staleTime,
    gcTime: COURIER_API_CONFIG.gcTime,
  });

  return {
    ...query,
    canSearch,
    searchParams: params,
  };
}
