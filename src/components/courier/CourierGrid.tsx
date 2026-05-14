import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { useCourierSearch } from '@/hooks/useCourierSearch';
import { enrichCouriersWithMeta } from '@/utils/pricingHelpers';
import { useQuoteStore } from '@/store/quoteStore';
import CourierCard from './CourierCard';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import ErrorState from '@/components/common/ErrorState';
import EmptyState from '@/components/common/EmptyState';
import { BREAKPOINTS } from '@/types';

/**
 * Courier results grid.
 *
 * Handles all four states of the search lifecycle:
 *   1. Loading / fetching      → `<LoadingSkeleton />`
 *   2. Error                   → `<ErrorState />` with retry
 *   3. Empty (no couriers)     → `<EmptyState />`
 *   4. Results                 → responsive grid of `<CourierCard />`
 */
export default function CourierGrid() {
  const { t } = useTranslation();
  const weight = useQuoteStore((s) => s.weight);
  const { data, isLoading, error, refetch, isFetching, canSearch } = useCourierSearch();

  if (!canSearch) return null;

  if (isLoading || isFetching) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          {t('courier.title')}
        </Typography>
        <LoadingSkeleton />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <ErrorState onRetry={() => refetch()} />
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box sx={{ mt: 4 }}>
        <EmptyState />
      </Box>
    );
  }

  const safeWeight = weight ?? 1;
  const couriers = enrichCouriersWithMeta(data, safeWeight);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        {t('courier.title')}
      </Typography>
      <Grid container spacing={3}>
        {couriers.map((courier) => (
          <Grid key={courier.id} size={BREAKPOINTS.cardGrid}>
            <CourierCard courier={courier} weightKg={safeWeight} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
